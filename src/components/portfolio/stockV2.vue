<template>
  <tr class="stockEntry" @click="stockSelected(stockInfo)">
    <!--    <th scope="row">{{a}}</th>-->
    <td>{{ stock.name }}</td>
    <td>{{stockInfo.companyName}}</td>
    <td>$ {{stockInfo.latestPrice}}</td>
    <td>{{ stock.quantity }}</td>
    <td>$ {{totalChange }}</td>
  </tr>
</template>

<script>
import axios from "axios";
import { EventBus} from './../eventBus';



export default {
  props: ["stock", "portfolio", "index"],
  data() {
    return {
      quantity: 0,
      stockInfo: {},
      dbQuantity: 0
    };
  },
  created() {
    console.log("V2");
    console.log("created");
    axios
      .get(
        `https://cloud.iexapis.com/stable/stock/${encodeURIComponent(
          this.stock.name
        )}/quote?token=pk_f606ae9814ec4d9e991aa1def338e260`
      )
      .then(res => {
        if (res) {
          console.log("data for each stock");
          this.stockInfo = res.data;
          console.log(this.stockInfo);
        }
      })
      .then(con => {
        let q = this.stock.quantity;
        // console.log(this.stock.name);
        // console.log("db");
        // console.log(this.dbQuantity);
        // console.log(this.stock.quantity);
      });
  },
  methods: {
    stockSelected: function (stock){
      console.log(stock);
      console.log('picked stock');
      EventBus.$emit("stockSelected",stock)
    }
  },
  computed: {
    totalChange: function() {
      return (
        parseFloat(this.stockInfo.latestPrice) *
          parseFloat(this.stock.quantity) -
        parseFloat(this.stock.price) * parseFloat(this.stock.quantity)
      ).toFixed(2);
    }
  }
};
</script>

<style scoped>
  .stockEntry {
    /*display: inline-block;*/
    cursor: pointer;

    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    overflow: hidden;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: color, background-color;
    transition-property: color, background-color;
  }
  .stockEntry:hover, .stockEntry:focus, .stockEntry:active {
    background-color: #2BA84A;
    color: white;
  }

</style>
