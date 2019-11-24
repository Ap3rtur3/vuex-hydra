const { log, error, fetchData } = require('./lib');

// Module constants
const ROOT_MODULE_NAME = 'root';

// Hydrate defaults
const defaultOptions = {
    id: null,
    name: null,
};

/**
 * Iterate over given modules merges their states with rootState
 * @param rootState Vuex store root state
 * @param data Module states
 * @returns {{}}
 */
const mergeStateWithData = (rootState, data) => Object.keys(data)
    .reduce((newState, moduleName) => {
        const moduleState = data[moduleName];
        if (moduleName === ROOT_MODULE_NAME) {
            // Merge with root state
            newState = {
                ...rootState,
                ...moduleState,
            };
        } else {
            // Merge module
            mergeNestedModules(newState, moduleName.split('/'), moduleState);
        }
        return newState;
    }, {});

/**
 * Follows path of module names, creates objects in state if they do not exist and assigns module state
 * @param rootState State to assign nested module state
 * @param path Array of property names (Module names)
 * @param state Module state
 * @returns {*} Merged state
 */
const mergeNestedModules = (rootState, path, state) => {
    const lastProp = path[path.length - 1];
    return path
        .reduce((pointer, prop) => {
            // Make sure path exists
            if (!pointer.hasOwnProperty(prop)) {
                pointer[prop] = {};
            }
            // Assign state
            if (prop === lastProp) {
                pointer[prop] = {
                    ...pointer[prop],
                    ...state,
                };
            }
            // Follow path
            return pointer[prop];
        }, rootState);
};

/**
 * Searches for data and assigns it to its stores
 * @param Vue
 * @param store
 * @param data
 * @param options
 */
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

    // Hydrate store with merged state
    const newState = mergeStateWithData(store.state, data);
    store.replaceState(newState);
};

module.exports = {
    hydrate,
};
