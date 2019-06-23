const { log, error, fetchData } = require('./lib');

const defaultOptions = {
    id: null,
    name: 'Hydra',
    ignoreUndefined: true,
};

const hydrate = (store, data, options = {}) => {
    options = {
        ...defaultOptions,
        ...options,
    };

    if (!data) {
        const { id, name } = options;
        data = fetchData({ id, name });

        if (!data) {
            error('No data found to hydrate store');
            return;
        }
    }

    // Assign namespaced modules
    const modules = store._modulesNamespaceMap;
    for (const name in modules) {
        const module = modules[name];
        if (!module.state || !data.modules || !data.modules[name]) {
            continue;
        }

        // Assign every prop
        const newState = data.modules[name];
        for (const prop in newState) {
            // Skip if prop is not defined in original state
            if (options.ignoreUndefined && !module.state.hasOwnProperty(prop)) {
                continue;
            }

            const propData = newState[prop];
            if (propData) {
                module.state[prop] = propData;
            }
        }
    }

    // Assign root state
    const rootModule = store._modules.root;
    if (data.root && rootModule.state) {
        const newState = data.root;
        for (const prop in newState) {
            if (options.ignoreUndefined && !rootModule.state.hasOwnProperty(prop)) {
                continue;
            }

            const propData = newState[prop];
            if (propData) {
                rootModule.state[prop] = propData;
            }
        }
    }
};

module.exports = {
    hydrate,
};
