var n = require('./70'), r = require('./124');
import { createLevelLock } from "./locks";
import { LevelAddMultModifier } from "./modifiers/modifier";
import { Area } from "./area";
import { lambdaComplexTrainee, darkPlateauCeo } from "./careers/dark-plateau";

export let dmScanner = new Area('area_dmScanner', 'Dark Matter Scanning', []);
export let anomaly = new Area('area_investigateAnomaly', 'Investigate Anomaly', []);
export let mirrorMatter = new Area('area_mirrorMatter', 'Mirror Matter Theory', []);
export let demirrorAnomaly = new Area('area_demirror', 'Unmirror Anomaly', []);
export let studyMirroredShip = new Area('area_studyMirroredShip', 'Study Mirrored Ship', []);
export let laserGun = new Area('area_constructPowerPlant', 'Laser Gun', []);
laserGun.effect = '+10% Laser Gun Damage';
export let loopTrapResearch = new Area('area_loopTrap', 'Loop Trap Device', []);
loopTrapResearch.effect = 'Increases Loop Trap Device efficiency';
let m = [
    r.qm,
    dmScanner,
    anomaly,
    mirrorMatter,
    demirrorAnomaly,
    studyMirroredShip,
    laserGun,
    loopTrapResearch
];
for (let i = 1; i < m.length - 2; i++) {
    let g = new LevelAddMultModifier(m[i].id + '_level_mod', 'Research: ' + m[i].name, 2, m[i].xp, 0.01);
    m[i + 1].xp.xpPerHourStat.addModifier(g);
    m[i].effect = '+1% ' + m[i + 1].name + ' Research';
    createLevelLock(m[i], m[i + 1], 50 * i);
}
createLevelLock(lambdaComplexTrainee, dmScanner, 1);
createLevelLock(studyMirroredShip, loopTrapResearch, 250);
createLevelLock(darkPlateauCeo, laserGun, 10);
createLevelLock(darkPlateauCeo, loopTrapResearch, 10);
export let physics = new n.Field('physics', 'Physics', m);
