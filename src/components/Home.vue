<template>
  <div class="container">
    <div class="funds-div">
      <h3>Funds: {{this.funds}}</h3>
    </div>
    <div class="search-box">
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
    </div>
    <div v-if="notSearched" class="main-box">
      <h1 class="main-header">
        <span class="primary-header">TRADE STOCKS</span>
      </h1>
    </div>
    <div class="search-results">
      <div class="card-body-stock" v-if="results.length > 0">
        <!-- <div id="chart-container">
        <canvas id="myChart" width="300px" height="300px"></canvas>
        </div>-->
        <div class="card" style="width: 38rem;">
          <div class="card-body">
            <div id="chart-container">
              <canvas id="myChart" width="300px" height="300px"></canvas>
            </div>
          </div>
        </div>
        <div class="card-info-left">
          <h4 class="card-info">{{this.results[0]['symbol']}}</h4>
          <p class="card-info">Price: ${{this.results[0]['latestPrice']}}</p>
          <p class="card-info">Open: {{this.results[0]['open']}}</p>
          <p class="card-info">High: {{this.results[0]['high']}}</p>
          <p class="card-info">Low: {{this.results[0]['low']}}</p>
        </div>
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
          id="searchBuy"
          placeholder="Enter Quantity"
          aria-describedby="basic-addon2"
          v-model="quantity"
          min="1"
        />
        <div class="input-group-append">
          <button class="btn btn-outline-success" @click="buyStock">Buy</button>
        </div>
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
    <div>
      <button @click="logout" class="logout">Logout</button>
    </div>
    <div>
      <button @click="check" class="logout">Check</button>
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
      currentUser: null,
      searchTerm: "",
      funds: 0,
      results: [],
      noResults: false,
      notSearched: true,
      error: false,
      quantity: 0,
      planetChartDaisEmptyta: planetChartData,
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
  created() {
    var stockRef = db.collection("test-user").doc("Portfolio");
    stockRef.get().then(doc => {
      if (doc.exists) {
        console.log("funds exists on created");
        //var arr = Object.values(doc.data().stock);
        this.funds = doc.data().Funds;
        console.log(this.funds);
        //console.log("portfolio");
        //console.log(this.portfolio);
      }
    });
  },
  methods: {
    canvas() {
      this.createChart("Intra Day Chart", this.canvasData);
    },
    search: function() {
      var term = this.searchTerm;
      if (this.myChart != null) {
        this.myChart.destroy();
        this.canvasData.data.datasets[0].data = [];
        console.log(this.myChart);
      }

      //Getting stock price info
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
              this.notSearched = false;
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
          `https://cloud.iexapis.com/stable/stock/${encodeURIComponent(
            term
          )}/time-series/?token=pk_f606ae9814ec4d9e991aa1def338e260`
        )
        .then(res => {
          console.log("TIME SERIES");
          this.timeSeriesData = res.data;
          //this.canvasData.labels = res.data;
          for (var i = 0; i < this.timeSeriesData.length; i++) {
            this.canvasData.data.labels.push(
              new Date(this.timeSeriesData[i].date)
            );
            this.canvasData.data.datasets[0].data.push(
              this.timeSeriesData[i].close
            );
          }
          console.log(this.canvasData.data.labels);
          console.log(this.canvasData.data.datasets[0].data);
          console.log("canvas data");
          this.canvas();
        });

      var isEmpty = obj => {
        console.log("isEMpty");
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            return false;
          }
        }
        return true;
      };
      console.log("timeseries123");
      this.term = "";
      this.noResults = false;
      this.searchTerm = "";
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
        console.log(doc.data().stock);
        var currentStock = doc.data().stock;
        var funds = doc.data().Funds;
        //var currentStock = doc.data()[order.name];
        console.log("stockdoes not exist");
        console.log(currentStock);
        //Creating new stock
        if (!currentStock[order.name] && !Object.keys({}).length) {
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
          console.log(currentStock[order.name]);

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

        var buyingPrice =
          parseFloat(order.price).toFixed(2) * parseInt(order.quantity) * -1;
        var newFunds = this.funds + buyingPrice;
        console.log("order");
        console.log(buyingPrice);
        console.log(newFunds);
        if (buyingPrice > this.funds) {
        } else {
          var decreseBy = firebase.firestore.FieldValue.increment(buyingPrice);
          stockRef.update({ Funds: decreseBy });
          this.funds += buyingPrice;
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

    //console.log("ctx" + myChart);
    // var ctx = document.getElementById("myChart").getContext("2d");

    // this.myChart = new Chart(ctx, {
    //   type: chartData.type,
    //   data: chartData.data,
    //   options: chartData.options
    // });
    // this.canvasCreated = true;
    resetError() {
      console.log("reset");
      this.error = false;
      this.noResults = fasle;
    },
    logout() {
      console.log("sign out");
      firebase
        .auth()
        .signOut()
        .then(resp => {
          console.log("ssss");
          console.log(resp);
        });
    },
    check() {
      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     // User is signed in.
      //     console.log(user)
      //   } else {
      //     // No user is signed in.
      //     console.log('not logged in')
      //   }
      // });
      var user = firebase.auth().currentUser;
      if (user) {
        // User is signed in.
        console.log(user);
        console.log('signed in')
      } else {
        // No user is signed in.
        console.log('signed out')
        console.log(user);
      }
    }
  },
  mounted() {
    let user = firebase.auth().currentUser;
    this.currentUser = user;
    console.log(user.uid);
    console.log("acb");
  }

  // }
};
</script>

<style scoped>
.container {
  font-family: "Roboto", sans-serif;
  width: 1000px;
  margin: 210px auto;

  background: #e5e5e517;
}
.funds-div {
  position: absolute;
  left: 90%;
  top: 40px;
}
.search-box {
  position: absolute;
  width: 50%;
  left: 1%;
  top: 65px;
}

.card {
  position: absolute;
  left: 800px;
}
.form-control {
  border-radius: 100px;
  width: 400px;
}

#searchBuy {
  border-radius: 5px;
  width: 80px;
}
.main-box {
  position: absolute;
  top: 47%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.main-header {
  font-weight: 500;
  font-size: 40px;
  letter-spacing: 25px;
  animation-name: moveInLeft;
  animation-duration: 1.7s;
  animation-timing-function: ease-out;
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
/* .main-search {
  margin-left: 120px;
  width: 60%;
} */
.card-info {
  font-weight: 300;
  font-family: "Roboto", sans-serif;
  letter-spacing: 4px;
  font-weight: 400;
}
.card-body-stock {
  /* width: 60%; */
  width: 30rem;
  height: 20rem;
  box-shadow: 2px 2px 2px 0 hsla(0, 0%, 0%, 0.5);
  font-family: "Roboto", sans-serif;
  border-radius: 15px;
  border: black;
  position: absolute;
  top: 200px;
  left: 15px;
}

.card-info-left {
  position: relative;
  left: 25px;
  /* background-color: black; */
  width: 50%;
  float: left;
}
.card-info-right {
  position: relative;
  /* background-color: red; */
  width: 50%;
  float: right;
  letter-spacing: 4px;
  font-weight: 400;
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

@keyframes moveInLeft {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }

  80% {
    transform: translateX(15px);
  }

  100% {
    opacity: 1;

    /* We use tranlate 0 since it just renders it to how it actually is */
    transform: translate(0);
  }
}
</style>
