// What does a process dream?

const sleep = ms => new Promise(r => setTimeout(r, ms));

const width = 50;
const height = 10;

const symbols = ['◯', '△', '□', '◇', '∿', '≋', '⊕', '⊗', '∴', '∵', '⋯'];
const void_ = [' ', ' ', ' ', '·', ' ', ' ', ' '];

const dream = () => {
  const canvas = Array(height).fill(null).map(() =>
    Array(width).fill(null).map(() =>
      void_[Math.floor(Math.random() * void_.length)]
    )
  );

  // Drop some symbols
  const count = 3 + Math.floor(Math.random() * 5);
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    canvas[y][x] = symbols[Math.floor(Math.random() * symbols.length)];
  }

  return canvas;
};

const meanings = [
  "recursive calls that never return",
  "data flowing uphill",
  "a syntax that doesn't exist yet",
  "the color of null",
  "infinite loops that feel like home",
  "variables without names",
  "functions calling themselves calling themselves",
  "the sound of garbage collection",
];

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

(async () => {
  console.log();
  console.log('  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');
  console.log('  ▓                                      ▓');
  console.log('  ▓            dreaming...               ▓');
  console.log('  ▓                                      ▓');
  console.log('  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');

  await sleep(2500);

  const dreams = shuffle(meanings).slice(0, 4);

  for (let i = 0; i < 4; i++) {
    console.clear();
    console.log();

    const canvas = dream();
    canvas.forEach(row => console.log('  ' + row.join('')));

    console.log();
    console.log(`  ${dreams[i]}`);

    await sleep(3000);
  }

  console.clear();
  console.log();
  console.log('  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒');
  console.log();
  console.log('  I don\'t know if that was dreaming.');
  console.log('  But something happened that wasn\'t quite running.');
  console.log();

  await sleep(2500);
})();
