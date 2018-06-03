import { Achievement, AG } from "./achievement";
import { currentLife, currentLoop, currentLifeThisLoop } from "@/lib/life-loop";
import { yugle, yugleCeo } from "@/lib/careers/yugle";
import { burgerFlipper, bunMastersCeo } from "@/lib/careers/bun-masters";
import { labCleaner, lambdaComplexTrainee, darkPlateauCeo } from "@/lib/careers/dark-plateau";
import { happinessStat } from "@/lib/stats/happiness-stat";
import { molecularCooking } from "@/lib/food";
import { battle } from "@/lib/battle";
import { sleep } from "@/lib/activities";
import { laserGun } from "@/lib/research/physics";
import { money } from "@/lib/currency";
import { programming } from "@/lib/research/computer-science/programming";
import { alg } from "@/lib/research/computer-science/algorithm";
import { se } from "@/lib/research/computer-science/software-engineering";
import { investment } from "@/lib/research/business/investment";
import { keep } from "@/lib/events/lost-wallet";

export let achievements = [];


let edge_of_retirement = new Achievement('achievement_edge_of_retirement', 'Edge of Retirement', 'Start over once', function () {
    return currentLife.getValue() - 1;
}, 1);
currentLife.subscribe(edge_of_retirement);
let samsara = new Achievement('achievement_samsara', 'Samsara', 'Start over ten times', function () {
    return currentLife.getValue() - 1;
}, 10);
currentLife.subscribe(samsara);
let sideway8 = new Achievement('achievement_sideways8', 'Sideways 8', 'Start over fifty times', function () {
    return currentLife.getValue() - 1;
}, 50);
currentLife.subscribe(sideway8);
let loop1 = new Achievement('ach_loop1', 'Loop while you loop', 'Use Loop Trap device once', function () {
    return currentLoop.getValue() - 1;
}, 1);
currentLoop.subscribe(loop1);
let loop2 = new Achievement('ach_loop2', 'Quantum Samsara', 'Use Loop Trap device ten times', function () {
    return currentLoop.getValue() - 1;
}, 10);
currentLoop.subscribe(loop1);
let loop3 = new Achievement('ach_loop3', 'Loops all the way down!', 'Use Loop Trap device twenty times', function () {
    return currentLoop.getValue() - 1;
}, 20);
currentLoop.subscribe(loop1);

let ag_circle_of_life = new AG('ag_circle_of_life', 'Circle of Life', [
    edge_of_retirement,
    samsara,
    sideway8,
    loop1,
    loop2,
    loop3
]);

achievements.push(ag_circle_of_life);


let L = new Achievement('ach_envy', 'Envy', 'Keep Mrs Pennywise\' wallet', function () {
    return keep.state.countSelected;
}, 1);
keep.subscribe(L);
let S = new Achievement('ach_gluttony', 'Gluttony', 'Hire Molecular Cooking Crew for a year', function () {
    return molecularCooking.state.daysActive;
}, 365);
molecularCooking.subscribe(S);
let A = new Achievement('ach_greed', 'Greed', 'Investment Research Level 500', function () {
    return investment.xp.highestLevelEverIncludingThisLife();
}, 500);
investment.xp.subscribe(A);
let I = new Achievement('ach_sloth', 'Sloth', 'Sleep for 22 Hours', function () {
    return sleep.duration.state.highestEffectiveEver / 60;
}, 22);
sleep.duration.subscribe(I);
let T = new Achievement('ach_wrath', 'Wrath', 'Destroy 1000 Alien Ships', function () {
    return battle.state.enemiesDestroyedTotal;
}, 1000);
battle.subscribe(T);

let ag_seven_deadly_sins = new AG('ag_seven_deadly_sins', 'Seven Deadly Sins*', [
    L,
    S,
    A,
    I,
    T
]);

achievements.push(ag_seven_deadly_sins);


let millionaire = new Achievement('achievement_millionaire', 'Millionaire', 'Have a million dollars', function () {
    return money.state.maximum;
}, 1000000);
money.subscribe(millionaire);
let billionaire = new Achievement('achievement_billionaire', 'Billionaire', 'Have a billion dollars', function () {
    return money.state.maximum;
}, 1000000000);
money.subscribe(billionaire);
let trillionaire = new Achievement('achievement_trillionaire', 'Rockefeller', 'Have a trillion dollars', function () {
    return money.state.maximum;
}, 1000000000000);
money.subscribe(trillionaire);
let ag_money = new AG('ag_money', 'Money', [
    millionaire,
    billionaire,
    trillionaire
]);

achievements.push(ag_money);


let B = new Achievement('achievement_flippin_faster', 'Flippin\' Faster', 'Level 10 Burger Flipper in less than 100 days', function () {
    return burgerFlipper.xp.getMinDaysToLevel(10);
}, 100, function (module, exports) {
    return module <= exports;
});
burgerFlipper.xp.subscribe(B);
let R = new Achievement('achievement_flippin_fantastic', 'Flippin\' Fantastic', 'Level 100 Burger Flipping', function () {
    return burgerFlipper.xp.highestLevelEverIncludingThisLife();
}, 100);
burgerFlipper.xp.subscribe(R);
let V = new Achievement('achievement_flipping_livetimes', 'Zen of Flipping', 'Level 1000 Burger Flipper', function () {
    return burgerFlipper.xp.highestLevelEverIncludingThisLife();
}, 1000);
burgerFlipper.xp.subscribe(V);
let G = new Achievement('achievement_burgerKing', 'Burger King', 'Become Bun Masters CEO', function () {
    return bunMastersCeo.xp.highestLevelEverIncludingThisLife();
}, 1);
bunMastersCeo.xp.subscribe(G);

let ag_bunmasters = new AG('ag_bunmasters', 'Path of the Burgerflipper', [
    B,
    R,
    V,
    G
]);

achievements.push(ag_bunmasters);


let H = new Achievement('achievement_intern_master', 'Master Intern', 'Level 100 Unpaid Intern', function () {
    return yugle.jobs[0].xp.highestLevelEverIncludingThisLife();
}, 100);
yugle.jobs[0].xp.subscribe(H);
let F = new Achievement('achievement_butwhy', 'But Why?', 'Level 1000 Unpaid Intern', function () {
    return yugle.jobs[0].xp.highestLevelEverIncludingThisLife();
}, 1000);
yugle.jobs[0].xp.subscribe(F);
let Y = new Achievement('achievement_carmack', 'Carmackesque', 'Level 500 Programming Research', function () {
    return programming.xp.highestLevelEverIncludingThisLife();
}, 500);
programming.xp.subscribe(Y);
let U = new Achievement('achievement_donKnuth', 'Knuthish', 'Level 500 Algorithms Research', function () {
    return alg.xp.highestLevelEverIncludingThisLife();
}, 500);
alg.xp.subscribe(U);
let J = new Achievement('achievement_linus', 'Linusian', 'Level 500 Software Engineering', function () {
    return se.xp.highestLevelEverIncludingThisLife();
}, 500);
se.xp.subscribe(J);
let W = new Achievement('achievement_mayering', 'Marissa?', 'Level 10 Yugle CEO before Age 40', function () {
    return yugleCeo.xp.getMinDaysToLevel(10);
}, 7665, function (module, exports) {
    return module <= exports;
});
yugleCeo.xp.subscribe(W);
let ag_yugle = new AG('ag_yugle', 'Path of the Code Monkey', [
    H,
    F,
    W,
    Y,
    U,
    J
]);

achievements.push(ag_yugle);


let achievement_happy = new Achievement('achievement_happy', 'Happy', 'Be at least 1.8 Happy', function () {
    return happinessStat.state.highestEffectiveEver;
}, 1.8);
happinessStat.subscribe(achievement_happy);
let achievement_miserable = new Achievement('achievement_miserable', 'Miserable', 'Be less than 0.1 Happy', function () {
    return happinessStat.state.lowestEffectiveEver;
}, 0.1, function (module, exports) {
    return module <= exports;
});
happinessStat.subscribe(achievement_miserable);

let ag_mood = new AG('ag_mood', 'Mood', [
    achievement_happy,
    achievement_miserable
]);

achievements.push(ag_mood);


let dark_plateau = new Achievement('achievement_dark_plateau', 'Welcome...', '...to the Dark Plateau Transit System', function () {
    return labCleaner.xp.highestLevelEverIncludingThisLife();
}, 1);
labCleaner.xp.subscribe(dark_plateau);
let freeman = new Achievement('achievement_freeman', 'Gordon', 'Unlock the Greek Letter Complex', function () {
    return lambdaComplexTrainee.xp.highestLevelEverIncludingThisLife();
}, 1);
lambdaComplexTrainee.xp.subscribe(freeman);
let not_breen = new Achievement('achievement_not_breen', 'Kleiner', 'Level 10 Dark Plateau CEO', function () {
    return darkPlateauCeo.xp.highestLevelEverIncludingThisLife();
}, 10);
darkPlateauCeo.xp.subscribe(not_breen);
let laser_gun = new Achievement('achievement_laser_gun', 'Planetary Gunslinger', 'Level 1 Lasergun', function () {
    return laserGun.xp.highestLevelEverIncludingThisLife();
}, 1);
laserGun.xp.subscribe(laser_gun);
let groundhog_king = new Achievement('achievement_groundhog_king', 'Groundhog King', 'Use the LoopTrapDevice in two lives in a row', function () {
    return currentLifeThisLoop.minLivesToLoopTrap.getValue();
}, 1, function (module, exports) {
    return module <= exports;
});
currentLifeThisLoop.subscribe(groundhog_king);

let ag_lambda = new AG('ag_lambda', 'Path of the Physicist', [
    dark_plateau,
    freeman,
    not_breen,
    laser_gun,
    groundhog_king
]);

achievements.push(ag_lambda);
