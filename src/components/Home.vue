<template>
  <div class="container">
    <h1>Trade Stocks and Manage your own Portfolio</h1>
    <h5>Your Funds</h5>
    <div class="input-groupmb-3">
      <input
        type="search"
        class="form-control"
        placeholder="Enter Stock Ticker"
        aria-label="Recipient's username"
        v-model="searchTerm"
      >

      <div class="input-group-append">
        <button @click="search" class="btn btn-outline-secondary" type="button">Search</button>
      </div>
    </div>

    <div v-if="results.length > 0" class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Ticker: {{this.results[0]['01. symbol']}}</h5>
        <h6 class="card-subtitle mb-2">Price: ${{this.results[0]['05. price']}}</h6>
        <p>Open: {{this.results[0]['02. open']}}</p>
        <p class="infoRight">High: {{this.results[0]['03. high']}}</p>
        <p class="infoRight">Low: {{this.results[0]['04. low']}}</p>
        <input
          type="number"
          class="form-control"
          placeholder="Enter Quantity"
          aria-describedby="basic-addon2"
          v-model="quantity"
        >
        <div>
          <button @click="buyStock">Buy</button>
        </div>
      </div>
    </div>

    <div v-if="noResults">
      <H2>Sorry no results</H2>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      searchTerm: "",
      results: [],
      noResults: false,
      quantity: 0
    };
  },
  methods: {
    search: function() {
      var term = this.searchTerm;
      console.log(term);
      console.log("term");
      axios
        .get(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(
            term
          )}&apikey=030CF83Z0LHP1H0B`
        )
        //.then(res => res.json())
        .then(res => {
          if (res) {
            this.results = [];
            this.noResults = false;
            //console.log(res.data["Global Quote"]);
            const s = res.data["Global Quote"];
            //this.resutls = s;
            //console.log(s);
            //console.log("0000");
            if (isEmpty(s)) {
              this.noResults = true;
              this;

              console.log("results");
            } else {
              this.results.push(s);
             
              //console.log(this.results[0]['01. symbol']);
              console.log(this.results);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });

      var isEmpty = obj => {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            return false;
          }
        }
        return true;
      };
    },

    buyStock() {
      console.log("stock buy button");
      console.log(this.quantity);
      const order = {
        name: this.results[0]["01. symbol"],
        price: this.results[0]["05. price"],
        quantity: this.quantity
      };
      console.log("order");
      console.log(order);
      this.$store.dispatch("buyStock", order);

      this.quantity = 0;
      //console.log(order);
    }
  }
};
</script>

<style>
.input-group {
  margin-top: 25px;
}
.infoRight {
  margin-left: 140px;
}
.form-control {
  width: 90%;
}
.card {
  margin-top: 40px;
}
</style>
