import Home from './components/Home.vue';
import Portfolio from './components/portfolio/portfolio.vue';
import Stocks from './components/stocks/stocks.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import {
    store
}
from './components/store/store.js';



export const routes = [{
        path: '/login',
        component: Login
    },
    {
        path: '/',
        component: Home,
        beforeEnter: (to, from, next) => {
            console.log(store.state.loggedIn === true)
            if (store.state.loggedIn) {
                console.log("vue navguard")
                console.log(store.state.loggedIn)
                next()
            } else {
                console.log('not logged in')
                next('/login')
            }
        }
    },
    {
        path: '/portfolio',
        component: Portfolio,
        beforeEnter: (to, from, next) => {
            console.log(store.state.loggedIn === true)
            if (store.state.loggedIn) {
                console.log("vue navguard")
                console.log(store.state.loggedIn)
                next()
            } else {
                console.log('not logged in')
                next('/login')
            }
        }
    },
    {
        path: '/stocks',
        component: Stocks
    },
    {
        path: '/login',
        component: Login,
        //beforeEnter: (to, from, next) => {
        // console.log("navguard logged in")
        // if(store.state.loggedIn){
        //     console.log(store.state.loggedIn)
        //     next('/')
        // } else {
        //     next('/login')
        // }
        //}
    },
    {
        path: '/register',
        component: Register
    }
];