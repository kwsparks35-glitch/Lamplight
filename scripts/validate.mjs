#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  PROJECT_ROOT,
  EXPECTED_CANON,
  EXPECTED_STARTER_REFS,
  canonicalReference,
  collectReleaseFiles,
  compileInlineScripts,
  countBible,
  decodeEmbeddedBible,
  extractArrayConstant,
  extractStringConstant,
  extractTopics,
  findBalancedLiteral,
  evaluateDataLiteral,
  isExcluded,
  normalizeLocalAsset,
  pngDimensions,
  readJson,
  readText,
  remoteRuntimeReferences,
  sha256,
} from "./lib/project.mjs";

function add(results, severity, area, message) {
  results.push({ severity, area, message });
}

async function exists(file) {
  try { await fs.access(file); return true; }
  catch { return false; }
}

function validateHtmlShape(html, results) {
  if (!/^\s*<!doctype html>/i.test(html)) add(results, "error", "html", "index.html does not start with an HTML5 doctype");
  for (const tag of ["html", "head", "body"]) {
    const opens = html.match(new RegExp(`<${tag}\\b`, "gi"))?.length || 0;
    const closes = html.match(new RegExp(`</${tag}\\s*>`, "gi"))?.length || 0;
    if (opens !== 1 || closes !== 1) add(results, "error", "html", `expected one <${tag}> and one </${tag}>; found ${opens}/${closes}`);
  }
  for (const error of compileInlineScripts(html)) add(results, "error", "javascript", error);
}

function validateCorpus(html, results) {
  let decoded;
  try { decoded = decodeEmbeddedBible(html); }
  catch (error) { add(results, "error", "corpus", error.message); return null; }
  const { bible, compressed, uncompressed } = decoded;
  if (!bible || !Array.isArray(bible.b)) {
    add(results, "error", "corpus", "decoded corpus is missing its book array");
    return null;
  }
  const counts = countBible(bible);
  if (counts.books !== 66 || counts.chapters !== 1_189 || counts.verses !== 31_095) {
    add(results, "error", "corpus", `expected 66 books / 1,189 chapters / 31,095 verses; found ${counts.books} / ${counts.chapters} / ${counts.verses}`);
  }
  if (bible.t !== counts.verses) add(results, "error", "corpus", `declared verse count ${bible.t} does not equal actual count ${counts.verses}`);
  EXPECTED_CANON.forEach(([expectedName, expectedChapters], index) => {
    const actual = bible.b[index];
    if (!actual) return;
    if (actual.n !== expectedName) add(results, "error", "corpus", `book ${index + 1} should be ${expectedName}; found ${actual.n}`);
    if (!Array.isArray(actual.c) || actual.c.length !== expectedChapters) {
      add(results, "error", "corpus", `${expectedName} should contain ${expectedChapters} chapters; found ${actual.c?.length ?? "none"}`);
    }
  });
  for (const book of bible.b) {
    for (let chapterIndex = 0; chapterIndex < (book.c || []).length; chapterIndex += 1) {
      const chapter = book.c[chapterIndex];
      if (!Array.isArray(chapter) || chapter.length === 0) add(results, "error", "corpus", `${book.n} ${chapterIndex + 1} is empty or malformed`);
      for (let verseIndex = 0; verseIndex < (chapter || []).length; verseIndex += 1) {
        if (typeof chapter[verseIndex] !== "string" || chapter[verseIndex].trim() === "") {
          add(results, "error", "corpus", `${book.n} ${chapterIndex + 1}:${verseIndex + 1} is empty or not text`);
        }
      }
    }
  }
  try {
    const translation = evaluateDataLiteral(findBalancedLiteral(html, "TRANSLATION"), "TRANSLATION");
    if (translation.name !== "World English Bible" || translation.short !== "WEB") {
      add(results, "error", "corpus", `translation metadata should identify World English Bible (WEB); found ${JSON.stringify(translation)}`);
    }
  } catch (error) { add(results, "error", "corpus", error.message); }
  if (compressed) add(results, "info", "corpus", `WEB gzip payload sha256 ${sha256(compressed)}; decoded JSON sha256 ${sha256(uncompressed)}`);
  else add(results, "info", "corpus", `WEB inline JSON sha256 ${sha256(uncompressed)}`);
  return decoded;
}

async function validateStructuredSource(html, decoded, root, results) {
  if (!decoded) return;
  let sourceBibleText;
  let sourceBible;
  let appJs;
  let template;
  let fontCss;
  let sourceManifest;
  let buildWeb;
  try {
    [sourceBibleText, appJs, template, fontCss, sourceManifest, buildWeb] = await Promise.all([
      readText("src/data/web-classic.json", root),
      readText("src/js/app.js", root),
      readText("src/index.template.html", root),
      readText("src/styles/fonts.css", root),
      readJson("src/manifest.webmanifest", root),
      readText("scripts/build-web.mjs", root),
    ]);
    sourceBible = JSON.parse(sourceBibleText);
  } catch (error) { add(results, "error", "structured-source", error.message); return; }
  const canonicalBible = JSON.stringify(sourceBible);
  if (sourceBibleText !== `${canonicalBible}\n`) {
    add(results, "error", "structured-source", "src/data/web-classic.json must be canonical compact JSON with one trailing newline");
  }
  if (!Buffer.from(canonicalBible).equals(decoded.uncompressed)) {
    add(results, "error", "structured-source", "generated BIBLE_DATA differs from src/data/web-classic.json");
  }
  if (/[<\u2028\u2029]/u.test(canonicalBible)) {
    add(results, "error", "structured-source", "WEB corpus contains <, U+2028, or U+2029 and cannot be embedded as a safe inline script literal");
  }
  if (!/\/\[<\\u2028\\u2029\]\/u\.test\(bibleLiteral\)/.test(buildWeb)) {
    add(results, "error", "web-build", "build-web.mjs must reject inline-script-unsafe WEB corpus characters");
  }
  if (!/appJs\s*=\s*appJs\.replace\(["']__LAMPLIGHT_BIBLE_DATA__["'],\s*\(\)\s*=>\s*bibleLiteral\)/.test(buildWeb)) {
    add(results, "error", "web-build", "Bible placeholder replacement must use a function so corpus text cannot trigger replacement-string substitutions");
  }
  if (!appJs.includes("const BIBLE_DATA = __LAMPLIGHT_BIBLE_DATA__;")) {
    add(results, "error", "structured-source", "src/js/app.js is missing its static Bible-data build token");
  }
  if (appJs.includes("BIBLE_B64") || appJs.includes("DecompressionStream") || appJs.includes("function inflate")) {
    add(results, "error", "structured-source", "editable application source must not retain the former runtime decompression path");
  }
  const sourceCompile = compileInlineScripts(`<script>${appJs.replace("__LAMPLIGHT_BIBLE_DATA__", "{b:[],t:0}")}</script>`);
  sourceCompile.forEach((error) => add(results, "error", "structured-source", `src/js/app.js: ${error}`));
  for (const token of ["__LAMPLIGHT_REGISTER_SW__", "__LAMPLIGHT_FONT_CSS__", "__LAMPLIGHT_APP_CSS__", "__LAMPLIGHT_BODY__", "__LAMPLIGHT_APP_JS__"]) {
    const count = template.split(token).length - 1;
    if (count !== 1) add(results, "error", "structured-source", `src/index.template.html should contain ${token} exactly once; found ${count}`);
    if (html.includes(token)) add(results, "error", "web-build", `generated index.html still contains ${token}`);
  }
  if (html.includes("__LAMPLIGHT_BIBLE_DATA__") || html.includes("BIBLE_B64") || html.includes("DecompressionStream")) {
    add(results, "error", "web-build", "generated index.html retains a build token or obsolete decompression implementation");
  }
  const fontPattern = /url\(["']?\.\.\/assets\/fonts\/([^"')]+\.woff2)["']?\)/g;
  const referencedFonts = [...fontCss.matchAll(fontPattern)].map((match) => match[1]);
  if (referencedFonts.length === 0) add(results, "error", "structured-source", "src/styles/fonts.css does not reference source WOFF2 files");
  for (const font of referencedFonts) {
    if (!(await exists(path.join(root, "src", "assets", "fonts", font)))) add(results, "error", "structured-source", `missing source font: src/assets/fonts/${font}`);
  }
  const builtManifest = await readJson("www/manifest.webmanifest", root);
  const { version, ...builtWithoutVersion } = builtManifest;
  if (version !== extractStringConstant(html, "APP_VERSION")) add(results, "error", "web-build", `generated manifest version ${version} differs from APP_VERSION`);
  if (JSON.stringify(builtWithoutVersion) !== JSON.stringify(sourceManifest)) add(results, "error", "web-build", "generated manifest differs from src/manifest.webmanifest beyond its build-added version");
  for (const icon of sourceManifest.icons || []) {
    const relative = normalizeLocalAsset(icon.src);
    const [sourceIcon, builtIcon] = await Promise.all([
      fs.readFile(path.join(root, "src", relative)),
      fs.readFile(path.join(root, "www", relative)),
    ]);
    if (!sourceIcon.equals(builtIcon)) add(results, "error", "web-build", `generated ${relative} differs from its src/ copy`);
  }
  add(results, "info", "structured-source", `WEB source file sha256 ${sha256(Buffer.from(sourceBibleText))}; canonical data sha256 ${sha256(Buffer.from(canonicalBible))}`);
}

function validateTopics(html, bible, results) {
  if (!bible) return;
  let groups;
  try { groups = extractTopics(html); }
  catch (error) { add(results, "error", "topics", error.message); return; }
  if (!Array.isArray(groups) || groups.length === 0) {
    add(results, "error", "topics", "TGROUPS must contain at least one topic group");
    return;
  }
  const topicNames = new Set();
  let topicCount = 0;
  let referenceCount = 0;
  for (const [groupIndex, group] of groups.entries()) {
    if (!group || typeof group.g !== "string" || !Array.isArray(group.t)) {
      add(results, "error", "topics", `topic group ${groupIndex + 1} is malformed`);
      continue;
    }
    for (const [topicIndex, topic] of group.t.entries()) {
      topicCount += 1;
      const label = topic?.n || `group ${groupIndex + 1}, topic ${topicIndex + 1}`;
      if (!topic || typeof topic.n !== "string" || typeof topic.d !== "string" || typeof topic.i !== "string" || !Array.isArray(topic.r)) {
        add(results, "error", "topics", `${label} is missing its name, description, icon, or references`);
        continue;
      }
      const normalizedName = topic.n.trim().toLowerCase();
      if (topicNames.has(normalizedName)) add(results, "error", "topics", `duplicate topic name: ${topic.n}`);
      topicNames.add(normalizedName);
      const references = new Set();
      for (const reference of topic.r) {
        referenceCount += 1;
        if (references.has(reference)) add(results, "error", "topics", `${topic.n} repeats ${reference}`);
        references.add(reference);
        const parsed = canonicalReference(reference, bible);
        if (!parsed.ok) add(results, "error", "topics", `${topic.n}: ${reference}: ${parsed.error}`);
        else {
          const canonicalBook = bible.b[parsed.bookIndex].n;
          if (!reference.startsWith(`${canonicalBook} `)) add(results, "error", "topics", `${topic.n}: ${reference} does not use canonical book name ${canonicalBook}`);
        }
      }
    }
  }
  const starter = groups.flatMap((group) => group.t || []).find((topic) => topic.n === "Canon Starter Pack");
  if (!starter) add(results, "error", "starter", "Canon Starter Pack topic is missing");
  else {
    const actual = JSON.stringify(starter.r);
    const expected = JSON.stringify(EXPECTED_STARTER_REFS);
    if (actual !== expected) add(results, "error", "starter", `starter references or order changed; expected ${EXPECTED_STARTER_REFS.join(", ")}`);
    const units = starter.r.map((reference) => canonicalReference(reference, bible));
    const verseCount = units.reduce((total, unit) => total + (unit.ok ? unit.ids.length : 0), 0);
    if (units.length !== 11 || verseCount !== 34 || new Set(units.map((unit) => unit.unitKey)).size !== 11) {
      add(results, "error", "starter", `starter should be 11 unique passage units covering 34 verses; found ${units.length} units / ${verseCount} verses`);
    }
  }
  add(results, "info", "topics", `${groups.length} groups, ${topicCount} topics, ${referenceCount} curated reference entries`);
}

function validatePedagogyAndCopy(html, results) {
  try {
    const intervals = extractArrayConstant(html, "INTERVALS");
    if (JSON.stringify(intervals) !== JSON.stringify([1, 2, 4, 7, 14, 30])) {
      add(results, "error", "pedagogy", `review intervals must be 1, 2, 4, 7, 14, 30 days; found ${JSON.stringify(intervals)}`);
    }
  } catch (error) { add(results, "error", "pedagogy", error.message); }
  if (/s\.l\s*=\s*Math\.min\([^;]+s\.l\s*\+\s*1\s*\)\s*;[\s\S]{0,180}?INTERVALS\s*\[\s*s\.l\s*\]/.test(html)) {
    add(results, "error", "pedagogy", "gradeUp indexes the interval after incrementing the level, which skips the required first 1-day interval");
  }
  if (/Date\.now\(\)\s*\+\s*\(off\s*\|\|\s*0\)\s*\*\s*DAY/.test(html) || /dayStart\(\)\s*\+[^;\n]*\*\s*DAY/.test(html)) {
    add(results, "error", "calendar", "review calendar still advances local dates with fixed elapsed milliseconds; use calendar-date arithmetic to remain safe across DST");
  }
  if (html.includes("Freely you received, freely give.")) {
    add(results, "error", "scripture-copy", "Matthew 10:8 is missing WEB's word “so”: “Freely you received, so freely give.”");
  }
  if (!html.includes("Freely you received, so freely give.")) {
    add(results, "error", "scripture-copy", "the corrected Matthew 10:8 WEB quotation is not present in app copy");
  }
  const srsStart = html.indexOf("SRS ENGINE");
  const srsEnd = html.indexOf("LOAD / MIGRATE / SAVE", srsStart);
  const reviewStart = html.indexOf("DAILY REVIEW");
  const reviewEnd = html.indexOf("SETS SCREEN", reviewStart);
  const gradingCall = /\bgrade(?:Up|Down|Hint)\s*\(/g;
  let match;
  while ((match = gradingCall.exec(html))) {
    const permitted = (match.index >= srsStart && match.index < srsEnd) || (match.index >= reviewStart && match.index < reviewEnd);
    if (!permitted) add(results, "error", "pedagogy", `SRS grading call appears outside the SRS engine or Daily Review at source offset ${match.index}`);
  }
}

async function validateAssets(html, manifest, sw, root, results) {
  const remote = remoteRuntimeReferences(html);
  remote.forEach((reference) => add(results, "error", "offline", `remote runtime reference: ${reference}`));

  let serviceWorkerAssets = [];
  try {
    let assets;
    try { assets = extractArrayConstant(sw, "PRECACHE_URLS"); }
    catch { assets = extractArrayConstant(sw, "ASSETS"); }
    serviceWorkerAssets = assets.map(normalizeLocalAsset);
  } catch (error) { add(results, "error", "service-worker", error.message); }
  if (serviceWorkerAssets.length !== new Set(serviceWorkerAssets).size) add(results, "error", "service-worker", "precache ASSETS contains duplicate paths");
  const required = [...new Set(["index.html", "manifest.webmanifest", ...(manifest.icons || []).map((icon) => normalizeLocalAsset(icon.src))])];
  for (const relative of new Set([...serviceWorkerAssets, ...required])) {
    if (!(await exists(path.join(root, "www", relative)))) add(results, "error", "assets", `missing www/${relative}`);
  }
  for (const relative of required) {
    if (!serviceWorkerAssets.includes(relative)) add(results, "error", "service-worker", `manifest/runtime asset is not precached: ${relative}`);
  }
  for (const icon of manifest.icons || []) {
    const relative = normalizeLocalAsset(icon.src);
    const iconPath = path.join(root, "www", relative);
    if (!(await exists(iconPath))) continue;
    const sizes = String(icon.sizes || "").match(/^(\d+)x(\d+)$/);
    if (!sizes) { add(results, "error", "manifest", `${icon.src} has invalid sizes metadata: ${icon.sizes}`); continue; }
    try {
      const dimensions = pngDimensions(await fs.readFile(iconPath));
      if (dimensions.width !== Number(sizes[1]) || dimensions.height !== Number(sizes[2])) {
        add(results, "error", "manifest", `${icon.src} declares ${icon.sizes} but is ${dimensions.width}x${dimensions.height}`);
      }
    } catch (error) { add(results, "error", "manifest", `${icon.src}: ${error.message}`); }
  }
  const appleIcon = /<link\b[^>]*rel=["']apple-touch-icon["'][^>]*href=["']([^"']+)["']/i.exec(html)?.[1];
  if (!appleIcon) add(results, "error", "manifest", "index.html is missing an apple-touch-icon link");
  else {
    const relative = normalizeLocalAsset(appleIcon);
    if (!(await exists(path.join(root, "www", relative)))) add(results, "error", "manifest", `apple touch icon is missing: www/${relative}`);
    if (!serviceWorkerAssets.includes(relative)) add(results, "error", "service-worker", `apple touch icon is not precached: ${relative}`);
  }
}

async function validateVersionAndPlatform(html, manifest, sw, packageJson, capacitor, results) {
  let appVersion;
  try { appVersion = extractStringConstant(html, "APP_VERSION"); }
  catch (error) { add(results, "error", "version", error.message); return; }
  if (packageJson.version !== appVersion) add(results, "error", "version", `package.json ${packageJson.version} differs from APP_VERSION ${appVersion}`);
  const cache = /\bconst\s+CACHE(?:_VERSION)?\s*=\s*["']([^"']+)["']/.exec(sw)?.[1];
  if (!cache) add(results, "error", "version", "service worker cache version is missing");
  else if (!cache.includes(appVersion)) add(results, "error", "version", `service worker cache version ${cache} does not include app version ${appVersion}`);
  if (capacitor.webDir !== "www") add(results, "error", "capacitor", `Capacitor webDir must be www; found ${capacitor.webDir}`);
  if (capacitor.appName !== manifest.short_name) add(results, "error", "capacitor", `Capacitor appName ${capacitor.appName} differs from manifest short_name ${manifest.short_name}`);
  if (!/^>=\s*22(?:\D|$)/.test(packageJson.engines?.node || "")) add(results, "error", "node", `Node engine should require >=22; found ${packageJson.engines?.node || "none"}`);
  if (!/^\.\/(?:index\.html)?(?:[?#].*)?$/.test(manifest.start_url || "")) add(results, "error", "manifest", `start_url should remain in the local PWA scope; found ${manifest.start_url}`);
  if (!/\brel=["']manifest["'][^>]*href=["']manifest\.webmanifest["']/i.test(html)) add(results, "error", "manifest", "index.html does not link manifest.webmanifest");
}

async function validateLockAndWrappers(root, packageJson, capacitor, results) {
  let lock;
  let desktop;
  let electronMain;
  try {
    [lock, desktop, electronMain] = await Promise.all([
      readJson("package-lock.json", root),
      readJson("electron/package.json", root),
      readText("electron/main.js", root),
    ]);
  } catch (error) { add(results, "error", "repository", error.message); return; }
  if (lock.lockfileVersion !== 3) add(results, "error", "dependencies", `package-lock.json should use lockfileVersion 3; found ${lock.lockfileVersion}`);
  const requiredScripts = {
    "build:web": "node scripts/build-web.mjs",
    validate: "node scripts/validate.mjs",
    test: "node --test",
    qa: "node scripts/qa.mjs",
    integrity: "node scripts/generate-integrity.mjs",
    release: "node scripts/build-release.mjs",
  };
  for (const [name, command] of Object.entries(requiredScripts)) {
    if (packageJson.scripts?.[name] !== command) add(results, "error", "repository", `package script ${name} must be ${JSON.stringify(command)}`);
  }
  const lockRoot = lock.packages?.[""];
  if (!lockRoot) add(results, "error", "dependencies", "package-lock.json is missing its root package record");
  else {
    if (lockRoot.version !== packageJson.version) add(results, "error", "version", `lockfile root version ${lockRoot.version} differs from package.json ${packageJson.version}`);
    for (const section of ["dependencies", "devDependencies"]) {
      for (const [name, spec] of Object.entries(packageJson[section] || {})) {
        if (lockRoot[section]?.[name] !== spec) add(results, "error", "dependencies", `lockfile root ${section}.${name} differs from package.json`);
      }
    }
  }
  const exactVersion = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;
  for (const [file, manifestToCheck] of [["package.json", packageJson], ["electron/package.json", desktop]]) {
    for (const section of ["dependencies", "devDependencies"]) {
      for (const [name, spec] of Object.entries(manifestToCheck[section] || {})) {
        if (!exactVersion.test(spec)) add(results, "error", "dependencies", `${file} must pin ${name} exactly; found ${spec}`);
      }
    }
  }
  if (desktop.version !== packageJson.version) add(results, "error", "version", `Electron package ${desktop.version} differs from root ${packageJson.version}`);
  if (desktop.build?.appId !== capacitor.appId) add(results, "error", "platform", `Electron appId ${desktop.build?.appId} differs from Capacitor ${capacitor.appId}`);
  const electronMajor = Number(String(desktop.devDependencies?.electron || "0").split(".")[0]);
  if (electronMajor < 41 || electronMajor > 43) add(results, "error", "electron", `Electron must use a supported 2026 major (41–43); found ${desktop.devDependencies?.electron || "none"}`);
  for (const [pattern, message] of [
    [/path\.resolve\(__dirname,\s*["']\.\.["'],\s*["']www["']\)/, "development renderer path must resolve the sibling www directory"],
    [/contextIsolation\s*:\s*true/, "contextIsolation must remain enabled"],
    [/nodeIntegration\s*:\s*false/, "nodeIntegration must remain disabled"],
    [/sandbox\s*:\s*true/, "renderer sandbox must remain enabled"],
    [/setWindowOpenHandler\s*\(\s*\(\)\s*=>\s*\(\{\s*action\s*:\s*["']deny["']/, "new-window creation must remain denied"],
  ]) if (!pattern.test(electronMain)) add(results, "error", "electron", message);
  if (!(await exists(path.join(root, "native-templates", "ios", "PrivacyInfo.xcprivacy")))) {
    add(results, "error", "ios", "native-templates/ios/PrivacyInfo.xcprivacy is missing");
  }
}

function pbxAssignmentValues(project, name) {
  const pattern = new RegExp(`^\\s*${name}\\s*=\\s*([^;]+);`, "gm");
  return [...project.matchAll(pattern)].map((match) => match[1].trim().replace(/^"(.*)"$/, "$1"));
}

async function validateNativeProjects(root, packageJson, capacitor, results) {
  const expectedVersion = "1.2.1";
  const expectedBuildNumber = 12_001;
  const expectedMasterIconHash = "22d1a6572d8f7c3c3228fd9e241642156963b4ec82d05d8b75831ff282849cb9";
  let androidBuild;
  let androidRootBuild;
  let androidVariables;
  let androidManifest;
  let androidStrings;
  let gradleWrapperProperties;
  let gradleWrapperJar;
  let adaptiveIcon;
  let adaptiveRoundIcon;
  let xcodeProject;
  let infoPlist;
  let installedPrivacy;
  let privacyTemplate;
  let appIconContents;
  let iconFixture;
  let rootGitignore;
  try {
    [
      androidBuild,
      androidRootBuild,
      androidVariables,
      androidManifest,
      androidStrings,
      gradleWrapperProperties,
      gradleWrapperJar,
      adaptiveIcon,
      adaptiveRoundIcon,
      xcodeProject,
      infoPlist,
      installedPrivacy,
      privacyTemplate,
      appIconContents,
      iconFixture,
      rootGitignore,
    ] = await Promise.all([
      readText("android/app/build.gradle", root),
      readText("android/build.gradle", root),
      readText("android/variables.gradle", root),
      readText("android/app/src/main/AndroidManifest.xml", root),
      readText("android/app/src/main/res/values/strings.xml", root),
      readText("android/gradle/wrapper/gradle-wrapper.properties", root),
      fs.readFile(path.join(root, "android/gradle/wrapper/gradle-wrapper.jar")),
      readText("android/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml", root),
      readText("android/app/src/main/res/mipmap-anydpi-v26/ic_launcher_round.xml", root),
      readText("ios/App/App.xcodeproj/project.pbxproj", root),
      readText("ios/App/App/Info.plist", root),
      readText("ios/App/App/PrivacyInfo.xcprivacy", root),
      readText("native-templates/ios/PrivacyInfo.xcprivacy", root),
      readJson("ios/App/App/Assets.xcassets/AppIcon.appiconset/Contents.json", root),
      readJson("test/fixtures/native-icon-hashes.json", root),
      readText(".gitignore", root),
    ]);
  } catch (error) {
    add(results, "error", "native", `native project is incomplete: ${error.message}`);
    return;
  }

  if (packageJson.version !== expectedVersion) {
    add(results, "error", "native-version", `this release must be ${expectedVersion}; package.json declares ${packageJson.version}`);
  }
  const namespace = /\bnamespace\s*(?:=\s*)?["']([^"']+)["']/.exec(androidBuild)?.[1];
  const applicationId = /\bapplicationId\s*(?:=\s*)?["']([^"']+)["']/.exec(androidBuild)?.[1];
  if (namespace !== capacitor.appId) add(results, "error", "android", `namespace must be ${capacitor.appId}; found ${namespace || "none"}`);
  if (applicationId !== capacitor.appId) add(results, "error", "android", `applicationId must be ${capacitor.appId}; found ${applicationId || "none"}`);
  if (/\bclasspath\s*(?:\(|\s)\s*["']com\.google\.gms:google-services(?::[^"']+)?["']/.test(androidRootBuild)) {
    add(results, "error", "android-dependencies", "unused Google Services Gradle classpath must not be reintroduced without a reviewed feature");
  }
  if (!/\bcompileSdk\s*=\s*rootProject\.ext\.compileSdkVersion\b/.test(androidBuild)) {
    add(results, "error", "android", "app/build.gradle must take compileSdk from rootProject.ext.compileSdkVersion");
  }
  if (!/\btargetSdkVersion\s+rootProject\.ext\.targetSdkVersion\b/.test(androidBuild)) {
    add(results, "error", "android", "app/build.gradle must take targetSdkVersion from rootProject.ext.targetSdkVersion");
  }
  const compileSdk = Number(/\bcompileSdkVersion\s*=\s*(\d+)\b/.exec(androidVariables)?.[1]);
  const targetSdk = Number(/\btargetSdkVersion\s*=\s*(\d+)\b/.exec(androidVariables)?.[1]);
  if (compileSdk !== 36) add(results, "error", "android", `compileSdkVersion must be API 36; found ${compileSdk || "none"}`);
  if (targetSdk !== 36) add(results, "error", "android", `targetSdkVersion must be API 36; found ${targetSdk || "none"}`);
  const expectedGradleUrl = "https\\://services.gradle.org/distributions/gradle-8.14.3-bin.zip";
  const expectedGradleDistributionHash = "bd71102213493060956ec229d946beee57158dbd89d0e62b91bca0fa2c5f3531";
  const expectedGradleJarHash = "7d3a4ac4de1c32b59bc6a4eb8ecb8e612ccd0cf1ae1e99f66902da64df296172";
  const wrapperSettings = Object.fromEntries(gradleWrapperProperties.trim().split(/\r?\n/).filter(Boolean).map((line) => {
    const separator = line.indexOf("=");
    return separator < 0 ? [line, ""] : [line.slice(0, separator), line.slice(separator + 1)];
  }));
  if (wrapperSettings.distributionUrl !== expectedGradleUrl) add(results, "error", "gradle-wrapper", `distributionUrl must pin Gradle 8.14.3 binary distribution; found ${wrapperSettings.distributionUrl || "none"}`);
  if (wrapperSettings.distributionSha256Sum !== expectedGradleDistributionHash) add(results, "error", "gradle-wrapper", "Gradle 8.14.3 distribution checksum is missing or changed");
  if (wrapperSettings.validateDistributionUrl !== "true") add(results, "error", "gradle-wrapper", "validateDistributionUrl must remain true");
  if (sha256(gradleWrapperJar) !== expectedGradleJarHash) add(results, "error", "gradle-wrapper", "checked-in official Gradle wrapper JAR hash changed");
  const androidVersion = /\bversionName\s+["']([^"']+)["']/.exec(androidBuild)?.[1];
  const androidBuildNumber = Number(/\bversionCode\s+(\d+)\b/.exec(androidBuild)?.[1]);
  if (androidVersion !== packageJson.version) add(results, "error", "android", `versionName must match ${packageJson.version}; found ${androidVersion || "none"}`);
  if (androidBuildNumber !== expectedBuildNumber) add(results, "error", "android", `versionCode must be ${expectedBuildNumber}; found ${androidBuildNumber || "none"}`);
  if (!/android:icon="@mipmap\/ic_launcher"/.test(androidManifest) || !/android:roundIcon="@mipmap\/ic_launcher_round"/.test(androidManifest)) {
    add(results, "error", "android-icon", "AndroidManifest.xml must select both Lamplight launcher icon resources");
  }
  const androidPermissions = [...androidManifest.matchAll(/<uses-permission\b[^>]*\bandroid:name=["']([^"']+)["'][^>]*\/?\s*>/g)].map((match) => match[1]);
  if (androidPermissions.length > 0) {
    add(results, "error", "android-privacy", `fully bundled app must not request Android permissions; found ${androidPermissions.join(", ")}`);
  }
  for (const [name, value] of [["app_name", "Lamplight"], ["title_activity_main", "Lamplight"], ["package_name", capacitor.appId], ["custom_url_scheme", capacitor.appId]]) {
    const pattern = new RegExp(`<string\\s+name=["']${name}["']>${value.replaceAll(".", "\\.")}</string>`);
    if (!pattern.test(androidStrings)) add(results, "error", "android", `res/values/strings.xml must set ${name} to ${value}`);
  }
  for (const [file, content] of [["ic_launcher.xml", adaptiveIcon], ["ic_launcher_round.xml", adaptiveRoundIcon]]) {
    if (!/<foreground\s+android:drawable="@mipmap\/ic_launcher_foreground"\s*\/>/.test(content)) add(results, "error", "android-icon", `${file} must use the branded mipmap foreground`);
    if (!/<background\s+android:drawable="@color\/ic_launcher_background"\s*\/>/.test(content)) add(results, "error", "android-icon", `${file} must use the Lamplight background color`);
  }

  for (const [key, expected] of [
    ["PRODUCT_BUNDLE_IDENTIFIER", capacitor.appId],
    ["MARKETING_VERSION", packageJson.version],
    ["CURRENT_PROJECT_VERSION", String(expectedBuildNumber)],
    ["ASSETCATALOG_COMPILER_APPICON_NAME", "AppIcon"],
  ]) {
    const values = pbxAssignmentValues(xcodeProject, key);
    if (values.length < 2 || values.some((value) => value !== expected)) {
      add(results, "error", "ios", `${key} must equal ${expected} in every build configuration; found ${values.length ? values.join(", ") : "none"}`);
    }
  }
  for (const [key, expansion] of [
    ["CFBundleIdentifier", "PRODUCT_BUNDLE_IDENTIFIER"],
    ["CFBundleShortVersionString", "MARKETING_VERSION"],
    ["CFBundleVersion", "CURRENT_PROJECT_VERSION"],
  ]) {
    const pattern = new RegExp(`<key>${key}</key>\\s*<string>\\$\\(${expansion}\\)</string>`);
    if (!pattern.test(infoPlist)) add(results, "error", "ios", `Info.plist ${key} must use $(${expansion})`);
  }
  if (installedPrivacy !== privacyTemplate) add(results, "error", "ios-privacy", "installed PrivacyInfo.xcprivacy differs from the maintained native template");
  for (const value of ["NSPrivacyAccessedAPICategoryUserDefaults", "CA92.1"]) {
    if (!installedPrivacy.includes(value)) add(results, "error", "ios-privacy", `PrivacyInfo.xcprivacy is missing ${value}`);
  }
  const privacyBuildFile = /PrivacyInfo\.xcprivacy in Resources \*\/ = \{isa = PBXBuildFile; fileRef = [^;]+\/\* PrivacyInfo\.xcprivacy \*\//.test(xcodeProject);
  const privacyFileReference = /PrivacyInfo\.xcprivacy \*\/ = \{isa = PBXFileReference;[^}]*path = PrivacyInfo\.xcprivacy;/.test(xcodeProject);
  const resourcesStart = xcodeProject.indexOf("/* Begin PBXResourcesBuildPhase section */");
  const resourcesEnd = xcodeProject.indexOf("/* End PBXResourcesBuildPhase section */", resourcesStart);
  const resourcesSection = resourcesStart >= 0 && resourcesEnd > resourcesStart ? xcodeProject.slice(resourcesStart, resourcesEnd) : "";
  if (!privacyBuildFile || !privacyFileReference || !/PrivacyInfo\.xcprivacy in Resources/.test(resourcesSection)) {
    add(results, "error", "ios-privacy", "Xcode project must reference PrivacyInfo.xcprivacy and copy it in the Resources build phase");
  }
  const appIconImage = appIconContents.images?.find((image) => image.filename === "AppIcon-512@2x.png");
  if (!appIconImage || appIconImage.idiom !== "universal" || appIconImage.platform !== "ios" || appIconImage.size !== "1024x1024") {
    add(results, "error", "ios-icon", "AppIcon Contents.json must declare the 1024x1024 universal iOS Lamplight icon");
  }

  if (iconFixture.schema !== 1 || !iconFixture.files || Object.keys(iconFixture.files).length !== 17) {
    add(results, "error", "native-icon", "native icon hash fixture must contain the 17 versioned Lamplight icon records");
  } else {
    for (const [relative, expected] of Object.entries(iconFixture.files)) {
      if (relative.startsWith("/") || relative.split("/").includes("..")) {
        add(results, "error", "native-icon", `unsafe icon fixture path: ${relative}`);
        continue;
      }
      try {
        const data = await fs.readFile(path.join(root, relative));
        const dimensions = pngDimensions(data);
        if (data.length !== expected.bytes || sha256(data) !== expected.sha256 || dimensions.width !== expected.width || dimensions.height !== expected.height) {
          add(results, "error", "native-icon", `${relative} differs from its reviewed Lamplight icon hash/dimensions`);
        }
      } catch (error) { add(results, "error", "native-icon", `${relative}: ${error.message}`); }
    }
    if (iconFixture.files["resources/icon.png"]?.sha256 !== expectedMasterIconHash) {
      add(results, "error", "native-icon", "versioned master Lamplight icon hash changed without updating the release contract");
    }
    try {
      const [masterIcon, iosIcon] = await Promise.all([
        fs.readFile(path.join(root, "resources/icon.png")),
        fs.readFile(path.join(root, "ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png")),
      ]);
      if (!masterIcon.equals(iosIcon)) add(results, "error", "ios-icon", "installed iOS AppIcon is not byte-identical to resources/icon.png");
    } catch (error) { add(results, "error", "ios-icon", error.message); }
  }

  for (const relative of [
    "android/app/src/main/res/drawable-v24/ic_launcher_foreground.xml",
    "android/app/src/main/res/drawable/ic_launcher_background.xml",
  ]) {
    if (await exists(path.join(root, relative))) add(results, "error", "android-icon", `unused default Capacitor artwork must not remain: ${relative}`);
  }
  async function scanResourceXml(directory) {
    const findings = [];
    for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) findings.push(...await scanResourceXml(absolute));
      else if (entry.isFile() && entry.name.endsWith(".xml")) {
        const content = await fs.readFile(absolute, "utf8");
        if (/M66\.94[ ,]+46\.02|M31\.06[ ,]+19(?:\.0)?/.test(content)) findings.push(path.relative(root, absolute).split(path.sep).join("/"));
      }
    }
    return findings;
  }
  for (const relative of await scanResourceXml(path.join(root, "android", "app", "src", "main", "res"))) {
    add(results, "error", "android-icon", `known stock Android/Capacitor vector signature remains in ${relative}`);
  }

  const broadIgnore = rootGitignore.split(/\r?\n/).map((line) => line.trim()).find((line) => line && !line.startsWith("#") && !line.startsWith("!") && /^\/?(?:android|ios)\/?$/.test(line));
  if (broadIgnore) add(results, "error", "repository", `.gitignore must track native project source; found broad rule ${broadIgnore}`);
  const releaseFiles = await collectReleaseFiles(root);
  for (const relative of [
    "android/app/build.gradle",
    "android/gradlew",
    "android/gradle/wrapper/gradle-wrapper.jar",
    "android/app/src/main/res/mipmap-mdpi/ic_launcher.png",
    "ios/App/App.xcodeproj/project.pbxproj",
    "ios/App/App/PrivacyInfo.xcprivacy",
    "ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png",
    "ios/App/CapApp-SPM/Package.swift",
  ]) {
    if (!releaseFiles.includes(relative)) add(results, "error", "release", `native source release is missing ${relative}`);
  }
  const generatedNative = releaseFiles.find((relative) =>
    relative.startsWith("android/app/src/main/assets/public/")
    || relative.startsWith("ios/App/App/public/")
    || relative.startsWith("android/capacitor-cordova-android-plugins/")
    || relative.startsWith("ios/capacitor-cordova-ios-plugins/")
    || [
      "android/app/src/main/assets/capacitor.config.json",
      "android/app/src/main/assets/capacitor.plugins.json",
      "android/app/src/main/res/xml/config.xml",
      "ios/App/App/capacitor.config.json",
      "ios/App/App/config.xml",
    ].includes(relative));
  if (generatedNative) add(results, "error", "release", `generated native sync output must be excluded from source releases: ${generatedNative}`);
  for (const relative of [
    "android/app/src/main/assets/public/index.html",
    "ios/App/App/public/index.html",
    "android/capacitor-cordova-android-plugins/build.gradle",
    "ios/capacitor-cordova-ios-plugins/CordovaPluginsResources.podspec",
    "android/app/src/main/assets/capacitor.config.json",
    "android/app/src/main/assets/capacitor.plugins.json",
    "android/app/src/main/res/xml/config.xml",
    "ios/App/App/capacitor.config.json",
    "ios/App/App/config.xml",
    "android/app/build/output.aab",
    "android/local.properties",
    "signing/upload.keystore",
  ]) {
    if (!isExcluded(relative)) add(results, "error", "release", `release exclusion policy must reject ${relative}`);
  }
  add(results, "info", "native", `Android API 36 and iOS projects identify ${capacitor.appId} ${packageJson.version}+${expectedBuildNumber}; ${Object.keys(iconFixture.files || {}).length} native icon hashes verified`);
}

async function validateIntegrity(root, results) {
  const sumsPath = path.join(root, "integrity", "SHA256SUMS");
  const manifestPath = path.join(root, "integrity", "file-manifest.json");
  if (!(await exists(sumsPath)) || !(await exists(manifestPath))) {
    add(results, "warning", "integrity", "generated integrity files are absent; run node scripts/generate-integrity.mjs --write before release");
    return;
  }
  let records;
  try { records = JSON.parse(await fs.readFile(manifestPath, "utf8")).files; }
  catch (error) { add(results, "error", "integrity", `cannot read file-manifest.json: ${error.message}`); return; }
  if (!Array.isArray(records)) { add(results, "error", "integrity", "file-manifest.json does not contain a files array"); return; }
  const expectedLines = [];
  for (const record of records) {
    const absolute = path.join(root, record.path);
    if (!(await exists(absolute))) { add(results, "error", "integrity", `manifested file is missing: ${record.path}`); continue; }
    const data = await fs.readFile(absolute);
    const hash = sha256(data);
    if (hash !== record.sha256 || data.length !== record.bytes) add(results, "error", "integrity", `hash or size mismatch: ${record.path}`);
    expectedLines.push(`${record.sha256}  ${record.path}`);
  }
  const actualSums = (await fs.readFile(sumsPath, "utf8")).trimEnd();
  if (actualSums !== `${expectedLines.join("\n")}`) add(results, "error", "integrity", "SHA256SUMS differs from file-manifest.json");
}

export async function runValidation({ root = PROJECT_ROOT, verifyIntegrity = true } = {}) {
  const results = [];
  let html;
  let sw;
  let manifest;
  let packageJson;
  let capacitor;
  try {
    [html, sw, manifest, packageJson, capacitor] = await Promise.all([
      readText("www/index.html", root),
      readText("www/sw.js", root),
      readJson("www/manifest.webmanifest", root),
      readJson("package.json", root),
      readJson("capacitor.config.json", root),
    ]);
  } catch (error) {
    add(results, "error", "project", error.message);
    return summarize(results);
  }

  validateHtmlShape(html, results);
  const decodedBible = validateCorpus(html, results);
  validateTopics(html, decodedBible?.bible, results);
  await validateStructuredSource(html, decodedBible, root, results);
  validatePedagogyAndCopy(html, results);
  await validateAssets(html, manifest, sw, root, results);
  await validateVersionAndPlatform(html, manifest, sw, packageJson, capacitor, results);
  await validateLockAndWrappers(root, packageJson, capacitor, results);
  await validateNativeProjects(root, packageJson, capacitor, results);
  if (verifyIntegrity) await validateIntegrity(root, results);
  return summarize(results);
}

function summarize(results) {
  return {
    ok: !results.some((result) => result.severity === "error"),
    errors: results.filter((result) => result.severity === "error").length,
    warnings: results.filter((result) => result.severity === "warning").length,
    results,
  };
}

async function main() {
  const json = process.argv.includes("--json");
  const skipIntegrity = process.argv.includes("--skip-integrity");
  const report = await runValidation({ verifyIntegrity: !skipIntegrity });
  if (json) console.log(JSON.stringify(report, null, 2));
  else {
    for (const item of report.results) {
      const marker = { error: "ERROR", warning: "WARN ", info: "INFO " }[item.severity];
      console.log(`${marker} [${item.area}] ${item.message}`);
    }
    console.log(`\n${report.ok ? "PASS" : "FAIL"}: ${report.errors} error(s), ${report.warnings} warning(s)`);
  }
  if (!report.ok) process.exitCode = 1;
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) await main();
