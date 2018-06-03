export class Lock {
    open = false;

    constructor(description, _check, keyholders) {
        this.description = description;
        this._check = _check;
        this.keyholders = keyholders;
    }

    keyholdersUnlocked() {
        let module = true;
        for (let keyholder of this.keyholders) {
            module = module && keyholder.locks.allOpen;
        }
        return module;
    }

    update() {
        this.open = this._check();
    }
}

export class Locks {
    locks = [];
    allOpen = true;

    addLock(lock) {
        this.locks.push(lock);
        this.update();
    }

    update() {
        this.allOpen = true;
        for (let lock of this.locks) {
            lock.update();
            this.allOpen = this.allOpen && lock.open;
        }
    }

    keyholdersUnlocked() {
        for (let lock of this.locks) {
            if (!lock.keyholdersUnlocked()) {
                return false;
            }
        }
        return true;
    }

    lockStrings() {
        let strings = [];
        for (let lock of this.locks) {
            if (!lock.open) {
                strings.push(lock.description);
            }
        }
        return strings;
    }

    lockString() {
        let strings = this.lockStrings();
        return ''.concat(strings);
    }
}

export function createUnlockedLock(keyholder, locked) {
    function _check() {
        return keyholder.unlocked();
    }
    locked.locks.addLock(new Lock(keyholder.name + ' is unlocked', _check, [keyholder]));
    keyholder.subscribe(locked);
}

export function createCustomLock(keyholders, locked, check) {
    let name = 'Custom Lock: ' + locked.id;
    for (let keyholder of keyholders) {
        keyholder.subscribe(locked);
        name += ' ' + keyholder.id;
    }
    locked.locks.addLock(new Lock(name, check, keyholders));
}

export function createAnyLock(keyholders, locked, check) {
    function _check() {
        let checked = false;
        for (let keyholder of keyholders) {
            checked = checked || check(keyholder);
        }
        return checked;
    }
    let name = 'Any Completed:';
    for (let keyholder of keyholders) {
        keyholder.subscribe(locked);
        name += ' ' + keyholder.name;
    }
    locked.locks.addLock(new Lock(name, _check, keyholders));
}

export function createPredicateLock(keyholder, locked, check) {
    locked.locks.addLock(new Lock(keyholder.name + ' predicate', check, [keyholder]));
    keyholder.subscribe(locked);
}

export function createMinimumValueLock(keyholder, locked, minimum) {
    function _check() {
        return keyholder.getValue() >= minimum;
    }
    locked.locks.addLock(new Lock(keyholder.name + ' at least ' + minimum, _check, [keyholder]));
    keyholder.subscribe(locked);
}

export function createTrueStateLock(keyholder, locked) {
    function _check() {
        return keyholder.getValue();
    }
    locked.locks.addLock(new Lock(keyholder.name + ' is true', _check, [keyholder]));
    keyholder.subscribe(locked);
}

export function createSelectedLock(keyholder, locked) {
    function _check() {
        return keyholder.state.selected;
    }
    locked.locks.addLock(new Lock(keyholder.name + ' selected', _check, [keyholder]));
    keyholder.subscribe(locked);
}

export function createLevelLock(keyholder, locked, level) {
    function _check() {
        return keyholder.xp.state.level >= level;
    }
    locked.locks.addLock(new Lock(keyholder.name + ' Level ' + level, _check, [keyholder]));
    keyholder.xp.subscribe(locked);
}

export function createLevelLockChain(keyholders, level) {
    for (let i = 1; i < keyholders.length; i++)
        createLevelLock(keyholders[i - 1], keyholders[i], level);
}

export function createCompletedLock(keyholder, locked) {
    function _check() {
        return keyholder.state.completed;
    }
    locked.locks.addLock(new Lock(keyholder.name, _check, [keyholder]));
    keyholder.subscribe(locked);
}

export function createCompletedOrReadingListLock(keyholder, locked) {
    function _check() {
        return keyholder.state.completed || keyholder.state.onReadingList;
    }
    locked.locks.addLock(new Lock(keyholder.name, _check, [keyholder]));
    keyholder.subscribe(locked);
}
