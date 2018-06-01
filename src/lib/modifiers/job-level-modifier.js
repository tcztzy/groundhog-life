import { MultModifier } from "./modifier";
import { assert, isNumber } from "../assertions";
import { doubleIncomeAtLevelStat } from "../stats/double-income-at-level-stat";

export class JobLevelModifier extends MultModifier {
    constructor(module) {
        super(module.id + 'jobLevelMod', 'Job Level', 10, 1);
        this.xp = module.xp;
        this.xp.dependants.push(this);
        this.update();
    }

    update() {
        this.factor = 1 + Math.log(1 + this.xp.state.level) / Math.log(1 + doubleIncomeAtLevelStat.effective);
        assert(isNumber(this.factor));
        super.update();
    }
}
