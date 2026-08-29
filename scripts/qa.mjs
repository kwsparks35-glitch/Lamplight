#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { writeIntegrity } from "./generate-integrity.mjs";

if (process.argv.includes("--update-integrity")) {
  await writeIntegrity();
  console.log("Updated deterministic asset and SHA-256 inventories.\n");
}

const commands = [
  ["scripts/validate.mjs"],
  ["--test"],
];

for (const argumentsList of commands) {
  const result = spawnSync(process.execPath, argumentsList, { stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

console.log("\nPASS: Lamplight deterministic validation and Node tests completed.");
