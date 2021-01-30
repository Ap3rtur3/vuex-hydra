const Vue = require('vue');
const Vuex = require('vuex');
const { Plugin } = require('../../src/plugin');

Vue.use(Vuex);
Vue.use(Plugin);

const createStoreGetters = (state) =>
    Object.keys(state)
        .reduce((getters, prop) => {
            getters[prop] = state => state[prop];
            return getters;
        }, {});

// Creates store and vue instance
const createVmWithStore = (state = {}, modules = {}) => {
    const getters = createStoreGetters(state);
    const config = { state, getters };
    if (Object.keys(modules).length > 0) {
        config.modules = {};
        for (const name in modules) {
            const state = modules[name];
            const getters = createStoreGetters(state);
            config.modules[name] = { namespaced: true, state, getters };
        }
    }
    const store = new Vuex.Store(config);

    return new Vue({ store });
};

module.exports = {
    createVmWithStore,
};
