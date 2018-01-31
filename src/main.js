import Vue from 'vue';
import 'bootstrap';
import BootstrapVue from 'bootstrap-vue';
import './HackTimer.min';
import App from './App.vue';
import store from './store';
Vue.config.productionTip = false;
Vue.use(BootstrapVue);

new Vue({
    store: store,
    el: '#app',
    template: "<App/>",
    components: { App }
});
