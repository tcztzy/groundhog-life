import { BasicEntity } from "./basic-entity";
import { isNumber } from "./assertions";
import { currentDay } from "./game-time";
import { currentLife } from "./life-loop";
import { journalPane, achievementPane } from "./panes";
import { saver } from "./saver";

class State {
    completed = false;
    completedAt = -1;
}

export class Achievement extends BasicEntity {
    constructor(id, name, description, valueFun, goal, checkFun=(a, b)=>a >= b, reward=1) {
        super(id, name, new State());
        this.description = description;
        this.valueFun = valueFun;
        this.goal = goal;
        this.currentValue = this.valueFun();
        this.checkFun = checkFun;
        this.logUnlock = true;
        this.reward = reward;
    }

    check() {
        return isNumber(this.valueFun()) && this.checkFun(this.valueFun(), this.goal);
    }

    update() {
        this.currentValue = this.valueFun(), !this.state.completed && this.check() && (this.state.completed = true, this.state.completedAt = [
            currentLife.getValue(),
            currentDay.getValue()
        ], journalPane.notify(), achievementPane.notify(), this.getReward()), this.state.completed && !this.check() && (this.state.completed = false);
        super.update();
    }

    getReward() {
        saver.requestSave();
    }

    prestige() {
        if (this.lifetime) {
            this.state.completed = false;
            this.state.completedAt = -1;
        }
        super.prestige();
    }
}

class x {}

export class AG extends BasicEntity {
    constructor(module, require, n) {
        super(module, require, new x());
        this.achievements = n;
        for (let v of n) {
            v.subscribe(this);
        }
        this.completed = 0;
        this.total = 0;
    }

    update() {
        this.completed = 0;
        this.total = 0;
        for (let u of this.achievements) {
            this.total += 1;
            if (u.state.completed)
                this.completed += 1;
        }
        super.update();
    }
}
