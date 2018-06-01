import { BasicEntity } from "./basic-entity";

class State {
    constructor(timeLeft) {
        this.completed = false;
        this.onReadingList = false;
        this.timeLeft = timeLeft;
        this.originalTimeLeft = timeLeft;
        this.readingListPosition = 0;
        this.timesCompleted = 0;
    }
}

export class Book extends BasicEntity {
    constructor(id, name, description, hours, asin='') {
        super(id, name, new State(hours));
        this.description = description;
        this.hours = hours;
        this.asin = asin;
        this.effect = '';
    }
}
