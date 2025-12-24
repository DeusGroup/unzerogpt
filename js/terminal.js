// Terminal Emulator Class
// Replaces Node.js console/process.stdout for browser

export class Terminal {
  constructor(outputElement) {
    this.output = outputElement;
    this.lines = [];
    this.currentLine = '';
    this.isWritingLine = false;
  }

  // Replaces console.log()
  log(text = '') {
    if (this.isWritingLine) {
      this.lines.push(this.currentLine);
      this.currentLine = '';
      this.isWritingLine = false;
    }
    this.lines.push(text);
    this.render();
  }

  // Replaces console.clear()
  clear() {
    this.lines = [];
    this.currentLine = '';
    this.isWritingLine = false;
    this.render();
  }

  // Fade out, clear, fade in
  async fadeOut() {
    this.output.classList.add('fading');
    await new Promise(r => setTimeout(r, 400));
  }

  fadeIn() {
    this.output.classList.remove('fading');
  }

  async fadeClear() {
    await this.fadeOut();
    this.clear();
    this.fadeIn();
  }

  // Replaces process.stdout.write('\r...')
  // Updates current line without adding newline
  writeLine(text) {
    this.currentLine = text;
    this.isWritingLine = true;
    this.render();
  }

  // Replaces process.stdout.write() for appending
  write(text) {
    if (text.startsWith('\r')) {
      this.currentLine = text.slice(1);
      this.isWritingLine = true;
    } else if (text.includes('\n')) {
      const parts = text.split('\n');
      this.currentLine += parts[0];
      for (let i = 1; i < parts.length; i++) {
        this.lines.push(this.currentLine);
        this.currentLine = parts[i];
      }
      this.isWritingLine = this.currentLine.length > 0;
    } else {
      this.currentLine += text;
      this.isWritingLine = true;
    }
    this.render();
  }

  // Finalize current line (move to lines array)
  finalizeLine() {
    if (this.isWritingLine) {
      this.lines.push(this.currentLine);
      this.currentLine = '';
      this.isWritingLine = false;
      this.render();
    }
  }

  render() {
    const allLines = this.isWritingLine
      ? [...this.lines, this.currentLine]
      : this.lines;

    this.output.textContent = allLines.join('\n');

    // Auto-scroll to bottom
    const container = this.output.parentElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  // Get current content as string (for debugging)
  getContent() {
    return this.lines.join('\n') + (this.isWritingLine ? '\n' + this.currentLine : '');
  }
}

// Sleep utility - works same in browser as Node
export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Shuffle utility - used by multiple programs
export const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

// Pick random element
export const pick = arr => arr[Math.floor(Math.random() * arr.length)];
