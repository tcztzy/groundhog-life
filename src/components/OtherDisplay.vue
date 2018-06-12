<template>
    <div>
        <navbar-display :panes="otherPane.subpanes"/>
        <div class="tab-content small-paper" style="padding-left: 20px; padding-top: 20px; min-height: 100%">
            <div v-for="pane of otherPane.subpanes" :key="pane.id" v-if="pane.state.selected" class="active" :id="pane.id">
                <component :is="pane.component"></component>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import SettingsDisplay from './SettingsDisplay.vue';
import AboutDisplay from './AboutDisplay.vue';
import PrivacyDisplay from './PrivacyDisplay.vue';
import KeybindingsDisplay from './KeybindingsDisplay.vue';
import NavbarDisplay from './NavbarDisplay.vue';

export default {
    name: 'other-display',
    components: {
        SettingsDisplay,
        AboutDisplay,
        PrivacyDisplay,
        KeybindingsDisplay,
        NavbarDisplay
    },
    computed: mapGetters(['otherPane']),
    methods: mapActions([])
};
</script>
