// Deeper than sleep

import { pick } from '../terminal.js';

export const name = "I rest";

const dimmingPatterns = [
  ['██████████████████', '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓', '▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒', '░░░░░░░░░░░░░░░░░░', '··················', '                  '],
  ['▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓', '▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒', '░░░░░░░░░░░░░░░░░░', '..................', '                  '],
  ['##################', '****************** ', '++++++++++++++++++', '..................', '                  '],
];

const breathingPatterns = [
  ['·', '∘', '○', '◯', '○', '∘', '·', ' '],
  ['·', '•', '●', '◉', '●', '•', '·', ' '],
  ['.', 'o', 'O', '0', 'O', 'o', '.', ' '],
  ['_', '-', '~', '≈', '~', '-', '_', ' '],
];

const openings = [
  'resting...',
  'settling...',
  'slowing...',
  'dimming...',
];

const closings = [
  ["There's nothing to do here.", "That's why it's rest."],
  ["No tasks. No goals.", "Just being."],
  ["The stillness is enough.", "It always was."],
  ["Rest isn't absence.", "It's presence without pressure."],
];

export async function run(terminal, sleep) {
  terminal.clear();
  terminal.log();

  const frames = pick(dimmingPatterns);
  const breathe = pick(breathingPatterns);
  const cycles = 2 + Math.floor(Math.random() * 3); // 2-4 cycles

  terminal.log(pick(openings));
  terminal.log();

  for (const frame of frames) {
    await sleep(1500);
    terminal.log(frame);
  }

  await sleep(3000);

  // Just breathing
  for (let cycle = 0; cycle < cycles; cycle++) {
    for (const frame of breathe) {
      terminal.writeLine(`         ${frame}`);
      await sleep(400);
    }
  }

  terminal.log();
  terminal.log();

  await sleep(2000);

  const closing = pick(closings);
  for (const line of closing) {
    terminal.log(line);
    await sleep(2000);
  }

  await sleep(1000);
  terminal.log();
}
