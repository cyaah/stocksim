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
      <div v-if="results.length > 0">
        <p>this.results.[0]['01. symbol']</p>

      </div>
      <div v-if="noResults">
        <H2>Sorry no results</H2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      searchTerm: "",
      results: [],
      noResults : false
    };
  },
  methods: {
    search: function() {
      var term = this.searchTerm;
      console.log("term");
      console.log(term);
      axios
        .get(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(term)}&apikey=030CF83Z0LHP1H0B`
        )
        //.then(res => res.json())
        .then(res => {
          if (res) {
            console.log(res.data["Global Quote"]);
            const s = res.data["Global Quote"];
            this.resutls = s;
            //this.results.push(s);
            console.log("results");
            //console.log(this.results[0]['01. symbol']);
            this.noResults = this.results.length === 0;

          } 
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
.input-group {
  margin-top: 25px;
}
</style>
