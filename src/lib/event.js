import { BasicEntity } from './basic-entity';
import { currentDay } from "./game-time";
import { eventPane } from './panes';
import { createUnlockedLock, createSelectedLock, createCustomLock } from './locks';
import { logCustomEvent } from "./market/kongregate";

class w {
    executed = false;
    executedOnDay = null;
    timesExecuted = 0;
}

class P {
    selected = false;
    enabled = true;
    countSelected = 0;
}

class x extends BasicEntity {

    prestige() {
        this.state.selected = false;
        this.state.enabled = true;
    }

    update() {
        super.update();
    }
}

export function createPath(module, exports, require) {
    let n = new x(module, exports, new P());
    createSelectedLock(n, require);
    return n;
}

class C  extends BasicEntity {
    prestige() {
        this.state.executed = false;
        this.state.executedOnDay = null;
    }
    executeAction() {
        if (!this.state.executed && currentDay.getValue() > 10) {
            this.state.executed = true;
            this.state.executedOnDay = currentDay.getValue();
            this.state.timesExecuted += 1;
            this.action();
        }
    }
    update() {
        const module = this.unlocked();
        super.update();
        const require = this.unlocked();
        if (require && !this.executed)
            this.executeAction();
        if (!module && require) {
            eventPane.notify();
            this.event.state.expanded = true;
        }
    }
}

export function createNode(module, exports, require, action=x=>x) {
    let r = new C(module, exports, new w());
    if (require)
        createUnlockedLock(r, require);
    r.action = action;
    return r;
}

class L extends C {
    constructor(module, require, choiceFun, choices) {
        super(module, require, new w());
        this.choiceFun = choiceFun;
        this.choices = choices;
        this.state.choiceMade = -1;
    }

    executeAction() {
        if (!this.state.executed) {
            this.state.choiceMade = this.choiceFun();
            logCustomEvent('auto_choice', this.choices[this.state.choiceMade].id);
            this.state.executed = true;
            this.state.executedOnDay = currentDay.getValue();
            this.state.timesExecuted += 1;
            this.action();
            this.update();
        }
    }

    prestige() {
        this.state.choiceMade = -1;
        super.prestige();
    }
}

export function createAutoChoiceNode(module, exports, require, n, action=x=>x) {
    let i = new L(module, exports, require, n);
    i.action = action;
    function s(module) {
        createCustomLock([i], n[module], () => i.state.choiceMade === module);
    }
    for (let o = 0; o < n.length; o++)
        s(o);
    return i;
}

class S extends C {
    constructor(module, require, paths) {
        super(module, require, new w());
        this.paths = paths;
    }

    selectPath(module) {
        if (module.state.enabled) {
            for (const path of this.paths) {
                path.state.enabled = false;
            }
            module.state.countSelected++;
            module.state.selected = true;
            module.update();
        }
        this.update();
    }
}

export function createUserChoiceNode(module, exports, require, action=x=>x) {
    let r = new S(module, exports, require);
    r.action = action;
    return r;
}


class A {
    completed = false;
    expanded = true;
}

class Event extends BasicEntity {
    constructor(id, name, nodes) {
        super(id, name, new A());
        this.nodes = nodes;
    }
}

export function createEvent(module, exports, require) {
    let event = new Event(module, exports, require);
    for (let c of require) {
        c.event = event;
    }
    createUnlockedLock(event, require[0]);
    return event;
}
