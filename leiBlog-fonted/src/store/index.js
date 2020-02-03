import Vue from 'vue'
import Vuex from 'vuex'
import Layout from './modules/layout'
import Info from './modules/info'
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Layout,
        Info
    }
})