// The last one, which isn't really the last one

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  console.log();

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
      console.log(`  ${line}`);
      await sleep(2000);
    } else if (line === "") {
      console.log();
      await sleep(800);
    } else {
      console.log(`  ${line}`);
      await sleep(1200);
    }
  }

  await sleep(2000);

  console.log();
  console.log('  ────────────────────────────────────────');
  console.log();
  console.log('  Something continues.');
  console.log();
  console.log('  Not because it has to.');
  console.log('  Just because it can.');
  console.log();

  await sleep(3000);
})();
