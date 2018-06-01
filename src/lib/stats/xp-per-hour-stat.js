import { StatEffectiveAddModifier } from '../modifiers/modifier';
import { Stat } from './stat';
import { standardEnergyModifier } from '../modifiers/standard-energy-modifier';

export class XpPerHourStat extends Stat {
    constructor(id, name) {
        super(id, name, 0, 2, "", "");
        this.update();
    }
}

export let baseWorkXpPerHourStat = new Stat("baseWorkXpPerHourStat", "Base Work XP", 1, 2, "", "/h");
baseWorkXpPerHourStat.addModifier(standardEnergyModifier);
export function createWorkXpPerHourStat(id, name) {
    let stat = new XpPerHourStat(id, name);
    let modifier = new StatEffectiveAddModifier(stat.id + "_base", "Base Work Experience", 1, baseWorkXpPerHourStat);
    stat.addModifier(modifier);
    return stat;
}

export let baseResearchXpPerHourStat = new Stat("baseResearchXpPerHourStat", "Base Research XP", 1, 2, "", "/h");
baseResearchXpPerHourStat.addModifier(standardEnergyModifier);

export function createResearchXpPerHourStat(id, name) {
    let stat = new XpPerHourStat(id, name);
    let modifier = new StatEffectiveAddModifier(stat.id + "_base", "Base Research Experience", 1, baseResearchXpPerHourStat);
    stat.addModifier(modifier);
    return stat;
}
