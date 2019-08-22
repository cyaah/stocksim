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
          />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  </div>
</template>



<script>
export default {};
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
</style>
