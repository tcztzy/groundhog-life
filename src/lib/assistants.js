import { BooleanStateEntity } from "./state-entities";
import { createTrueStateLock, createUnlockedLock, createCustomLock, createLevelLock } from "./locks";
import { messageBox } from "./message-box";
import { homes } from "./homes";
import { currentHomeContainer } from "./containers/home-container";
import { baseWorkXpPerHourStat, baseResearchXpPerHourStat } from "./stats/xp-per-hour-stat";
import { freeTime, research, work } from "./activities";
import { AddModifier, MultModifier } from "./modifiers/modifier";
import { dailyExpensesStat } from "./stats/currency-stat";
import { compsci } from "./computer-science";

class S extends BooleanStateEntity {
    constructor(id, name, description, cost, selectAllowed=()=>true, deselectAllowed=()=>true) {
        super(id, name);
        this.description = description;
        this.cost = cost;
        this.costMod = new AddModifier(this.id + '_cost_mod', this.name, 1, this.cost);
        createTrueStateLock(this, this.costMod);
        dailyExpensesStat.addModifier(this.costMod);
        this.selectAllowed = selectAllowed;
        this.deselectAllowed = deselectAllowed;
    }

    setValue(value) {
        if (!value || this.selectAllowed())
            return value || this.deselectAllowed() ? void super.setValue(value) : void messageBox.addMessage('Not enough free time to do Chores yourself!', false, 'alert-danger');
    }
}

export let cleaner = new S('assistant_cleaner', 'Cleaner', 'Reduces Your Chores by One Hour', 50, ()=>true, () =>
    freeTime.duration.effective >= 60 + Math.min(0, currentHomeContainer.home.choresTime.rawEffective));

let I = new AddModifier('cleaner_mod', 'Cleaner', 1, -60);

createTrueStateLock(cleaner, I);


export let servant = new S('assistant_servant', 'Full-time Servant', 'Reduces Your Chores by Five Hours', 1000, ()=>true, () =>
    freeTime.duration.effective >= 300 + Math.min(0, currentHomeContainer.home.choresTime.rawEffective));

let E = new AddModifier('servant_mod', 'Servant', 1, -300);

createTrueStateLock(servant, E);


for (let home of homes) {
    home.choresTime.addModifier(I);
    home.choresTime.addModifier(E);
}


export let researchAssistant = new S('assistant_research', 'Research Assistant', 'Research Speed +50%', 500);

let G = new MultModifier('researchAssistant_mod', 'Research Assistant', 10, 1.5);

createTrueStateLock(researchAssistant, G);

baseResearchXpPerHourStat.addModifier(G);

createCustomLock([research], researchAssistant.costMod, function () {
    return research.duration.effective > 0;
});


export let secretary = new S('assistant_secretary', 'Personal Secretary', 'Work Experience +50%', 500);

let H = new MultModifier('secretary_mod', 'Secretary', 10, 1.5);

createTrueStateLock(secretary, H);

baseWorkXpPerHourStat.addModifier(H);

createCustomLock([work], secretary.costMod, function () {
    return work.duration.effective > 0;
});

let AIAssistants = [];
for (let i = 1; i < 8; i++) {
    let accelerate = 10;
    let AIAssistant = new S('assistant_ai_research_' + i, 'AI Research Assistant ' + i, 'Research Speed +' + accelerate + '%', 50 * i);
    let W = new MultModifier('aiResearchAssistant_mod_' + i, 'AI Research Assistant ' + i, 10, 1 + accelerate / 100);
    createTrueStateLock(AIAssistant, W);
    baseResearchXpPerHourStat.addModifier(W);
    createLevelLock(compsci.areas[(i - 1) % 3], AIAssistant, 100 * i);
    AIAssistants.push(AIAssistant);
    createCustomLock([research], AIAssistant.costMod, function () {
        return research.duration.effective > 0;
    });
    if (i > 1)
        createUnlockedLock(AIAssistants[i - 2], AIAssistant);
}
export let assistants = [
    cleaner,
    servant,
    researchAssistant,
    secretary
].concat(AIAssistants);
