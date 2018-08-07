<template>
  <div class="self-table" >
    <!--采购清单-->
    <h4>采购清单</h4>
    <div style="position: relative; margin-top:25px;">
      <div style="width:100%; overflow:auto;">
        <table style="" cellspacing="0" cellpadding="0" class="sell-detail-table" >
          <thead>
          <th style="width:100px;">#</th>
          <th>存货编号</th>
          <th style="min-width:200px;">存货名称</th>
          <th>存货批次</th>
          <th>存货分类编号</th>
          <th>存货分类</th>
          <th>存货地编号</th>
          <th>存货地</th>
          <th>规格型号</th>
          <th>数量</th>
          <th>单价</th>
          <th>税率%</th>
          <th>含税金额</th>
          <th>未含税金额</th>
          <th>单台返利</th>
          <th>返利总额</th>
          <th style="min-width:200px;">操作</th>
          <th style="min-width:200px;position:absolute;right:0 ;top:0;background:#fff;z-index: 100;box-shadow: -1px 0 3px rgba(235, 238, 245, 0.6);">操作</th>
          </thead>
          <tbody>
          <tr v-for="(item,index) in order_detail_list">
            <td>{{index+1}}</td>
            <td>{{item.chmc_num}}</td>
            <td>{{item.chmc_name}}</td>
            <td>{{item.order_in_batch}}</td>
            <td>{{item.chfl_num}}</td>
            <td>{{item.chfl_name}}</td>
            <td>{{item.chd_num}}</td>
            <td>{{item.chd_name}}</td>
            <td>{{item.unit}}</td>
            <td>{{item.number}}</td>
            <td>{{item.unit_price}}</td>
            <td>{{item.tax_rate}}</td>
            <td>{{item.total_price}}</td>
            <td>{{item.no_tax_price}}</td>
            <td>{{item.rebate}}</td>
            <td>{{item.total_rebate}}</td>
            <td style="min-width:200px;">
              <div>
                <!--采购清单-->
                <div  v-if="buy_enter==1&&(userId==item.create_user_id)&&(order_check_status==0||order_check_status==3)">
                  <el-button size="mini" type="primary" @click="orderEdit(item.id)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="orderDelete(item.id)">删除</el-button>
                </div>
                <div v-else>
                  <el-button size="mini" type="primary" disabled>编辑</el-button>
                  <el-button size="mini" type="danger" disabled>删除</el-button>
                </div>
              </div>
            </td>
            <td style="min-width:200px;position:absolute;right: 0; background:#fff;z-index: 100;box-shadow: -1px 0 3px rgba(235, 238, 245, 0.6);">
              <div>
                <!--采购清单-->
                <div  v-if="buy_enter==1&&(userId==item.create_user_id)&&(order_check_status==0||order_check_status==3)">
                  <el-button size="mini" type="primary" @click="orderEdit(item.id)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="orderDelete(item.id)">删除</el-button>
                </div>
                <div v-else>
                  <el-button size="mini" type="primary" disabled>编辑</el-button>
                  <el-button size="mini" type="danger" disabled>删除</el-button>
                </div>
              </div>
            </td>

          </tr>
          <tr class="discount">
            <td style="width:100px;">折扣折让</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td colspan="2">{{discount}}</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="total">
            <td style="width:100px;">总计</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{{number}}</td>
            <td></td>
            <td></td>
            <td>{{total_price}}</td>
            <td>{{no_tax_price}}</td>
            <td></td>
            <td>{{total_rebate}}</td>
            <td></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div>
    <!--<el-table :data="order_detail_list" max-height="450" border  style="width: 100%; margin-top: 20px" :summary-method="getSummaries"
              show-summary>
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="chmc_num" label="存货编号" width="115"></el-table-column>
      <el-table-column prop="chmc_name" label="存货名称" ></el-table-column>
      <el-table-column prop="order_in_batch" label="存货批次"></el-table-column>
      <el-table-column prop="chfl_num" label="存货分类编号" width="115"></el-table-column>
      <el-table-column prop="chfl_name" label="存货分类"></el-table-column>
      <el-table-column prop="chd_num" label="存货地编号" width="105"></el-table-column>
      <el-table-column prop="chd_name" label="存货地"></el-table-column>
      <el-table-column prop="unit" label="规格型号"></el-table-column>
      <el-table-column prop="number" label="数量"></el-table-column>
      <el-table-column prop="unit_price" label="单价"></el-table-column>
      <el-table-column prop="tax_rate" label="税率%"></el-table-column>
      <el-table-column prop="total_price" label="含税金额"></el-table-column>
      <el-table-column prop="no_tax_price" label="未含税金额" width="105"></el-table-column>
      <el-table-column prop="rebate" label="单台返利"></el-table-column>
      <el-table-column prop="total_rebate" label="返利总额"></el-table-column>

      <el-table-column label="操作" width="250px" class="cz-cell" style="text-align: left">

        <template slot-scope="scope">
          <div>
            &lt;!&ndash;采购清单&ndash;&gt;
            <div  v-if="buy_enter==1&&(userId==scope.row.create_user_id)&&(order_check_status==0||order_check_status==3)">
              <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
            </div>
            <div v-else>
              <el-button size="mini" type="primary" disabled>编辑</el-button>
              <el-button size="mini" type="danger" disabled>删除</el-button>
            </div>
          </div>

          &lt;!&ndash;二期入库分开时再做处理&ndash;&gt;
&lt;!&ndash;          <div v-if="buy_store==1">
            <el-button size="mini" type="success" @click="inStore(scope.row)" v-if="order_check_status==2">入库</el-button>
            <el-button size="mini" type="success" disabled v-else>订单未审核通过无法入库</el-button>
          </div>&ndash;&gt;


        </template>
      </el-table-column>
    </el-table>-->
</div>
    <div class="detail-add-btn" v-if="buy_enter==1&&(userId==order_create_user_id)&&(order_check_status==0||order_check_status==3)">
      <el-button type="primary" @click="add()" size="small">增加采购清单</el-button>
      <el-button type="primary" @click="addDiscount()" size="small">填写折扣折让金额</el-button>
    </div>
  </div>
</template>

<script>
  import {purchase_delete_order_detail,set_order_into_stores,fill_order_discount} from '../../../api/index'
  import config from '../../../api/config'
  import axios from 'axios'
/* axios.defaults.withCredentials = true;*/
  export default {
    props:{
      purchaseOrderId:''
    },
    created(){
      this.buy_enter=window.sessionStorage.getItem('buy_enter');
      this.buy_check=window.sessionStorage.getItem('buy_check');
      this.is_super=window.sessionStorage.getItem('is_super');
      this.buy_store=window.sessionStorage.getItem('buy_store');
      this.userId=window.sessionStorage.getItem('userId');
      this.getData();

    },
    data(){
      return {
        discount:'',
        number:0,
        total_price:0,
        no_tax_price:0,
        total_rebate:0,
        buy_enter:'',
        buy_check:'',
        is_super:'',
        buy_store:'',
        order_check_status:'',
        userId:'',
        create_user_id:'',
        order_create_user_id:'',
        order_detail_list:[],/*采购清单表格*/
      }
    },
    methods:{
      getData(){
        var _this=this;
        axios.get(config.get_purchase_order_detail+this.$route.params.purchaseOrderId).then(function (res) {
          /*订单审核状态*/
          _this.order_check_status=res.data.data.order[0].check_status;
          _this.order_create_user_id=res.data.data.order[0].create_user_id;
          _this.discount=res.data.data.order[0].discount_money;
          /*采购清单表格*/
          _this.order_detail_list=res.data.data.order_detail_list;
          _this.order_detail_list.forEach(function (item) {
            _this.number+=Number(item.number);
            _this.total_price+=Number(item.total_price);
            _this.no_tax_price+=Number(item.no_tax_price);
            _this.total_rebate+=Number(item.total_rebate);
          });
          _this.total_price=Number(_this.total_price)+Number(_this.discount);
          _this.no_tax_price=Number(_this.no_tax_price)+Number(_this.discount);
          _this.total_price=_this.total_price.toFixed(2);
          _this.no_tax_price=_this.no_tax_price.toFixed(2);
          _this.total_rebate=_this.total_rebate.toFixed(2);

        }).catch(function (err) {
          console.log(err);
        })
      },

      orderDelete(id){
        var _this=this;
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          purchase_delete_order_detail({'token':window.sessionStorage.getItem('session'),'id':id}).then(function (res) {
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
              if(index==9||index==12||index==13||index==15){
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
      orderEdit(id){
        this.$router.push({'name':'add_purchase_detail_order',params:{'type':'edit','purchaseOrderId':this.purchaseOrderId,'id':id}})
      },
      add(){
        this.$router.push({'name':'add_purchase_detail_order',params:{'type':'add','purchaseOrderId':this.purchaseOrderId,'id':'add'}})
      },
      /*二期分开入库的时候会用到*/
      inStore(id){
        var _this=this;
        var obj={};
        obj.token=window.sessionStorage.getItem('session');
        obj.id=id;
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
          }
        }).catch(function (err) {
          console.log(err);
        })
      },
      addDiscount(){
        var _this=this;
        this.$prompt('折扣折让金额', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue:_this.discount
        }).then(({ value }) => {

          var obj={};
          obj.token=window.sessionStorage.getItem('session');
          obj.id=_this.purchaseOrderId;
          obj.discount=value;
          fill_order_discount(obj).then(function (res) {
            console.log(res);
            if(res.data.errcode==0){
              location.reload();
            }else{
              _this.$message({
                type: 'warning',
                message: res.data.errdesc
              });
            }
          }).catch(function (err) {
            console.log(err);
          })


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
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
  .sell-detail-table th,  .sell-detail-table td{
    border:1px solid #ebeef5 ;
    padding-top:10px;
    padding-bottom: 10px;
    color:#909399;
    min-width:100px;
  }
  .sell-detail-table tr:nth-child(odd):hover {
    background-color:#f5f7fa;
  }
  .sell-detail-table {
    width:100%;
    font-size:14px;
    color:#909399;
    text-align: center;
    border-collapse: collapse;
  }
  .sell-detail-table .el-button{
    margin:5px;
  }
  .discount td, .total td{
    background-color:#f5f7fa;
  }

</style>
