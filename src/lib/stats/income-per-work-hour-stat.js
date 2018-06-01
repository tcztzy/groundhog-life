import { Stat } from "./stat";
import { JobLevelModifier } from "../modifiers/job-level-modifier";

export class IncomePerWorkHourStat extends Stat {
    constructor(job, n) {
        super(job.id+'incpH', 'Income/h', n, 2, '$', '');
        this.job = job;
        this.base = n;
        this.addModifier(new JobLevelModifier(job));
        this.update();
    }
}
