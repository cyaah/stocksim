import Vue from 'vue';

export const loadData = ({ commit }) => {
      axios.get('https://stocksim-f8101.firebaseio.com/data.json')
            .then(response => response.json())
            .then( data => {
                if(data){
                 console.log(data.stocks)                  
                 const stocks = data.stocks
                }
                commit('SET_STOCKS', stocks);               
            })
            .catch (error => {
                console.log(error);
            });
}