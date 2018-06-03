import { Job, configurePayProgression } from "./job";
import { Career } from "./career";
import { createLevelLockChain } from "@/lib/locks";
import { configureXpProgression } from "@/lib/xp";

export let labCleaner = new Job('dp1', 'Lab Cleaner');
export let labAssistant = new Job('dp2', 'Lab Assistant');
export let juniorScientist = new Job('dp3', 'Junior Scientist');
export let scientist = new Job('dp4', 'Scientist');
export let seniorScientist = new Job('dp5', 'Senior Scientist');
export let labSupervisor = new Job('dp6', 'Lab Supervisor');
export let lambdaComplexTrainee = new Job('dp7', 'Lambda Trainee');
export let lambdaComplexScientist = new Job('dp8', 'Lambda Scientist');
export let lambdaComplexChief = new Job('dp9', 'Lambda Chief');
export let darkPlateauCeo = new Job('dp10', 'CEO');
let y = [
    labCleaner,
    labAssistant,
    juniorScientist,
    scientist,
    seniorScientist,
    labSupervisor,
    lambdaComplexTrainee,
    lambdaComplexScientist,
    lambdaComplexChief,
    darkPlateauCeo
];
configureXpProgression(y, 2200, 2, 8);
configurePayProgression(y, 30, 400, 2);
createLevelLockChain(y, 10);
export let darkPlateau = new Career('dark_plateau', 'Dark Plateau', y);
