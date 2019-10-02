import axios from 'axios';

const state = {
    stocks: [{name: 'a'}],
    timeSeries:{}
};


const mutations = {
    'SET_STOCKS'(state, s) {
        //state.stocks = stocks;
        state.stocks.push(s);
        console.log(s['01. symbol']);
        console.log("stocks loaded")
    },
    'LOAD_STOCK_DATA'(state, timeSeries){
        state.timeSeries.intraDay = timeSeries
        console.log(state.timeSeries);
        console.log("Checking time series state");
        console.log(state.timeSeries.intraDay[0]);
    }

};

const actions = {
    // loadStocks: ({
    //     commit
    // }) => {
    //     axios.get('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=030CF83Z0LHP1H0B')
    //         .then(res => {
    //             if (res) {
    //                 console.log(res.data['Global Quote']);
    //                 const s = res.data['Global Quote'];
    //                 commit('SET_STOCKS', s);
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });

    // },

    loadStocks: ({
        commit
    },timeSeries) => {
        commit('LOAD_STOCK_DATA', timeSeries)
    },

    buyStock: ({
        commit
    }, order) => {
        commit('BUY_STOCK', order);
    },

    sellStock: ({
        commit
    }, order) => {
        commit('SELL_STOCK', order);
    },

    saveorder: ({
        commit
    }, order) => {
        commit('SAVE_ORDER', order);
    }


};

const getters = {
    // stocks: state => {
    //     return state.stocks;
    // }
};



export default {
    state,
    mutations,
    actions,
    getters
}