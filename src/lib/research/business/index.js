import { Field } from "../field";
import { leadership } from "./leadership";
import { investment } from "./investment";

export let business = new Field('business', 'Business', [
    leadership,
    investment
]);
