<template>
    <div>
        <app-stock v-for="stock in stocks"  :stock="stock"></app-stock>
    </div>
</template>

<script>
import stock from './stock.vue';
import {mapGetters} from 'vuex';
// import firebase from 'firebase';

export default {
  // data (){
  //   return {
       
  //   };
  
  // },

  // firestore(){
  //   console.log("getting from firestore");
  //   return {
  //     stockList: db.collection('test-user')
  //   }
  // },

    // computed: {
    //     ...mapGetters({
    //         stocks: 'stockPortfolio'
    //     })
    // },

      computed: {
        stocks(){
            var stock = this.$store.getters.stockPortfolio
            // console.log(stock);
            // console.log("check");
            // return stock;
            return this.$store.getters.stockPortfolio;
        },
    },


    components: {
        appStock: stock
    }
}
//}
</script>

<style>

</style>
