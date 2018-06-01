import { BasicEntity } from "./basic-entity";
import { researchPane } from "./panes";

class State {}

export class Field extends BasicEntity {
    constructor(id, name, areas) {
        super(id, name, new State());
        this.areas = areas;
        this.logUnlock = true;
    }

    update() {
        let preUpdateLocked = this.wasLocked;
        super.update();
        if (preUpdateLocked && !this.wasLocked)
            researchPane.notify();
    }

    prestige() {}
}
