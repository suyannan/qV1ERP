<template>
  <div>
    <common-header :title="'采购管理'" :title1="'采购订单详情'"></common-header>
    <div class="page-content">
      <!--<common-header-tilte :title2="'采购订单详情'"></common-header-tilte>-->
      <table1 :purchaseOrderId="purchaseOrderId"></table1>
      <table2 :purchaseOrderId="purchaseOrderId"></table2>
      <table3 :purchaseOrderId="purchaseOrderId"></table3>
      <table4 :purchaseOrderId="purchaseOrderId"></table4>
    </div>
  </div>
</template>

<script>
  import config from '../../../api/config'
  import Header from '../common/common_header.vue'
  import Header2 from '../common/common_headerTitle.vue'
  import axios from 'axios'
  import purchaseOrderTable from './purchase_order_table.vue'
  import purchaseOrderDetailTable from './purchase_order_detail_table.vue'
  import purchaseOrderPayTable from './purchase_order_pay_table.vue'
  import purchaseOrderInvoiceTable from './purchase_order_invoice_table.vue'


/* axios.defaults.withCredentials = true;*/
  export default {
    components:{
      'common-header':Header,
      'common-header-tilte':Header2,
      'table1':purchaseOrderTable,
      'table2':purchaseOrderDetailTable,
      'table3':purchaseOrderPayTable,
      'table4':purchaseOrderInvoiceTable
    },
    created(){
      this.purchaseOrderId=this.$route.params.purchaseOrderId;

    },
    data(){
      return {
        purchaseOrderId:''
      }
    },
    methods: {}
  }
</script>
<style>

</style>
