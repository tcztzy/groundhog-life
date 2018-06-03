import { baseResearchXpPerHourStat } from "@/lib/stats/xp-per-hour-stat";
import { LevelAddMultModifier } from "@/lib/modifiers/modifier";
import { Area } from "../area";

export const studySkills = new Area('area_study_skills', 'Study Skills', []);
const o = new LevelAddMultModifier('study_skills_research_level_mod', 'Research: Study Skills', 2, studySkills.xp, 0.01);
baseResearchXpPerHourStat.addModifier(o);
studySkills.effect = '+1% Research Speed';
studySkills.importance = 2.5;
