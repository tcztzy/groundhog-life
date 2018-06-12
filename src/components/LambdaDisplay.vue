<script>
import { mapGetters, mapActions } from 'vuex';
import NavbarDisplay from './NavbarDisplay.vue';
import WarDisplay from './WarDisplay.vue';
import LooptrapDisplay from './LooptrapDisplay.vue';

export default {
    name: 'lambda-display',
    components: {
        LooptrapDisplay,
        WarDisplay,
        NavbarDisplay
    },
    computed: mapGetters(['lambdaPane']),
    methods: mapActions([])
};
</script>
