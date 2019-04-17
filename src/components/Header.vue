<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to="/">StockSim</router-link>
  <!-- <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button> -->

  <div class="collapse navbar-collapse">
    <ul class="navbar-nav mr-auto">
      <!-- <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li> -->
      <li class="nav-item">
        <router-link to="/portfolio" class="nav-link">Portfolio</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/stocks" class="nav-link">Stocks</router-link>
      </li>
    </ul>
    <!-- <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form> -->
  </div>
      <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button @searchStock class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
        <a @click="loadData" class="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Save/Load
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
</nav>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  data () {
    return {
      searchSymbol: ''
    }
  },

  methods: {
    ...mapActions({
      fetchData: 'loadData'
    }),
  loadData(){
    this.fetchData();
    }
  },
  searchStock(){
    this.$store.dispatch('searchStock', order);

  }
}
</script>

<style>
.navbar{

  margin-right: 25px;
  margin-left: 25px;
  font-family: 'Roboto';


}

</style>
