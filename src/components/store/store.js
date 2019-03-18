import Vue from 'vue';
import Vuex from 'vuex';
import stocks from './modules/stocks';
import portfolio from './modules/portfolio';
import * as actions from './actions';
import axios from 'axios';
import VueAxios from 'vue-axios'


Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
    actions,
    modules: {
        stocks,
        portfolio
    }
})