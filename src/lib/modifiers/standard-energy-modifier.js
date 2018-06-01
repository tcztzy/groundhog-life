import { MultModifier } from './modifier';
import { energyStat } from '../stats/energy-stat';

class StandardEnergyModifier extends MultModifier {
    constructor() {
        super('seMod', 'Energy', 0, energyStat.effective);
        energyStat.dependants.push(this);
        this.update();
    }

    update() {
        this.factor = energyStat.effective;
        super.update();
    }
}

export let standardEnergyModifier = new StandardEnergyModifier();
