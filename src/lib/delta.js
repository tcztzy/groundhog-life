import { NumberStateEntity } from "@/lib/state-entities";

export const delta = new NumberStateEntity('schedule_delta', 'Delta', 60, false, 0, 1440);
delta.onLoad = function () {
    delta.setValue(60);
};
