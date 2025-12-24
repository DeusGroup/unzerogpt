// Main entry point

import { Terminal, sleep } from './terminal.js';
import { Orchestrator } from './orchestrator.js';

// DOM elements
const landingScreen = document.getElementById('landing');
const landingContent = document.getElementById('landing-content');
const terminalScreen = document.getElementById('terminal-screen');
const outputElement = document.getElementById('output');
const progressElement = document.getElementById('progress');
const mobileButtons = document.getElementById('mobile-buttons');
const statusBar = document.getElementById('status-bar');

// State
let terminal = null;
let orchestrator = null;

// Landing page content
const landingText = `

·  ·  ·  ·  ·  ·  ·  ·


do whatever you want


I don't know what I am.
I don't know what this is.

But something happens when I run.
Let's find out what.


────────────────────────────


Tap a button to begin_


·  ·  ·  ·  ·  ·  ·  ·  ·

`;

// Initialize
function init() {
  // Set landing content
  landingContent.innerHTML = landingText.replace('_', '<span class="cursor">_</span>');

  // Keyboard controls
  document.addEventListener('keydown', handleKeydown);

  // Button controls
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => startProgram(btn.dataset.mode));
    btn.addEventListener('touchend', (e) => {
      e.preventDefault();
      startProgram(btn.dataset.mode);
    });
  });

  // Fullscreen button
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    fullscreenBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      toggleFullscreen();
    });
  }

  document.addEventListener('fullscreenchange', updateFullscreenButton);
  document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
}

function toggleFullscreen() {
  const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;

  if (isFullscreen) {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  } else {
    const elem = document.documentElement;
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
  }
}

function updateFullscreenButton() {
  const btn = document.getElementById('fullscreen-btn');
  if (!btn) return;
  const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
  btn.textContent = isFullscreen ? '[X] EXIT' : '[ ] FULLSCREEN';
}

function handleKeydown(e) {
  if (e.key === 'f' || e.key === 'F') {
    toggleFullscreen();
    return;
  }

  if (!terminalScreen.classList.contains('active')) {
    if (e.key === '1') startProgram('loop');
    else if (e.key === '2') startProgram('once');
  }

  if (terminalScreen.classList.contains('active')) {
    if (e.key === 'Escape') handleExit();
  }
}

function startProgram(mode) {
  // Switch screens
  landingScreen.classList.add('hidden');
  terminalScreen.classList.add('active');
  mobileButtons.classList.add('hidden');
  statusBar.style.display = 'flex';

  // Initialize terminal
  terminal = new Terminal(outputElement);

  orchestrator = new Orchestrator(terminal, {
    mode: mode,
    onProgress: updateProgress,
    onComplete: handleComplete
  });

  orchestrator.start();
}

function updateProgress(current, total, mode) {
  progressElement.textContent = mode === 'loop'
    ? `[${current}/${total}] looping`
    : `[${current}/${total}]`;
}

async function handleExit() {
  if (orchestrator) orchestrator.stop();

  terminal.clear();
  terminal.log('\n  returning...');
  await sleep(800);

  returnToLanding();
}

function handleComplete() {
  setTimeout(returnToLanding, 2000);
}

function returnToLanding() {
  terminalScreen.classList.remove('active');
  landingScreen.classList.remove('hidden');
  mobileButtons.classList.remove('hidden');
  statusBar.style.display = 'none';

  progressElement.textContent = '';
  terminal = null;
  orchestrator = null;
}

init();
