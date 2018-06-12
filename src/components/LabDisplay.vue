<template>
    <div>
        <div v-if="labPane.state.explained">
            <div>
                <navbar-display :panes="labPane.subpanes"/>
                <div class="tab-content small-paper" style="padding-left: 20px; padding-top: 20px; min-height: 100%;">
                    <div v-for="pane of labPane.subpanes" :key="pane" v-if="pane.state.selected" :class="[pane.state.selected ? 'active': '']" :id="pane.id">
                        <component :is="pane.component"/>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            You should probably learn stuff if you don't want to flip burgers all your life.
            <br>
            Actually, you should learn stuff even if you do want to flip burgers all your life.
            <br>
            <button class="btn btn-success" @click="labPane.state.explained = true">Learn Stuff</button>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import ResearchDisplay from './ResearchDisplay.vue';
import QueueDisplay from './QueueDisplay.vue';
import NavbarDisplay from './NavbarDisplay.vue';

export default {
    name: 'lab-display',
    components: {
        ResearchDisplay,
        QueueDisplay,
        NavbarDisplay
    },
    computed: mapGetters(['labPane']),
    methods: mapActions([])
};
</script>
