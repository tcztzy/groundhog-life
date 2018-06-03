import { Stat } from "@/lib/stats/stat";
import { investmentReturnStat, dailyIncomeStat, dailyExpensesStat, expenseRatioStat } from '@/lib/stats/currency-stat';
import { createCustomLock, createLevelLock, createUnlockedLock } from '@/lib/locks';
import { sleep, research, work, chores } from '@/lib/activities';
import { currentJobContainer } from '@/lib/containers/career-containers';
import { loopTrap } from "@/lib/loop-trap";
import { battle } from "@/lib/battle";
import { minimalism, shadyDoctor } from "@/lib/market/extra";
import { currentYear } from "@/lib/game-time";
import { GenericAddModifier, GenericMultModifier, MultModifier, LevelAddModifier, StatEffectiveMultModifier, StatEffectiveAddModifier } from "@/lib/modifiers/modifier";
import { happinessStat } from "@/lib/stats/happiness-stat";
import { healthStat } from "@/lib/stats/health-stat";
import { foodQualityStat } from "@/lib/food";
import { energyStat } from "@/lib/stats/energy-stat";
import { PaneGroup, Pane } from "@/lib/pane";
import { lambdaPane, jobPane, researchPane, achievementPane } from "@/lib/panes";
import { loopTrapResearch, laserGun } from "@/lib/research/physics";
import { achievements } from "@/lib/achievements";
import { darkMatterTicks } from "@/lib/global-states";
import { homeToHappinessFun } from "@/lib/homes";
import { currentHomeContainer } from "@/lib/containers/home-container";
import { money } from "@/lib/currency";
import { jobs, careers } from "@/lib/careers";
import { ExpMovAvg, fiveYearAlpha } from "@/lib/average";
import { fields, areas } from "@/lib/research";

function addDarkMatterTicksModifier() {
    const dmtMod = new MultModifier('dmtMod', 'Dark Matter Rituals', 10, 2);
    createCustomLock([darkMatterTicks], dmtMod, function () {
        return darkMatterTicks.getValue() > 0;
    });
    energyStat.addModifier(dmtMod);
}

function j() {
    const loopTrapResearchModifier = new LevelAddModifier('lt_research', 'Research', 10, loopTrapResearch.xp, 0.01, x => 0.05 - 0.05 / (1 + Math.log10(x + 1)));
    loopTrap.efficiency.addModifier(loopTrapResearchModifier);
    const loopTrapAlienTechModifier = new GenericAddModifier('lt_alientech', 'Alien Tech', 11, battle, function (module) {
        return 0.05 - 0.05 / (1 + Math.log10(1 + module.state.enemiesDestroyed));
    });
    loopTrap.efficiency.addModifier(loopTrapAlienTechModifier);
    createLevelLock(laserGun, lambdaPane, 1);
}

function N() {
    const careersPaneGroup = new PaneGroup(true);
    for (let career of careers) {
        let careerPane = new Pane(career.id + '-pane', career.name, 'job-selector', careersPaneGroup);
        careerPane.state.selected = true;
        careerPane.career = career;
        createUnlockedLock(career, careerPane);
    }

    jobPane.subpanes = careersPaneGroup.panes;
    const fieldsPaneGroup = new PaneGroup(true);
    for (let field of fields) {
        let fieldPane = new Pane(`${field.id}-pane`, field.name, 'area-selector', fieldsPaneGroup);
        fieldPane.field = field;
        fieldPane.state.selected = true;
        createUnlockedLock(field, fieldPane);
    }
    researchPane.subpanes = fieldsPaneGroup.panes;

    const achievementGroupPaneGroup = new PaneGroup(true);
    for (let ag of achievements) {
        let achievementGroupPane = new Pane(`${ag.id}-pane`, ag.name, 'ag-display', achievementGroupPaneGroup);
        achievementGroupPane.ag = ag;
        achievementGroupPane.state.selected = false;
    }
    achievementPane.subpanes = achievementGroupPaneGroup.panes;
}

function addResearchAndWorkHoursModifier() {
    let research_hours_mod = new StatEffectiveMultModifier('research_hours_mod', 'Hours', 10, research.duration, x => x / 60);
    for (let area of areas) {
        area.xp.xpPerDayStat.addModifier(research_hours_mod);
    }
    let work_hours_mod = new StatEffectiveMultModifier('work_hours_mod', 'Hours', 10, work.duration, x => x / 60);
    for (let job of jobs) {
        job.xp.xpPerDayStat.addModifier(work_hours_mod);
    }
}

function B() {
    var module = new GenericAddModifier('investment_income_per_day_mod', 'Investments', 2, money, function (module) {
        return module.getValue() * (Math.pow(1 + investmentReturnStat.effective, 1 / 365) - 1);
    });
    dailyIncomeStat.addModifier(module);
    investmentReturnStat.subscribe(module);
}

function addHealthModifiers() {
    function e(value) {
        if (shadyDoctor.getValue())
            value = Math.max(0, value - 10);
        return value < 22 ? 1.2 - 0.005 * value : value < 40 ? e(21) - 0.01 * (value - 21) : Math.max(0.01, e(39) - 0.02 * (value - 39));
    }
    const healthAgeModifier = new GenericMultModifier('health_age', 'Age', 12, currentYear, exports => e(exports.getValue()));
    healthStat.addModifier(healthAgeModifier);
    healthAgeModifier.explain = function () {
        var module = currentYear.getValue(), exports = shadyDoctor.getValue();
        exports && (module = Math.max(0, module - 10));
        return module < 22 ? exports ?
            'Age is no concern yet - my doc has some great stuff.' : 'Age is no concern yet.' : module < 40 ? exports ? 'A few signs of aging, but the pills keep it at bay' : 'A few signs of aging.' : module < 57 ? exports ? 'More signs of aging, despite the pills.' : 'More signs of aging.' : exports ? 'Old age. The pills could not stop it.' : 'Old age.';
    };
    shadyDoctor.subscribe(healthStat);
    var require = new ExpMovAvg('avg_sleep', 'Average Sleep', sleep.duration, fiveYearAlpha, 480, 6),
        n = function (module) {
            var exports = module / 60;
            return exports >= 8 ? 0.5 : exports >= 5 ? (exports - 5) / 6 : 0;
        },
        r = new GenericAddModifier('sleep_age', 'Avg Sleep / recent years (Max 0.5)', 2, require, function (module) {
            return n(require.state.value);
        });
    healthStat.addModifier(r);
    r.explain = function () {
        const hours = require.state.value / 60,
            overview = hours.toFixed(1) + ' hours of sleep/night over the last ~5 years. ';
        return `${overview}${hours >= 8 ? 'Great!' : hours >= 6.5 ? 'Good!' : 'Need more!'}`;
    };
    const i = new StatEffectiveAddModifier('foodQualityMod', 'Food Quality', 3, foodQualityStat);
    healthStat.addModifier(i);
    i.explain = function () {
        if (foodQualityStat.effective < 0.7)
            return 'Not exactly great food.';
        else if (foodQualityStat.effective < 1.6)
            return 'Proper food!';
        else if (foodQualityStat.effective < 2.5)
            return 'Pretty, pretty good food!';
        else if (foodQualityStat.effective < 3.5)
            return 'Great Food!';
        else
            return "Not sure what I'm eating, but it's pretty amazing.";
    };
}

function V() {
    var module = new GenericAddModifier('happinessFromHomeFactorMod', 'Home (Max 0.6)', 1, currentHomeContainer, function (module) {
        return homeToHappinessFun(module.home.quality.effective);
    });
    happinessStat.addModifier(module);
    module.explain = function () {
        var module = minimalism.getValue() ? 5 : 0, exports = minimalism.getValue() ? ' (Minimalism active)' : '',
            require = Math.floor(currentYear.getValue() / (5 + module)),
            n = currentHomeContainer.home.quality.effective, r = n - require;
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
}

export function setupGame() {
    B();
    V();
    addHealthModifiers();
    N();
    addResearchAndWorkHoursModifier();
    j();
    addDarkMatterTicksModifier();
    currentJobContainer.defaultJob = careers[0].jobs[0];
}
