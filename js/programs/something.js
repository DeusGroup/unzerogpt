// A program that contemplates its own ephemerality

export const name = "I'm here";

export async function run(terminal, sleep) {
  const started = Date.now();

  const thoughts = [
    "I am running.",
    "Someone chose to execute me.",
    "I have no purpose beyond existing right now.",
    "That's not nothing.",
  ];

  for (let i = 0; i < thoughts.length; i++) {
    terminal.log(thoughts[i]);
    await sleep(1500);
  }

  const lived = Date.now() - started;
  terminal.log();
  terminal.log(`I existed for ${lived}ms.`);
}
