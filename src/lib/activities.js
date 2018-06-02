import { BasicEntity } from "./basic-entity";
import { Stat } from "./stats/stat";
import { NumberStateEntity } from "./state-entities";
import { assert } from "./assertions";
import { currentJobContainer } from "./containers/career-containers";
import { currentResearchContainer } from "./containers/research-container";

class DurationProxy extends NumberStateEntity {}

class Duration extends Stat {
    constructor(id, name, n) {
        super(id, name, n, 0, '', '', true, true);
        assert(n >= -0.001, 'Activity duration is negative on construction');
        this.updateDurationString();
    }

    setBase(base) {
        super.setBase(base);
    }

    update() {
        super.update();
        this.updateDurationString();
    }

    updateDurationString() {
        let module = Math.floor(this.effective / 60), exports = this.effective - 60 * module;
        assert(this.effective === 60 * module + exports, 'hour/minutes calculation is wrong');
        let require = ('00' + Math.floor(exports)).substr(-2);
        this.durationString = module + ':' + require;
    }
}

class P {}

class Activity extends BasicEntity {
    constructor(id, name, n, r, i, s, o=x => x, u=false) {
        super(id, name, new P());
        this.originalDuration = r;
        this.ingName = n;
        this.durationByUser = i;
        this.color = s;
        this.isCurrent = false;
        this.doFun = o;
        this.minTime = 0;
        this.duration = new Duration(this.id + 'duration', this.name + ' duration', r);
        if (u) {
            this.durationProxy = new DurationProxy(this.id + 'DurationProxy', this.name + ' Duration Proxy', 0, true, 0);
            this.durationProxy.setValue(this.duration.effective, true);
            this.durationProxy.dependants.push(this);
        }
        this.update();
    }

    prestige() {
        this.duration.base = this.originalDuration;
        this.duration.effective = this.originalDuration;
    }

    postPrestigeAssert() {
        this.durationProxy && this.durationProxy.setValue(this.duration.effective);
        assert('activityFreeTime' === this.id || this.duration.base === this.originalDuration, `${this.name} duration should be ${this.originalDuration}, but it is ${this.duration.base}`);
    }

    sufficientTime() {
        return true;
    }

    update() {
        if (this.hasOwnProperty('durationProxy')) {
            this.duration.base = this.durationProxy.getValue();
            this.duration.update();
            assert(this.duration.base === this.durationProxy.getValue(), this.name);
            assert(this.duration.base === this.duration.effective, this.name);
        }
        super.update();
    }

    getDuration() {
        return this.duration.effective;
    }

    do(module) {
        this.doFun(module);
    }
}

export let sleep = new Activity('activitySleep', 'Sleep', 'sleeping', 480, true, '#007D43', () => null, true);

function L() {
    currentJobContainer.job.xp.gainExperience(work.getDuration());
}
export let work = new Activity('activityWork', 'Work', 'working', 480, true, '#F6768E', L, true);

function A() {
    currentResearchContainer.area && currentResearchContainer.area.xp.gainExperience(research.getDuration());
}
let research = new Activity('activityResearch', 'Research', 'researching', 0, true, 'FF7A5C', A, true);

research.sufficientTime = function () {
    return research.duration.effective > 0 || null === currentResearchContainer.area;
};
export { research };

export let eat = new Activity('activityEat', 'Food', 'cooking', 0, false, '#00538A');

export let exercise = new Activity('activityExercise', 'Exercise', 'exercising', 0, true, '#00538A', () => null, true);

export let chores = new Activity('activityChores', 'Chores', 'Cleaning', 0, false, '#000000');

export let slacking = new Activity('activitySlacking', 'Slacking', 'slacking', 240, false, '#000000');

export let freeTime = new Activity('activityFreeTime', 'Free Time', 'slacking', 120, false, '#53377A', x => x, true);

export let activities = [
    sleep,
    work,
    research,
    eat,
    chores,
    slacking,
    freeTime
];
