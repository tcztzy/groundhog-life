<template>
    <div>
        <div class="row">
            <nobr>
                <button
                    class="btn m-3"
                    style="width: 9rem;"
                    role="button"
                    :disabled="!userInventory.haveAutoBoost"
                    @click="autoBoost.toggleValue()"
                >
                    <small>Auto-Boost is {{ autoBoost.select('On', 'Off') }}</small>
                </button>
                <span v-if="userInventory.haveAutoBoost">
                    <input v-model="autoBoostStack.value" type="checkbox" id="abs">
                    <label for="abs">Stack</label>
                    <input v-model.number="autoBoostExclConference.value" type="checkbox" id="excl-conf">
                    <label for="excl-conf">Wait for Conference</label>
                    <input v-model="autoBoostJustPause.value" type="checkbox" id="abjp">
                    <label for="abjp">Pause if ready</label>
                </span>
                <a v-else href="#" @click="selectPane(groundhogMarketPane)">
                    <small>Unlock</small>
                </a>
            </nobr>
        </div>
        <div class="row">
            <h5>Boosts</h5>
        </div>
        <div class="row">
            <table>
                <tr>
                    <th style="width: 12rem;"></th>
                    <th style="width: 15rem; padding-left: 20px;">Effect</th>
                    <th style="width: 6rem;">Days Left</th>
                    <th style="width: 3rem;">Cooldown</th>
                </tr>
                <tr v-for="boost of boosts" :key="boost" v-if="boost.unlocked()">
                    <td>
                        <button
                            :class="['btn', boost.buttonState()]"
                            style="width: 10rem;"
                            role="button"
                            @click="activateBoost(boost)">
                            {{ boost.name }}
                        </button>
                    </td>
                    <td style="padding-left: 20px;">
                        {{ boost.description }}
                    </td>
                    <td>
                        {{ boost.daysLeft() }}
                    </td>
                    <td>
                        {{ formatDays(boost.cooldownLeft(), true) }}
                    </td>
                </tr>
                <tr v-else>
                    <td colspan="4">Requires: {{ locks.lockString() }}</td>
                </tr>
            </table>
        </div>
        <assistants-display/>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import AssistantsDisplay from './AssistantsDisplay.vue';
import { formatDays } from '../lib/utils';

export default {
    name: 'boost-display',
    computed: mapGetters([
        'boosts',
        'autoBoost',
        'autoBoostExclConference',
        'autoBoostJustPause',
        'autoBoostStack',
        'userInventory'
    ]),
    components: {
        AssistantsDisplay
    },
    methods: {
        formatDays,
        ...mapActions(['activateBoost'])
    }
};
</script>
