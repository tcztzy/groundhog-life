import { BasicEntity } from "../basic-entity";

class _ {
    level = 0;
    xp = 0;
}
export class SecretProject extends BasicEntity {
    constructor(id, name, linearFactor, expFactor) {
        super(id, name, new _());
        this.linearFactor = linearFactor;
        this.expFactor = expFactor;
    }
    toNextLevel() {
        return (this.state.level + 1) * this.linearFactor * Math.pow(this.expFactor, this.state.level);
    }

    advance(module) {
        this.state.xp += module;
        if (this.state.xp > this.toNextLevel) {
            this.state.level += 1;
            this.state.xp = 0;
        }
    }

}

class b {}

export class Career extends BasicEntity {
    constructor(id, name, jobs, secretProject) {
        super(id, name, new b());
        this.jobs = jobs;
        for (let job of jobs) {
            job.career = this;
            job.dependants.push(this);
        }
        this.secretProject = secretProject;
    }

    prestige() {}

    update() {
        super.update();
    }

    advanceSecretProject() {
        this.secretProject;
    }
}
