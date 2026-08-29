import fs from "node:fs/promises";
import path from "node:path";
import zlib from "node:zlib";

const LOCAL_SIGNATURE = 0x04034b50;
const CENTRAL_SIGNATURE = 0x02014b50;
const END_SIGNATURE = 0x06054b50;
const UTF8_FLAG = 0x0800;
const DOS_DATE_1980_01_01 = 0x0021;
const CRC_TABLE = makeCrcTable();

export function crc32(data) {
  let crc = 0xffffffff;
  for (const byte of data) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

export function validateZipEntryName(name) {
  if (typeof name !== "string" || name.length === 0) return "entry name is empty";
  if (name.includes("\0")) return "entry name contains NUL";
  if (name.includes("\\")) return "entry name uses backslashes";
  if (name.startsWith("/") || name.startsWith("//")) return "entry name is absolute";
  if (/^[A-Za-z]:/.test(name)) return "entry name starts with a drive letter";
  const withoutSlash = name.endsWith("/") ? name.slice(0, -1) : name;
  const segments = withoutSlash.split("/");
  if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) return "entry name contains an empty, dot, or parent segment";
  if (path.posix.normalize(withoutSlash) !== withoutSlash) return "entry name changes when normalized";
  return null;
}

export function createStoredZip(entries) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  const seen = new Set();
  for (const entry of entries) {
    const name = String(entry.name);
    const nameError = validateZipEntryName(name);
    if (nameError) throw new Error(`${name}: ${nameError}`);
    const collisionKey = name.normalize("NFC").toLocaleLowerCase("en-US");
    if (seen.has(collisionKey)) throw new Error(`duplicate or cross-platform-colliding ZIP entry: ${name}`);
    seen.add(collisionKey);
    const nameBuffer = Buffer.from(name, "utf8");
    const data = Buffer.isBuffer(entry.data) ? entry.data : Buffer.from(entry.data);
    const mode = entry.mode ?? 0o644;
    if (!Number.isInteger(mode) || ![0o644, 0o755].includes(mode)) {
      throw new Error(`${name}: file mode must be the deterministic 0644 default or allowlisted 0755 executable mode`);
    }
    const checksum = crc32(data);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(LOCAL_SIGNATURE, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(UTF8_FLAG, 6);
    local.writeUInt16LE(0, 8);
    local.writeUInt16LE(0, 10);
    local.writeUInt16LE(DOS_DATE_1980_01_01, 12);
    local.writeUInt32LE(checksum, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuffer.length, 26);
    local.writeUInt16LE(0, 28);
    localParts.push(local, nameBuffer, data);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(CENTRAL_SIGNATURE, 0);
    central.writeUInt16LE(0x0314, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(UTF8_FLAG, 8);
    central.writeUInt16LE(0, 10);
    central.writeUInt16LE(0, 12);
    central.writeUInt16LE(DOS_DATE_1980_01_01, 14);
    central.writeUInt32LE(checksum, 16);
    central.writeUInt32LE(data.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(nameBuffer.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE(((0o100000 | mode) << 16) >>> 0, 38);
    central.writeUInt32LE(offset, 42);
    centralParts.push(central, nameBuffer);
    offset += local.length + nameBuffer.length + data.length;
  }
  if (entries.length > 0xffff) throw new Error("ZIP64 is not supported; too many files");
  const centralDirectory = Buffer.concat(centralParts);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(END_SIGNATURE, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralDirectory.length, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);
  return Buffer.concat([...localParts, centralDirectory, end]);
}

export function inspectZip(buffer, options = {}) {
  const limits = {
    maxEntries: options.maxEntries ?? 10_000,
    maxEntryBytes: options.maxEntryBytes ?? 50 * 1024 * 1024,
    maxTotalBytes: options.maxTotalBytes ?? 100 * 1024 * 1024,
    maxCompressionRatio: options.maxCompressionRatio ?? 1_000,
  };
  const errors = [];
  const entries = [];
  const endOffset = findEndRecord(buffer);
  if (endOffset < 0) return { ok: false, errors: ["ZIP end-of-central-directory record was not found"], entries };
  if (buffer.readUInt16LE(endOffset + 4) !== 0 || buffer.readUInt16LE(endOffset + 6) !== 0) errors.push("multi-disk ZIP archives are not supported");
  const countOnDisk = buffer.readUInt16LE(endOffset + 8);
  const count = buffer.readUInt16LE(endOffset + 10);
  const centralSize = buffer.readUInt32LE(endOffset + 12);
  const centralOffset = buffer.readUInt32LE(endOffset + 16);
  const commentLength = buffer.readUInt16LE(endOffset + 20);
  if (endOffset + 22 + commentLength !== buffer.length) errors.push("archive has trailing data or an invalid ZIP comment length");
  if (count !== countOnDisk) errors.push("central-directory entry counts disagree");
  if (count > limits.maxEntries) errors.push(`archive contains ${count} entries; limit is ${limits.maxEntries}`);
  if (centralOffset + centralSize > endOffset) errors.push("central directory points outside the archive");

  let cursor = centralOffset;
  let totalBytes = 0;
  const seen = new Set();
  for (let index = 0; index < count && cursor + 46 <= buffer.length; index += 1) {
    if (buffer.readUInt32LE(cursor) !== CENTRAL_SIGNATURE) { errors.push(`entry ${index + 1}: invalid central-directory signature`); break; }
    const madeBy = buffer.readUInt16LE(cursor + 4);
    const flags = buffer.readUInt16LE(cursor + 8);
    const method = buffer.readUInt16LE(cursor + 10);
    const checksum = buffer.readUInt32LE(cursor + 16);
    const compressedBytes = buffer.readUInt32LE(cursor + 20);
    const uncompressedBytes = buffer.readUInt32LE(cursor + 24);
    const nameLength = buffer.readUInt16LE(cursor + 28);
    const extraLength = buffer.readUInt16LE(cursor + 30);
    const archiveCommentLength = buffer.readUInt16LE(cursor + 32);
    const externalAttributes = buffer.readUInt32LE(cursor + 38);
    const localOffset = buffer.readUInt32LE(cursor + 42);
    const recordEnd = cursor + 46 + nameLength + extraLength + archiveCommentLength;
    if (recordEnd > buffer.length) { errors.push(`entry ${index + 1}: central-directory record is truncated`); break; }
    const nameBuffer = buffer.subarray(cursor + 46, cursor + 46 + nameLength);
    const name = nameBuffer.toString("utf8");
    const entryErrors = [];
    const unixMode = (madeBy >> 8) === 3 ? (externalAttributes >>> 16) : null;
    const mode = unixMode === null ? null : unixMode & 0o7777;
    const fileType = unixMode === null ? null : unixMode & 0o170000;
    const nameError = validateZipEntryName(name);
    if (nameError) entryErrors.push(nameError);
    if ((flags & 0x0001) !== 0) entryErrors.push("encrypted entries are not allowed");
    if (method !== 0 && method !== 8) entryErrors.push(`unsupported compression method ${method}`);
    if ((flags & UTF8_FLAG) !== 0 && !Buffer.from(name, "utf8").equals(nameBuffer)) entryErrors.push("entry name is invalid UTF-8");
    if (fileType === 0o120000) entryErrors.push("symbolic links are not allowed");
    else if (fileType !== null && fileType !== 0 && fileType !== 0o100000) entryErrors.push(`non-regular Unix file type ${fileType.toString(8)} is not allowed`);
    if (uncompressedBytes > limits.maxEntryBytes) entryErrors.push(`uncompressed size ${uncompressedBytes} exceeds per-entry limit ${limits.maxEntryBytes}`);
    if (compressedBytes === 0 && uncompressedBytes > 0) entryErrors.push("non-empty entry has zero compressed bytes");
    if (compressedBytes > 0 && uncompressedBytes / compressedBytes > limits.maxCompressionRatio) entryErrors.push("compression ratio exceeds safety limit");
    totalBytes += uncompressedBytes;
    if (totalBytes > limits.maxTotalBytes) entryErrors.push(`total uncompressed size exceeds ${limits.maxTotalBytes}`);
    const collisionKey = name.normalize("NFC").toLocaleLowerCase("en-US");
    if (seen.has(collisionKey)) entryErrors.push("duplicate or cross-platform-colliding entry name");
    seen.add(collisionKey);

    let extracted = null;
    if (localOffset + 30 > buffer.length || buffer.readUInt32LE(localOffset) !== LOCAL_SIGNATURE) entryErrors.push("local-file header is missing or outside the archive");
    else {
      const localNameLength = buffer.readUInt16LE(localOffset + 26);
      const localExtraLength = buffer.readUInt16LE(localOffset + 28);
      const dataStart = localOffset + 30 + localNameLength + localExtraLength;
      const dataEnd = dataStart + compressedBytes;
      if (dataEnd > buffer.length) entryErrors.push("compressed data is truncated or outside the archive");
      else if (!nameBuffer.equals(buffer.subarray(localOffset + 30, localOffset + 30 + localNameLength))) entryErrors.push("local and central entry names differ");
      else if (uncompressedBytes <= limits.maxEntryBytes && totalBytes <= limits.maxTotalBytes && (method === 0 || method === 8)) {
        const compressed = buffer.subarray(dataStart, dataEnd);
        try {
          extracted = method === 0 ? Buffer.from(compressed) : zlib.inflateRawSync(compressed, { maxOutputLength: limits.maxEntryBytes });
          if (extracted.length !== uncompressedBytes) entryErrors.push(`declared uncompressed size ${uncompressedBytes} differs from actual ${extracted.length}`);
          if (crc32(extracted) !== checksum) entryErrors.push("CRC-32 mismatch");
        } catch (error) { entryErrors.push(`decompression failed: ${error.message}`); }
      }
    }
    entries.push({ name, compressedBytes, uncompressedBytes, method, mode, errors: entryErrors, data: extracted });
    entryErrors.forEach((error) => errors.push(`${name || `entry ${index + 1}`}: ${error}`));
    cursor = recordEnd;
  }
  if (entries.length !== count) errors.push(`expected ${count} entries but parsed ${entries.length}`);
  if (cursor !== centralOffset + centralSize) errors.push("parsed central-directory length differs from its declared length");
  return { ok: errors.length === 0, errors, entries, totalBytes };
}

export async function writeStoredZip(outputPath, entries) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  const temporary = `${outputPath}.tmp-${process.pid}`;
  await fs.writeFile(temporary, createStoredZip(entries), { mode: 0o644 });
  await fs.rename(temporary, outputPath);
}

function findEndRecord(buffer) {
  const minimum = Math.max(0, buffer.length - 65_557);
  for (let offset = buffer.length - 22; offset >= minimum; offset -= 1) {
    if (buffer.readUInt32LE(offset) === END_SIGNATURE) return offset;
  }
  return -1;
}

function makeCrcTable() {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let value = n;
    for (let k = 0; k < 8; k += 1) value = (value & 1) ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    table[n] = value >>> 0;
  }
  return table;
}
