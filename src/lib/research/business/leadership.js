import { createCompletedLock, createCompletedOrReadingListLock, createLevelLock } from "@/lib/locks";
import { baseWorkXpPerHourStat } from "@/lib/stats/xp-per-hour-stat";
import { MultModifier, LevelAddMultModifier } from "@/lib/modifiers/modifier";
import { Book } from "../book";
import { Area } from "../area";
import { teamLead, divisionLead, cto } from "@/lib/careers/yugle";

export let leadership101 = new Book('leadership1', 'Leadership 101', 'Fundamentals of Leadering', 100, '0785264191');
let c = new MultModifier(leadership101.id + '_workexp_mod', leadership101.name, 1, 1.05);
createCompletedLock(leadership101, c);
baseWorkXpPerHourStat.addModifier(c);
leadership101.effect = '5% more work experience/hour';

export let gungHo = new Book('leadership2', 'Gung Ho', 'Inspire Underlings', 140, '068815428X');
c = new MultModifier(gungHo.id + '_workexp_mod', gungHo.name, 1, 1.05);
createCompletedLock(gungHo, c);
baseWorkXpPerHourStat.addModifier(c);
gungHo.effect = '5% more work experience/hour';

let leadership3 = new Book('leadership3', 'The One Minute Manager', 'Sequel to \'The One Minute Lover\'', 100, '0062367544');
c = new MultModifier(leadership3.id + '_workexp_mod', leadership3.name, 1, 1.05);
createCompletedLock(leadership3, c);
baseWorkXpPerHourStat.addModifier(c);
leadership3.effect = '5% more work experience/hour';

let leadership4 = new Book('leadership4', 'The Leadership Challenge', 'Extraordinize your Organization', 190, '0470651725');
c = new MultModifier(leadership4.id + '_workexp_mod', leadership4.name, 1, 1.05);
createCompletedLock(leadership4, c);
baseWorkXpPerHourStat.addModifier(c);
leadership4.effect = '5% more work experience/hour';

let leadership5 = new Book('leadership5', 'Leadership: Theory and Practice', 'Getting Serious', 300, '1483317536');
c = new MultModifier(leadership5.id + '_workexp_mod', leadership5.name, 1, 1.05);
createCompletedLock(leadership5, c);
baseWorkXpPerHourStat.addModifier(c);
leadership5.effect = '5% more work experience/hour';

createCompletedOrReadingListLock(leadership101, gungHo);
createCompletedOrReadingListLock(gungHo, leadership3);
createCompletedOrReadingListLock(leadership3, leadership4);
createCompletedOrReadingListLock(leadership4, leadership5);

export let leadership = new Area('area_leadership', 'Leadership', [
    leadership101,
    gungHo,
    leadership3,
    leadership4,
    leadership5
]);
c = new LevelAddMultModifier('leadership_research_level_mod', 'Research: Leadership', 2, leadership.xp, 0.02);
baseWorkXpPerHourStat.addModifier(c);
leadership.effect = '+2% Work Experience/Hour';
leadership.importance = 1.5;
createLevelLock(leadership, teamLead, 10);
createLevelLock(leadership, divisionLead, 10);
createLevelLock(leadership, cto, 100);
