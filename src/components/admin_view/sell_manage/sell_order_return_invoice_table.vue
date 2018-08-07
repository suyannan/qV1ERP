<template>
  <div class="self-table">
    <h4>退货开票</h4>
    <div>
      <el-table :data="order_return_invoice_list" max-height="450" border  style="width: 100%; margin-top: 20px" :summary-method="getSummaries"
                show-summary>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="invoice_num" label="发票号"></el-table-column>
        <el-table-column prop="invoice_date" label="开票日期" width="175"></el-table-column>
        <el-table-column prop="op_user" label="操作人"></el-table-column>
        <el-table-column prop="total_price" label="发票含税金额" width="120"></el-table-column>
        <el-table-column prop="tax_price" label="发票未含税金额" width="120"></el-table-column>
        <el-table-column prop="create_user_name" label="录入人员"></el-table-column>
        <el-table-column label="操作" width="200px" fixed="right" class="cz-cell" style="text-align: left">
<!--          <template slot-scope="scope">
            <div  v-if="scope.row.sell_enter==1">
              <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
            </div>
            <div v-else>
              <el-button size="mini" type="primary" disabled>编辑</el-button>
              <el-button size="mini" type="danger" disabled>删除</el-button>
            </div>
          </template>-->

          <template slot-scope="scope">

            <div v-if="is_super==0">
              <!--同时拥有退货单录入权限和退货单审核权限-->
              <div  v-if="sell_return_invoice_enter==1&&sell_return_invoice_check==1">

                <!--订单已通过审核，退货单可以提交审核-->
                <div v-if="order_check_status==2">

                  <!--有录入权限，在执行录入功能的时候，需要判断订单是不是别人录入的订单，录入人员无法编辑别人录入的订单-->
                  <!--是自己录入的订单时-->
                  <div v-if="userId==scope.row.create_user_id">

                    <!--退货单未提交审核0和审核被拒后3-->
                    <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                      <el-button size="mini" type="primary" disabled v-if="scope.row.check_status==0">未提交审核</el-button>
                      <el-button size="mini" type="primary" disabled  v-if="scope.row.check_status==3">审核不通过</el-button>
                      <el-button size="mini" type="primary" v-if="scope.row.check_status==3" @click="checkReason(scope.row.refuse_reason)">查看审核不通过原因</el-button>
                      <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                      <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
                      <el-button size="mini" type="danger" @click="submitCheck(scope.row)">提交审核</el-button>
                    </div>
                    <!--正在审核时-->
                    <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                      <el-button size="mini" type="primary" disabled>正在审核</el-button>
                      <el-button size="mini" type="primary" disabled>编辑</el-button>
                      <el-button size="mini" type="danger" disabled>删除</el-button>
                      <el-button size="mini" type="primary" @click="orderPassOrNot(scope.row,'y')">审核通过</el-button>
                      <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n')">审核不通过</el-button>
                    </div>
                    <!--退货单通过审核以后，不能编辑删除，只能和订单一起删除-->
                    <div v-if="scope.row.check_status==2">
                      <el-button size="mini" type="primary" disabled>审核通过</el-button>
                      <el-button size="mini" type="danger" disabled>删除</el-button>
                      <el-button size="mini" type="primary" disabled>编辑</el-button>

                    </div>

                  </div>
                  <!--不是自己录入的退款单无法进行编辑之类的操作-->
                  <div v-else>
                    <!--退货单未提交审核0和审核被拒后3-->
                    <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                      <el-button size="mini" type="primary" disabled v-if="scope.row.check_status==0">未提交审核</el-button>
                      <el-button size="mini" type="primary" disabled  v-if="scope.row.check_status==3">审核不通过</el-button>
                      <el-button size="mini" type="primary" v-if="scope.row.check_status==3" @click="checkReason(scope.row.refuse_reason)">查看审核不通过原因</el-button>
                      <el-button size="mini" type="primary" disabled>编辑</el-button>
                      <el-button size="mini" type="danger" disabled>删除</el-button>
                      <el-button size="mini" type="danger" disabled>提交审核</el-button>
                    </div>
                    <!--正在审核时-->
                    <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                      <el-button size="mini" type="primary" disabled>正在审核</el-button>
                      <el-button size="mini" type="primary" disabled>编辑</el-button>
                      <el-button size="mini" type="danger" disabled>删除</el-button>
                      <el-button size="mini" type="primary" @click="orderPassOrNot(scope.row,'y')">审核通过</el-button>
                      <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n')">审核不通过</el-button>
                    </div>
                    <!--退货单通过审核以后，不能编辑删除，只能和订单一起删除-->
                    <div v-if="scope.row.check_status==2">
                      <el-button size="mini" type="primary" disabled>审核通过</el-button>
                      <el-button size="mini" type="danger" disabled>删除</el-button>
                      <el-button size="mini" type="primary" disabled>编辑</el-button>

                    </div>
                  </div>





                </div>

                <!--注释后订单审核通过前不能编辑，订单审核通过后才可以添加退货单-->
                <!--订单未通过审核，此时不能提交退货单审核，只能编辑-->
                <!--                <div v-else>
                                  <el-button size="mini" type="primary" disabled>未提交审核</el-button>
                                  <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                                  <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
                                </div>-->

              </div>



              <!--只有退货单录入权限，没有退货单审核权限-->
              <div  v-if="sell_return_invoice_enter==1&&sell_return_invoice_check==0">
                <!--订单已通过审核，退货单可以提交审核-->
                <div v-if="order_check_status==2">


                  <!--有录入权限，在执行录入功能的时候，需要判断订单是不是别人录入的订单，录入人员无法编辑别人录入的订单-->
                  <!--是自己录入的订单时-->
                  <div v-if="userId==scope.row.create_user_id">
                    <!--退货单未提交审核0-->
                    <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                      <el-button size="mini" type="primary" disabled  v-if="scope.row.check_status==3">审核不通过</el-button>
                      <el-button size="mini" type="primary" v-if="scope.row.check_status==3"  @click="checkReason(scope.row.refuse_reason)">查看审核不通过原因</el-button>
                      <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                      <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
                      <el-button size="mini" type="danger" @click="submitCheck(scope.row)">提交审核</el-button>
                    </div>
                    <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                      <el-button size="mini" type="primary" disabled>正在审核</el-button>
                      <el-button size="mini" type="primary" disabled>编辑</el-button>
                      <el-button size="mini" type="danger" disabled>删除</el-button>
                    </div>
                    <!--退货单通过审核以后，不能编辑删除，只能和订单一起删除-->
                    <div v-if="scope.row.check_status==2">
                      <el-button size="mini" type="primary" disabled>审核通过</el-button>
                      <el-button size="mini" type="danger" disabled>删除</el-button>
                      <el-button size="mini" type="primary" disabled>编辑</el-button>
                    </div>

                  </div>
                  <div v-else>

                    <!--退货单未提交审核0-->
                    <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                      <el-button size="mini" type="primary" disabled  v-if="scope.row.check_status==3">审核不通过</el-button>
                      <el-button size="mini" type="primary" v-if="scope.row.check_status==3"  @click="checkReason(scope.row.refuse_reason)">查看审核不通过原因</el-button>
                      <el-button size="mini" type="primary" disabled>编辑</el-button>
                      <el-button size="mini" type="danger" disabled>删除</el-button>
                      <el-button size="mini" type="danger" disabled>提交审核</el-button>
                    </div>
                    <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                      <el-button size="mini" type="primary" disabled>正在审核</el-button>
                      <el-button size="mini" type="primary" disabled>编辑</el-button>
                      <el-button size="mini" type="danger" disabled>删除</el-button>
                    </div>
                    <!--退货单通过审核以后，不能编辑删除，只能和订单一起删除-->
                    <div v-if="scope.row.check_status==2">
                      <el-button size="mini" type="primary" disabled>审核通过</el-button>
                      <el-button size="mini" type="danger" disabled>删除</el-button>
                      <el-button size="mini" type="primary" disabled>编辑</el-button>
                    </div>
                  </div>



                </div>


                <!--订单未通过审核，此时不能提交退货单审核，只能编辑-->
                <!--                <div v-else>
                                  <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                                  <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
                                </div>-->
              </div>

              <!--没有退货单录入权限，只有退货单审核权限-->
              <div  v-if="sell_return_invoice_enter==0&&sell_return_invoice_check==1">
                <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                  <el-button size="mini" type="primary" disabled  v-if="scope.row.check_status==0">未提交审核</el-button>
                  <el-button size="mini" type="primary" disabled  v-if="scope.row.check_status==3">审核不通过</el-button>
                  <el-button size="mini" type="primary" v-if="scope.row.check_status==3"  @click="checkReason(scope.row.refuse_reason)">查看审核不通过原因</el-button>
                </div>
                <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                  <el-button size="mini" type="primary" @click="orderPassOrNot(scope.row,'y')">审核通过</el-button>
                  <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n')">审核不通过</el-button>
                </div>
                <div v-if="scope.row.check_status==2">
                  <el-button size="mini" type="primary" disabled>审核通过</el-button>

                </div>

              </div>

              <!--录入和审核权限都没有-->
              <div  v-if="sell_return_invoice_enter==0&&sell_return_invoice_check==0">
          <!--      <el-button size="mini" type="primary" disabled>没有操作权限</el-button>-->
                <!--退货单未提交审核0-->
                <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                  <el-button size="mini" type="primary" disabled  v-if="scope.row.check_status==3">审核不通过</el-button>
                  <el-button size="mini" type="primary" v-if="scope.row.check_status==3"  @click="checkReason(scope.row.refuse_reason)">查看审核不通过原因</el-button>
                  <el-button size="mini" type="primary" disabled>编辑</el-button>
                  <el-button size="mini" type="danger" disabled>删除</el-button>
                  <el-button size="mini" type="danger" disabled>提交审核</el-button>
                </div>
                <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                  <el-button size="mini" type="primary" disabled>正在审核</el-button>
                  <el-button size="mini" type="primary" disabled>编辑</el-button>
                  <el-button size="mini" type="danger" disabled>删除</el-button>
                </div>
                <!--退货单通过审核以后，不能编辑删除，只能和订单一起删除-->
                <div v-if="scope.row.check_status==2">
                  <el-button size="mini" type="primary" disabled>审核通过</el-button>
                  <el-button size="mini" type="danger" disabled>删除</el-button>
                  <el-button size="mini" type="primary" disabled>编辑</el-button>
                </div>
              </div>


            </div>


            <!--拥有超级管理员的权限-->
            <div v-if="is_super==1">

              <!--订单已通过审核，退货单可以提交审核-->
              <div v-if="order_check_status==2">

                <!--有录入权限，在执行录入功能的时候，需要判断订单是不是别人录入的订单，录入人员无法编辑别人录入的订单-->
                <!--是自己录入的订单时-->
                <div v-if="userId==scope.row.create_user_id">
                  <!--退货单未提交审核0-->
                  <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                    <el-button size="mini" type="primary" disabled v-if="scope.row.check_status==0">未提交审核</el-button>
                    <el-button size="mini" type="primary" disabled  v-if="scope.row.check_status==3">审核不通过</el-button>
                    <el-button size="mini" type="primary" v-if="scope.row.check_status==3"  @click="checkReason(scope.row.refuse_reason)">查看审核不通过原因</el-button>
                    <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
                    <el-button size="mini" type="danger" @click="submitCheck(scope.row)">提交审核</el-button>
                  </div>
                  <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                    <el-button size="mini" type="primary" disabled>正在审核</el-button>
                    <el-button size="mini" type="primary" disabled>编辑</el-button>
                    <el-button size="mini" type="primary" @click="orderPassOrNot(scope.row,'y')">审核通过</el-button>
                    <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n')">审核不通过</el-button>
                  </div>
                  <!--退货单通过审核以后，不能编辑删除，只能和订单一起删除-->
                  <div v-if="scope.row.check_status==2">
                    <el-button size="mini" type="primary" disabled>审核通过</el-button>
                    <el-button size="mini" type="primary" disabled>编辑</el-button>
                  </div>

                </div>
                <!--不是自己录入的订单-->
                <div v-else>
                  <!--退货单未提交审核0-->
                  <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                    <el-button size="mini" type="primary" disabled v-if="scope.row.check_status==0">未提交审核</el-button>
                    <el-button size="mini" type="primary" disabled  v-if="scope.row.check_status==3">审核不通过</el-button>
                    <el-button size="mini" type="primary" v-if="scope.row.check_status==3"  @click="checkReason(scope.row.refuse_reason)">查看审核不通过原因</el-button>
                    <el-button size="mini" type="primary" disabled>编辑</el-button>
                    <el-button size="mini" type="danger" disabled>提交审核</el-button>
                    <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
                  </div>
                  <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                    <el-button size="mini" type="primary" disabled>正在审核</el-button>
                    <el-button size="mini" type="primary" disabled>编辑</el-button>
                    <el-button size="mini" type="primary" @click="orderPassOrNot(scope.row,'y')">审核通过</el-button>
                    <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n')">审核不通过</el-button>
                  </div>
                  <!--退货单通过审核以后，不能编辑删除，只能和订单一起删除-->
                  <div v-if="scope.row.check_status==2">
                    <el-button size="mini" type="primary" disabled>审核通过</el-button>
                    <el-button size="mini" type="primary" disabled>编辑</el-button>
                  </div>
                </div>


              </div>
              <!--订单未通过审核，此时不能提交退货单审核，只能编辑-->
              <!--              <div v-else>
                              <el-button size="mini" type="primary" disabled>未提交审核</el-button>
                              <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                            </div>-->



            </div>


          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="detail-add-btn" v-if="sell_return_invoice_enter==1&&is_out_store==1">
      <el-button type="primary" @click="add()" size="small">增加退货开票</el-button>
    </div>
  </div>
</template>

<script>
  import {delete_order_return_invoice,submit_check_order_return_invoice,check_order_return_invoice} from '../../../api/index'
  import config from '../../../api/config'
  import axios from 'axios'
/* axios.defaults.withCredentials = true;*/
  export default {
    props:{
      sellOrderId:''
    },
    created(){
      this.sell_return_invoice_enter=window.sessionStorage.getItem('sell_return_invoice_enter');
      this.sell_return_invoice_check=window.sessionStorage.getItem('sell_return_invoice_check');
      this.is_super=window.sessionStorage.getItem('is_super');
      this.userId=window.sessionStorage.getItem('userId');
      this.getData();
    },
    data(){
      return {
        sell_return_invoice_enter:'',
        sell_return_invoice_check:'',
        is_super:'',
        order_check_status:'',
        userId:'',
        is_out_store:'',
        order_return_invoice_list:[]/*销售开票*/
      }
    },
    methods:{
      getData(){
        var _this=this;
        axios.get(config.get_order_detail+this.$route.params.sellOrderId).then(function (res) {
          /*订单审核状态*/
          _this.order_check_status=res.data.data.order[0].check_status;
          /*是否出库*/
          _this.is_out_store=res.data.data.order[0].is_out_store;
          /*退款开票表格*/
          _this.order_return_invoice_list=res.data.data.order_return_invoice_list;
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
          delete_order_return_invoice({'token':window.sessionStorage.getItem('session'),'id':row.id}).then(function (res) {
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
              });
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
        this.$router.push({'name':'add_return_invoice_order',params:{'type':'add','sellOrderId':this.sellOrderId,'id':'add'}})
      },
      orderEdit(row){
        this.$router.push({'name':'add_return_invoice_order',params:{'type':'edit','sellOrderId':this.sellOrderId,'id':row.id}})
      },
      submitCheck(row){
        var obj={};
        var _this=this;
        obj.token=window.sessionStorage.getItem('session');
        obj.id=row.id;
        submit_check_order_return_invoice(obj).then(function (res) {

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
            _this.$message({
              type: 'info',
              message: '已取消审核'
            });
          });
        }else{
          obj.reason='';
          _this.upPassOrNot(obj,obj.id);
        }
      },
      /*审核通过不通过*/
      upPassOrNot(obj,id){
        var _this=this;
        check_order_return_invoice(obj).then(function (res) {

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
      checkReason(reason){
        this.$alert(reason, '审核不通过原因');
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
