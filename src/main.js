import Vue from 'vue'
import App from './App.vue'
import {firebase} from 'firebase';
import VueRouter from 'vue-router';
import { routes } from './routes';
import store from './components/store/store';

Vue.use(VueRouter);
///stocks/2zSEqKRMYiWTBI1ENvhr


const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA8saY_c4QiZLXXKYnPbjub2bIqP0E4oAY",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project.firebaseio.com",
  projectId: "stocksim-f8101",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "xxxxxxxxxxxx"
});


Vue.config.productionTip = false;


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
