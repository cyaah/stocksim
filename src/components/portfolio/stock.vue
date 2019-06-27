<template>
      <!-- <div class="col-sm-6 col-md-4">
         
      </div> -->
    <div class="col">
       <div class="card text-right" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Name: {{stock.name}}</h5>
              <p class="card-text">Quantity: {{stock.quantity}} Price: {{stock.price}}</p>
              <div class="input-group mb-3">
                <input 
                type="number" 
                class="form-control" 
                placeholder="Enter Quantity" 
                v-model = "quantity">
                <div class="input-group-append">
                  <button 
                  @click="sellStock"
                  :disabled="quantity <= 0 || !Number.isInteger(quantity)"> Sell </button>
                </div>
              </div>
            </div>
          </div>
          <button
          @click="save">Store</button>
    </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  props: ['stock'],
  data (){
    return {
      quantity: 0
    }
  },

  methods: {
    ...mapActions({
      placeSellOrder: 'sellStock'
    }),
    sellStock(){
      console.log("sell button pressed");
      const order = {
        name : this.stock.name,
        price : this.stock.price,
        quantity : this.quantity
      };
      console.log("sell order"+order);
      this.placeSellOrder(order);
      this.quantity = 0;
    },
    save(){
      
    }
  }

}
</script>
<style>

</style>
