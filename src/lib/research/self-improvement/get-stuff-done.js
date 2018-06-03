import { createCompletedLock, createCompletedOrReadingListLock } from "@/lib/locks";
import { MultModifier, LevelModifier } from "@/lib/modifiers/modifier";
import { slacking } from "@/lib/activities";
import { baseWorkXpPerHourStat } from "@/lib/stats/xp-per-hour-stat";
import { energyStat } from "@/lib/stats/energy-stat";
import { Book } from "../book";
import { Area } from "../area";

const gsd1 = new Book('gsd1', 'Eat That Frog!', 'Stop Procrastinating', 40, '1576754227');
let modifier = new MultModifier('gsd1_slacking_mod', 'Eat That Frog!', 1, 0.8);
createCompletedLock(gsd1, modifier);
slacking.duration.addModifier(modifier);
gsd1.effect = '20% less slacking';

const gsd2 = new Book('gsd2', 'The One Thing', 'Prioritize Harder', 60, '1885167776');
modifier = new MultModifier('gsd2_job_experience_mod', 'The One Thing', 1, 1.1);
createCompletedLock(gsd2, modifier);
baseWorkXpPerHourStat.addModifier(modifier);
gsd2.effect = '10% more work experience/h';

const gsd3 = new Book('gsd3', 'Getting Things Done', 'Organize Your Life', 120, '0143126563');
modifier = new MultModifier('gsd3_job_experience_mod', 'Getting Things Done', 1, 1.1);
createCompletedLock(gsd3, modifier);
energyStat.addModifier(modifier);
gsd3.effect = '10% more energy';

createCompletedOrReadingListLock(gsd1, gsd2);
createCompletedOrReadingListLock(gsd2, gsd3);

export let getStuffDone = new Area('area_getting_stuff_done', 'Getting Stuff Done', [
    gsd1,
    gsd2,
    gsd3
]);

modifier = new LevelModifier('gsd_research_level_mod', 'Research: Getting Things Done', 2, getStuffDone.xp, 0.99);
slacking.duration.addModifier(modifier);
getStuffDone.effect = '-1% Slacking (compounding)';
