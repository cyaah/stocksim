<template>
  <div>
  <div class="header">
    <app-header></app-header>
  </div>
    <div class="page">
      <router-view></router-view>
    </div>
  <!-- <div class="container">
    //Put div container in the body
  </div>-->
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import { mapState } from "vuex";
import Chart from "chart.js";
export default {
  components: {
    appHeader: Header
    //appHome: Home
  },
  data() {
    return {
      keywords: "",
      reults: []
    };
  },
  created() {
    console.log("at create");
    //this.$store.dispatch("loadStocks");
  }
};
</script>

<style>
/* .container{
  font-family: 'Taviraj', serif;
} */
body {
  /* background-image: url(../images/NYSE.jpg);
  background-size: 100%;
  background-size: cover; */
}

.header {
  /*background-color: yellow;*/
}
/*.page {*/
  /*top: 100px;*/
  /*position: absolute;*/
/*}*/
</style>
