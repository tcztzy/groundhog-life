<template>
    <div>
        <div class="row">
            <table>
                <tr>
                    <th style="width: 13rem;"></th>
                    <th style="width: 4rem;"></th>
                    <th style="width: 12rem;"></th>
                    <th style="width: 5rem;"></th>
                    <th style="width: 3rem;"></th>
                    <th v-if="time.currentLifeThisLoop.getValue() > 1" class="text-right" style="width: 4rem;"></th>
                </tr>
                <tbody v-for="subpane of researchPane.subpanes" :key="subpane.id" class="table-cat" :id="subpane.id">
                <tr v-if="subpane.field.id === 'selfimprovement'" class="tr-name">
                    <td colspan="1" @click="selectPane(subpane)">
                        <span class="collapse-icon rounded-circle">{{ subpane.state.selected ? '-' : '+' }}</span>
                        <b>{{ subpane.field.name }}</b>
                    </td>
                    <td>Level</td>
                    <td>Effect</td>
                    <td>XP left</td>
                    <td>{{ settings.xpPerHour.getValue() ? 'XP/h' : 'XP/day' }}</td>
                    <td v-if="time.currentLifeThisLoop.getValue() > 1" class="text-right">Max Lvl</td>
                </tr>
                <tr v-else class="tr-name">
                    <td colspan="6" @click="selectPane(subpane)">
                        <span class="collapse-icon rounded-circle">{{ subpane.state.selected ? '-' : '+' }}</span>
                        <b>{{ subpane.field.name }}</b>
                    </td>
                </tr>
                <tr v-for="area of subpane.field.areas" :key="area" v-if="area.unlocked() && subpane.state.selected">
                    <area-button :entity="area"></area-button>
                </tr>
                <tr v-else-if="(area.locks.keyholdersUnlocked() || studyMirroredShip.xp.state.level > 0 && area.id === 'area_constructPowerPlant') && subpane.state.selected">
                    <td colspan="6">
                        Required: <i>{{ area.locks.lockString() }}</i>
                    </td>
                </tr>
                <tr>
                    <td style="padding-bottom: 15px;"></td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="row" style="padding-top: 20px;">
            <button class="btn btn-info" @click="settings.xpPerHour.toggleValue()">
                {{ settings.xpPerHour.getValue() ? 'XP/h' : 'XP/day' }}
            </button>
            <span style="padding-left: 20px;">
                <stat-display :stat="baseResearchXpPerHourStat"></stat-display>
            </span>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import StatDisplay from './StatDisplay.vue';
import AreaButton from './AreaButton.vue';

export default {
    name: 'research-display',
    components: {
        AreaButton,
        StatDisplay
    },
    computed: mapGetters([
        'researchPane',
        'settings',
        'baseResearchXpPerHourStat',
        'time',
        'studyMirroredShip'
    ]),
    methods: mapActions(['selectPane'])
};
</script>
