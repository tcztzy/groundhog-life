import { groundHogging } from "./ground-hogging";
import { anomalyEvent } from "./anomaly";
import { lostWallet } from "./lost-wallet";

var i = require('./dark-plateau');
export const events = [
    groundHogging,
    anomalyEvent,
    i.dp,
    lostWallet
];
