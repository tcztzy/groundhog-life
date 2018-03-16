import { BasicEntity } from '../basic-entity';
import { assert, isNumber } from '../assertions';

class StatClass {
    highestEffectiveEver = -9999999999;
    lowestEffectiveEver = 9999999999
}

export class Stat extends BasicEntity {
    constructor(id, name, n, digits = 2, prefix = '', suffix = '', higherIsBetter=true, update=true, min=null, max=null, tolerance=0.01) {
        super(id, name, new StatClass());
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
        this.calculateEffective();
        super.update(this.effectiveChanged);
    }

    setBase(module) {
        this.base = module;
        assert(isNumber(this.base), this.name + ' ' + module);
        this.update();
    }

    addModifier(module) {
        module.subscribe(this);
        this.modifiers.push(module);
        this.modifiers.sort(function (module, exports) {
            return module.priority - exports.priority;
        });
    }

    calculateEffective() {
        const originalEffective = this.effective;
        assert(!(isNaN(this.base) || void 0 === this.base));
        this.effective = this.base;
        this.valueChain = [];
        for (let unlockedModifier of this.modifiers.filter(function (modifier) {
            return modifier.unlocked();
        })) {
            this.effective = unlockedModifier.apply(this.effective);
            this.valueChain.push([unlockedModifier, this.effective]);
        }
        if (isNumber(this.minValue))
            this.effective = Math.max(this.minValue, this.effective);
        if (isNumber(this.maxValue))
            this.effective = Math.min(this.maxValue, this.effective);
        this.effectiveChanged = Math.abs(this.effective - originalEffective) > 0;
        if (Math.abs(this.effective - originalEffective) > this.tolerance) {
            super.changed();
            this.lastChangePositive = this.effective > originalEffective;
        }
        this.state.highestEffectiveEver = Math.max(this.state.highestEffectiveEver, this.effective);
        this.rawEffective = this.state.lowestEffectiveEver = Math.min(this.state.lowestEffectiveEver, this.effective);
    }

    recentChange(module) {
        if (this.hasChanged(module))
            return this.higherIsBetter === this.lastChangePositive ? 'up' : 'down';
        else
            return '';
    }

    modifiersWithValues() {
        return this.valueChain;
    }
}
