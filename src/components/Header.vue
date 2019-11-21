<template>
  <div class="navbarHeader">
    <nav class="navbar-navbar-dark-bg-transparent">
      <router-link class="homeLink" to="/">Dashboard</router-link>
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
      <!--<div>-->
       <!--<button @click="logout" >Logout</button>-->
      <div v-if="CHECKLOGIN === true">
      <a class = "logout" @click.prevent="logout">Logout</a>
      <!--</div>-->
        <!--<router-link to="/login" @click.prevent="logout" class="logout">Logout</router-link>-->
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {mapGetters} from 'vuex';
import firebase from "firebase";
import firestore from "firebase";
import { store } from "./store/store.js";

export default {
  data() {
    return {
      searchSymbol: "",
      loggedIn: false
    };
  },

  methods: {
    ...mapActions({
      fetchData: "loadData"
    }),
    loadData() {
      this.fetchData();
    },
    logout() {
      console.log("sign out");
      firebase
        .auth()
        .signOut()
        .then(resp => {
          // console.log("ssss");
          this.$store.commit('LOGOUT')


        }).then(() => {
          // console.log('then');
          this.$router.push({ path: '/login' })

      });
    },
  },
  computed: {
      ...mapGetters(['CHECKLOGIN'])
  },
  beforeMount:function (){
    console.log("before")

  // searchStock() {
    //this.$store.dispatch("searchStock", order);
  }
};
</script>

<style>
.navbarHeader {
  height: 40px;
}

.navbar-navbar-dark-bg-transparent {
  margin-right: 25px;
  margin-left: 25px;
  font-family: "Roboto";
  display: block;
  /*background-color: black;*/

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
  left: 130px;
  color: black;
  font-weight: 500;
  letter-spacing: 1.5px;
  font-size: 20px;
}

.logout {
  top: 10px;
  position: absolute;
  color: black;
  font-weight: 500;
  letter-spacing: 1.5px;
  font-size: 20px;
  right: 50px;
}
</style>
