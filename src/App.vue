<template>
  <div>
    <app-header></app-header>
    <router-view></router-view>
  </div>

  <!-- <div class="container">
    //Put div container in the body 
  </div>-->
</template>

<script>
import Header from "./components/Header.vue";
//import { mapState } from 'vuex';
import Chart from 'chart.js';

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
    console.log("at create")
    //this.$store.dispatch("loadStocks");
  }
};
</script>

<style>
/* .container{
  font-family: 'Taviraj', serif;
} */
</style>
