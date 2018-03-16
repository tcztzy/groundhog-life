import {BasicEntity} from "../basic-entity";
import {assert, isNumber} from "../assertions";

class g {
}

export class Modifier extends BasicEntity {
    constructor(id, name, priority, operationString, factor, digits = 2) {
        super(id, name, new g());
        this.operationString = operationString;
        assert(isNumber(factor), `${this.id} initial factor: ${factor}`);
        this._factor = factor;
        this.priority = priority;
        this.digits = digits;
    }

    prestige() {
    }

    apply(value) {
        assert(false);
    }

    get factor() {
        assert(isNumber(this._factor), `${this.id} getting invalid factor: ${this._factor}`);
        return this._factor;
    }

    set factor(value) {
        assert(isNumber(value), `${this.id} setting invalid factor: ${value}`);
        this._factor = value;
    }
}

export class AddModifier extends Modifier {
    constructor(id, name, priority, factor) {
        super(id, name, priority, '+', factor);
    }

    update() {
        this.operationString = this.factor >= 0 ? '+' : '';
        super.update();
    }

    apply(value) {
        return value + this.factor;
    }
}

export class GenericAddModifier extends AddModifier {
    constructor(id, name, priority, entity, valueExtractor) {
        super(id, name, priority, valueExtractor(entity));
        this.entity = entity;
        this.valueExtractor = valueExtractor;
        this.entity.subscribe(this);
    }

    get factor() {
        return this.valueExtractor(this.entity);
    }
}

export class StatEffectiveAddModifier extends AddModifier {
    constructor(id, name, priority, stat, transform = x => x) {
        super(id, name, priority, transform(stat.effective));
        this.stat = stat;
        stat.subscribe(this);
        this.transform = transform;
    }

    get factor() {
        return this.transform(this.stat.effective);
    }
}

export class NumberStateAddModifier extends AddModifier {
    constructor(id, name, priority, numberStateEntity, transform=x => x) {
        super(id, name, priority, transform(numberStateEntity.getValue()));
        this.numberStateEntity = numberStateEntity;
        numberStateEntity.subscribe(this);
        this.transform = transform;
    }

    get factor () {
        return this.transform(this.numberStateEntity.getValue());
    }
}

export class MultModifier extends Modifier {
    constructor(id, name, priority, factor) {
        super(id, name, priority, 'x', factor);
    }

    prestige() {
    }

    apply(value) {
        return value * this.factor;
    }

}

export class GenericMultModifier extends MultModifier {
    constructor(module, require, n, r, i) {
        super(module, require, n, i(r));
        this.entity = r;
        this.valueExtractor = i;
        this.entity.subscribe(this);
    }

    get factor() {
        return this.valueExtractor(this.entity);
    }
}

export class StatEffectiveMultModifier extends MultModifier {
    constructor(module, require, n, r, i=x => x) {
        super(module, require, n, i(r.effective));
        this.stat = r;
        r.subscribe(this);
        this.transform = i;
    }

    get factor() {
        return this.transform(this.stat.effective);
    }
}

export class NumberStateModifier extends MultModifier {
    constructor(module, require, n, r, i=x => x) {
        super(module, require, n, i(r.getValue()));
        this.numberStateEntity = r;
        r.subscribe(this);
        this.transform = i;
    }

    get factor() {
        return this.transform(this.numberStateEntity.getValue());
    }
}

export class LevelModifier extends MultModifier {
    constructor(module, require, n, r, i) {
        super(module, require, n, Math.pow(i, r.state.level));
        this.levelEntity = r;
        r.subscribe(this);
        this.factorPerLevel = i;
        this.update();
    }

    get factor() {
        return Math.pow(this.factorPerLevel, this.levelEntity.state.level);
    }
}

export class LevelAddModifier extends AddModifier {
    constructor(id, name, priority, levelEntity, factorPerLevel, transform = x => x) {
        super(id, name, priority, transform(factorPerLevel * levelEntity.state.level));
        this.levelEntity = levelEntity;
        levelEntity.subscribe(this);
        this.factorPerLevel = factorPerLevel;
        this.transform = transform;
        this.update();
    }

    get factor() {
        return this.transform(this.factorPerLevel * this.levelEntity.state.level);
    }
}

let w = 0.5772156649;

export class HarmonicLevelAddModifier extends LevelAddModifier {
    get factor() {
        let level = this.levelEntity.state.level;
        return 0 === level ? 0 : this.factorPerLevel * (Math.log(level) + w + 1 / (2 * level) - 1 / (12 * level * level));
    }
    get step() {
        return this.factorPerLevel / (this.levelEntity.state.level + 1);
    }
}

export class GeometricLevelAddModifier extends LevelAddModifier {
    constructor(id, name, priority, levelEntity, factorPerLevel, ratio) {
        super(id, name, priority, levelEntity, factorPerLevel);
        this.ratio = ratio;
    }

    get factor() {
        let level = this.levelEntity.state.level;
        return this.factorPerLevel * ((1 - Math.pow(this.ratio, level)) / (1 - this.ratio));
    }

    get step() {
        return this.factorPerLevel * Math.pow(this.ratio, this.levelEntity.state.level + 1);
    }
}

export class LevelAddMultModifier extends MultModifier {
    constructor(module, require, n, r, i, s=x => x) {
        super(module, require, n, 1 + s(i * r.state.level));
        this.levelEntity = r;
        r.subscribe(this);
        this.factorPerLevel = i;
        this.transform = s;
        this.update();
    }

    get factor() {
        return 1 + this.transform(this.factorPerLevel * this.levelEntity.state.level);
    }
}
