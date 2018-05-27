import {Stat} from "./stats/stat";
import {investmentReturnStat, dailyIncomeStat, dailyExpensesStat, expenseRatioStat} from './stats/currency-stat';
import {createCustomLock, createLevelLock, createUnlockedLock} from './locks';
import {sleep, research, work, chores} from './activities';
import {currentJobContainer} from './career-containers';
import {loopTrap} from "./loop-trap";

var l = require('../12'), d = require('../183'), v = require('../56'),
    h = require('../57'), p = require('../18'), m = require('../41'), y = require('../73'), g = require('../90'),
    _ = require('../59'), b = require('../46'), k = require('../118'), w = require('../128'),
    P = require('../28'), x = require('../89'), C = require('../44'),
    A = require('../82'), I = require('../54'), T = require('../65'), E = require('../85');
function D() {
    var module = new l.MultModifier('dmtMod', 'Dark Matter Rituals', 10, 2);
    createCustomLock([I.darkMatterTicks], module, function () {
        return I.darkMatterTicks.getValue() > 0;
    });
    b.energyStat.addModifier(module);
}
function j() {
    var module = new l.LevelAddModifier('lt_research', 'Research', 10, C.loopTrapResearch.xp, 0.01, function (module) {
        return 0.05 - 0.05 / (1 + Math.log10(module + 1));
    });
    loopTrap.efficiency.addModifier(module);
    var exports = new l.GenericAddModifier('lt_alientech', 'Alien Tech', 11, T.battle, function (module) {
        return 0.05 - 0.05 / (1 + Math.log10(1 + module.state.enemiesDestroyed));
    });
    loopTrap.efficiency.addModifier(exports);
    createLevelLock(C.laserGun, P.lambdaPane, 1);
}
function N() {
    var module = new w.PaneGroup(true);
    for (let career of k.careers) {
        let u = new w.Pane(career.id + '-pane', career.name, 'job-selector', module);
        u.state.selected = true;
        u.career = career;
        createUnlockedLock(career, u);
    }

    P.jobPane.subpanes = module.panes;
    var l = new w.PaneGroup(true);
    for (let field of x.fields) {
        let pane = new w.Pane(`${field.id}-pane`, field.name, 'area-selector', l);
        pane.field = field;
        pane.state.selected = true;
        createUnlockedLock(field, pane);
    }
    P.researchPane.subpanes = l.panes;
    var g = new w.PaneGroup(true);
    for (let achievement of A.achievements) {
        let pane = new w.Pane(`${achievement.id}-pane`, achievement.name, 'ag-display', g);
        pane.ag = achievement;
        pane.state.selected = false;
    }
    P.achievementPane.subpanes = g.panes;
}
function O() {
    let research_hours_mod = new l.StatEffectiveMultModifier('research_hours_mod', 'Hours', 10, research.duration, x => x / 60);
    for (let area of x.areas) {
        area.xp.xpPerDayStat.addModifier(research_hours_mod);
    }
    let work_hours_mod = new l.StatEffectiveMultModifier('work_hours_mod', 'Hours', 10, work.duration, x => x / 60);
    for (let job of k.jobs) {
        job.xp.xpPerDayStat.addModifier(work_hours_mod);
    }
}
function B() {
    var module = new l.GenericAddModifier('investment_income_per_day_mod', 'Investments', 2, m.money, function (module) {
        return module.getValue() * (Math.pow(1 + investmentReturnStat.effective, 1 / 365) - 1);
    });
    dailyIncomeStat.addModifier(module);
    investmentReturnStat.subscribe(module);
}
function R() {
    function e(exports) {
        return E.shadyDoctor.getValue() && (exports = Math.max(0, exports - 10)), exports < 22 ? 1.2 - 0.005 * exports : exports < 40 ? e(21) - 0.01 * (exports - 21) : Math.max(0.01, e(39) - 0.02 * (exports - 39));
    }
    var exports = new l.GenericMultModifier('health_age', 'Age', 12, p.currentYear, function (exports) {
        return e(exports.getValue());
    });
    g.healthStat.addModifier(exports), exports.explain = function () {
        var module = p.currentYear.getValue(), exports = E.shadyDoctor.getValue();
        return exports && (module = Math.max(0, module - 10)), module < 22 ? exports ? 'Age is no concern yet - my doc has some great stuff.' : 'Age is no concern yet.' : module < 40 ? exports ? 'A few signs of aging, but the pills keep it at bay' : 'A few signs of aging.' : module < 57 ? exports ? 'More signs of aging, despite the pills.' : 'More signs of aging.' : exports ? 'Old age. The pills could not stop it.' : 'Old age.';
    }, E.shadyDoctor.subscribe(g.healthStat);
    var require = new d.ExpMovAvg('avg_sleep', 'Average Sleep', sleep.duration, d.fiveYearAlpha, 480, 6),
        n = function (module) {
            var exports = module / 60;
            return exports >= 8 ? 0.5 : exports >= 5 ? (exports - 5) / 6 : 0;
        },
        r = new l.GenericAddModifier('sleep_age', 'Avg Sleep / recent years (Max 0.5)', 2, require, function (module) {
            return n(require.state.value);
        });
    g.healthStat.addModifier(r);
    r.explain = function () {
        var module = require.state.value / 60,
            exports = module.toFixed(1) + ' hours of sleep/night over the last ~5 years. ';
        return exports += module >= 8 ? 'Great!' : module >= 6.5 ? 'Good!' : 'Need more!';
    };
    var i = new l.StatEffectiveAddModifier('foodQualityMod', 'Food Quality', 3, _.foodQualityStat);
    g.healthStat.addModifier(i), i.explain = function () {
        return _.foodQualityStat.effective < 0.7 ? 'Not exactly great food.' : _.foodQualityStat.effective < 1.6 ? 'Proper food!' : _.foodQualityStat.effective < 2.5 ? 'Pretty, pretty good food!' : _.foodQualityStat.effective < 3.5 ? 'Great Food!' : 'Not sure what I\'m eating, but it\'s pretty amazing.';
    };
}
var V = function () {
    var module = new l.GenericAddModifier('happinessFromHomeFactorMod', 'Home (Max 0.6)', 1, v.currentHomeContainer, function (module) {
        return (0, h.homeToHappinessFun)(module.home.quality.effective);
    });
    y.happinessStat.addModifier(module);
    module.explain = function () {
        var module = E.minimalism.getValue() ? 5 : 0, exports = E.minimalism.getValue() ? ' (Minimalism active)' : '',
            require = Math.floor(p.currentYear.getValue() / (5 + module)),
            n = v.currentHomeContainer.home.quality.effective, r = n - require;
        return r >= 1 ? 'Nice home.' + exports : r <= -1 ? 'I want a nicer home.' + exports : 'Content about my home.' + exports;
    };
    E.minimalism.subscribe(y.happinessStat);
    p.currentYear.subscribe(y.happinessStat);
    var exports = 0.5;
    var require = function (module) {
        var require = module / 60;
        return require >= 9 ? exports : require > 4 ? exports * (require - 4) / 5 : 0;
    };
    var n = new l.StatEffectiveAddModifier('happinessFromSleepHoursMod', 'Sleep (Max 0.5)', 1, sleep.duration, require);
    y.happinessStat.addModifier(n);
    n.explain = function () {
        return sleep.duration.effective >= 540 ? 'Definitely getting enough sleep' : sleep.duration.effective <= 300 ? 'Must...sleep.' : 'Just enough sleep.';
    };
    var r = new l.MultModifier('sleepDeprivation', 'Sleep Deprivation', 10, 0);
    y.happinessStat.addModifier(r);
    var i = function () {
        return sleep.duration.effective < 240;
    };
    createCustomLock([sleep.duration], r, i);
    r.explain = function () {
        return i() ? 'Sleep Deprivation.' : '';
    };
    var s = 10000, o = new Stat('happinessFromExpenseRatioStat', 'Happiness from Expense Ratio', 0.3, 2),
        d = function (module) {
            var exports = E.minimalism.getValue() ? 0.5 : 1,
                require = (0.95 - 0.8 * Math.min(s, dailyIncomeStat.effective) / s) * exports;
            return module <= 1 && dailyExpensesStat.effective > s ? 1 : module > 1.05 ? 1 / Math.pow(module, 3) : module > require ? 1 : Math.pow(Math.max(0, module) / require, 2);
        }, m = new l.StatEffectiveMultModifier('expenseRatioHappinessMod', 'Expense Ratio', 10, expenseRatioStat, d);
    o.addModifier(m);
    var g = new l.StatEffectiveAddModifier('happinessFromExpenseRatioMod', 'Happiness from Expense Ratio (Max: 0.3)', 1, o);
    y.happinessStat.addModifier(g), g.explain = function () {
        var module = expenseRatioStat.effective, exports = E.minimalism.getValue(),
            require = exports ? ' (Minimalism active)' : '', n = exports ? 0.5 : 1,
            r = (0.95 - 0.8 * Math.min(s, dailyIncomeStat.effective) / s) * n;
        return module <= 1 && dailyExpensesStat.effective > s ? 'Happy about my spending.' + require : module < 0.9 * r ? exports ? 'Even as a minimalist, I would like some nicer things...' : 'Could afford nicer things...' : module > 1.2 ? 'Spending way too much.' + require : module <= 1.05 ? 'Happy about my spending.' + require : 'Spending a little too much maybe.' + require;
    }, E.minimalism.subscribe(o);
    var _ = new Stat('totalWorkingHours', 'Working, studying, researching', 0, 2),
        b = new l.StatEffectiveAddModifier('workHoursMod', 'Working', 1, work.duration),
        k = new l.StatEffectiveAddModifier('researchHoursMod', 'Researching', 1, research.duration),
        w = new l.StatEffectiveAddModifier('choresHoursMod', 'Chores', 1, chores.duration);
    _.addModifier(b), _.addModifier(k), _.addModifier(w);
    var P = new l.StatEffectiveAddModifier('happinessFromWorkLifeBalanceMod', 'Work-Life Balance (Max: 0.6)', 1, _, function (module) {
        return 216 / Math.max(module, 360);
    });
    y.happinessStat.addModifier(P);
    P.explain = function () {
        let module = P.factor;
        return module < 0.2 ? 'I\'m overworked.' : module < 0.4 ? 'Feeling slightly stressed out.' : module >= 0.4 ? 'Good work-life balance.' : '';
    };
    p.currentYear.subscribe(y.happinessStat);
};

export function setupGame() {
    B();
    V();
    R();
    N();
    O();
    j();
    D();
    currentJobContainer.defaultJob = k.careers[0].jobs[0];
}
