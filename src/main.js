import Vue from 'vue'
import App from './App.vue'
//import VueAxios from 'vue-axios'
import VueRouter from 'vue-router';
import { routes } from './routes';
import store from './components/store/store';

Vue.use(VueRouter);
///stocks/2zSEqKRMYiWTBI1ENvhr


Vue.config.productionTip = false


const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
