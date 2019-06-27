<template>
  <div class="container">
    <h1 class="main-header">Trade Stocks and Manage your own Portfolio</h1>
    <div class="input-groupmb-3">
      <input
        v-on:keyup.enter="search"
        v-on:keyyp.enter="canvas"
        type="search"
        class="form-control"
        placeholder="Enter Stock Ticker"
        aria-label="Recipient's username"
        v-model="searchTerm"
        id="main-search"
      >
    </div>
    <div class="card-body" v-if="results.length > 0">
      <div id="chart-container">
        <canvas id="myChart" width="300px" height="300px"></canvas>
      </div>

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
        <button @click="save">Save</button>
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
import planetChartData from "./chart-data.js";
import { db, increment } from "../main.js";
import firebase from "firebase";
import firestore from "firebase";
const FieldValue = require("firebase").firestore.FieldValue;

var myChart;

export default {
  data() {
    return {
      myChart: null,
      searchTerm: "",
      results: [],
      noResults: false,
      quantity: 0,
      planetChartData: planetChartData,
      timeSeriesData: [],
      canvasCreated: false,
      canvasData: {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              fill: false,
              label: "price",
              data: [],
              backgroundColor: "rgb(34,139,34)",

              borderColor: "rgb(34,139,34)",

              borderWidth: 3
            }
          ]
        },
        options: {
          responsive: true,
          lineTension: 1,
          maintainAspectRatio: false,

          scales: {
            xAxes: [
              {
                type: "time",
                display: true,
                scaleLabel: {
                  display: true,
                  labalString: "Date"
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                  padding: 25
                },
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Price"
                }
              }
            ]
          }
        }
      }
    };
  },

  methods: {
    canvas() {
      console.log("canvas");
      this.createChart("Intra Day Chart", this.canvasData);
    },
    search: function() {
      var term = this.searchTerm;
      if (this.myChart != null) {
        console.log("checking if chart is null");
        this.myChart.destroy();
        this.canvasData.data.datasets[0].data = [];
        console.log(this.myChart);
      }
      axios
        .get(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(
            term
          )}&apikey=030CF83Z0LHP1H0B`
        )
        //fetching stock data
        // .get(
        //   `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=ACB&apikey=030CF83Z0LHP1H0B`
        // )
        //.then(res => res.json())
        .then(res => {
          if (res) {
            this.results = [];
            this.noResults = false;
            var s = res.data["Global Quote"];

            if (isEmpty(s)) {
              this.noResults = true;
            } else {
              this.results.push(s);

              //console.log(this.results);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });

      // Fetching time series from API
      axios
        .get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${encodeURIComponent(
            term
          )}&interval=5min&apikey=030CF83Z0LHP1H0B`
        )
        // .get(
        //   `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=ACB&&interval=5min&apikey=030CF83Z0LHP1H0B`
        // )
        .then(res => {
          if (res) {
            var date = res.data["Time Series (5min)"];

            var timeSeries;
            for (var time in date) {
              let stock_info = date[time];

              this.timeSeriesData.push({
                time: time,
                price: Number(stock_info["1. open"])
              });
            }
            timeSeries = this.timeSeriesData;
            //console.log(timeSeries);
            this.canvasData.data.labels = timeSeries.map(x => x.time);
            this.canvasData.data.datasets[0].data = timeSeries.map(
              x => x.price
            );
            // for (var i = 0; i < timeSeries.length - 22; i++) {
            //   //this.canvasData.data.labels.push(new Date(timeSeries[i].time));
            //   this.canvasData.data.datasets[0].data.push(timeSeries[i].price);
            // }
            this.canvasData.data.labels.reverse();

            this.$store.dispatch("loadStocks", timeSeries);
            console.log("dataPoints" + this.canvasData.data.datasets[0].data);
            return this.canvasData.data.labels;
            return this.canvasData.data.datasets[0].data;
          }
        })
        .then(res => {
          if (res) {
            //this.createChart("Intra Day Chart", this.canvasData);
            //this.canvasData.data.labels = [];
            //console.log(this.canvasData.data.labels);
            //console.log(this.canvasData.data.datasets[0].data);
            var ctx = document.getElementById("myChart");
            this.myChart = new Chart(ctx, {
              type: this.canvasData.type,
              data: this.canvasData.data,
              options: this.canvasData.options
            });
            this.canvasCreated = true;
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
      this.noResults = false;
      this.canvasData.data.labels = [];
      this.canvasData.data.datasets[0].data.length = 0;
      console.log("checking if empty", this.canvasData.data.datasets[0].data);
    },

    buyStock() {
      console.log("stock buy button");
      const order = {
        name: this.results[0]["01. symbol"],
        price: this.results[0]["05. price"],
        quantity: this.quantity
      };

      //console.log("order" + order);

      //var quan = parseInt(order.quantity, 10);
      //var increment = firebase.firestore.FieldValue.increment(quan);
      var stockRef = db.collection("test-user").doc("Portfolio");
      var name = order.name;

      stockRef.get().then(doc => {
        console.log("doc does not exist");
        console.log(doc.data);
        var currentStock = doc.data.stock[order.name];

        //console.log(currentStock);
        if (currentStock.name !== order.name) {
          console.log("stockdoes not exist");
          stockRef
            .set({ stock: { [order.name]: order } }, { merge: true })
            .then(resp => {
              console.log("New stock added");
              //stockRef.FieldValue('stock').add({ [order.name]: order})
            });
        } else {
          var quantity =
            parseInt(currentStock.quantity) + parseInt(order.quantity);
          console.log(currentStock.quantity + " currentStock quant");
          console.log(order.quantity + " order.quantity");
          var totalPrice =
            parseFloat(currentStock.quantity) * parseFloat(currentStock.price) +
            parseFloat(order.quantity) * parseFloat(order.price);
          var average = parseFLoat(totalPrice) / parseFloat(quantity);

          console.log(quantity);
          console.log(average);
          var newOrder = {
            name: currentStock.name,
            price: average,
            quantity: quantity
          };
          console.log("does exist");
          console.log(newOrder);
          stockRef.update({ stock: { [order.name]: newOrder } });
        }
      });

      this.$store.dispatch("buyStock", order);
      this.quantity = 0;
    },
    createChart(chartId, chartData) {
      console.log("chartData" + chartData);

      if (myChart) {
        console.log("09");
        document.getElementById("myChart").remove();
        console.log(document.getElementById("myChart"));
        let canvas = document.createElement("canvas");
        canvas.setAttribute("id", "myChart");
        canvas.setAttribute("width", "300px");
        canvas.setAttribute("height", "300px");
        console.log(document.getElementById("chart-container"));
        document.getElementById("chart-container").appendChild(canvas);

        myChart.destroy();
      }
      console.log("ctx" + myChart);
      const ctx = document.getElementById("myChart").getContext("2d");

      myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
      this.canvasCreated = true;
    }

    // createChart(chartId, chartData) {
    //   //console.log("ctx" + myChart);
    //
    //   // if (this.myChart) {
    //   //    console.log("inside myChart if statement");
    //   //   // document.getElementById("myChart").remove();
    //   //   // let canvas = document.createElement("canvas");
    //   //   // canvas.setAttribute("id", "myChart");
    //   //   // canvas.setAttribute("width", "300px");
    //   //   // canvas.setAttribute("height", "300px");
    //   //   // document.getElementById("chart-container").appendChild(canvas);
    //   //   // console.log(document.getElementById("myChart"));
    //   //   this.myChart.destroy();
    //   // }
    //   // //console.log("ctx" + myChart);
    //   var ctx = document.getElementById("myChart").getContext("2d");
    //
    //   this.myChart = new Chart(ctx, {
    //     type: chartData.type,
    //     data: chartData.data,
    //     options: chartData.options
    //   });
    //   this.canvasCreated = true;
    // }
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
.chart-container {
  width: 800px;
  height: 500px;
}
/* canvas {
    width:800px !important;
    height:700px !important;
} */
</style>
