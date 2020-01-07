<template>
  <div class="portfolioPage">
    <side-bar2></side-bar2>

    <!-- Page Content  -->
    <div id="content">
      <navBar></navBar>
      <!--<dashboard></dashboard>-->
      <div class="dashboard-container">
        <portfolioTable :portfolio="portfolio" ></portfolioTable>

        <!-- <div class="column">
        
          <transition-group tag="div" name="portfolio">
            <app-stock
              v-for="(stock,index) in portfolio"
              :stock="stock"
              :portfolio="portfolio"
              v-on:deleteStock="deleteThisStock"
              v-on:updateStock="updateStock"
              :key="stock.name"
              :index="index"
            ></app-stock>
          </transition-group>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import stock from "./stock.vue";
import { mapGetters } from "vuex";
import { db, increment } from "../../main.js";
import firebase from "firebase";
import firestore from "firebase";
import portfolio from "../store/modules/portfolio";
const FieldValue = require("firebase").firestore.FieldValue;
import sideBar2 from "../sideBar2";
import navBar from "../navBar";
import portfolioTable from "./portfolioTable";

export default {
  data() {
    return {
      portfolio: [],
      funds: 0,
      userId: ""
    };
  },

  //   computed: {
  //     stocks() {
  //       var stock = this.$store.getters.stockPortfolio;
  //       return this.$store.getters.stockPortfolio;
  //     }
  //   },
  components: {
    appStock: stock,
    sideBar2: sideBar2,
    navBar,
    portfolioTable
  },
  created() {
    this.funds = this.$store.getters.getUserFunds;

    var user = firebase.auth().currentUser;
    this.userId = user.uid;

    var stockRef = db.collection(this.userId).doc("Portfolio");

    stockRef.get().then(doc => {
      if (doc.exists) {
        //console.log("document exists on created");
        var arr = Object.values(doc.data().stock);
        for (var i = 0; i < arr.length; i++) {
          this.portfolio.push(arr[i]);
        }
        //console.log("portfolio");
        //console.log(this.portfolio);
      }
    });
  },
  methods: {
    deleteThisStock: function(payload) {
      console.log("DELETE STOCK");
      let index = payload.index;
      this.portfolio.splice(index, 1);
      console.log(payload);
      this.funds += payload.sellingPrice;
    },
    updateStock: function(order) {
      console.log("UPDATE STOCK");
      console.log(order.name);
      for (var i = 0; i < this.portfolio.length; i++) {
        if (this.portfolio[i].name === order.name) {
          this.portfolio[i].quantity = order.quantity;
          console.log("found");
          console.log(this.portfolio[i]);
        }
      }
      console.log(order.sellingPrice);
      let funds = this.funds;
      this.funds += order.sellingPrice;
      console.log(this.funds);
    }
  }
};
//}
</script>

<style>
.portfolioPage {
  /* top: 60px; */
  display: flex;
  width: 100%;
  align-items: stretch;
  font-family: "Montserrat", sans-serif;
}

.body {
  /* font-family: "Oswald"; */
  background: #fafafa;
  font-family: "Montserrat", sans-serif;
}
.dashboard-container {
  /* background: yellow; */
  display: flex;
  flex-flow: row wrap;
  /*justify-content: space-between;*/
  /*border: 2px solid red;*/
  height: 100vh;
  padding: 5px;
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

.chart-card-body {
  /* width: 60%; */
  width: 90%;
  height: 25rem;
  /*box-shadow: 2px 2px 2px 0 hsla(0, 0%, 0%, 0.5);*/
  /*border-radius: 15px;*/
  border: black;
  /*position: absolute;*/
  /*top: 150px;*/
  left: 120px;
  /*background: blue;*/
  margin: 5px;
  /*flex: flex-grow;*/
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
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
  /* box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1); */
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

#sidebar {
  min-width: 112px;
  background: $lila;
  color: Black;
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

/* .funds-div {
  position: absolute;
  left: 90%;
} */
/* .column {
  /* background-color: blue; */
/* } 

/* .stock-enter-active,
.stock-leave-active,
.stock-move {
  transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.stock-enter {
  opacity: 0;
  transform: translateX(50px) scaleY(0.5);
}

.stock-enter-to {
  opacity: 1;
  transform: translateX(0) scaleY(1);
}

.stock-leave-active {
  position: absolute;
}

.stock-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center top;
} */
</style>
