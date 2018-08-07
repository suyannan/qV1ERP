<template>
  <div>
    <common-header :title="'系统维护'" :title1="'订单回收站--销售订单'"></common-header>
    <div class="page-content">
      <!--<common-header-tilte :title2="'订单回收站&#45;&#45;销售订单'"></common-header-tilte>-->
      <el-table
        :data="tableData" border
        style="width: 100%" stripe>
        <el-table-column type="index" width="82"></el-table-column>
        <el-table-column property="out_num" label="订单编号" width="130"> </el-table-column>
        <el-table-column property="out_date" label="订单日期" width="160"> </el-table-column>
        <el-table-column property="client_num" label="客户编号" width="150"> </el-table-column>
        <el-table-column property="client_name" label="客户名称" width="120"> </el-table-column>
        <el-table-column property="entity_num" label="销售主体编号" width="120"> </el-table-column>
        <el-table-column property="entity_name" label="销售主体" width="120"> </el-table-column>
        <el-table-column property="total_money" label="销售总额"> </el-table-column>
        <el-table-column property="pay_status" label="收款状态">
          <template slot-scope="scope">
            <span v-if="scope.row.pay_status==0">未收款</span>
            <span v-if="scope.row.pay_status==1">已收款</span>
          </template>
        </el-table-column>
        <el-table-column property="receive_status" label="出货状态">
          <template slot-scope="scope">
            <span v-if="scope.row.receive_status==0">未出货</span>
            <span v-if="scope.row.receive_status==1">已出货</span>
          </template>
        </el-table-column>
        <el-table-column property="invoice_status" label="开票状态">
          <template slot-scope="scope">
            <span v-if="scope.row.invoice_status==0">未开票</span>
            <span v-if="scope.row.invoice_status==1">已开票</span>
          </template>
        </el-table-column>
        <el-table-column property="sell_user" label="销售员" width="120"> </el-table-column>
        <el-table-column property="business_user" label="商务专员" width="120"> </el-table-column>
        <el-table-column property="create_user_name" label="录入人员" width="120"> </el-table-column>
        <el-table-column property="check_user_name" label="审核人员" width="120"> </el-table-column>
        <el-table-column property="remarks" label="备注" width="120"> </el-table-column>

        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <span v-if="is_super==1">
               <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">还原订单</el-button>
            </span>
            <span v-else>
               <el-button size="mini" type="primary" disabled>还原订单</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="total_count">
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
  import {list_recycle_sell,restore_recycle_sell} from'../../../api/index'
  import Header from '../common/common_header.vue'
  import Header2 from '../common/common_headerTitle.vue'

  export default {
    components:{
      'common-header':Header,
      'common-header-tilte':Header2
    },
    data(){
      return {
        tableData:[],
        super_lookover:'',
        is_super:'',
        currentPage1: 1,
        total_count:0,
        list_recycle_sell:{
          token:'',
          page:'1'
        },
        recycle_sell:{
          token:'',
          id:''
        }
      }
    },
    created(){
      this.list_recycle_sell.token = window.sessionStorage.getItem('session');
      this.recycle_sell.token = window.sessionStorage.getItem('session');
      this.super_lookover = window.sessionStorage.getItem('super_lookover');
      this.is_super=window.sessionStorage.getItem('is_super');

      this.getData();
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.list_recycle_sell.page = val;
        this.getData();
        /* console.log(`当前页: ${val}`);*/
      },
      getData(){
        var _this=this;
        list_recycle_sell(this.list_recycle_sell).then(function (res) {
          _this.tableData=res.data.data.data_list;
          if(isNaN(parseInt(res.data.data.total_count))){

          }else {
            _this.total_count = parseInt(res.data.data.total_count);
          }

        }).catch(function (err) {
          console.log(err);
        })
      },
      handleEdit(index,row){
        this.recycle_sell.id = row.order_id;
        var _this=this;
        this.$confirm('是否还原该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          restore_recycle_sell(this.recycle_sell).then(function (res) {
            if(res.data.errcode==0){
              _this.$message({
                message: '还原成功',
                type: 'success'
              });
              _this.getData();
            }else{
              _this.$message({
                message: res.data.errdesc,
                type: 'warning'
              });
            }
          }).catch(function (err) {
            console.log(err);
          })
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消还原'
          });
        });
      }
    }
  }
</script>


<style scoped>

</style>
