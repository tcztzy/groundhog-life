<template>
    <footer class="footer">
        <div class="container">
            <ul class="nav nav-tabs">
                <li v-for="f of footer" :key="f" class="nav-item" @click="selectPane(f)">
                    <a :class="['nav-link', state.selected ? 'active' : '', state.notified ? 'item-notified' : '']" :href="`#${f.id}`">{{ f.name }}</a>
                </li>
            </ul>
        </div>
    </footer>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'footer-display',
    components: {},
    computed: mapGetters(['research', 'panes']),
    methods: mapActions(['selectPane'])
};
</script>
