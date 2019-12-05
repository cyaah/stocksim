<template>
<!--  <div class="header">-->
<!--    <app-header></app-header>-->
<!--  </div>-->
    <div class="page">
      <router-view></router-view>
    </div>
  <!-- <div class="container">
    //Put div container in the body
  </div>-->
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
/*body {*/

/*  background-size: 100%;*/
/*  background-size: cover;*/
/*}*/

body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
}


.header {
  /*background-color: yellow;*/
}
.page {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
}
</style>
