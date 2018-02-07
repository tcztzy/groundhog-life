import { NumberStateEntity } from "./state-entities";

class CurrentLife extends NumberStateEntity {
    constructor() {
        super('currentLife', 'Current Life', 1, false, 1, null);
    }
    prestige() {
        this.incrementValue();
        super.prestige();
    }
}
export let currentLife = new CurrentLife();

class CurrentLifeThisLoop extends NumberStateEntity {
    constructor() {
        super('currentLifeThisLoop', 'Current Live this Loop', 1, !1, 1, null);
        this.minLivesToLoopTrap = new NumberStateEntity('minLivesToLoopTrap', 'Min Lives to Loop Trap', 9999, false);
    }
    prestige() {
        this.incrementValue();
        super.prestige();
    }
    grandPrestige() {
        let originalValue = this.minLivesToLoopTrap.getValue();
        this.minLivesToLoopTrap.setValue(Math.min(originalValue, this.getValue()));
        this.setValue(1);
    }
}
export let currentLifeThisLoop = new CurrentLifeThisLoop();

class CurrentLoop extends NumberStateEntity {
    constructor() {
        super('currentLoop', 'Current Loop', 1, false, 1, null);
    }
    grandPrestige() {
        this.incrementValue();
    }
}
export let currentLoop = new CurrentLoop();
