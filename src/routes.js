import Home from './components/Home.vue';
import Portfolio from './components/portfolio/portfolio.vue';
import Stocks from './components/stocks/stocks.vue';
import Login from './components/Login/Login.vue';
import Register from './components/Register.vue';
import Home2 from './components/Home2.vue';
import {
    store
}
from './components/store/store.js';
import firebase from "firebase";




export const routes = [{
        path: '/login',
        component: Login
    },
    {
        path: '/',
        component: Home2,
        beforeEnter: (to, from, next) => {
            console.log(store.state.loggedIn)
            console.log("router guard before if")
            // if (store.state.loggedIn) {
            //     console.log("vue navguard")
            //
            //     next()
            // } else {
            //     console.log('not logged in')
            //     next('/login')
            // }
            firebase.auth().onAuthStateChanged(function (user){
                console.log(user)
                console.log('user')
                if(user){
                    console.log('user is signed in')
                    next()
                } else {
                    console.log('user is not signed in')
                    next('/login')
                }
            })
        }
    },
    {
        path: '/portfolio',
        component: Portfolio,
        beforeEnter: (to, from, next) => {
            console.log(store.state.loggedIn === true)
            firebase.auth().onAuthStateChanged(function (user){
                console.log(user)
                console.log('user')
                if(user){
                    console.log('user is signed in')
                    next()
                } else {
                    console.log('user is not signed in')
                    next('/login')
                }
            })

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
    },
    {
        path: '/home2',
        component: Home2
    }
];