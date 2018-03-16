import { Career } from './career';
import { configurePayProgression, Job } from "./job";
import { createLevelLockChain } from "../locks";
import {configureXpProgression} from '../xp';

export let unpaidIntern = new Job('yugle1', 'Unpaid Intern');
export let juniorDeveloper = new Job('yugle2', 'Junior Developer');
export let softwareEngineer = new Job('yugle3', 'Software Engineer');
export let projectLead = new Job('yugle4', 'Project Lead');
export let teamLead = new Job('yugle5', 'Team Lead');
export let seniorArchitect = new Job('yugle6', 'Senior Architect');
export let divisionLead = new Job('yugle7', 'Division Lead');
export let productManager = new Job('yugle8', 'Product Manager');
export let cto = new Job('yugle9', 'CTO');
export let yugleCeo = new Job('yugle10', 'CEO');
let jobs = [
    unpaidIntern,
    juniorDeveloper,
    softwareEngineer,
    projectLead,
    teamLead,
    seniorArchitect,
    divisionLead,
    productManager,
    cto,
    yugleCeo
];
configureXpProgression(jobs, 1100, 2, 8);
configurePayProgression(jobs, 10, 250, 2);
unpaidIntern.setBasePay(0);
createLevelLockChain(jobs, 10);
export let yugle = new Career('yugle', 'Yugle', jobs);
