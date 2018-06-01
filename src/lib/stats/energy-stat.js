import { Stat } from './stat';
import { StatEffectiveMultModifier } from '../modifiers/modifier';
import { happinessStat } from './happiness-stat';
import { healthStat } from './health-stat';

class EnergyStat extends Stat {
    constructor() {
        super('energy', 'Energy', process.env.NODE_ENV === 'development' ? 10000000 : 1, 2, '', '', true);
    }

    update() {
        super.update();
    }
}


export let energyStat = new EnergyStat();
const happinessEnergyMod = new StatEffectiveMultModifier('happinessEnergyMod', 'Happiness', 10, happinessStat);
energyStat.addModifier(happinessEnergyMod);
const healthEnergyMod = new StatEffectiveMultModifier('healthEnergyMod', 'Health', 11, healthStat);
energyStat.addModifier(healthEnergyMod);
