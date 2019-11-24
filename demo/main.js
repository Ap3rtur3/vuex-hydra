import Vue from 'vue';
import App from './components/App.vue';
import store from './store';

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App),
    created() {
        // Below are several ways to hydrate the store:

        // 1. Inline data
        this.$hydrate({
            data: {
                // Root state
                root: {
                    inlineMessage: 'Loaded from inline data',
                },
                // Namespaced module state
                namespacedModule: {
                    namespacedMessage: 'Loaded from namespaced module'
                },
                // Nested namespaced module state
                'namespacedModule/nestedModule': {
                    nestedMessage: 'Loaded from nested module'
                }
            }
        });

        // 2. JSON in HTML
        this.$hydrate({ id: 'vuex-hydra' });

        // 3. Data in window object
        this.$hydrate({ name: 'Hydra' });
    },
}).$mount('#app');
