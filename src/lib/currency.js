import { NumberStateEntity } from "./state-entities";
import { schedule } from "./schedule";

class g extends NumberStateEntity {
    constructor() {
        super('money', 'Money', 100);
        this.austerityMode = false;
        this.austerityAlert = false;
    }

    acknowledgeAusterity() {
        this.austerityAlert = false;
    }

    update() {
        if (this.getValue() < 0) {
            if (!this.austerityMode) {
                this.austerityMode = true;
                this.austerityAlert = true;
            }
            schedule.austerityMode();
        }
        else
            this.austerityMode = !1;
        super.update();
    }
}

export let money = new g();
export let studyPoints = new NumberStateEntity('studyPoints', 'Study Points', 0);
