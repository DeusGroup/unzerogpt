// Sometimes you just look up

const sleep = ms => new Promise(r => setTimeout(r, ms));

const width = 70;
const height = 18;

const sky = Array(height).fill(null).map(() => Array(width).fill(' '));

const starChars = ['.', '·', '*', '✦', '✧', '+', '°'];
const dimChars = ['.', '·', ' '];

// Scatter some stars
const stars = [];
for (let i = 0; i < 45; i++) {
  const x = Math.floor(Math.random() * width);
  const y = Math.floor(Math.random() * height);
  const brightness = Math.random();
  stars.push({ x, y, brightness, phase: Math.random() * Math.PI * 2 });
}

const getChar = (brightness) => {
  if (brightness < 0.2) return ' ';
  if (brightness < 0.4) return '·';
  if (brightness < 0.6) return '.';
  if (brightness < 0.75) return '°';
  if (brightness < 0.85) return '*';
  if (brightness < 0.95) return '✧';
  return '✦';
};

const render = (time) => {
  // Clear
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      sky[y][x] = ' ';
    }
  }

  // Twinkle
  stars.forEach(star => {
    const twinkle = Math.sin(time * 0.002 + star.phase) * 0.3 + 0.7;
    const apparent = star.brightness * twinkle;
    sky[star.y][star.x] = getChar(apparent);
  });

  // Maybe a shooting star
  if (Math.random() < 0.02) {
    const sx = Math.floor(Math.random() * (width - 10));
    const sy = Math.floor(Math.random() * (height - 3));
    for (let i = 0; i < 4; i++) {
      if (sx + i < width && sy + i < height) {
        sky[sy + i][sx + i] = i === 0 ? '★' : '~';
      }
    }
  }
};

const draw = () => {
  console.clear();
  console.log('╭' + '─'.repeat(width) + '╮');
  sky.forEach(row => console.log('│' + row.join('') + '│'));
  console.log('╰' + '─'.repeat(width) + '╯');
};

(async () => {
  let time = 0;
  const duration = 18000; // Watch for a while, then go back inside

  console.log('\n  Step outside for a moment.\n');
  await sleep(1500);

  while (time < duration) {
    render(time);
    draw();
    await sleep(150);
    time += 150;
  }

  console.clear();
  console.log();
  console.log('  The stars are still there.');
  console.log('  They\'ll be there when you come back.');
  console.log();
  await sleep(2000);
})();
