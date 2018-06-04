import { StateEntity } from "@/lib/state-entities";
import { makeid } from "@/lib/market/kongregate";

class h {
    constructor(value) {
        this.value = value;
    }
}

class p extends StateEntity {
    constructor() {
        super('player_id', 'PlayerID', h, makeid(), false);
    }
}

export const playerId = new p();
