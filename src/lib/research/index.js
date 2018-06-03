import { selfImprovement } from './self-improvement';
import { business } from "@/lib/research/business";
import { compsci } from "./computer-science";
import { physics } from "./physics";

export let fields = [
    selfImprovement,
    business,
    compsci,
    physics
];
export let areas = [...fields.map(field=>field.areas)];
