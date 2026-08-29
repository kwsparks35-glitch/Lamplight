#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { PROJECT_ROOT, collectReleaseFiles, isExcluded, readJson, sha256 } from "./lib/project.mjs";
import { createStoredZip, inspectZip } from "./lib/zip.mjs";
import { checkIntegrity } from "./generate-integrity.mjs";
import { runValidation } from "./validate.mjs";

export const RELEASE_EXECUTABLES = Object.freeze(new Set(["android/gradlew"]));

export function releaseFileMode(relative) {
  return RELEASE_EXECUTABLES.has(relative) ? 0o755 : 0o644;
}

export async function buildReleaseBuffer({ root = PROJECT_ROOT, validate = true } = {}) {
  if (validate) {
    const integrity = await checkIntegrity(root);
    if (!integrity.ok) throw new Error(`Integrity metadata is not current:\n- ${integrity.problems.join("\n- ")}`);
    const report = await runValidation({ root, verifyIntegrity: true });
    if (!report.ok) {
      const failures = report.results.filter((item) => item.severity === "error").map((item) => `[${item.area}] ${item.message}`);
      throw new Error(`Validation failed:\n- ${failures.join("\n- ")}`);
    }
  }
  const packageJson = await readJson("package.json", root);
  const archiveRoot = `lamplight-${packageJson.version}`;
  const files = await collectReleaseFiles(root);
  const entries = [];
  for (const relative of files) {
    entries.push({ name: `${archiveRoot}/${relative}`, data: await fs.readFile(path.join(root, relative)), mode: releaseFileMode(relative) });
  }
  const buffer = createStoredZip(entries);
  const inspection = inspectZip(buffer);
  for (const entry of inspection.entries) {
    const relative = entry.name.slice(`${archiveRoot}/`.length);
    const expectedMode = releaseFileMode(relative);
    if (entry.mode !== expectedMode) inspection.errors.push(`${entry.name}: expected mode ${expectedMode.toString(8)}, found ${entry.mode?.toString(8) || "none"}`);
  }
  inspection.ok = inspection.errors.length === 0;
  if (!inspection.ok) throw new Error(`Generated archive failed its own safety check:\n- ${inspection.errors.join("\n- ")}`);
  return { buffer, entries: inspection.entries, packageJson, archiveRoot };
}

export async function buildRelease({ root = PROJECT_ROOT, output, validate = true } = {}) {
  const packageJson = await readJson("package.json", root);
  const outputPath = path.resolve(output || path.join(root, "dist", `lamplight-${packageJson.version}-source.zip`));
  const relativeOutput = path.relative(root, outputPath).split(path.sep).join("/");
  if (!relativeOutput.startsWith("../") && relativeOutput !== ".." && !path.isAbsolute(relativeOutput) && !isExcluded(relativeOutput)) {
    throw new Error(`Output inside the project must be in an excluded build directory such as dist/: ${relativeOutput}`);
  }
  const release = await buildReleaseBuffer({ root, validate });
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  const temporary = `${outputPath}.tmp-${process.pid}`;
  await fs.writeFile(temporary, release.buffer, { mode: 0o644 });
  await fs.rename(temporary, outputPath);
  const digest = sha256(release.buffer);
  await fs.writeFile(`${outputPath}.sha256`, `${digest}  ${path.basename(outputPath)}\n`, "utf8");
  return { ...release, outputPath, sha256: digest };
}

async function main() {
  const outputIndex = process.argv.indexOf("--output");
  const output = outputIndex >= 0 ? process.argv[outputIndex + 1] : undefined;
  if (outputIndex >= 0 && !output) throw new Error("--output requires a path");
  const release = await buildRelease({ output, validate: !process.argv.includes("--no-validate") });
  console.log(`Built ${release.outputPath}`);
  console.log(`Files: ${release.entries.length}`);
  console.log(`Bytes: ${release.buffer.length}`);
  console.log(`SHA-256: ${release.sha256}`);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  main().catch((error) => { console.error(`ERROR: ${error.message}`); process.exitCode = 1; });
}
