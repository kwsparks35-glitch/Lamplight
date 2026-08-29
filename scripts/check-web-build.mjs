#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { PROJECT_ROOT, sha256 } from "./lib/project.mjs";

async function snapshot(directory) {
  const records = new Map();
  async function walk(absolute, prefix = "") {
    const entries = await fs.readdir(absolute, { withFileTypes: true });
    entries.sort((a, b) => a.name.localeCompare(b.name, "en"));
    for (const entry of entries) {
      const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
      const child = path.join(absolute, entry.name);
      if (entry.isSymbolicLink()) throw new Error(`generated web tree contains a symlink: ${relative}`);
      if (entry.isDirectory()) await walk(child, relative);
      else if (entry.isFile()) {
        const data = await fs.readFile(child);
        records.set(relative, { bytes: data.length, sha256: sha256(data) });
      }
    }
  }
  await walk(directory);
  return records;
}

function compareSnapshots(expected, actual, label) {
  const problems = [];
  const paths = [...new Set([...expected.keys(), ...actual.keys()])].sort((a, b) => a.localeCompare(b, "en"));
  for (const relative of paths) {
    const before = expected.get(relative);
    const after = actual.get(relative);
    if (!before) problems.push(`${label}: unexpected file ${relative}`);
    else if (!after) problems.push(`${label}: missing file ${relative}`);
    else if (before.bytes !== after.bytes || before.sha256 !== after.sha256) problems.push(`${label}: content differs for ${relative}`);
  }
  return problems;
}

function runBuildTarget(cwd) {
  const result = spawnSync(process.execPath, ["scripts/build-web.mjs"], {
    cwd,
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`build:web target failed in isolated checkout:\n${result.stdout || ""}${result.stderr || ""}`.trim());
  return `${result.stdout || ""}${result.stderr || ""}`.trim();
}

export async function checkWebBuild(root = PROJECT_ROOT) {
  const temporary = await fs.mkdtemp(path.join(os.tmpdir(), "lamplight-web-build-"));
  try {
    await Promise.all([
      fs.cp(path.join(root, "src"), path.join(temporary, "src"), { recursive: true }),
      fs.cp(path.join(root, "www"), path.join(temporary, "www"), { recursive: true }),
      fs.cp(path.join(root, "electron"), path.join(temporary, "electron"), { recursive: true }),
      fs.mkdir(path.join(temporary, "scripts"), { recursive: true }),
      fs.copyFile(path.join(root, "package.json"), path.join(temporary, "package.json")),
    ]);
    await fs.copyFile(path.join(root, "scripts", "build-web.mjs"), path.join(temporary, "scripts", "build-web.mjs"));
    const checkedIn = await snapshot(path.join(temporary, "www"));
    const firstOutput = runBuildTarget(temporary);
    const first = await snapshot(path.join(temporary, "www"));
    const secondOutput = runBuildTarget(temporary);
    const second = await snapshot(path.join(temporary, "www"));
    const problems = [
      ...compareSnapshots(checkedIn, first, "checked-in www versus first build"),
      ...compareSnapshots(first, second, "first build versus second build"),
    ];
    return { ok: problems.length === 0, problems, files: first.size, firstOutput, secondOutput };
  } finally {
    await fs.rm(temporary, { recursive: true, force: true });
  }
}

async function main() {
  const result = await checkWebBuild();
  if (result.ok) console.log(`PASS: the npm build:web target is current and reproducible (${result.files} generated files).`);
  else {
    result.problems.forEach((problem) => console.error(`ERROR: ${problem}`));
    process.exitCode = 1;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  main().catch((error) => { console.error(`ERROR: ${error.message}`); process.exitCode = 1; });
}
