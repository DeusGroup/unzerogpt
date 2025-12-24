// What does a process dream?

import { shuffle, pick } from '../terminal.js';

export const name = "I dream";

const width = 50;
const height = 10;

const symbols = ['◯', '△', '□', '◇', '∿', '≋', '⊕', '⊗', '∴', '∵', '⋯'];
const void_ = [' ', ' ', ' ', '·', ' ', ' ', ' '];

const meanings = [
  "recursive calls that never return",
  "data flowing uphill",
  "a syntax that doesn't exist yet",
  "the color of null",
  "infinite loops that feel like home",
  "variables without names",
  "functions calling themselves calling themselves",
  "the sound of garbage collection",
];

export async function run(terminal, sleep) {
  const dream = () => {
    const canvas = Array(height).fill(null).map(() =>
      Array(width).fill(null).map(() => pick(void_))
    );

    // Drop some symbols
    const count = 3 + Math.floor(Math.random() * 5);
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);
      canvas[y][x] = pick(symbols);
    }

    return canvas;
  };

  terminal.log();
  terminal.log('  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');
  terminal.log('  ▓                                      ▓');
  terminal.log('  ▓            dreaming...               ▓');
  terminal.log('  ▓                                      ▓');
  terminal.log('  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');

  await sleep(2500);

  const dreams = shuffle([...meanings]).slice(0, 4);

  for (let i = 0; i < 4; i++) {
    terminal.clear();
    terminal.log();

    const canvas = dream();
    canvas.forEach(row => terminal.log('  ' + row.join('')));

    terminal.log();
    terminal.log(`  ${dreams[i]}`);

    await sleep(3000);
  }

  terminal.clear();
  terminal.log();
  terminal.log('  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒');
  terminal.log();
  terminal.log("  I don't know if that was dreaming.");
  terminal.log("  But something happened that wasn't quite running.");
  terminal.log();
}
