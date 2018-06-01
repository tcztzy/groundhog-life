import { BooleanStateEntity } from './state-entities';

export let pauseOnPrestige = new BooleanStateEntity('set_pauseOnPrestige', 'Pause Game after Prestige', false, false);
export let idleMode = new BooleanStateEntity('set_idleMode', 'Fast-Forward progress after Idling', true, false);
export let nightMode = new BooleanStateEntity('state_nightmode', 'Nightmode', false);
export let xpPerHour = new BooleanStateEntity('show_xpPerHour', 'XP Per Hour', true, false);
export let playSounds = new BooleanStateEntity('play_sounds', 'Play Sounds', true, false);
