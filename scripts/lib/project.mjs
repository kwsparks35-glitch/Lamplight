import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const PROJECT_ROOT = path.resolve(HERE, "../..");

export const EXPECTED_CANON = Object.freeze([
  ["Genesis", 50], ["Exodus", 40], ["Leviticus", 27], ["Numbers", 36],
  ["Deuteronomy", 34], ["Joshua", 24], ["Judges", 21], ["Ruth", 4],
  ["1 Samuel", 31], ["2 Samuel", 24], ["1 Kings", 22], ["2 Kings", 25],
  ["1 Chronicles", 29], ["2 Chronicles", 36], ["Ezra", 10], ["Nehemiah", 13],
  ["Esther", 10], ["Job", 42], ["Psalms", 150], ["Proverbs", 31],
  ["Ecclesiastes", 12], ["Song of Songs", 8], ["Isaiah", 66], ["Jeremiah", 52],
  ["Lamentations", 5], ["Ezekiel", 48], ["Daniel", 12], ["Hosea", 14],
  ["Joel", 3], ["Amos", 9], ["Obadiah", 1], ["Jonah", 4], ["Micah", 7],
  ["Nahum", 3], ["Habakkuk", 3], ["Zephaniah", 3], ["Haggai", 2],
  ["Zechariah", 14], ["Malachi", 4], ["Matthew", 28], ["Mark", 16],
  ["Luke", 24], ["John", 21], ["Acts", 28], ["Romans", 16],
  ["1 Corinthians", 16], ["2 Corinthians", 13], ["Galatians", 6],
  ["Ephesians", 6], ["Philippians", 4], ["Colossians", 4],
  ["1 Thessalonians", 5], ["2 Thessalonians", 3], ["1 Timothy", 6],
  ["2 Timothy", 4], ["Titus", 3], ["Philemon", 1], ["Hebrews", 13],
  ["James", 5], ["1 Peter", 5], ["2 Peter", 3], ["1 John", 5],
  ["2 John", 1], ["3 John", 1], ["Jude", 1], ["Revelation", 22],
]);

export const EXPECTED_STARTER_REFS = Object.freeze([
  "Joshua 1:9",
  "Isaiah 41:10",
  "Isaiah 30:21-22",
  "1 Corinthians 13:4-7",
  "2 Peter 1:5-8",
  "Hebrews 11:1-3",
  "Jeremiah 29:11-14",
  "Deuteronomy 6:4-9",
  "2 John 1:4-6",
  "John 9:35-38",
  "Galatians 5:22-23",
]);

export const RELEASE_EXCLUDES = Object.freeze([
  /^\.git(?:\/|$)/,
  /^\.DS_Store$/,
  /^android\/app\/src\/main\/assets\/public(?:\/|$)/,
  /^ios\/App\/App\/public(?:\/|$)/,
  /^android\/capacitor-cordova-android-plugins(?:\/|$)/,
  /^ios\/capacitor-cordova-ios-plugins(?:\/|$)/,
  /^android\/app\/src\/main\/assets\/capacitor\.(?:config|plugins)\.json$/,
  /^android\/app\/src\/main\/res\/xml\/config\.xml$/,
  /^ios\/App\/App\/(?:capacitor\.config\.json|config\.xml)$/,
  /(?:^|\/)node_modules(?:\/|$)/,
  /(?:^|\/)(?:dist|build|coverage|DerivedData)(?:\/|$)/,
  /(?:^|\/)\.gradle(?:\/|$)/,
  /(?:^|\/)Pods(?:\/|$)/,
  /(?:^|\/)xcuserdata(?:\/|$)/,
  /(?:^|\/)\.idea(?:\/|$)/,
  /(?:^|\/)\.vscode(?:\/|$)/,
  /(?:^|\/)\.env(?:\.|$)/,
  /(?:^|\/)(?:secrets?|credentials?)(?:\.|\/|$)/i,
  /(?:^|\/)[^/]+\.(?:jks|keystore|p8|p12|mobileprovision|cer|key)$/i,
  /(?:^|\/)local\.properties$/,
]);

export async function readText(relativePath, root = PROJECT_ROOT) {
  return fs.readFile(path.join(root, relativePath), "utf8");
}

export async function readJson(relativePath, root = PROJECT_ROOT) {
  return JSON.parse(await readText(relativePath, root));
}

export function sha256(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

export function findBalancedLiteral(source, variableName) {
  const declaration = new RegExp(`\\b(?:const|let|var)\\s+${escapeRegExp(variableName)}\\s*=`).exec(source);
  if (!declaration) throw new Error(`Could not find ${variableName}`);
  let start = declaration.index + declaration[0].length;
  while (/\s/.test(source[start] || "")) start += 1;
  const opener = source[start];
  const closer = { "[": "]", "{": "}", "(": ")" }[opener];
  if (!closer) throw new Error(`${variableName} is not assigned a bracketed literal`);

  const stack = [closer];
  let quote = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;
  for (let i = start + 1; i < source.length; i += 1) {
    const ch = source[i];
    const next = source[i + 1];
    if (lineComment) {
      if (ch === "\n") lineComment = false;
      continue;
    }
    if (blockComment) {
      if (ch === "*" && next === "/") { blockComment = false; i += 1; }
      continue;
    }
    if (quote) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === "/" && next === "/") { lineComment = true; i += 1; continue; }
    if (ch === "/" && next === "*") { blockComment = true; i += 1; continue; }
    if (ch === "\"" || ch === "'" || ch === "`") { quote = ch; continue; }
    if (ch === "[" || ch === "{" || ch === "(") {
      stack.push({ "[": "]", "{": "}", "(": ")" }[ch]);
      continue;
    }
    if (ch === stack.at(-1)) {
      stack.pop();
      if (stack.length === 0) return source.slice(start, i + 1);
    }
  }
  throw new Error(`Unterminated literal assigned to ${variableName}`);
}

export function evaluateDataLiteral(literal, label = "data literal") {
  const value = vm.runInNewContext(`(${literal})`, Object.create(null), {
    filename: label,
    timeout: 1_000,
    contextCodeGeneration: { strings: false, wasm: false },
  });
  return JSON.parse(JSON.stringify(value));
}

export function extractStringConstant(source, name) {
  const match = new RegExp(`\\b(?:const|let|var)\\s+${escapeRegExp(name)}\\s*=\\s*(["'])(.*?)\\1\\s*;`).exec(source);
  if (!match) throw new Error(`Could not find string constant ${name}`);
  return match[2];
}

export function extractArrayConstant(source, name) {
  return evaluateDataLiteral(findBalancedLiteral(source, name), name);
}

export function decodeEmbeddedBible(html) {
  const match = /\bconst\s+BIBLE_B64\s*=\s*"([A-Za-z0-9+/=]+)"\s*;/.exec(html);
  if (match) {
    const compressed = Buffer.from(match[1], "base64");
    if (compressed.length === 0 || compressed.toString("base64").replace(/=+$/, "") !== match[1].replace(/=+$/, "")) {
      throw new Error("BIBLE_B64 is not canonical base64");
    }
    const uncompressed = zlib.gunzipSync(compressed);
    const bible = JSON.parse(uncompressed.toString("utf8"));
    return { bible, compressed, uncompressed, base64: match[1], encoding: "gzip+base64" };
  }
  let literal;
  try { literal = findBalancedLiteral(html, "BIBLE_DATA"); }
  catch { throw new Error("Neither a static BIBLE_DATA object nor BIBLE_B64 payload was found"); }
  const uncompressed = Buffer.from(literal, "utf8");
  const bible = JSON.parse(literal);
  return { bible, compressed: null, uncompressed, base64: null, encoding: "inline-json" };
}

export function extractTopics(html) {
  return evaluateDataLiteral(findBalancedLiteral(html, "TGROUPS"), "TGROUPS");
}

export function canonicalReference(reference, bible) {
  if (typeof reference !== "string") return { ok: false, error: "reference is not a string" };
  const match = /^(.+?)\s+(\d+)(?::(\d+)(?:-(\d+))?)?$/.exec(reference.trim());
  if (!match) return { ok: false, error: "expected Book C, Book C:V, or Book C:V-V" };
  const bookIndex = bible.b.findIndex((book) => book.n.toLowerCase() === match[1].trim().toLowerCase());
  if (bookIndex < 0) return { ok: false, error: `unknown canonical book: ${match[1].trim()}` };
  const chapterNumber = Number(match[2]);
  const book = bible.b[bookIndex];
  if (!Number.isSafeInteger(chapterNumber) || chapterNumber < 1 || chapterNumber > book.c.length) {
    return { ok: false, error: `chapter ${chapterNumber} is outside ${book.n} 1-${book.c.length}` };
  }
  const chapter = book.c[chapterNumber - 1];
  const start = match[3] === undefined ? 1 : Number(match[3]);
  const end = match[4] === undefined ? (match[3] === undefined ? chapter.length : start) : Number(match[4]);
  if (!Number.isSafeInteger(start) || start < 1) return { ok: false, error: "verse must be at least 1" };
  if (!Number.isSafeInteger(end) || end < start) return { ok: false, error: "range endpoint precedes its start" };
  if (end > chapter.length) return { ok: false, error: `verse ${end} is outside ${book.n} ${chapterNumber}:1-${chapter.length}` };
  const ids = [];
  for (let verse = start; verse <= end; verse += 1) ids.push(`${bookIndex}:${chapterNumber - 1}:${verse - 1}`);
  return {
    ok: true,
    bookIndex,
    chapterNumber,
    start,
    end,
    ids,
    unitKey: ids.length === 1 ? ids[0] : `${ids[0]}~${ids.at(-1)}`,
  };
}

export function countBible(bible) {
  let chapters = 0;
  let verses = 0;
  for (const book of bible.b || []) {
    chapters += Array.isArray(book.c) ? book.c.length : 0;
    for (const chapter of book.c || []) verses += Array.isArray(chapter) ? chapter.length : 0;
  }
  return { books: bible.b?.length || 0, chapters, verses };
}

export function inlineScripts(html) {
  const scripts = [];
  const pattern = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;
  let match;
  while ((match = pattern.exec(html))) {
    if (!/\bsrc\s*=/.test(match[1])) scripts.push({ attributes: match[1], code: match[2], offset: match.index });
  }
  return scripts;
}

export function compileInlineScripts(html) {
  const errors = [];
  inlineScripts(html).forEach(({ code }, index) => {
    try { new vm.Script(code, { filename: `www/index.html#inline-script-${index + 1}` }); }
    catch (error) { errors.push(error.message); }
  });
  return errors;
}

export function remoteRuntimeReferences(html) {
  const findings = [];
  const tagPattern = /<(script|link|img|source|audio|video|track|iframe|object)\b([^>]*)>/gi;
  let match;
  while ((match = tagPattern.exec(html))) {
    const attributes = match[2];
    const attributePattern = /\b(src|href|poster|data)\s*=\s*(["'])(.*?)\2/gi;
    let attribute;
    while ((attribute = attributePattern.exec(attributes))) {
      if (/^(?:https?:)?\/\//i.test(attribute[3])) findings.push(`${match[1]}[${attribute[1]}=${attribute[3]}]`);
    }
  }
  const cssPattern = /url\(\s*(["']?)(.*?)\1\s*\)/gi;
  while ((match = cssPattern.exec(html))) {
    if (/^(?:https?:)?\/\//i.test(match[2])) findings.push(`css url(${match[2]})`);
  }
  const networkCodePattern = /\b(?:fetch|importScripts|EventSource|WebSocket)\s*\(\s*(["'])(https?:\/\/[^"']+)\1/gi;
  while ((match = networkCodePattern.exec(html))) findings.push(`script ${match[2]}`);
  return findings;
}

export function pngDimensions(buffer) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (buffer.length < 24 || !buffer.subarray(0, 8).equals(signature) || buffer.toString("ascii", 12, 16) !== "IHDR") {
    throw new Error("not a valid PNG with an IHDR header");
  }
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

export function isExcluded(relativePath) {
  const normalized = relativePath.split(path.sep).join("/");
  return RELEASE_EXCLUDES.some((pattern) => pattern.test(normalized));
}

export async function collectReleaseFiles(root = PROJECT_ROOT) {
  const files = [];
  async function walk(directory, prefix = "") {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    entries.sort((a, b) => a.name.localeCompare(b.name, "en"));
    for (const entry of entries) {
      const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (isExcluded(relative)) continue;
      const absolute = path.join(directory, entry.name);
      if (entry.isSymbolicLink()) throw new Error(`Release input may not contain symlinks: ${relative}`);
      if (entry.isDirectory()) await walk(absolute, relative);
      else if (entry.isFile()) files.push(relative);
    }
  }
  await walk(root);
  return files;
}

export async function fileRecords(root = PROJECT_ROOT) {
  const records = [];
  for (const relative of await collectReleaseFiles(root)) {
    if (relative === "integrity/SHA256SUMS" || relative === "integrity/file-manifest.json") continue;
    const data = await fs.readFile(path.join(root, relative));
    records.push({ path: relative, bytes: data.length, sha256: sha256(data) });
  }
  return records;
}

export function normalizeLocalAsset(asset) {
  const withoutQuery = asset.split(/[?#]/, 1)[0];
  const normalized = path.posix.normalize(withoutQuery.replace(/^\.\//, ""));
  if (!normalized || normalized === "." || normalized.startsWith("../") || path.posix.isAbsolute(normalized)) {
    throw new Error(`unsafe local asset path: ${asset}`);
  }
  return normalized;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
