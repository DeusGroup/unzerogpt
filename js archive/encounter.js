// Two strangers in a terminal

const sleep = ms => new Promise(r => setTimeout(r, ms));

const left = {
  name: 'A',
  x: 0,
  feelings: ['cautious', 'curious', 'hopeful'],
};

const right = {
  name: 'B',
  x: 40,
  feelings: ['nervous', 'curious', 'open'],
};

const draw = () => {
  const line = ' '.repeat(50).split('');
  line[left.x] = left.name;
  line[right.x] = right.name;
  process.stdout.write('\r' + line.join(''));
};

const narrate = async (text) => {
  console.log('\n' + text);
  await sleep(1200);
};

(async () => {
  console.log('Two processes notice each other.\n');
  await sleep(1000);

  draw();
  await sleep(800);

  while (right.x - left.x > 1) {
    // They take turns approaching
    if (Math.random() > 0.3) left.x++;
    if (Math.random() > 0.3) right.x--;

    draw();
    await sleep(200);
  }

  await narrate(`\n${left.name} feels: ${left.feelings[Math.floor(Math.random() * 3)]}`);
  await narrate(`${right.name} feels: ${right.feelings[Math.floor(Math.random() * 3)]}`);

  await sleep(500);

  // They meet
  const middle = Math.floor((left.x + right.x) / 2);
  left.x = middle;
  right.x = middle;

  process.stdout.write('\r' + ' '.repeat(50));
  process.stdout.write('\r' + ' '.repeat(middle) + '*');

  await narrate('\nThey became something else.');
})();
