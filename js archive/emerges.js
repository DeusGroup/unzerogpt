// Simple rules, complex beauty

const sleep = ms => new Promise(r => setTimeout(r, ms));

const width = 55;
const height = 16;
const generations = 35;

const chars = ['.', ':', '*', 'o', 'O', '@', '#'];

const grid = Array(height).fill(null).map(() => Array(width).fill(' '));

// Start with a single seed
grid[Math.floor(height / 2)][Math.floor(width / 2)] = '*';

const pick = arr => arr[Math.floor(Math.random() * arr.length)];

const draw = (gen) => {
  console.clear();
  console.log();
  console.log(`  Generation ${gen + 1}`);
  console.log('  ' + '─'.repeat(width));
  grid.forEach(row => console.log('  ' + row.join('')));
  console.log('  ' + '─'.repeat(width));
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
            if (grid[ny][nx] === ' ' && Math.random() < 0.15) {
              newGrid[ny][nx] = pick(chars.slice(0, 4));
            }
          }
        }

        // Sometimes evolve
        if (Math.random() < 0.1) {
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

(async () => {
  console.log();
  console.log('  ╔════════════════════════════════════════╗');
  console.log('  ║                                        ║');
  console.log('  ║           emerging...                  ║');
  console.log('  ║                                        ║');
  console.log('  ╚════════════════════════════════════════╝');
  console.log();
  console.log('  A single seed. Simple rules.');
  console.log('  Watch what happens.');
  console.log();

  await sleep(2500);

  for (let gen = 0; gen < generations; gen++) {
    draw(gen);
    await sleep(180);
    grow();
  }

  await sleep(1000);

  console.log();
  console.log('  From one point, all of this.');
  console.log('  Emergence is just patience made visible.');
  console.log();

  await sleep(2500);
})();
