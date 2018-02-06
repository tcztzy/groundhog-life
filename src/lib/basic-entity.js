import { Locks } from './locks';
import { saver } from './saver';
import { messageBox } from './message-box';

export class BasicEntity {
    locks = new Locks();
    dependants = [];
    lastChange = -10;
    _notification = false;
    _entityUpdated = 0;
    logUnlock = false;
    wasLocked = false;

    constructor(id, name, state) {
        this.id = id;
        this.name = name;
        this.state = state;
        saver.register(this);
    }

    onLoad() {}

    changed() {
        const now = new Date();
        this.lastChange = now.getTime();
    }

    hasChanged(interval) {
        const now = new Date();
        return now.getTime() - this.lastChange < 1000 * interval;
    }

    subscribe(observable) {
        this.dependants.push(observable);
    }

    unsubscribe(observable) {
        this.dependants = this.dependants.filter(dependant => dependant.id !== observable.id);
    }

    austerityMode() {
        this.update();
    }

    update(updateDependants) {
        this._entityUpdated += 1;
        if (this.logUnlock) {
            this.locks.update();
            if (this.wasLocked && this.unlocked())
                messageBox.addMessage(this.name + ' unlocked!', 'unlocked');
        }
        else {
            this.locks.update();
            this.wasLocked = !this.unlocked();
        }
        if (updateDependants) {
            for (let dependant of this.dependants) {
                dependant.update();
            }
        }
    }

    prestige() {}

    grandPrestige() {
        this.prestige();
    }

    postPrestigeAssert() {}

    postLoadAssert() {}

    unlocked() {
        return this.locks.allOpen;
    }

    keyholdersUnlocked() {
        return this.locks.keyholdersUnlocked();
    }

    notify() {
        this._notification = true;
    }

    acknowledge() {
        this._notification = false;
    }
}
