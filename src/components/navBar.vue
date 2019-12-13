<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <button type="button" id="sidebarCollapse" class="btn text-sidebar bg-turbo-yellow">
        <i class="fas fa-align-left"></i>
        <span></span>
      </button>
      <button
        class="btn btn-dark d-inline-block d-lg-none ml-auto"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-align-justify"></i>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="nav navbar-nav ml-auto">
          <li class="nav-item">
            <div class="search-container">
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
          </li>
          <li>
            <span>Funds</span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import { store } from "./store/store.js";

export default {
  name: "navBar",
  data() {
    return {
      searchTerm: "",
      term: "",
      timeSeriesData: [],
      results: [],
      myChart: null,
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
    searchToggle(obj, evt) {
      var container = $(obj).closest(".search-wrapper");
      if (!container.hasClass("active")) {
        container.addClass("active");
        evt.preventDefault();
      } else if (
        container.hasClass("active") &&
        $(obj).closest(".input-holder").length == 0
      ) {
        container.removeClass("active");
        // clear input
        container.find(".search-input").val("");
      }
    },
    search: function() {
      var term = this.searchTerm;
      //   if (this.myChart != null) {
      //     this.myChart.destroy();
           this.canvasData.data.datasets[0].data = [];
      this.canvasData.data.labels = []
      //     console.log(this.myChart);
      //   }
      this.results= [];

      console.log("here we go");
      //Getting stock price info
      axios
        .get(
          `https://cloud.iexapis.com/stable/stock/${encodeURIComponent(
            term
          )}/quote?token=pk_f606ae9814ec4d9e991aa1def338e260`
        )
        .then(res => {
          if (res) {
            this.results = [];
            this.noResults = false;
            var s = res.data;

            //fix this logic
            if (isEmpty(s)) {
              this.noResults = true;
            } else {
              //turning the object and storing it in an array
              this.notSearched = false;
              this.results.push(s);
            }
          }
        }).then(res => {
          this.$store.dispatch("getStockInfo", this.results);
        })
        .catch(error => {
          this.error = true;
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
          console.log("canvas data");
          console.log(this.canvasData.data);
          console.log(this.canvasData.data.datasets[0].data);

          // this.canvas();
        }).then(res => {
          this.$store.dispatch("getTimeSeries",this.canvasData)

        })
        .catch(err => {
          console.log(err);
        });

      var isEmpty = obj => {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            return false;
          }
        }
        return true;
      };
      var stockInfo = { timeseries: this.timeSeriesData, stock: this.results };
      this.term = "";
      this.noResults = false;
      this.searchTerm = "";
    },
    canvas: function() {
      this.createChart("Intra Day Chart", this.canvasData);
    }
  },
  // watch: {
  //   results: function(newVal, oldVal) {
  //     console.log("new");
  //     this.$store.dispatch("getStockInfo", newVal);
  //   },
  //   canvasData: function(newVal, oldVal) {
  //     console.log(newVal)
  //     console.log('NEWvalD')
  //     this.$store.dispatch("getTimeSeries", newVal);
  //   }
  // }
};
</script>

<style scoped>
$turbo-yellow: #ffcc19;
$turbo-yellow-10: lighten($turbo-yellow, 40%);
$turbo-yellow-20: lighten($turbo-yellow, 30%);
$turbo-yellow-30: lighten($turbo-yellow, 20%);
$turbo-yellow-40: lighten($turbo-yellow, 10%);
$turbo-yellow-50: lighten($turbo-yellow, 0%);
$turbo-yellow-60: darken($turbo-yellow, 10%);
$turbo-yellow-70: darken($turbo-yellow, 20%);
$turbo-yellow-80: darken($turbo-yellow, 30%);
$turbo-yellow-90: darken($turbo-yellow, 40%);

.bg-turbo-yellow {
  background-color: $turbo-yellow;
}

.bg-turbo-yellow-10 {
  background-color: $turbo-yellow-10;
}
.bg-turbo-yellow-20 {
  background-color: $turbo-yellow-20;
}
.bg-turbo-yellow-30 {
  background-color: $turbo-yellow-30;
}
.bg-turbo-yellow-40 {
  background-color: $turbo-yellow-40;
}
.bg-turbo-yellow-50 {
  background-color: $turbo-yellow-50;
}
.bg-turbo-yellow-60 {
  background-color: $turbo-yellow-60;
}
.bg-turbo-yellow-70 {
  background-color: $turbo-yellow-70;
}
.bg-turbo-yellow-80 {
  background-color: $turbo-yellow-80;
}
.bg-turbo-yellow-90 {
  background-color: $turbo-yellow-90;
}

body {
  font-family: "oswald", sans-serif;
  background: #fafafa;
}

p {
  font-family: "Poppins", sans-serif;
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
  color: #999;
}

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

.navbar {
  padding: 15px 10px;
  /*background: yellow;*/
  border: none;
  border-radius: 0;
  margin-bottom: 40px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.navbar-btn {
  box-shadow: none;
  outline: none !important;
  border: none;
}

.line {
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #ddd;
  margin: 40px 0;
}

.search-container {
  width: 55%;
  position: relative;
  /*right: 400px;*/
  background: white;
}

.search-form {
  /*height: 90px;*/
  width: 35%;
}

.search-container {
  background: black;
  color: #666;
  font: 90%/180% Arial, Helvetica, sans-serif;
  width: 800px;
  max-width: 96%;
  /* right: 90%;
  position: relative; */
}
/* .form-control {
  right: 60%;
  position: relative;
} */
input {
  outline: none;
}
input[type="search"] {
  -webkit-appearance: textfield;
  -webkit-box-sizing: content-box;
  font-family: inherit;
  font-size: 100%;
}
input::-webkit-search-decoration,
input::-webkit-search-cancel-button {
  display: none;
}

input[type="search"] {
  background: #ededed
    url(https://static.tumblr.com/ftv85bp/MIXmud4tx/search-icon.png) no-repeat
    9px center;
  border: solid 1px #ccc;
  padding: 9px 10px 9px 32px;
  width: 55px;

  -webkit-border-radius: 10em;
  -moz-border-radius: 10em;
  border-radius: 10em;

  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
}
input[type="search"]:focus {
  width: 130px;
  background-color: #fff;
  border-color: #66cc75;

  -webkit-box-shadow: 0 0 5px rgba(109, 207, 246, 0.5);
  -moz-box-shadow: 0 0 5px rgba(109, 207, 246, 0.5);
  box-shadow: 0 0 5px rgba(109, 207, 246, 0.5);
}

input:-moz-placeholder {
  color: #999;
}
input::-webkit-input-placeholder {
  color: #999;
}
</style>