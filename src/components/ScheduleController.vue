<template>
    <div>
        +/-
        <select @change="delta.setValue($event.target.value)">
            <option>1</option>
            <option>5</option>
            <option>15</option>
            <option>30</option>
            <option selected>60</option>
            <option>240</option>
            <option>1440</option>
        </select>
        Minutes<br/>
        <table>
            <tr v-for="activity of activities" :key="activity.name" :class="[
                activity.unlocked() ? 'item-unlocked' : 'item-locked',
                activity.sufficientTime() ? '' : 'insufficient-time'
            ]">
                <td style="width: 5rem">{{ activity.name }}</td>
                <td style="width: 3rem">{{ duration.durationString }}</td>
                <td style="width: 1rem">
                    <button v-if="durationByUser" @click="increaseActivityTime(activity)">+</button>
                </td>
                <td style="width: 1rem">
                    <button v-if="durationByUser" @click="decreaseActivityTime(activity)">-</button>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import StatDisplay from './StatDisplay.vue';

export default {
    name: 'schedule-controller',
    computed: mapGetters([
        'activities',
        'research',
        'delta',
        'pressedKeys'
    ]),
    components: { StatDisplay },
    methods: {
        increaseActivityTime: function (module) {
            const coefficient = 1;
            this.changeActivityTime([
                module,
                this.delta.getValue() * coefficient
            ]);
        },
        decreaseActivityTime: function (module) {
            const coefficient = 1;
            this.changeActivityTime([
                module,
                -this.delta.getValue() * coefficient
            ]);
        },
        ...mapActions(['changeActivityTime'])
    }
};
</script>
<style>
.insufficient-time {
    color: red;
}
</style>
