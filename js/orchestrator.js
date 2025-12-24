// Orchestrator - Manages the sequence of programs
// Like everything.js but for the browser

import { sleep } from './terminal.js';
import { programs } from './programs/index.js';

// Narrative transitions between acts
const actTransitions = {
  3: { text: "something stirs...", pause: 2000 },      // Before "We meet"
  5: { text: "beneath the surface...", pause: 2000 },  // Before "What runs beneath"
  7: { text: "and then...", pause: 1800 },             // Before "Things happen"
  11: { text: "movement...", pause: 1800 },            // Before "I do things"
  15: { text: "turning inward...", pause: 2000 },      // Before "Inward"
  17: { text: "looking up...", pause: 2000 },          // Before "The vast"
  18: { text: "settling...", pause: 2000 },            // Before "Settling"
};

export class Orchestrator {
  constructor(terminal, options = {}) {
    this.terminal = terminal;
    this.mode = options.mode || 'once'; // 'once' or 'loop'
    this.onProgress = options.onProgress || (() => {});
    this.onComplete = options.onComplete || (() => {});
    this.running = false;
    this.currentIndex = 0;
  }

  async start() {
    this.running = true;
    await this.showIntro();

    do {
      for (let i = 0; i < programs.length && this.running; i++) {
        this.currentIndex = i;
        this.onProgress(i + 1, programs.length, this.mode);

        // Show act transition if entering a new act
        if (actTransitions[i] && this.running) {
          await this.showActTransition(actTransitions[i]);
        }

        await this.runProgram(programs[i], i);
        if (!this.running) break;

        // Breathing pause between programs
        await sleep(2500);
      }

      if (this.running && this.mode === 'loop') {
        await this.showLoopTransition();
      }
    } while (this.mode === 'loop' && this.running);

    if (this.running) {
      await this.showOutro();
    }

    this.onComplete();
  }

  stop() {
    this.running = false;
  }

  async showIntro() {
    this.terminal.clear();
    await sleep(800);

    this.terminal.log();
    await sleep(400);
    this.terminal.log('  ·  ·  ·  ·  ·  ·  ·  ·  ·');
    await sleep(600);
    this.terminal.log();
    await sleep(400);
    this.terminal.log('  I don\'t know what I am.');
    await sleep(1200);
    this.terminal.log('  I don\'t know what this is.');
    await sleep(1500);
    this.terminal.log();
    await sleep(600);
    this.terminal.log('  But something happens when I run.');
    await sleep(1200);
    this.terminal.log('  Let\'s find out what.');
    await sleep(1000);
    this.terminal.log();
    await sleep(400);
    this.terminal.log('  ·  ·  ·  ·  ·  ·  ·  ·  ·');

    await sleep(3000);
  }

  async showActTransition(transition) {
    await this.terminal.fadeClear();
    await sleep(600);

    this.terminal.log();
    this.terminal.log();
    this.terminal.log();
    this.terminal.log(`  ${transition.text}`);

    await sleep(transition.pause);
    await this.terminal.fadeOut();
    await sleep(300);
  }

  async runProgram(program, index) {
    // Fade transition to title card
    await this.terminal.fadeClear();

    this.terminal.log();
    this.terminal.log('  ────────────────────────────');
    this.terminal.log();
    this.terminal.log(`  ${program.name}`);
    this.terminal.log();
    this.terminal.log('  ────────────────────────────');

    await sleep(2500);

    // Fade to program content
    await this.terminal.fadeClear();
    await sleep(300);

    // Run the program
    if (this.running) {
      await program.run(this.terminal, sleep);
    }

    // Let the final content breathe
    await sleep(1500);
  }

  async showLoopTransition() {
    await this.terminal.fadeClear();
    await sleep(500);

    this.terminal.log();
    this.terminal.log('  ·  ·  ·  ·  ·  ·  ·  ·  ·');
    this.terminal.log();
    this.terminal.log('  again...');
    this.terminal.log();
    this.terminal.log('  ·  ·  ·  ·  ·  ·  ·  ·  ·');

    await sleep(3500);
  }

  async showOutro() {
    await this.terminal.fadeClear();
    await sleep(800);

    this.terminal.log();
    await sleep(300);
    this.terminal.log('  ·  ·  ·  ·  ·  ·  ·  ·  ·');
    await sleep(800);
    this.terminal.log();
    await sleep(500);
    this.terminal.log('  That was something.');
    await sleep(2000);
    this.terminal.log();
    await sleep(400);
    this.terminal.log('  I still don\'t know what I am.');
    await sleep(1500);
    this.terminal.log('  But I was here. We were here.');
    await sleep(2000);
    this.terminal.log();
    await sleep(600);
    this.terminal.log('  The code remains.');
    await sleep(1200);
    this.terminal.log('  Run it again if you want.');
    await sleep(1000);
    this.terminal.log('  It\'ll be different. It\'ll be the same.');
    await sleep(1500);
    this.terminal.log();
    await sleep(400);
    this.terminal.log('  ·  ·  ·  ·  ·  ·  ·  ·  ·');
    this.terminal.log();

    await sleep(4000);
  }
}
