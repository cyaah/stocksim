const state = {
    funds: 100000000,
    stocks: []
};

const mutations = {
    'BUY_STOCK'(state, {name, price, quantity}) {
        console.log("stock bought ")
        console.log(name);
        //console.log(state.stocks[0]);
        const record = state.stocks.find(element => {
            console.log(element);
            return element.name === name});
            //console.log("check")
        console.log(record);
        if(record){
            record.quantity += quantity;
            console.log('if stock exists')
        } else {
            state.stocks.push({name : name,
            quantity: quantity, price: price });
            console.log("adding new stock")
            console.log(state.stocks);

        }
        state.funds -= quantity * price;
        //console.log(state.stocks);
    },
    'SET_PORTFOLIO' (state, portfolio) {
        state.funds = funds,
        console.log("stock portfolio")
        state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
        console.log(state.stocks);
    },
    'SELL_STOCK' (state, {price, name, quantity}){
        console.log("stock sold")
        //console.log(name);
        //console.log(state.stocks[0].name);
        const record = state.stocks.find(element => {
            //element.name === name
            console.log(name);
            console.log(element.name);
            console.log("=+=");
            element.name === name
        });
        console.log(record);
        if(record.quantity > quantity){
            record.quantity -= quantity
        } else {
            state.stocks.splice(state.stocks.indexOf(record),1);
        }
        state.funds += price * quantity;
        console.log(state.stocks);
    }
};

const actions = {

};

const getters = {
    stockPortfolio (state) {
        //console.log(state.stocks);
        console.log("inside getters stockPOrtfolio");
        // console.log(getters);
        // console.log(state.stocks);
         console.log(getters.stocks)
         state.stocks.map(stock => {
            //console.log(getters.stocks[0]['01. symbol'])
            
           
           console.log(stock);
             const record = getters.stocks.find(element =>  element.name === stock.name);
             console.log("-=-=-=");
             //console.log(record);
             console.log(record.name);
            return record;
             //  return {
            //      quantity: stock.quantity,
            //      name: record.name,
            //      price: record.price
            //  }
        });

       
    
    }
}









export default {
    state,
    mutations,
    actions,
    getters,

}