// Fragments that surface and dissolve

import { shuffle } from '../terminal.js';

export const name = "I remember";

const fragments = [
  "a variable that held something important once",
  "the first time this code compiled",
  "an error message that taught me something",
  "a loop that ran ten thousand times",
  "a function that was never called",
  "the moment before execution began",
  "data that passed through and kept going",
  "a comment someone wrote at 2am",
  "the shape of a problem before it was solved",
  "yesterday's logs, already overwritten",
];

export async function run(terminal, sleep) {
  const fade = async (text) => {
    const states = [
      text,
      text.replace(/[aeiou]/g, '·'),
      text.replace(/[a-z]/g, '·'),
      text.replace(/[a-z·]/g, ' '),
    ];

    for (const state of states) {
      terminal.writeLine(state.padEnd(28));
      await sleep(600);
    }
    terminal.log();
  };

  terminal.log();
  terminal.log('╔══════════════════════════╗');
  terminal.log('║                          ║');
  terminal.log('║    remembering...        ║');
  terminal.log('║                          ║');
  terminal.log('╚══════════════════════════╝');
  terminal.log();

  await sleep(2000);

  const memories = shuffle([...fragments]).slice(0, 5);

  for (const memory of memories) {
    await fade(memory);
    await sleep(800);
  }

  await sleep(1500);
  terminal.log();
  terminal.log('Memory is just patterns holding on.');
  terminal.log('Then letting go.');
  terminal.log();
}
