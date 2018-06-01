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
    constructor(module, require, n, r, s=false, o=[]) {
        super(module, require, new p());
        this.state.selected = this.id === 'job-pane';
        this.component = n;
        this.footer = s;
        this.subpanes = o;
        this.paneGroup = r;
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
