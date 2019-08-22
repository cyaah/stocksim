import Home from './components/Home.vue';
import Portfolio from './components/portfolio/portfolio.vue';
import Stocks from './components/stocks/stocks.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';



export const routes = [{
        path: '/',
        component: Home
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
        component: Login
    },
    {
        path: '/Register',
        component: Register
    }
];