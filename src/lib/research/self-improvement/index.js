import { Field } from "../field";
import { studySkills } from "./study-skills";
import { getStuffDone } from "./get-stuff-done";
import { nutrition } from "./nutrition";

export let selfImprovement = new Field('selfimprovement', 'Self Improvement', [
    studySkills,
    getStuffDone,
    nutrition
]);
