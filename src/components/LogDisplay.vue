<template>
    <div>
        <div class="row">
            <table>
                <tr v-for="l in log.state.entries.slice(0, 100)" :key="l">
                    <td>{{ l.timestampAge[0] }} years {{ l.timestampAge[1] }} days:</td>
                    <td>{{ l.message }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'log-display',
    components: {},
    computed: mapGetters(['log']),
    methods: mapActions([])
};
</script>
