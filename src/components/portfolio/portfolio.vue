<template>
  <div class="portfolioPage">
    <div class="funds-div">
      <h3>Funds: {{this.funds}}</h3>
    </div>
    <div class="column">
      <!-- <transition-group tag="div" name="portfolio"> -->
      <app-stock
        v-for="(stock,index) in portfolio"
        :stock="stock"
        :portfolio="portfolio"
        v-on:deleteStock="deleteThisStock"
        v-on:updateStock="updateStock"
        :key="stock.name"
        :index="index"
      ></app-stock>
      <!-- </transition-group> -->
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
    appStock: stock
  },
  created() {
    this.userId = this.$store.getters.GETUSERID;
    this.funds = this.$store.getters.getUserFunds;
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
  top: 60px;
}

.funds-div {
  position: absolute;
  left: 90%;
}
.column {
  /* background-color: blue; */
}

.stock-enter-active,
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
}
</style>
