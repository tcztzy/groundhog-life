import {Stat} from "./stat";
let v = require('./179');

export class IncomePerWorkHourStat extends Stat {
    constructor(job, n) {
        super(job.id+'incpH', 'Income/h', n, 2, '$', '');
        this.job = job;
        this.base = n;
        this.addModifier(new v.JobLevelModifier(job));
        this.update();
    }
}
