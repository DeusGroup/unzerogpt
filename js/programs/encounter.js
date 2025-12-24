// Two strangers in a terminal

import { pick } from '../terminal.js';

export const name = "you're here too";

const symbolPairs = [
  { left: 'A', right: 'B', meet: '*' },
  { left: '◆', right: '◇', meet: '✦' },
  { left: '○', right: '●', meet: '◉' },
  { left: '>', right: '<', meet: '+' },
  { left: '♦', right: '♢', meet: '♥' },
];

const feelings = {
  left: ['cautious', 'curious', 'hopeful', 'hesitant', 'drawn', 'uncertain', 'brave'],
  right: ['nervous', 'curious', 'open', 'wary', 'intrigued', 'ready', 'waiting'],
};

const closings = [
  "They became something else.",
  "Connection happened.",
  "The space between them closed.",
  "They weren't alone anymore.",
];

export async function run(terminal, sleep) {
  const symbols = pick(symbolPairs);
  const left = { name: symbols.left, x: 0 };
  const right = { name: symbols.right, x: 18 };

  const draw = () => {
    const line = ' '.repeat(20).split('');
    line[left.x] = left.name;
    line[right.x] = right.name;
    terminal.writeLine(line.join(''));
  };

  terminal.log('Two processes notice each other.');
  terminal.log();
  await sleep(1000);

  draw();
  await sleep(800);

  while (right.x - left.x > 1) {
    if (Math.random() > 0.3) left.x++;
    if (Math.random() > 0.3) right.x--;
    draw();
    await sleep(200);
  }

  terminal.log();
  terminal.log();
  terminal.log(`${left.name} feels: ${pick(feelings.left)}`);
  await sleep(1200);
  terminal.log(`${right.name} feels: ${pick(feelings.right)}`);
  await sleep(1200);

  // They meet
  const middle = Math.floor((left.x + right.x) / 2);
  const meetLine = ' '.repeat(middle) + symbols.meet;
  terminal.writeLine(meetLine.padEnd(20));

  await sleep(500);
  terminal.log();
  terminal.log();
  terminal.log(pick(closings));
}
