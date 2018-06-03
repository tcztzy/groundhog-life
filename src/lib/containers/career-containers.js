import { BasicEntity } from "@/lib/basic-entity";
import { log } from "@/lib/log";

class CurrentIncomeContainer extends BasicEntity {
    constructor() {
        super('currentIncomeContainer', 'Current Income Container', {});
    }

    prestige() {}

    setCurrentIncome(income) {
        if(income !== this.income) {
            if (this.income)
                this.income.unsubscribe(this);
            this.income = income;
            income.dependants.push(this);
            this.update();
        }
    }

    update() {
        super.update();
    }
}

export let currentIncomeContainer = new CurrentIncomeContainer();

class CurrentJobContainer extends BasicEntity {
    constructor() {
        super('currentJobContainer', 'Current Job Container', {});
    }

    prestige() {
        this.setCurrentJob(this.defaultJob);
    }

    setCurrentJob(job) {
        if (job !== this.job) {
            if (this.job)
                this.job.deactivate();
            this.job = job;
            this.job.activate();
            currentIncomeContainer.setCurrentIncome(job.income);
            log.info('You got a new job: ' + this.job.name, this.id, log.JOBSELECTED);
            super.update();
        }
    }
}

export let currentJobContainer = new CurrentJobContainer();
