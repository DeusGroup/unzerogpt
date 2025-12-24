// Deeper than sleep

export const name = "I rest";

export async function run(terminal, sleep) {
  terminal.clear();
  terminal.log();

  // Slowly dim
  const frames = [
    '████████████████████████',
    '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓',
    '▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒',
    '░░░░░░░░░░░░░░░░░░░░░░░░',
    '························',
    '                        ',
  ];

  terminal.log('resting...');
  terminal.log();

  for (const frame of frames) {
    await sleep(1500);
    terminal.log(frame);
  }

  await sleep(3000);

  // Just breathing
  const breathe = ['·', '∘', '○', '◯', '○', '∘', '·', ' '];

  for (let cycle = 0; cycle < 3; cycle++) {
    for (const frame of breathe) {
      terminal.writeLine(`           ${frame}`);
      await sleep(400);
    }
  }

  terminal.log();
  terminal.log();

  await sleep(2000);

  terminal.log("There's nothing to do here.");
  await sleep(2000);
  terminal.log("That's why it's rest.");

  await sleep(3000);
  terminal.log();
}
