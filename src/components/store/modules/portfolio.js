const state = {
    funds: 100000000,
    stocks: []
};

const mutations = {
    'BUY_STOCK'(state, {name, price, quantity}) {
        console.log("stock bought ")
        //console.log(price);
        const record = state.stocks.find(element => {
            console.log(element.name);
            element.name == name});
        //console.log(record);
        if(record){
            record.quantity += quantity;
        } else {
            state.stocks.push({name : name,
            quantity: quantity, price: price });
            //console.log(state.stocks);

        }
        state.funds -= quantity * price;
        console.log(state.stocks);
    },
    'SET_PORTFOLIO' (state, portfolio) {
        state.funds = funds,
        state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
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
        return state.stocks.map(stock => {
            const record = getters.stocks.find(element => element.name === stock.name);
            return {
                quantity: stock.quantity,
                name: record.name,
                price: record.price
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