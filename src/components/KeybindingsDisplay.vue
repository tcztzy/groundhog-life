<template>
    <div>
        <label for="pause">Pause/Continue</label>
        <input v-model="keyBindings.state.pause" type="text" id="pause" maxlength="1" size="2">
        <br>
        <label for="boosts">Activate all Boosts</label>
        <input v-model="keyBindings.state.boost" type="text" id="boosts" maxlength="1" size="2">
        <br>
        <label for="speedup">Fast Forward</label>
        <input v-model="keyBindings.state.speedup" type="text" id="speedup" maxlength="1" size="2">
        <br>
        <label for="tltabs">Top Level Tabs</label>
        <input v-model="keyBindings.state.tlp" type="text" id="tltabs" maxlength="8" size="8">
        <br>
        <label for="sltabs">Sub Level Tabs</label>
        <input v-model="keyBindings.state.slp" type="text" id="sltabs" maxlength="8" size="8">
        <br>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'keybindings-display',
    computed: mapGetters(['keyBindings']),
    methods: {...mapActions([])}
};
</script>
<style scoped>
    label {
        display: inline-block;
        width: 140px;
        text-align: right;
    }
</style>
