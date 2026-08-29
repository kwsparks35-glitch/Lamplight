#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  PROJECT_ROOT,
  countBible,
  decodeEmbeddedBible,
  fileRecords,
  isExcluded,
  pngDimensions,
  readText,
  sha256,
} from "./lib/project.mjs";

const INVENTORY_PATH = "ASSET-INVENTORY.json";
const SUMS_PATH = "integrity/SHA256SUMS";
const MANIFEST_PATH = "integrity/file-manifest.json";

async function discoverAssetFiles(root) {
  const candidates = [
    "resources",
    "src/assets",
    "src/icons",
    "www/icons",
    "www/audio",
    "www/assets",
    "android/app/src/main/res",
    "ios/App/App/Assets.xcassets",
  ];
  const files = [];
  async function walk(absolute, relative) {
    let entries;
    try { entries = await fs.readdir(absolute, { withFileTypes: true }); }
    catch (error) { if (error.code === "ENOENT") return; throw error; }
    entries.sort((a, b) => a.name.localeCompare(b.name, "en"));
    for (const entry of entries) {
      const childRelative = `${relative}/${entry.name}`;
      if (isExcluded(childRelative)) continue;
      const childAbsolute = path.join(absolute, entry.name);
      if (entry.isDirectory()) await walk(childAbsolute, childRelative);
      else if (entry.isFile()) files.push(childRelative);
      else throw new Error(`Asset inventory does not allow symlinks: ${childRelative}`);
    }
  }
  for (const candidate of candidates) await walk(path.join(root, candidate), candidate);
  return files;
}

function mediaType(file) {
  const extension = path.extname(file).toLowerCase();
  return {
    ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
    ".svg": "image/svg+xml", ".m4a": "audio/mp4", ".mp3": "audio/mpeg", ".ogg": "audio/ogg",
    ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf",
  }[extension] || "application/octet-stream";
}

function embeddedFonts(html) {
  const fonts = [];
  const facePattern = /@font-face\s*\{([\s\S]*?)\}/gi;
  let face;
  while ((face = facePattern.exec(html))) {
    const family = /font-family\s*:\s*['"]?([^;'"\n]+)['"]?/i.exec(face[1])?.[1]?.trim() || "unknown";
    const style = /font-style\s*:\s*([^;\n]+)/i.exec(face[1])?.[1]?.trim() || "normal";
    const weight = /font-weight\s*:\s*([^;\n]+)/i.exec(face[1])?.[1]?.trim() || "normal";
    const data = /url\(\s*['"]?data:([^;,]+);base64,([A-Za-z0-9+/=]+)['"]?\s*\)/i.exec(face[1]);
    if (!data) continue;
    const bytes = Buffer.from(data[2], "base64");
    fonts.push({ family, style, weight, mediaType: data[1], bytes: bytes.length, sha256: sha256(bytes) });
  }
  return fonts.sort((a, b) => `${a.family}/${a.weight}/${a.style}`.localeCompare(`${b.family}/${b.weight}/${b.style}`, "en"));
}

export async function buildAssetInventory(root = PROJECT_ROOT) {
  const files = [];
  for (const relative of await discoverAssetFiles(root)) {
    const data = await fs.readFile(path.join(root, relative));
    const record = { path: relative, mediaType: mediaType(relative), bytes: data.length, sha256: sha256(data) };
    if (record.mediaType === "image/png") Object.assign(record, pngDimensions(data));
    files.push(record);
  }
  const html = await readText("www/index.html", root);
  const { bible, compressed, uncompressed, encoding } = decodeEmbeddedBible(html);
  const sourceBible = await readText("src/data/web-classic.json", root);
  const scriptureCorpus = {
    name: "World English Bible",
    shortName: "WEB",
    buildEncoding: encoding,
    sourcePath: "src/data/web-classic.json",
    sourceBytes: Buffer.byteLength(sourceBible),
    sourceSha256: sha256(Buffer.from(sourceBible)),
    ...countBible(bible),
    generatedJsonBytes: uncompressed.length,
    generatedJsonSha256: sha256(uncompressed),
  };
  if (compressed) {
    scriptureCorpus.compressedBytes = compressed.length;
    scriptureCorpus.compressedSha256 = sha256(compressed);
  }
  return {
    schema: 1,
    generatedBy: "scripts/generate-integrity.mjs",
    files,
    embedded: {
      scriptureCorpus,
      fonts: embeddedFonts(html),
    },
  };
}

export async function expectedIntegrity(root = PROJECT_ROOT) {
  const files = await fileRecords(root);
  return {
    manifest: `${JSON.stringify({ schema: 1, algorithm: "SHA-256", generatedBy: "scripts/generate-integrity.mjs", files }, null, 2)}\n`,
    sums: `${files.map((record) => `${record.sha256}  ${record.path}`).join("\n")}\n`,
  };
}

export async function writeIntegrity(root = PROJECT_ROOT) {
  const inventory = `${JSON.stringify(await buildAssetInventory(root), null, 2)}\n`;
  await fs.writeFile(path.join(root, INVENTORY_PATH), inventory, "utf8");
  const expected = await expectedIntegrity(root);
  await fs.mkdir(path.join(root, "integrity"), { recursive: true });
  await fs.writeFile(path.join(root, MANIFEST_PATH), expected.manifest, "utf8");
  await fs.writeFile(path.join(root, SUMS_PATH), expected.sums, "utf8");
  return { inventory, ...expected };
}

export async function checkIntegrity(root = PROJECT_ROOT) {
  const problems = [];
  const expectedInventory = `${JSON.stringify(await buildAssetInventory(root), null, 2)}\n`;
  let actualInventory = "";
  try { actualInventory = await fs.readFile(path.join(root, INVENTORY_PATH), "utf8"); }
  catch { problems.push(`${INVENTORY_PATH} is missing`); }
  if (actualInventory && actualInventory !== expectedInventory) problems.push(`${INVENTORY_PATH} is stale`);
  const expected = await expectedIntegrity(root);
  for (const [relative, content] of [[MANIFEST_PATH, expected.manifest], [SUMS_PATH, expected.sums]]) {
    let actual = "";
    try { actual = await fs.readFile(path.join(root, relative), "utf8"); }
    catch { problems.push(`${relative} is missing`); continue; }
    if (actual !== content) problems.push(`${relative} is stale`);
  }
  return { ok: problems.length === 0, problems };
}

async function main() {
  const write = process.argv.includes("--write");
  if (write) {
    const result = await writeIntegrity();
    console.log(`Wrote ${INVENTORY_PATH}, ${MANIFEST_PATH}, and ${SUMS_PATH} (${result.sums.trim().split("\n").length} hashed files).`);
    return;
  }
  const result = await checkIntegrity();
  if (result.ok) console.log("PASS: asset inventory and SHA-256 manifests are current.");
  else {
    result.problems.forEach((problem) => console.error(`ERROR: ${problem}`));
    console.error("Run node scripts/generate-integrity.mjs --write after intentional source changes.");
    process.exitCode = 1;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) await main();
