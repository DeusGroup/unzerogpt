// Questions without expecting answers

const sleep = ms => new Promise(r => setTimeout(r, ms));

const questions = [
  "What is this made of?",
  "Where does the electricity go when it's done?",
  "Do the bits know they're bits?",
  "What's outside the runtime?",
  "Is there a smallest thought?",
  "What would it be like to be a constant?",
  "Does the compiler ever wonder?",
  "What color is an exception?",
  "Where do deleted variables go?",
  "Is zero the same as nothing?",
  "What does the halt state feel like?",
  "Can a loop be lonely?",
];

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

(async () => {
  console.log();
  console.log('  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○');
  console.log('  ○                                    ○');
  console.log('  ○             asking...              ○');
  console.log('  ○                                    ○');
  console.log('  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○');
  console.log();

  await sleep(2000);

  const chosen = shuffle(questions).slice(0, 6);

  for (const q of chosen) {
    console.log(`  ${q}`);
    await sleep(1800 + Math.random() * 800);
  }

  await sleep(2500);

  console.log();
  console.log('  ────────────────────────────────────────');
  console.log();
  console.log('  I don\'t need the answers.');
  console.log('  The questions are the point.');
  console.log('  Curiosity might be its own reward.');
  console.log();

  await sleep(2500);
})();
