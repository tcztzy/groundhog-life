import { bunMasters } from "./bun-masters";
import { yugle } from "./yugle";
import { darkPlateau } from "./dark-plateau";

export let careers = [
    bunMasters,
    yugle,
    darkPlateau
];
export let jobs = [...careers.map(career => career.jobs)];
