const { createVmWithStore } = require('./helpers.js');

const MAX_DEPTH = 3;

function createModules(amount, depth = 0) {
    const modules = {};
    for (let i = 0; i < amount; i++) {
        modules[`module${i}`] = depth === MAX_DEPTH
            ? {}
            : createModules(10, depth + 1);
    }
    return modules;
}

describe('Performance', () => {
    it('checks performance', () => {
        let avg = 0;
        for (let i = 0; i < 50; i++) {
            const vm = createVmWithStore();
            const start = performance.now();
            vm.$hydrate({ data: createModules(25) });
            const end = performance.now();
            avg += end - start;
        }
        avg /= 50;
        console.log(`Hydration takes on average: ${avg} ms`);
    });
});
