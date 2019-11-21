<template>
  <div class="container">
    <div class="form-card">
      <form>
        <div class="form-group">
          <strong for="exampleInputEmail1">Email address</strong>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="email"
          />
          <small id="emailHelp" class="form-text">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <strong for="exampleInputPassword1">Password</strong>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <button @click.prevent="loginUser" class="btn btn-primary">Login</button>
        <!-- <button class="btn btn-primary" >Register</button> -->
      </form>
      <router-link class="registerLink" to="/register">Register</router-link>
    </div>
  </div>
</template>



<script>
import axios from "axios";
import { db, increment } from "../main.js";
import firebase from "firebase";
import firestore from "firebase";
import { isError } from "util";
const FieldValue = require("firebase").firestore.FieldValue;
import { mapActions } from "vuex";
import { store } from "./store/store.js";

export default {
  data() {
    return {
      user: null,
      email: "",
      password: ""
    };
  },

  methods: {
    loginUser() {
      console.log("asd");
      console.log(this.email);
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(cred => {
          console.log("login");
          console.log(cred);
          this.$store.commit("LOGIN", cred.user);
        })
        .then(res => {
          console.log(this.email);
          console.log("email");
          this.$router.push({ path: "/" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
body {
  background-image: url("../../images/roberto-junior-4fsCBcZt9H8-unsplash.jpg");
  /* background: #2b0c5c; */
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
}
.form-card {
  position: absolute;
  width: 35%;
  top: 20%;
  left: 80px;
}
.form-control {
  width: 60%;
}
</style>
