import { Stat } from './stat';
import { currentIncomeContainer } from "./career-containers";
import { work } from "./activities";

class DailyWorkIncomeStat extends Stat {
    constructor() {
        super('dailyWorkIncomeStat', 'Income/day', 0, 2, '$');
        currentIncomeContainer.dependants.push(this);
        work.dependants.push(this);
        this.update();
    }

    update() {
        if (currentIncomeContainer.hasOwnProperty('income'))
            this.base = currentIncomeContainer.income.effective * work.duration.effective / 60;
        super.update();
    }
}

export let dailyWorkIncomeStat = new DailyWorkIncomeStat();
