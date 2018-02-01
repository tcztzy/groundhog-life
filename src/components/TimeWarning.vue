<template>
    <div v-if="battle.state.enemyReachedSolarSystem" class="row">
        <div class="alert alert-danger" role="alert">
            <strong>Warning!</strong> Experiencing major time dilation. Check your events.
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'time-warning',
    computed: mapGetters(['battle']),
    methods: mapActions([])
};
</script>
