<template>
    <div class="text-left">
        <stat-display :stat="stats.energy"/>
        <small>Energy helps you advance faster.</small>
        <br/><br/>
        ${{ abbreviateNumber(currency.money.getValue()) }}
        <br/>
        <stat-display :stat="stats.dailyNetIncome"/>
        <ul>
            <li><stat-display :stat="stats.dailyIncome"/></li>
            <li><stat-display :stat="stats.dailyExpenses"/></li>
        </ul>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import StatDisplay from './StatDisplay.vue';
import { abbreviateNumber } from '../lib/utils'
export default {
    name: "currency-display",
    components: { StatDisplay },
    computed: (0, s.mapGetters)(["activities", "currency", "stats"]),
    methods: { abbreviateNumber, ...mapActions(["changeActivityTime"]) }
};
</script>
