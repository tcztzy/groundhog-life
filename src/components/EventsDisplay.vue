<template>
    <div>
        <div v-for="event of events" :key="event" v-if="event.unlocked()" class="small-paper" style="padding: 20px;">
            <div class="row" @click="event.state.expanded = !event.state.expanded">
                <h5>{{ event.name }}</h5>
                <br><br>
            </div>
            <div v-if="event.state.expanded">
                <div v-for="node of event.nodes" :key="node" v-if="node.unlocked()">
                    {{ node.name }}<br>
                    <ul v-if="node.paths">
                        <li v-for="path of node.paths" :key="path">
                            <button
                                class="btn btn-info"
                                style="margin: 10px;"
                                role="button"
                                :disabled="!path.state.enabled"
                                @click="node.selectPath(path)">{{ path.name }}</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'events-display',
    components: {},
    computed: mapGetters(['events']),
    methods: mapActions([])
};
</script>
