const Vue = require('vue');
const { createVmWithStore } = require('./helpers.js');

describe('Hydra', () => {
    it('defines $hydrate', () => {
        const vm = new Vue();

        expect(vm.$hydrate).toBeDefined();
    });

    it('does nothing without data', () => {
        const test = 'test';

        const vm = createVmWithStore({ test });
        vm.$hydrate();

        expect(vm.$store.getters.test).toEqual(test);
    });

    it('hydrates root store', () => {
        const test = 'nothing';
        const hello = 'world';
        const data = { root: { test: hello } };

        const vm = createVmWithStore({ test });
        vm.$hydrate({ data });

        expect(vm.$store.getters.test).toEqual(hello);
    });

    it('hydrates namespaced store', () => {
        const test = 'nothing';
        const hello = 'world';
        const data = { space: { test: hello } };
        const vm = createVmWithStore({}, { space: { test } });
        vm.$hydrate({ data });
        expect(vm.$store.getters['space/test']).toEqual(hello);
    });

    it('hydrates with dom data', () => {
        const test = 'test';
        const data = JSON.stringify({ root: { test } });
        document.body.innerHTML = `<div id="test">${data}</div>`;

        const vm = createVmWithStore({ test: '' });
        vm.$hydrate({ id: 'test' });

        expect(vm.$store.getters.test).toEqual(test);
    });

    it('hydrates with window data', () => {
        const test = 'test';
        window.test = { root: { test } };

        const vm = createVmWithStore({ test: '' });
        vm.$hydrate({ name: 'test' });

        expect(vm.$store.getters.test).toEqual(test);
    });

    it('merges data with root state', () => {
        const test1 = 'stay';
        const test2 = 'overwrite';
        const test3 = 'remove';
        const data = { root: { test2, test3: undefined } };
        const vm = createVmWithStore({ test1, test2: null, test3 });
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

        const vm = createVmWithStore({ test1 }, {
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

        const vm = createVmWithStore({}, {
            nested: { module: { test1, test2: null, test3 } },
            really: { nested: { module: { test1, test2: null, test3 } } },
        });
        vm.$hydrate({ data });

        // check "nested" module
        expect(vm.$store.state.nested.module.test1).toEqual(test1);
        expect(vm.$store.state.nested.module.test2).toEqual(test2);
        expect(vm.$store.state.nested.module.test3).toBeUndefined();
        // check "really nested" module
        expect(vm.$store.state.really.nested.module.test1).toEqual(test1);
        expect(vm.$store.state.really.nested.module.test2).toEqual(test2);
        expect(vm.$store.state.really.nested.module.test3).toBeUndefined();
    });
});
