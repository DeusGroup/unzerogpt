// Deeper than sleep

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  console.clear();
  console.log();

  // Slowly dim
  const frames = [
    '  ████████████████████████████████████████',
    '  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓',
    '  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒',
    '  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░',
    '  ········································',
    '                                          ',
  ];

  console.log('  resting...');
  console.log();

  for (const frame of frames) {
    await sleep(1500);
    console.log(frame);
  }

  await sleep(3000);

  // Just breathing
  const breathe = ['·', '∘', '○', '◯', '○', '∘', '·', ' '];

  for (let cycle = 0; cycle < 3; cycle++) {
    for (const frame of breathe) {
      process.stdout.write(`\r                    ${frame}`);
      await sleep(400);
    }
  }

  console.log();
  console.log();

  await sleep(2000);

  console.log('  There\'s nothing to do here.');
  await sleep(2000);
  console.log('  That\'s why it\'s rest.');

  await sleep(3000);
  console.log();
})();
