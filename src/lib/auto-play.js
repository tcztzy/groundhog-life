import { assert } from "@/lib/assertions";
import { messageBox } from "@/lib/message-box";
import { prestiger } from "@/lib/prestiger";
import { money } from "@/lib/currency";
import { sleep, research } from "@/lib/activities";
import { currentJobContainer } from "@/lib/containers/career-containers";
import { changeActivityTime, setActiveJob, setActiveResearch } from "@/lib/user-select-action";
import { boosts } from "@/lib/boosts";

export function findBestJob(module, exports) {
    let require = null, n = -1;
    for (const c of module) {
        for (const m of c.jobs) {
            if (m.unlocked() && !(m.xp.state.level > exports)) {
                var y = m.income.base;
                y > n && (n = y, require = m);
            }
        }
    }
    return require;
}
export function autoBoostFun(module) {
    let exports = true;
    if (module.autoBoostStack.getValue()) {
        for (const boost of boosts) {
            if (module.autoBoostExclConference.getValue() || 'boost_conference' !== boost.id) {
                exports = exports && ('available' === boost.currentState() || !boost.unlocked());
            }
        }
        if (exports)
            if (module.autoBoostJustPause.getValue()) {
                module.paused.setValue(true);
                messageBox.addMessage('Auto-Pause: Boosts ready!', 'bell');
            }
            else {
                for (const boost of boosts) {
                    boost.activate();
                }
            }
    } else {
        for (const boost of boosts) {
            if ('available' === boost.currentState()) {
                if (module.autoBoostJustPause.getValue())
                    return module.paused.setValue(!0), void messageBox.addMessage('Auto-Pause: Boost ready!', 'bell');
                boost.activate();
            }
        }
    }
};
export function autoplayJob(module) {
    var exports = findBestJob(module.careers, 10);
    if (exports)
        setActiveJob(exports);
    else {
        exports = findBestJob(module.careers, 100000);
        assert(exports);
        setActiveJob(exports);
    }
}
export function autoPromoteFun(module) {
    const currentJob = currentJobContainer.job;
    if (!(currentJob.xp.state.level < module.autoPromoteMinLevel.getValue())) {
        var require = currentJob.career, n = currentJob, r = !1;
        for (const job of require.jobs) {
            if (r) {
                if (job.unlocked() && (n = job, n.xp.state.level <= module.autoPromoteMinLevel.getValue()))
                    break;
            } else
                r = job === currentJob;
        }
        if (n !== currentJobContainer.job) {
            if (module.autoPromoteJustPause.getValue()) {
                module.paused.setValue(true);
                messageBox.addMessage('Auto-Pause: Promotion available!', 'bell');
            }
            else
                setActiveJob(n);
        }
    }
}
export function autoplayResearch(module) {
    if (module.research.unlocked()) {
        var exports = 9999999, require = null;
        for (const c of module.fields)
            if (c.unlocked())
                for (const m of c.areas)
                    m.unlocked() && m.xp.state.level / m.importance < exports && (exports = m.xp.state.level / m.importance, require = m);
        setActiveResearch(require);
    }
}
export function autoplayActivityDuration(module) {
    if (!money.austerityMode) {
        var exports = false;
        if (exports)
            for (let i = 0; i < 100; i++) {
                for (const f of module.activities) {
                    f.durationByUser && changeActivityTime(module, f, Math.floor(3000 * Math.random() - 1500));
                }
            }
        for (const g of module.activities) {
            if (g.unlocked() && g.durationByUser) {
                if (g.duration.effective > 300)
                    changeActivityTime(module, g, -60);
                if (g.duration.effective === 0)
                    changeActivityTime(module, g, 60);
            }
        }
        changeActivityTime(module, sleep, 540);
        changeActivityTime(module, research, 500);
    }
}
export function autoplayLifestyle(module) { }
export function autoplay(module) {
    autoplayJob(module);
    autoBoostFun(module);
    if (module.time.currentDay.getValue() % 100 === 0) {
        autoplayResearch(module);
        autoplayLifestyle(module);
    }
    autoplayActivityDuration(module);
    module.time.currentDay.getValue() > 15330 && prestiger.prestige();
}
