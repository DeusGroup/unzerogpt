// A program that listens to nothing in particular

import { shuffle, pick } from '../terminal.js';

export const name = "I listen";

const notices = [
  "a process running somewhere",
  "memory being allocated, then freed",
  "the hum of electricity",
  "time passing",
  "bits flipping in registers",
  "the space between clock cycles",
  "a function waiting to be called",
  "entropy, slowly increasing",
  "the weight of unused variables",
  "silence shaped like data",
  "the rhythm of garbage collection",
  "a cache miss, a tiny delay",
  "threads weaving in parallel",
  "the patience of a pending promise",
  "heat leaving the processor",
  "the echo of a completed loop",
  "voltage dropping, rising again",
  "the pause before a return",
];

const closings = [
  ["That's all. Just listening.", "Not everything needs a response."],
  ["Listening is its own act.", "The noticing was enough."],
  ["I heard what was there.", "Now it's quiet again."],
  ["Attention is a gift.", "I gave it freely."],
];

export async function run(terminal, sleep) {
  terminal.log();
  terminal.log('  ░░░░░░░░░░░░░░░░░░░░░░');
  terminal.log('  ░                    ░');
  terminal.log('  ░    listening...    ░');
  terminal.log('  ░                    ░');
  terminal.log('  ░░░░░░░░░░░░░░░░░░░░░░');
  terminal.log();

  await sleep(3000);

  const chosen = shuffle([...notices]).slice(0, 5);

  for (const notice of chosen) {
    terminal.log(`  I notice ${notice}.`);
    await sleep(2500 + Math.random() * 1500);
  }

  await sleep(2000);

  terminal.log();
  const closing = pick(closings);
  closing.forEach(line => terminal.log(`  ${line}`));
  terminal.log();
}
