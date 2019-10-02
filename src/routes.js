import Home from './components/Home.vue';
import Portfolio from './components/portfolio/portfolio.vue';
import Stocks from './components/stocks/stocks.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import { store } from './components/store/store.js';



export const routes = [{
        path: '/home',
        component: Home,
        beforeEnter: (to, from, next) => {
            if(!this.store.state.loggedIn){
                console.log("vue navguard")
                console.log(store.state.loggedIn)
                next('/login')
            } else 
            {
                next()
            }
          }
    },
    {
        path: '/portfolio',
        component: Portfolio
    },
    {
        path: '/stocks',
        component: Stocks
    },
    {
        path: '/login',
        component: Login,
        beforeEnter: (to, from, next) => {
            console.log(store.state.loggedIn)
            console.log("navguard logged in")
            if(store.state.loggedIn){
                console.log(store.state.loggedIn)
                next('/home')
            } else {
                next()
            }
        }
    },
    {
        path: '/Register',
        component: Register
    }
];