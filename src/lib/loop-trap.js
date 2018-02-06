let v = require('./16');

import { BasicEntity } from './basic-entity';

class StateClass {}

class LoopTrap extends BasicEntity {
    constructor() {
        super('looptrap', 'Loop Trap', new StateClass());
        this.efficiency = new v.Stat('lt_efficiency', 'Efficiency', 0, 4);
    }
}

export let loopTrap = new LoopTrap();
