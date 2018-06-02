import { BasicEntity } from "./basic-entity";
import { Stat } from "./stats/stat";
import { createSelectedLock } from "./locks";
import { StatEffectiveAddModifier } from "./modifiers/modifier";
import { chores, freeTime } from "./activities";
import { minimalism } from "./market/extra";
import { currentYear } from "./game-time";
import { dailyExpensesStat, dailyNetIncomeStat } from "./stats/currency-stat";
import { currentHomeContainer } from "./containers/home-container";
import { money } from "./currency";

class State {
    constructor(selected, initialCost) {
        this.selected = selected;
        this.initialCost = initialCost;
    }
}

class x extends BasicEntity {
    constructor(id, name, n, r, initialCost, o, u, selected=false) {
        super(id, name, new State(selected, initialCost));
        this.description = n;
        this.rent = new Stat(this.id + '_rent', this.name + ' Rent', r, 2, '$');
        let f = new StatEffectiveAddModifier(this.id + '_rent_expense_mod', 'Rent for ' + this.name, 1, this.rent);
        createSelectedLock(this, f);
        dailyExpensesStat.addModifier(f);
        this.initialCost = new Stat(this.id + 'initial_cost', 'Initial Cost', initialCost, 0, '$');
        this.originalInitialCost = initialCost;
        this.choresTime = new Stat(this.id + '_chores', 'Chores', o, 0, '', '', true, true, 0);
        let h = new StatEffectiveAddModifier(this.id + '_chores_mod', 'Chores at ' + this.name, 1, this.choresTime);
        createSelectedLock(this, h);
        chores.duration.addModifier(h);
        this.quality = new Stat(this.id + '_quality', 'Home Quality', u, 0);
        if (selected) {
            currentHomeContainer.home = this;
            currentHomeContainer.update();
        }
    }
    enoughFreeTime() {
        return freeTime.duration.effective >= this.choresTime.effective - currentHomeContainer.home.choresTime.effective;
    }
    enoughMoney() {
        return this.initialCost.effective <= 0.001 || money.getValue() >= this.initialCost.effective;
    }
    enoughIncome() {
        return dailyNetIncomeStat.effective >= this.rent.effective - currentHomeContainer.home.rent.effective;
    }
    activate(payed=true) {
        this.state.selected = true;
        if (payed)
            money.add(-this.initialCost.effective);
        this.state.initialCost = 0;
        this.initialCost.setBase(0);
        this.update();
    }

    deactivate() {
        this.state.selected = false;
        this.update();
    }

    prestige() {
        this.initialCost.setBase(this.originalInitialCost);
        this.state.initialCost = this.originalInitialCost;
        this.state.selected = 'home_parentsBasement' === this.id;
        if (this.state.selected)
            currentHomeContainer.setCurrent(this);
    }

    postPrestigeAssert() {
        this.state.selected = 'home_parentsBasement' === this.id;
    }
    onLoad() {
        if (this.state.selected)
            currentHomeContainer.home = this;
        this.initialCost.setBase(this.state.initialCost);
    }
}

export let parentsBasement = new x('home_parentsBasement', 'Parents Basement', 'Still gotta\' do your part', 10, 0, 30, 1, true);
let sharedApartment = new x('home_sharedApartment', 'Shared Apartment', 'WHAT\'S THAT THING IN THE SINK?', 25, 500, 60, 2);
let studioApartment = new x('home_studioApartment', 'Studio Apartment', 'This is the living room. Also the kitchen. And bedroom.', 50, 1000, 90, 3);
let tinyApartment = new x('home_tinyApartment', 'Tiny Apartment', 'Two rooms!', 70, 2000, 120, 4);
let regularApartment = new x('home_regularApartment', 'Normal Apartment', 'Just a normal apartment in an ordinary neighbourhood.', 100, 6000, 150, 5);
let fancyApartment = new x('home_fancyApartment', 'Fancy Apartment', 'Look at that shower!', 200, 10000, 180, 6);
let penthouse = new x('home_penthouse', 'Penthouse', 'On top of things.', 400, 20000, 210, 7);
let smallHouse = new x('home_smallHouse', 'Small House', 'Five rooms!', 600, 25000, 240, 8);
let house = new x('home_house', 'House', 'A house.', 800, 40000, 270, 9);
let mansion = new x('home_mansion', 'Mansion', 'Living like a king, except no style.', 1000, 50000, 300, 1000);
let happinessCeiling = 0.6;
export function homeToHappinessFun(module) {
    let exports = minimalism.getValue() ? 5 : 0;
    let elder = Math.floor(currentYear.getValue() / (5 + exports));
    let happiness = happinessCeiling * (0.5 + 0.25 * (module - elder));
    happiness = Math.max(happiness, 0);
    return Math.min(happiness, happinessCeiling);
}
export const homes = [
    parentsBasement,
    sharedApartment,
    studioApartment,
    tinyApartment,
    regularApartment,
    fancyApartment,
    penthouse,
    smallHouse,
    house,
    mansion
];
