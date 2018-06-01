import { BooleanStateEntity, NumberStateEntity } from '../state-entities';
import { userInventory } from './market';

export let autoPromote = new BooleanStateEntity('autoPromote', 'Auto Promote', false, false, function () {
    return userInventory.haveAutoPromote;
});
export let autoPromoteMinLevel = new NumberStateEntity('autoPromoteML', 'Auto Promote Min Level', 10, false);
export let autoPromoteJustPause = new BooleanStateEntity('autoPromoteJustPause', 'Just Pause', false, false);
export let autoResearch = new BooleanStateEntity('autoResearch', 'Auto Research', false, false, function () {
    return userInventory.haveAutoResearch;
});
export let autoResearchJustPause = new BooleanStateEntity('autoResearchJustPause', 'Just Pause', false, false);
export let autoBoost = new BooleanStateEntity('autoBoost', 'Auto Boost', false, false, function () {
    return userInventory.haveAutoBoost;
});
export let autoBoostExclConference = new BooleanStateEntity('autoBoostExlConf', 'Auto Boost - Exclude Conference', false, false);
export let autoBoostJustPause = new BooleanStateEntity('autoBoostJustPause', 'Just Pause', false, false);
export let autoBoostStack = new BooleanStateEntity('autoBoostStack', 'Stack', true, false);
