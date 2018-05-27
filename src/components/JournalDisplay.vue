<template>
    <div>
        <div v-if="journalPane.state.explained">
            <navbar-display :panes="journalPane.subpanes" />
            <div class="tab-content small-paper" style="padding-left: 20px; padding-top: 20px; min-height: 100%">
                <div
                    v-for="subpane in journalPane.subpanes"
                    v-if="subpane.state.selected"
                    :key="subpane.id"
                    :id="subpane.id"
                    :class="subpane.state.selected ? 'active' : ''"
                >
                    <component :is="subpane.component" tag="div"></component>
                </div>
            </div>
        </div>
        <div v-else>
            <q>History is not a burden on the memory but an illumination of the soul.</q>
            --Lord Acton
            <br>
            <button class="btn btn-success" @click="journalPane.state.explained = !0">
                Ok ok, I'll get a Journal
            </button>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import LogDisplay from './LogDisplay.vue';
import AchievementsDisplay from './AchievementsDisplay.vue';
import LifeSummary from './LifeSummary.vue';
import NavbarDisplay from './NavbarDisplay.vue';

export default {
    name: 'journal-display',
    components: {
        LogDisplay,
        AchievementsDisplay,
        LifeSummary,
        NavbarDisplay
    },
    computed: mapGetters(['journalPane'])
};
</script>
