<template>
  <div class="self-table">
    <!--采购订单-->
    <h4>采购订单</h4>
    <el-table :data="order" border style="width: 100%; margin-top: 20px">
      <el-table-column prop="in_num" label="订单编号">
      </el-table-column>
      <el-table-column prop="in_date" label="订单日期" width="175">
      </el-table-column>
      <el-table-column prop="s_num" label="供应商编号"  width="105">
      </el-table-column>
      <el-table-column prop="s_name" label="供应商名称" width="105">
      </el-table-column>
      <el-table-column prop="entity_num" label="采购主体编号" width="105">
      </el-table-column>
      <el-table-column prop="entity_name" label="采购主体" >
      </el-table-column>
      <el-table-column prop="total_money" label="采购总额">
      </el-table-column>

      <el-table-column label="付款状态" width="165">
        <template slot-scope="scope">
          <el-switch v-if="buy_pay_enter==1||buy_pay_check==1" v-model="params.pay_status" active-color="#13ce66" inactive-color="#ff4949"
                     active-text="已付款" inactive-text="未付款" active-value="1" inactive-value="0" @change="submitStateModify(scope.row,'pay_status')">
          </el-switch>
          <div v-else>
            <span v-if="scope.row.pay_status==0">未付款</span>
            <span v-if="scope.row.pay_status==1">已付款</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="开票状态" width="165">
        <template slot-scope="scope">
            <el-switch v-if="buy_invoice_enter==1||buy_invoice_check==1" v-model="params.invoice_status" active-color="#13ce66" inactive-color="#ff4949"
                       active-text="已开票" inactive-text="未开票" active-value="1" inactive-value="0" @change="submitStateModify(scope.row,'invoice_status')">
            </el-switch>
            <div v-else>
              <span v-if="scope.row.invoice_status==0">未开票</span>
              <span v-if="scope.row.invoice_status==1">已开票</span>
            </div>
        </template>
      </el-table-column>
      <el-table-column label="收货状态" width="165">
        <template slot-scope="scope">
          <el-switch v-if="buy_store==1&&scope.row.check_status==2&&scope.row.is_in_store==0" v-model="params.is_in_store" active-color="#13ce66" inactive-color="#ff4949"
                     active-text="已收货" inactive-text="未收货" active-value="1" inactive-value="0"  @change="inStore(scope.row)">
          </el-switch>
          <div v-else>
            <el-switch  v-model="params.is_in_store" active-color="#13ce66" inactive-color="#ff4949"
                       active-text="已收货" inactive-text="未收货" active-value="1" inactive-value="0" disabled>
            </el-switch>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="sell_user" label="采购员">
      </el-table-column>
      <el-table-column prop="business_user" label="商务专员">
      </el-table-column>
      <el-table-column prop="create_user_name" label="录入人员">
      </el-table-column>
      <el-table-column prop="check_user_name" label="审核人员">
      </el-table-column>
     <!-- <el-table-column prop="remarks" label="备注">
      </el-table-column>-->
      <el-table-column label="操作" width="200px" class="cz-cell" fixed="right" style="text-align: left">

        <template slot-scope="scope">
          <!--不是超级管理员的时候-->
          <div v-if="scope.row.is_super==0">
            <!--同时有采购录入删除权限和采购审核权限-->
            <div  v-if="scope.row.buy_enter==1&&scope.row.buy_check==1">
              <!--有录入权限，在执行录入功能的时候，需要判断订单是不是别人录入的订单，录入人员无法编辑别人录入的订单-->
              <!--是自己录入的订单时-->
              <div v-if="userId==create_user_id">
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
                  <!--<el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>-->
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

            <!--只有采购录入删除权限，没有采购审核权限-->
            <div  v-if="scope.row.buy_enter==1&&scope.row.buy_check==0">
              <!--有录入权限，在执行录入功能的时候，需要判断订单是不是别人录入的订单，录入人员无法编辑别人录入的订单-->
              <!--是自己录入的订单时-->
              <div v-if="userId==create_user_id">
                <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                  <el-button v-if="scope.row.check_status==3" size="mini" type="primary" disabled>审核不通过</el-button>
                  <el-button v-if="scope.row.check_status==3" size="mini" type="primary" @click="checkReason(scope.row)">查看不通过原因</el-button>
                  <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
                  <el-button size="mini" type="primary" @click="upCheck(scope.row)">提交审核</el-button>
                </div>
                <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                  <el-button size="mini" type="primary" disabled>正在审核</el-button>
                 <!-- <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>-->
                </div>
                <div v-if="scope.row.check_status==2">
                  <el-button size="mini" type="primary" disabled>审核通过</el-button>
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


            <!--没有采购录入删除权限，只有采购审核权限-->
            <div  v-if="scope.row.buy_enter==0&&scope.row.buy_check==1">
              <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                <el-button v-if="scope.row.check_status==0" size="mini" type="primary" disabled>未提交审核</el-button>
                <el-button v-if="scope.row.check_status==3" size="mini" type="primary" disabled>审核不通过</el-button>
                <el-button v-if="scope.row.check_status==3" size="mini" type="primary" @click="checkReason(scope.row)">查看不通过原因</el-button>
              </div>
              <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                <el-button size="mini" type="primary" @click="orderPassOrNot(scope.row,'y')">审核通过</el-button>
                <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n')">审核不通过</el-button>
              </div>
              <div v-if="scope.row.check_status==2">
                <el-button size="mini" type="primary" disabled>审核通过</el-button>
              </div>
            </div>
            <div v-if="scope.row.buy_enter==0&&scope.row.buy_check==0">
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
            <!--入库部分-->
           <!-- <div v-if="buy_store==1">
              <el-button size="mini" type="success" @click="inStore(scope.row)" v-if="scope.row.check_status==2&&scope.row.is_in_store==0">入库</el-button>
              <el-button size="mini" type="success"  v-if="scope.row.is_in_store==1">已入库</el-button>
              <el-button size="mini" type="success" disabled v-if="scope.row.check_status!=2">订单未审核通过无法入库</el-button>
            </div>-->
          </div>
         <!--拥有超级管理员权限时-->
          <div v-if="scope.row.is_super==1">
            <!--有录入权限，在执行录入功能的时候，需要判断订单是不是别人录入的订单，录入人员无法编辑别人录入的订单-->
            <!--是自己录入的订单时-->
            <div v-if="userId==create_user_id">
              <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                <el-button v-if="scope.row.check_status==0" size="mini" type="primary" disabled>未提交审核</el-button>
                <el-button v-if="scope.row.check_status==3" size="mini" type="primary" disabled>审核不通过</el-button>
                <el-button v-if="scope.row.check_status==3" size="mini" type="primary" @click="checkReason(scope.row)">查看不通过原因</el-button>
                <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
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
              <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
            </div>
            <div v-else>
              <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                <el-button v-if="scope.row.check_status==0" size="mini" type="primary" disabled>未提交审核</el-button>
                <el-button v-if="scope.row.check_status==3" size="mini" type="primary" disabled>审核不通过</el-button>
                <el-button v-if="scope.row.check_status==3" size="mini" type="primary" @click="checkReason(scope.row)">查看不通过原因</el-button>
                <el-button size="mini" type="primary" disabled>编辑</el-button>
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
              <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
            </div>
            <!--超级管理员也拥有采购入库权限-->
           <!-- <div>
              <el-button size="mini" type="success" @click="inStore(scope.row)" v-if="scope.row.check_status==2&&scope.row.is_in_store==0">入库</el-button>
                <el-button size="mini" type="success"  v-if="scope.row.is_in_store==1">已入库</el-button>
              <el-button size="mini" type="success" disabled v-if="scope.row.check_status!=2">订单未审核通过无法入库</el-button>
            </div>-->
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import config from '../../../api/config'
  import axios from 'axios'
  import {submit_purchase_check_order,purchase_delete_order,purchase_check_order,change_order_status,set_order_into_stores} from '../../../api/index'
  export default {
    props:{
      purchaseOrderId:''
    },
    created(){
      this.buy_enter=window.sessionStorage.getItem('buy_enter');
      this.buy_check=window.sessionStorage.getItem('buy_check');
      this.is_super=window.sessionStorage.getItem('is_super');
      this.params.token=window.sessionStorage.getItem('session');
      this.userId=window.sessionStorage.getItem('userId');
      this.super_lookover=window.sessionStorage.getItem('super_lookover');
      this.buy_store=window.sessionStorage.getItem('buy_store');
      this.buy_pay_enter=window.sessionStorage.getItem('buy_pay_enter');
      this.buy_pay_check=window.sessionStorage.getItem('buy_pay_check');
      this.buy_invoice_enter=window.sessionStorage.getItem('buy_invoice_enter');
      this.buy_invoice_check=window.sessionStorage.getItem('buy_invoice_check');
      this.getData();
    },
    data(){
      return {
        loading:false,
        dialogFormVisible:false,
        buy_enter:'',
        buy_check:'',
        is_super:'',
        userId:'',
        create_user_id:'',
        super_lookover:'',
        buy_store:'',
        buy_pay_enter:'',
        buy_pay_check:'',
        buy_invoice_enter:'',
        buy_invoice_check:'',
        order:[],/*采购订单表格*/
        params:{
          token:'',
          id:'',
          is_in_store:'0',
          invoice_status:'0',
          pay_status:'0'
        }
      }
    },
    methods:{
      /*获取订单详情*/
      getData(){
        var _this=this;
        _this.loading=true;
        axios.get(config.get_purchase_order_detail+this.$route.params.purchaseOrderId).then(function (res) {
          /*采购订单表格*/
          _this.order=res.data.data.order;
          _this.order[0].buy_enter=_this.buy_enter;
          _this.order[0].buy_check=_this.buy_check;
          _this.order[0].is_super=_this.is_super;
          _this.params.is_in_store=_this.order[0].is_in_store;
          _this.params.invoice_status=_this.order[0].invoice_status;
          _this.params.pay_status=_this.order[0].pay_status;
          _this.create_user_id=_this.order[0].create_user_id;
          _this.loading=false;
        }).catch(function (err) {
          console.log(err);
        })
      },
      /*编辑订单*/
      orderEdit(row){
        this.$router.push({'name':'add_purchase_order',params:{'type':'edit','id':row.id}});
      },
      /*删除订单*/
      orderDelete(row){
        var _this=this;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          purchase_delete_order({'token':window.sessionStorage.getItem('session'),'id':row.id}).then(function (res) {
            if(res.data.errcode==0){
              _this.$message({
                message: '删除成功',
                type: 'success'
              });
              _this.$router.push('/admin_view/purchasing_list');
            }else{
              if(res.data.errdesc=='采购订单有库存被占用, 无法删除'){
                var order='';
                res.data.data.forEach(function (item) {
                  order+=item.out_num+'，';
                });
                order = order.substring(0, order.lastIndexOf('，'));
                var message=res.data.errdesc+'\n'+'，占用订单编号为：'+order;
                _this.$message({
                  message: message,
                  type: 'warning'
                })

              }else{
                _this.$message({
                  message: res.data.errdesc,
                  type: 'warning'
                })
              }

            }
          }).catch(function (err) {
            console.log(err);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      /*订单通过不通过*/
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
        purchase_check_order(obj).then(function (res) {
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
      /*提交审核*/
      upCheck(row){
        var _this=this;
        submit_purchase_check_order({'token':window.sessionStorage.getItem('session'),'id':row.id}).then(function (res) {
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
      /*修改订单状态*/
      submitStateModify(row,type){
        var _this=this;
        var obj={};
        obj.token=window.sessionStorage.getItem('session');
        obj.id=row.id;
        obj.type=type;
        obj.value=_this.params[type];
        change_order_status(obj).then(function (res) {
          if(res.data.errcode==0){
            _this.$message({
              message: '修改成功',
              type: 'success'
            });
          /*  _this.dialogFormVisible=false;*/
            _this.getData();
          }else{
            this.$message({
              message: res.data.errdesc,
              type: 'warning'
            });
          }
        })
      },
      /*入库函数*/
      inStore(row){
        var _this=this;
        var obj={};
        obj.token=window.sessionStorage.getItem('session');
        obj.id=row.id;
        set_order_into_stores(obj).then(function (res) {
          if(res.data.errcode==0){
            _this.$message({
              message: '入库成功',
              type: 'success'
            });
          _this.getData();
          }else{
            _this.$message({
              message: res.data.errdesc,
              type: 'warning'
            })
            _this.getData();
          }
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
