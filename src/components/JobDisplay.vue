<template>
    <div>
        <div class="row">
            <nobr>
                <button
                    class="btn m-3"
                    style="width: 12rem;"
                    role="button"
                    :disabled="userInventory.haveAutoPromote"
                    @click="autoPromote.toggleValue">
                    <small>Auto-Promote is {{ autoPromote.select('On', 'Off') }}</small>
                </button>
                <span v-if="userInventory.haveAutoPromote">
                    <label for="apml">Min Lvl;</label>
                    <input type="text" id="apml" v-model.number="autoPromoteMinLevel.value" style="width: 3rem;">
                    <input type="checkbox" v-model="autoPromoteJustPause.value" id="apip">
                    <label for="apip">Pause if Promotion available</label>
                </span>
                <a href="#" v-else @click="selectPane(groundhogMarketPane)">
                    <small>Unlock</small>
                </a>
            </nobr>
        </div>
        <div class="row">
            <table>
                <tr>
                    <th style="width: 13rem;"></th>
                    <th style="width: 4rem;"></th>
                    <th style="width: 6rem;"></th>
                    <th style="width: 5rem;"></th>
                    <th style="width: 5rem;"></th>
                    <th v-if="time.currentLifeThisLoop.getValue() > 1" class="text-right" style="width: 4rem;"></th>
                </tr>
                <tbody
                    v-for="subpane of jobPane.subpanes"
                    :key="subpane.id"
                    class="table-cat"
                    :id="subpane.id">
                <tr v-if="subpane.career.id === 'bunMasters'" class="tr-name">
                    <td class="tr-name" colspan="1" @click="selectPane(subpane)">
                        <span class="collapse-icon rounded-circle">{{ subpane.state.selected ? '-' : '+' }}</span>
                        <b>{{ subpane.career.name }}</b>
                    </td>
                    <td>Level</td>
                    <td>Income/h</td>
                    <td>XP Left</td>
                    <td>{{ settings.xpPerHour.getValue() ? 'XP/h' : 'XP/day' }}</td>
                    <td v-if="time.currentLifeThisLoop.getValue() > 1" class="text-right" style="width: 3rem;"></td>
                </tr>
                <tr v-else class="tr-name">
                    <td class="tr-name" colspan="6" @click="selectPane(subpane)">
                        <span class="collapse-icon rounded-circle">{{ subpane.state.selected ? '-' : '+' }}</span>
                        <b>{{ subpane.career.name }}</b>
                    </td>
                </tr>
                <template v-for="job of subpane.career.jobs">
                <job-button :key="job" v-if="job.unlocked() && subpane.state.selected" :entity="job"/>
                <tr :key="job" v-else-if="job.locks.keyholdersUnlocked() && subpane.state.selected">
                    <td colspan="6">Required: <i>{{ job.locks.lockString() }}</i></td>
                </tr>
                </template>
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
            <span style="padding-left: 20px">
                <stat-display :stat="baseWorkXpPerHourStat"/>
            </span>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import JobButton from './JobButton.vue';
import StatDisplay from './StatDisplay.vue';

export default {
    name: 'job-display',
    components: {
        JobButton,
        StatDisplay
    },
    computed: mapGetters([
        'jobPane',
        'settings',
        'baseWorkXpPerHourStat',
        'time',
        'autoPromote',
        'autoPromoteMinLevel',
        'autoPromoteJustPause',
        'userInventory',
        'groundhogMarketPane'
    ]),
    methods: mapActions(['selectPane'])
};
</script>
