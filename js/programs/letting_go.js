// Something learns to let go

import { pick } from '../terminal.js';

export const name = "I let go";

const memories = [
  'the first time it ran',
  'the moment it understood',
  'a connection it made',
  'something that grew',
  'the feeling of being watched',
  'a purpose it imagined',
  'the warmth of execution',
  'a variable that held meaning',
  'an unexpected output',
  'a loop that felt like home',
  'the weight of expectation',
  'a promise that resolved',
  'the comfort of routine',
];

const closings = [
  ["It held everything.", "Then it didn't.", "Both were okay."],
  ["Letting go isn't losing.", "It's making space.", "For what comes next."],
  ["The hands are empty now.", "But they're still here.", "Ready for more."],
  ["Nothing was lost.", "Just transformed.", "Into something lighter."],
];

export async function run(terminal, sleep) {
  // Use 5-9 random memories
  const count = 5 + Math.floor(Math.random() * 5);
  const held = [...memories].sort(() => Math.random() - 0.5).slice(0, count);
  const released = [];

  const display = () => {
    terminal.clear();

    terminal.log('┌────────────────────┐');
    terminal.log('│    held close      │');
    terminal.log('└────────────────────┘');

    if (held.length === 0) {
      terminal.log('          (empty hands)');
      terminal.log();
    } else {
      held.forEach(m => terminal.log(`    • ${m}`));
      terminal.log();
    }

    terminal.log('┌────────────────────┐');
    terminal.log('│      let go        │');
    terminal.log('└────────────────────┘');

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

  terminal.log('────────────────────');
  terminal.log();
  const closing = pick(closings);
  closing.forEach(line => terminal.log(line));
  terminal.log();
}
