import Vue from 'vue';
import Vuex from 'vuex';
import stocks from './modules/stocks';
import portfolio from './modules/portfolio';
import * as actions from './actions';
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

export  const store = new Vuex.Store({
    state: {
        funds: 100000000,
        stocks: [],
        accessToken: null,
        loggedIn: false,
        loginError: null
    },
    mutations : {
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
        LOGIN(accessToken) {
            console.log("LOGIN_1_")
            this.state.loggedIn = true,
            this.state.accessToken = accessToken;
        },
        LOGOUT() {
            state.loggedIn = false
        }
    },
    actions : {
        doLogin({
            commit
        }, loginData) {
            commit('LOGIN')
        }
    }
})