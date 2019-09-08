let isSilent = false;
const isTestMode = (process && process.env && process.env.NODE_ENV === 'test');
const log = (...args) => !isSilent && !isTestMode && console.log('[vuex-hydra]', ...args);
const error = (...args) => !isSilent && !isTestMode && console.error('[vuex-hydra]', ...args);

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
    if (name && typeof window[name] === 'object') {
        return window[name];
    }

    return null;
};

// Update silence flag from outside
const setSilence = (bool) => {
    isSilent = bool;
};

module.exports = {
    log,
    error,
    fetchData,
    setSilence,
};
