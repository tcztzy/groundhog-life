<template>
    <div class="tab-content small-paper" style="padding-left: 20px; padding-top: 5px; min-height: 90%;">
        <div v-for="pane of panes" :key="pane.id" v-if="pane.state.selected" :id="pane.id" :class="pane.state.selected ? 'active': ''">
            <component v-bind:is="pane.component"></component>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import LambdaDisplay from './LambdaDisplay.vue';
import JobDisplay from './JobDisplay.vue';
import LabDisplay from './LabDisplay.vue';
import JournalDisplay from './JournalDisplay';
import LifeSummary from './LifeSummary.vue';
import HappinessExplain from './HappinessExplain.vue';
import GroundhogMarket from './GroundhogMarket.vue';

export default {
    name: 'main-pane',
    components: {
        LambdaDisplay,
        JobDisplay,
        LabDisplay,
        EventsDisplay: f.default,
        JournalDisplay,
        LifestyleDisplay: h.default,
        LifeSummary,
        HappinessExplain,
        GroundhogMarket,
        OtherDisplay: P.default
    },
    computed: mapGetters(['panes']),
    methods: mapActions([])
};
</script>
