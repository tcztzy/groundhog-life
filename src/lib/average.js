import { BasicEntity } from "@/lib/basic-entity";
import { currentDay } from "@/lib/game-time";

export const oneYearAlpha = 0.0027359764, fiveYearAlpha = 0.00135, tenYearAlpha = 0.00027393507;

class State {
    constructor(value) {
        this.value = value;
    }
}

export class ExpMovAvg extends BasicEntity {
    constructor(module, require, stat, alpha, value=0, tolerance=0) {
        super(module, require, new State(value));
        currentDay.subscribe(this);
        this.stat = stat;
        this.alpha = alpha;
        this.baseValue = value;
        this.startValue = value;
        this.tolerance = tolerance;
    }
    update() {
        this.state.value = (1 - this.alpha) * this.state.value + this.alpha * this.stat.effective;
        if (Math.abs(this.state.value - this.startValue) >= this.tolerance) {
            this.startValue = this.state.value;
            super.update();
        }
    }

    prestige() {
        this.state.value = this.baseValue;
    }
}
