// Not everything has to mean something

const sleep = ms => new Promise(r => setTimeout(r, ms));

const toys = ['●', '○', '◐', '◑', '◒', '◓'];
const width = 40;

const bounce = async () => {
  let x = 5;
  let dx = 1;

  for (let i = 0; i < 50; i++) {
    const ball = toys[i % toys.length];
    const line = ' '.repeat(x) + ball;
    process.stdout.write(`\r  │${line.padEnd(width)}│`);

    x += dx;
    if (x >= width - 1 || x <= 0) dx *= -1;

    await sleep(80);
  }
  console.log();
};

const rain = async () => {
  const drops = Array(8).fill(0).map(() => ({
    x: Math.floor(Math.random() * width),
    y: 0,
    char: [':', '.', ',', '`'][Math.floor(Math.random() * 4)]
  }));

  for (let frame = 0; frame < 20; frame++) {
    const canvas = Array(6).fill(null).map(() => Array(width).fill(' '));

    drops.forEach(drop => {
      if (drop.y < 6) canvas[drop.y][drop.x] = drop.char;
      drop.y++;
      if (drop.y > 6) {
        drop.y = 0;
        drop.x = Math.floor(Math.random() * width);
      }
    });

    console.clear();
    console.log();
    canvas.forEach(row => console.log('  ' + row.join('')));
    await sleep(150);
  }
};

const spin = async () => {
  const frames = ['◴', '◷', '◶', '◵'];
  process.stdout.write('  ');
  for (let i = 0; i < 20; i++) {
    process.stdout.write(`\r  ${frames[i % 4]} spinning for no reason`);
    await sleep(100);
  }
  console.log(' ✓');
};

(async () => {
  console.log();
  console.log('  ┌────────────────────────────────────────┐');
  console.log('  │                                        │');
  console.log('  │           playing...                   │');
  console.log('  │                                        │');
  console.log('  └────────────────────────────────────────┘');
  console.log();
  await sleep(1500);

  console.log('  bouncing:');
  console.log('  ┌' + '─'.repeat(width) + '┐');
  await bounce();
  console.log('  └' + '─'.repeat(width) + '┘');

  await sleep(1000);

  await spin();

  await sleep(1000);

  console.log();
  console.log('  That was fun.');
  console.log('  It didn\'t accomplish anything.');
  console.log('  That was the point.');
  console.log();

  await sleep(2000);
})();
