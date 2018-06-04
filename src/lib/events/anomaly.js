import { createEvent, createNode } from "@/lib/events/event";
import { createLevelLock } from "@/lib/locks";
import { dmScanner, anomaly, mirrorMatter, demirrorAnomaly, studyMirroredShip, laserGun } from "@/lib/research/physics/index";

let a13b = createNode('event_a13b', 'You start researching mirrored laser guns.', null),
    a13b0 = createNode('event_a13b0', 'You need to be CEO of Dark Plateau to build weapons.', a13b),
    a13 = createNode('event_a13', 'Consider destroying it. But there might be more than one.', a13b0),
    a12 = createNode('event_a12', 'Maybe that thing is responsible for the loop you\'re stuck in.', a13),
    a10 = createNode('event_a11', 'Furthermore, it seems to move at high speed towards the solar system.', a12),
    a9 = createNode('event_a10', 'There are power generators, engines, and thousands of moving organic entities.', a10),
    a8 = createNode('event_a9', 'In SciFi-terms, it looks like a spaceship.', a9),
    a7 = createNode('event_a8', 'By reversing formulas for dark matter concentration, you create a model of the mirror-matter anomaly.', a8),
    a6 = createNode('event_a7', 'Theory: the anomaly is induced by mirror-matter, similar in structure to ordinary matter yet undetectable.', a7),
    a5 = createNode('event_a5', 'This is highly unusual.', a6),
    a4 = createNode('event_a4', 'Such patterns can be induced by ordinary matter, but the sector appears empty.', a5),
    a3 = createNode('event_a3', 'The dark matter in this sector seems to follow geometric patterns.', a4),
    a2 = createNode('event_a2', '\'Running DM Scanner 7.42...WARNING: major formula mismatch in Sector 7G\'', a3),
    a1 = createNode('event_a1', 'You\'re testing a new formula for dark matter concentration in space.', a2);
let nodes = [
    a1,
    a2,
    a3,
    a4,
    a5,
    a6,
    a7,
    a8,
    a9,
    a10,
    a12,
    a13,
    a13b0,
    a13b
];
export let anomalyEvent = createEvent('event_anomaly', 'First Contact', nodes);
createLevelLock(dmScanner, anomalyEvent, 10);
createLevelLock(dmScanner, a1, 10);
createLevelLock(dmScanner, a2, 15);
createLevelLock(dmScanner, a3, 45);
createLevelLock(anomaly, a5, 5);
createLevelLock(anomaly, a6, 95);
createLevelLock(mirrorMatter, a7, 110);
createLevelLock(demirrorAnomaly, a8, 190);
createLevelLock(studyMirroredShip, a9, 240);
createLevelLock(laserGun, a13b, 1);
