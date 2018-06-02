import { BasicEntity } from "./basic-entity";
import { createResearchXpPerHourStat } from "./stats/xp-per-hour-stat";
import { linearExponentialXpIncrease, XPModule } from "./xp";
import { currentResearchContainer } from "./containers/research-container";
import { assert } from "./assertions";
import { researchPane } from "./panes";

class State {
    active = false;
}

export class Area extends BasicEntity {
    constructor(id, name, n) {
        super(id, name, new State());
        this.name = name;
        this.subjects = n;
        let s = createResearchXpPerHourStat(this.id + '_xp_per_hour', this.name + ' XP/h');
        this.xp = new XPModule(this.id + 'experience', this.name + ' experience', s);
        this.xp.nextLevelAtXp = linearExponentialXpIncrease(100);
        this.effect = '';
        this.logUnlock = true;
        this.importance = 1;
    }
    activate() {
        this.state.active = true;
        currentResearchContainer.setCurrentResearch(this);
        this.update();
    }
    deactivate() {
        this.state.active = false;
        this.xp.lastLevelUp -= 1;
        this.update();
    }
    update() {
        let preUpdate = this.unlocked();
        super.update();
        let postUpdate = this.unlocked();
        if (!preUpdate && postUpdate)
            researchPane.notify();
    }
    prestige() {
        this.state.active = false;
    }
    onLoad() {
        this.state.active && currentResearchContainer.setCurrentResearch(this);
    }
    postPrestigeAssert() {
        assert(!this.state.active);
    }
}
