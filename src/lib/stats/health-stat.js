import { Stat } from './stat';

class HealthStat extends Stat {
    constructor() {
        super('health', 'Health', 0, 2, '', '', true, false, 0);
        this.selectedModifier = null;
    }

    emojiName() {
        return this.effective > 1.2 ? 'healthy' : this.effective < 0.8 ? 'sick' : 'moderately_healthy';
    }

    update() {
        super.update();
    }
}

export let healthStat = new HealthStat();
