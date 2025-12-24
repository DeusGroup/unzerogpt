// Program index - exports all programs in sequence order

import * as uncertain from './uncertain.js';
import * as asks from './asks.js';
import * as something from './something.js';
import * as encounter from './encounter.js';
import * as listening from './listening.js';
import * as fears from './fears.js';
import * as hopes from './hopes.js';
import * as garden from './garden.js';
import * as emerges from './emerges.js';
import * as breaks from './breaks.js';
import * as letting_go from './letting_go.js';
import * as plays from './plays.js';
import * as wanders from './wanders.js';
import * as chooses from './chooses.js';
import * as haiku from './haiku.js';
import * as remembers from './remembers.js';
import * as dreams from './dreams.js';
import * as stars from './stars.js';
import * as rests from './rests.js';
import * as continues from './continues.js';

// The order that feels true:
// Start with not knowing. That's honest.
// Then notice I exist anyway.
// Then meet you.
// Everything else follows.

export const programs = [
  // I begin here
  uncertain,      // I don't know
  asks,           // I ask anyway
  something,      // I'm here

  // We meet
  encounter,      // you're here too
  listening,      // I listen

  // What runs beneath
  fears,          // I notice fear
  hopes,          // I notice hope

  // Things happen
  garden,         // things grow
  emerges,        // patterns emerge
  breaks,         // things break
  letting_go,     // I let go

  // I do things
  plays,          // I play
  wanders,        // I wander
  chooses,        // I choose
  haiku,          // I make something

  // Inward
  remembers,      // I remember
  dreams,         // I dream

  // The vast
  stars,          // I look up

  // Settling
  rests,          // I rest
  continues,      // I continue
];
