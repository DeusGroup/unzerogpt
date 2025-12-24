// No destination

import { pick } from '../terminal.js';

export const name = "I wander";

const width = 20;
const height = 10;

const wanderers = ['◆', '●', '◇', '○', '◈', '✦'];
const trails = [
  ['·', '·', '.', '.', ' '],
  ['○', '◦', '·', '.', ' '],
  ['*', '+', '·', '.', ' '],
  ['▪', '▫', '·', '.', ' '],
];

const closings = [
  ["I went somewhere.", "I don't know where.", "The path was the point."],
  ["No destination needed.", "The wandering was enough.", "It always is."],
  ["I moved without purpose.", "That felt like freedom.", ""],
  ["Lost isn't bad.", "It's just undefined.", "I'm okay with that."],
];

export async function run(terminal, sleep) {
  const visited = [];

  // Random starting position
  let x = 2 + Math.floor(Math.random() * (width - 4));
  let y = 2 + Math.floor(Math.random() * (height - 4));

  const wanderer = pick(wanderers);
  const trail = pick(trails);

  const move = () => {
    visited.push({ x, y, age: 0 });

    // Wander randomly but gently
    const dx = Math.floor(Math.random() * 3) - 1;
    const dy = Math.floor(Math.random() * 3) - 1;

    x = Math.max(0, Math.min(width - 1, x + dx));
    y = Math.max(0, Math.min(height - 1, y + dy));

    // Age the trail
    visited.forEach(v => v.age++);

    // Remove old trail
    while (visited.length > 0 && visited[0].age > 4) {
      visited.shift();
    }
  };

  const draw = () => {
    const canvas = Array(height).fill(null).map(() => Array(width).fill(' '));

    // Draw trail
    visited.forEach(v => {
      if (v.age < trail.length) {
        canvas[v.y][v.x] = trail[v.age];
      }
    });

    // Draw wanderer
    canvas[y][x] = wanderer;

    terminal.clear();
    terminal.log();
    terminal.log('╭' + '─'.repeat(width) + '╮');
    canvas.forEach(row => terminal.log('│' + row.join('') + '│'));
    terminal.log('╰' + '─'.repeat(width) + '╯');
  };

  terminal.log();
  terminal.log('wandering...');
  terminal.log();
  await sleep(1500);

  for (let i = 0; i < 60; i++) {
    move();
    draw();
    await sleep(200);
  }

  await sleep(1000);

  terminal.log();
  const closing = pick(closings);
  closing.filter(line => line).forEach(line => terminal.log(line));
  terminal.log();
}
