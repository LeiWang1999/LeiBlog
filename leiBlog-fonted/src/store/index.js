import Vue from 'vue'
import Vuex from 'vuex'
import Layout from './modules/layout'
import Maps from './modules/maps';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Layout,
        Maps
    }
})