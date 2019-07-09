<template>
  <div class="row">
    <app-stock v-for="stock in portfolio" :stock="stock" :portfolio="portfolio"></app-stock>
  </div>
</template>

<script>
import stock from "./stock.vue";
import { mapGetters } from "vuex";
import { db, increment } from "../../main.js";
import firebase from "firebase";
import firestore from "firebase";
const FieldValue = require("firebase").firestore.FieldValue;

export default {
  data() {
    return {
      portfolio: []
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
    var stockRef = db.collection("test-user").doc("Portfolio");

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
  }
};
//}
</script>

<style>
</style>
