import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
var r = require('get-iterator'), i = n(r),
    c = require('./118'), d = require('./30'), f = require('./89'), v = require('./177'), h = require('./69'),
    p = require('./46'), m = require('./lib/currency-stat'), y = require('./31'), g = require('./115'),
    _ = require('./59'), b = require('./73'), M = require('./90'), k = require('./57'), w = require('./129'),
    P = require('./22'), x = require('./18'), C = require('./35'), L = require('./84'), S = require('./41'),
    A = require('./lib/locks'), I = require('./169'), T = require('./lib/saver'), E = require('./86'),
    D = require('./165'), j = require('./71'), N = require('./82'), O = require('./112'), B = require('./28'),
    R = require('./lib/message-box'), V = require('./54'), G = require('./116'), z = require('./172'),
    F = require('./lib/prestiger'), Y = require('./45'), U = require('./91'),
    J = require('./173'), W = require('./DEVMODE'), X = require('./65'), Q = require('./lib/loop-trap'),
    Z = require('./lib/key-bindings'), $ = require('./44');
import { setupGame } from './lib/setup-game';

var q = false;
setupGame();
var K = [];
window.onkeyup = function (module) {
    var exports = module.keyCode;
    K[exports] = !1;
}, window.onkeydown = function (module) {
    var exports = module.keyCode;
    if (!(exports >= 97 && exports <= 105)) {
        16 !== exports && (K[16] = !1), K[module.keyCode] = !0;
        var require = String.fromCharCode(exports).toLowerCase(), n = Z.keyBindings.state.tlp.indexOf(require),
            r = Z.keyBindings.state.slp.indexOf(require);
        if (require === Z.keyBindings.state.boost) {
            var s = !0, o = !1, u = void 0;
            try {
                for (var l, c = (0, i.default)(O.boosts); !(s = (l = c.next()).done); s = !0) {
                    var d = l.value;
                    'available' === d.currentState() && d.activate();
                }
            } catch (module) {
                o = !0, u = module;
            } finally {
                try {
                    !s && c.return && c.return();
                } finally {
                    if (o)
                        throw u;
                }
            }
            B.lifestylePane.state.notified = !1, B.boostsPane.state.notified = !1;
        } else if (require === Z.keyBindings.state.pause || 32 === exports)
            ve();
        else if (require === Z.keyBindings.state.speedup)
            V.turbo.toggleValue();
        else if (n > -1 && n < B.panes.length)
            (0, B.selectPane)(B.panes[n]);
        else if (r > -1) {
            var f = !0, v = !1, h = void 0;
            try {
                for (var p, m = (0, i.default)(B.panes); !(f = (p = m.next()).done); f = !0) {
                    var y = p.value;
                    if (y.state.selected) {
                        r < y.subpanes.length && (0, B.selectPane)(y.subpanes[r]);
                        break;
                    }
                }
            } catch (module) {
                v = !0, h = module;
            } finally {
                try {
                    !f && m.return && m.return();
                } finally {
                    if (v)
                        throw h;
                }
            }
        }
    }
}, (0, A.createAnyLock)(f.areas, B.researchPane, function (module) {
    return module.unlocked();
});
var ee = W.DEVMODE ? 30 : 300, te = 2, ae = 10, ne = 10, re = {
    ticksPerDay: 1,
    tickLength: ee,
    sessionStart: 0,
    sessionTicks: 0
};
let ie = {money: S.money}, se = {
    currentDay: x.currentDay,
    currentLife: C.currentLife,
    currentLifeThisLoop: C.currentLifeThisLoop,
    currentTick: 0,
    currentTime: 0,
    lastTime: 0,
    offlineBonusTicks: 0,
    lastSave: V.lastSave
};
let oe = {
    energy: p.energyStat,
    dailyExpenses: m.dailyExpensesStat,
    dailyIncome: m.dailyIncomeStat,
    dailyNetIncome: m.dailyNetIncomeStat,
    foodCostsPerDay: _.foodCostsPerDayStat,
    foodQuality: _.foodQualityStat,
    expenseRatio: m.expenseRatioStat,
    investmentReturn: m.investmentReturnStat,
    happiness: b.happinessStat,
    health: M.healthStat
};
let ue = {
    pauseOnPrestige: G.pauseOnPrestige,
    idleMode: G.idleMode,
    nightMode: G.nightMode,
    xpPerHour: G.xpPerHour,
    playSounds: G.playSounds
};
let state = {
    currency: ie,
    autoPromote: L.autoPromote,
    autoPromoteMinLevel: L.autoPromoteMinLevel,
    autoResearch: L.autoResearch,
    autoBoost: L.autoBoost,
    autoBoostExclConference: L.autoBoostExclConference,
    autoBoostJustPause: L.autoBoostJustPause,
    autoBoostStack: L.autoBoostStack,
    autoPromoteJustPause: L.autoPromoteJustPause,
    autoResearchJustPause: L.autoResearchJustPause,
    homes: k.homes,
    boosts: O.boosts,
    time: se,
    stats: oe,
    careers: c.careers,
    schedule: w.schedule,
    activities: P.activities,
    timeConfig: re,
    fields: f.fields,
    research: P.research,
    work: P.work,
    eat: P.eat,
    eatXp: P.eatXp,
    events: I.events,
    log: j.log,
    panes: B.panes,
    foodOptions: _.foodOptions,
    journalPane: B.journalPane,
    lifestylePane: B.lifestylePane,
    happinessPane: B.happinessPane,
    researchPane: B.researchPane,
    boostsPane: B.boostsPane,
    jobPane: B.jobPane,
    lambdaPane: B.lambdaPane,
    labPane: B.labPane,
    achievementPane: B.achievementPane,
    groundhogMarketPane: B.groundhogMarketPane,
    settingsPane: B.settingsPane,
    otherPane: B.otherPane,
    daysBehind: 0,
    achievements: N.achievements,
    assistants: g.assistants,
    messageBox: R.messageBox,
    paused: V.paused,
    turbo: V.turbo,
    bonusTicks: V.bonusTicks,
    delta: z.delta,
    settings: ue,
    saver: T.saver,
    currentJobContainer: d.currentJobContainer,
    currentResearchContainer: h.currentResearchContainer,
    researchQueue: v.researchQueue,
    baseResearchXpPerHourStat: y.baseResearchXpPerHourStat,
    baseWorkXpPerHourStat: y.baseWorkXpPerHourStat,
    playerId: J.playerId,
    battle: X.battle,
    loopTrap: Q.loopTrap,
    prestiger: F.prestiger,
    pausedDays: 0,
    marketItems: U.marketItems,
    kongItems: U.kongItems,
    userInventory: U.userInventory,
    areas: f.areas,
    loggedIn: !1,
    loginStarted: !1,
    pressedKeys: K,
    keyBindings: Z.keyBindings,
    darkMatterTicks: V.darkMatterTicks,
    studyMirroredShip: $.studyMirroredShip,
    homeToHappinessFun: k.homeToHappinessFun
};
let getters = {
    currency: function (module) {
        return module.currency;
    },
    time: function (module) {
        return module.time;
    },
    stats: function (module) {
        return module.stats;
    },
    happiness: function (module) {
        return module.stats.happiness;
    },
    boosts: function (module) {
        return module.boosts;
    },
    timeConfig: function (module) {
        return module.timeConfig;
    },
    reverseSchedule: function (module) {
        return module.schedule.timetable.slice().reverse();
    },
    schedule: function (module) {
        return module.schedule;
    },
    activities: function (module) {
        return module.activities;
    },
    careers: function (module) {
        return module.careers;
    },
    fields: function (module) {
        return module.fields;
    },
    jobs: function (module) {
        return module.jobs;
    },
    autoPromote: function (module) {
        return module.autoPromote;
    },
    autoPromoteMinLevel: function (module) {
        return module.autoPromoteMinLevel;
    },
    autoResearch: function (module) {
        return module.autoResearch;
    },
    autoBoost: function (module) {
        return module.autoBoost;
    },
    autoBoostStack: function (module) {
        return module.autoBoostStack;
    },
    autoBoostExclConference: function (module) {
        return module.autoBoostExclConference;
    },
    autoBoostJustPause: function (module) {
        return module.autoBoostJustPause;
    },
    autoResearchJustPause: function (module) {
        return module.autoResearchJustPause;
    },
    autoPromoteJustPause: function (module) {
        return module.autoPromoteJustPause;
    },
    foodCostFactor: function (module) {
        return module.foodCostFactor;
    },
    homes: function (module) {
        return module.homes;
    },
    research: function (module) {
        return module.research;
    },
    work: function (module) {
        return module.work;
    },
    eat: function (module) {
        return module.eat;
    },
    eatXp: function (module) {
        return module.eatXp;
    },
    foodOptions: function (module) {
        return module.foodOptions;
    },
    events: function (module) {
        return module.events;
    },
    log: function (module) {
        return module.log;
    },
    assistants: function (module) {
        return state.assistants;
    },
    panes: function (module) {
        return module.panes;
    },
    journalPane: function (module) {
        return module.journalPane;
    },
    lifestylePane: function (module) {
        return module.lifestylePane;
    },
    happinessPane: function (module) {
        return module.happinessPane;
    },
    researchPane: function (module) {
        return module.researchPane;
    },
    boostsPane: function (module) {
        return module.boostsPane;
    },
    jobPane: function (module) {
        return module.jobPane;
    },
    lambdaPane: function (module) {
        return module.lambdaPane;
    },
    labPane: function (module) {
        return module.labPane;
    },
    settingsPane: function (module) {
        return module.settingsPane;
    },
    otherPane: function (module) {
        return module.otherPane;
    },
    achievementPane: function (module) {
        return module.achievementPane;
    },
    groundhogMarketPane: function (module) {
        return module.groundhogMarketPane;
    },
    daysBehind: function (module) {
        return module.daysBehind;
    },
    achievements: function (module) {
        return module.achievements;
    },
    messageBox: function (module) {
        return module.messageBox;
    },
    paused: function (module) {
        return module.paused;
    },
    turbo: function (module) {
        return module.turbo;
    },
    bonusTicks: function (module) {
        return module.bonusTicks;
    },
    delta: function (module) {
        return module.delta;
    },
    settings: function (module) {
        return module.settings;
    },
    saver: function (module) {
        return module.saver;
    },
    currentJobContainer: function (module) {
        return module.currentJobContainer;
    },
    currentResearchContainer: function (module) {
        return module.currentResearchContainer;
    },
    researchQueue: function (module) {
        return module.researchQueue;
    },
    baseResearchXpPerHourStat: function (module) {
        return module.baseResearchXpPerHourStat;
    },
    baseWorkXpPerHourStat: function (module) {
        return module.baseWorkXpPerHourStat;
    },
    battle: function (module) {
        return module.battle;
    },
    loopTrap: function (module) {
        return module.loopTrap;
    },
    prestiger: function (module) {
        return module.prestiger;
    },
    marketItems: function (module) {
        return module.marketItems;
    },
    kongItems: function (module) {
        return module.kongItems;
    },
    userInventory: function (module) {
        return module.userInventory;
    },
    areas: function (module) {
        return module.areas;
    },
    pressedKeys: function (module) {
        return module.pressedKeys;
    },
    keyBindings: function (module) {
        return module.keyBindings;
    },
    darkMatterTicks: function (module) {
        return module.darkMatterTicks;
    },
    studyMirroredShip: function (module) {
        return module.studyMirroredShip;
    },
    homeToHappinessFun: function (module) {
        return module.homeToHappinessFun;
    }
};
let de = function (module) {
    module.time.currentTick += 1, L.autoBoost.getValue() && (0, D.autoBoostFun)(module), L.autoPromote.getValue() && (0, D.autoPromoteFun)(module), L.autoResearch.getValue() && v.researchQueue.advance();
    var exports = !0, require = !1, n = void 0;
    try {
        for (var r, s = (0, i.default)(_.foodOptions); !(exports = (r = s.next()).done); exports = !0) {
            var o = r.value;
            o.dayCounter();
        }
    } catch (module) {
        require = !0, n = module;
    } finally {
        try {
            !exports && s.return && s.return();
        } finally {
            if (require)
                throw n;
        }
    }
    var u = V.darkMatterTicks.getValue();
    u > 0 && V.darkMatterTicks.setValue(u - 1), module.currency.money.add(module.stats.dailyNetIncome.effective), module.time.currentTick = 0, module.time.currentDay.incrementValue();
    var l = !0, d = !1, f = void 0;
    try {
        for (var h, p = (0, i.default)(module.activities); !(l = (h = p.next()).done); l = !0) {
            var m = h.value;
            m.do(module);
        }
    } catch (module) {
        d = !0, f = module;
    } finally {
        try {
            !l && p.return && p.return();
        } finally {
            if (d)
                throw f;
        }
    }
    var y = !0, g = !1, b = void 0;
    try {
        for (var M, k = (0, i.default)(c.careers); !(y = (M = k.next()).done); y = !0) {
            var w = M.value;
            w.secretProject && w.advanceSecretProject();
        }
    } catch (module) {
        g = !0, b = module;
    } finally {
        try {
            !y && k.return && k.return();
        } finally {
            if (g)
                throw b;
        }
    }
    module.battle.update(), module.time.lastTime += module.timeConfig.tickLength, 10 === module.time.currentDay.getDayOfYear() && module.time.currentDay.getYear() % 10 === 0 && (0, Y.logPlayerProgression)(C.currentLoop.getValue(), C.currentLifeThisLoop.getValue(), x.currentDay.getYear());
}
let fe = function (module, exports) {
    !module.loginStarted && window.kongregate && (module.loginStarted = !0, (0, Y.startLogin)());
    var require = new Date();
    require.getTime() - module.time.lastSave.getValue() > 15000 && T.saver.requestSave(), T.saver.saveRequested && (T.saver.save(), module.time.lastSave.setValue(require.getTime()));
    var n = 1;
    if (!module.paused.getValue() && module.turbo.getValue() && (module.bonusTicks.getValue() <= 0 ? (module.turbo.setValue(!1), module.bonusTicks.setValue(0)) : (module.bonusTicks.add(-exports), n = te)), module.battle.state.enemyReachedSolarSystem ? module.timeConfig.tickLength = ee * ae / n : module.timeConfig.tickLength = ee / n, module.daysBehind = Math.ceil((require.getTime() - module.time.lastTime) / module.timeConfig.tickLength), module.paused.getValue()) {
        module.pausedDays += exports, module.pausedDays > ne && (module.bonusTicks.add(Math.floor(module.pausedDays / ne)), module.pausedDays = module.pausedDays % ne);
        var r = new Date();
        return void (module.time.lastTime = r.getTime());
    }
    for (; exports > 0;)
        q && (0, D.autoplay)(module), exports -= 1, module.time.sessionTicks += 1, de(module);
}
let ve = function () {
    V.paused.toggleValue();
};
let mutations = {
    TICK: function (module, exports) {
        fe(module, exports);
    },
    INITIALIZE_TIMING: function (module) {
        R.messageBox.playSounds = G.playSounds;
        var exports = new Date();
        module.time.lastTime = exports.getTime(), module.time.sessionStart = module.time.lastTime, d.currentJobContainer.setCurrentJob((0, E.findActiveJob)(module)), T.saver.load();
        var require = module.time.lastSave.getValue(), n = exports.getTime() - require;
        if (require > 0 && n > 0) {
            var r = n / ee, i = Math.min(7665, Math.floor(r / ne));
            module.time.offlineBonusTicks = i, module.bonusTicks.add(Math.floor(i));
        }
        module.time.lastSave.setValue(exports.getTime()), d.currentJobContainer.setCurrentJob((0, E.findActiveJob)(module));
    },
    CHANGE_ACTIVITY_TIME: function (module, exports) {
        var require = exports[0], n = exports[1];
        (0, E.changeActivityTime)(module, require, n);
    },
    SET_ACTIVE_JOB: function (module, exports) {
        (0, E.setActiveJob)(exports);
    },
    SET_ACTIVE_RESEARCH: function (module, exports) {
        (0, E.setActiveResearch)(exports);
    },
    ADD_TO_READING_LIST: function (module, exports) {
        (0, E.addToReadingList)(exports);
    },
    SELECT_HOME: function (module, exports) {
        (0, E.selectHome)(exports);
    },
    SELECT_FOOD_OPTION: function (module, exports) {
        (0, _.selectFoodOption)(exports);
    },
    SELECT_PANE: function (module, exports) {
        (0, B.selectPane)(exports);
    },
    ACTIVATE_BOOST: function (module, exports) {
        exports.activate();
    },
    PAUSE_GAME: function (module) {
        ve();
    },
    SPEEDUP_GAME: function (module) {
        module.turbo.toggleValue();
    },
    RESET_TIMER: function (module) {
        var exports = new Date();
        module.time.lastTime = exports.getTime();
    },
    ACKNOWLEDGE_AUSTERITY: function (module) {
        S.money.acknowledgeAusterity();
    },
    ACKNOWLEDGE_MESSAGE: function (module) {
        R.messageBox.messages.pop();
    },
    HARD_RESET: function (module) {
        T.saver.hardReset(), T.saver.stop(), window.location.reload();
    },
    IMPORT_SAVE: function (module, exports) {
        module.saver.import(exports), U.userInventory.updateAutos();
    }
};
let actions = {
    tick: function (module, exports) {
        var require = module.commit;
        a('TICK', exports);
    },
    initializeTiming: function (module) {
        var exports = module.commit;
        t('INITIALIZE_TIMING');
    },
    changeActivityTime: function (module, exports) {
        var require = module.commit;
        a('CHANGE_ACTIVITY_TIME', exports);
    },
    setActiveJob: function (module, exports) {
        var require = module.commit;
        a('SET_ACTIVE_JOB', exports);
    },
    setActiveResearch: function (module, exports) {
        var require = module.commit;
        a('SET_ACTIVE_RESEARCH', exports);
    },
    addToReadingList: function (module, exports) {
        var require = module.commit;
        a('ADD_TO_READING_LIST', exports);
    },
    selectPane: function (module, exports) {
        var require = module.commit;
        a('SELECT_PANE', exports);
    },
    selectHome: function (module, exports) {
        var require = module.commit;
        a('SELECT_HOME', exports);
    },
    selectFoodOption: function (module, exports) {
        var require = module.commit;
        a('SELECT_FOOD_OPTION', exports);
    },
    activateBoost: function (module, exports) {
        var require = module.commit;
        a('ACTIVATE_BOOST', exports);
    },
    pauseGame: function (module) {
        var exports = module.commit;
        t('PAUSE_GAME');
    },
    speedupGame: function (module) {
        var exports = module.commit;
        t('SPEEDUP_GAME');
    },
    resetTimer: function (module) {
        var exports = module.commit;
        t('RESET_TIMER');
    },
    acknowledgeAusterity: function (module) {
        var exports = module.commit;
        t('ACKNOWLEDGE_AUSTERITY');
    },
    acknowledgeMessage: function (module) {
        var exports = module.commit;
        t('ACKNOWLEDGE_MESSAGE');
    },
    hardReset: function (module) {
        var exports = module.commit;
        t('HARD_RESET');
    },
    importSave: function (module, exports) {
        var require = module.commit;
        a('IMPORT_SAVE', exports);
    }
};
exports.default = new Vuex.Store({
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
});
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
