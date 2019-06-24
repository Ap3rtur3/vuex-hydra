const { hydrate } = require('./hydra');
const { error, setSilence } = require('./lib');

const Plugin = {
    install(Vue) {
        Vue.prototype.$hydrate = function ({
            data,
            id,
            name,
            ignoreUndefined,
            silent,
        } = {}) {
            if (!this.$store) {
                error('No vuex store found');
                return;
            }

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
