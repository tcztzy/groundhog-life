<template>
    <div>
        <img :src="getEmoji()" style="width: 40px;"/>
        <a href="#" @click="showInfo">(info)</a>
        <stat-display :stat="stats.happiness"/><stat-display :stat="stats.health"/>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import StatDisplay from './StatDisplay.vue';

export default {
    name: 'happiness-display',
    components: { StatDisplay },
    computed: mapGetters([
        'stats',
        'happinessPane',
        'lifestylePane'
    ]),
    methods: {
        getEmoji: function () {
            return require(`./${this.stats.happiness.emojiName()}_emoji.svg`);
        },
        showInfo: function () {
            this.selectPane(this.lifestylePane);
            this.selectPane(this.happinessPane);
        },
        ...mapActions(['selectPane'])
    }
};
</script>
