const { hydrate } = require('./hydra');
const { log, error } = require('./lib');

const Plugin = {
    install(Vue, options) {
        Vue.prototype.$hydrate = function (data, options) {
            if (!this.$store) {
                error('No vuex store found');
                return;
            }

            hydrate(this.$store, data, options);
        };
    }
};

module.exports = {
    Plugin,
};
