const { hydrate } = require('./hydra');
const { error, setSilence } = require('./lib');

const Plugin = {
    install(Vue) {
        Vue.prototype.$hydrate = function (config = {}) {
            if (!this.$store) {
                error('No vuex store found');
                return;
            }

            const {
                data,
                id,
                name,
                ignoreUndefined,
                silent,
            } = config;

            setSilence(silent);
            hydrate(this.$store, data, {
                id,
                name,
                ignoreUndefined,
            });
        };
    }
};

module.exports = {
    Plugin,
};
