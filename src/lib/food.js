import { currentJobContainer } from "./career-containers";
import { eat, freeTime } from "./activities";
import { formatMinutes } from "./utils";
import { messageBox } from "./message-box";
import { dailyNetIncomeStat } from "./stats/currency-stat";
import { createSelectedLock } from "./locks";
import { Stat } from "./stats/stat";
import { BasicEntity } from "./basic-entity";
import { AddModifier } from "./modifiers/modifier";
import {yugle} from './careers/yugle';

export let foodCostsPerDayStat = new Stat('foodCostsPerDayStat', 'Food costs/day', 0);
export let foodQualityStat = new Stat('foodquality', 'Food Quality', 0, 2);

class I {
    daysActive = 0;

    constructor(selected) {
        this.selected = selected;
    }
}


class FoodOption extends BasicEntity {
    constructor(id, name, time, cost, quality, selected=false) {
        super(id, name, new I(selected));
        this.time = time;
        this.cost = cost;
        this.quality = quality;
        let timeModifier = new AddModifier(this.id + '_time', this.name, 1, this.time);
        createSelectedLock(this, timeModifier);
        eat.duration.addModifier(timeModifier);
        let costModifier = new AddModifier(this.id + '_cost', this.name, 1, this.cost);
        createSelectedLock(this, costModifier);
        foodCostsPerDayStat.addModifier(costModifier);
        let qualityModifier = new AddModifier(this.id + '_quality', this.name, 1, this.quality);
        createSelectedLock(this, qualityModifier);
        foodQualityStat.addModifier(qualityModifier);
    }

    prestige () {
        if ('simplecooking' === this.id)
            selectFoodOption(this);
        super.prestige();
    }

    enoughFreeTime() {
        return freeTime.duration.effective >= this.time - selectedFoodOption.time;
    }

    enoughMoney() {
        return dailyNetIncomeStat.effective >= this.cost - selectedFoodOption.cost;
    }

    dayCounter() {
        if (this.state.selected) {
            if ('yuglecampus' === this.id && currentJobContainer.job.career !== yugle)
                selectFoodOption(fastFood);
            else
                this.state.daysActive += 1;
            this.update();
        }
    }

    onLoad() {
        if (this.state.selected)
            selectedFoodOption = this;
        super.onLoad();
    }
}
export let studentCuisine = new FoodOption('simplecooking', 'Student Cuisine', 90, 20, 0.25, !0);
export let fastFood = new FoodOption('fastfood', 'BunMasters', 60, 30, 0.25);
let regularCooking = new FoodOption('regularcooking', 'Regular Cooking', 120, 30, 0.9);
export let yugleCampus = new FoodOption('yuglecampus', 'Yugle Campus', 60, 50, 1.25);
let fancyCooking = new FoodOption('fancycooking', 'Fancy Cooking', 180, 70, 2);
let personalChef = new FoodOption('personalChef', 'Personal Chef', 60, 700, 2);
let threeStarCook = new FoodOption('threestarcook', 'Three Star Personal Chef', 60, 5000, 3);
export let molecularCooking = new FoodOption('molecularCooking', 'Molecular Cooking Crew', 60, 50000, 4);

let selectedFoodOption = studentCuisine;

export let foodOptions = [
    studentCuisine,
    fastFood,
    regularCooking,
    yugleCampus,
    fancyCooking,
    personalChef,
    threeStarCook,
    molecularCooking
];
export let selectFoodOption = function (foodOption) {
    if (foodOption === yugleCampus && currentJobContainer.job.career !== yugle)
        return void messageBox.addMessage('Need to work at Yugle to eat on Yugle Campus!');
    let timeDelta = foodOption.time - selectedFoodOption.time;
    let hasEnoughTime = freeTime.duration.effective >= timeDelta;
    if (hasEnoughTime) {
        for (let x of foodOptions) {
            x.state.selected = false;
        }
        foodOption.state.selected = true;
        selectedFoodOption.update();
        foodOption.update();
        eat.duration.update();
        selectedFoodOption = foodOption;
    } else
        messageBox.addMessage('Not enough free time! Need ' + formatMinutes(timeDelta) + '.');
};
