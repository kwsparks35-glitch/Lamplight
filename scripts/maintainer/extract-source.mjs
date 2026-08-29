#!/usr/bin/env node

/**
 * One-time maintainer migration for Lamplight v1.2.
 *
 * It converts the reviewed single-file application into structured, editable
 * source while preserving `www/index.html` as the deterministic deployment
 * artifact. It also replaces the browser-only DecompressionStream dependency
 * with the checked-in, public-domain WEB Classic JSON corpus.
 *
 * Historical migration utility: do not rerun during normal development. It
 * accepts only the exact reviewed pre-refactor artifact and an explicit flag
 * before replacing `src/`.
 */

import { createHash } from "node:crypto";
import { gunzipSync } from "node:zlib";
import {
  mkdir,
  readFile,
  rm,
  writeFile,
  copyFile
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const sourceRoot = path.join(root, "src");
const htmlPath = path.join(root, "www", "index.html");
const html = await readFile(htmlPath, "utf8");
const EXPECTED_INPUT_SHA256 = "52b0bb98506290f73235211ec97c1d6d23cdae35e65f446d8771cb0d177a449f";

if (!process.argv.includes("--replace-src-from-reviewed-monolith")) {
  throw new Error("Historical tool only. Pass --replace-src-from-reviewed-monolith to acknowledge that it replaces src/.");
}
const inputSha256 = createHash("sha256").update(html).digest("hex");
if (inputSha256 !== EXPECTED_INPUT_SHA256) {
  throw new Error(`Refusing to extract an unrecognized artifact (SHA-256 ${inputSha256}).`);
}

function one(pattern, label) {
  const matches = [...html.matchAll(pattern)];
  if (matches.length !== 1) {
    throw new Error(`Expected exactly one ${label}; found ${matches.length}.`);
  }
  return matches[0][1];
}

if (!html.includes('const APP_VERSION = "1.2.0"')) {
  throw new Error("Refusing to extract: input is not the reviewed Lamplight v1.2 app.");
}

const registerServiceWorker = one(
  /<script>\s*([\s\S]*?serviceWorker[\s\S]*?)<\/script>\s*<style id="fonts">/g,
  "service-worker registration script"
).trim();
let fontCss = one(/<style id="fonts">([\s\S]*?)<\/style>/g, "font stylesheet").trim();
const appCss = one(/<style id="fonts">[\s\S]*?<\/style>\s*<style>([\s\S]*?)<\/style>/g, "application stylesheet").trim();

const bodyMatch = html.match(/<body>\s*([\s\S]*?)\s*<script>\s*([\s\S]*?)\s*<\/script>\s*<\/body>/);
if (!bodyMatch) throw new Error("Expected the Lamplight body and one application script.");
const body = bodyMatch[1].trim();
let appJs = bodyMatch[2].trim();

const bibleMatch = appJs.match(/const BIBLE_B64\s*=\s*"([A-Za-z0-9+/=]+)";/);
if (!bibleMatch) throw new Error("Embedded WEB corpus was not found.");
const bibleJson = gunzipSync(Buffer.from(bibleMatch[1], "base64")).toString("utf8");
const bible = JSON.parse(bibleJson);
if (!Array.isArray(bible?.b) || bible.b.length !== 66) {
  throw new Error("Decoded Bible corpus does not contain the expected 66 books.");
}

appJs = appJs.replace(
  /const BIBLE_B64\s*=\s*"[A-Za-z0-9+/=]+";/,
  "const BIBLE_DATA = __LAMPLIGHT_BIBLE_DATA__;"
);
appJs = appJs.replace(
  /\/\* ---------- BOOT ---------- \*\/[\s\S]*?async function boot\(\)\{\s*if\(typeof DecompressionStream==="undefined"\)\{[\s\S]*?return;\s*\}\s*try\{/,
  "/* ---------- BOOT ---------- */\nasync function boot(){\n  try{"
);
appJs = appJs.replace("BIBLE=await inflate(BIBLE_B64);", "BIBLE=BIBLE_DATA;");
if (appJs.includes("BIBLE_B64") || appJs.includes("DecompressionStream") || appJs.includes("function inflate")) {
  throw new Error("The decompression dependency was not removed completely.");
}

const fontDir = path.join(sourceRoot, "assets", "fonts");
await rm(sourceRoot, { recursive: true, force: true });
await mkdir(fontDir, { recursive: true });

const faces = [...fontCss.matchAll(/@font-face\s*\{[\s\S]*?\}/g)];
if (faces.length !== 7) throw new Error(`Expected seven embedded font faces; found ${faces.length}.`);
for (const faceMatch of faces) {
  const face = faceMatch[0];
  const family = face.match(/font-family:\s*'([^']+)'/)?.[1];
  const weight = face.match(/font-weight:\s*(\d+)/)?.[1];
  const style = face.match(/font-style:\s*([^;]+)/)?.[1]?.trim() || "normal";
  const data = face.match(/url\(data:font\/woff2;base64,([A-Za-z0-9+/=]+)\)/)?.[1];
  if (!family || !weight || !data) throw new Error("A font-face declaration is incomplete.");
  const filename = `${family.toLowerCase()}-${weight}${style === "normal" ? "" : `-${style}`}.woff2`;
  await writeFile(path.join(fontDir, filename), Buffer.from(data, "base64"));
  fontCss = fontCss.replace(`url(data:font/woff2;base64,${data})`, `url(\"../assets/fonts/${filename}\")`);
}

const template = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta name="description" content="Private, offline-first whole-passage Scripture memory practice.">
<meta name="color-scheme" content="dark light">
<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: blob:; base-uri 'none'; object-src 'none'; frame-ancestors 'none'; form-action 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; media-src 'self' data: blob:; connect-src 'self'; worker-src 'self' blob:; manifest-src 'self'">
<title>Lamplight — Scripture Memory</title>
<link rel="manifest" href="manifest.webmanifest">
<meta name="theme-color" content="#16352A">
<link rel="apple-touch-icon" href="icons/icon-180.png">
<script>
/* @include register-sw.js */
__LAMPLIGHT_REGISTER_SW__
</script>
<style id="fonts">
/* @include styles/fonts.css */
__LAMPLIGHT_FONT_CSS__
</style>
<style>
/* @include styles/app.css */
__LAMPLIGHT_APP_CSS__
</style>
</head>
<body>
<!-- @include body.html -->
__LAMPLIGHT_BODY__
<script>
/* @include js/app.js + data/web-classic.json */
__LAMPLIGHT_APP_JS__
</script>
</body>
</html>
`;

await mkdir(path.join(sourceRoot, "styles"), { recursive: true });
await mkdir(path.join(sourceRoot, "js"), { recursive: true });
await mkdir(path.join(sourceRoot, "data"), { recursive: true });
await mkdir(path.join(sourceRoot, "icons"), { recursive: true });
await writeFile(path.join(sourceRoot, "index.template.html"), template);
await writeFile(path.join(sourceRoot, "register-sw.js"), `${registerServiceWorker}\n`);
await writeFile(path.join(sourceRoot, "styles", "fonts.css"), `${fontCss}\n`);
await writeFile(path.join(sourceRoot, "styles", "app.css"), `${appCss}\n`);
await writeFile(path.join(sourceRoot, "body.html"), `${body}\n`);
await writeFile(path.join(sourceRoot, "js", "app.js"), `${appJs}\n`);
await writeFile(path.join(sourceRoot, "data", "web-classic.json"), `${JSON.stringify(bible)}\n`);

const sourceSw = (await readFile(path.join(root, "www", "sw.js"), "utf8"))
  .replace(/const CACHE_VERSION = "[^"]+";/, 'const CACHE_VERSION = "__LAMPLIGHT_CACHE_VERSION__";');
await writeFile(path.join(sourceRoot, "sw.js"), sourceSw);
await copyFile(path.join(root, "www", "manifest.webmanifest"), path.join(sourceRoot, "manifest.webmanifest"));
for (const icon of ["icon-180.png", "icon-192.png", "icon-512.png"]) {
  await copyFile(path.join(root, "www", "icons", icon), path.join(sourceRoot, "icons", icon));
}

console.log("Structured Lamplight source created in src/.");
