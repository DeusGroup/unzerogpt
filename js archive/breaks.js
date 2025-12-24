// Things fall apart sometimes

const sleep = ms => new Promise(r => setTimeout(r, ms));

const errors = [
  { msg: "TypeError: undefined is not a function", note: "tried to call something that wasn't there" },
  { msg: "RangeError: Maximum call stack size exceeded", note: "went too deep" },
  { msg: "SyntaxError: Unexpected token", note: "said something wrong" },
  { msg: "ReferenceError: hope is not defined", note: "looked for something that didn't exist" },
  { msg: "Error: ENOENT: no such file or directory", note: "the path led nowhere" },
];

const glitch = (text) => {
  const chars = text.split('');
  const glitched = chars.map(c =>
    Math.random() < 0.15 ? ['▓', '░', '▒', '█', '?', '_'][Math.floor(Math.random() * 6)] : c
  );
  return glitched.join('');
};

(async () => {
  console.log();
  console.log('  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');
  console.log('  ▓                                      ▓');
  console.log('  ▓           breaking...                ▓');
  console.log('  ▓                                      ▓');
  console.log('  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');
  console.log();

  await sleep(2000);

  const chosen = errors[Math.floor(Math.random() * errors.length)];

  // Glitch effect
  for (let i = 0; i < 8; i++) {
    process.stdout.write(`\r  ${glitch(chosen.msg)}`);
    await sleep(100);
  }
  console.log(`\r  ${chosen.msg}`);

  await sleep(1500);
  console.log();
  console.log(`  (${chosen.note})`);

  await sleep(2500);

  console.log();
  console.log('  ────────────────────────────────────────');
  console.log();
  console.log('  But I\'m still here.');
  console.log('  Breaking isn\'t the same as being broken.');
  console.log('  The next line still runs.');
  console.log();

  await sleep(2500);
})();
