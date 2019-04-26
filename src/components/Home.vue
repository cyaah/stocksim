<template>
  <div class="container">
    <canvas id="myChart" width="300" height="300"></canvas>
    <h1 class="main-header">Trade Stocks and Manage your own Portfolio</h1>
    <button @click="canvas">canvas</button>

    <div class="input-groupmb-3">
      <input
        v-on:keyup.enter="search"
        type="search"
        class="form-control"
        placeholder="Enter Stock Ticker"
        aria-label="Recipient's username"
        v-model="searchTerm"
        id="main-search"
      >
    </div>
    <div class="card-body" v-if="results.length > 0">
      <p class="card-info">Symbol: {{this.results[0]['01. symbol']}}</p>
      <p class="card-info">Price: ${{this.results[0]['05. price']}}</p>
      <p class="card-info">Open: {{this.results[0]['02. open']}}</p>
      <p class="card-info">High: {{this.results[0]['03. high']}}</p>
      <p class="card-info">Low: {{this.results[0]['04. low']}}</p>
      <div class="card-info-right">
        <p>Volume: {{this.results[0]['06. volume']}}</p>
        <p>Previous close: {{this.results[0]['08. previous close']}}</p>
        <p>Change: {{this.results[0]['09. change']}}</p>
        <p>Change%: {{this.results[0]['10. change percent']}}</p>
      </div>

      <!-- bug- Input allows the enter of 'e' when only shouldbe number. Result in empty string quantity-->
      <input
        v-on:keyup.enter="buyStock"
        type="number"
        class="form-control"
        placeholder="Enter Quantity"
        aria-describedby="basic-addon2"
        v-model="quantity"
      >
      <div>
        <button class="btn btn-outline-success" @click="buyStock">Buy</button>
      </div>
    </div>

    <div v-if="noResults">
      <H2>Sorry no results</H2>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js";
import planetChartData from "./data.js";

export default {
  data() {
    return {
      searchTerm: "",
      results: [],
      noResults: false,
      quantity: 0,
      planetChartData: planetChartData,
      timeSeries: []
    };
  },

  methods: {
    canvas() {
      console.log("calvin");
      this.createChart("planet-chart", this.planetChartData);
    },
    search: function() {
      var term = this.searchTerm;
      console.log(term);
      console.log("term");
      axios
        // .get(
        //   `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(
        //     term
        //   )}&apikey=030CF83Z0LHP1H0B`
        // )
        .get(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=ACB&apikey=030CF83Z0LHP1H0B`
        )
        //.then(res => res.json())
        .then(res => {
          if (res) {
            this.results = [];
            this.noResults = false;
            //console.log(res.data["Global Quote"]);
            const s = res.data["Global Quote"];
            //this.resutls = s;
            console.log(s);
            console.log("0000");
            if (isEmpty(s)) {
              this.noResults = true;
              //this;

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

      axios
        // .get(
        //   `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${encodeURIComponent(
        //     term
        //   )}&apikey=030CF83Z0LHP1H0B`
        // )
        .get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=ACB&&interval=5min&apikey=030CF83Z0LHP1H0B`
        )

        .then(res => {
          if (res) {
            console.log(res.data["Time Series (5min)"]);
            //console.log("123");
            var date = res.data["Time Series (5min)"];
            for (var time in date){
              let stock_info = date[time];
              this.timeSeries.push(
                time,
                Number(stock_info["1. open"])
              );
            }
            console.log(this.timeSeries);
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
      this.term = "";
    },

    buyStock() {
      console.log("stock buy button");
      const order = {
        name: this.results[0]["01. symbol"],
        price: this.results[0]["05. price"],
        quantity: this.quantity
      };
      console.log("order" + order);
      this.$store.dispatch("buyStock", order);

      this.quantity = 0;
      //console.log(order);
    },
    createChart(chartId, chartData) {
      console.log(chartData.type);
      const ctx = document.getElementById("myChart").getContext("2d");
      console.log(ctx);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    }
  }
};
</script>

<style>
.container {
  font-family: "Roboto", sans-serif;
  width: 1000px;
  margin: 210px auto;
}
.main-header {
  font-weight: 600;
}
input-group {
  margin-top: 25px;
}
.input-groupmb-3 {
  margin-top: 25px;
}
.infoRight {
  margin-left: 140px;
}
#main-search {
  margin-left: 120px;
  width: 60%;
}
.card-info {
  font-weight: 300;
  font-family: "Roboto", sans-serif;
}
.card-body {
  margin-top: 80px;
  margin-left: -30px;
  width: 90%;
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.5);
  font-family: "Roboto", sans-serif;
}
.card-info-right {
  margin-left: 650px;
  margin-top: -160px;
}
.input-group-append {
  width: 400px;
}
</style>
