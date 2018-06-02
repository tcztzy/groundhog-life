import { Field } from "./field";
import { createLevelLock } from "./locks";
import { programming } from "./programming";
import { alg } from "./algorithm";
import { se } from "./software-engineering";

export let compsci = new Field('compsci', 'Computer Science', [
    programming,
    alg,
    se
]);
createLevelLock(programming, alg, 10);
createLevelLock(programming, se, 20);
