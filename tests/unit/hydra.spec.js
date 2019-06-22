const Vue = require('vue');
const Vuex = require('vuex');
const { Plugin } = require('../../src/plugin');
let vm, store;

Vue.use(Vuex);
Vue.use(Plugin);

const createStoreGetters = (state) =>
    Object.keys(state)
        .reduce((getters, prop) => {
            getters[prop] = state => state[prop];
            return getters;
        }, {});

const setup = (state, namespace = false) => {
    const getters = createStoreGetters(state);
    if (namespace) {
        const module = { namespaced: true, state, getters };
        store = new Vuex.Store({ modules: { [namespace]: module } });
    } else {
        store = new Vuex.Store({ state, getters });
    }
    vm = new Vue({ store });
};

describe('Hydra', () => {
    it('defines $hydrate', () => {
        vm = new Vue();
        expect(vm.$hydrate).toBeDefined();
    });

    it('does nothing without data', () => {
        const test = 123;
        setup({ test });
        vm.$hydrate();
        expect(vm.$store.getters.test).toEqual(test);
    });

    it('hydrates root store', () => {
        const test = 'nothing';
        const hello = 'world';
        setup({ test });
        vm.$hydrate({ root: { test: hello } });
        expect(vm.$store.getters.test).toEqual(hello);
    });

    it('hydrates namespaced store', () => {
        const test = 'nothing';
        const hello = 'world';
        setup({ test }, 'space');
        vm.$hydrate({ space: { test: hello } });
        expect(vm.$store.getters['space/test']).toEqual(test);
    });
});
