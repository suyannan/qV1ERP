<template>

    <div class="main-box" style="height:100%;">
      <div class="con_width clearfix main-div choose" style="height: 100%;padding-top:50px;">
    <table1 :sellId="sellId"></table1>
    <table2 :sellId="sellId"></table2>
    </div>
    </div>

</template>

<script>
  import config from '../../../api/config'
  import axios from 'axios'
/* axios.defaults.withCredentials = true;*/
  import OrderTable from './order_table.vue'
  import OrderDetailTable from './order_detail_table.vue'
  export default {
    components:{

      'table1':OrderTable,
      'table2':OrderDetailTable,

    },
    created(){
      //console.log('sellOrderId',this.$route.params.SellId);
      this.sellId=this.$route.params.SellId;

    },
    data(){
      return {
        sellId:''
      }
    },
    methods: {}
  }
</script>
<style>

</style>
