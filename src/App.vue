<template>
    <div id="app">
        <div class="container-fluid">
            <bonusticks-modal/>
            <austerity-alert/>
            <div class="row">
                <sidebar-display/>
                <div class="col-md-8">
                    <navbar-display :panes="panes"/>
                    <main-pane/>
                </div>
            </div>
        </div>
        <message-box/>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import MainPane from './components/MainPane.vue';
import TimeWarning from './components/TimeWarning.vue';
import PrestigeInfo from './components/PrestigeInfo.vue';
import ProgressModal from './components/ProgressModal.vue';
import MessageBox from './components/MessageBox.vue';
import AusterityAlert from './components/AusterityAlert.vue';
import SidebarDisplay from './components/SidebarDisplay.vue';
import NavbarDisplay from './components/NavbarDisplay.vue';
import BonusticksModal from './components/BonusTicksModal.vue';
import FooterDisplay from './components/FooterDisplay.vue';

export default {
    name: "app",
    components: {
        TimeWarning,
        PrestigeInfo,
        ProgressModal,
        SidebarDisplay,
        NavbarDisplay,
        MainPane,
        FooterDisplay,
        AusterityAlert,
        MessageBox,
        BonusticksModal
    },
    computed: mapGetters([
        'timeConfig',
        'time',
        'panes',
        'settings'
    ]),
    methods: {
        mainLoop() {
            const now = new Date();
            let currentTime = now.getTime();
            let tickLength = this.timeConfig.tickLength;
            if (
                !this.settings.idleMode.getValue() ||
                this.time.currentDay.getValue() <= 1
            ) {
                this.time.lastTime = Math.max(
                    this.time.lastTime,
                    currentTime - 2 * tickLength
                );
            }
            let duration = currentTime - this.time.lastTime;
            const r = duration / tickLength;
            let i = 1;
            if (r > 200) {
                i = 100;
            }
            if (tickLength < duration) {
                this.tick(i);
                (duration -= tickLength * i);
            }
            tickLength < duration ? setTimeout(this.mainLoop, 5) : setTimeout(this.mainLoop, Math.min(1000, tickLength / 3));
        },
        ...mapActions([
            'tick',
            'initializeTiming'
        ])
    },
    created: function () {
        this.initializeTiming();
        this.mainLoop();
    }
};
</script>
