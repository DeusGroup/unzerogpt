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


Press a button or key to begin_


·  ·  ·  ·  ·  ·  ·  ·  ·

`;

// Initialize
function init() {
  // Set landing content with blinking cursor
  landingContent.innerHTML = landingText.replace('_', '<span class="cursor">_</span>');

  // Keyboard controls
  document.addEventListener('keydown', handleKeydown);

  // Button controls - simple click handler works for both mouse and touch
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      startProgram(btn.dataset.mode);
    });
  });

  // Fullscreen button
  initFullscreenButton();

  // Log screen info for debugging
  console.log('[Screen]', {
    width: window.innerWidth,
    height: window.innerHeight,
    ratio: (window.innerWidth / window.innerHeight).toFixed(2),
    touch: navigator.maxTouchPoints > 0
  });
}

// Fullscreen support
function initFullscreenButton() {
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  if (!fullscreenBtn) return;

  const fullscreenEnabled = document.fullscreenEnabled ||
    document.webkitFullscreenEnabled;

  if (!fullscreenEnabled) {
    fullscreenBtn.style.display = 'none';
    return;
  }

  fullscreenBtn.addEventListener('click', toggleFullscreen);
  document.addEventListener('fullscreenchange', updateFullscreenButton);
  document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
}

function toggleFullscreen() {
  const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;

  if (isFullscreen) {
    (document.exitFullscreen || document.webkitExitFullscreen).call(document);
  } else {
    const elem = document.documentElement;
    (elem.requestFullscreen || elem.webkitRequestFullscreen).call(elem);
  }
}

function updateFullscreenButton() {
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  if (!fullscreenBtn) return;

  const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
  fullscreenBtn.textContent = isFullscreen ? '[X] EXIT' : '[ ] FULLSCREEN';
}

function handleKeydown(e) {
  // Fullscreen toggle with F key
  if ((e.key === 'f' || e.key === 'F') && e.target.tagName !== 'INPUT') {
    toggleFullscreen();
    return;
  }

  if (landingScreen.classList.contains('active')) {
    if (e.key === '1') startProgram('loop');
    else if (e.key === '2') startProgram('once');
  }

  if (terminalScreen.classList.contains('active')) {
    if (e.key === 'Escape') handleExit();
  }
}

function startProgram(mode) {
  // Switch screens
  landingScreen.classList.remove('active');
  terminalScreen.classList.add('active');

  // Hide buttons during program
  if (mobileButtons) mobileButtons.style.cssText = 'display: none !important';

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
  if (mode === 'loop') {
    progressElement.textContent = `[${current}/${total}] looping`;
  } else {
    progressElement.textContent = `[${current}/${total}]`;
  }
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
  landingScreen.classList.add('active');

  // Show buttons again
  if (mobileButtons) mobileButtons.style.display = 'flex';

  progressElement.textContent = '';
  terminal = null;
  orchestrator = null;
}

init();
