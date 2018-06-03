import { BasicEntity } from '@/lib/basic-entity';
import { currentDay } from "@/lib/game-time";
import { eventPane } from '@/lib/panes';
import { createUnlockedLock, createSelectedLock, createCustomLock } from '@/lib/locks';
import { logCustomEvent } from "@/lib/market/kongregate";

class NodeState {
    executed = false;
    executedOnDay = null;
    timesExecuted = 0;
}

class PathState {
    selected = false;
    enabled = true;
    countSelected = 0;
}

class Path extends BasicEntity {

    prestige() {
        this.state.selected = false;
        this.state.enabled = true;
    }

    update() {
        super.update();
    }
}

export function createPath(id, name, require) {
    let path = new Path(id, name, new PathState());
    createSelectedLock(path, require);
    return path;
}

class Node  extends BasicEntity {
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

export function createNode(id, name, proceeding, action=x=>x) {
    let node = new Node(id, name, new NodeState());
    if (proceeding)
        createUnlockedLock(node, proceeding);
    node.action = action;
    return node;
}

class AutoChoiceNode extends Node {
    constructor(id, name, choiceFun, choices) {
        super(id, name, new NodeState());
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

export function createAutoChoiceNode(id, name, choiceFun, choices, action=x=>x) {
    let autoChoiceNode = new AutoChoiceNode(id, name, choiceFun, choices);
    autoChoiceNode.action = action;
    function s(i) {
        createCustomLock([i], choices[i], () => i.state.choiceMade === i);
    }
    for (let o = 0; o < choices.length; o++)
        s(o);
    return autoChoiceNode;
}

class UserChoiceNode extends Node {
    constructor(id, name, paths) {
        super(id, name, new NodeState());
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

export function createUserChoiceNode(id, name, paths, action=x=>x) {
    let userChoiceNode = new UserChoiceNode(id, name, paths);
    userChoiceNode.action = action;
    return userChoiceNode;
}


class EventState {
    completed = false;
    expanded = true;
}

class Event extends BasicEntity {
    constructor(id, name, nodes) {
        super(id, name, new EventState());
        this.nodes = nodes;
    }
}

export function createEvent(id, name, nodes) {
    let event = new Event(id, name, nodes);
    for (let node of nodes) {
        node.event = event;
    }
    createUnlockedLock(event, nodes[0]);
    return event;
}
