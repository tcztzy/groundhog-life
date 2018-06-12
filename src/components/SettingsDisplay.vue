<template>
    <div>
        <h5>Gameplay</h5>
        <input v-model="settings.pauseOnPrestige.state.value" type="checkbox" id="checkbox-pauseOnePrestige">
        <label for="checkbox-pauseOnePrestige">Auto-Pause when staring a new life</label>
        <br>
        <button class="btn" role="button" @click="toggleNightMode">Toggle Night Mode</button>
        <br>
        <h5>Import/Export Savegame</h5>
        <br>
        <small>Note: imports from pre-kongregate versions of this game are not officially supported, but feel free to try</small>
        <br>
        <button class="btn" role="button" @click="exportSaveHelper">Export</button>
        <button class="btn" role="button" @click="importSaveHelper">Import</button>
        <br>
        <textarea ref="savegamearea" name="" id="" cols="50" rows="10" onclick="this.select()"></textarea>
        <br>
        <br>
        <br>
        <br>
        <h1>WARNING! THE FOLLOWING BUTTON WILL DELETE YOUR PROGRESS! (EXCEPT TACHYONS AND MARKET ITEMS, WHICH ARE LINKED TO YOUR ACCOUNT)</h1>
        <button class="btn" role="button" @click="hardReset">Hard Reset</button>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'settings-display',
    computed: mapGetters(['settings', 'saver']),
    methods: {
        exportSaveHelper: function () {
            this.$refs.savegamearea.value = this.saver.saveString;
        },
        importSaveHelper: function () {
            this.importSave(this.$refs.savegamearea.value);
        },
        toggleNightMode: function () {
            window.document.body.classList.toggle('night-mode');
        },
        ...mapActions(['hardReset', 'importSaver'])
    }
};
</script>
