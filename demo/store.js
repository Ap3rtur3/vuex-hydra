import Vue from 'vue';
import Vuex from 'vuex';
import { Plugin } from '../src/plugin';

Vue.use(Vuex);
Vue.use(Plugin);

const rootModule = {
    state: {
        moduleMessage: null
    },
    getters: {
        moduleMessage: state => state.moduleMessage,
    },
};

const namespacedModule = {
    namespaced: true,
    state: {
        namespacedMessage: null
    },
    getters: {
        namespacedMessage: state => state.namespacedMessage,
    },
    modules: {
        nestedModule: {
            namespaced: true,
            state: {
                nestedMessage: null
            },
            getters: {
                nestedMessage: state => state.nestedMessage,
            },
        }
    }
};

export default new Vuex.Store({
    modules: {
        rootModule,
        namespacedModule,
    },
    state: {
        inlineMessage: null,
        jsonMessage: null,
        windowMessage: null,
    },
    getters: {
        inlineMessage: state => state.inlineMessage,
        jsonMessage: state => state.jsonMessage,
        windowMessage: state => state.windowMessage,
    }
});
