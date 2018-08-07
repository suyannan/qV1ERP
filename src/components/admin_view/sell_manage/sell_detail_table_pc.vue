<template>
  <div>
    <common-header :title="'销售管理'" :title1="'销售清单批次'"></common-header>
    <div class="page-content">
      <!--<common-header-tilte :title2="'销售清单批次'"></common-header-tilte>-->
      <div class="self-table">
        <div >
          <el-table :data="order_detail_pc_list" border style="width: 100%; margin-top: 20px">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="chmc_num" label="存货编号"></el-table-column>
            <el-table-column prop="chmc_name" label="存货名称"></el-table-column>
            <el-table-column prop="order_in_batch" label="存货批次"></el-table-column>
            <el-table-column prop="chfl_num" label="存货分类编号"></el-table-column>
            <el-table-column prop="chfl_name" label="存货分类"></el-table-column>
            <el-table-column prop="chd_num" label="存货地编号"></el-table-column>
            <el-table-column prop="chd_name" label="存货地"></el-table-column>
            <el-table-column prop="unit" label="规格型号"></el-table-column>
            <el-table-column prop="number" label="数量"></el-table-column>
            <el-table-column prop="unit_price" label="单价"></el-table-column>
            <el-table-column prop="tax_rate" label="税率%"></el-table-column>
            <el-table-column prop="total_price" label="含税金额"></el-table-column>
            <el-table-column prop="no_tax_price" label="未含税金额"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../common/common_header.vue'
  import Header2 from '../common/common_headerTitle.vue'
  import {list_order_batchs} from '../../../api/index'
  export default {
    components:{
      'common-header':Header,
      'common-header-tilte':Header2
    },
    created(){
      this.getData();
    },
    data(){
      return {
        order_detail_pc_list:[],/*销售清单表格*/
      }
    },
    methods:{
      getData(){
        var _this=this;
        list_order_batchs(this.$route.params.id).then(function (res) {
          _this.order_detail_pc_list=res.data.data;

        }).catch(function (err) {
          console.log(err);
        })
      }
    },

  }
</script>
<style>
  .cell button{
    margin:5px;
  }
  .el-table div{
    display: inline-block;
  }
</style>
