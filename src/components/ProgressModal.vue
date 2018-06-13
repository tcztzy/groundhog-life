<template>
    <div id="progress-modal" class="modal" data-backdrop="static">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header"><h5 class="modal-title">Idle Progress</h5></div>
                <div class="modal-body">
                    <p>Calculating progress since you left. {{ daysBehind }} days left.</p>
                    <a href="#" @click="resetTimer">Just let me play!</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name: 'progress-modal',
    computed: mapGetters(['daysBehind']),
    methods: mapActions(['resetTimer'])
};
</script>

