import Vue from 'vue';
import Vuex from 'vuex';
import { Plugin } from '../src/plugin';

Vue.use(Vuex);
Vue.use(Plugin);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
});
