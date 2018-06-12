<template>
    <div>
        <div class="row"><h3>Food Expenses</h3></div>
        <div class="row" style="padding-bottom: 20px;">Higher food quality increases your health!</div>
        <div class="row">
            <table>
                <tr>
                    <th style="width: 15rem;"></th>
                    <th class="text-right" style="width: 4rem;">Time</th>
                    <th class="text-right" style="width: 4rem;">Cost/day</th>
                    <th class="text-right" style="width: 5rem;">Quality</th>
                </tr>
                <tr v-for="foodOption of foodOptions" :key="foodOption">
                    <td>
                        <button
                            :class="['btn', foodOption.state.selected ? 'btn-primary' : 'btn-secondary']"
                            style="width: 100%;"
                            @click="selectFoodOption(foodOption)"
                        >{{ foodOption.name }}</button>
                    </td>
                    <td class="text-right">
                        <span :style="`color: ${foodOption.enoughFreeTime() ? 'grey' : 'red'}`">{{ formatMinutes(foodOption.time) }}</span>
                    </td>
                    <td class="text-right">
                        <span :style="'color: ' + foodOption.enoughMoney() ? 'grey' : 'orange'">${{ foodOption.cost }}</span>
                    </td>
                    <td class="text-right">
                        <span>{{ foodOption.quality.toFixed(2) }}</span>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { formatMinutes } from '@/lib/utils';
export default {
    name: 'spending-display',
    components: {},
    computed: mapGetters(['stats', 'foodOptions']),
    methods: {
        formatMinutes,
        ...mapActions(['selectFoodOption'])
    }
};
</script>
