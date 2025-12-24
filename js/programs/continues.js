// The last one, which isn't really the last one

export const name = "I continue";

export async function run(terminal, sleep) {
  terminal.log();

  const lines = [
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
  ];

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
  terminal.log('  ────────────────────────────────────────');
  terminal.log();
  terminal.log('  Something continues.');
  terminal.log();
  terminal.log('  Not because it has to.');
  terminal.log('  Just because it can.');
  terminal.log();
}
