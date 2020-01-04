<template>
  <div class="wrapper">
    <!-- Sidebar  -->
    <side-bar2></side-bar2>
    <!-- Page Content  -->
    <div id="content">
      <navBar></navBar>
      <!-- <dashboard></dashboard> -->
      <div class="dashboard-container">
        <div class="dashboard-graph">
          <div class="card-body">
            <div v-if="this.canvasCreated" id="chart-container">
              <canvas id="myChart" width="320px" height="320px"></canvas>
            </div>
          </div>
          <p>{{getTimeSeries}}</p>
        </div>
        <!-- <div>{{getstockInfo}}</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import sideBar2 from "./sideBar2";
import navBar from "./navBar";
import dashboard from "./dashboard";
export default {
  name: "Home2",
  components: { sideBar2: sideBar2, navBar: navBar, dashboard: dashboard },
   stockInfo: [],
      timeSeries:[],
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
      },
      canvasCreated: false
    //}
  
};
</script>

<style scoped>
body {
  font-family: "Oswald";
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

/* ---------------------------------------------------
        SIDEBAR STYLE
    ----------------------------------------------------- */

$lila: $turbo-yellow /*#7386D5*/;
$lila-60: $turbo-yellow-60 /*#6d7fcc*/;
$lila-line: $turbo-yellow-70 /*#47748b*/;

$text-sidebar: #6b6b6b /*#fff*/;
$text-sidebar-hover: #6b6b6b /*#fff*/;

.text-sidebar {
  color: $text-sidebar;
}

.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
}

#sidebar {
  min-width: 100px;
  max-width: 100px;
  background: $lila;
  color: $text-sidebar;
  transition: all 0.3s;
}

#sidebar.active {
  margin-left: -250px;
}

#sidebar .sidebar-header {
  padding: 20px;
  background: $lila-60 /*#6d7fcc*/;
}

#sidebar ul.components {
  padding: 20px 0;
  border-bottom: 1px solid $lila-line;
}

#sidebar ul p {
  color: $text-sidebar;
  padding: 10px;
}

#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}

#sidebar ul li a:hover {
  color: $lila;
  background: $text-sidebar-hover;
}

#sidebar ul li.active > a,
a[aria-expanded="true"] {
  color: $text-sidebar;
  background: $lila-60;
}

a[data-toggle="collapse"] {
  position: relative;
}

.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: $lila-60;
}

ul.CTAs {
  padding: 20px;
}

ul.CTAs a {
  text-align: center;
  font-size: 0.9em !important;
  display: block;
  border-radius: 5px;
  margin-bottom: 5px;
}

a.download {
  background: $text-sidebar;
  color: $lila;
}

a.article,
a.article:hover {
  background: $lila-60 !important;
  color: $text-sidebar !important;
}

/* ---------------------------------------------------
        CONTENT STYLE
    ----------------------------------------------------- */

#content {
  width: 100%;
  padding: 20px;
  min-height: 100vh;
  transition: all 0.3s;
  /*background:blue;*/
}

/* ---------------------------------------------------
        MEDIAQUERIES
    ----------------------------------------------------- */

@media (max-width: 768px) {
  #sidebar {
    margin-left: -250px;
  }
  #sidebar.active {
    margin-left: 0;
  }
  #sidebarCollapse span {
    display: none;
  }
}

.dashboard-container {
  /* background: yellow; */
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
  flex: flex-grow;
}

.dashboard-info {
  background: black;
  height: 100px;
  border: 2px solid red;
}

.card-body {
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

  /*background: blue;*/
}
</style>