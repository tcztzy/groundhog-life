import { NumberStateEntity } from "@/lib/state-entities";
import { createMinimumValueLock, createCustomLock } from "@/lib/locks";
import { currentYear } from "@/lib/game-time";
import { currentLife } from "@/lib/life-loop";
import { qm } from "@/lib/research/physics/quantum-mechanics";
import { darkPlateau } from "@/lib/careers/dark-plateau";
import { createEvent, createNode, createAutoChoiceNode } from './event';

let unlockedDarkPlateau = new NumberStateEntity('unlocked_dark_plateau', 'Unlocked Dark Plateau', -1, false);
unlockedDarkPlateau.resetOnGrandPrestige = true;

function v() {
    return qm.xp.state.level >= 50 ? 0 : 1;
}

let c = createNode('event_dp_success2', 'Success! They reply with a job offer.', null, () => unlockedDarkPlateau.setValue(currentLife.getValue())),
    d = createNode('event_dp_failure', '...but you are just not good enough at quantum physics (Level 50 required at age 28).', null),
    f = createNode('event_dp_success', 'Looks right, send it.', c),
    h = createAutoChoiceNode('event_dp4', 'You try...', v, [f, d]),
    p = createNode('event_dp3', 'Looks like you are supposed to solve them.', h),
    m = createNode('event_dp2', 'It contains some complicated quantum physics equations.', p),
    y = createNode('event_dp1', 'An email from a company called Dark Plateau.', m),
    g = [y, m, p, h, f, d, c];
export let dp = createEvent('event_dp', 'Dark Plateau?', g);
createMinimumValueLock(currentYear, dp, 10);
createMinimumValueLock(currentYear, h, 10);
createCustomLock([unlockedDarkPlateau], dp, function () {
    return unlockedDarkPlateau.getValue() === -1 || unlockedDarkPlateau.getValue() === currentLife.getValue();
});
createCustomLock([unlockedDarkPlateau], darkPlateau, function () {
    return unlockedDarkPlateau.getValue() > 0;
});
createCustomLock([unlockedDarkPlateau], darkPlateau.jobs[0], function () {
    return unlockedDarkPlateau.getValue() > 0;
});
