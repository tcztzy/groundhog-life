import { Stat } from "./stats/stat";
import { investmentReturnStat, dailyIncomeStat, dailyExpensesStat, expenseRatioStat } from './stats/currency-stat';
import { createCustomLock, createLevelLock, createUnlockedLock } from './locks';
import { sleep, research, work, chores } from './activities';
import { currentJobContainer } from './career-containers';
import { loopTrap } from "./loop-trap";
import { battle } from "./battle";
import { minimalism, shadyDoctor } from "./market/extra";
import { currentYear } from "./game-time";
import { GenericAddModifier, GenericMultModifier, MultModifier, LevelAddModifier, StatEffectiveMultModifier, StatEffectiveAddModifier } from "./modifiers/modifier";
import { happinessStat } from "./stats/happiness-stat";
import { healthStat } from "./stats/health-stat";
import { foodQualityStat } from "./food";
import { energyStat } from "./stats/energy-stat";
import { PaneGroup, Pane } from "./pane";
import { lambdaPane, jobPane, researchPane, achievementPane } from "./panes";
import { loopTrapResearch, laserGun } from "./physics";
import { achievements } from "./achievements";
import { darkMatterTicks } from "./global-states";

var d = require('../183'), v = require('../56'),
    h = require('../57'), m = require('../41'),
    k = require('../118'),
    x = require('../89');
function D() {
    const module = new MultModifier('dmtMod', 'Dark Matter Rituals', 10, 2);
    createCustomLock([darkMatterTicks], module, function () {
        return darkMatterTicks.getValue() > 0;
    });
    energyStat.addModifier(module);
}
function j() {
    const module = new LevelAddModifier('lt_research', 'Research', 10, loopTrapResearch.xp, 0.01, function (module) {
        return 0.05 - 0.05 / (1 + Math.log10(module + 1));
    });
    loopTrap.efficiency.addModifier(module);
    var exports = new GenericAddModifier('lt_alientech', 'Alien Tech', 11, battle, function (module) {
        return 0.05 - 0.05 / (1 + Math.log10(1 + module.state.enemiesDestroyed));
    });
    loopTrap.efficiency.addModifier(exports);
    createLevelLock(laserGun, lambdaPane, 1);
}
function N() {
    var module = new PaneGroup(true);
    for (let career of k.careers) {
        let u = new Pane(career.id + '-pane', career.name, 'job-selector', module);
        u.state.selected = true;
        u.career = career;
        createUnlockedLock(career, u);
    }

    jobPane.subpanes = module.panes;
    var l = new PaneGroup(true);
    for (let field of x.fields) {
        let pane = new Pane(`${field.id}-pane`, field.name, 'area-selector', l);
        pane.field = field;
        pane.state.selected = true;
        createUnlockedLock(field, pane);
    }
    researchPane.subpanes = l.panes;
    var g = new PaneGroup(true);
    for (let ag of achievements) {
        let pane = new Pane(`${ag.id}-pane`, ag.name, 'ag-display', g);
        pane.ag = ag;
        pane.state.selected = false;
    }
    achievementPane.subpanes = g.panes;
}
function O() {
    let research_hours_mod = new StatEffectiveMultModifier('research_hours_mod', 'Hours', 10, research.duration, x => x / 60);
    for (let area of x.areas) {
        area.xp.xpPerDayStat.addModifier(research_hours_mod);
    }
    let work_hours_mod = new StatEffectiveMultModifier('work_hours_mod', 'Hours', 10, work.duration, x => x / 60);
    for (let job of k.jobs) {
        job.xp.xpPerDayStat.addModifier(work_hours_mod);
    }
}
function B() {
    var module = new GenericAddModifier('investment_income_per_day_mod', 'Investments', 2, m.money, function (module) {
        return module.getValue() * (Math.pow(1 + investmentReturnStat.effective, 1 / 365) - 1);
    });
    dailyIncomeStat.addModifier(module);
    investmentReturnStat.subscribe(module);
}
function R() {
    function e(exports) {
        return shadyDoctor.getValue() && (exports = Math.max(0, exports - 10)), exports < 22 ? 1.2 - 0.005 * exports : exports < 40 ? e(21) - 0.01 * (exports - 21) : Math.max(0.01, e(39) - 0.02 * (exports - 39));
    }
    var exports = new GenericMultModifier('health_age', 'Age', 12, currentYear, function (exports) {
        return e(exports.getValue());
    });
    healthStat.addModifier(exports), exports.explain = function () {
        var module = currentYear.getValue(), exports = shadyDoctor.getValue();
        return exports && (module = Math.max(0, module - 10)), module < 22 ? exports ? 'Age is no concern yet - my doc has some great stuff.' : 'Age is no concern yet.' : module < 40 ? exports ? 'A few signs of aging, but the pills keep it at bay' : 'A few signs of aging.' : module < 57 ? exports ? 'More signs of aging, despite the pills.' : 'More signs of aging.' : exports ? 'Old age. The pills could not stop it.' : 'Old age.';
    }, shadyDoctor.subscribe(healthStat);
    var require = new d.ExpMovAvg('avg_sleep', 'Average Sleep', sleep.duration, d.fiveYearAlpha, 480, 6),
        n = function (module) {
            var exports = module / 60;
            return exports >= 8 ? 0.5 : exports >= 5 ? (exports - 5) / 6 : 0;
        },
        r = new GenericAddModifier('sleep_age', 'Avg Sleep / recent years (Max 0.5)', 2, require, function (module) {
            return n(require.state.value);
        });
    healthStat.addModifier(r);
    r.explain = function () {
        var module = require.state.value / 60,
            exports = module.toFixed(1) + ' hours of sleep/night over the last ~5 years. ';
        return exports += module >= 8 ? 'Great!' : module >= 6.5 ? 'Good!' : 'Need more!';
    };
    var i = new StatEffectiveAddModifier('foodQualityMod', 'Food Quality', 3, foodQualityStat);
    healthStat.addModifier(i), i.explain = function () {
        return foodQualityStat.effective < 0.7 ? 'Not exactly great food.' : foodQualityStat.effective < 1.6 ? 'Proper food!' : foodQualityStat.effective < 2.5 ? 'Pretty, pretty good food!' : foodQualityStat.effective < 3.5 ? 'Great Food!' : 'Not sure what I\'m eating, but it\'s pretty amazing.';
    };
}
var V = function () {
    var module = new GenericAddModifier('happinessFromHomeFactorMod', 'Home (Max 0.6)', 1, v.currentHomeContainer, function (module) {
        return (0, h.homeToHappinessFun)(module.home.quality.effective);
    });
    happinessStat.addModifier(module);
    module.explain = function () {
        var module = minimalism.getValue() ? 5 : 0, exports = minimalism.getValue() ? ' (Minimalism active)' : '',
            require = Math.floor(currentYear.getValue() / (5 + module)),
            n = v.currentHomeContainer.home.quality.effective, r = n - require;
        return r >= 1 ? 'Nice home.' + exports : r <= -1 ? 'I want a nicer home.' + exports : 'Content about my home.' + exports;
    };
    minimalism.subscribe(happinessStat);
    currentYear.subscribe(happinessStat);
    var exports = 0.5;
    var require = function (module) {
        var require = module / 60;
        return require >= 9 ? exports : require > 4 ? exports * (require - 4) / 5 : 0;
    };
    var n = new StatEffectiveAddModifier('happinessFromSleepHoursMod', 'Sleep (Max 0.5)', 1, sleep.duration, require);
    happinessStat.addModifier(n);
    n.explain = function () {
        return sleep.duration.effective >= 540 ? 'Definitely getting enough sleep' : sleep.duration.effective <= 300 ? 'Must...sleep.' : 'Just enough sleep.';
    };
    var r = new MultModifier('sleepDeprivation', 'Sleep Deprivation', 10, 0);
    happinessStat.addModifier(r);
    var i = function () {
        return sleep.duration.effective < 240;
    };
    createCustomLock([sleep.duration], r, i);
    r.explain = function () {
        return i() ? 'Sleep Deprivation.' : '';
    };
    var s = 10000, o = new Stat('happinessFromExpenseRatioStat', 'Happiness from Expense Ratio', 0.3, 2),
        d = function (module) {
            var exports = minimalism.getValue() ? 0.5 : 1,
                require = (0.95 - 0.8 * Math.min(s, dailyIncomeStat.effective) / s) * exports;
            return module <= 1 && dailyExpensesStat.effective > s ? 1 : module > 1.05 ? 1 / Math.pow(module, 3) : module > require ? 1 : Math.pow(Math.max(0, module) / require, 2);
        }, m = new StatEffectiveMultModifier('expenseRatioHappinessMod', 'Expense Ratio', 10, expenseRatioStat, d);
    o.addModifier(m);
    var g = new StatEffectiveAddModifier('happinessFromExpenseRatioMod', 'Happiness from Expense Ratio (Max: 0.3)', 1, o);
    happinessStat.addModifier(g), g.explain = function () {
        var module = expenseRatioStat.effective, exports = minimalism.getValue(),
            require = exports ? ' (Minimalism active)' : '', n = exports ? 0.5 : 1,
            r = (0.95 - 0.8 * Math.min(s, dailyIncomeStat.effective) / s) * n;
        return module <= 1 && dailyExpensesStat.effective > s ? 'Happy about my spending.' + require : module < 0.9 * r ? exports ? 'Even as a minimalist, I would like some nicer things...' : 'Could afford nicer things...' : module > 1.2 ? 'Spending way too much.' + require : module <= 1.05 ? 'Happy about my spending.' + require : 'Spending a little too much maybe.' + require;
    }, minimalism.subscribe(o);
    var _ = new Stat('totalWorkingHours', 'Working, studying, researching', 0, 2),
        b = new StatEffectiveAddModifier('workHoursMod', 'Working', 1, work.duration),
        k = new StatEffectiveAddModifier('researchHoursMod', 'Researching', 1, research.duration),
        w = new StatEffectiveAddModifier('choresHoursMod', 'Chores', 1, chores.duration);
    _.addModifier(b), _.addModifier(k), _.addModifier(w);
    var P = new StatEffectiveAddModifier('happinessFromWorkLifeBalanceMod', 'Work-Life Balance (Max: 0.6)', 1, _, function (module) {
        return 216 / Math.max(module, 360);
    });
    happinessStat.addModifier(P);
    P.explain = function () {
        let module = P.factor;
        return module < 0.2 ? 'I\'m overworked.' : module < 0.4 ? 'Feeling slightly stressed out.' : module >= 0.4 ? 'Good work-life balance.' : '';
    };
    currentYear.subscribe(happinessStat);
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
