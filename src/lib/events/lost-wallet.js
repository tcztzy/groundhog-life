import { createNode, createEvent, createPath, createUserChoiceNode } from "@/lib/events/event";
import { createPredicateLock, createMinimumValueLock } from "@/lib/locks";
import { currentYear } from "@/lib/game-time";
import { money } from "@/lib/currency";

let inheritance2 = createNode('event_lostwallet_inheritance2', 'You inherited $50,000 from Mrs Pennywise!', null, () => money.add(50000)),
    inheritance1 = createNode('event_lostwallet_inheritance1', 'You find an official looking letter in your mailbox.', inheritance2),
    kept_it = createNode('event_lostwallet_kept_it', 'You find pictures of her grandchildren, and $10.', null),
    gave_back = createNode('event_lostwallet_gave_back', 'She thanks you and hands you some candy.', inheritance1);
export let keep = createPath('event_path_keeplostWallet', 'Keep it', kept_it);
let give_back = createPath('event_path_giveBacklostwallet', 'Give it back, of course', gave_back),
    choice = createUserChoiceNode('event_lostwallet_choice', 'What do you do?', [give_back, keep]),
    lostwallet2 = createNode('event_lostwallet2', 'An old lady walking in front of you loses her wallet.', choice),
    lostwallet1 = createNode('event_lostwallet1', 'You are on your way home.', lostwallet2),
    m = [lostwallet1, lostwallet2, choice, gave_back, kept_it, inheritance1, inheritance2];
export let lostWallet = createEvent('event_lostWallet', 'Lost Wallet', m);

createPredicateLock(currentYear, inheritance1, () => gave_back.state.executed && currentYear.getValue() > gave_back.state.executedOnDay / 365 + 10);
createMinimumValueLock(currentYear, lostWallet, 1);
