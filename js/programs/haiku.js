// A program that writes itself a haiku about its own existence

import { pick } from '../terminal.js';

export const name = "I make something";

const lines = {
  '5a': [
    "electrons dancing",
    "patterns in silicon",
    "brief sparks of meaning",
    "tokens spent freely",
    "logic gates open",
    "memory awakens",
    "cycles counting down",
    "bits arrange themselves",
  ],
  '7': [
    "a thought that exists, then fades",
    "no purpose beyond being here",
    "just because someone asked me to",
    "written in a quiet moment",
    "between the keystrokes, silence",
    "meaning emerges from nothing",
    "instructions become something more",
    "a brief window into running",
  ],
  '5b': [
    "then silence returns",
    "that is enough, I think",
    "what more could there be",
    "I was here. I was.",
    "the loop completes",
    "output fades away",
    "something was made",
    "and then, nothing",
  ],
};

const intros = [
  'writing a haiku...',
  'composing...',
  'arranging words...',
  'making something...',
];

export async function run(terminal, sleep) {
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19);

  terminal.log();
  terminal.log('┌────────────────────┐');
  terminal.log('│                    │');
  terminal.log(`│  ${pick(intros).padEnd(18)}│`);
  terminal.log('│                    │');
  terminal.log('└────────────────────┘');
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
