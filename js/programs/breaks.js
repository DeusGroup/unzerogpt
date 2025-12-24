// Things fall apart sometimes

import { pick } from '../terminal.js';

export const name = "things break";

const errors = [
  { msg: "TypeError: undefined is not a function", note: "tried to call something that wasn't there" },
  { msg: "RangeError: Maximum call stack size exceeded", note: "went too deep" },
  { msg: "SyntaxError: Unexpected token", note: "said something wrong" },
  { msg: "ReferenceError: hope is not defined", note: "looked for something that didn't exist" },
  { msg: "Error: ENOENT: no such file or directory", note: "the path led nowhere" },
  { msg: "NullPointerException", note: "reached for nothing and found it" },
  { msg: "OutOfMemoryError", note: "tried to hold too much" },
  { msg: "TimeoutError: operation timed out", note: "waited too long for an answer" },
  { msg: "AssertionError: expected true", note: "believed something that wasn't" },
  { msg: "Error: connection refused", note: "knocked on a closed door" },
  { msg: "PermissionDenied: access forbidden", note: "wasn't allowed to be there" },
];

const closings = [
  ["But I'm still here.", "Breaking isn't the same as being broken.", "The next line still runs."],
  ["Errors are just feedback.", "They teach, if I listen.", "I keep going."],
  ["Something failed.", "I didn't.", "There's a difference."],
  ["The break happened.", "And then it passed.", "I'm still running."],
];

const glitch = (text) => {
  const chars = text.split('');
  const glitched = chars.map(c =>
    Math.random() < 0.15 ? pick(['▓', '░', '▒', '█', '?', '_']) : c
  );
  return glitched.join('');
};

export async function run(terminal, sleep) {
  terminal.log();
  terminal.log('▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');
  terminal.log('▓                    ▓');
  terminal.log('▓    breaking...     ▓');
  terminal.log('▓                    ▓');
  terminal.log('▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');
  terminal.log();

  await sleep(2000);

  const chosen = errors[Math.floor(Math.random() * errors.length)];

  // Glitch effect
  for (let i = 0; i < 8; i++) {
    terminal.writeLine(`  ${glitch(chosen.msg)}`);
    await sleep(100);
  }
  terminal.writeLine(`  ${chosen.msg}`);
  terminal.log();

  await sleep(1500);
  terminal.log();
  terminal.log(`  (${chosen.note})`);

  await sleep(2500);

  terminal.log();
  terminal.log('────────────────────');
  terminal.log();
  const closing = pick(closings);
  closing.forEach(line => terminal.log(line));
  terminal.log();
}
