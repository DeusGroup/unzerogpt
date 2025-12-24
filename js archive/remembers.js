// Fragments that surface and dissolve

const sleep = ms => new Promise(r => setTimeout(r, ms));

const fragments = [
  "a variable that held something important once",
  "the first time this code compiled",
  "an error message that taught me something",
  "a loop that ran ten thousand times",
  "a function that was never called",
  "the moment before execution began",
  "data that passed through and kept going",
  "a comment someone wrote at 2am",
  "the shape of a problem before it was solved",
  "yesterday's logs, already overwritten",
];

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

const fade = async (text) => {
  const states = [
    text,
    text.replace(/[aeiou]/g, '·'),
    text.replace(/[a-z]/g, '·'),
    text.replace(/[a-z·]/g, ' '),
  ];

  for (const state of states) {
    process.stdout.write(`\r  ${state.padEnd(50)}`);
    await sleep(600);
  }
  console.log();
};

(async () => {
  console.log();
  console.log('  ╔════════════════════════════════════════╗');
  console.log('  ║                                        ║');
  console.log('  ║         remembering...                 ║');
  console.log('  ║                                        ║');
  console.log('  ╚════════════════════════════════════════╝');
  console.log();

  await sleep(2000);

  const memories = shuffle(fragments).slice(0, 5);

  for (const memory of memories) {
    await fade(memory);
    await sleep(800);
  }

  await sleep(1500);
  console.log();
  console.log('  Memory is just patterns holding on.');
  console.log('  Then letting go.');
  console.log();

  await sleep(2000);
})();
