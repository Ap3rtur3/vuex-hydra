const { log, error } = require('./lib');

// Checks DOM for data
const fetchData = () => {

};

const hydrate = (store, data, options) => {
    if (!data) {
        data = fetchData();
        if (!data) {
            error('No data found to hydrate store');
            return;
        }
    }

    // Check namespaced modules
    const modules = store._modulesNamespaceMap;
    for (const name in modules) {
        const module = modules[name];
        if (!module.state || !data.modules || !data.modules[name]) {
            continue;
        }

        const moduleState = data.modules[name];
        for (const prop in module.state) {
            const propData = moduleState[prop];
            if (propData) {
                store._modulesNamespaceMap[name].state[prop] = propData;
            }
        }
    }

    if (data.root && store._modules.root.state) {
        for (const prop in store._modules.root.state) {
            const propData = data.root[prop];
            if (propData) {
                store._modules.root.state[prop] = propData;
            }
        }
    }
};

module.exports = {
    hydrate
};
