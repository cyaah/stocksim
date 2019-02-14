import axios from 'axios';
const state = {
    stocks: []
};


const mutations = {
    'SET_STOCKS' (state, s){
        //state.stocks = stocks;
         state.stocks.push(s);
         console.log(s['01. symbol']);
         console.log("stocks loaded");
    }

};

const actions = {
    // loadStocks: ({commit}) => {
    //     axios.get('https://stocksim-f8101.firebaseio.com/data.json')
    //      //.then(response => response.json())
    //      .then( response => {
    //          if(response){
    //           console.log(response.data.stocks);                  
    //           //const stocks = response.data.stocks
    //           const arr = response.data.stocks
    //           for(let stock in arr){
    //               const a = arr[stock]
    //               //console.log(stock);
    //               //console.log("==+=")
    //               //console.log(a);
    //               commit('SET_STOCKS', a);
    //         }
              
    //           //commit('SET_STOCKS', a);
    //         }
                            
    //      })
    //      .catch (error => {
    //          console.log(error);
    //      });

    // },
    
    loadStocks: ({commit}) => {
        axios.get('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=030CF83Z0LHP1H0B')
            .then(res => {
                if(res){
                    console.log(res.data['Global Quote']);
                    const s = res.data['Global Quote'];
                    commit('SET_STOCKS', s);
                }
            })
            .catch( error => {
                console.log(error);
            });

    },
    buyStock : ({ commit }, order) => {
        commit('BUY_STOCK', order);
    },

    sellStock: ({ commit }, order) =>{
        commit('SELL_STOCK', order);
    }
 

};

const getters = {
    stocks : state => {
     return state.stocks;
    }
};


export default {
    state,
    mutations,
    actions,
    getters
}