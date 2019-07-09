<template>
  <!-- <div class="col-sm-6 col-md-4">
         
  </div>-->
  <div class="col">
    <div class="card text-right" style="width: 18rem;">
      <div class="card-body">
        <p class="card-info">Name: {{stock.name}}</p>
        <p class="card-info">Price: {{stock.price}}</p>
        <p class="card-info">Quantity: {{stock.quantity}}</p>
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
  props: {
    stock: Object,
    portfolio: Array
  },
  data() {
    return {
      quantity: 0,
      stockInfo: {},
      totalChange: 0
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
      });
  },
  methods: {
    ...mapActions({
      placeSellOrder: "sellStock"
    }),
    sellStock() {
      console.log("sell button pressed");
      console.log(this.portfolio);
      const order = {
        name: this.stock.name,
        price: this.stock.price,
        quantity: this.quantity
      };
      console.log("sell order" + order);
      var stockRef = db.collection("test-user").doc("Portfolio");

      stockRef.get().then(doc => {
        var currentStock = doc.data().stock[order.name];

        if (currentStock) {
          var quan = parseInt(currentStock.quantity) - parseInt(order.quantity);
          if (quan < 0) {
            quan = 0;
          }
        }
      });

      this.placeSellOrder(order);
      this.quantity = 0;
    }
  }
};
</script>
<style>
</style>
