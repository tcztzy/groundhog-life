import { createCompletedOrReadingListLock, createLevelLock } from "../../locks";
import { Area } from "../area";
import { darkPlateau } from "../../careers/dark-plateau";
import { Book } from "../book";

export let qm0 = new Book('qm0', "In Search of Schrödinger's Cat', 'Looks interesting.", 150, '0553342533');
export let qm1 = new Book('qm1', 'Quantum Physics of ...', 'Maybe this quantum stuff can help you figure things out.', 300, '047187373X');
export let qm2 = new Book('qm2', 'Principles of Quantum Mechanics', 'This is pretty difficult.', 400, '0306447908');
export let qm3 = new Book('qm3', 'Introduction to Quantum Mechanics', 'Head hurts.', 500, '0131118927');
export let qm4 = new Book('qm4', 'Modern Quantum Mechanics', 'Okay I think I get it. Maybe.', 600, '0805382917');

createCompletedOrReadingListLock(qm0, qm1);
createCompletedOrReadingListLock(qm1, qm2);
createCompletedOrReadingListLock(qm2, qm3);
createCompletedOrReadingListLock(qm3, qm4);

export let qm = new Area('area_qm', 'Quantum Mechanics', [
    qm0,
    qm1,
    qm2,
    qm3,
    qm4
]);

qm.effect = 'Exciting Career Opportunities';
createLevelLock(qm, darkPlateau.jobs[0], 50);
createLevelLock(qm, darkPlateau.jobs[6], 300);
