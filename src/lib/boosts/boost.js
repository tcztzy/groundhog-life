import { currentDay } from "@/lib/game-time";
import { BasicEntity } from "@/lib/basic-entity";
import { boostsPane, lifestylePane } from "@/lib/panes";

class _ {
    lastExecuted = -9999;
    selected = false;
}

export class Boost extends BasicEntity {
    constructor(module, require, n, r, s) {
        super(module, require, new _());
        this.description = n;
        this.duration = r;
        this.cooldown = s;
        this.available = false;
        currentDay.subscribe(this);
    }

    activate() {
        if (this.unlocked() && this.cooldownLeft() <= 0) {
            this.state.selected = true;
            this.state.lastExecuted = currentDay.getValue();
            this.update();
        }
    }

    currentState() {
        return this.state.selected ? 'active' : this.cooldownLeft() > 0 ? 'cooldown' : this.unlocked() ? 'available' : 'locked';
    }

    buttonState() {
        return this.state.selected ? 'btn-success' : this.cooldownLeft() > 0 ? 'btn-warning' : this.unlocked() ? 'btn-primary' : 'btn-secondary';
    }

    daysLeft() {
        return Math.max(0, this.duration - (currentDay.getValue() - this.state.lastExecuted));
    }

    cooldownLeft() {
        return Math.max(0, this.cooldown - (currentDay.getValue() - this.state.lastExecuted));
    }

    update() {
        this.available = !this.state.selected && currentDay.getValue() - this.state.lastExecuted > this.cooldown;
        if (this.state.selected && this.daysLeft() <= 0)
            this.state.selected = false;
        if (this.cooldownLeft() === 1) {
            boostsPane.notify();
            lifestylePane.notify();
        }
        super.update();
    }

    prestige() {
        this.state.lastExecuted = -9999;
        this.state.selected = !1;
    }

    onLoad() {
        if (this.state.lastExecuted > currentDay.getValue()) {
            this.state.lastExecuted = -9999;
            this.state.selected = !1;
        }
    }
}
