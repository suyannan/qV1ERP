<template>
  <div class="self-table">
    <!--采购订单-->
    <h4>采购订单</h4>
    <el-table :data="order" border  style="width: 100%; margin-top: 20px">
      <el-table-column prop="out_num" label="订单编号">
      </el-table-column>
      <el-table-column prop="out_date" label="订单日期" width="100">
      </el-table-column>
      <el-table-column prop="client_num" label="客户编号">
      </el-table-column>
      <el-table-column prop="client_name" label="客户名称">
      </el-table-column>
      <el-table-column prop="entity_num" label="销售主体编号" width="115">
      </el-table-column>
      <el-table-column prop="entity_name" label="销售主体">caigou
      </el-table-column>
      <el-table-column prop="total_money" label="采购总额">
      </el-table-column>

      <el-table-column label="付款状态">
        <template slot-scope="scope">
          <span v-if="scope.row.pay_status==0">未付款</span>
          <span v-if="scope.row.pay_status==1">已付款</span>
        </template>
      </el-table-column>
      <el-table-column label="发货状态">
        <template slot-scope="scope">
          <span v-if="scope.row.receive_status==0">未发货</span>
          <span v-if="scope.row.receive_status==1">已发货</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="开票状态">
        <template slot-scope="scope">
          <span v-if="scope.row.invoice_status==0">未开票</span>
          <span v-if="scope.row.invoice_status==1">已开票</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250px" fixed="right" class="cz-cell" style="text-align: left">
        <template slot-scope="scope">

          <!--订单未提交0-->
          <div v-if="scope.row.check_status==0">
            <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
            <el-button size="mini" type="primary" @click="upCheck(scope.row)">提交订单</el-button>
          </div>
          <!--提交订单-->
          <div v-if="scope.row.check_status==11||scope.row.check_status==14||scope.row.check_status==1||scope.row.check_status==3||scope.row.check_status==4">
            <el-button size="mini" type="primary" disabled>正在审核</el-button>
            <el-button size="mini" type="primary" disabled>编辑</el-button>
            <el-button size="mini" type="danger" disabled>删除</el-button>
          </div>
          <!--订单不通过13-->
          <div v-if="scope.row.check_status==13">
            <el-button size="mini" type="primary" disabled >订单申请失败</el-button>
            <el-button size="mini" type="primary" @click="checkReason(scope.row.client_refuse_reason)">查看订单申请失败原因</el-button>
            <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
            <el-button size="mini" type="primary" @click="upCheck(scope.row)">提交订单</el-button>
          </div>

          <div v-if="scope.row.check_status==2">
            <el-button size="mini" type="primary" disabled>审核通过</el-button>
            <el-button size="mini" type="primary" disabled>编辑</el-button>
            <el-button size="mini" type="danger" disabled>删除</el-button>
          </div>


        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import config from '../../../api/config'
  import axios from 'axios'
/* axios.defaults.withCredentials = true;*/
  import {get_user_order_detail,user_submit_check_order,user_delete_order} from '../../../api/web_index'
  export default {
    props:{
      sellId:''
    },
    created(){
      this.getData();
    },
    data(){
      return {
        sell_enter:'',
        sell_check:'',
        is_super:'',
        order:[]/*采购订单表格*/
      }
    },
    methods:{
      getData(){
        var _this=this;
        get_user_order_detail({'id':this.sellId,'token':window.sessionStorage.getItem('web_token')}).then(function (res) {
          //console.log('data',res.data.data);
          /*采购订单表格*/
          _this.order=res.data.data.order;
        }).catch(function (err) {
          console.log(err);
        })
      },
      orderEdit(row){
        this.$router.push({'name':'new_order',params:{'type':'edit','id':row.id}});
      },
      orderDelete(row){
        //console.log('row',row);
        var _this=this;
        _this.$confirm('您确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          user_delete_order({'token':window.sessionStorage.getItem('web_token'),'id':row.id}).then(function (res) {
            if(res.data.errcode==0){
              _this.$message({
                message: '删除成功',
                type: 'success'
              });
              _this.$router.push('/main');
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
            message: '已取消删除'
          });
        });

      },
      /*提交审核*/
      upCheck(row){
        //console.log('row',row);
        var _this=this;
        user_submit_check_order({'token':window.sessionStorage.getItem('web_token'),'id':row.id}).then(function (res) {
          if(res.data.errcode==0){
            _this.$message({
              message: '提交成功',
              type: 'success'
            });
            location.reload();
          }else{
            _this.$message({
              message: res.data.errdesc,
              type: 'warning'
            });
          }
        }).catch(function (err) {
          console.log(err);
        })
      },
      checkReason(reason){
        this.$alert(reason, '审核不通过原因');
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
