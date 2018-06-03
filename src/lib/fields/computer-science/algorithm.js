import { Book } from "../../book";
import { Area } from "../../area";
import { createCompletedOrReadingListLock } from "../../locks";
import { LevelAddMultModifier } from "../../modifiers/modifier";
import { programming } from "./programming";

export let alg1 = new Book('alg1', 'Introduction to Algorithms', 'Balancing those binary trees in no time.', 500, '0262033844');
export let alg2 = new Book('alg2', 'Algorithm Design Manual', 'How to implement algorithms well.', 500, '1848000693');
export let alg3 = new Book('alg3', 'Concrete Mathematics', 'Finetuning your Skills', 2000, '0201558025');

createCompletedOrReadingListLock(alg1, alg2);
createCompletedOrReadingListLock(alg2, alg3);


export let alg = new Area('area_alg', 'Algorithms', [
    alg1,
    alg2,
    alg3
]);

let modifier = new LevelAddMultModifier('alg_research_level_mod', 'Research: Algorithms', 2, alg.xp, 0.01);

programming.xp.xpPerHourStat.addModifier(modifier);

alg.effect = '+1% Programming Research Speed';
