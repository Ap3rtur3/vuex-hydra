const { log, error, fetchData } = require('./lib');

const defaultOptions = {
    id: null,
    name: null,
    ignoreUndefined: true,
};

const assign = (Vue, module, state, options) => {
    for (const prop in state) {
        // Skip if prop is not defined in original state
        if (options.ignoreUndefined && !module.state.hasOwnProperty(prop)) {
            continue;
        }

        const propData = state[prop];
        if (propData) {
            Vue.set(module.state[prop], propData);
        }
    }
};

const hydrate = (Vue, store, data, options = {}) => {
    options = {
        ...defaultOptions,
        ...options,
    };

    // Search for data if none is passed
    if (!data) {
        const { id, name } = options;
        data = fetchData({ id, name });

        if (!data) {
            error('No data found to hydrate store');
            return;
        }
    }

    
    log('$hydrate data', data);

    // Assign namespaced module state
    const modules = store._modulesNamespaceMap;
    for (const name in modules) {
        const module = modules[name];
        if (!module.state || !data[name]) {
            continue;
        }

        const newState = data.modules[name];
        assign(Vue, module, newState, options);
    }

    // Assign root state
    const rootModule = store._modules.root;
    if (data.root && rootModule.state) {
        const newState = data.root;
        assign(Vue, rootModule, newState, options);
    }
};

module.exports = {
    hydrate,
};
