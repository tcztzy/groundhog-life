import { BasicEntity } from "./basic-entity";

class p {
    notified = false;
    selected = false;
    explained = false;
}

export class PaneGroup {
    panes = [];
    constructor(allowMultiple=false) {
        this.allowMultiple = allowMultiple;
    }
}
export class Pane extends BasicEntity {
    constructor(module, require, component, paneGroup, footer=false, subpanes=[]) {
        super(module, require, new p());
        this.state.selected = this.id === 'job-pane';
        this.component = component;
        this.footer = footer;
        this.subpanes = subpanes;
        this.paneGroup = paneGroup;
        this.paneGroup.panes.push(this);
    }

    select() {
        this.state.selected = true;
        this.state.notified = false;
    }

    toggle() {
        this.state.selected = !this.state.selected;
        this.state.notified = false;
    }

    deselect() {
        this.state.selected = false;
    }

    notify() {
        this.state.selected || (this.state.notified = !0);
    }

    prestige() {
        this.notified = false;
        this.selected = 'life-summary-pane' === this.id;
    }
}
