import { BasicEntity } from "@/lib/basic-entity";
import { log } from "@/lib/log";

class CurrentResearchContainer extends BasicEntity {
    area = null;
    constructor() {
        super('currentResearchContainer', 'Current Research Container', {});
    }

    prestige() {
        this.area = null;
    }

    setCurrentResearch(research) {
        if (research !== this.area) {
            if (this.area) {
                this.area.deactivate();
            }
            this.area = research;
            log.info(`Researching ${this.area.name}`, this.name, log.RESEARCH_SELECTED);
            this.area.activate();
            this.update();
        }
    }
}

export let currentResearchContainer = new CurrentResearchContainer();
