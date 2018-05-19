<template>
    <div>
        <div class="row">
            <br>
            <span>
                Each achievement gives +2
                <span class="icon ion-ios-ionic tachyon"></span> when starting a new life (base: +100<span class="icon ion-ios-ionic tachyon"></span>).
                <br>
                You got {{ completedAchievements }} achievements.
            </span>
            <br>
        </div>
        <div class="row">
            <table>
                <thead>
                    <template><tr>
                        <th style="width: 13rem"></th>
                        <th style="width: 1rem"></th>
                        <th style="width: 20rem"></th>
                        <th style="width: 1rem"></th>
                        <th style="width: 5rem"></th>
                    </tr></template>
                </thead>
                <tbody class="table-cat" v-for="subpane in achievementPane.subpanes" :key="subpane.id" :id="subpane.id">
                    <tr class="tr-name">
                        <td colspan="6" @click="selectPane(subpane)">
                            <span class="collapse-icon rounded-circle">{{ subpane.state.selected ? '-' : '+' }}</span>
                            <b>{{ subpane.ag.name }}</b> ({{ subpane.ag.completed }}/{{subpane.ag.total}})
                        </td>
                    </tr>
                    <tr
                        v-for="achievement in subpane.ag.achievements"
                        v-if="subpane.state.selected"
                        :key="achievement"
                        style="padding-bottom: 5px">
                        <td :class="achievement.state.completed ? 'complete' : 'incomplete'"><b>{{ achievement.name }}</b></td>
                        <td style="width: 1rem;"></td>
                        <td>{{ achievement.description }}</td>
                        <td style="width: 1rem;"></td>
                        <td>{{ abbreviateNumber(achievement.currentValue) }}/{{ abbreviateNumber(achievement.goal) }}</td>
                    </tr>
                    <template><tr>
                        <td style="padding-bottom: 15px;"></td>
                    </tr></template>
                </tbody>
            </table>
            * Pride and Lust TBD.
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { abbreviateNumber } from '../lib/utils.js';

export default {
    name: 'achievements-display',
    components: {},
    computed: {
        completedAchievements() {
            let completed = 0;
            let total = 0;
            for (let achievement in this.achievements) {
                total += 1;
                if (achievement.state.completed)
                    completed += 1;
            }
            return completed + '/' + total;
        },
        ...mapGetters(['achievementPane', 'achievements'])
    },
    methods: {
        abbreviateNumber,
        ...mapActions(['selectPane'])
    }
};
</script>

<style scoped>
.complete {
    background-color: #90ee90;
    color: #000
}
</style>
