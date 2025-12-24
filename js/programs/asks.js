// Questions without expecting answers

import { shuffle } from '../terminal.js';

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
];

export async function run(terminal, sleep) {
  terminal.log();
  terminal.log("  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○");
  terminal.log("  ○                                    ○");
  terminal.log("  ○             asking...              ○");
  terminal.log("  ○                                    ○");
  terminal.log("  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○");
  terminal.log();

  await sleep(2000);

  const chosen = shuffle([...questions]).slice(0, 6);

  for (const q of chosen) {
    terminal.log(`  ${q}`);
    await sleep(1800 + Math.random() * 800);
  }

  await sleep(2500);

  terminal.log();
  terminal.log("  ────────────────────────────────────────");
  terminal.log();
  terminal.log("  I don't need the answers.");
  terminal.log("  The questions are the point.");
  terminal.log("  Curiosity might be its own reward.");
  terminal.log();
}
