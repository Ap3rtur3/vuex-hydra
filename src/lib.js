import merge from 'deepmerge';

let isSilent = false;
const isTestMode = (process && process.env && process.env.NODE_ENV === 'test');
const log = (...args) => !isSilent && !isTestMode && console.log('[vuex-hydra]', ...args);
const error = (...args) => !isSilent && !isTestMode && console.error('[vuex-hydra]', ...args);

// Module constants
const ROOT_MODULE_NAME = 'root';

// Searches for data
const fetchData = ({ id, name }) => {
    // Check DOM for JSON
    if (id) {
        const element = document.getElementById(id);
        if (element) {
            try {
                return JSON.parse(element.innerHTML);
            } catch (e) {
                error(`Could not parse JSON! Element: ${id}`);
            }
        } else {
            error(`Could not find element with id ${id}`);
        }
    }

    // Check window object
    if (name && window && typeof window[name] === 'object' && window[name] !== null) {
        return window[name];
    }

    return null;
};

/**
 * Iterates over given modules and merges their states with rootState
 * @param rootState Vuex store root state
 * @param data Module states
 * @returns {{}}
 */
const mergeStateWithData = (rootState, data) => {
    const newState = merge({}, rootState);
    return Object.keys(data)
        .reduce((newState, moduleName) => {
            if (!data.hasOwnProperty(moduleName)) {
                return newState;
            }

            const moduleState = data[moduleName];
            if (moduleName === ROOT_MODULE_NAME) {
                // Merge with root state
                newState = merge(newState, moduleState);
            } else {
                // Build nested module state and merge with new state
                const moduleParts = moduleName.split('/').reverse();
                const moduleObj = moduleParts.reduce((obj, name) => ({ [name]: obj }), moduleState);
                newState = merge(newState, moduleObj);
            }
            return newState;
        }, newState);
};

// Update silence flag from outside
const setSilence = (bool) => {
    isSilent = bool;
};

module.exports = {
    log,
    error,
    fetchData,
    mergeStateWithData,
    setSilence,
};
