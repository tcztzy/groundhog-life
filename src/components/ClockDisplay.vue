<template>
    <div>
        <div class="row" style="display: flex; justify-content: space-between">
            <span>
                Age {{ 18 + time.currentDay.getYear() }}
                Day {{ time.currentDay.getDayOfYear() }}
            </span>
            <span>
                <a :class="['icon', settings.playSounds.getValue() ? 'ion-ios-volume-up' : 'ion-ios-volume-off']" style="font-size: x-large" href="#" @click="settings.playSounds.toggleValue()"></a>
                <a class="icon ion-ios-settings" style="font-size: x-large" href="#" @click="selectSettings"></a>
            </span>
        </div>
        <div class="row">
            <button class="btn btn-secondary" style="width: 3rem" @click="pauseGame">
                <i :class="['icon', paused.getValue() ? 'ion-ios-pause' : 'ion-ios-pause-outline']"></i>
            </button>
            <button class="btn btn-secondary" style="width: 3rem" @click="speedupGame">
                <i :class="['icon', turbo.getValue() ? 'ion-ios-fastforward' : 'ion-ios-fastforward-outline']"></i>
            </button>
            <small style="padding-left: 10px; padding-top: 10px">({{ formatDays(module.bonusTicks.getValue()) }})</small>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { formatDays } from '../lib/utils';
export default {
    name: 'clock-display',
    computed: {
        clockRotation: function () {
            return 'rotate(' + 15 * this.time.currentTime + ', 50, 50)';
        },
        ...mapGetters([
            'time',
            'reverseSchedule',
            'currentActivity',
            'paused',
            'turbo',
            'bonusTicks',
            'settingsPane',
            'otherPane',
            'settings'
        ])
    },
    methods: {
        formatDays: formatDays,
        selectSettings: function () {
            this.selectPane(this.otherPane);
            this.selectPane(this.settingsPane);
        },
        ...mapActions([
            'pauseGame',
            'speedupGame',
            'selectPane'
        ])
    }
};
</script>
