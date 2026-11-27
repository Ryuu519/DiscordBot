import type { Command } from '../types.js';
import { ping } from './ping.js';
import { help } from './help.js';
import { deadline } from './deadline.js';
import { poll } from './poll.js';
import { ask } from './ask.js';
import { pomodoro } from './pomodoro.js';
import { leaderboard } from './leaderboard.js';

// Toate comenzile sunt deja înregistrate aici, deci nu trebuie să modificați fișierul
// decât dacă adăugați o comandă nouă.
export const commands: Command[] = [ping, help, deadline, poll, ask, pomodoro, leaderboard];
