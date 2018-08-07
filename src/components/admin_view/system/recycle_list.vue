<template>
  <el-table
    :data="tableData" border
    style="width: 100%">
    <el-table-column
      prop="in_num"
      label="订单编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="in_date"
      label="订单日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="s_name"
      label="供应商">
    </el-table-column>
    <el-table-column
      prop="chmc_name"
      label="存货名称">
    </el-table-column>

    <el-table-column
      prop="unit"
      label="规格"
      width="180">
    </el-table-column>
    <el-table-column
      prop="unit_price"
      label="单价"
      width="180">
    </el-table-column>
    <el-table-column
      prop="number"
      label="数量"
      width="180">
    </el-table-column>

    <el-table-column
      prop="total_price"
      label="含税金额">
    </el-table-column>
    <el-table-column
      prop="no_tax_price"
      label="未含税金额">
    </el-table-column>
    <el-table-column
      prop="entity_name"
      label="采购主体">
    </el-table-column>

    <el-table-column
      prop="pay_status"
      label="付款状态">
    </el-table-column>
    <el-table-column
      prop="receive_status"
      label="收货状态">
    </el-table-column>
    <el-table-column
      prop="invoice_status"
      label="开发票状态">
    </el-table-column>

  </el-table>
</template>
<script>
  import {list_recycle_purchase} from'../../../api/recycle_orders/recycle'
  import Header from '../common/common_header.vue'
  import Header2 from '../common/common_headerTitle.vue'

    export default {
      data() {
        return {
          tableData: [],
          myInfo:{
            token:''
          }
        }
      },
      created(){
        this.myInfo.token=sessionStorage.getItem('session');
        this.getData();
      },
      methods:{
        getData() {
          var _this = this ;
          list_recycle_purchase(_this.myInfo) .then(function(res){
            _this.tableData = res.data.data;
          });
        },
      }
    }
</script>
