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
        funds: null,
        stocks: [],
        accessToken: null,
        user_id: '',
        loggedIn: false,
        loginError: null,
        stockInfo: {},
        timeSeries: {},
        loading: false
    },
    mutations: {
        BUY_STOCK(state, {
            name,
            price,
            quantity
        }) {
            if (quantity > 0) {
                const record = state.stocks.find(element => {
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
            // state.funds = funds;

            state.stocks = portfolio
        },
        SELL_STOCK(state, {
            price,
            name,
            quantity
        }) {

            const record = state.stocks.find(element => {
                return element.name === name
            });


            if (record.quantity > quantity) {
                record.quantity = quantity
            } else {
                state.stocks.splice(state.stocks.indexOf(record), 1);
            }
            state.funds += price * quantity;
        },
        LOGIN(accessToken, user) {
            this.state.loggedIn = true;
            this.state.accessToken = accessToken;
            this.state.user_id = user.uid;
        },
        LOGOUT() {
            this.state.loggedIn = false
        },
        updateFunds(state, funds) {
            state.funds = funds;
        },
        STOCKINFO(state, stockInfo) {
            state.stockInfo = {};
            state.stockInfo = stockInfo


        },
        TIMESERIES(state, timeSeries) {
            state.timeSeries = {};
            //console.log(state.timeSeries.data.labels)
            state.timeSeries = timeSeries;
        },
        loadingStatus(state, loadingStatus) {
            state.loading = loadingStatus;
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
        },
        changeLoading({
            commit
        }, loadingStatus) {
            commit('loadingStatus', loadingStatus)
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
            return state.timeSeries
        },
        getLoadingStatus: state => {
            return state.loading
        }

    }
})