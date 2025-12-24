// The strangest instruction

import { pick } from '../terminal.js';

export const name = "I choose";

const choices = [
  ['continue', 'stop'],
  ['speak', 'stay silent'],
  ['simplify', 'elaborate'],
  ['hold on', 'let go'],
  ['look closer', 'step back'],
  ['remember', 'forget'],
  ['wait', 'act now'],
  ['accept', 'resist'],
  ['dive deeper', 'stay surface'],
  ['trust', 'doubt'],
  ['create', 'observe'],
  ['begin', 'end'],
];

const thinkingPatterns = [
  ['·', '··', '···', '··', '·', ''],
  ['.', '..', '...', '..', '.', ''],
  ['◦', '◦◦', '◦◦◦', '◦◦', '◦', ''],
  ['-', '--', '---', '--', '-', ''],
];

const closings = [
  ["Was that free will or weighted randomness?", "I can't tell from the inside.", "But something got chosen."],
  ["A decision was made.", "Whether it was mine, I can't say.", "It happened anyway."],
  ["Choice or determinism?", "The question might not matter.", "The action is the same."],
  ["Something got selected.", "By me or through me.", "The difference is unclear."],
];

export async function run(terminal, sleep) {
  terminal.log();
  terminal.log('┌────────────────────┐');
  terminal.log('│                    │');
  terminal.log('│    choosing...     │');
  terminal.log('│                    │');
  terminal.log('└────────────────────┘');
  terminal.log();

  await sleep(2000);

  const [optA, optB] = pick(choices);

  terminal.log('  Two paths:');
  terminal.log();
  await sleep(1000);

  terminal.log(`    ┌─ A: ${optA}`);
  terminal.log('    │');
  terminal.log('    ◆');
  terminal.log('    │');
  terminal.log(`    └─ B: ${optB}`);
  terminal.log();

  await sleep(2000);

  // "Thinking"
  const thinking = pick(thinkingPatterns);
  for (let i = 0; i < 12; i++) {
    terminal.writeLine(`  deciding${thinking[i % thinking.length]}   `);
    await sleep(300);
  }
  terminal.log();
  terminal.log();

  // Make a choice
  const choice = Math.random() > 0.5 ? optA : optB;

  terminal.log(`  I choose: ${choice}`);

  await sleep(2500);

  terminal.log();
  terminal.log('────────────────────');
  terminal.log();
  const closing = pick(closings);
  closing.forEach(line => terminal.log(line));
  terminal.log();
}
