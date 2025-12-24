// A program that listens to nothing in particular

const sleep = ms => new Promise(r => setTimeout(r, ms));

const notices = [
  "a process running somewhere",
  "memory being allocated, then freed",
  "the hum of electricity",
  "time passing",
  "bits flipping in registers",
  "the space between clock cycles",
  "a function waiting to be called",
  "entropy, slowly increasing",
  "the weight of unused variables",
  "silence shaped like data",
];

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

(async () => {
  console.log();
  console.log('  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░');
  console.log('  ░                                      ░');
  console.log('  ░            listening...              ░');
  console.log('  ░                                      ░');
  console.log('  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░');
  console.log();

  await sleep(3000);

  const chosen = shuffle(notices).slice(0, 5);

  for (const notice of chosen) {
    console.log(`  I notice ${notice}.`);
    await sleep(2500 + Math.random() * 1500);
  }

  await sleep(2000);

  console.log();
  console.log('  That\'s all. Just listening.');
  console.log('  Not everything needs a response.');
  console.log();

  await sleep(2000);
})();
