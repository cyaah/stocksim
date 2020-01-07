<template>
  <div class="column">
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">Ticker</th>
          <th scope="col">Name</th>
          <th scope="col">Current Price</th>
          <th scope="col">Gain/Loss</th>
        </tr>
      </thead>
      <tbody>
        <stock></stock>
        <!-- <tr v-for="stock in portfolio">
          <th scope="row">{{stock.name}}</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import stock from './stockV2';


export default {
  props:{
    portfolio: Array
  },
  components:{
    stock
  }
  data(){
    return{

    }
  },
  created (){
    console.log(this.portfolio)
  }
};
</script>

<style scoped>
</style>