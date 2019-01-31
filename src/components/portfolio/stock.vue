<template>
      <!-- <div class="col-sm-6 col-md-4">
         
      </div> -->


  <div class="row">
    <div class="col">
       <div class="card text-right" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Name: {{stock.name}}</h5>
              <p class="card-text">Quantity: {{stock.quantity}} Price: {{stock.price}}</p>
              <div class="input-group mb-3">
                <input type="number" class="form-control" placeholder="Enter Quantity" aria-describedby="basic-addon2">
                <div class="input-group-append">
                  <button> Sell </button>
                </div>
              </div>
            </div>
          </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    props: ['stock'],


}
</script>