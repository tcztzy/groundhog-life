import { BasicEntity } from './basic-entity';
import { Stat } from "./stats/stat";

class StateClass {}

class LoopTrap extends BasicEntity {
    constructor() {
        super('looptrap', 'Loop Trap', new StateClass());
        this.efficiency = new Stat('lt_efficiency', 'Efficiency', 0, 4);
    }
}

export let loopTrap = new LoopTrap();
