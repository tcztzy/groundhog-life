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

export function createUnlockedLock(lock, locks) {
    function unlocked() {
        return lock.unlocked();
    }
    locks.locks.addLock(new Lock(lock.name + ' is unlocked', unlocked, [lock]));
    lock.subscribe(locks);
}

export function createCustomLock(keyholders, locks, require) {
    let name = 'Custom Lock: ' + locks.id;
    for (let keyholder of keyholders) {
        keyholder.subscribe(locks);
        name += ' ' + keyholder.id;
    }
    locks.locks.addLock(new Lock(name, require, keyholders));
}

export function createAnyLock(keyholders, locks, check) {
    function _check() {
        let checked = false;
        for (let keyholder of keyholders) {
            checked = checked || check(keyholder);
        }
        return checked;
    }
    let name = 'Any Completed:';
    for (let keyholder of keyholders) {
        keyholder.subscribe(locks);
        name += ' ' + keyholder.name;
    }
    locks.locks.addLock(new Lock(name, _check, keyholders));
}

export function createPredicateLock(lock, locks, _check) {
    locks.locks.addLock(new Lock(lock.name + ' predicate', _check, [lock]));
    lock.subscribe(locks);
}

export function createMinimumValueLock(lock, locks, minimum) {
    function _check() {
        return lock.getValue() >= minimum;
    }
    locks.locks.addLock(new Lock(lock.name + ' at least ' + minimum, _check, [lock]));
    lock.subscribe(locks);
}

export function createTrueStateLock(lock, locks) {
    function _check() {
        return lock.getValue();
    }
    locks.locks.addLock(new Lock(lock.name + ' is true', _check, [lock]));
    lock.subscribe(locks);
}

export function createSelectedLock(module, exports) {
    function _check() {
        return module.state.selected;
    }
    exports.locks.addLock(new Lock(module.name + ' selected', _check, [module]));
    module.subscribe(exports);
}

export function createLevelLock(skill, locks, level) {
    function _check() {
        return skill.xp.state.level >= level;
    }
    locks.locks.addLock(new Lock(skill.name + ' Level ' + level, _check, [skill]));
    skill.xp.subscribe(locks);
}

export function createLevelLockChain(module, exports) {
    for (let i = 1; i < module.length; i++)
        createLevelLock(module[i - 1], module[i], exports);
}

export function createCompletedLock(module, exports) {
    function _check() {
        return module.state.completed;
    }
    exports.locks.addLock(new Lock(module.name, _check, [module]));
    module.subscribe(exports);
}

export function createCompletedOrReadingListLock(module, exports) {
    function _check() {
        return module.state.completed || module.state.onReadingList;
    }
    exports.locks.addLock(new Lock(module.name, _check, [module]));
    module.subscribe(exports);
}
