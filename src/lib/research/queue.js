import Vue from 'vue';
import { messageBox } from "@/lib/message-box";
import { BasicEntity } from "@/lib/basic-entity";
import { areas } from "@/lib/research";
import { setActiveResearch } from "@/lib/user-select-action";
import { autoResearchJustPause } from "@/lib/market/auto";
import { paused } from "@/lib/global-states";

class C {
    constructor(id, name, internalId, unlocked) {
        this.id = id;
        this.name = name;
        this.internalId = internalId;
        this.goal = -1;
        this.active = false;
        this.unlocked = unlocked;
        this.finished = false;
    }
}

class L {
    items = [];
}

/**
 * @return {null}
 */
function S(module) {
    for (const area of areas) {
        if (area.id === module) {
            return area;
        }
    }
    return null;
}

function swapProperty(obj, a, b) {
    const tmp = obj[a];
    Vue.set(obj, a, obj[b]);
    Vue.set(obj, b, tmp);
}

class I extends BasicEntity {
    constructor() {
        super('researchqueue', 'Research Queue', new L());
        this.areas = [];
        this.internalId = 0;
    }

    addItem(item) {
        this.state.items.push(new C(item.id, item.name, this.internalId, item.unlocked()));
        this.areas.push(item);
        this.internalId += 1;
    }

    removeItem(itemInternalId) {
        for (let i = 0; i < this.state.items.length; i++)
            if (this.state.items[i].internalId === itemInternalId) {
                this.state.items.splice(i, 1);
                this.areas.splice(i, 1);
                break;
            }
    }

    swap(module, exports) {
        swapProperty(this.state.items, module, exports);
        swapProperty(this.areas, module, exports);
    }

    updateOrder(module) {
        this.state.items = module;
        this.areas = this.state.items.map(item => S(item.id));
    }

    moveUp(id) {
        for (let i = 1; i < this.state.items.length; i++)
            if (this.state.items[i].internalId === id) {
                this.swap(i, i - 1);
                break;
            }
    }

    moveDown(id) {
        for (let i = 0; i < this.state.items.length - 1; i++)
            if (this.state.items[i].internalId === id) {
                this.swap(i, i + 1);
                break;
            }
    }

    advance() {
        let module = false;
        for (let i = 0; i < this.state.items.length; i++) {
            const item = this.state.items[i], area = this.areas[i];
            item.unlocked = area.unlocked();
            item.finished = area.xp.state.level >= item.goal;
            if (module || item.finished || !item.unlocked)
                item.active = false;
            else {
                if (!item.active && autoResearchJustPause.getValue()) {
                    paused.toggleValue();
                    messageBox.addMessage('Auto-Pause: Current Research finished!', 'bell');
                }
                setActiveResearch(area);
                item.active = true;
                module = true;
            }
        }
    }

    clear() {
        this.state.items = [];
        this.areas = [];
    }

    onLoad() {
        this.state.items = this.state.items.filter(item => S(item.id));
        this.areas = this.state.items.map(item => S(item.id));
        this.internalId = Math.max(...[0, ...this.state.items.map(item => item.internalId)])+ 1;
        this.internalId = this.internalId ? this.internalId : 0;
    }
}

export let researchQueue = new I();
