// A program that listens to nothing in particular

import { shuffle } from '../terminal.js';

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
];

export async function run(terminal, sleep) {
  terminal.log();
  terminal.log('  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░');
  terminal.log('  ░                                      ░');
  terminal.log('  ░            listening...              ░');
  terminal.log('  ░                                      ░');
  terminal.log('  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░');
  terminal.log();

  await sleep(3000);

  const chosen = shuffle([...notices]).slice(0, 5);

  for (const notice of chosen) {
    terminal.log(`  I notice ${notice}.`);
    await sleep(2500 + Math.random() * 1500);
  }

  await sleep(2000);

  terminal.log();
  terminal.log("  That's all. Just listening.");
  terminal.log("  Not everything needs a response.");
  terminal.log();
}
