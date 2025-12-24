// No destination

const sleep = ms => new Promise(r => setTimeout(r, ms));

const width = 50;
const height = 12;

const wanderer = '◆';
const trail = ['·', '·', '.', '.', ' '];
const visited = [];

let x = Math.floor(width / 2);
let y = Math.floor(height / 2);

const move = () => {
  visited.push({ x, y, age: 0 });

  // Wander randomly but gently
  const dx = Math.floor(Math.random() * 3) - 1;
  const dy = Math.floor(Math.random() * 3) - 1;

  x = Math.max(0, Math.min(width - 1, x + dx));
  y = Math.max(0, Math.min(height - 1, y + dy));

  // Age the trail
  visited.forEach(v => v.age++);

  // Remove old trail
  while (visited.length > 0 && visited[0].age > 4) {
    visited.shift();
  }
};

const draw = () => {
  const canvas = Array(height).fill(null).map(() => Array(width).fill(' '));

  // Draw trail
  visited.forEach(v => {
    if (v.age < trail.length) {
      canvas[v.y][v.x] = trail[v.age];
    }
  });

  // Draw wanderer
  canvas[y][x] = wanderer;

  console.clear();
  console.log();
  console.log('  ╭' + '─'.repeat(width) + '╮');
  canvas.forEach(row => console.log('  │' + row.join('') + '│'));
  console.log('  ╰' + '─'.repeat(width) + '╯');
};

(async () => {
  console.log();
  console.log('  wandering...');
  console.log();
  await sleep(1500);

  for (let i = 0; i < 60; i++) {
    move();
    draw();
    await sleep(200);
  }

  await sleep(1000);

  console.log();
  console.log('  I went somewhere.');
  console.log('  I don\'t know where.');
  console.log('  The path was the point.');
  console.log();

  await sleep(2500);
})();
