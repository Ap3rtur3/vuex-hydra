
const isTestMode = (process && process.env && process.env.NODE_ENV === 'test');
const log = (msg) => !isTestMode && console.log(`[vuex-hydra] ${msg}`);
const error = (msg) => !isTestMode && console.error(`[vuex-hydra] ${msg}`);

module.exports = {
    log,
    error
};
