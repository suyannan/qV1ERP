<template>
  <div>
    <common-header :title="'销售管理'" :title1="'销售退货单批次'"></common-header>
    <div class="page-content">
      <!--<common-header-tilte :title2="'销售退货单批次'"></common-header-tilte>-->
      <div class="self-table">
        <div>
          <el-table :data="order_return_pc_list" border style="width: 100%; margin-top: 20px">
<!--            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="return_num" label="退货单编号"></el-table-column>
            <el-table-column prop="return_date" label="退货日期"></el-table-column>
            <el-table-column prop="number" label="退货数量"></el-table-column>
            <el-table-column prop="order_in_batch" label="退货批次"></el-table-column>
            <el-table-column prop="unit_price" label="退货单价"></el-table-column>
            <el-table-column prop="total_price" label="退货总金额"></el-table-column>
            <el-table-column prop="create_user_name" label="录入人员"></el-table-column>-->
            <el-table-column prop="order_in_batch" label="退货批次"></el-table-column>
            <el-table-column prop="chmc_num" label="存货编号" width="130"></el-table-column>
            <el-table-column prop="chmc_name" label="存货名称"></el-table-column>
            <el-table-column prop="chfl_num" label="存货分类编号"  width="130"></el-table-column>
            <el-table-column prop="chfl_name" label="存货分类"></el-table-column>
            <el-table-column prop="chd_num" label="存货地编号" width="105"></el-table-column>
            <el-table-column prop="chd_name" label="存货地"></el-table-column>
            <el-table-column prop="unit" label="规格型号"></el-table-column>
            <el-table-column prop="number" label="退货数量"></el-table-column>
            <el-table-column prop="unit_price" label="退货单价"></el-table-column>
            <el-table-column prop="total_price" label="退货总金额"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Header from '../common/common_header.vue'
  import Header2 from '../common/common_headerTitle.vue'
  import {list_order_return_batchs} from '../../../api/index'
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
        order_return_pc_list:[]/*销售开票*/
      }
    },
    methods:{
      getData(){
        var _this=this;
        list_order_return_batchs(this.$route.params.id).then(function (res) {
          _this.order_return_pc_list=res.data.data;
        }).catch(function (err) {
          console.log(err);
        })
      }



    }

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
