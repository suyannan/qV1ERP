<template>
  <div class="self-table">
    <h4>付款单</h4>
    <div>
      <el-table :data="order_pay_list" max-height="450" border style="width: 100%; margin-top: 20px"
                :summary-method="getSummaries"
                show-summary>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="pay_date" label="付款日期"></el-table-column>
        <el-table-column prop="entity_name" label="付款公司名称" width="175"></el-table-column>
        <el-table-column prop="price" label="实际付款金额"></el-table-column>

        <el-table-column prop="rebate_price" label="使用返利"></el-table-column>
        <el-table-column prop="create_user_name" label="录入人员"></el-table-column>

        <el-table-column label="操作" width="200px" class="cz-cell" style="text-align: left" fixed="right">

          <template slot-scope="scope">
            <!--订单审核通过后可以添加付款单-->
            <div v-if="order_check_status==2">
              <!--不是超级管理员的时候-->
              <div v-if="is_super==0">

                <!--同时有付款单录入删除权限和付款单审核权限-->
                <div v-if="buy_pay_enter==1&&buy_pay_check==1">
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


                <!--只有付款单录入删除权限，没有付款单审核权限-->
                <div v-if="buy_pay_enter==1&&buy_pay_check==0">
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


                <!--没有付款单录入删除权限，只有付款单审核权限-->
                <div v-if="buy_pay_enter==0&&buy_pay_check==1">
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

                <div v-if="buy_pay_enter==0&&buy_pay_check==0">
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
      <!--只有付款单录入人员和订单状态是2时才可以增加付款单-->
      <div v-if="order_check_status==2&&buy_pay_enter==1">
          <el-button type="primary" @click="add()" size="small">增加付款单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {purchase_delete_order_pay,submit_check_order_pay,check_order_pay} from '../../../api/index'
  import config from '../../../api/config'
  import axios from 'axios'
  /* axios.defaults.withCredentials = true;*/
  export default {
    props: {
      purchaseOrderId: ''
    },
    created() {
      /*采购付款单录入权限*/
      this.buy_pay_enter = window.sessionStorage.getItem('buy_pay_enter');
      /*采购付款单审核权限*/
      this.buy_pay_check = window.sessionStorage.getItem('buy_pay_check');
      this.is_super = window.sessionStorage.getItem('is_super');
      this.userId = window.sessionStorage.getItem('userId');
      this.super_lookover=window.sessionStorage.getItem('super_lookover');
      this.getData();
    },
    data() {
      return {
        buy_pay_enter: '',
        buy_pay_check: '',
        is_super: '',
        order_check_status: '',
        userId: '',
        order_pay_list: []/*付款单*/
      }
    },
    methods: {
      getData() {
        var _this = this;
        axios.get(config.get_purchase_order_detail + this.$route.params.purchaseOrderId).then(function (res) {
          /*采购订单审核状态*/
          _this.order_check_status = res.data.data.order[0].check_status;
          /*付款单表格*/
          _this.order_pay_list = res.data.data.order_pay_list;
        }).catch(function (err) {
          console.log(err);
        })
      },

      orderDelete(row) {
        var _this = this;
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          purchase_delete_order_pay({
            'token': window.sessionStorage.getItem('session'),
            'id': row.id
          }).then(function (res) {
            if (res.data.errcode == 0) {
              _this.$message({
                message: '删除成功',
                type: 'success'
              });
              _this.getData();
            } else {
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
      checkPc(row) {
      },
      getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计';
            return;
          }
          const values = data.map(item => parseFloat(item[column.property]));
          if (values.every(value => !isNaN(value))) {
            if (index == 3) {
              sums[index] = values.reduce((prev, curr) => {
                const value = parseFloat(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              if (String(sums[index]).indexOf('.') > 0) {
                sums[index] = sums[index].toFixed(2);
              }

            } else {
              sums[index] = ''
            }
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      add() {
        this.$router.push({
          'name': 'add_purchase_pay_order',
          params: {'type': 'add', 'purchaseOrderId': this.purchaseOrderId, 'id': 'add'}
        })
      },
      orderEdit(row) {
        this.$router.push({
          'name': 'add_purchase_pay_order',
          params: {'type': 'edit', 'purchaseOrderId': this.purchaseOrderId, 'id': row.id}
        })
      },
      /*提交审核*/
      upCheck(row){
        var _this=this;
        submit_check_order_pay({'token':window.sessionStorage.getItem('session'),'id':row.id}).then(function (res) {
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
        check_order_pay(obj).then(function (res) {
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
  .cell button {
    margin: 5px;
  }

  .el-table div {
    display: inline-block;
  }
</style>
