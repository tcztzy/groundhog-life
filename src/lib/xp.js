import { currentDay } from "./game-time";
import { Stat } from "./stat";
import { GenericMultModifier, StatEffectiveAddModifier, StatEffectiveMultModifier } from "./modifiers";
import { assert, isNumber } from './assertions';
import { abbreviateNumber } from './utils';
import { BasicEntity } from "./basic-entity";
import { loopTrap } from "./loop-trap";

var r = require('object/get-prototype-of'), i = n(r), s = require('babel-helpers/createClass'), o = n(s), u = require('babel-helpers/possibleConstructorReturn'), l = n(u), c = require('babel-helpers/get'), d = n(c), f = require('babel-helpers/inherits'), v = n(f), h = require('babel-helpers/classCallCheck'), p = n(h);

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

exports.XPModule = function (module) {
    function exports(module, require, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : linearExponentialXpIncrease(10);
        (0, p.default)(this, exports);
        var s = (0, l.default)(this, (exports.__proto__ || (0, i.default)(exports)).call(this, module, require, new w()));
        s.xpPerHourStat = n, s.nextLevelAtXp = r, s.groundhogFactorStat = new x(s.id + '_groundhogFactorStat', 'Groundhog Factor', s);
        var o = new StatEffectiveMultModifier(s.id + '_groundhogFactorMod', 'Groundhog Factor', 100, s.groundhogFactorStat);
        s.xpPerHourStat.addModifier(o);
        var u = new GenericMultModifier(s.id + '_ltmod', 'Loop Trap', 110, s, function (module) {
            return module.state.loopTrapMultiplier;
        });
        s.xpPerHourStat.addModifier(u), s.xpPerDayStat = new Stat(s.id + '_xppday', s.name + ' XP/day', 0, 2);
        var c = new StatEffectiveAddModifier(s.id + '_xphour2day', 'XP/h', 1, s.xpPerHourStat);
        return s.xpPerDayStat.addModifier(c), s.levelUp = !1, s.lastLevelUp = -1, s.update(), s;
    }
    return (0, v.default)(exports, module), (0, o.default)(exports, [
        {
            key: 'timesReachedLevel',
            value: function () {
                var module = this;
                return this.state.levelsReached.map(function (exports) {
                    return exports > module.state.level ? 1 : 0;
                }).reduce(function (module, exports) {
                    return module + exports;
                }, 0);
            }
        },
        {
            key: 'highestLevelEver',
            value: function () {
                return this.state.highestLevelEver;
            }
        },
        {
            key: 'highestLevelEverIncludingThisLife',
            value: function () {
                return Math.max(this.highestLevelEver(), this.state.level);
            }
        },
        {
            key: 'previousLevelReached',
            value: function () {
                return this.state.previousLevel;
            }
        },
        {
            key: 'computePrestigeFactor',
            value: function () {
                return 1 + this.state.highestLevelThisLoop / 10;
            }
        },
        {
            key: 'futurePrestigeFactor',
            value: function () {
                return 1 + Math.max(this.state.highestLevelThisLoop, this.state.level) / 10;
            }
        },
        {
            key: 'perc',
            value: function () {
                return 100 * this.state.xp / this.nextLevelAtXp(this.state.level);
            }
        },
        {
            key: 'updateMinDaysToLevel',
            value: function () {
                100 === this.state.level ? isNumber(this.state.minDaysToLevel100) ? this.state.minDaysToLevel100 = Math.min(currentDay.getValue(), this.state.minDaysToLevel100) : this.state.minDaysToLevel100 = currentDay.getValue() : 10 === this.state.level && (isNumber(this.state.minDaysToLevel10) ? this.state.minDaysToLevel10 = Math.min(currentDay.getValue(), this.state.minDaysToLevel10) : this.state.minDaysToLevel10 = currentDay.getValue());
            }
        },
        {
            key: 'getMinDaysToLevel',
            value: function (module) {
                return 100 === module && isNumber(this.state.minDaysToLevel100) ? this.state.minDaysToLevel100 : 10 === module && isNumber(this.state.minDaysToLevel10) ? this.state.minDaysToLevel10 : NaN;
            }
        },
        {
            key: 'gainExperience',
            value: function (module) {
                var exports = this.xpPerHourStat.effective * module / 60;
                for (this.levelUp = 0; exports > 0;) {
                    var require = this.nextLevelAtXp(this.state.level);
                    exports + this.state.xp >= require ? (exports -= require - this.state.xp, this.state.level += 1, this.updateMinDaysToLevel(), this.state.xp = 0, this.levelUp += 1) : (this.state.xp += exports, exports = 0), this.levelUp >= 10 && (exports = 0);
                }
                this.levelUp > 0 && (this.lastLevelUp = currentDay.getValue(), this.update());
            }
        },
        {
            key: 'xpToNextLevel',
            value: function () {
                return this.nextLevelAtXp(this.state.level) - this.state.xp;
            }
        },
        {
            key: 'xpToNextLevelString',
            value: function () {
                return abbreviateNumber(this.xpToNextLevel());
            }
        },
        {
            key: 'prestige',
            value: function () {
                var module = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                this.state.previousLevel = this.state.level, this.state.highestLevelEver = Math.max(this.state.level, this.state.highestLevelEver), this.state.highestLevelThisLoop = Math.max(this.state.level, this.state.highestLevelThisLoop), this.state.xp = 0, module && (this.state.level = 0);
            }
        },
        {
            key: 'grandPrestige',
            value: function () {
                this.state.highestLevelThisLoop = Math.max(this.state.level, this.state.highestLevelThisLoop), this.state.highestLevelEver = Math.max(this.state.level, this.state.highestLevelEver), this.state.loopTrapMultiplier += this.computePrestigeFactor() * loopTrap.efficiency.effective, this.state.highestLevelThisLoop = 0, this.state.level = 0, this.state.xp = 0;
            }
        },
        {
            key: 'postPrestigeAssert',
            value: function () {
                assert(0 === this.state.xp);
            }
        },
        {
            key: 'onLoad',
            value: function () {
                this.state.minDaysToLevel = [], this.state.levelsReached = [];
            }
        },
        {
            key: 'recordClass',
            value: function () {
                return this.state.highestLevelThisLoop === this.previousLevelReached() ? 'new-record' : '';
            }
        }
    ]), exports;
}(BasicEntity);

exports.configureXpProgression = function (module, exports, require, n) {
    var r = Math.round(365 * exports * n);
    let i = module.map(function (module) {
        return 1;
    });
    for (let s = 1; s < i.length; s++)
        i[s] = i[s - 1] * require;
    var o = i.reduce(function (module, exports) {
        return module + exports;
    });
    i = i.map(function (module) {
        return module * r / o;
    });
    var u = i.map(function (module) {
        return module / 55;
    });
    for (let l = 0; l < i.length; l++)
        module[l].xp.nextLevelAtXp = linearExponentialXpIncrease(Math.ceil(u[l]));
};
