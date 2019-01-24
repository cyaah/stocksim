<template>
      <!-- <div class="col-sm-6 col-md-4">
         
      </div> -->


  <div class="row">
    <div class="col">
       <div class="card text-right" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Name: {{stock.name}}</h5>
              <p class="card-text">Price: {{stock.price}}</p>
              <div class="input-group mb-3">
                <input type="number" v-model="quantity" class="form-control" placeholder="Enter Quantity" aria-describedby="basic-addon2">
                <div class="input-group-append">
                  <button @click="buyStock"> Buy </button>
                </div>
              </div>
            </div>
          </div>
    </div>
  </div>
</template>





<script>
export default {
  props:['stock'],

  data () {
    return {
      quantity: 0
    }
  },

  methods:{
    buyStock(){
       console.log("stock bought");
      var order= {
        name : this.stock.name,
        price : this.stock.price,
        quantity : this.quantity
      };
     
      this.$store.dispatch('buyStock', order);
      this.quantity = 0;
    }
  }
}
</script>

<style>

</style>
