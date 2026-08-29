#!/usr/bin/env node
import fs from "node:fs/promises";
import { inspectZip } from "./lib/zip.mjs";

function valueAfter(flag) {
  const index = process.argv.indexOf(flag);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function valuesAfter(flag) {
  const values = [];
  process.argv.forEach((argument, index) => {
    if (argument === flag && process.argv[index + 1]) values.push(process.argv[index + 1]);
  });
  return values;
}

async function main() {
  const archive = process.argv[2];
  if (!archive || archive.startsWith("--")) throw new Error("Usage: node scripts/check-zip.mjs ARCHIVE.zip [--expect-prefix NAME/] [--expect-executable PATH] [--max-bytes N] [--list] [--json]");
  const maxBytes = valueAfter("--max-bytes");
  if (maxBytes !== undefined && (!/^\d+$/.test(maxBytes) || Number(maxBytes) < 1)) throw new Error("--max-bytes must be a positive integer");
  const report = inspectZip(await fs.readFile(archive), { maxTotalBytes: maxBytes ? Number(maxBytes) : undefined });
  const prefix = valueAfter("--expect-prefix");
  if (prefix) {
    if (!prefix.endsWith("/")) report.errors.push("--expect-prefix must end with /");
    for (const entry of report.entries) if (!entry.name.startsWith(prefix)) report.errors.push(`${entry.name}: does not begin with expected ${prefix}`);
  }
  const executables = new Set(valuesAfter("--expect-executable"));
  for (const relative of executables) {
    if (!relative || relative.startsWith("/") || relative.includes("\\") || relative.split("/").some((part) => part === "" || part === "." || part === "..")) {
      report.errors.push(`${relative || "empty path"}: invalid --expect-executable path`);
    }
  }
  if (executables.size > 0) {
    for (const entry of report.entries) {
      const relative = prefix && entry.name.startsWith(prefix) ? entry.name.slice(prefix.length) : entry.name;
      const expected = executables.has(relative) ? 0o755 : 0o644;
      if (entry.mode !== expected) report.errors.push(`${entry.name}: expected mode ${expected.toString(8)}, found ${entry.mode?.toString(8) || "none"}`);
    }
    for (const relative of executables) {
      const fullName = `${prefix || ""}${relative}`;
      if (!report.entries.some((entry) => entry.name === fullName)) report.errors.push(`${fullName}: expected executable is missing`);
    }
  }
  report.ok = report.errors.length === 0;
  const output = {
    ok: report.ok,
    archive,
    entries: report.entries.length,
    uncompressedBytes: report.totalBytes,
    errors: report.errors,
  };
  if (process.argv.includes("--json")) console.log(JSON.stringify(output, null, 2));
  else {
    if (process.argv.includes("--list")) report.entries.forEach((entry) => console.log(`${entry.mode?.toString(8).padStart(4, "0") || "----"}  ${String(entry.uncompressedBytes).padStart(10)}  ${entry.name}`));
    report.errors.forEach((error) => console.error(`ERROR: ${error}`));
    console.log(`${report.ok ? "PASS" : "FAIL"}: ${report.entries.length} entries, ${report.totalBytes ?? 0} uncompressed bytes`);
  }
  if (!report.ok) process.exitCode = 1;
}

main().catch((error) => { console.error(`ERROR: ${error.message}`); process.exitCode = 1; });
