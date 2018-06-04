import { MultModifier } from "@/lib/modifiers/modifier";
import { createLevelLock, createSelectedLock } from "@/lib/locks";
import { baseResearchXpPerHourStat } from "@/lib/stats/xp-per-hour-stat";
import { energyStat } from "@/lib/stats/energy-stat";
import { nutrition } from "@/lib/research/self-improvement/nutrition";
import { getStuffDone } from "@/lib/research/self-improvement/get-stuff-done";
import { studySkills } from "@/lib/research/self-improvement/study-skills";
import { Boost } from "./boost";

const confeine = new Boost('boost_coffeine', 'Copious Caffeine', '+75% Energy for 2 Months', 60, 730), f = new MultModifier('coffeine_mod', 'Copious Caffeine', 10, 1.75);
createSelectedLock(confeine, f);
energyStat.addModifier(f);
const organize = new Boost('boost_organize', 'Organize Stuff', '+75% Energy for 3 Months', 90, 1095), h = new MultModifier('boost_organize_mod', 'Organized your Stuff', 10, 1.75);
createSelectedLock(organize, h);
createLevelLock(getStuffDone, organize, 10);
energyStat.addModifier(h);
const spa = new Boost('boost_spa', 'Visit Spa', '+75% Energy for 4 Months', 120, 1460), m = new MultModifier('boost_spaMod', 'Visited Spa', 10, 1.75);
createSelectedLock(spa, m);
createLevelLock(nutrition, spa, 25);
energyStat.addModifier(m);
const conference = new Boost('boost_conference', 'Go to Conference', '+75% Research Output for 6 Months', 180, 1825), g = new MultModifier('boost_conferenceMod', 'Visited Conference', 10, 1.75);
createSelectedLock(conference, g);
createLevelLock(studySkills, conference, 50);
baseResearchXpPerHourStat.addModifier(g);
export const boosts = [
    confeine,
    organize,
    spa,
    conference
];
