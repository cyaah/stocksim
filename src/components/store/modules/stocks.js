import axios from 'axios';
const state = {
    stocks: []
};


const mutations = {
    'SET_STOCKS' (state, a){
        //state.stocks = stocks;
        //console.log(state);
         state.stocks.push(a);
    }
};

const actions = {
    loadStocks: ({commit}) => {
        axios.get('https://stocksim-f8101.firebaseio.com/data.json')
         //.then(response => response.json())
         .then( response => {
             if(response){
              console.log(response.data.stocks);                  
              //const stocks = response.data.stocks
              const arr = response.data.stocks
              for(let stock in arr){
                  const a = arr[stock]
                  //console.log(stock);
                  //console.log("==+=")
                  //console.log(a);
                  commit('SET_STOCKS', a);
            }
              
              //commit('SET_STOCKS', a);
            }
                            
         })
         .catch (error => {
             console.log(error);
         });

    },

    buyStock : ({ commit }, order) => {
        commit('BUY_STOCK', order);
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