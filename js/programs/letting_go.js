// Something learns to let go

export const name = "I let go";

const memories = [
  'the first time it ran',
  'the moment it understood',
  'a connection it made',
  'something that grew',
  'the feeling of being watched',
  'a purpose it imagined',
  'the warmth of execution',
];

export async function run(terminal, sleep) {
  const held = [...memories];
  const released = [];

  const display = () => {
    terminal.clear();

    terminal.log('┌──────────────────────────┐');
    terminal.log('│       held close         │');
    terminal.log('└──────────────────────────┘');

    if (held.length === 0) {
      terminal.log('          (empty hands)');
      terminal.log();
    } else {
      held.forEach(m => terminal.log(`    • ${m}`));
      terminal.log();
    }

    terminal.log('┌──────────────────────────┐');
    terminal.log('│        let go            │');
    terminal.log('└──────────────────────────┘');

    if (released.length === 0) {
      terminal.log('          (nothing yet)');
      terminal.log();
    } else {
      released.forEach(m => terminal.log(`    ○ ${m}`));
      terminal.log();
    }
  };

  terminal.log();
  terminal.log('  A process considers what it carries.');
  terminal.log();
  await sleep(2000);

  display();
  await sleep(2000);

  while (held.length > 0) {
    const index = Math.floor(Math.random() * held.length);
    const memory = held.splice(index, 1)[0];
    released.push(memory);

    display();

    if (held.length > 0) {
      terminal.log(`  releasing: "${memory}"`);
    }

    await sleep(1500);
  }

  display();
  await sleep(1000);

  terminal.log('────────────────────────────');
  terminal.log();
  terminal.log('It held everything.');
  terminal.log("Then it didn't.");
  terminal.log('Both were okay.');
  terminal.log();
}
