// Simple rules, complex beauty

import { pick } from '../terminal.js';

export const name = "patterns emerge";

const width = 20;
const height = 12;
const generations = 35;

const chars = ['.', ':', '*', 'o', 'O', '@', '#'];

const closings = [
  ["From one point, all of this.", "Emergence is just patience made visible."],
  ["Complexity from simplicity.", "The rules were simple. The result wasn't."],
  ["It started with almost nothing.", "That's how most things start."],
  ["Watch long enough, and patterns appear.", "Or maybe they were always there."],
];

// Random starting positions
const startPositions = [
  () => ({ y: Math.floor(height / 2), x: Math.floor(width / 2) }), // center
  () => ({ y: 1, x: 1 }), // top-left
  () => ({ y: 1, x: width - 2 }), // top-right
  () => ({ y: height - 2, x: Math.floor(width / 2) }), // bottom-center
  () => ({ y: Math.floor(height / 2), x: 1 }), // left-center
];

export async function run(terminal, sleep) {
  const grid = Array(height).fill(null).map(() => Array(width).fill(' '));

  // Start with a single seed at random position
  const start = pick(startPositions)();
  grid[start.y][start.x] = '*';

  // Variable probabilities
  const spreadProb = 0.10 + Math.random() * 0.10; // 10-20%
  const evolveProb = 0.05 + Math.random() * 0.10; // 5-15%

  const draw = (gen) => {
    terminal.clear();
    terminal.log();
    terminal.log(`Generation ${gen + 1}`);
    terminal.log('─'.repeat(width));
    grid.forEach(row => terminal.log(row.join('')));
    terminal.log('─'.repeat(width));
  };

  const grow = () => {
    const newGrid = grid.map(row => [...row]);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (grid[y][x] !== ' ') {
          // Spread to neighbors
          const neighbors = [
            [-1, 0], [1, 0], [0, -1], [0, 1],
            [-1, -1], [-1, 1], [1, -1], [1, 1]
          ];

          for (const [dy, dx] of neighbors) {
            const ny = y + dy;
            const nx = x + dx;

            if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
              if (grid[ny][nx] === ' ' && Math.random() < spreadProb) {
                newGrid[ny][nx] = pick(chars.slice(0, 4));
              }
            }
          }

          // Sometimes evolve
          if (Math.random() < evolveProb) {
            const idx = chars.indexOf(grid[y][x]);
            if (idx >= 0 && idx < chars.length - 1) {
              newGrid[y][x] = chars[idx + 1];
            }
          }
        }
      }
    }

    // Copy back
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        grid[y][x] = newGrid[y][x];
      }
    }
  };

  terminal.log();
  terminal.log('╔══════════════════════════╗');
  terminal.log('║                          ║');
  terminal.log('║      emerging...         ║');
  terminal.log('║                          ║');
  terminal.log('╚══════════════════════════╝');
  terminal.log();
  terminal.log('A single seed. Simple rules.');
  terminal.log('Watch what happens.');
  terminal.log();

  await sleep(2500);

  for (let gen = 0; gen < generations; gen++) {
    draw(gen);
    await sleep(180);
    grow();
  }

  await sleep(1000);

  terminal.log();
  const closing = pick(closings);
  closing.forEach(line => terminal.log(line));
  terminal.log();
}
