var r = require('get-iterator'), i = n(r), s = require('number/is-nan'), o = n(s),
    u = require('object/get-prototype-of'), l = n(u), c = require('babel-helpers/createClass'), d = n(c),
    f = require('babel-helpers/possibleConstructorReturn'), v = n(f), h = require('babel-helpers/get'), p = n(h),
    m = require('babel-helpers/inherits'), y = n(m), g = require('babel-helpers/classCallCheck'), _ = n(g),
    b = require('./lib/basic-entity'), M = require('./lib/assertions'), k = function module() {
        (0, _.default)(this, module), this.highestEffectiveEver = -9999999999, this.lowestEffectiveEver = 9999999999;
    };
import {BasicEntity} from './basic-entity';
import {assert, isNumber} from './assertions';

export class Stat extends BasicEntity {
    constructor(id, name, n, digits = 2, prefix = '', suffix = '', higherIsBetter=true, update=true, min=null, max=null, tolerance=0.01) {
        super(id, name, new k());
        this.id = id;
        this.name = name;
        this.base = n;
        assert(isNumber(this.base));
        this.digits = digits;
        this.prefix = prefix;
        this.suffix = suffix;
        this.higherIsBetter = higherIsBetter;
        this.modifiers = [];
        this.valueChain = [];
        this.lastChangePositive = false;
        if (update) {
            this.update();
        }
        else {
            this.effective = this.base;
            this.minValue = min;
            this.maxValue = max;
            this.tolerance = tolerance;
        }
    }

    prestige() {
        this.state.historicValues = [];
    }

    update() {
        this.effectiveChanged = false;
        this.calculateEffective(), (0, p.default)(exports.prototype.__proto__ || (0, l.default)(exports.prototype), 'update', this).call(this, this.effectiveChanged);
    }

    setBase(module) {
        this.base = module, (0, M.assert)((0, M.isNumber)(this.base), this.name + ' ' + module), this.update();
    }

    addModifier(module) {
        module.subscribe(this), this.modifiers.push(module), this.modifiers.sort(function (module, exports) {
            return module.priority - exports.priority;
        });
    }

    calculateEffective() {
        const originalEffective = this.effective;
        assert(!((0, o.default)(this.base) || void 0 === this.base)), this.effective = this.base, this.valueChain = [];
        for (let unlockedModifier of this.modifiers.filter(function (modifier) {
            return modifier.unlocked();
        })) {
            this.effective = unlockedModifier.apply(this.effective);
            this.valueChain.push([unlockedModifier, this.effective]);
        }
        this.rawEffective = this.effective, isNumber(this.minValue) && (this.effective = Math.max(this.minValue, this.effective)), (0, M.isNumber)(this.maxValue) && (this.effective = Math.min(this.maxValue, this.effective)), this.effectiveChanged = Math.abs(this.effective - originalEffective) > 0, Math.abs(this.effective - originalEffective) > this.tolerance && ((0, p.default)(exports.prototype.__proto__ || (0, l.default)(exports.prototype), 'changed', this).call(this), this.lastChangePositive = this.effective > originalEffective), this.state.highestEffectiveEver = Math.max(this.state.highestEffectiveEver, this.effective), this.state.lowestEffectiveEver = Math.min(this.state.lowestEffectiveEver, this.effective);
    }

    recentChange(module) {
        return this.hasChanged(module) ? this.higherIsBetter ? this.lastChangePositive ? 'up' : 'down' : this.lastChangePositive ? 'down' : 'up' : '';
    }

    modifiersWithValues() {
        return this.valueChain;
    }
}
