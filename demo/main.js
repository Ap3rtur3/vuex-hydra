import Vue from 'vue';
import App from './components/App.vue';
import store from './store';
import VueEventRegistry from 'vue-event-registry';

Vue.use(VueEventRegistry);

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App),
    created() {
        // Below are several ways to hydrate the store:

        // 1. Inline data
        const data = {
            root: { hello: 'world' },
            test: { source: 'inline' }
        };
        this.$events.on('hydrate:inline', () => {
            this.$hydrate({ data });
        });

        // 2. JSON in HTML
        this.$events.on('hydrate:json', () => {
            this.$hydrate({ id: 'vuex-hydra' });
        });

        // 3. Data in window object
        this.$events.on('hydrate:window', () => {
            this.$hydrate({ name: 'Hydra' });
        });
    },
}).$mount('#app');
