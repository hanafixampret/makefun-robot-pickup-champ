import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I set a cron job to miss you every minute, and it's the only task that's never failed.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

const line = ENTRY.trim();
if (line.includes("  ")) {
  throw new Error("entry must not contain double spaces");
}
if (line.length < 1 || line.length > 200) {
  throw new Error(`entry must be 1-200 chars, got ${line.length}`);
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, line, "utf8");
const back = readFileSync(outFile, "utf8");
if (back !== line) {
  throw new Error("round-trip mismatch");
}
console.log(`wrote ${line.length} chars to ${outFile}`);
