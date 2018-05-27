<template>
    <div>
        <div class="modal bd-example-modal-lg" id="bonusticksmodal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <template>
                        <div class="modal-header">
                            <h5 class="modal-title">Offline Bonus</h5>
                            <button class="close" type="button" data-dismiss="modal">&times;</button>d
                        </div>
                    </template>
                    You gained {{ formatDays(time.offlineBonusTicks) }} bonus days (double speed) while you were offline
                    <nobr>
                        Click <i class="icon ion-ios-fastforward-outline"></i> to use them.
                    </nobr>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { formatDays } from '../lib/utils';
export default {
    name: 'bonusticks-modal',
    computed: s.mapGetters(['time']),
    methods: {
        formatDays,
        ...mapGetters(['mapActions'])
    },
    mounted: function () {
        if (this.time.offlineBonusTicks > 50)
            window.$('#bonusticksmodal').modal('show');
    }
};
</script>
