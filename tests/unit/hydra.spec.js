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

// Creates store and view model
const setupStore = (state = {}, modules = {}) => {
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
    store = new Vuex.Store(config);
    vm = new Vue({ store });
};

describe('Hydra', () => {
    it('defines $hydrate', () => {
        vm = new Vue();
        expect(vm.$hydrate).toBeDefined();
    });

    it('does nothing without data', () => {
        const test = 'test';
        setupStore({ test });
        vm.$hydrate();
        expect(vm.$store.getters.test).toEqual(test);
    });

    it('hydrates root store', () => {
        const test = 'nothing';
        const hello = 'world';
        const data = { root: { test: hello } };
        setupStore({ test });
        vm.$hydrate({ data });
        expect(vm.$store.getters.test).toEqual(hello);
    });

    it('hydrates namespaced store', () => {
        const test = 'nothing';
        const hello = 'world';
        const data = { space: { test: hello } };
        setupStore({}, { space: { test } });
        vm.$hydrate({ data });
        expect(vm.$store.getters['space/test']).toEqual(test);
    });

    it('hydrates with dom data', () => {
        const test = 'test';
        const data = JSON.stringify({ root: { test } });
        document.body.innerHTML = `<div id="test">${data}</div>`;
        setupStore({ test: '' });
        vm.$hydrate({ id: 'test' });
        expect(vm.$store.getters.test).toEqual(test);
    });

    it('hydrates with window data', () => {
        const test = 'test';
        window.test = { root: { test } };
        setupStore({ test: '' });
        vm.$hydrate({ name: 'test' });
        expect(vm.$store.getters.test).toEqual(test);
    });

    it('ignores data properly', () => {
        const overwrite = 'test1';
        const ignore = 'test2';
        const data = { root: { overwrite, ignore } };
        setupStore({ overwrite: '' });
        vm.$hydrate({ data, ignoreUndefined: true });
        expect(vm.$store.getters.overwrite).toEqual(overwrite);
        expect(vm.$store._modules.root.state.ignore).toBeUndefined();
    });
});
