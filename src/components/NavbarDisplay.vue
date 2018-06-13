<template>
    <ul class="nav navbar navbar-toggleable-md nav-tabs">
        <li v-for="pane in panes" :key="pane" v-if="!pane.footer" class="nav-item" @click="selectPane(pane)">
            <a v-if="pane.unlocked()" href="#"
                :class="['nav-link', pane.state.selected ? 'active' : '', pane.state.notified ? 'item-notified' : '']">
                {{ pane.name }}
            </a>
            <span v-else>???</span>
        </li>
    </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'navbar-display',
    components: {},
    props: { panes: {} },
    computed: mapGetters([]),
    methods: mapActions(['selectPane']),
};
</script>

<style scoped>
.item-notified {
    animation-duration: 3s;
    animation-name: color-change;
    animation-iteration-count: infinite;
    animation-direction:alternate;
}
</style>
