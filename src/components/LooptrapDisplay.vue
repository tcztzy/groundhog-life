<template>
    <div>
        <h3>Looptrap Device</h3>
        With this device, you can trap an improved version of yourself in the endless loop.
        <br>
        The device will convert your current groundhog factor into a permanent multiplier, depending on the efficiency of the device.
        <br>
        For example, if your highest level for a skill is 300, then the groundhog factor is approximately 30.\n  If the device operates at 0.1 efficiency, this factor will be converted into a permanent 3x speedup.\n  This allows the improved version of yourself to go further than you ever could.
        <br>
        If you use the device multiple times, the permanent multipliers add up.
        <br>
        Efficiency depends on research and number of alien ships destroyed.
        <br><br>
        <stat-display :stat="loopTrap.efficiency"/>
        <br>
        <strong>You will lose your progress in exchange for the loop trap multiplier, including Groundhog Bonuses! You will not gain Tachyons for using the LoopTrap Device. You will keep all Achievements, Tachyons and Market Purchases.</strong>
        <br>
        <button
            class="btn btn-primary"
            role="button"
            :disabled="loopTrap.efficiency.effective < 0.03"
            @click="grandPrestige">
            Activate LoopTrap Device
        </button>
        <br>
        <small>Need at least 0.03 efficiency</small>
        <br><br>
        <h3>Career</h3>
        <template v-for="career of careers">
            <div v-if="career.jobs[0].xp.state.highestLevelEver > 0" :key="career">
                <div class="row">
                    <h5>{{ career.name }}</h5>
                    <br>
                </div>
                <table>
                    <tr>
                        <th style="width: 15rem;">Title</th>
                        <th style="width: 10rem;">Highest Level reached</th>
                        <th style="width: 10rem;">Groundhog Factor</th>
                        <th style="width: 10rem;">Current Looptrap Speedup</th>
                        <th style="width: 10rem;">After Loop Trap</th>
                    </tr>
                    <template v-for="job of jobs">
                        <tr :key="job" :class="job.xp.recordClass()">
                            <td>{{ job.name }}</td>
                            <td>{{ Math.max(job.xp.state.highestLevelThisLoop, job.xp.state.level) }}</td>
                            <td>{{ abbr(job.xp.futurePrestigeFactor()) }}</td>
                            <td>{{ abbr(job.xp.state.loopTrapMultiplier) }}</td>
                            <td>{{ abbr(job.xp.state.loopTrapMultiplier + job.xp.futurePrestigeFactor() * loopTrap.efficiency.effective) }}</td>
                        </tr>
                    </template>
                </table>
                <br>
            </div>
        </template>
        <br>
        <h3>Research</h3>
        <div v-for="field of fields" :key="field">
            <div class="row"><h5>{{ field.name }}</h5></div>
            <table>
                <tr>
                    <th style="width: 15rem;">Title</th>
                    <th style="width: 10rem;">Highest Level reached</th>
                    <th style="width: 10rem;">Groundhog Factor</th>
                    <th style="width: 10rem;">Current Looptrap Speedup</th>
                    <th style="width: 10rem;">After Loop Trap</th>
                </tr>
                <tr v-for="area of field.areas" :key="area" v-if="area.xp.state.highestLevelEver > 0" :class="area.xp.recordClass()">
                    <td>{{ area.name }}</td>
                    <td>{{ Math.max(area.xp.state.highestLevelThisLoop, area.xp.state.level) }}</td>
                    <td>{{ abbr(area.xp.futurePrestigeFactor()) }}</td>
                    <td>{{ abbr(area.xp.state.loopTrapMultiplier) }}</td>
                    <td>{{ abbr(area.xp.state.loopTrapMultiplier + area.xp.futurePrestigeFactor() * loopTrap.efficiency.effective) }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import StatDisplay from './StatDisplay.vue';
import { abbreviateNumber } from "@/lib/utils";

export default {
    name: 'looptrap-display',
    components: { StatDisplay },
    computed: mapGetters([
        'loopTrap',
        'careers',
        'prestiger',
        'fields',
        'jobPane',
        'settings',
        'paused'
    ]),
    methods: {
        abbr: abbreviateNumber,
        grandPrestige: function () {
            this.prestiger.grandPrestige();
            this.selectPane(this.jobPane);
            if (this.settings.pauseOnPrestige.getValue())
                this.paused.setValue(true);
        },
        ...mapActions(['selectPane'])
    }
};
</script>
