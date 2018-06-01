import { Stat } from "./stat";

class HappinessStat extends Stat {
    constructor() {
        super('happiness', 'Happiness', 0, 2, '', '', true, false, 0, 2);
        this.selectedModifier = null;
    }

    emojiName() {
        return this.effective > 1.2 ? 'happy' : this.effective < 0.8 ? 'sad' : 'neutral';
    }

    getExplanation() {
        for (const modifier of this.modifiers) {
            const explain = modifier.explain();
            if (explain) {
                return explain;
            }
        }
        return 'Everything is so-so.';
    }

    update() {
        super.update();
        if (this.effective > 40) {
            console.log(this);
        }
    }

    onLoad() {
        this.state.highestEffectiveEver = Math.min(this.state.highestEffectiveEver, 2);
    }
}

export let happinessStat = new HappinessStat();
