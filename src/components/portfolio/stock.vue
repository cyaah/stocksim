<template>
  <!-- <div class="col-sm-6 col-md-4">
         
  </div>-->
  <div class="col">
    <div class="card text-right" style="width: 18rem;">
      <div class="card-body">
        <p class="card-info">Name: {{stock.name}}</p>
        <p class="card-info">Price: {{stock.price}}</p>
        <p class="card-info">Quantity: {{this.dbQuantity}}</p>
        <p class="card-info">Current Price: {{this.stockInfo.latestPrice}}</p>
        <p class="card-info">Total Change: {{this.totalChange}}</p>
        <!-- <p class="card-text">Quantity: {{stock}} Price: {{stock}</p> -->
        <!-- {{stock}} -->
        <div class="input-group mb-3">
          <input type="number" class="form-control" placeholder="Enter Quantity" v-model="quantity" />
          <div class="input-group-append">
            <button class="btn btn-outline-success" @click="sellStock">Sell</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { db, increment } from "../../main.js";
import firebase from "firebase";
import firestore from "firebase";
const FieldValue = require("firebase").firestore.FieldValue;
import axios from "axios";

export default {
  //  watch: {
  //   dbQuantity: funtion(){
  //     console.log(this.dbQuantity);
  //     }
  //   },
  props: {
    stock: Object,
    portfolio: Array
  },
  data() {
    return {
      quantity: 0,
      stockInfo: {},
      totalChange: 0,
      dbQuantity: 0
    };
  },
  created() {
    axios
      .get(
        `https://cloud.iexapis.com/stable/stock/${encodeURIComponent(
          this.stock.name
        )}/quote?token=pk_f606ae9814ec4d9e991aa1def338e260`
      )
      .then(res => {
        if (res) {
          console.log(res.data);
          console.log("data for each stock");
          this.stockInfo = res.data;
          this.totalChange = (
            parseFloat(this.stockInfo.latestPrice) *
              parseFloat(this.stock.quantity) -
            parseFloat(this.stock.price) * parseFloat(this.stock.quantity)
          ).toFixed(2);

          console.log(
            parseFloat(this.stockInfo.latestPrice) *
              parseFloat(this.stock.quantity)
          );
          console.log(
            parseFloat(this.stockInfo.latestPrice) *
              parseFloat(this.stock.quantity) -
              parseFloat(this.stock.price) * parseFloat(this.stock.quantity)
          );
        }
      })
      .then(con => {
        let q = this.stock.quantity;
        this.dbQuantity += q;
        console.log("db");
        console.log(this.dbQuantity);
        console.log(this.stock.quantity);
      });
  },
  methods: {
    ...mapActions({
      placeSellOrder: "sellStock"
    }),
    sellStock() {
      console.log("sell button pressed");
      console.log(this.portfolio);

      //Building the order
      const order = {
        name: this.stock.name,
        price: this.stock.price,
        quantity: parseInt(this.quantity)
      };
      //console.log("sell order" + order);
      var stockRef = db.collection("test-user").doc("Portfolio");

      //Retrieving stock info from firebase
      stockRef.get().then(doc => {
        var currentStock = doc.data().stock[this.stockInfo.symbol];

        var quan = parseInt(currentStock.quantity) - parseInt(order.quantity);
        if (currentStock) {
          if (quan < 0) {
            quan = 0;
          }
          //Fix currently completely wiping db

          const order = {
            name: this.stock.name,
            price: this.stock.price,
            quantity: quan
          };
         
          var update = {};
          update[`stock.${this.stock.name}`] = order;
          // const decrement = firebase.firestore.FieldValue.increment(order.quantity);
          // stockRef.update({stock: {[order.name]: {[order.name.quantity] : decrement}})
          stockRef.update(update);

          this.dbQuantity = quan;
        }
      });

   
      //this.placeSellOrder(order);
      this.quantity = 0;
    }
  },

  watch: {
    dbQuantity: function() {
      console.log("watched for change");
    }
  }
};
</script>
<style>
</style>
