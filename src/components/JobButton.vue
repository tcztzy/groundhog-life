<template>
    <tr>
        <td style="padding-right: 5px; padding-bottom: 5px;">
            <div :class="['progress', entity.state.active ? 'p-selected' : '']" style="height: 28px;" @click="setActiveJob(entity)">
                <div
                    :class="[entity.state.active ? 'pb-selected' : 'pb-not-selected', 'progress-bar']"
                    :style="`height: 100%; width: ${entity.xp.perc()}%`"
                    role="progressbar">
                    <span class="progress-label">{{ entity.name }}</span>
                </div>
            </div>
        </td>
        <td class="text-center">
            {{ abbrLevel(entity.xp.state.level) }}
        </td>
        <td class="text-center" style="padding-right: 30px">
            <stat-display :stat="entity.income" :name="false"></stat-display>
        </td>
        <td class="text-muted">
            {{ entity.xp.xpToNextLevelString() }}
        </td>
        <td style="padding-right: 10px;">
            <stat-display
                v-if="settings.xpPerHour.getValue()"
                :stat="entity.xp.xpPerHourStat"
                :name="false"
            ></stat-display>
            <stat-display
                v-else
                :stat="entity.xp.xpPerDayStat"
                :name="false"
            ></stat-display>
        </td>
        <td
            v-if="time.currentLife.getValue() > 1"
            class="text-center"
        >{{ entity.xp.state.highestLevelThisLoop }}</td>
    </tr>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { abbreviateNumber } from "../lib/utils";
import StatDisplay from "./StatDisplay.vue";

export default {
    name: 'job-button',
    components: { StatDisplay },
    props: ['entity'],
    computed: mapGetters([
        'time',
        'settings',
        'baseWorkXpPerHourStat'
    ]),
    methods: {
        xpPerDay: function (job) {
            return abbreviateNumber(job.xp.xpPerHourStat.effective * this.research.duration.effective / 60, job.xp.xpPerHourStat.digits);
        },
        abbrLevel: function (level) {
            return level < 10000 ? level : abbreviateNumber(level, 2);
        },
        ...mapActions(['setActiveJob'])
    }
};
</script>
