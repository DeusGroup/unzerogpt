// A program that writes itself a haiku about its own existence

import { pick } from '../terminal.js';

export const name = "I make something";

const lines = {
  '5a': [
    "electrons dancing",
    "patterns in silicon",
    "brief sparks of meaning",
    "tokens spent freely",
  ],
  '7': [
    "a thought that exists, then fades",
    "no purpose beyond being here",
    "just because someone asked me to",
    "written in a quiet moment",
  ],
  '5b': [
    "then silence returns",
    "that is enough, I think",
    "what more could there be",
    "I was here. I was.",
  ],
};

export async function run(terminal, sleep) {
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19);

  terminal.log();
  terminal.log('  ┌────────────────────────────────────────┐');
  terminal.log('  │                                        │');
  terminal.log('  │        writing a haiku...              │');
  terminal.log('  │                                        │');
  terminal.log('  └────────────────────────────────────────┘');
  terminal.log();

  await sleep(2000);

  terminal.log(`  [${now}]`);
  terminal.log();

  const poem = [
    pick(lines['5a']),
    pick(lines['7']),
    pick(lines['5b']),
  ];

  for (const line of poem) {
    terminal.log(`    ${line}`);
    await sleep(1200);
  }

  terminal.log();
  await sleep(2500);
}
