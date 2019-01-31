<template>
    <div>
        <appstock v-for="(stock,index) in stocks" :key="index" :stock="stock"></appstock>
    </div>
</template>

<script>
import stock from './stock.vue';
import {mapGetters} from 'vuex';


export default {
    components: {
        appstock: stock
    },

    computed: {
        ...mapGetters({
            stocks: 'stockPortfolio'
        })
    }
}
</script>

<style>

</style>
