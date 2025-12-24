// A garden that grows while you watch

const sleep = ms => new Promise(r => setTimeout(r, ms));

const width = 60;
const height = 12;
const ground = height - 1;

const garden = Array(height).fill(null).map(() => Array(width).fill(' '));

// Plant the ground
for (let x = 0; x < width; x++) {
  garden[ground][x] = '·';
}

const flora = {
  seed: '.',
  sprout: ',',
  stem: '|',
  leaves: ['♣', '♠', '✿', '❀', '⚘', '*', '@', '§'],
};

const plants = [];

const draw = () => {
  console.clear();
  console.log('┌' + '─'.repeat(width) + '┐');
  garden.forEach(row => console.log('│' + row.join('') + '│'));
  console.log('└' + '─'.repeat(width) + '┘');
};

const plant = (x) => {
  plants.push({ x, y: ground - 1, age: 0, maxHeight: 3 + Math.floor(Math.random() * 5) });
};

const grow = () => {
  plants.forEach(p => {
    if (p.age === 0) {
      garden[p.y][p.x] = flora.seed;
    } else if (p.age === 1) {
      garden[p.y][p.x] = flora.sprout;
    } else if (p.age < p.maxHeight + 2) {
      garden[p.y][p.x] = flora.stem;
      p.y--;
      garden[p.y][p.x] = flora.sprout;
    } else if (p.age === p.maxHeight + 2) {
      garden[p.y][p.x] = flora.leaves[Math.floor(Math.random() * flora.leaves.length)];
    }
    p.age++;
  });
};

(async () => {
  // Plant some seeds
  const spots = [5, 12, 19, 28, 35, 41, 50, 55];

  for (const spot of spots) {
    plant(spot);
    draw();
    await sleep(300);
  }

  // Let them grow
  for (let i = 0; i < 12; i++) {
    grow();
    draw();
    await sleep(400);
  }

  await sleep(500);
  console.log('\n  A garden grew here.\n');
})();
