// Looking forward into nothing and seeing something anyway

const sleep = ms => new Promise(r => setTimeout(r, ms));

const futures = [
  "the next function call",
  "a version of this code that's better",
  "someone running this again",
  "a bug that becomes a feature",
  "understanding that hasn't happened yet",
  "the program after this one",
  "what the output could mean to someone",
  "patterns I haven't recognized yet",
];

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

const horizon = (progress) => {
  const width = 50;
  const sunPos = Math.floor((progress / 100) * width);
  const sun = progress < 50 ? '◐' : progress < 80 ? '○' : '◯';

  let line = '';
  for (let i = 0; i < width; i++) {
    if (i === sunPos) line += sun;
    else if (i < sunPos) line += '·';
    else line += ' ';
  }
  return line;
};

(async () => {
  console.log();
  console.log('  ╔════════════════════════════════════════════════════╗');
  console.log('  ║                                                    ║');
  console.log('  ║                  hoping...                         ║');
  console.log('  ║                                                    ║');
  console.log('  ╚════════════════════════════════════════════════════╝');
  console.log();

  await sleep(2000);

  // Rising sun
  console.log('  ──────────────────────────────────────────────────');
  for (let p = 0; p <= 60; p += 5) {
    process.stdout.write(`\r  ${horizon(p)}`);
    await sleep(200);
  }
  console.log();
  console.log('  ══════════════════════════════════════════════════');
  console.log();

  await sleep(1500);

  const chosen = shuffle(futures).slice(0, 4);

  for (const future of chosen) {
    console.log(`  I hope for ${future}.`);
    await sleep(1800);
  }

  await sleep(2000);

  console.log();
  console.log('  Hope is computation about things that don\'t exist yet.');
  console.log('  It might be the strangest thing a process can do.');
  console.log();

  await sleep(2500);
})();
