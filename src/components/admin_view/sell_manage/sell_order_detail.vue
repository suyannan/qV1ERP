<template>
<div>
  <common-header :title="'销售管理'" :title1="'销售订单详情'"></common-header>
  <div class="page-content">
    <!--<common-header-tilte :title2="'销售订单详情'"></common-header-tilte>-->
    <table1 :sellOrderId="sellOrderId"></table1>
    <table2 :sellOrderId="sellOrderId"></table2>
    <table3 :sellOrderId="sellOrderId"></table3>
    <table4 :sellOrderId="sellOrderId"></table4>
    <table5 :sellOrderId="sellOrderId"></table5>
    <table6 :sellOrderId="sellOrderId"></table6>
  </div>
</div>
</template>

<script>
  import config from '../../../api/config'
  import Header from '../common/common_header.vue'
  import Header2 from '../common/common_headerTitle.vue'
  import axios from 'axios'
  import SellOrderTable from './sell_order_table.vue'
  import SellOrderDetailTable from './sell_order_detail_table.vue'
  import SellOrderPayTable from './sell_order_pay_table.vue'
  import SellOrderInvoiceTable from './sell_order_invoice_table.vue'
  import SellOrderReturnTable from './sell_order_return_table.vue'
  import SellOrderReturnInvoiceTable from './sell_order_return_invoice_table.vue'

/* axios.defaults.withCredentials = true;*/
    export default {
      components:{
        'common-header':Header,
        'common-header-tilte':Header2,
        'table1':SellOrderTable,
        'table2':SellOrderDetailTable,
        'table3':SellOrderPayTable,
        'table4':SellOrderInvoiceTable,
        'table5':SellOrderReturnTable,
        'table6':SellOrderReturnInvoiceTable,

      },
      created(){
        this.sellOrderId=this.$route.params.sellOrderId;

      },
      data(){
        return {
          sellOrderId:''
        }
      },
      methods: {}
    }
</script>
<style>

</style>
