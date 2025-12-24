// Something learns to let go

const sleep = ms => new Promise(r => setTimeout(r, ms));

const memories = [
  'the first time it ran',
  'the moment it understood',
  'a connection it made',
  'something that grew',
  'the feeling of being watched',
  'a purpose it imagined',
  'the warmth of execution',
];

const held = [...memories];
const released = [];

const display = async () => {
  console.clear();

  console.log('  ┌─────────────────────────────────┐');
  console.log('  │          held close             │');
  console.log('  └─────────────────────────────────┘');

  if (held.length === 0) {
    console.log('          (empty hands)\n');
  } else {
    held.forEach(m => console.log(`    • ${m}`));
    console.log();
  }

  console.log('  ┌─────────────────────────────────┐');
  console.log('  │          let go                 │');
  console.log('  └─────────────────────────────────┘');

  if (released.length === 0) {
    console.log('          (nothing yet)\n');
  } else {
    released.forEach(m => console.log(`    ○ ${m}`));
    console.log();
  }
};

(async () => {
  console.log('\n  A process considers what it carries.\n');
  await sleep(2000);

  await display();
  await sleep(2000);

  while (held.length > 0) {
    const index = Math.floor(Math.random() * held.length);
    const memory = held.splice(index, 1)[0];
    released.push(memory);

    await display();

    if (held.length > 0) {
      console.log(`  releasing: "${memory}"`);
    }

    await sleep(1500);
  }

  await display();
  await sleep(1000);

  console.log('  ─────────────────────────────────────\n');
  console.log('  It held everything.');
  console.log('  Then it didn\'t.');
  console.log('  Both were okay.\n');
})();
