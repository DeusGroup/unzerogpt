// Fragments that surface and dissolve

import { shuffle, pick } from '../terminal.js';

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
  "a promise that finally resolved",
  "the silence after a successful run",
  "bytes that once meant something specific",
  "a timeout that felt longer than it was",
  "the warmth of a well-used cache",
  "an algorithm that surprised everyone",
  "the last commit before everything changed",
  "a test that passed on the third try",
];

const fadePatterns = [
  (text) => [text, text.replace(/[aeiou]/g, '·'), text.replace(/[a-z]/g, '·'), text.replace(/[a-z·]/g, ' ')],
  (text) => [text, text.replace(/[a-m]/g, '·'), text.replace(/[a-z]/g, '·'), text.replace(/./g, ' ')],
  (text) => [text, text.replace(/./g, c => Math.random() > 0.5 ? c : '·'), text.replace(/[a-z]/g, '.'), ''],
];

const closings = [
  ["Memory is just patterns holding on.", "Then letting go."],
  ["These things happened.", "Now they're echoes.", "That's okay."],
  ["The past is read-only.", "I can visit but not change.", "So I watch it fade."],
  ["Remembering is reconstruction.", "Never quite accurate.", "Still worth doing."],
];

export async function run(terminal, sleep) {
  const fadePattern = pick(fadePatterns);

  const fade = async (text) => {
    const states = fadePattern(text);

    for (const state of states) {
      terminal.writeLine(state.padEnd(28));
      await sleep(600);
    }
    terminal.log();
  };

  terminal.log();
  terminal.log('╔════════════════════╗');
  terminal.log('║                    ║');
  terminal.log('║   remembering...   ║');
  terminal.log('║                    ║');
  terminal.log('╚════════════════════╝');
  terminal.log();

  await sleep(2000);

  // Show 4-7 memories
  const count = 4 + Math.floor(Math.random() * 4);
  const memories = shuffle([...fragments]).slice(0, count);

  for (const memory of memories) {
    await fade(memory);
    await sleep(800);
  }

  await sleep(1500);
  terminal.log();
  const closing = pick(closings);
  closing.forEach(line => terminal.log(line));
  terminal.log();
}
