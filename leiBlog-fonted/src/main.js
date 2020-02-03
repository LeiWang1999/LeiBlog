import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'
import vuetify from './plugins/vuetify';
import request from './request';
import iView from 'iview';
import 'iview/dist/styles/iview.css';


Vue.prototype.request = request

Vue.config.productionTip = false
Vue.use(iView);


new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
