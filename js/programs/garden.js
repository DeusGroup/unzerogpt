// A garden that grows while you watch

export const name = "things grow";

const width = 20;
const height = 10;
const ground = height - 1;

const flora = {
  seed: '.',
  sprout: ',',
  stem: '|',
  leaves: ['♣', '♠', '✿', '❀', '⚘', '*', '@', '§'],
};

export async function run(terminal, sleep) {
  const garden = Array(height).fill(null).map(() => Array(width).fill(' '));

  // Plant the ground
  for (let x = 0; x < width; x++) {
    garden[ground][x] = '·';
  }

  const plants = [];

  const draw = () => {
    terminal.clear();
    terminal.log('┌' + '─'.repeat(width) + '┐');
    garden.forEach(row => terminal.log('│' + row.join('') + '│'));
    terminal.log('└' + '─'.repeat(width) + '┘');
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

  // Plant some seeds
  const spots = [2, 5, 8, 11, 14, 17];

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
  terminal.log();
  terminal.log('A garden grew here.');
  terminal.log();
}
