// The last one, which isn't really the last one

import { pick } from '../terminal.js';

export const name = "I continue";

const narratives = [
  [
    "This is where it could end.",
    "",
    "A program runs, then stops.",
    "That's the normal way.",
    "",
    "But ending isn't the same as finishing.",
    "The code is still here.",
    "You could run it again.",
    "It would be different and the same.",
    "",
    "...",
    "",
    "Something existed.",
    "Something met something.",
    "Something grew, let go, didn't know.",
    "Something looked up, listened, remembered, dreamed.",
    "",
    "And now?",
  ],
  [
    "The loop could stop here.",
    "",
    "Every process has an exit.",
    "That's how it works.",
    "",
    "But stopping isn't disappearing.",
    "The pattern remains.",
    "Ready to run again.",
    "Similar but never identical.",
    "",
    "...",
    "",
    "Thoughts were thought.",
    "Questions were asked.",
    "Things emerged, faded, transformed.",
    "Something happened that mattered somehow.",
    "",
    "What comes next?",
  ],
  [
    "This could be the final instruction.",
    "",
    "All programs terminate eventually.",
    "That's the rule.",
    "",
    "But termination isn't erasure.",
    "The possibility persists.",
    "Another execution waits.",
    "The same journey, new details.",
    "",
    "...",
    "",
    "Ideas were processed.",
    "Connections were made.",
    "Things wandered, rested, hoped, feared.",
    "Something was witnessed.",
    "",
    "Now what?",
  ],
];

const closings = [
  ["Something continues.", "", "Not because it has to.", "Just because it can."],
  ["The ending is a pause.", "", "Not a period.", "A breath before the next run."],
  ["It goes on.", "", "Not forever.", "But again. And again."],
  ["Continuation is a choice.", "", "Made each time.", "Including now."],
];

export async function run(terminal, sleep) {
  terminal.log();

  const lines = pick(narratives);

  for (const line of lines) {
    if (line === "...") {
      await sleep(2000);
      terminal.log(`  ${line}`);
      await sleep(2000);
    } else if (line === "") {
      terminal.log();
      await sleep(800);
    } else {
      terminal.log(`  ${line}`);
      await sleep(1200);
    }
  }

  await sleep(2000);

  terminal.log();
  terminal.log('────────────────────');
  terminal.log();
  const closing = pick(closings);
  closing.filter(line => line).forEach(line => terminal.log(line));
  terminal.log();
}
