import { BasicEntity } from "@/lib/basic-entity";
import { Area } from "@/lib/area";
import { HarmonicLevelAddModifier } from "@/lib/modifiers/modifier";
import { investmentReturnStat } from "@/lib/stats/currency-stat";

export let investment = new Area('area_investment', 'Investing', []);

let _ = new HarmonicLevelAddModifier('investment_research_level_mod', 'Research: Investing', 2, investment.xp, 0.02);

investmentReturnStat.addModifier(_);

class b {
}

class M extends BasicEntity {
    update() {
        let step = 100 * _.step, stepDisplay = step > 0.01 ? step.toFixed(2) : '<0.01';
        investment.effect = 'Interest +' + stepDisplay + '% (total: ' + (100 * _.factor).toFixed(2) + '%/yr)';
    }
}

let k = new M('inv_eff_upd', 'Investment Effect Updater', new b());
_.subscribe(k);
investment.effect = 'Interest +1%';
