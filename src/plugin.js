const { hydrate } = require('./hydra');
const { log, error } = require('./lib');

const Plugin = {
    install(Vue) {
        Vue.prototype.$hydrate = function ({ data, id, name, ignoreUndefined } = {}) {
            if (!this.$store) {
                error('No vuex store found');
                return;
            }

            hydrate(this.$store, data, { id, name, ignoreUndefined });
        };
    }
};

module.exports = {
    Plugin,
};
