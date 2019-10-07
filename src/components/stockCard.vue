<template>
  <div class="search-results">
    <div class="card-body-stock">
      <!-- <div id="chart-container">
        <canvas id="myChart" width="300px" height="300px"></canvas>
      </div>-->
      <div class="card" style="width: 42rem;">
        <div class="card-body">
          <div id="chart-container">
            <canvas id="myChart" width="320px" height="320px"></canvas>
          </div>
        </div>
      </div>
      <h3 class="ticker">{{this.results[0]['symbol']}}</h3>
      <div class="card-info-left">
        <p class="card-info">Price: ${{this.results[0]['latestPrice']}}</p>
        <p class="card-info">Market Cap: $ {{this.results[0]['marketCap']}}</p>
        <p class="card-info">Open: {{this.results[0]['open']}}</p>
        <p class="card-info">High: {{this.results[0]['high']}}</p>
        <p class="card-info">Low: {{this.results[0]['low']}}</p>
      </div>
      <div class="card-info-right">
        <p class="card-info">Volume: {{this.results[0]['volume']}}</p>
        <p class="card-info">Previous close: {{this.results[0]['previousClose']}}</p>
        <p class="card-info">Change: {{this.results[0]['change']}}</p>
        <p class="card-info">Change%: {{this.results[0]['changePercent']}}</p>
        <p class="card-info">P/E Ratio: {{this.results[0]['peRatio']}}</p>
      </div>
      <!-- bug- Input allows the enter of 'e' when only shouldbe number. Result in empty string quantity-->
      <div class="input-group">
        <input
          v-on:keyup.enter="buyStock"
          type="number"
          id="searchBuy"
          placeholder="Enter Quantity"
          aria-describedby="basic-addon2"
          v-model="quantity"
          min="1"
        />
        <div>
          <button class="btn btn-outline-success" @click="buyStock">Buy</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["results"],
  data() {
    return {
      myChart: null,
      currentUser: null,
      searchTerm: "",
      funds: 0,
      id: "",
      //results: [],
      noResults: false,
      notSearched: true,
      error: false,
      quantity: 0,
      //planetChartDaisEmptyta: planetChartData,
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
  mounted() {
    console.log("resultsxoxo");
    console.log(results);
  }
};
</script>

<style scoped>
/* .input-group {
  margin-top: 25px;
} */
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
.card-body-stock {
  /* width: 60%; */
  width: 30rem;
  height: 25rem;
  box-shadow: 2px 2px 2px 0 hsla(0, 0%, 0%, 0.5);
  font-family: "Roboto", sans-serif;
  border-radius: 15px;
  border: black;
  position: absolute;
  top: 200px;
  left: 120px;
}
.stockBuy {
  position: relative;
  bottom: 20px;
}
.card {
  position: absolute;
  left: 800px;
}
.card-info {
  font-weight: 300;
  font-family: "Roboto", sans-serif;
  /* letter-spacing: 4px; */
  font-weight: 400;
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
  font-weight: 400;
  left: 60px;
}
/* .input-group-append {
  width: 400px;
} */

#searchBuy {
  border-radius: 5px;
  width: 50%;
}
.btn {
  left: 10px;
  position: relative;
}

.ticker {
  font-weight: 600;
  letter-spacing: 4px;
}
</style>