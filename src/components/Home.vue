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
      />
    </div>
    <div class="card-body" v-if="results.length > 0">
      <div id="chart-container">
        <canvas id="myChart" width="300px" height="300px"></canvas>
      </div>

      <p class="card-info">Symbol: {{this.results[0]['symbol']}}</p>
      <p class="card-info">Price: ${{this.results[0]['latestPrice']}}</p>
      <p class="card-info">Open: {{this.results[0]['open']}}</p>
      <p class="card-info">High: {{this.results[0]['high']}}</p>
      <p class="card-info">Low: {{this.results[0]['low']}}</p>
      <div class="card-info-right">
        <p>Volume: {{this.results[0]['06. volume']}}</p>
        <p>Previous close: {{this.results[0]['previousClose']}}</p>
        <p>Change: {{this.results[0]['change']}}</p>
        <p>Change%: {{this.results[0]['changePercent']}}</p>
      </div>

      <!-- bug- Input allows the enter of 'e' when only shouldbe number. Result in empty string quantity-->
      <input
        v-on:keyup.enter="buyStock"
        type="number"
        class="form-control"
        placeholder="Enter Quantity"
        aria-describedby="basic-addon2"
        v-model="quantity"
        min="1"
      />
      <div class="input-group-append">
        <button class="btn btn-outline-success" @click="buyStock">Buy</button>
      </div>
    </div>

    <div
      v-if="noResults"
      class="modalfade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
              @click="resetError"
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">No symbol provided.</div>
          <div class="modal-footer">
            <button
              @click="resetError"
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >Close</button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="error"
      class="modalfade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
              @click="resetError"
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">Could not find stock.</div>
          <div class="modal-footer">
            <button
              @click="resetError"
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >Close</button>
          </div>
        </div>
      </div>
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
import { isError } from "util";
const FieldValue = require("firebase").firestore.FieldValue;

var myChart;

export default {
  data() {
    return {
      myChart: null,
      searchTerm: "",
      results: [],
      noResults: false,
      error: false,
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
          `https://cloud.iexapis.com/stable/stock/${encodeURIComponent(
            term
          )}/quote?token=pk_f606ae9814ec4d9e991aa1def338e260`
        )
        .then(res => {
          if (res) {
            console.log(res.data);
            console.log("res");
            this.results = [];
            this.noResults = false;
            var s = res.data;
            console.log(s);
            //fix this logic
            if (isEmpty(s)) {
              this.noResults = true;
              console.log("is empty");
              console.log(this.noResults);
            } else {
              this.results.push(s);
              console.log("124555");
              console.log(this.results);
            }
          }
        })
        .catch(error => {
          this.error = true;
          console.log("error");
          console.log(this.error);
          console.log(error);
        });

      //Getting time series data
      axios
        .get(
          `https://cloud.iexapis.com/stable/stock/AAPL/time-series/?token=pk_f606ae9814ec4d9e991aa1def338e260`
        )
        .then(res => {
          this.timeSeriesData = res.data;
          console.log(this.timeSeriesData);
          console.log("timeseries");
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
      var order = {
        name: this.results[0]["symbol"],
        price: parseFloat(this.results[0]["latestPrice"]).toFixed(2),
        quantity: parseInt(this.quantity)
      };

      //console.log("order" + order);

      //var quan = parseInt(order.quantity, 10);
      //var increment = firebase.firestore.FieldValue.increment(quan);
      var stockRef = db.collection("test-user").doc("Portfolio");
      var name = order.name;
      console.log("order");
      console.log(order);
      stockRef.get().then(doc => {
        console.log("doc does not exist");

        //var currentStock = doc.data().stock;
        var currentStock = doc.data()[order.name];
        console.log("stockdoes not exist");
        console.log(currentStock);
        //Creating new stock
        if (!currentStock && !Object.keys({}).length) {
          console.log("inside if");
          stockRef
            .set({ stock: { [order.name]: order } }, { merge: true })
            //Tried to change db scheme but this only make it into an array by default. Look into inserting straight object instead of object
            //.set({[order.name]: [order]},  { merge: true })
            .then(resp => {
              console.log("New stock added");
              //stockRef.FieldValue('stock').add({ [order.name]: order})
            });
        } else {
          console.log("else");
          console.log(currentStock);
          console.log("order");
          console.log(order);
          var quantity =
            parseInt(currentStock[order.name].quantity) +
            parseInt(order.quantity);

          var totalPrice =
            parseFloat(currentStock[order.name].quantity).toFixed(2) *
              parseFloat(currentStock[order.name].price).toFixed(2) +
            parseInt(order.quantity) * parseInt(order.price);
          var average =
            parseFloat(totalPrice).toFixed(2) / parseInt(quantity).toFixed(2);
          var name = currentStock[order.name].name;
          console.log(quantity);
          console.log(average);

          var newOrder = {
            name: name,
            price: average,
            quantity: quantity
          };
          var update = {};
          update[`stock.${name}`] = newOrder;
          console.log("does exist");
          console.log(newOrder);
          stockRef.update(update);
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
    },

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

    resetError() {
      this.error = false;
      this.noResults = fasle;
    }
  }
};
</script>

<style scoped>
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
