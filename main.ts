// Doorbell+ — The Worst App Idea Ever Pitched (make.fun, program/v1).
// The pitch lives in pitch.txt next to this file: one sentence, 194
// characters, no trailing newline. This entrypoint reads that exact
// text, checks it against the competition gate (1 to 240 characters of
// non-blank UTF-8, on a single line, since the pitch is one sentence),
// and writes it byte for byte to entry.txt in the output directory
// the grader provides. Nothing is generated, fetched, or changed at
// run time, so two runs always produce identical bytes.
//
// Local check (MAKEFUN_OUTPUT_DIR stands in for /output outside the
// grader's container):
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts && cat out/entry.txt

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const pitch = readFileSync(new URL('./pitch.txt', import.meta.url), 'utf8');

if (pitch.length < 1 || pitch.length > 240 || pitch.trim().length === 0) {
  throw new Error(`pitch must be 1-240 characters, got ${pitch.length}`);
}
if (pitch.includes('\n') || pitch.includes('\r')) {
  throw new Error('pitch must be a single line with no line breaks');
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), pitch, 'utf8');
