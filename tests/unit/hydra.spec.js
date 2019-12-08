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

// Creates store and vue instance
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
        expect(vm.$store.getters['space/test']).toEqual(hello);
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

    it('merges data with root state', () => {
        const test1 = 'stay';
        const test2 = 'overwrite';
        const test3 = 'remove';
        const data = { root: { test2, test3: undefined } };
        setupStore({ test1, test2: null, test3 });
        vm.$hydrate({ data });
        expect(vm.$store.state.test1).toEqual(test1);
        expect(vm.$store.state.test2).toEqual(test2);
        expect(vm.$store.state.test3).toBeUndefined();
    });

    it('merges data with module state', () => {
        const test1 = 'stay';
        const test2 = 'overwrite';
        const test3 = 'remove';
        const data = { module: { test2, test3: undefined } };
        setupStore({ test1 }, {
            module: { test1, test2: null, test3 }
        });
        vm.$hydrate({ data });
        expect(vm.$store.state.test1).toEqual(test1);
        expect(vm.$store.state.test3).toBeUndefined();
        expect(vm.$store.state.module.test1).toEqual(test1);
        expect(vm.$store.state.module.test2).toEqual(test2);
        expect(vm.$store.state.module.test3).toBeUndefined();
    });

    it('merges nested module state', () => {
        const test1 = 'stay';
        const test2 = 'overwrite';
        const test3 = 'remove';
        const data = {
            'nested/module': { test2, test3: undefined },
            'really/nested/module': { test2, test3: undefined }
        };
        setupStore({}, {
            nested: { module: { test1, test2: null, test3 } },
            really: { nested: { module: { test1, test2: null, test3 } } },
        });
        vm.$hydrate({ data });
        expect(vm.$store.state.nested.module.test1).toEqual(test1);
        expect(vm.$store.state.nested.module.test2).toEqual(test2);
        expect(vm.$store.state.nested.module.test3).toBeUndefined();
        expect(vm.$store.state.really.nested.module.test1).toEqual(test1);
        expect(vm.$store.state.really.nested.module.test2).toEqual(test2);
        expect(vm.$store.state.really.nested.module.test3).toBeUndefined();
    });
});
