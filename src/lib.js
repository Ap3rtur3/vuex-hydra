
const isTestMode = (process && process.env && process.env.NODE_ENV === 'test');
const log = (msg) => !isTestMode && console.log(`[vuex-hydra] ${msg}`);
const error = (msg) => !isTestMode && console.error(`[vuex-hydra] ${msg}`);

// Checks DOM for data
const fetchData = ({ id, name }) => {
    if (id) {
        const element = document.getElementById(id);
        if (element) {
            try {
                return JSON.parse(element.innerHTML);
            } catch (e) {
                console.log(`Could not parse JSON! Element: ${id}`);
                error(`Could not parse JSON! Element: ${id}`);
            }
        } else {
            console.log(`Could not find element with id ${id}`);
            error(`Could not find element with id ${id}`);
        }
    }

    if (name && typeof window[name] === 'object') {
        return window[name];
    }

    return null;
};

module.exports = {
    log,
    error,
    fetchData,
};
