import { BasicEntity } from "../basic-entity";
import { freeTime } from "../activities";
import { log } from "../log";

class HomeContainer extends BasicEntity {
    constructor() {
        super('currentHomeContainer', 'Current Home Container', {});
    }

    setCurrent(newHome, payed=true) {
        if (this.home !== newHome) {
            if (this.home) {
                if (this.home.choresTime.effective < newHome.choresTime.effective && newHome.choresTime.effective - this.home.choresTime.effective > freeTime.duration.effective)
                    return;
                if (payed && !newHome.enoughMoney())
                    return;
            }
            if (this.home)
                this.home.deactivate();
            this.home = newHome;
            this.home.activate(payed);
            log.info('You got a new home: ' + this.home.name, this.id, log.HOME_SELECTED);
            super.update();
        }
    }
}

export let currentHomeContainer = new HomeContainer();
