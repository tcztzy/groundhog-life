<template>
    <tr>
        <td style="padding-right: 5px; padding-bottom: 5px;">
            <div
                :class="['progress', entity.state.active ? 'p-selected' : '']"
                style="height: 28px;"
                @click="setActiveResearch(entity)">
                <div
                    :class="[entity.state.active ? 'pb-selected' : 'pb-not-selected', 'progress-bar']"
                    :style="`height: 100%; width: ${entity.xp.perc()}%`"
                    role="progressbar"
                ></div>
                <span class="progress-label">{{ entity.name }}</span>
            </div>
        </td>
        <td class="text-center">
            {{ abbrLevel(entity.xp.state.level) }}
        </td>
        <td>
            <small>{{ entity.effect }}</small>
        </td>
        <td class="text-muted">
            {{ entity.xp.xpToNextLevelString() }}
        </td>
        <td style="padding-right: 10px;">
            <stat-display :stat="settings.xpPerHour.getValue() ? entity.xp.xpPerHourStat : entity.xp.xpPerDayStat" :name="false"/>
        </td>
        <td v-if="time.currentLife.getValue() > 1" class="text-center">
            {{ abbrLevel(entity.xp.state.highestLevelThisLoop) }}
        </td>
    </tr>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { abbreviateNumber } from "@/lib/utils";
import StatDisplay from './StatDisplay';

export default {
    name: 'area-button',
    components: { StatDisplay },
    props: ['entity'],
    computed: mapGetters([
        'time',
        'research',
        'settings'
    ]),
    methods: {
        xpPerDay: function (module) {
            return abbreviateNumber(module.xp.xpPerHourStat.effective * this.research.duration.effective / 60, module.xp.xpPerHourStat.digits);
        },
        abbrLevel: function (level) {
            return level < 10000 ? level : abbreviateNumber(level, 2);
        },
        ...mapActions(['setActiveResearch'])
    }
};
</script>
