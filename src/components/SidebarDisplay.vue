<template>
    <div class="col-auto small-paper" style="padding-left: 25px; padding-right: 25px; min-width: 10rem">
        <clock-display class="padded"/>
        <div class="row">

        </div>
        <div class="row"></div>
        <div class="row"></div>
        <div class="row"></div>
        <div class="row"></div>
    </div>
</template>
<script>
import ClockDisplay from "./ClockDisplay.vue";
import ScheduleController from "./ScheduleController.vue";
import CurrencyDisplay from "./CurrencyDisplay.vue";
import HappinessDisplay from "./HappinessDisplay.vue";
import { abbreviateNumber } from "../lib/utils";
function autoToString(auto, justPause) {
    return auto.getValue()
        ? " (A" + (justPause.getValue() ? "P)" : ")")
        : "";
}
export default {
    name: "sidebar-display",
    components: {
        ClockDisplay,
        ScheduleController,
        CurrencyDisplay,
        HappinessDisplay
    },
    methods: {
        timeSinceLastSave: function() {
            const now = new Date();
            return (
                (now.getTime() - this.time.lastSave.getValue()) /
                1000
            ).toFixed(0);
        },
        selectBoosts: function() {
            this.selectPane(this.lifestylePane);
            this.selectPane(this.boostsPane);
        },
        selectJobPane: function() {
            this.selectPane(this.jobPane);
        },
        selectResearchPane: function() {
            this.selectPane(this.labPane);
            this.selectPane(this.researchPane);
        },
        countBoosts: function() {
            let count = 0;
            for (let boost of this.boosts) {
                if (boost.currentState() === 'available' && boost.unlocked())
                    count += 1;
            }
            return count;
        },
        abbrLevel: function(level) {
            return abbreviateNumber(level, 0);
        },
        ...mapActions(["selectPane"])
    },
    computed: {
        autoPromoteString: function() {
            return autoToString(this.autoPromote, this.autoPromoteJustPause);
        },
        autoResearchString: function() {
            return autoToString(this.autoResearch, this.autoResearchJustPause);
        },
        autoBoostString: function() {
            return autoToString(this.autoBoost, this.autoBoostJustPause);
        },
        ...mapGetters([
            "boostsPane",
            "lifestylePane",
            "boosts",
            "currentJobContainer",
            "currentResearchContainer",
            "jobPane",
            "researchPane",
            "autoPromote",
            "autoPromoteJustPause",
            "autoResearch",
            "autoResearchJustPause",
            "autoBoost",
            "autoBoostJustPause",
            "time",
            "labPane"
        ])
    }
};
</script>
<style scoped>
.padded {
    padding: 10px;
}
</style>
