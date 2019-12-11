<template>
  <div class="dashboard-container">
    <div class="dashboard-graph">
      <div class="card-body-stock">     
        <div class="card-body">
          <div id="chart-container">
            <canvas id="myChart" width="320px" height="320px"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data (){
    return {
  
    }
  },
  methods: {
      canvas() {
      this.createChart("Intra Day Chart", this.canvasData);
    },

    createChart(chartId, chartData) {
      console.log("chartData" + chartData);

      if (myChart) {
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
  }
};
</script>

<style scoped>
.dashboard-container {
  background: yellow;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  flex-wrap: wrap;
  border: 2px solid red;
  height: 100vh;
}

.dashboard-graph {
  height: 50px;
  border: 2px solid red;
}

.dashboard-info {
  background: black;
  height: 100px;
  border: 2px solid red;
}

.card-body-stock {
  /* width: 60%; */
  width: 680px;
  height: 25rem;
  box-shadow: 2px 2px 2px 0 hsla(0, 0%, 0%, 0.5);
  font-family: "Roboto", sans-serif;
  border-radius: 15px;
  border: black;
  position: absolute;
  top: 150px;
  left: 120px;

  background: blue;
}
</style>