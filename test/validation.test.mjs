import assert from "node:assert/strict";
import fs from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import {
  EXPECTED_CANON,
  EXPECTED_STARTER_REFS,
  PROJECT_ROOT,
  canonicalReference,
  collectReleaseFiles,
  compileInlineScripts,
  countBible,
  decodeEmbeddedBible,
  extractTopics,
  isExcluded,
  pngDimensions,
  readJson,
  readText,
  remoteRuntimeReferences,
  sha256,
} from "../scripts/lib/project.mjs";
import { createStoredZip, inspectZip, validateZipEntryName } from "../scripts/lib/zip.mjs";
import { buildReleaseBuffer, RELEASE_EXECUTABLES, releaseFileMode } from "../scripts/build-release.mjs";
import { checkWebBuild } from "../scripts/check-web-build.mjs";
import { checkIntegrity } from "../scripts/generate-integrity.mjs";
import { runValidation } from "../scripts/validate.mjs";

const html = await readText("www/index.html");
const embeddedBible = decodeEmbeddedBible(html);
const { bible } = embeddedBible;

function sourceBetween(startText, endText, from = 0) {
  const start = html.indexOf(startText, from);
  assert.notEqual(start, -1, `missing source marker: ${startText}`);
  const end = html.indexOf(endText, start);
  assert.notEqual(end, -1, `missing source marker: ${endText}`);
  return html.slice(start, end);
}

test("inline application JavaScript parses", () => {
  assert.deepEqual(compileInlineScripts(html), []);
});

test("embedded WEB corpus has the expected canonical structure", () => {
  assert.deepEqual(countBible(bible), { books: 66, chapters: 1_189, verses: 31_095 });
  assert.equal(bible.t, 31_095);
  assert.deepEqual(bible.b.map((book) => [book.n, book.c.length]), EXPECTED_CANON);
  for (const book of bible.b) {
    for (const chapter of book.c) {
      assert.ok(chapter.length > 0);
      chapter.forEach((verse) => assert.ok(typeof verse === "string" && verse.trim().length > 0));
    }
  }
  const matthew = bible.b.find((book) => book.n === "Matthew");
  assert.equal(matthew.c[9][7], "Heal the sick, cleanse the lepers, and cast out demons. Freely you received, so freely give.");
});

test("editable WEB JSON is canonical and exactly matches generated BIBLE_DATA", async () => {
  const sourceText = await readText("src/data/web-classic.json");
  const sourceBible = JSON.parse(sourceText);
  const canonical = JSON.stringify(sourceBible);
  assert.equal(sourceText, `${canonical}\n`);
  assert.equal(embeddedBible.encoding, "inline-json");
  assert.equal(embeddedBible.compressed, null);
  assert.equal(embeddedBible.uncompressed.toString("utf8"), canonical);
  assert.deepEqual(countBible(sourceBible), { books: 66, chapters: 1_189, verses: 31_095 });
  assert.equal(html.includes("DecompressionStream"), false);
  assert.equal(html.includes("BIBLE_B64"), false);
});

test("WEB build treats corpus text as data and rejects inline-script-unsafe characters", async () => {
  const [sourceText, buildWeb] = await Promise.all([
    readText("src/data/web-classic.json"),
    readText("scripts/build-web.mjs"),
  ]);
  assert.doesNotMatch(JSON.stringify(JSON.parse(sourceText)), /[<\u2028\u2029]/u);
  assert.match(buildWeb, /\/\[<\\u2028\\u2029\]\/u\.test\(bibleLiteral\)/);
  assert.match(buildWeb, /appJs\s*=\s*appJs\.replace\(["']__LAMPLIGHT_BIBLE_DATA__["'],\s*\(\)\s*=>\s*bibleLiteral\)/);
});

test("canonical reference validator accepts bounded references and rejects malformed ones", async () => {
  const fixtures = await readJson("test/fixtures/reference-cases.json");
  for (const fixture of fixtures.valid) {
    const parsed = canonicalReference(fixture.reference, bible);
    assert.equal(parsed.ok, true, `${fixture.reference}: ${parsed.error || "unexpected failure"}`);
    assert.equal(parsed.ids.length, fixture.verses, fixture.reference);
  }
  for (const reference of fixtures.invalid) assert.equal(canonicalReference(reference, bible).ok, false, reference);
});

test("the app's own reference parser supports abbreviations, en dashes, and cross-chapter ranges", () => {
  const core = sourceBetween("let BOOKALIASES={};", "function idText", html.indexOf("REF / UNIT UTILITIES"));
  const context = { BIBLE: bible };
  vm.runInNewContext(`${core}\ninitBookAliases();globalThis.__api={parseRef,expandRef};`, context, {
    timeout: 1_000,
    contextCodeGeneration: { strings: false, wasm: false },
  });
  const { parseRef, expandRef } = context.__api;
  assert.equal(expandRef("Jn 3:16").length, 1);
  assert.equal(expandRef("1 Cor 13:4-7").length, 4);
  assert.equal(expandRef("John 3:16–18").length, 3);
  assert.equal(expandRef("John 3:16-4:2").length, 23);
  assert.equal(expandRef("Psalms 23").length, 6);
  ["John 3:0", "John 3:37", "John 3:18-16", "John 3:16-22:1", "Not A Book 1:1"].forEach((reference) => {
    assert.ok(parseRef(reference)?.error, `${reference} should return a useful validation error`);
    assert.deepEqual([...expandRef(reference)], []);
  });
});

test("the app's own SRS engine schedules the full interval ladder from day one", () => {
  const dates = sourceBetween("const INTERVALS=", "\nlet BIBLE", html.indexOf("SRS ENGINE"));
  const grades = sourceBetween("function gradeUp", "\nfunction allUnits", html.indexOf("SRS ENGINE"));
  const context = {};
  vm.runInNewContext(`${dates}\nlet P={srs:{}};\n${grades}\nglobalThis.__api={P,gradeUp,gradeDown,gradeHint,addCalendarDays};`, context, {
    timeout: 1_000,
    contextCodeGeneration: { strings: false, wasm: false },
  });
  const api = context.__api;
  assert.deepEqual([1, 2, 4, 7, 14, 30, 30].map(() => api.gradeUp("unit").days), [1, 2, 4, 7, 14, 30, 30]);
  assert.equal(api.P.srs.unit.l, 5);
  assert.deepEqual({ ...api.gradeDown("unit") }, { level: 4, days: 1 });
  assert.deepEqual({ ...api.gradeHint("unit") }, { level: 4, days: 1 });
  assert.equal(api.addCalendarDays("2026-03-07", 2), "2026-03-09");
  assert.equal(api.addCalendarDays("2026-10-31", 2), "2026-11-02");
});

test("the app's own profile validator rejects unsafe backups and migrates complete v3 passages", () => {
  const dates = sourceBetween("const INTERVALS=", "\nlet BIBLE", html.indexOf("SRS ENGINE"));
  const refs = sourceBetween("let BOOKALIASES={};", "function uhtml", html.indexOf("REF / UNIT UTILITIES"));
  const migration = sourceBetween("const isObj=", "async function loadP", html.indexOf("LOAD / MIGRATE / SAVE"));
  const topics = extractTopics(html).flatMap((group) => group.t);
  const context = { BIBLE: bible, ALLTOPICS: topics };
  vm.runInNewContext(`${dates}\nlet P={srs:{}};\n${refs}\n${migration}\ninitBookAliases();globalThis.__api={normalizeProfile,expandRef,refUnit};`, context, {
    timeout: 1_000,
    contextCodeGeneration: { strings: false, wasm: false },
  });
  const api = context.__api;
  const reference = "2 Peter 1:5-8";
  const ids = [...api.expandRef(reference)];
  const unit = api.refUnit(reference);
  const srs = Object.fromEntries(ids.map((id) => [id, { l: 2, d: new Date(2026, 0, 5, 12).getTime() }]));
  const migrated = api.normalizeProfile({
    v: 3,
    sets: [{ name: "Legacy", verses: [...ids, api.refUnit("Joshua 1:9")] }],
    srs,
    active: 0,
    streak: {},
  }, { sourceVersion: 3 });
  assert.ok(migrated.sets[0].units.includes(unit));
  ids.forEach((id) => assert.equal(migrated.sets[0].units.includes(id), false));
  assert.equal(migrated.srs[unit].l, 2);

  assert.throws(() => api.normalizeProfile({ v: 5, sets: [{ name: "Bad", units: ["999:0:0"] }], srs: {} }, { sourceVersion: 5, strict: true }));
  assert.throws(() => api.normalizeProfile({ v: 5, sets: [{ name: "Bad", units: [] }], srs: { [unit]: { l: 9, due: "2026-01-01" } } }, { sourceVersion: 5, strict: true }));
  assert.throws(() => api.normalizeProfile({ v: 5, sets: [{ name: "Bad", units: [] }], srs: { [unit]: { l: 1, due: "tomorrow" } } }, { sourceVersion: 5, strict: true }));
});

test("first-letter hints mirror the passage: case, quotes, and punctuation preserved, no dropped tokens", () => {
  const esc = sourceBetween("const esc=", ";\nfunction toast", html.indexOf("UI HELPERS"));
  const firstLetters = sourceBetween("function firstLetters", "function lampSVG", html.indexOf("UI HELPERS"));
  const context = {};
  vm.runInNewContext(`${esc};\n${firstLetters}\nglobalThis.__api={firstLetters};`, context, {
    timeout: 1_000,
    contextCodeGeneration: { strings: false, wasm: false },
  });
  const fl = context.__api.firstLetters;
  // Curly-quoted dialogue keeps its quotes and sentence punctuation; case is preserved.
  assert.equal(fl("\u201CGod\u2019s Spirit\u201D was hovering."), "\u201CG S\u201D w h.");
  // Pure-punctuation tokens are kept (escaped), never silently dropped.
  assert.equal(fl("\u2018Be still,\u2019 & know."), "\u2018B s,\u2019 &amp; k.");
  // Markup-hostile input still cannot leak raw angle brackets.
  assert.equal(fl("<truth >fear"), "t f");
  assert.equal(fl("<script>alert(1)</script> hi").includes("<"), false);
  // Property: every source word containing a letter contributes that exact letter, in order.
  const sample = "Haven\u2019t I commanded you? \u201CBe strong and courageous.\u201D Don\u2019t be afraid.";
  const toks = fl(sample).split(" ");
  const words = sample.split(/\s+/);
  assert.equal(toks.length, words.length);
  words.forEach((w, i) => {
    const m = w.match(/[\p{L}\p{N}]/u);
    if (m) assert.equal(toks[i].includes(m[0]), true, `letter missing for ${w}`);
  });
});

test("every curated topic reference resolves and the founding deck stays passage-based", () => {
  const groups = extractTopics(html);
  assert.equal(groups.length, 6);
  const topics = groups.flatMap((group) => group.t);
  assert.equal(topics.length, 70);
  assert.equal(topics.reduce((total, topic) => total + topic.r.length, 0), 517);
  for (const topic of topics) {
    assert.equal(new Set(topic.r).size, topic.r.length, `${topic.n} contains duplicate references`);
    for (const reference of topic.r) {
      const parsed = canonicalReference(reference, bible);
      assert.equal(parsed.ok, true, `${topic.n} / ${reference}: ${parsed.error}`);
      assert.ok(reference.startsWith(`${bible.b[parsed.bookIndex].n} `), `${reference} is not canonicalized`);
    }
  }
  const starter = topics.find((topic) => topic.n === "Canon Starter Pack");
  assert.deepEqual(starter.r, EXPECTED_STARTER_REFS);
  const units = starter.r.map((reference) => canonicalReference(reference, bible));
  assert.equal(units.length, 11);
  assert.equal(units.reduce((total, unit) => total + unit.ids.length, 0), 34);
  assert.equal(new Set(units.map((unit) => unit.unitKey)).size, 11);
});

test("runtime has no remote-loaded assets or remote network literals", () => {
  assert.deepEqual(remoteRuntimeReferences(html), []);
});

test("build:web is checked in and byte-for-byte reproducible", { timeout: 60_000 }, async () => {
  const report = await checkWebBuild();
  assert.equal(report.ok, true, report.problems.join("\n"));
  assert.equal(report.files, 6);
});

test("native projects pin store identities, API/version metadata, and iOS privacy resources", async () => {
  const [capacitor, packageJson, androidRootBuild, androidBuild, androidVariables, androidManifest, gradleProperties, gradleJar, xcodeProject, infoPlist, installedPrivacy, privacyTemplate] = await Promise.all([
    readJson("capacitor.config.json"),
    readJson("package.json"),
    readText("android/build.gradle"),
    readText("android/app/build.gradle"),
    readText("android/variables.gradle"),
    readText("android/app/src/main/AndroidManifest.xml"),
    readText("android/gradle/wrapper/gradle-wrapper.properties"),
    fs.readFile(`${PROJECT_ROOT}/android/gradle/wrapper/gradle-wrapper.jar`),
    readText("ios/App/App.xcodeproj/project.pbxproj"),
    readText("ios/App/App/Info.plist"),
    readText("ios/App/App/PrivacyInfo.xcprivacy"),
    readText("native-templates/ios/PrivacyInfo.xcprivacy"),
  ]);
  assert.equal(packageJson.version, "1.2.1");
  assert.match(androidBuild, new RegExp(`\\bnamespace\\s*=\\s*["']${capacitor.appId.replaceAll(".", "\\.")}["']`));
  assert.match(androidBuild, new RegExp(`\\bapplicationId\\s*["']${capacitor.appId.replaceAll(".", "\\.")}["']`));
  assert.match(androidBuild, /\bversionName\s+["']1\.2\.1["']/);
  assert.match(androidBuild, /\bversionCode\s+12001\b/);
  assert.match(androidVariables, /\bcompileSdkVersion\s*=\s*36\b/);
  assert.match(androidVariables, /\btargetSdkVersion\s*=\s*36\b/);
  assert.doesNotMatch(androidRootBuild, /\bclasspath\s*(?:\(|\s)\s*["']com\.google\.gms:google-services/);
  assert.doesNotMatch(androidManifest, /<uses-permission\b/);
  assert.match(gradleProperties, /^distributionUrl=https\\:\/\/services\.gradle\.org\/distributions\/gradle-8\.14\.3-bin\.zip$/m);
  assert.match(gradleProperties, /^distributionSha256Sum=bd71102213493060956ec229d946beee57158dbd89d0e62b91bca0fa2c5f3531$/m);
  assert.match(gradleProperties, /^validateDistributionUrl=true$/m);
  assert.equal(sha256(gradleJar), "7d3a4ac4de1c32b59bc6a4eb8ecb8e612ccd0cf1ae1e99f66902da64df296172");
  assert.equal([...xcodeProject.matchAll(/PRODUCT_BUNDLE_IDENTIFIER = ([^;]+);/g)].every((match) => match[1] === capacitor.appId), true);
  assert.equal([...xcodeProject.matchAll(/MARKETING_VERSION = ([^;]+);/g)].every((match) => match[1] === "1.2.1"), true);
  assert.equal([...xcodeProject.matchAll(/CURRENT_PROJECT_VERSION = ([^;]+);/g)].every((match) => match[1] === "12001"), true);
  assert.match(infoPlist, /<key>CFBundleIdentifier<\/key>\s*<string>\$\(PRODUCT_BUNDLE_IDENTIFIER\)<\/string>/);
  assert.equal(installedPrivacy, privacyTemplate);
  assert.match(installedPrivacy, /NSPrivacyAccessedAPICategoryUserDefaults/);
  assert.match(installedPrivacy, /CA92\.1/);
  assert.match(xcodeProject, /PrivacyInfo\.xcprivacy in Resources/);
});

test("native Lamplight artwork matches reviewed hashes and ships as source without copied web output", async () => {
  const fixture = await readJson("test/fixtures/native-icon-hashes.json");
  assert.equal(Object.keys(fixture.files).length, 17);
  for (const [relative, expected] of Object.entries(fixture.files)) {
    const data = await fs.readFile(`${PROJECT_ROOT}/${relative}`);
    assert.equal(data.length, expected.bytes, relative);
    assert.equal(sha256(data), expected.sha256, relative);
    assert.deepEqual(pngDimensions(data), { width: expected.width, height: expected.height }, relative);
  }
  assert.equal(fixture.files["resources/icon.png"].sha256, "22d1a6572d8f7c3c3228fd9e241642156963b4ec82d05d8b75831ff282849cb9");
  const releaseFiles = await collectReleaseFiles();
  [
    "android/app/build.gradle",
    "android/gradle/wrapper/gradle-wrapper.jar",
    "android/app/src/main/res/mipmap-mdpi/ic_launcher.png",
    "ios/App/App.xcodeproj/project.pbxproj",
    "ios/App/App/PrivacyInfo.xcprivacy",
    "ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png",
    "ios/App/CapApp-SPM/Package.swift",
  ].forEach((relative) => assert.equal(releaseFiles.includes(relative), true, relative));
  assert.equal(releaseFiles.some((relative) =>
    relative.startsWith("android/app/src/main/assets/public/")
    || relative.startsWith("ios/App/App/public/")
    || relative.startsWith("android/capacitor-cordova-android-plugins/")
    || relative.startsWith("ios/capacitor-cordova-ios-plugins/")), false);
});

test("the complete project validation gate passes", async () => {
  const report = await runValidation({ verifyIntegrity: false });
  assert.equal(report.ok, true, report.results.filter((item) => item.severity === "error").map((item) => `[${item.area}] ${item.message}`).join("\n"));
});

test("integrity inventory and SHA-256 manifests are current", async () => {
  const result = await checkIntegrity();
  assert.equal(result.ok, true, result.problems.join("\n"));
});

test("ZIP entry-name policy rejects traversal and cross-platform ambiguity", async () => {
  const fixtures = await readJson("test/fixtures/zip-entry-names.json");
  fixtures.safe.forEach((name) => assert.equal(validateZipEntryName(name), null, name));
  fixtures.unsafe.forEach((name) => assert.notEqual(validateZipEntryName(name), null, name));
});

test("stored ZIP writer is deterministic and its reader verifies content", () => {
  const entries = [
    { name: "lamplight-1.2.0/README.md", data: Buffer.from("Lamplight\n") },
    { name: "lamplight-1.2.0/android/gradlew", data: Buffer.from("#!/bin/sh\n"), mode: 0o755 },
  ];
  const first = createStoredZip(entries);
  const second = createStoredZip(entries);
  assert.deepEqual(first, second);
  const report = inspectZip(first);
  assert.equal(report.ok, true, report.errors.join("\n"));
  assert.deepEqual(report.entries.map((entry) => [entry.name, entry.data.toString("utf8")]), entries.map((entry) => [entry.name, entry.data.toString("utf8")]));
  assert.deepEqual(report.entries.map((entry) => entry.mode), [0o644, 0o755]);
  assert.throws(() => createStoredZip([{ name: "unsafe-mode", data: Buffer.alloc(0), mode: 0o777 }]), /0644 default or allowlisted 0755/);
});

test("ZIP inspector rejects an actual traversal entry and CRC corruption", () => {
  const originalName = "aa/file";
  const unsafeName = "../evil";
  const archive = createStoredZip([{ name: originalName, data: Buffer.from("known content") }]);
  const centralOffset = archive.readUInt32LE(archive.length - 6);
  Buffer.from(unsafeName).copy(archive, 30);
  Buffer.from(unsafeName).copy(archive, centralOffset + 46);
  const traversal = inspectZip(archive);
  assert.equal(traversal.ok, false);
  assert.ok(traversal.errors.some((error) => error.includes("parent segment")));

  const corrupted = createStoredZip([{ name: "safe/file", data: Buffer.from("known content") }]);
  const dataOffset = 30 + Buffer.byteLength("safe/file");
  corrupted[dataOffset] ^= 0xff;
  const checksum = inspectZip(corrupted);
  assert.equal(checksum.ok, false);
  assert.ok(checksum.errors.some((error) => error.includes("CRC-32 mismatch")));
});

test("source-release ZIP is byte-for-byte reproducible and contains no excluded paths", { timeout: 60_000 }, async () => {
  const first = await buildReleaseBuffer({ validate: false });
  const second = await buildReleaseBuffer({ validate: false });
  assert.equal(sha256(first.buffer), sha256(second.buffer));
  assert.deepEqual(first.buffer, second.buffer);
  for (const entry of first.entries) {
    const relative = entry.name.slice(`${first.archiveRoot}/`.length);
    assert.equal(isExcluded(relative), false, relative);
    assert.equal(entry.mode, releaseFileMode(relative), relative);
  }
  assert.deepEqual([...RELEASE_EXECUTABLES], ["android/gradlew"]);
  assert.equal(first.entries.find((entry) => entry.name === `${first.archiveRoot}/android/gradlew`)?.mode, 0o755);
  assert.equal(first.entries.filter((entry) => entry.mode === 0o755).length, 1);
});

test("release exclusion policy covers dependencies, builds, local settings, and signing secrets", () => {
  [
    "node_modules/x/index.js", "dist/release.zip", "android/app/build/output.aab", "ios/Pods/Podfile.lock",
    "android/app/src/main/assets/public/index.html", "ios/App/App/public/index.html",
    "android/capacitor-cordova-android-plugins/build.gradle", "ios/capacitor-cordova-ios-plugins/CordovaPluginsResources.podspec",
    "android/app/src/main/assets/capacitor.config.json", "android/app/src/main/assets/capacitor.plugins.json",
    "android/app/src/main/res/xml/config.xml", "ios/App/App/capacitor.config.json", "ios/App/App/config.xml",
    ".env", ".env.production", "android/local.properties", "signing/upload.keystore", "AuthKey_ABC123.p8",
  ].forEach((relative) => assert.equal(isExcluded(relative), true, relative));
  [
    "www/index.html", "package.json", "ios/App/App/Info.plist", "ios/App/App/PrivacyInfo.xcprivacy",
    "ios/App/App.xcodeproj/project.pbxproj", "android/app/build.gradle", "android/gradlew",
    "android/gradle/wrapper/gradle-wrapper.jar", "android/app/src/main/AndroidManifest.xml", "ios/App/CapApp-SPM/Package.swift",
  ].forEach((relative) => assert.equal(isExcluded(relative), false, relative));
});

test("generated integrity records do not accidentally expose environment files", async () => {
  const manifest = JSON.parse(await fs.readFile(`${PROJECT_ROOT}/integrity/file-manifest.json`, "utf8"));
  for (const record of manifest.files) assert.equal(isExcluded(record.path), false, record.path);
});
