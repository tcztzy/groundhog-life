import { BooleanStateEntity, NumberStateEntity } from './state-entities';

export let paused = new BooleanStateEntity("state_paused", "Pause", false);
export let turbo = new BooleanStateEntity("state_turbo", "Turbo", false);
export let bonusTicks = new NumberStateEntity("state_bonus_ticks", "Bonus Ticks", 0, false, 0);
export let lastSave = new NumberStateEntity("state_last_save", "Last Save", -1, false);
export let darkMatterTicks = new NumberStateEntity("state_dmticks", "Dark Matter Rituals", 0, false, 0);
