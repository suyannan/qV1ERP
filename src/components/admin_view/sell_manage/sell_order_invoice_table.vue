<template>
  <div class="self-table">
    <h4>销售开票</h4>
    <div>
      <el-table :data="order_invoice_list" max-height="450" border  style="width: 100%; margin-top: 20px" :summary-method="getSummaries"
                show-summary>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="invoice_num" label="发票号" width="120"></el-table-column>
        <el-table-column prop="invoice_date" label="开票日期" width="175"></el-table-column>
        <el-table-column prop="op_user" label="操作人"></el-table-column>
        <el-table-column prop="total_price" label="发票含税金额" width="150"></el-table-column>
        <el-table-column prop="tax_price" label="发票未含税金额" width="150"></el-table-column>
        <el-table-column prop="create_user_name" label="录入人员"></el-table-column>
        <el-table-column label="操作" width="200px" fixed="right" class="cz-cell" style="text-align: left">
          <template slot-scope="scope">
            <!--订单审核通过后可以添加销售开票-->
            <div v-if="order_check_status==2">
              <!--不是超级管理员的时候-->
              <div v-if="is_super==0">

                <!--同时有采购录入删除权限和采购审核权限-->
                <div v-if="sell_invoice_enter==1&&sell_invoice_check==1">
                  <!--有录入权限，在执行录入功能的时候，需要判断订单是不是别人录入的订单，录入人员无法编辑别人录入的订单-->
                  <!--是自己录入的订单时-->
                  <div v-if="userId==scope.row.create_user_id">
                    <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                      <el-button v-if="scope.row.check_status==0" size="mini" type="primary" disabled>未提交审核</el-button>
                      <el-button v-if="scope.row.check_status==3" size="mini" type="primary" disabled>审核不通过</el-button>
                      <el-button v-if="scope.row.check_status==3" size="mini" type="primary"
                                 @click="checkReason(scope.row)">查看不通过原因
                      </el-button>
                      <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                      <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
                      <el-button size="mini" type="primary" @click="upCheck(scope.row)">提交审核</el-button>
                    </div>
                    <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                      <el-button size="mini" type="primary" disabled>正在审核</el-button>
                      <el-button size="mini" type="primary" @click="orderPassOrNot(scope.row,'y')">审核通过</el-button>
                      <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n')">审核不通过</el-button>
                    </div>
                    <div v-if="scope.row.check_status==2">
                      <el-button size="mini" type="primary" disabled>审核通过</el-button>
                    </div>
                  </div>
                  <!--不是自己录入的订单，别人录入的订单-->
                  <div v-else>
                    <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                      <el-button v-if="scope.row.check_status==0" size="mini" type="primary" disabled>未提交审核</el-button>
                      <el-button v-if="scope.row.check_status==3" size="mini" type="primary" disabled>审核不通过</el-button>
                      <el-button v-if="scope.row.check_status==3" size="mini" type="primary" @click="checkReason(scope.row)">查看不通过原因</el-button>
                      <el-button size="mini" type="primary" disabled>编辑</el-button>
                      <el-button size="mini" type="danger" disabled>删除</el-button>
                      <el-button size="mini" type="primary" disabled>提交审核</el-button>
                    </div>
                    <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                      <el-button size="mini" type="primary" disabled>正在审核</el-button>
                      <el-button size="mini" type="primary" @click="orderPassOrNot(scope.row,'y')">审核通过</el-button>
                      <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n')">审核不通过</el-button>
                    </div>
                    <div v-if="scope.row.check_status==2">
                      <el-button size="mini" type="primary" disabled>审核通过</el-button>
                    </div>
                  </div>

                </div>


                <!--只有销售开票录入删除权限，没有销售开票审核权限-->
                <div v-if="sell_invoice_enter==1&&sell_invoice_check==0">
                  <!--有录入权限，在执行录入功能的时候，需要判断订单是不是别人录入的订单，录入人员无法编辑别人录入的订单-->
                  <!--是自己录入的订单时-->
                  <div v-if="userId==scope.row.create_user_id">
                    <div v-if="scope.row.check_status==0">
                      <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                      <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
                      <el-button size="mini" type="primary" @click="upCheck(scope.row)">提交审核</el-button>
                    </div>
                    <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                      <el-button size="mini" type="primary" disabled>编辑</el-button>
                      <el-button size="mini" type="danger" disabled>删除</el-button>
                      <el-button size="mini" type="primary" disabled>正在审核</el-button>
                    </div>
                    <div v-if="scope.row.check_status==2">
                      <el-button size="mini" type="primary" disabled>审核通过</el-button>
                    </div>
                    <div v-if="scope.row.check_status==3">
                      <el-button size="mini" type="primary" disabled>审核不通过</el-button>
                      <el-button v-if="scope.row.check_status==3" size="mini" type="primary"
                                 @click="checkReason(scope.row)">查看不通过原因
                      </el-button>
                      <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                      <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
                      <el-button size="mini" type="primary" @click="upCheck(scope.row)">提交审核</el-button>
                    </div>
                  </div>
                  <!--不是自己录入的订单，别人录入的订单-->
                  <div v-else>
                    <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                      <el-button v-if="scope.row.check_status==3" size="mini" type="primary" disabled>审核不通过</el-button>
                      <el-button v-if="scope.row.check_status==3" size="mini" type="primary" @click="checkReason(scope.row)">查看不通过原因</el-button>
                      <el-button size="mini" type="primary" disabled>编辑</el-button>
                      <el-button size="mini" type="danger" disabled>删除</el-button>
                      <el-button size="mini" type="primary" disabled>提交审核</el-button>
                    </div>
                    <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                      <el-button size="mini" type="primary" disabled>正在审核</el-button>
                    </div>
                    <div v-if="scope.row.check_status==2">
                      <el-button size="mini" type="primary" disabled>审核通过</el-button>
                    </div>
                  </div>
                </div>


                <!--没有销售开票录入删除权限，只有销售开票审核权限-->
                <div v-if="sell_invoice_enter==0&&sell_invoice_check==1">
                  <div v-if="scope.row.check_status==0">
                    <el-button size="mini" type="primary" disabled>未提交审核</el-button>
                  </div>
                  <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                    <el-button size="mini" type="primary" @click="orderPassOrNot(scope.row,'y')">审核通过</el-button>
                    <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n')">审核不通过</el-button>
                  </div>
                  <div v-if="scope.row.check_status==2">
                    <el-button size="mini" type="primary" disabled>审核通过</el-button>
                  </div>
                  <div v-if="scope.row.check_status==3">
                    <el-button size="mini" type="primary" disabled>审核不通过</el-button>
                    <el-button v-if="scope.row.check_status==3" size="mini" type="primary"
                               @click="checkReason(scope.row)">查看不通过原因
                    </el-button>
                  </div>
                </div>

                <div v-if="sell_invoice_enter==0&&sell_invoice_check==0">
                  <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                    <el-button v-if="scope.row.check_status==0" size="mini" type="primary" disabled>未提交审核</el-button>
                    <el-button v-if="scope.row.check_status==3" size="mini" type="primary" disabled>审核不通过</el-button>
                    <el-button v-if="scope.row.check_status==3" size="mini" type="primary" @click="checkReason(scope.row)">查看不通过原因</el-button>
                  </div>
                  <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                    <el-button size="mini" type="primary" disabled>正在审核</el-button>
                  </div>
                  <div v-if="scope.row.check_status==2">
                    <el-button size="mini" type="primary" disabled>审核通过</el-button>
                  </div>
                </div>

              </div>


              <!--拥有超级管理员权限时-->
              <div v-if="is_super==1">
                <!--有录入权限，在执行录入功能的时候，需要判断订单是不是别人录入的订单，录入人员无法编辑别人录入的订单-->
                <!--是自己录入的订单时-->
                <div v-if="userId==scope.row.create_user_id">
                  <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                    <el-button v-if="scope.row.check_status==0" size="mini" type="primary" disabled>未提交审核</el-button>
                    <el-button v-if="scope.row.check_status==3" size="mini" type="primary" disabled>审核不通过</el-button>
                    <el-button v-if="scope.row.check_status==3" size="mini" type="primary" @click="checkReason(scope.row)">查看不通过原因</el-button>
                    <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
                    <el-button size="mini" type="primary" @click="upCheck(scope.row)">提交审核</el-button>
                  </div>
                  <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                    <el-button size="mini" type="primary" disabled>正在审核</el-button>
                    <el-button size="mini" type="primary" @click="orderPassOrNot(scope.row,'y')">审核通过</el-button>
                    <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n')">审核不通过</el-button>
                  </div>
                  <div v-if="scope.row.check_status==2">
                    <el-button size="mini" type="primary" disabled>审核通过</el-button>
                  </div>
                </div>
                <div v-else>
                  <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                    <el-button v-if="scope.row.check_status==0" size="mini" type="primary" disabled>未提交审核</el-button>
                    <el-button v-if="scope.row.check_status==3" size="mini" type="primary" disabled>审核不通过</el-button>
                    <el-button v-if="scope.row.check_status==3" size="mini" type="primary" @click="checkReason(scope.row)">查看不通过原因</el-button>
                    <el-button size="mini" type="primary" disabled>编辑</el-button>
                    <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
                    <el-button size="mini" type="primary" disabled>提交审核</el-button>
                  </div>
                  <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                    <el-button size="mini" type="primary" disabled>正在审核</el-button>
                    <el-button size="mini" type="primary" @click="orderPassOrNot(scope.row,'y')">审核通过</el-button>
                    <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n')">审核不通过</el-button>
                  </div>
                  <div v-if="scope.row.check_status==2">
                    <el-button size="mini" type="primary" disabled>审核通过</el-button>

                  </div>
                </div>


              </div>
            </div>
            <!--订单审核未通过时不能添加，所以不用考虑编辑删除-->
            <!--     <div v-else>
                   <el-button size="mini" type="primary" disabled>编辑</el-button>
                   <el-button size="mini" type="danger" disabled>删除</el-button>
                 </div>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="detail-add-btn">
      <!--只有采购开票录入人员和订单状态是2时才可以增加收款单-->
      <div v-if="order_check_status==2&&sell_invoice_enter==1">
        <el-button type="primary" @click="add()" size="small">增加销售开票</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {delete_order_invoice,check_sell_order_invoice,submit_check_sell_order_invoice} from '../../../api/index'
  import config from '../../../api/config'
  import axios from 'axios'
/* axios.defaults.withCredentials = true;*/
  export default {
    props:{
      sellOrderId:''
    },
    created(){
      this.sell_invoice_enter=window.sessionStorage.getItem('sell_invoice_enter');
      this.sell_invoice_check=window.sessionStorage.getItem('sell_invoice_check');
      this.is_super=window.sessionStorage.getItem('is_super');
      this.super_lookover=window.sessionStorage.getItem('super_lookover');
      this.userId=window.sessionStorage.getItem('userId');
      this.getData();
    },
    data(){
      return {
        sell_enter:'',
        sell_check:'',
        is_super:'',
        super_lookover:'',
        order_check_status:'',
        userId:'',
        check_status:'',
        order_invoice_list:[]/*销售开票*/
      }
    },
    methods:{
      getData(){
        var _this=this;
        axios.get(config.get_order_detail+this.$route.params.sellOrderId).then(function (res) {
          /*订单审核状态*/
          _this.order_check_status=res.data.data.order[0].check_status;
          _this.order_invoice_list=res.data.data.order_invoice_list;
        }).catch(function (err) {
          console.log(err);
        })
      },
      orderDelete(row){
        var _this=this;
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delete_order_invoice({'token':window.sessionStorage.getItem('session'),'id':row.id}).then(function (res) {
            if(res.data.errcode==0){
              _this.$message({
                message: '删除成功',
                type: 'success'
              });
              _this.getData();
            }else{
              _this.$message({
                message: res.data.errdesc,
                type: 'warning'
              })
            }
          }).catch(function (err) {

          })
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      checkPc(row){},
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计';
            return;
          }
          const values = data.map(item => parseFloat(item[column.property]));
          if (values.every(value => !isNaN(value))) {
            if(index==4||index==5){
              sums[index] = values.reduce((prev, curr) => {
                const value = parseFloat(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              if(String(sums[index]).indexOf('.')>0){
                sums[index]=sums[index].toFixed(2);
              }

            }else{
              sums[index] = ''
            }
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      add(){
        this.$router.push({'name':'add_invoice_order',params:{'type':'add','sellOrderId':this.sellOrderId,'id':'add'}})
      },
      orderEdit(row){
        this.$router.push({'name':'add_invoice_order',params:{'type':'edit','sellOrderId':this.sellOrderId,'id':row.id}})
      },
      /*提交审核*/
      upCheck(row){
        var _this=this;
        submit_check_sell_order_invoice({'token':window.sessionStorage.getItem('session'),'id':row.id}).then(function (res) {
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
            })
          }
        }).catch(function (err) {
          console.log(err);
        })
      },
      checkReason(row){
        this.$alert(row.refuse_reason, '审核不通过原因');
      },
      orderPassOrNot(row,is_pass){
        var _this=this;
        var obj={};
        obj.token=window.sessionStorage.getItem('session');
        obj.id=row.id;
        obj.is_pass=is_pass;
        if(is_pass=='n'){
          this.$prompt('请输入不通过原因', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({ value }) => {
            obj.reason=value;
            _this.upPassOrNot(obj,obj.id);
          }).catch(() => {
            _this.$message('您已取消操作');
          });
        }else{
          obj.reason='';
          _this.upPassOrNot(obj,obj.id);

        }
      },
      /*审核通过不通过*/
      upPassOrNot(obj,id){
        var _this=this;
        check_sell_order_invoice(obj).then(function (res) {
          if(res.data.errcode==0){
            _this.$message({
              type: 'success',
              message: '提交成功'
            });
            location.reload();
          }else{
            _this.$message({
              message: res.data.errdesc,
              type: 'warning'
            })
          }
        }).catch(function (err) {
          console.log(err);
        })
      },
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
