import { prestiger } from '@/lib/prestiger';
import { saver } from '@/lib/saver';
import { createCustomLock }  from '@/lib/locks';
import { currentYear } from '@/lib/game-time';
import { currentLife } from '@/lib/life-loop';
import { selectPane, journalPane, lifeSummaryPane } from '@/lib/panes';
import { paused } from '@/lib/global-states';
import { addTachyons } from '@/lib/market/kongregate';
import { messageBox } from "@/lib/message-box";
import { createNode, createPath, createUserChoiceNode, createAutoChoiceNode } from '@/lib/events';
import { battle } from "@/lib/battle";
import { pauseOnPrestige } from '@/lib/settings';
import { achievements } from "@/lib/achievements";

function getV11() {
    let v11 = window.localStorage.getItem('v11');
    return !!v11 && v11.substring(35);
}

function setV11() {
    let lifeID = currentLife.getValue();
    window.localStorage.setItem('v11', 'N4IgJg9grgRgNgUwJIDsDGEC2CCCAXAGQQD' + lifeID);
}

export function prestigeAction(module=true) {
    selectPane(journalPane);
    selectPane(lifeSummaryPane);
    prestiger.prestige(module);
    messageBox.addMessage('You just turned 18. Again. Expertise from previous lives makes things easier this time.');
    if (pauseOnPrestige.getValue())
        paused.setValue(false);
    let rewardTachyons = 100;
    for (let ag of achievements) {
        for (let a of ag.achievements) {
            if (a.state.completed) rewardTachyons += 2;
        }
    }
    let lifeID = getV11();
    if (!(lifeID && lifeID === currentLife.getValue().toString())) {
        addTachyons(rewardTachyons);
        setV11();
    }
    window.kongregate.services.isGuest() || window.kongregate.stats.submit('Groundhogs', currentLife.getValue());
    saver.requestSave();
}
function timeDilationWarning() {
    messageBox.addMessage('WARNING: EXPERIENCING MAJOR TIME DILATION. CHECK YOUR EVENTS.', 'bell', 'alert-danger');
}
let P = createNode('event_groundhog_prestige', 'Here we go!', null, prestigeAction);
let x = createPath('replyGroundhog', 'Reply "groundhog"', P);
let C = createNode('event_progressgroundhog_prestige', 'Here we go!', null, prestigeAction);
let L = createPath('progressreplyGroundhog', 'Reply "groundhog"', C);
let S = createUserChoiceNode('progressgroundhoggingRoot', '\'Reply "groundhog" to try again.\'', [L]);
let A = createNode('event_progressgroundhog2', 'But the alien fleet is large, and age will catch up with you. Start over when your progress is slowing down.', S);
let I = createNode('event_progressgroundhog1', 'You are making progress!', A);
let T = createUserChoiceNode('groundhoggingRoot', 'A message on your phone: \'They are here. Reply "groundhog" to try again.\'', [x]);
let E = createNode('event_groundhog2', 'Every day appears to last longer than the day before.', T);
let D = createNode('event_groundhog1', 'Something feels wrong...', E, timeDilationWarning);
function j() {
    return battle.state.enemyReachedSolarSystem ? 0 : 1;
}
let N = createAutoChoiceNode('event_gh_ano', '...', j, [
    D,
    I
]);
let O = [
    N,
    D,
    E,
    T,
    I,
    A,
    S,
    C,
    P
];
export let groundHogging = createEvent('groundhogging', 'Groundhog', O);
function check() {
    return battle.state.enemyReachedSolarSystem || currentYear.getValue() > 43 || process.env.NODE_ENV === 'development';
}
createCustomLock([
    currentYear,
    battle
], groundHogging, check);
