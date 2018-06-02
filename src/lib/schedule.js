import { BasicEntity } from "./basic-entity";
import { assert } from "./assertions";
import { sleep, research, work, freeTime, activities } from "./activities";
import { parentsBasement } from "./homes";
import { selectFoodOption, studentCuisine } from "./food";
import { currentHomeContainer } from "./containers/home-container";
import { assistants } from "./assistants";

class State {}

class Schedule extends BasicEntity {
    constructor(module, require, n) {
        super(module, require, new State());
        for (let f of n) {
            f.duration.dependants.push(this);
        }
        this.timetable = [];
        this.update();
    }

    prestige() {}

    postPrestigeAssert() {
        assert(this.totalTime() === 1440);
    }

    totalTime() {
        return activities.map(function (module) {
            return module.getDuration();
        }).reduce(function (module, exports) {
            return module + exports;
        });
    }

    update() {
        let totalTime = this.totalTime();
        if (totalTime !== 1440)
            return void freeTime.durationProxy.add(1440 - totalTime);
        assert(totalTime === 1440);
        let require = 0, n = [];
        for (let activity of activities) {
            n.push([
                [
                    require,
                    require + activity.getDuration()
                ],
                activity
            ]);
            require += activity.getDuration();
        }
        this.timetable = n;
        super.update();
    }

    changeActivityTime(module, exports) {
        var require = Math.abs(exports), n = module.duration.effective - require * Math.floor(module.duration.effective / require), r = require * Math.ceil(module.duration.effective / require) - module.duration.effective;
        n > 0 && (exports = Math.max(exports, -n)), r > 0 && (exports = Math.min(exports, r)), exports = Math.min(exports, freeTime.duration.effective), exports = Math.max(exports, -(module.duration.effective - module.minTime)), exports = Math.floor(exports), module.durationProxy.add(exports), assert(module.duration.effective === module.durationProxy.getValue());
    }

    austerityMode() {
        this.changeActivityTime(research, -research.duration.effective);
        this.changeActivityTime(sleep, Math.min(0, 480 - sleep.duration.effective));
        this.changeActivityTime(work, -work.duration.effective);
        selectFoodOption(studentCuisine);
        currentHomeContainer.setCurrent(parentsBasement, !1);
        for (let i of assistants) {
            i.setValue(false);
        }
        this.changeActivityTime(work, freeTime.duration.effective);
    }

    lookupCurrentActivity(module, exports) {
        for (let [c, d] of this.timetable) {
            if (c[0] <= module && module < c[1])
                return exports ? [
                    d,
                    c[1] - module
                ] : d;
        }
        console.log("didn't find current activity", module, this.timetable);
        return exports ? [
            sleep,
            1440 - module
        ] : sleep;
    }
}

export let schedule = new Schedule('schedule', 'Schedule', activities);
