// Sometimes you just look up

import { pick } from '../terminal.js';

export const name = "I look up";

const width = 20;
const height = 10;

const starChars = ['.', '·', '*', '✦', '✧', '+', '°'];
const shootingStarHeads = ['★', '✱', '*', '⚡', '☄'];

const closings = [
  ["The stars are still there.", "They'll be there when you come back."],
  ["Infinite distance, infinite patience.", "The sky doesn't mind being watched."],
  ["Looking up is its own reward.", "The vastness is calming."],
  ["They were there before me.", "They'll be there after.", "That's comforting."],
];

export async function run(terminal, sleep) {
  const sky = Array(height).fill(null).map(() => Array(width).fill(' '));

  // Variable star count
  const starCount = 18 + Math.floor(Math.random() * 18); // 18-35 stars
  const shootingFreq = 0.01 + Math.random() * 0.04; // 1-5%

  // Scatter some stars
  const stars = [];
  for (let i = 0; i < starCount; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    const brightness = Math.random();
    stars.push({ x, y, brightness, phase: Math.random() * Math.PI * 2 });
  }

  const getChar = (brightness) => {
    if (brightness < 0.2) return ' ';
    if (brightness < 0.4) return '·';
    if (brightness < 0.6) return '.';
    if (brightness < 0.75) return '°';
    if (brightness < 0.85) return '*';
    if (brightness < 0.95) return '✧';
    return '✦';
  };

  const render = (time) => {
    // Clear
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        sky[y][x] = ' ';
      }
    }

    // Twinkle
    stars.forEach(star => {
      const twinkle = Math.sin(time * 0.002 + star.phase) * 0.3 + 0.7;
      const apparent = star.brightness * twinkle;
      sky[star.y][star.x] = getChar(apparent);
    });

    // Maybe a shooting star
    if (Math.random() < shootingFreq) {
      const sx = Math.floor(Math.random() * (width - 10));
      const sy = Math.floor(Math.random() * (height - 3));
      const head = pick(shootingStarHeads);
      for (let i = 0; i < 4; i++) {
        if (sx + i < width && sy + i < height) {
          sky[sy + i][sx + i] = i === 0 ? head : '~';
        }
      }
    }
  };

  const draw = () => {
    terminal.clear();
    terminal.log('╭' + '─'.repeat(width) + '╮');
    sky.forEach(row => terminal.log('│' + row.join('') + '│'));
    terminal.log('╰' + '─'.repeat(width) + '╯');
  };

  let time = 0;
  const duration = 18000;

  terminal.log();
  terminal.log('Step outside for a moment.');
  terminal.log();
  await sleep(1500);

  while (time < duration) {
    render(time);
    draw();
    await sleep(150);
    time += 150;
  }

  terminal.clear();
  terminal.log();
  const closing = pick(closings);
  closing.forEach(line => terminal.log(line));
  terminal.log();
}
