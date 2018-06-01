<template>
    <div>
        <div class="row">
            <stat-display :stat="stats.energy"></stat-display>
        </div>
        <template>
            <div class="row">
                Energy speeds up all research and career progress. <br>
                Energy depends on happiness and health. <br>
            </div>
        </template>
        <div class="row">
            <div style="">
                <br>
                <stat-display :stat="happiness"></stat-display>
                <img :src="getEmoji()" style="width: 40px;">
                <br>
                <span v-for="modifier of happiness.modifiers" :key="modifier">{{ modifier.explain() }}<br></span>
            </div>
        </div>
        <div class="row">
            <div style="">
                <stat-display :stat="stats.health"></stat-display>
                <span v-for="modifier of stats.health.modifiers" :key="modifier">{{ modifier.explain() }}<br></span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import StatDisplay from './StatDisplay.vue';

export default {
    name: 'happiness-explain',
    components: { StatDisplay },
    computed: mapGetters([
        'happiness',
        'stats'
    ]),
    methods: {
        getEmoji: function () {
            return require(`../asserts/img/${this.happiness.emojiName()}_emoji.svg`);
        }
    }
};
</script>
