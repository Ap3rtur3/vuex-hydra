import Vue from 'vue';
import Vuex from 'vuex';
import { Plugin } from '/Users/grafik/projects/vuex-hydra/src/plugin';

Vue.use(Vuex);
Vue.use(Plugin);

export default new Vuex.Store({
    state: {
        userInput: '',
        inlineMessage: 'NULL',
        jsonMessage: 'NULL',
        windowMessage: 'NULL',
    },
    getters: {
        userInput: state => state.userInput,
        inlineMessage: state => state.inlineMessage,
        jsonMessage: state => state.jsonMessage,
        windowMessage: state => state.windowMessage,
    }
});
