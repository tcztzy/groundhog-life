<template>
    <div>
        <div v-if="lifestylePane.state.explained">
            <div>
                <navbar-display :panes="lifestylePane.subpanes"/>
                <div class="tab-content small-paper" style="padding-left: 20px; padding-top: 20px; min-height: 100%;">
                    <div v-for="pane of lifestylePane.subpanes" :key="pane.id" v-if="pane.state.selected" class="active" :id="pane.id">
                        <component :is="pane.component"></component>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            As an adult, you have the right, and the duty, to make major lifestyle choices.<br>
            <button class="btn btn-success" @click="lifestylePane.state.explained = true">Make Major Lifestyle Choices</button>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import HousingDisplay from './HousingDisplay.vue';
import BoostsDisplay from './BoostDisplay.vue';
import HealthDisplay from './SpendingDisplay.vue';
import HappinessExplain from './HappinessExplain.vue';
import NavbarDisplay from './NavbarDisplay.vue';

export default {
    name: 'lifestyle-display',
    components: {
        HousingDisplay,
        BoostsDisplay,
        HealthDisplay,
        HappinessExplain,
        NavbarDisplay
    },
    computed: mapGetters(['lifestylePane']),
    methods: mapActions([])
};
</script>
