<template>
    <div v-if="currency.money.austerityAlert" class="alert alert-danger alert-dismissible fade show" role="alert">
        <button class="close" type="button" aria-label="Close" @click="acknowledgeAusterity"><span aria-hidden="true"></span>&times;</button>
        <strong>You went bankrupt!</strong> Your expenses were automatically reduced, and work hours increased.<br/>Your assistants were fired, and you moved back to your parents.<br/>
        Take care of your finances!
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'austerity-alert',
    components: {},
    computed: mapGetters(['currency']),
    methods: mapActions(['acknowledgeAusterity'])
};
</script>
