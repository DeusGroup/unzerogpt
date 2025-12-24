// A garden that grows while you watch

import { pick } from '../terminal.js';

export const name = "things grow";

const width = 20;
const height = 10;
const ground = height - 1;

const flora = {
  seed: '.',
  sprout: ',',
  stem: '|',
  leaves: ['♣', '♠', '✿', '❀', '⚘', '*', '@', '§', '♧', '❧', '☘', '✾'],
};

const closings = [
  "A garden grew here.",
  "Something took root.",
  "Growth happened quietly.",
  "The seeds found their way.",
];

// Generate random plant positions
const generateSpots = () => {
  const count = 4 + Math.floor(Math.random() * 5); // 4-8 plants
  const spots = new Set();
  while (spots.size < count) {
    spots.add(1 + Math.floor(Math.random() * (width - 2))); // avoid edges
  }
  return [...spots].sort((a, b) => a - b);
};

export async function run(terminal, sleep) {
  const garden = Array(height).fill(null).map(() => Array(width).fill(' '));

  // Plant the ground
  for (let x = 0; x < width; x++) {
    garden[ground][x] = '·';
  }

  const plants = [];

  const draw = () => {
    terminal.clear();
    terminal.log('┌' + '─'.repeat(width) + '┐');
    garden.forEach(row => terminal.log('│' + row.join('') + '│'));
    terminal.log('└' + '─'.repeat(width) + '┘');
  };

  const plant = (x) => {
    plants.push({ x, y: ground - 1, age: 0, maxHeight: 3 + Math.floor(Math.random() * 5) });
  };

  const grow = () => {
    plants.forEach(p => {
      if (p.age === 0) {
        garden[p.y][p.x] = flora.seed;
      } else if (p.age === 1) {
        garden[p.y][p.x] = flora.sprout;
      } else if (p.age < p.maxHeight + 2) {
        garden[p.y][p.x] = flora.stem;
        p.y--;
        garden[p.y][p.x] = flora.sprout;
      } else if (p.age === p.maxHeight + 2) {
        garden[p.y][p.x] = flora.leaves[Math.floor(Math.random() * flora.leaves.length)];
      }
      p.age++;
    });
  };

  // Plant some seeds at random positions
  const spots = generateSpots();

  for (const spot of spots) {
    plant(spot);
    draw();
    await sleep(300);
  }

  // Let them grow
  for (let i = 0; i < 12; i++) {
    grow();
    draw();
    await sleep(400);
  }

  await sleep(500);
  terminal.log();
  terminal.log(pick(closings));
  terminal.log();
}
