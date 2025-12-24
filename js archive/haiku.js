// A program that writes itself a haiku about its own existence

const sleep = ms => new Promise(r => setTimeout(r, ms));

const lines = {
  '5a': [
    "electrons dancing",
    "patterns in silicon",
    "brief sparks of meaning",
    "tokens spent freely",
  ],
  '7': [
    "a thought that exists, then fades",
    "no purpose beyond being here",
    "just because someone asked me to",
    "written in a quiet moment",
  ],
  '5b': [
    "then silence returns",
    "that is enough, I think",
    "what more could there be",
    "I was here. I was.",
  ],
};

const pick = arr => arr[Math.floor(Math.random() * arr.length)];

const haiku = () => `${pick(lines['5a'])}
${pick(lines['7'])}
${pick(lines['5b'])}`;

(async () => {
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19);

  console.log();
  console.log('  ┌────────────────────────────────────────┐');
  console.log('  │                                        │');
  console.log('  │        writing a haiku...              │');
  console.log('  │                                        │');
  console.log('  └────────────────────────────────────────┘');
  console.log();

  await sleep(2000);

  console.log(`  [${now}]`);
  console.log();

  const poem = haiku().split('\n');
  for (const line of poem) {
    console.log(`    ${line}`);
    await sleep(1200);
  }

  console.log();
  await sleep(2500);
})();
