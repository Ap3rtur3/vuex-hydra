import Vue from 'vue';
import Vuex from 'vuex';
import { Plugin } from '../src/plugin';

Vue.use(Vuex);
Vue.use(Plugin);

const test = {
    state: {
        source: '',
    },
    getters: {
        source: state => state.source,
    }
};

export default new Vuex.Store({
    modules: {
        test,
    },
    state: {
        hello: '',
    },
    mutations: {},
    actions: {},
    getters: {
        hello: state => state.hello,
    }
});
