// Main entry point

import { Terminal, sleep } from './terminal.js';
import { Orchestrator } from './orchestrator.js';

// DOM elements
const landingScreen = document.getElementById('landing');
const landingContent = document.getElementById('landing-content');
const terminalScreen = document.getElementById('terminal-screen');
const outputElement = document.getElementById('output');
const progressElement = document.getElementById('progress');

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


> [1] AUTO LOOP  - run forever
> [2] RUN ONCE   - single journey


Press 1 or 2 to begin_


·  ·  ·  ·  ·  ·  ·  ·  ·

`;

// Initialize
function init() {
  // Set landing content with blinking cursor
  landingContent.innerHTML = landingText.replace('_', '<span class="cursor">_</span>');

  // Keyboard controls
  document.addEventListener('keydown', handleKeydown);

  // Mobile button controls
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      startProgram(btn.dataset.mode);
    });
  });

  // Fullscreen button for smart boards / kiosks
  initFullscreenButton();
}

// Fullscreen support for smart boards and kiosk displays
function initFullscreenButton() {
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  if (!fullscreenBtn) return;

  // Check if fullscreen is supported
  const fullscreenEnabled = document.fullscreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.msFullscreenEnabled;

  if (!fullscreenEnabled) {
    fullscreenBtn.style.display = 'none';
    return;
  }

  fullscreenBtn.addEventListener('click', toggleFullscreen);

  // Update button text based on fullscreen state
  document.addEventListener('fullscreenchange', updateFullscreenButton);
  document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
}

function toggleFullscreen() {
  const isFullscreen = document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement;

  if (isFullscreen) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  } else {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  }
}

function updateFullscreenButton() {
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  if (!fullscreenBtn) return;

  const isFullscreen = document.fullscreenElement ||
    document.webkitFullscreenElement;

  fullscreenBtn.textContent = isFullscreen ? '[X] EXIT FULLSCREEN' : '[ ] FULLSCREEN';
}

function handleKeydown(e) {
  // Fullscreen toggle with F key (works on any screen)
  if (e.key === 'f' || e.key === 'F') {
    // Don't trigger if user is typing in an input
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      toggleFullscreen();
      return;
    }
  }

  if (landingScreen.classList.contains('active')) {
    if (e.key === '1') {
      startProgram('loop');
    } else if (e.key === '2') {
      startProgram('once');
    }
  }

  if (terminalScreen.classList.contains('active')) {
    if (e.key === 'Escape') {
      handleExit();
    }
  }
}

function startProgram(mode) {
  landingScreen.classList.remove('active');
  terminalScreen.classList.add('active');

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
  if (orchestrator) {
    orchestrator.stop();
  }

  terminal.clear();
  terminal.log('\n  returning...');
  await sleep(800);

  returnToLanding();
}

function handleComplete() {
  setTimeout(() => {
    returnToLanding();
  }, 2000);
}

function returnToLanding() {
  terminalScreen.classList.remove('active');
  landingScreen.classList.add('active');
  progressElement.textContent = '';
  terminal = null;
  orchestrator = null;
}

init();
