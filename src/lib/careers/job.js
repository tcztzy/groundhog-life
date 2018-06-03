import { currentJobContainer } from "@/lib/containers/career-containers";
import { BasicEntity } from "@/lib/basic-entity";
import { assert } from '@/lib/assertions';
import { XPModule } from '@/lib/xp';
import { jobPane } from "@/lib/panes";
import { createWorkXpPerHourStat } from '@/lib/stats/xp-per-hour-stat';
import { IncomePerWorkHourStat } from '@/lib/stats/income-per-work-hour-stat';
import { exponentialProgression } from '@/lib/exponential-progression';

export function configurePayProgression(module, exports, require, n) {
    let r = exponentialProgression(module.length, n);
    r = r.map(function (module) {
        return module * require / r.slice(-1)[0];
    });
    r = r.map(function (module) {
        return module + (exports - r[0]);
    });
    r[r.length - 1] = require;
    for (let i = 0; i < module.length; i++)
        module[i].income.setBase(r[i]);
}

export class JobState {
    active = false;
}

export class Job extends BasicEntity {
    constructor(module, require, n=10, r=false) {
        let i = new JobState();
        i.active = r;
        super(module, require, i);

        let l = createWorkXpPerHourStat(this.id + '_xp_per_hour');
        this.xp = new XPModule(this.id + 'experience', this.name + ' experience', l);
        this.income = new IncomePerWorkHourStat(this, n);
        this.logUnlock = true;
        this.update();
    }
    setBasePay(module) {
        this.income.setBase(module);
        this.update();
    }

    update() {
        let unlockedBefore = this.unlocked();
        this.state.active && currentJobContainer.update();
        super.update();
        let unlockedAfter = this.unlocked();
        !unlockedBefore && unlockedAfter && jobPane.notify();
    }

    activate() {
        this.state.active = true;
        currentJobContainer.setCurrentJob(this);
        this.update();
    }

    deactivate() {
        this.state.active = false;
        this.update();
    }

    nextLevelAtExp(module) {
        return 1;
    }

    prestige() {}

    postPrestigeAssert() {
        assert('bm1' === this.id || !this.state.active);
        assert('bm1' !== this.id || this.state.active);
    }
}
