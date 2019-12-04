const { error, fetchData, mergeStateWithData } = require('./lib');

// Hydrate defaults
const defaultOptions = {
    id: null,
    name: null,
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
