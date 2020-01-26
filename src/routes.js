import Portfolio from './components/portfolio/portfolio.vue';
import Login from './components/Login/Login.vue';
import Register from './components/Register.vue';
import Home2 from './components/Home2.vue';
import firebase from "firebase";




export const routes = [{
        path: '/login',
        component: Login
    },
    {
        path: '/',
        component: Home2,
        beforeEnter: (to, from, next) => {

            firebase.auth().onAuthStateChanged(function (user) {

                if (user) {
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
        name: 'portfolio',
        component: Portfolio,
        beforeEnter: (to, from, next) => {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
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

    },
    {
        path: '/register',
        component: Register
    }
];