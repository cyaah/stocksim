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
            element.name == name});
            //console.log("check")
        //console.log(record);
        if(record){
            record.quantity += quantity;
        } else {
            state.stocks.push({name : name,
            quantity: quantity, price: price });
            //console.log("checking if inside thise loop")
            //console.log(state.stocks);

        }
        state.funds -= quantity * price;
        //console.log(state.stocks);
    },
    'SET_PORTFOLIO' (state, portfolio) {
        state.funds = funds,
        state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
        console.log(state.stocks);
    },
    'SELL_STOCK' (state, {price, name, quantity}){
        console.log("stock sold")
        console.log(quantity);
        const record = state.stocks.find(element => {
            element.name == name
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
    stockPortfolio (state, getters) {
        console.log(state.stocks);
        return state.stocks.map(stock => {
            console.log(getters.stocks[0]['01. symbol'])
            
            console.log(state.stocks[0].name);
            const record = getters.stocks.find(element => element['01. symbol'] === stock.name);
            console.log("-=-=-=");
            console.log(record['05. price']);
            return {
                quantity: stock.quantity,
                name: record['01. symbol'],
                price: record['05. price']
            }
        });
    
    }
}









export default {
    state,
    mutations,
    actions,
    getters,

}