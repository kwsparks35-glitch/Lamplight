#!/usr/bin/env node

/** Build the deterministic, self-contained `www/` deployment tree from `src/`. */

import { createHash } from "node:crypto";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "src");
const out = path.join(root, "www");
const pkg = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

const read = relative => readFile(path.join(src, relative), "utf8");
let [template, registerSw, fontCss, appCss, body, appJs, bibleJson, sw, manifestText] = await Promise.all([
  read("index.template.html"),
  read("register-sw.js"),
  read("styles/fonts.css"),
  read("styles/app.css"),
  read("body.html"),
  read("js/app.js"),
  read("data/web-classic.json"),
  read("sw.js"),
  read("manifest.webmanifest")
]);

const bible = JSON.parse(bibleJson);
if (!Array.isArray(bible?.b) || bible.b.length !== 66) throw new Error("WEB corpus validation failed.");

for (const match of [...fontCss.matchAll(/url\("\.\.\/assets\/fonts\/([^"/]+\.woff2)"\)/g)]) {
  const bytes = await readFile(path.join(src, "assets", "fonts", match[1]));
  const dataUrl = `url(data:font/woff2;base64,${bytes.toString("base64")})`;
  fontCss = fontCss.replace(match[0], dataUrl);
}
if (fontCss.includes("../assets/fonts/")) throw new Error("A font could not be embedded.");

const bibleLiteral = JSON.stringify(bible);
if (/[<\u2028\u2029]/u.test(bibleLiteral)) {
  throw new Error("WEB corpus contains a character that is unsafe in an inline script literal.");
}
appJs = appJs.replace("__LAMPLIGHT_BIBLE_DATA__", () => bibleLiteral);
if (appJs.includes("__LAMPLIGHT_BIBLE_DATA__")) throw new Error("Bible placeholder replacement failed.");

const replacements = new Map([
  ["__LAMPLIGHT_REGISTER_SW__", registerSw.trim()],
  ["__LAMPLIGHT_FONT_CSS__", fontCss.trim()],
  ["__LAMPLIGHT_APP_CSS__", appCss.trim()],
  ["__LAMPLIGHT_BODY__", body.trim()],
  ["__LAMPLIGHT_APP_JS__", appJs.trim()]
]);
for (const [token, value] of replacements) {
  if (!template.includes(token)) throw new Error(`Missing template token ${token}.`);
  template = template.replace(token, () => value);
}

const sourceHash = createHash("sha256")
  .update(template)
  .update(manifestText)
  .digest("hex")
  .slice(0, 12);
sw = sw.replace("__LAMPLIGHT_CACHE_VERSION__", `${pkg.version}-${sourceHash}`);

const manifest = JSON.parse(manifestText);
manifest.version = pkg.version;
manifestText = `${JSON.stringify(manifest, null, 2)}\n`;

const expectedOut = path.resolve(root, "www");
if (path.resolve(out) !== expectedOut || path.dirname(expectedOut) !== root) {
  throw new Error("Refusing to rebuild an unexpected output path.");
}
await rm(out, { recursive: true, force: true });
await mkdir(path.join(out, "icons"), { recursive: true });
await writeFile(path.join(out, "index.html"), template);
await writeFile(path.join(out, "sw.js"), sw);
await writeFile(path.join(out, "manifest.webmanifest"), manifestText);
await cp(path.join(src, "icons"), path.join(out, "icons"), { recursive: true });

console.log(`Built Lamplight ${pkg.version} (${sourceHash}) into www/.`);
