<template>
  <div class="navbarHeader">
    <nav class="navbar-navbar-dark-bg-transparent">
      <router-link class="homeLink" to="/">Home</router-link>
      <!-- <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
      </button>-->

      <!-- <ul class="navbar-nav mr-auto"> -->
      <!-- <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>-->
      <!-- <li class="nav-item"> -->
      <router-link to="/portfolio" class="nav-link">Portfolio</router-link>
      <!-- </li> -->
      <!-- </ul> -->

      <!-- <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
      <button @searchStock class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>-->
    </nav>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      searchSymbol: ""
    };
  },

  methods: {
    ...mapActions({
      fetchData: "loadData"
    }),
    loadData() {
      this.fetchData();
    }
  },
  searchStock() {
    this.$store.dispatch("searchStock", order);
  }
};
</script>

<style>
  .navbarHeader{
    height:40px;
  }



.navbar-navbar-dark-bg-transparent {
  margin-right: 25px;
  margin-left: 25px;
  font-family: "Roboto";
  display: block;
  background-color: black;


  /* color: #e5e5e5; */
}

.homeLink {
  position: absolute;
  color: black;
  font-weight: 500;
  letter-spacing: 1.5px;
  font-size: 20px;
  top: 10px;
}
.nav-item {
  padding-left: 25px;
  color: #e5e5e5;
}

.nav-link {
  top: 3px;
  display: block;
  position: absolute;
  left: 80px;
  color: black;
  font-weight: 500;
  letter-spacing: 1.5px;
  font-size: 20px;
}
</style>
