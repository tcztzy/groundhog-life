import { Stat } from "./stat";

class DoubleIncomeAtLevelStat extends Stat {
    constructor() {
        super('doubleIncomeAtLevel', 'Double Income at Level', 10);
    }
}

export let doubleIncomeAtLevelStat = new DoubleIncomeAtLevelStat();
