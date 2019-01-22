<template>
    <div class="card text-right" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title">Name: {{stock.name}}</h5>
    <p class="card-text">Price: {{stock.price}}</p>
    <a href="#" class="btn btn-primary"> Buy {{stock.name}} </a>
  </div>
</div>
</template>

<script>
export default {
  props:['stock'],

}
</script>

<style>

</style>
