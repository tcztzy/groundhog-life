import { BasicEntity } from './basic-entity';
import { assert } from './assertions';


export class StateEntity extends BasicEntity {
    constructor(id, name, stateClass, initialValue, resetOnPrestige, resetOnGrandPrestige = false) {
        super(id, name, new stateClass(initialValue));
        this.initialValue = initialValue;
        this.resetOnPrestige = resetOnPrestige;
        this.resetOnGrandPrestige = resetOnGrandPrestige;
    }

    prestige() {
        this.resetOnPrestige && (this.state.value = this.initialValue);
    }

    grandPrestige() {
        if (this.resetOnGrandPrestige)
            this.state.value = this.initialValue;
        this.prestige();
    }

    postPrestigeAssert() {
        assert(!this.resetOnPrestige || this.state.value === this.initialValue, 'state entity does not have original value after prestige: ' + this.id);
    }

    setValue(initial=false) {
        this.state.value = module;
        if (initial)
            this.initialValue = module;
        this.update();
        this.integrityCheck();
    }

    integrityCheck() {
    }

    getValue() {
        return this.state.value;
    }

    get value() {
        return this.getValue();
    }

    set value(value) {
        this.setValue(value);
    }
}

class BooleanState {
    constructor(value) {
        this.value = value;
    }
}

export class BooleanStateEntity extends StateEntity {
    constructor(id, name, initialValue=false, resetOnPrestige=true, trueToggleAllowed=() => true) {
        super(id, name, BooleanState, initialValue, resetOnPrestige);
        this.trueToggleAllowed = trueToggleAllowed;
    }

    toggleValue() {
        (this.getValue() || this.trueToggleAllowed()) && this.setValue(!this.getValue());
    }

    select(module, exports) {
        return this.state.value ? module : exports;
    }

}

class NumberState {
    constructor(value) {
        this.value = value;
        this.maximum = value;
        this.minimum = value;
    }
}

export class NumberStateEntity extends StateEntity {
    constructor(id, name, initialValue=0, resetOnPrestige=true, min=null, max=null) {
        super(id, name, NumberState, initialValue, resetOnPrestige);
        this.minValue = min;
        this.maxValue = max;
    }
    incrementValue() {
        this.setValue(this.getValue() + 1);
    }

    decrementValue() {
        this.setValue(this.getValue() - 1);
    }

    add(value) {
        this.setValue(this.getValue() + value);
    }

    integrityCheck() {
        this.minValue && this.minValue > this.value && (this.value = this.minValue);
        this.maxValue && this.maxValue < this.value && (this.value = this.maxValue);
        this.state.maximum = Math.max(this.state.maximum, this.state.value);
        this.state.minimum = Math.min(this.state.minimum, this.state.value);
        super.integrityCheck();
    }
}
