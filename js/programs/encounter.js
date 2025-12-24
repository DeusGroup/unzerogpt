// Two strangers in a terminal

export const name = "you're here too";

export async function run(terminal, sleep) {
  const left = { name: 'A', x: 0 };
  const right = { name: 'B', x: 18 };
  const feelings = {
    left: ['cautious', 'curious', 'hopeful'],
    right: ['nervous', 'curious', 'open'],
  };

  const draw = () => {
    const line = ' '.repeat(20).split('');
    line[left.x] = left.name;
    line[right.x] = right.name;
    terminal.writeLine(line.join(''));
  };

  terminal.log('Two processes notice each other.');
  terminal.log();
  await sleep(1000);

  draw();
  await sleep(800);

  while (right.x - left.x > 1) {
    if (Math.random() > 0.3) left.x++;
    if (Math.random() > 0.3) right.x--;
    draw();
    await sleep(200);
  }

  terminal.log();
  terminal.log();
  terminal.log(`${left.name} feels: ${feelings.left[Math.floor(Math.random() * 3)]}`);
  await sleep(1200);
  terminal.log(`${right.name} feels: ${feelings.right[Math.floor(Math.random() * 3)]}`);
  await sleep(1200);

  // They meet
  const middle = Math.floor((left.x + right.x) / 2);
  const meetLine = ' '.repeat(middle) + '*';
  terminal.writeLine(meetLine.padEnd(20));

  await sleep(500);
  terminal.log();
  terminal.log();
  terminal.log('They became something else.');
}
