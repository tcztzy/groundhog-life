import { createCompletedOrReadingListLock, createLevelLock } from "../../locks";
import { LevelAddMultModifier } from "../../modifiers/modifier";
import { Area } from "../../area";
import { Book } from "../../book";
import { programming } from "./programming";
import { softwareEngineer } from "../../careers/yugle";


export let se1 = exports.se1 = new Book('se1', 'The Pragmatic Programmer', 'Tales from the development frontlines.', 150, '020161622X'),
    se2 = exports.se2 = new Book('se2', 'Clean Code', 'Write the shiniest lines.', 200, '0132350882'),
    se3 = exports.se3 = new Book('se3', 'Code Complete', 'If your code is not complete, you', 200, '0735619670'),
    se4 = exports.se4 = new Book('se4', 'Design Patterns', 'Don\'t reinvent the wheel. You will probably make it square-shaped.', 250, '0201633612'),
    se5 = exports.se5 = new Book('se5', 'Working with Legacy Code', 'Boooring. Or is it?', 250, '0131177052');
createCompletedOrReadingListLock(se1, se2);
createCompletedOrReadingListLock(se2, se3);
createCompletedOrReadingListLock(se3, se4);
createCompletedOrReadingListLock(se4, se5);
export let se = new Area('area_se', 'Software Architecture', [
    se1,
    se2,
    se3,
    se4,
    se5
]);
let p = new LevelAddMultModifier('se_research_level_mod', 'Research: Software Engineering', 2, se.xp, 0.01);
programming.xp.xpPerHourStat.addModifier(p);
se.effect = '+1% Programming Research Speed';
createLevelLock(se, softwareEngineer, 5);
