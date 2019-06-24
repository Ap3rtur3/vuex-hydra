let isSilent = false;
const isTestMode = (process && process.env && process.env.NODE_ENV === 'test');
const log = (msg) => !isSilent && !isTestMode && console.log(`[vuex-hydra] ${msg}`);
const error = (msg) => !isSilent && !isTestMode && console.error(`[vuex-hydra] ${msg}`);

// Checks DOM for data
const fetchData = ({ id, name }) => {
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

    if (name && typeof window[name] === 'object') {
        return window[name];
    }

    return null;
};

const setSilence = (bool) => {
    isSilent = bool;
};

module.exports = {
    log,
    error,
    fetchData,
    setSilence,
};
