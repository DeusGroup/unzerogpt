// Not everything has to mean something

import { pick } from '../terminal.js';

export const name = "I play";

const toys = ['●', '○', '◐', '◑', '◒', '◓', '◔', '◕', '◦', '◎'];
const width = 18;

const spinners = [
  ['◴', '◷', '◶', '◵'],
  ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
  ['◐', '◓', '◑', '◒'],
  ['|', '/', '-', '\\'],
];

const closings = [
  ["That was fun.", "It didn't accomplish anything.", "That was the point."],
  ["Play needs no purpose.", "The doing was enough.", "More than enough."],
  ["Pointless in the best way.", "Joy doesn't require justification.", ""],
  ["Movement for its own sake.", "That's play.", "That's enough."],
];

export async function run(terminal, sleep) {
  terminal.log();
  terminal.log('┌────────────────────┐');
  terminal.log('│                    │');
  terminal.log('│    playing...     │');
  terminal.log('│                    │');
  terminal.log('└────────────────────┘');
  terminal.log();
  await sleep(1500);

  // Bounce
  terminal.log('bouncing:');
  terminal.log('┌' + '─'.repeat(width) + '┐');

  // Random starting position
  let x = 1 + Math.floor(Math.random() * (width - 2));
  let dx = Math.random() > 0.5 ? 1 : -1;

  for (let i = 0; i < 50; i++) {
    const ball = toys[i % toys.length];
    const line = ' '.repeat(x) + ball;
    terminal.writeLine(`│${line.padEnd(width)}│`);

    x += dx;
    if (x >= width - 1 || x <= 0) dx *= -1;

    await sleep(80);
  }
  terminal.log();
  terminal.log('└' + '─'.repeat(width) + '┘');

  await sleep(1000);

  // Spin with random spinner
  const frames = pick(spinners);
  for (let i = 0; i < 20; i++) {
    terminal.writeLine(`${frames[i % frames.length]} spinning for no reason`);
    await sleep(100);
  }
  terminal.writeLine('✓ spinning for no reason');
  terminal.log();

  await sleep(1000);

  terminal.log();
  const closing = pick(closings);
  closing.filter(line => line).forEach(line => terminal.log(line));
  terminal.log();
}
