<template>
    <div>
        <div class="row">
            As you get older, you need a nicer home to stay happy.
            <br>
            Keep in mind that happiness is also affected by your overall spending ratio.
        </div>
        <div class="row" style="padding-left: 20px; padding-right: 20px;">
            <table>
                <tr>
                    <th class="text-right" style="width: 15rem;"></th>
                    <th class="text-right" style="width: 5rem;">Chores</th>
                    <th class="text-right" style="width: 5rem;">Rent/day</th>
                    <th class="text-right" style="width: 5rem;">Initial Cost</th>
                    <th class="text-right" style="width: 6rem;">Happiness</th>
                </tr>
                <tr v-for="home of homes" :key="home" v-if="home.keyholdersUnlocked()">
                    <td class="text-right">
                        <button
                            :class="['btn', 'btn-' + home.state.selected ? 'success' : 'secondary']"
                            style="width: 100%;"
                            type="button"
                            :disabled="!home.unlocked()"
                            :title="home.description"
                            @click="selectHome(home)"
                        >{{ home.name }}</button>
                    </td>
                    <td class="text-right">
                        <stat-display
                            :stat="home.choresTime"
                            :name="false"
                            :color="home.enoughFreeTime() ? 'grey' : 'red'"
                            :minutes="true"/>
                    </td>
                    <td class="text-right">
                        <stat-display :stat="home.rent" :name="false" :color="home.enoughIncome() ? 'grey' : 'orange'"/>
                    </td>
                    <td class="text-right">
                        <stat-display :stat="home.initialCost" :name="false" :color="home.enoughMoney() ? 'grey' : 'red'"/>
                    </td>
                    <td class="text-right">
                        {{ abbreviateNumber(homeToHappinessFun(home.quality.effective)) }}
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { formatMinutes, abbreviateNumber } from "@/lib/utils";
import { homeToHappinessFun } from "@/lib/homes";
import StatDisplay from './StatDisplay.vue';

export default {
    name: 'housing-display',
    components: { StatDisplay },
    computed: mapGetters(['homes']),
    methods: {
        formatMinutes,
        abbreviateNumber,
        homeToHappinessFun,
        ...mapActions(['selectHome'])
    }
};
</script>
