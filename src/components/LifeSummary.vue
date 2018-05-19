<template>
    <div>
        <h5>Previous Life</h5>
        The highest levels reached in previous lives.
        <br>
        Reaching higher levels increases your progress speed in future lives.
        <br><br>
        <h3>Career</h3>
        <div v-for="career in careers" :key="career.name" v-if="career.jobs[0].xp.state.highestLevelEver > 0">
            <div class="row">
                <h5>{{ career.name }}</h5><br>
            </div>
            <table>
                <template>
                    <tr>
                        <th style="width: 15rem">Title</th>
                        <th style="width: 10rem">Level reached</th>
                        <th style="width: 10rem">Highest Level This Loop</th>
                        <th style="width: 10rem">Speedup-Factor</th>
                    </tr>
                </template>
                <tr
                    v-for="job in career.jobs"
                    v-if="job.xp.state.highestLevelThisLoop > 0"
                    :key="job"
                    :class="job.xp.recordClass()">
                    <td>{{ job.name }}</td>
                    <td>{{ job.xp.previousLevelReached() }}</td>
                    <td>{{ job.xp.state.highestLevelThisLoop }}</td>
                    <td>{{ job.xp.computePrestigeFactor() }}</td>
                </tr>
            </table>
            <br>
        </div>
        <br>
        <h3>Research</h3>
        <div v-for="field in fields" :key="field">
            <div class="row">
                <h5>{{ field.name }}</h5>
            </div>
            <table>
                <template>
                    <tr>
                        <td style="width: 15rem">Area</td>
                        <td style="width: 10rem">Level reached</td>
                        <td style="width: 10rem">Highest Level This Loop</td>
                        <td style="width: 10rem">Speedup-Factor</td>
                    </tr>
                </template>
                <tr
                    v-for="area in field.areas"
                    :key="area"
                    v-if="area.xp.state.highestLevelThisLoop > 0"
                    :class="area.xp.recordClass()">
                    <td>{{ area.name }}</td>
                    <td>{{ area.xp.previousLevelReached() }}</td>
                    <td>{{ area.xp.state.highestLevelThisLoop }}</td>
                    <td>{{ area.xp.computePrestigeFactor() }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Life-Summary',
    computed: mapGetters(['careers', 'fields'])
};
</script>
<style scoped>
    .new-record {
        color:green;
        font-weight:700;
    }
</style>
