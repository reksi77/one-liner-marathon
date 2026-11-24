// One-Liner Marathon — entry program.
//
// Writes exactly one chosen one-liner to /output/entry.txt.
// The text is a fixed string: no randomness, no clock, no network, so
// every run produces byte-identical output.
import { mkdirSync, writeFileSync } from "node:fs";

// The chosen joke: a voicemail greeting recorded at twenty-two, still
// answering calls from a stranger who has not been disappointed yet.
const ENTRY =
  "My voicemail greeting is still me at twenty-two, sounding hopeful, and every time it plays I feel like I am getting a call from a stranger who has not been disappointed yet, and I still keep answering, just in case he knows something I forgot.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 280 characters,
// not only white space, and a single line. Fail loudly here instead of
// shipping an entry the scorer would refuse.
function validateEntry(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 280) {
    throw new Error(`entry must be 1-280 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

const outputDir = process.env.OUTPUT_DIR ?? "/output";
validateEntry(ENTRY);
mkdirSync(outputDir, { recursive: true });
writeFileSync(`${outputDir}/entry.txt`, ENTRY, "utf8");
