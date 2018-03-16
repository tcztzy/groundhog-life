import { currentDay } from "./game-time";
import { Stat } from "./stats/stat";
import { GenericMultModifier, StatEffectiveAddModifier, StatEffectiveMultModifier } from "./modifiers/modifier";
import { assert, isNumber } from './assertions';
import { abbreviateNumber } from './utils';
import { BasicEntity } from "./basic-entity";
import { loopTrap } from "./loop-trap";

class w {
    xp = 0;
    level = 0;
    previousLevel = 0;
    highestLevelEver = 0;
    highestLevelThisLoop = 0;
    minDaysToLevel100 = NaN;
    minDaysToLevel10 = NaN;
    loopTrapMultiplier = 1
}

export function linearExponentialXpIncrease(x) {
    return (y) => Math.floor((y + 1) * x * Math.pow(1.007, Math.max(y - 50, 0)));
}

export function linearXpIncrease(x) {
    return y => Math.floor((y + 1) * x * (1 + Math.max(0, y - 100) / 500) * (1 + Math.max(0, y - 1000) / 100));
}

class x extends Stat {
    constructor(id, name, xpmodule) {
        super(id, name, xpmodule.computePrestigeFactor(), 0, '', '', !0, !1);
        this.xpmodule = xpmodule;
        this.xpmodule.subscribe(this);
        this.update();
    }

    update() {
        this.base = this.xpmodule.computePrestigeFactor();
        assert(isNumber(this.base));
        super.update();
    }
}

export class XPModule extends BasicEntity {
    constructor(id, name, n, r=linearExponentialXpIncrease(10)) {
        super(id, name, new w());
        this.xpPerHourStat = n;
        this.nextLevelAtXp = r;
        this.groundhogFactorStat = new x(this.id + '_groundhogFactorStat', 'Groundhog Factor', this);
        let o = new StatEffectiveMultModifier(this.id + '_groundhogFactorMod', 'Groundhog Factor', 100, this.groundhogFactorStat);
        this.xpPerHourStat.addModifier(o);
        let gmm = new GenericMultModifier(this.id + '_ltmod', 'Loop Trap', 110, this, x => x.state.loopTrapMultiplier);
        this.xpPerHourStat.addModifier(gmm);
        this.xpPerDayStat = new Stat(this.id + '_xppday', this.name + ' XP/day', 0, 2);
        let seam = new StatEffectiveAddModifier(this.id + '_xphour2day', 'XP/h', 1, this.xpPerHourStat);
        this.xpPerDayStat.addModifier(seam);
        this.levelUp = false;
        this.lastLevelUp = -1;
        this.update();
    }

    timesReachedLevel() {
        return this.state.levelsReached.map(level => level > this.state.level ? 1 : 0).reduce((x, y) => x + y, 0);
    }

    highestLevelEver() {
        return this.state.highestLevelEver;
    }

    highestLevelEverIncludingThisLife() {
        return Math.max(this.highestLevelEver(), this.state.level);
    }

    previousLevelReached() {
        return this.state.previousLevel;
    }

    computePrestigeFactor() {
        return 1 + this.state.highestLevelThisLoop / 10;
    }

    futurePrestigeFactor() {
        return 1 + Math.max(this.state.highestLevelThisLoop, this.state.level) / 10;
    }

    perc() {
        return 100 * this.state.xp / this.nextLevelAtXp(this.state.level);
    }

    updateMinDaysToLevel() {
        if (this.state.level === 100)
            if (isNumber(this.state.minDaysToLevel100))
                this.state.minDaysToLevel100 = Math.min(currentDay.getValue(), this.state.minDaysToLevel100);
            else
                this.state.minDaysToLevel100 = currentDay.getValue();
        else if (10 === this.state.level)
            if (isNumber(this.state.minDaysToLevel10))
                this.state.minDaysToLevel10 = Math.min(currentDay.getValue(), this.state.minDaysToLevel10);
            else
                this.state.minDaysToLevel10 = currentDay.getValue();
    }

    getMinDaysToLevel(level) {
        if (level === 100 && this.state.minDaysToLevel100) {
            return this.state.minDaysToLevel100;
        }
        else if (level === 10 && this.state.minDaysToLevel10) {
            return this.state.minDaysToLevel10;
        }
        else {
            return NaN;
        }
    }

    gainExperience(module) {
        let exports = this.xpPerHourStat.effective * module / 60;
        for (this.levelUp = 0; exports > 0;) {
            let upgradeRequiredXp = this.nextLevelAtXp(this.state.level);
            if (exports + this.state.xp >= upgradeRequiredXp) {
                exports -= upgradeRequiredXp - this.state.xp;
                this.state.level += 1;
                this.updateMinDaysToLevel();
                this.state.xp = 0;
                this.levelUp += 1;
            }
            else {
                this.state.xp += exports;
                exports = 0;
            }
            this.levelUp >= 10 && (exports = 0);
        }
        if (this.levelUp > 0) {
            this.lastLevelUp = currentDay.getValue();
            this.update();
        }
    }

    xpToNextLevel() {
        return this.nextLevelAtXp(this.state.level) - this.state.xp;
    }

    xpToNextLevelString() {
        return abbreviateNumber(this.xpToNextLevel());
    }

    prestige(module=true) {
        this.state.previousLevel = this.state.level;
        this.state.highestLevelEver = Math.max(this.state.level, this.state.highestLevelEver);
        this.state.highestLevelThisLoop = Math.max(this.state.level, this.state.highestLevelThisLoop);
        this.state.xp = 0;
        if (module)
            this.state.level = 0;
    }

    grandPrestige() {
        this.state.highestLevelThisLoop = Math.max(this.state.level, this.state.highestLevelThisLoop);
        this.state.highestLevelEver = Math.max(this.state.level, this.state.highestLevelEver);
        this.state.loopTrapMultiplier += this.computePrestigeFactor() * loopTrap.efficiency.effective;
        this.state.highestLevelThisLoop = 0;
        this.state.level = 0;
        this.state.xp = 0;
    }

    postPrestigeAssert() {
        assert(0 === this.state.xp);
    }

    onLoad() {
        this.state.minDaysToLevel = [];
        this.state.levelsReached = [];
    }

    recordClass() {
        return this.state.highestLevelThisLoop === this.previousLevelReached() ? 'new-record' : '';
    }
}

export function configureXpProgression(module, exports, require, n) {
    let r = Math.round(365 * exports * n);
    let s = module.map(() => 1);
    for (let i = 1; i < s.length; i++)
        s[i] = s[i - 1] * require;
    let o = s.reduce((x, y) => x + y);
    s = s.map(x => x * r / o);
    let u = s.map(x => x / 55);
    for (let i = 0; i < s.length; i++)
        module[i].xp.nextLevelAtXp = linearExponentialXpIncrease(Math.ceil(u[i]));
}
