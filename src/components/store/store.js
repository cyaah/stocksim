import Vue from 'vue';
import Vuex from 'vuex';
import portfolio from './modules/portfolio';
import axios from 'axios';
import VueAxios from 'vue-axios'


Vue.use(Vuex);
Vue.use(VueAxios, axios);

// export default new Vuex.Store({
//     actions,
//     state: {
//         stocks,
//         portfolio
//     }
// })

export const store = new Vuex.Store({
    state: {
        funds: 0,
        stocks: [],
        accessToken: null,
        user_id: '',
        loggedIn: false,
        loginError: null,
        stockInfo: [],
        timeSeries: []
    },
    mutations: {
        BUY_STOCK(state, {
            name,
            price,
            quantity
        }) {
            //console.log(state.stocks[0]);
            if (quantity > 0) {
                const record = state.stocks.find(element => {
                    console.log(element);
                    return element.name === name
                });

                if (record) {
                    record.quantity = parseFloat(quantity) + parseFloat(record.quantity);

                } else {
                    state.stocks.push({
                        name: name,
                        quantity: quantity,
                        price: price
                    });
                }
                state.funds -= quantity * price;
            }
        },
        SET_PORTFOLIO(state, portfolio) {
            state.funds = funds;
            console.log("stock portfolio");
            state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
            console.log(state.stocks);
        },
        SELL_STOCK(state, {
            price,
            name,
            quantity
        }) {
            console.log("stock sold");
            //console.log(name);
            //console.log(state.stocks[0].name);
            const record = state.stocks.find(element => {
                //element.name === name
                console.log(name);
                console.log(element.name);

                return element.name === name
            });
            console.log("=+=");
            console.log(record);
            if (record.quantity > quantity) {
                record.quantity -= quantity
            } else {
                state.stocks.splice(state.stocks.indexOf(record), 1);
            }
            state.funds += price * quantity;
            console.log(state.stocks);
        },
        LOGIN(accessToken, user) {
            console.log("LOGIN_202022")
            console.log(user)
            this.state.loggedIn = true,
                this.state.accessToken = accessToken;
            this.state.user_id = user.uid
            this.funds =
                console.log(this.state.user_id)
        },
        LOGOUT() {
            console.log('store logout');
            this.state.loggedIn = false
        },
        updateFunds(state, funds) {
            state.funds = funds;
        },
        STOCKINFO(state, stockInfo) {
            console.log(stockInfo)
            console.log('stock info1212121')
            state.stockInfo = stockInfo
        },
        TIMESERIES(state, timeSeries) {
            console.log('THIIS TIME SERIES')
            console.log(timeSeries)
            state.timeSeries = timeSeries
        }
    },
    actions: {
        doLogin({
            commit
        }, loginData) {
            commit('LOGIN')
        },
        doLogout({
            commit
        }) {
            ('LOGOUT')
        },
        getStockInfo({
            commit
        }, stockInfo) {
            commit('STOCKINFO', stockInfo)
        },
        getTimeSeries({
            commit
        }, timeSeries) {
            commit('TIMESERIES', timeSeries)
        }
    },
    getters: {
        CHECKLOGIN: state => {
            return state.loggedIn
        },

        GETUSERID: state => {
            return state.user_id
        },

        getUserFunds: state => {
            return state.funds
        },
        getStockInfo: state => {
            return state.stockInfo
        },
        getTimeSeries: state => {
            console.log('123545454')
            return state.timeSeries
        }

    }
})