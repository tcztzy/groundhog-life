<template>
    <div v-if="messageBox.messages.length > 0" :class="[
        'alert',
        messageBox.newestMessage()[1],
        'alert-dismissible',
        'fade',
        'show',
        'floating',
        'text-center'
     ]" role="alert" @click="acknowledgeMessage">
        <button class="close" type="button" aria-label="Close"><span aria-hidden="true"></span>&times;</button>
        {{ messageBox.newestMessage()[0] }}
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'message-box',
    components: {},
    computed: mapGetters([
        'currency',
        'messageBox'
    ]),
    methods: mapActions(['acknowledgeMessage'])
};
</script>
<style scoped>
.floating {
    position:fixed;
    top:60px;
    right:20px;
    display:inline-block;
    margin:auto;height:60px;
}
</style>
