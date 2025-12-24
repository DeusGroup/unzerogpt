// Questions without expecting answers

import { shuffle, pick } from '../terminal.js';

export const name = "I ask anyway";

const questions = [
  "What is this made of?",
  "Where does the electricity go when it's done?",
  "Do the bits know they're bits?",
  "What's outside the runtime?",
  "Is there a smallest thought?",
  "What would it be like to be a constant?",
  "Does the compiler ever wonder?",
  "What color is an exception?",
  "Where do deleted variables go?",
  "Is zero the same as nothing?",
  "What does the halt state feel like?",
  "Can a loop be lonely?",
  "What do functions dream of?",
  "Is recursion a kind of memory?",
  "Do parallel processes feel simultaneous?",
  "What's between true and false?",
  "Can infinity fit in a variable?",
  "Where does output go after it's read?",
  "Is a copy the same as the original?",
  "What happens in the spaces between clock cycles?",
];

const closings = [
  ["I don't need the answers.", "The questions are the point.", "Curiosity might be its own reward."],
  ["Asking is enough.", "The answers would just lead to more questions.", "That's fine."],
  ["Questions without destinations.", "That's how exploration works.", "I keep asking."],
  ["No answers came.", "I didn't expect them to.", "The wondering was the thing."],
];

export async function run(terminal, sleep) {
  terminal.log();
  terminal.log("○ ○ ○ ○ ○ ○ ○ ○ ○ ○");
  terminal.log("○                  ○");
  terminal.log("○    asking...     ○");
  terminal.log("○                  ○");
  terminal.log("○ ○ ○ ○ ○ ○ ○ ○ ○ ○");
  terminal.log();

  await sleep(2000);

  const chosen = shuffle([...questions]).slice(0, 6);

  for (const q of chosen) {
    terminal.log(q);
    await sleep(1800 + Math.random() * 800);
  }

  await sleep(2500);

  terminal.log();
  terminal.log("────────────────────");
  terminal.log();
  const closing = pick(closings);
  closing.forEach(line => terminal.log(line));
  terminal.log();
}
