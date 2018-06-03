import { LevelAddMultModifier } from "@/lib/modifiers/modifier";
import { energyStat } from "@/lib/stats/energy-stat";
import { Area } from "../area";

export const nutrition = new Area('area_nutrition', 'Meditation', []);
const modifier = new LevelAddMultModifier('nutrition_research_level_mod', 'Research: Meditation', 2, nutrition.xp, 0.005);
energyStat.addModifier(modifier);
nutrition.effect = '+0.5% Energy';
nutrition.importance = 3;
