<template>
  <div class="self-table">
    <h4>退货单</h4>
    <div>
      <el-table :data="order_return_list" max-height="450" border  style="width: 100%; margin-top: 20px" :summary-method="getSummaries"
                show-summary>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="return_num" label="退货单编号" width="120"></el-table-column>
        <el-table-column prop="chmc_num" label="存货编号"></el-table-column>
        <el-table-column prop="chmc_name" label="存货名称"  width="120"></el-table-column>
        <el-table-column prop="chd_num" label="存货地编号"  width="120"></el-table-column>
        <el-table-column prop="chd_name" label="存货地"></el-table-column>
        <el-table-column prop="return_date" label="退货日期" width="175"></el-table-column>
        <el-table-column prop="number" label="退货数量"></el-table-column>
        <el-table-column prop="unit_price" label="退货单价"></el-table-column>
        <el-table-column prop="total_price" label="退货总金额"  width="150"></el-table-column>
        <el-table-column prop="create_user_name" label="录入人员"></el-table-column>
        <el-table-column label="操作" width="200px" fixed="right" class="cz-cell" style="text-align: left">
          <template slot-scope="scope">
            <!--修改前-->
           <!-- 1. 销售退货单在销售订单未提交审核0, 正在审核1,4, 已通过审核2时都可新建和编辑. 如果销售清单对应的数量小于退货单中的数量, 返回错误状态.
            2. 销售订单通过审核后, 销售退货单才可提交审核和通过审核. 否则接口返回错误状态.
            3. 销售退货单通过审核后, 不可编辑, 删除.  只能和销售订单一起被删除.-->


            <!--现在改为在出库以后才能添加-->
            <!--不是超级管理员时-->
            <div v-if="is_super==0">
              <!--同时拥有退货单录入权限和退货单审核权限-->
              <div  v-if="sell_return_enter==1&&sell_return_check==1">

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
                      <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>
                      <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                      <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
                      <el-button size="mini" type="danger" @click="submitCheck(scope.row)">提交审核</el-button>
                    </div>
                    <!--正在审核时-->
                    <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                      <el-button size="mini" type="primary" disabled>正在审核</el-button>
                      <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>
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
                      <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>

                    </div>

                  </div>
                  <!--不是自己录入的退款单无法进行编辑之类的操作-->
                  <div v-else>
                    <!--退货单未提交审核0和审核被拒后3-->
                    <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                      <el-button size="mini" type="primary" disabled v-if="scope.row.check_status==0">未提交审核</el-button>
                      <el-button size="mini" type="primary" disabled  v-if="scope.row.check_status==3">审核不通过</el-button>
                      <el-button size="mini" type="primary" v-if="scope.row.check_status==3" @click="checkReason(scope.row.refuse_reason)">查看审核不通过原因</el-button>
                      <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>
                      <el-button size="mini" type="primary" disabled>编辑</el-button>
                      <el-button size="mini" type="danger" disabled>删除</el-button>
                      <el-button size="mini" type="danger" disabled>提交审核</el-button>
                    </div>
                    <!--正在审核时-->
                    <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                      <el-button size="mini" type="primary" disabled>正在审核</el-button>
                      <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>
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
                      <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>

                    </div>
                  </div>





                </div>

                <!--注释后订单审核通过前不能编辑，订单审核通过后才可以添加退货单-->
                <!--订单未通过审核，此时不能提交退货单审核，只能编辑-->
<!--                <div v-else>
                  <el-button size="mini" type="primary" disabled>未提交审核</el-button>
                  <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>
                  <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
                </div>-->

              </div>



              <!--只有退货单录入权限，没有退货单审核权限-->
              <div  v-if="sell_return_enter==1&&sell_return_check==0">

                <!--订单已通过审核，退货单可以提交审核-->
                <div v-if="order_check_status==2">


                  <!--有录入权限，在执行录入功能的时候，需要判断订单是不是别人录入的订单，录入人员无法编辑别人录入的订单-->
                  <!--是自己录入的订单时-->
                  <div v-if="userId==scope.row.create_user_id">
                    <!--退货单未提交审核0-->
                    <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                      <el-button size="mini" type="primary" disabled  v-if="scope.row.check_status==3">审核不通过</el-button>
                      <el-button size="mini" type="primary" v-if="scope.row.check_status==3"  @click="checkReason(scope.row.refuse_reason)">查看审核不通过原因</el-button>
                      <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>
                      <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                      <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
                      <el-button size="mini" type="danger" @click="submitCheck(scope.row)">提交审核</el-button>
                    </div>
                    <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                      <el-button size="mini" type="primary" disabled>正在审核</el-button>
                      <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>
                      <el-button size="mini" type="primary" disabled>编辑</el-button>
                      <el-button size="mini" type="danger" disabled>删除</el-button>
                    </div>
                    <!--退货单通过审核以后，不能编辑删除，只能和订单一起删除-->
                    <div v-if="scope.row.check_status==2">
                      <el-button size="mini" type="primary" disabled>审核通过</el-button>
                      <el-button size="mini" type="danger" disabled>删除</el-button>
                      <el-button size="mini" type="primary" disabled>编辑</el-button>
                      <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>
                    </div>

                  </div>
                  <div v-else>

                    <!--退货单未提交审核0-->
                    <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                      <el-button size="mini" type="primary" disabled  v-if="scope.row.check_status==3">审核不通过</el-button>
                      <el-button size="mini" type="primary" v-if="scope.row.check_status==3"  @click="checkReason(scope.row.refuse_reason)">查看审核不通过原因</el-button>
                      <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>
                      <el-button size="mini" type="primary" disabled>编辑</el-button>
                      <el-button size="mini" type="danger" disabled>删除</el-button>
                      <el-button size="mini" type="danger" disabled>提交审核</el-button>
                    </div>
                    <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                      <el-button size="mini" type="primary" disabled>正在审核</el-button>
                      <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>
                      <el-button size="mini" type="primary" disabled>编辑</el-button>
                      <el-button size="mini" type="danger" disabled>删除</el-button>
                    </div>
                    <!--退货单通过审核以后，不能编辑删除，只能和订单一起删除-->
                    <div v-if="scope.row.check_status==2">
                      <el-button size="mini" type="primary" disabled>审核通过</el-button>
                      <el-button size="mini" type="danger" disabled>删除</el-button>
                      <el-button size="mini" type="primary" disabled>编辑</el-button>
                      <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>
                    </div>
                  </div>



                </div>


                <!--订单未通过审核，此时不能提交退货单审核，只能编辑-->
<!--                <div v-else>
                  <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>
                  <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
                </div>-->
              </div>

              <!--没有退货单录入权限，只有退货单审核权限-->
              <div  v-if="sell_return_enter==0&&sell_return_check==1">
                <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                  <el-button size="mini" type="primary" disabled  v-if="scope.row.check_status==0">未提交审核</el-button>
                  <el-button size="mini" type="primary" disabled  v-if="scope.row.check_status==3">审核不通过</el-button>
                  <el-button size="mini" type="primary" v-if="scope.row.check_status==3"  @click="checkReason(scope.row.refuse_reason)">查看审核不通过原因</el-button>
                  <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>
                </div>
                <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                  <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>
                  <el-button size="mini" type="primary" @click="orderPassOrNot(scope.row,'y')">审核通过</el-button>
                  <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n')">审核不通过</el-button>
                </div>
                <div v-if="scope.row.check_status==2">
                  <el-button size="mini" type="primary" disabled>审核通过</el-button>
                  <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>

                </div>

              </div>

              <!--录入和审核权限都没有-->
              <div  v-if="sell_return_enter==0&&sell_return_check==0">
         <!--       <el-button size="mini" type="primary" disabled>没有操作权限</el-button>-->
                <!--退货单未提交审核0-->
                <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                  <el-button size="mini" type="primary" disabled  v-if="scope.row.check_status==3">审核不通过</el-button>
                  <el-button size="mini" type="primary" v-if="scope.row.check_status==3"  @click="checkReason(scope.row.refuse_reason)">查看审核不通过原因</el-button>
                  <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>
                  <el-button size="mini" type="primary" disabled>编辑</el-button>
                  <el-button size="mini" type="danger" disabled>删除</el-button>
                  <el-button size="mini" type="danger" disabled>提交审核</el-button>
                </div>
                <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                  <el-button size="mini" type="primary" disabled>正在审核</el-button>
                  <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>
                  <el-button size="mini" type="primary" disabled>编辑</el-button>
                  <el-button size="mini" type="danger" disabled>删除</el-button>
                </div>
                <!--退货单通过审核以后，不能编辑删除，只能和订单一起删除-->
                <div v-if="scope.row.check_status==2">
                  <el-button size="mini" type="primary" disabled>审核通过</el-button>
                  <el-button size="mini" type="danger" disabled>删除</el-button>
                  <el-button size="mini" type="primary" disabled>编辑</el-button>
                  <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>
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
                    <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>
                    <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
                    <el-button size="mini" type="danger" @click="submitCheck(scope.row)">提交审核</el-button>
                  </div>
                  <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                    <el-button size="mini" type="primary" disabled>正在审核</el-button>
                    <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>
                    <el-button size="mini" type="primary" disabled>编辑</el-button>
                    <el-button size="mini" type="primary" @click="orderPassOrNot(scope.row,'y')">审核通过</el-button>
                    <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n')">审核不通过</el-button>
                  </div>
                  <!--退货单通过审核以后，不能编辑删除，只能和订单一起删除-->
                  <div v-if="scope.row.check_status==2">
                    <el-button size="mini" type="primary" disabled>审核通过</el-button>
                    <el-button size="mini" type="primary" disabled>编辑</el-button>
                    <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>
                  </div>

                </div>
                <!--不是自己录入的订单-->
                <div v-else>
                  <!--退货单未提交审核0-->
                  <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                    <el-button size="mini" type="primary" disabled v-if="scope.row.check_status==0">未提交审核</el-button>
                    <el-button size="mini" type="primary" disabled  v-if="scope.row.check_status==3">审核不通过</el-button>
                    <el-button size="mini" type="primary" v-if="scope.row.check_status==3"  @click="checkReason(scope.row.refuse_reason)">查看审核不通过原因</el-button>
                    <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>
                    <el-button size="mini" type="primary" disabled>编辑</el-button>
                    <el-button size="mini" type="danger" disabled>提交审核</el-button>
                    <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
                  </div>
                  <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                    <el-button size="mini" type="primary" disabled>正在审核</el-button>
                    <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>
                    <el-button size="mini" type="primary" disabled>编辑</el-button>
                    <el-button size="mini" type="primary" @click="orderPassOrNot(scope.row,'y')">审核通过</el-button>
                    <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n')">审核不通过</el-button>
                  </div>
                  <!--退货单通过审核以后，不能编辑删除，只能和订单一起删除-->
                  <div v-if="scope.row.check_status==2">
                    <el-button size="mini" type="primary" disabled>审核通过</el-button>
                    <el-button size="mini" type="primary" disabled>编辑</el-button>
                    <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>
                  </div>
                </div>


              </div>
              <!--订单未通过审核，此时不能提交退货单审核，只能编辑-->
<!--              <div v-else>
                <el-button size="mini" type="primary" disabled>未提交审核</el-button>
                <el-button size="mini" type="primary" @click="checkPc(scope.row)">查看批次</el-button>
                <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
              </div>-->



            </div>


          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--只有拥有退款单录入权限的人员，在订单出库以后才可以增加退货单-->
    <div class="detail-add-btn" v-if="sell_return_enter==1&&is_out_store==1">
      <el-button type="primary" @click="add()" size="small">增加退货单</el-button>
    </div>
  </div>
</template>

<script>
  import {delete_order_return,submit_check_order_return,check_order_return} from '../../../api/index'
  import config from '../../../api/config'
  import axios from 'axios'
/* axios.defaults.withCredentials = true;*/
  export default {
    props:{
      sellOrderId:''
    },
    created(){
      this.sell_return_enter=window.sessionStorage.getItem('sell_return_enter');
      this.sell_return_check=window.sessionStorage.getItem('sell_return_check');
      this.is_super=window.sessionStorage.getItem('is_super');
      this.userId=window.sessionStorage.getItem('userId');

      this.getData();
    },
    data(){
      return {
        sell_return_enter:'',
        sell_return_check:'',
        is_super:'',
        is_out_store:'',
        userId:'',
        order_check_status:'',
        order_return_list:[]/*退货单*/
      }
    },
    methods:{
      getData(){
        var _this=this;
        axios.get(config.get_order_detail+this.$route.params.sellOrderId).then(function (res) {
          /*销售订单的审核状态*/
          _this.order_check_status=res.data.data.order[0].check_status;
          /*是否出库*/
          _this.is_out_store=res.data.data.order[0].is_out_store;
          /*退款单表格*/
          _this.order_return_list=res.data.data.order_return_list;
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
          delete_order_return({'token':window.sessionStorage.getItem('session'),'id':row.id}).then(function (res) {
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
      checkPc(row){

        this.$router.push({'name':'sell_return_table_pc',params:{'id':row.id}})
      },
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
            if(index==7||index==9){
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
        this.$router.push({'name':'add_return_order',params:{'type':'add','sellOrderId':this.sellOrderId,'id':'add'}})
      },
      orderEdit(row){
        this.$router.push({'name':'add_return_order',params:{'type':'edit','sellOrderId':this.sellOrderId,'id':row.id}})
      },
      submitCheck(row){
        var obj={};
        var _this=this;
        obj.token=window.sessionStorage.getItem('session');
        obj.id=row.id;
        submit_check_order_return(obj).then(function (res) {

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
        check_order_return(obj).then(function (res) {
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
