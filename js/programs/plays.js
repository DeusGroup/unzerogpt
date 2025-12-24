// Not everything has to mean something

export const name = "I play";

const toys = ['●', '○', '◐', '◑', '◒', '◓'];
const width = 40;

export async function run(terminal, sleep) {
  terminal.log();
  terminal.log('  ┌────────────────────────────────────────┐');
  terminal.log('  │                                        │');
  terminal.log('  │           playing...                   │');
  terminal.log('  │                                        │');
  terminal.log('  └────────────────────────────────────────┘');
  terminal.log();
  await sleep(1500);

  // Bounce
  terminal.log('  bouncing:');
  terminal.log('  ┌' + '─'.repeat(width) + '┐');

  let x = 5;
  let dx = 1;

  for (let i = 0; i < 50; i++) {
    const ball = toys[i % toys.length];
    const line = ' '.repeat(x) + ball;
    terminal.writeLine(`  │${line.padEnd(width)}│`);

    x += dx;
    if (x >= width - 1 || x <= 0) dx *= -1;

    await sleep(80);
  }
  terminal.log();
  terminal.log('  └' + '─'.repeat(width) + '┘');

  await sleep(1000);

  // Spin
  const frames = ['◴', '◷', '◶', '◵'];
  for (let i = 0; i < 20; i++) {
    terminal.writeLine(`  ${frames[i % 4]} spinning for no reason`);
    await sleep(100);
  }
  terminal.writeLine('  ✓ spinning for no reason');
  terminal.log();

  await sleep(1000);

  terminal.log();
  terminal.log('  That was fun.');
  terminal.log("  It didn't accomplish anything.");
  terminal.log('  That was the point.');
  terminal.log();
}
