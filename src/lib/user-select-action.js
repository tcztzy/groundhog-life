import { currentJobContainer } from "@/lib/containers/career-containers";
import { currentResearchContainer } from "@/lib/containers/research-container";
import { currentHomeContainer } from "@/lib/containers/home-container";

export function findActiveJob(module) {
    for (const career of module.careers)
        for (const job of career.jobs)
            if (job.state.active)
                return job;
}
export let setActiveJob = job => {currentJobContainer.setCurrentJob(job);},
    setActiveResearch = research => {currentResearchContainer.setCurrentResearch(research);},
    changeActivityTime = (module, exports, require) => {module.schedule.changeActivityTime(exports, require);},
    selectHome = home => {currentHomeContainer.setCurrent(home);};
