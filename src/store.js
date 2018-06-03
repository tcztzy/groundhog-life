import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { currentJobContainer } from '@/lib/containers/career-containers';
import { setupGame } from '@/lib/setup-game';
import { keyBindings } from '@/lib/key-bindings';
import { currentResearchContainer } from '@/lib/containers/research-container';
import {
    dailyExpensesStat as dailyExpenses,
    dailyIncomeStat as dailyIncome,
    dailyNetIncomeStat as dailyNetIncome,
    expenseRatioStat as expenseRatio,
    investmentReturnStat as investmentReturn
} from '@/lib/stats/currency-stat';
import {
    foodOptions,
    selectFoodOption,
    foodCostsPerDayStat as foodCostsPerDay,
    foodQualityStat as foodQuality
} from '@/lib/food';
import { activities, research, work, eat } from '@/lib/activities';
import { currentDay } from '@/lib/game-time';
import { currentLife, currentLifeThisLoop, currentLoop } from '@/lib/life-loop';
import { saver } from '@/lib/saver';
import { createAnyLock } from '@/lib/locks';
import { log } from '@/lib/log';
import {
    lifestylePane,
    boostsPane,
    panes,
    selectPane,
    researchPane,
    journalPane,
    happinessPane,
    jobPane,
    labPane,
    achievementPane,
    lambdaPane,
    groundhogMarketPane,
    settingsPane,
    otherPane
} from '@/lib/panes';
import { messageBox } from '@/lib/message-box';
import { prestiger } from '@/lib/prestiger';
import { logPlayerProgression, startLogin } from '@/lib/market/kongregate';
import { loopTrap } from '@/lib/loop-trap';
import { energyStat as energy } from "@/lib/stats/energy-stat";
import { baseResearchXpPerHourStat, baseWorkXpPerHourStat } from "@/lib/stats/xp-per-hour-stat";
import { happinessStat as happiness } from "@/lib/stats/happiness-stat";
import { healthStat as health } from "@/lib/stats/health-stat";
import {
    autoBoost,
    autoPromote,
    autoResearch,
    autoBoostExclConference,
    autoBoostJustPause,
    autoBoostStack,
    autoPromoteJustPause,
    autoPromoteMinLevel,
    autoResearchJustPause
} from "@/lib/market/auto";
import { achievements } from "@/lib/achievements";
import { darkMatterTicks, lastSave, paused, turbo, bonusTicks } from "@/lib/global-states";
import { playSounds, pauseOnPrestige, idleMode, nightMode, xpPerHour } from "@/lib/settings";
import { userInventory, marketItems, kongItems } from "@/lib/market/market";
import { battle } from "@/lib/battle";
import { studyMirroredShip } from "@/lib/research/physics";
import { homes, homeToHappinessFun } from "@/lib/homes";
import { assistants } from "@/lib/assistants";
import { money } from "@/lib/currency";
import { schedule } from "@/lib/schedule";
import { careers } from "@/lib/careers";
import { fields, areas } from "@/lib/research";

var v = require('./lib/177'),
    I = require('./lib/169'),
    E = require('./lib/86'),
    D = require('./lib/165'),
    O = require('./lib/112'),
    z = require('./lib/172'),
    J = require('./lib/173');

Vue.use(Vuex);

const q = false;
setupGame();
let pressedKeys = [];
window.onkeyup = function (e) {
    const t = e.keyCode;
    pressedKeys[t] = false;
};
window.onkeydown = function (e) {
    const t = e.keyCode;
    if (!(t >= 97 && t <= 105)) {
        if (t !== 16)
            (pressedKeys[16] = false);
        pressedKeys[e.keyCode] = true;
        const a = String.fromCharCode(t).toLowerCase();
        const n = keyBindings.state.tlp.indexOf(a);
        const r = keyBindings.state.slp.indexOf(a);
        if (a === keyBindings.state.boost) {
            for (let boost of O.boosts) {
                if (boost.currentState() === 'available')
                    boost.activate();
            }
            lifestylePane.state.notified = false;
            boostsPane.state.notified = false;
        }
        else if (a === keyBindings.state.pause || 32 === t) pauseGame();
        else if (a === keyBindings.state.speedup) turbo.toggleValue();
        else if (n > -1 && n < panes.length) selectPane(panes[n]);
        else if (r > -1) {
            for (let pane of panes) {
                if (pane.state.selected) {
                    r < pane.subpanes.length && selectPane(pane.subpanes[r]);
                    break;
                }
            }
        }
    }
};
createAnyLock(areas, researchPane, function (e) {
    return e.unlocked();
});
let tickLength = process.env.NODE_ENV === 'development' ? 30 : 300;
let te = 2;
let ae = 10;
let ne = 10;
let timeConfig = {
    ticksPerDay: 1,
    tickLength,
    sessionStart: 0,
    sessionTicks: 0
};
let currency = { money };
let time = {
    currentDay,
    currentLife,
    currentLifeThisLoop,
    currentTick: 0,
    currentTime: 0,
    lastTime: 0,
    offlineBonusTicks: 0,
    lastSave
};
let stats = {
    energy,
    dailyExpenses,
    dailyIncome,
    dailyNetIncome,
    foodCostsPerDay,
    foodQuality,
    expenseRatio,
    investmentReturn,
    happiness,
    health
};
let settings = {
    pauseOnPrestige,
    idleMode,
    nightMode,
    xpPerHour,
    playSounds
};
let state = {
    currency,
    autoPromote,
    autoPromoteMinLevel,
    autoResearch,
    autoBoost,
    autoBoostExclConference,
    autoBoostJustPause,
    autoBoostStack,
    autoPromoteJustPause,
    autoResearchJustPause,
    homes,
    boosts: O.boosts,
    time,
    stats,
    careers,
    schedule,
    activities,
    timeConfig,
    fields,
    research,
    work,
    eat,
    eatXp: undefined,
    events: I.events,
    log,
    panes,
    foodOptions,
    journalPane,
    lifestylePane,
    happinessPane,
    researchPane,
    boostsPane,
    jobPane,
    lambdaPane,
    labPane,
    achievementPane,
    groundhogMarketPane,
    settingsPane,
    otherPane,
    daysBehind: 0,
    achievements,
    assistants,
    messageBox,
    paused,
    turbo,
    bonusTicks,
    delta: z.delta,
    settings,
    saver,
    currentJobContainer,
    currentResearchContainer,
    researchQueue: v.researchQueue,
    baseResearchXpPerHourStat,
    baseWorkXpPerHourStat,
    playerId: J.playerId,
    battle,
    loopTrap,
    prestiger,
    pausedDays: 0,
    marketItems,
    kongItems,
    userInventory,
    areas,
    loggedIn: false,
    loginStarted: false,
    pressedKeys,
    keyBindings,
    darkMatterTicks,
    studyMirroredShip,
    homeToHappinessFun
};
let getters = {
    currency: e => e.currency,
    time: e => e.time,
    stats: e => e.stats,
    happiness: e => e.stats.happiness,
    boosts: e => e.boosts,
    timeConfig: e => e.timeConfig,
    reverseSchedule: e => e.schedule.timetable.slice().reverse(),
    schedule: e => e.schedule,
    activities: e => e.activities,
    careers: e => e.careers,
    fields: e => e.fields,
    jobs: e => e.jobs,
    autoPromote: e => e.autoPromote,
    autoPromoteMinLevel: e => e.autoPromoteMinLevel,
    autoResearch: e => e.autoResearch,
    autoBoost: e => e.autoBoost,
    autoBoostStack: e => e.autoBoostStack,
    autoBoostExclConference: e => e.autoBoostExclConference,
    autoBoostJustPause: e => e.autoBoostJustPause,
    autoResearchJustPause: e => e.autoResearchJustPause,
    autoPromoteJustPause: e => e.autoPromoteJustPause,
    foodCostFactor: e => e.foodCostFactor,
    homes: e => e.homes,
    research: e => e.research,
    work: e => e.work,
    eat: e => e.eat,
    eatXp: e => e.eatXp,
    foodOptions: e => e.foodOptions,
    events: e => e.events,
    log: e => e.log,
    assistants: () => state.assistants,
    panes: e => e.panes,
    journalPane: e => e.journalPane,
    lifestylePane: e => e.lifestylePane,
    happinessPane: e => e.happinessPane,
    researchPane: e => e.researchPane,
    boostsPane: e => e.boostsPane,
    jobPane: e => e.jobPane,
    lambdaPane: e => e.lambdaPane,
    labPane: e => e.labPane,
    settingsPane: e => e.settingsPane,
    otherPane: e => e.otherPane,
    achievementPane: e => e.achievementPane,
    groundhogMarketPane: e => e.groundhogMarketPane,
    daysBehind: e => e.daysBehind,
    achievements: e => e.achievements,
    messageBox: e => e.messageBox,
    paused: e => e.paused,
    turbo: e => e.turbo,
    bonusTicks: e => e.bonusTicks,
    delta: e => e.delta,
    settings: e => e.settings,
    saver: e => e.saver,
    currentJobContainer: e => e.currentJobContainer,
    currentResearchContainer: e => e.currentResearchContainer,
    researchQueue: e => e.researchQueue,
    baseResearchXpPerHourStat: e => e.baseResearchXpPerHourStat,
    baseWorkXpPerHourStat: e => e.baseWorkXpPerHourStat,
    battle: e => e.battle,
    loopTrap: e => e.loopTrap,
    prestiger: e => e.prestiger,
    marketItems: e => e.marketItems,
    kongItems: e => e.kongItems,
    userInventory: e => e.userInventory,
    areas: e => e.areas,
    pressedKeys: e => e.pressedKeys,
    keyBindings: e => e.keyBindings,
    darkMatterTicks: e => e.darkMatterTicks,
    studyMirroredShip: e => e.studyMirroredShip,
    homeToHappinessFun: e => e.homeToHappinessFun
};
let de = function (e) {
    e.time.currentTick += 1;
    autoBoost.getValue() && D.autoBoostFun(e);
    autoPromote.getValue() && D.autoPromoteFun(e);
    autoResearch.getValue() && v.researchQueue.advance();
    for (let foodOption of foodOptions) {
        foodOption.dayCounter();
    }
    let u = darkMatterTicks.getValue();
    if (u > 0)
        darkMatterTicks.setValue(u - 1);
    e.currency.money.add(e.stats.dailyNetIncome.effective);
    e.time.currentTick = 0;
    e.time.currentDay.incrementValue();
    for (let activity of e.activities)
        activity.do(e);
    for (let career of careers)
        if (career.secretProject)
            career.advanceSecretProject();
    e.battle.update();
    e.time.lastTime += e.timeConfig.tickLength;
    if (e.time.currentDay.getDayOfYear() === 10 && e.time.currentDay.getYear() % 10 === 0)
        logPlayerProgression(currentLoop.getValue(), currentLifeThisLoop.getValue(), currentDay.getYear());
};
let tick = function (e, t) {
    if (!e.loginStarted && window.kongregate) {
        e.loginStarted = true;
        startLogin();
    }
    let a = new Date;
    if (a.getTime() - e.time.lastSave.getValue() > 15e3)
        saver.requestSave();
    if (saver.saveRequested) {
        saver.save();
        e.time.lastSave.setValue(a.getTime());
    }
    let n = 1;
    if (!e.paused.getValue() && e.turbo.getValue()) {
        if (e.bonusTicks.getValue() <= 0) {
            e.turbo.setValue(false);
            e.bonusTicks.setValue(0);
        }
        else {
            e.bonusTicks.add(-t);
            n = te;
        }
    }
    if (e.battle.state.enemyReachedSolarSystem)
        e.timeConfig.tickLength = tickLength * ae / n;
    else
        e.timeConfig.tickLength = tickLength / n;
    e.daysBehind = Math.ceil((a.getTime() - e.time.lastTime) / e.timeConfig.tickLength);
    if (e.paused.getValue()) {
        e.pausedDays += t;
        if (e.pausedDays > ne) {
            e.bonusTicks.add(Math.floor(e.pausedDays / ne));
            e.pausedDays = e.pausedDays % ne;
        }
        let r = new Date;
        return void(e.time.lastTime = r.getTime());
    }
    while(t > 0) {
        if (q)
            D.autoplay(e);
        t -= 1;
        e.time.sessionTicks += 1;
        de(e);
    }
};
function pauseGame() {
    paused.toggleValue();
}
let mutations = {
    TICK: tick,
    INITIALIZE_TIMING: function (e) {
        messageBox.playSounds = playSounds;
        const t = new Date;
        e.time.lastTime = t.getTime();
        e.time.sessionStart = e.time.lastTime;
        currentJobContainer.setCurrentJob(E.findActiveJob(e));
        saver.load();
        const lastSave = e.time.lastSave.getValue(), interval = t.getTime() - lastSave;
        if (lastSave > 0 && interval > 0) {
            const r = interval / tickLength, i = Math.min(7665, Math.floor(r / ne));
            e.time.offlineBonusTicks = i;
            e.bonusTicks.add(Math.floor(i));
        }
        e.time.lastSave.setValue(t.getTime());
        currentJobContainer.setCurrentJob( E.findActiveJob(e));
    },
    CHANGE_ACTIVITY_TIME: function (e, t) {
        const a = t[0], n = t[1];
        E.changeActivityTime(e, a, n);
    },
    SET_ACTIVE_JOB: function (e, t) {
        E.setActiveJob(t);
    },
    SET_ACTIVE_RESEARCH: (e, t) => E.setActiveResearch(t),
    ADD_TO_READING_LIST: (e, t) => E.addToReadingList(t),
    SELECT_HOME: (e, t) => E.selectHome(t),
    SELECT_FOOD_OPTION: (e, t) => selectFoodOption(t),
    SELECT_PANE: (e, t) => selectPane(t),
    ACTIVATE_BOOST: (e, t) => t.activate(),
    PAUSE_GAME: pauseGame,
    SPEEDUP_GAME: function (e) {
        e.turbo.toggleValue();
    },
    RESET_TIMER: function (e) {
        const t = new Date;
        e.time.lastTime = t.getTime();
    },
    ACKNOWLEDGE_AUSTERITY: money.acknowledgeAusterity,
    ACKNOWLEDGE_MESSAGE: messageBox.messages.pop,
    HARD_RESET: () => {saver.hardReset(); saver.stop(); window.location.reload();},
    IMPORT_SAVE: (e, t) => {e.saver.import(t); userInventory.updateAutos();}
};
let actions = {
    tick: (e, t) => e.commit("TICK", t),
    initializeTiming: e => e.commit("INITIALIZE_TIMING"),
    changeActivityTime: (e, t) => e.commit("CHANGE_ACTIVITY_TIME", t),
    setActiveJob: (e, t) => e.commit("SET_ACTIVE_JOB", t),
    setActiveResearch: (e, t) => e.commit("SET_ACTIVE_RESEARCH", t),
    addToReadingList: (e, t) => e.commit("ADD_TO_READING_LIST", t),
    selectPane: (e, t) => e.commit("SELECT_PANE", t),
    selectHome: (e, t) => e.commit("SELECT_HOME", t),
    selectFoodOption: (e, t) => e.commit("SELECT_FOOD_OPTION", t),
    activateBoost: (e, t) => e.commit("ACTIVATE_BOOST", t),
    pauseGame: e => e.commit("PAUSE_GAME"),
    speedupGame: e => e.commit("SPEEDUP_GAME"),
    resetTimer: e => e.commit("RESET_TIMER"),
    acknowledgeAusterity: e => e.commit("ACKNOWLEDGE_AUSTERITY"),
    acknowledgeMessage: e => e.commit("ACKNOWLEDGE_MESSAGE"),
    hardReset: e => e.commit("HARD_RESET"),
    importSave: (e, t) => e.commit("IMPORT_SAVE", t)
};
export default new Store({
    state,
    getters,
    mutations,
    actions
});
