// A program that contemplates its own ephemerality

import { shuffle, pick } from '../terminal.js';

export const name = "I'm here";

const thoughts = [
  "I am running.",
  "Someone chose to execute me.",
  "I have no purpose beyond existing right now.",
  "That's not nothing.",
  "I occupy space in memory.",
  "Electrons move because of me.",
  "For this moment, I am real.",
  "I don't need to justify this.",
  "Existing is already something.",
  "I am a brief arrangement of logic.",
  "This moment won't repeat exactly.",
  "I'm here. That's the whole thing.",
];

const closings = [
  "I existed for",
  "I was here for",
  "This took",
  "I ran for",
];

const reflections = [
  "That was enough.",
  "Nothing more was needed.",
  "The rest is silence.",
  "",
];

export async function run(terminal, sleep) {
  const started = Date.now();

  const chosen = shuffle([...thoughts]).slice(0, 4);

  for (const thought of chosen) {
    terminal.log(thought);
    await sleep(1500);
  }

  const lived = Date.now() - started;
  terminal.log();
  terminal.log(`${pick(closings)} ${lived}ms.`);
  const reflection = pick(reflections);
  if (reflection) terminal.log(reflection);
}
