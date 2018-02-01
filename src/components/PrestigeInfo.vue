<template>
    <div v-if="time.currentDay.getValue() >= 1 && time.currentDay.getValue() <= 100 && time.currentLife.getValue() > 1" class="row">
        <div class="alert alert-success" role="alert">You just turned 18. Again. Expertise from previous lives makes things easier this time.</div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'prestige-info',
    computed: mapGetters(['time']),
    methods: mapActions([])
};
</script>
