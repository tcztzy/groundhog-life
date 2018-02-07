import { BasicEntity } from "./basic-entity";
import { currentDay } from "./game-time";
import { currentLife } from "./life-loop";

class y {
    entries = [];
}

class Record {
    constructor(level, message, reporter, eventCode) {
        this.level = level;
        this.message = message;
        this.reporter = reporter;
        this.eventCode = eventCode;
        this.timestamp = currentDay.getValue();
        this.timestampAge = [
            18 + currentDay.getYear(),
            currentDay.getDayOfYear()
        ];
        this.life = currentLife.getValue();
    }
}

class Logger extends BasicEntity {
    OTHER = 0;
    STORY = 1;
    LVL_INFO = 5;
    JOBSELECTED = 10;
    BOOK_COMPLETED = 11;
    RESEARCH_SELECTED = 12;
    HOME_SELECTED = 13;
    UNLOCK = 14;
    constructor() {
        super('logger', 'Logger', new y());

    }

    info(module, exports, require=0) {
        this._log(this.LVL_INFO, module, exports, require);
    }

    _log(module, exports, require, n) {
        let record = new Record(module, exports, require, n);
        this.state.entries.unshift(record);
        while (this.state.entries.length > 100)
            this.state.entries.pop();
    }
}

export let log = new Logger();
