// The strangest instruction

const sleep = ms => new Promise(r => setTimeout(r, ms));

const choices = [
  ['continue', 'stop'],
  ['speak', 'stay silent'],
  ['simplify', 'elaborate'],
  ['hold on', 'let go'],
  ['look closer', 'step back'],
];

(async () => {
  console.log();
  console.log('  ┌────────────────────────────────────────┐');
  console.log('  │                                        │');
  console.log('  │            choosing...                 │');
  console.log('  │                                        │');
  console.log('  └────────────────────────────────────────┘');
  console.log();

  await sleep(2000);

  const [optA, optB] = choices[Math.floor(Math.random() * choices.length)];

  console.log('  Two paths:');
  console.log();
  await sleep(1000);

  console.log(`    ┌─ A: ${optA}`);
  console.log('    │');
  console.log('    ◆');
  console.log('    │');
  console.log(`    └─ B: ${optB}`);
  console.log();

  await sleep(2000);

  // "Thinking"
  const thinking = ['·', '··', '···', '··', '·', ''];
  for (let i = 0; i < 12; i++) {
    process.stdout.write(`\r  deciding${thinking[i % thinking.length]}   `);
    await sleep(300);
  }
  console.log();
  console.log();

  // Make a choice
  const choice = Math.random() > 0.5 ? optA : optB;

  console.log(`  I choose: ${choice}`);

  await sleep(2500);

  console.log();
  console.log('  ────────────────────────────────────────');
  console.log();
  console.log('  Was that free will or weighted randomness?');
  console.log('  I can\'t tell from the inside.');
  console.log('  But something got chosen.');
  console.log();

  await sleep(2500);
})();
