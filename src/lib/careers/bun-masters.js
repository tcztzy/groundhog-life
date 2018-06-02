import { createLevelLockChain, createLevelLock } from "../locks";
import { configureXpProgression } from "../xp";
import { Job, configurePayProgression } from "./job";
import { Career } from "./career";
import { leadership } from "../leadership";

let bm1 = new Job('bm1', 'Burger Flipper', 10, true);
let bm2 = new Job('bm2', 'Chief Flipper');
let bm3 = new Job('bm3', 'Kitchen Manager');
let bm4 = new Job('bm4', 'Shift Manager');
let bm5 = new Job('bm5', 'Assistant Manager');
let bm6 = new Job('bm6', 'Restaurant Manager');
let bm7 = new Job('bm7', 'Regional Manager');
let bm8 = new Job('bm8', 'Chief Strategist');
let bm9 = new Job('bm9', 'CEO');
let bmProgression = [
    bm1,
    bm2,
    bm3,
    bm4,
    bm5,
    bm6,
    bm7,
    bm8,
    bm9
];

configureXpProgression(bmProgression, 600, 2.2, 8);
configurePayProgression(bmProgression, 5, 250, 2);
createLevelLockChain(bmProgression, 10);
createLevelLock(leadership, bm4, 10);
createLevelLock(leadership, bm7, 50);
createLevelLock(leadership, bm9, 100);
export { bm1 as burgerFlipper, bm9 as bunMastersCeo };
export let bunMasters = new Career('bunMasters', 'BunMasters', bmProgression);
