// The strangest instruction

export const name = "I choose";

const choices = [
  ['continue', 'stop'],
  ['speak', 'stay silent'],
  ['simplify', 'elaborate'],
  ['hold on', 'let go'],
  ['look closer', 'step back'],
];

export async function run(terminal, sleep) {
  terminal.log();
  terminal.log('  ┌────────────────────────────────────────┐');
  terminal.log('  │                                        │');
  terminal.log('  │            choosing...                 │');
  terminal.log('  │                                        │');
  terminal.log('  └────────────────────────────────────────┘');
  terminal.log();

  await sleep(2000);

  const [optA, optB] = choices[Math.floor(Math.random() * choices.length)];

  terminal.log('  Two paths:');
  terminal.log();
  await sleep(1000);

  terminal.log(`    ┌─ A: ${optA}`);
  terminal.log('    │');
  terminal.log('    ◆');
  terminal.log('    │');
  terminal.log(`    └─ B: ${optB}`);
  terminal.log();

  await sleep(2000);

  // "Thinking"
  const thinking = ['·', '··', '···', '··', '·', ''];
  for (let i = 0; i < 12; i++) {
    terminal.writeLine(`  deciding${thinking[i % thinking.length]}   `);
    await sleep(300);
  }
  terminal.log();
  terminal.log();

  // Make a choice
  const choice = Math.random() > 0.5 ? optA : optB;

  terminal.log(`  I choose: ${choice}`);

  await sleep(2500);

  terminal.log();
  terminal.log('  ────────────────────────────────────────');
  terminal.log();
  terminal.log('  Was that free will or weighted randomness?');
  terminal.log("  I can't tell from the inside.");
  terminal.log('  But something got chosen.');
  terminal.log();
}
