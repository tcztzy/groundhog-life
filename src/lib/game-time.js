import { NumberStateEntity } from "./state-entities";

class CurrentDay extends NumberStateEntity {
    constructor() {
        super('currentDay', 'Current Day');
    }

    getYear() {
        return Math.floor(this.getValue() / 365);
    }

    getDayOfYear() {
        return Math.floor(this.getValue() % 365);
    }
}

export let currentDay = new CurrentDay();

class CurrentYear extends NumberStateEntity {
    constructor() {
        super('currentYear', 'Current Year');
    }

    update() {
        if (this.getValue() !== currentDay.getYear()) {
            this.setValue(currentDay.getYear());
            super.update();
        }
    }
}

export let currentYear = new CurrentYear();
