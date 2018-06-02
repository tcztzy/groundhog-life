import { createLevelLock, createCompletedOrReadingListLock } from "./locks";
import { yugle, unpaidIntern, juniorDeveloper } from "./careers/yugle";
import { Book } from "./book";
import { Area } from "./area";
import { LevelAddMultModifier } from "./modifiers/modifier";

export let programming1 = new Book('programming1', 'Head First Java', 'On your way to that Yugle internship.', 150, '0596009208');
export let programming2 = new Book('programming2', 'Python Crash Course', 'No more boilerplate. Or types.', 150, '1593276036');
export let programming3 = new Book('programming3', 'The C Programming Language', 'The devil lies in the SEGMENTATION FAULT', 200, '0131103628');
export let programming4 = new Book('programming4', 'C++ Primer', 'C++ - more twists than Game of Thrones.', 300, '0321714113');
export let programming5 = new Book('programming5', 'SICP', 'Let\'s dive in a little deeper.', 400, '0262510871');

createCompletedOrReadingListLock(programming1, programming2);
createCompletedOrReadingListLock(programming2, programming3);
createCompletedOrReadingListLock(programming3, programming4);
createCompletedOrReadingListLock(programming4, programming5);

export let programming = new Area('area_programming', 'Programming', [
    programming1,
    programming2,
    programming3,
    programming4,
    programming5
]);

let y = new LevelAddMultModifier('programming_research_level_mod', 'Research: Programming', 2, programming.xp, 0.01);
for (let yugleJob of yugle.jobs) {
    yugleJob.income.addModifier(y);
}

programming.effect = '+1% Yugle Pay';
createLevelLock(programming, unpaidIntern, 10);
createLevelLock(programming, juniorDeveloper, 20);
