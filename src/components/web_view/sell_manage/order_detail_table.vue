<template>
  <div class="self-table">
    <!--采购清单-->
    <h4>采购清单</h4>
    <!--<div>-->
      <!--<el-table :data="order_detail_list" border  style="width: 100%; margin-top: 20px" :summary-method="getSummaries"-->
                <!--show-summary>-->
        <!--<el-table-column type="index" width="50">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="chmc_num" label="存货编号" width="105"></el-table-column>-->
        <!--<el-table-column prop="chmc_name" label="存货名称" width="175"></el-table-column>-->
        <!--<el-table-column prop="chfl_num" label="存货分类编号" width="105"></el-table-column>-->
        <!--<el-table-column prop="chfl_name" label="存货分类"></el-table-column>-->
        <!--<el-table-column prop="chd_num" label="存货地编号" width="105"></el-table-column>-->
        <!--<el-table-column prop="chd_name" label="存货地"></el-table-column>-->
        <!--<el-table-column prop="unit" label="规格型号"></el-table-column>-->
        <!--<el-table-column prop="number" label="数量"></el-table-column>-->
        <!--<el-table-column prop="unit_price" label="单价"></el-table-column>-->
        <!--<el-table-column prop="total_price" label="含税金额"></el-table-column>-->
        <!--<el-table-column label="操作" width="250px" class="cz-cell" style="text-align: left">-->

          <!--<template slot-scope="scope">-->
            <!--<div  v-if="scope.row.check_status==0||scope.row.check_status==13">-->
              <!--<el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>-->
              <!--<el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>-->
            <!--</div>-->
            <!--<div v-else>-->
              <!--<el-button size="mini" type="primary" disabled>编辑</el-button>-->
              <!--<el-button size="mini" type="danger" disabled>删除</el-button>-->
            <!--</div>-->
          <!--</template>-->
        <!--</el-table-column>-->
      <!--</el-table>-->
    <!--</div>-->
    <div class="tab-re" style="position: relative; margin-top:25px;">
      <div style="width:100%;  overflow:auto;">
        <table cellspacing="0" cellpadding="0" class="sell-detail-table">
          <thead>
          <th style="width:100px;">#</th>
          <th>存货名称编号</th>
          <th style="min-width:200px;">存货名称</th>
          <th>存货分类编号</th>
          <th>存货分类</th>
          <th>存货地编号</th>
          <th>存货地</th>
          <th>规格型号</th>
          <th>数量</th>
          <th>单价</th>
          <th>含税金额</th>
          <th style="min-width:200px;">操作</th>
          <th style="min-width:200px;position:absolute;right:0 ;top:0;background:#fff;z-index: 100;box-shadow: -1px 0 3px rgba(235, 238, 245, 0.6);">操作</th>
          </thead>
          <tbody>
          <tr v-for="(item,index) in order_detail_list">
            <td>{{index+1}}</td>
            <td>{{item.chmc_num}}</td>
            <td>{{item.chmc_name}}</td>
            <td>{{item.chfl_num}}</td>
            <td>{{item.chfl_name}}</td>
            <td>{{item.chd_num}}</td>
            <td>{{item.chd_name}}</td>
            <td>{{item.unit}}</td>
            <td>{{item.number}}</td>
            <td>{{item.unit_price}}</td>
            <td>{{item.total_price}}</td>
            <td style="width:200px;">
              <div  v-if="item.check_status==0||item.check_status==13">
              <el-button size="mini" type="primary" @click="orderEdit(item.id)">编辑</el-button>
              <el-button size="mini" type="danger" @click="orderDelete(item.id)">删除</el-button>
              </div>
              <div v-else>
              <el-button size="mini" type="primary" disabled>编辑</el-button>
              <el-button size="mini" type="danger" disabled>删除</el-button>
              </div>
            </td>
            <td style="min-width:200px;position:absolute;right: 0; background:#fff;z-index: 100;box-shadow: -1px 0 3px rgba(235, 238, 245, 0.6);">
              <div  v-if="item.check_status==0||item.check_status==13">
                <el-button size="mini" type="primary" @click="orderEdit(item.id)">编辑</el-button>
                <el-button size="mini" type="danger" @click="orderDelete(item.id)">删除</el-button>
              </div>
              <div v-else>
                <el-button size="mini" type="primary" disabled>编辑</el-button>
                <el-button size="mini" type="danger" disabled>删除</el-button>
              </div>
            </td>

          </tr>
          <tr  class="discount">
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
            <td>{{discount}}</td>
            <td></td>
          </tr>
          <tr  class="total">
            <td style="width:100px;">总计</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{{number}}</td>
            <td></td>
            <td>{{total_price}}</td>
            <td></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="detail-add-btn" v-if="check_status==0||check_status==13">
      <el-button type="primary" @click="add()">增加采购清单</el-button>
      <el-button type="primary" @click="addDiscount()">填写折扣折让金额</el-button>
    </div>
  </div>
</template>

<script>
/*  import {delete_order_detail} from '../../../api/index'*/
import {get_user_order_detail,user_delete_order_detail,user_fill_order_discount} from '../../../api/web_index'
  import config from '../../../api/config'
  import axios from 'axios'
/* axios.defaults.withCredentials = true;*/
  export default {
    props:{
      sellId:''
    },
    created(){
      this.getData();

    },
    data(){
      return {
        discount:'0.00',
        number:0,
        total_price:0,
        sell_enter:'',
        sell_check:'',
        is_super:'',
        check_status:'',
        order_detail_list:[],/*采购清单表格*/
      }
    },
    methods:{
//      获取数据
      getData(){
        var _this=this;
        get_user_order_detail({'id':this.sellId,'token':window.sessionStorage.getItem('web_token')}).then(function (res) {
          /*审核状态*/
          /*折扣折让*/
          _this.discount=res.data.data.order[0].discount_money;
          var check_status=res.data.data.order[0].check_status;
          _this.check_status=check_status;
          /*采购清单表格*/
          _this.order_detail_list=res.data.data.order_detail_list;
          _this.order_detail_list.forEach(function (item) {
            item.check_status=check_status;
            _this.number+=Number(item.number);
            _this.total_price+=Number(item.total_price);
          });
          _this.total_price=Number(_this.total_price)+Number(_this.discount);
          _this.total_price=_this.total_price.toFixed(2);


        }).catch(function (err) {
          console.log(err);
        })
      },
/*删除方法*/
      orderDelete(id){
        var _this=this;
        this.$confirm('您确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          user_delete_order_detail({'token':window.sessionStorage.getItem('web_token'),'id':id}).then(function (res) {
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
      /*总计*/
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
            /*找出需要求和的列*/
            if(index==8||index==10){
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
      /*编辑*/
      orderEdit(id){
        this.$router.push({'name':'new_order_detail',params:{'type':'edit','SellId':this.sellId,'id':id}})
      },
      /*添加*/
      add(){
        this.$router.push({'name':'new_order_detail',params:{'type':'add','SellId':this.sellId,'id':'add'}})
      },
      addDiscount(){
        var _this=this;
        this.$prompt('折扣折让金额（请填写负数）', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue:_this.discount
        }).then(({ value }) => {

          var obj={};
          obj.token=window.sessionStorage.getItem('web_token');
          obj.id=_this.sellId;
          obj.discount=value;
          user_fill_order_discount(obj).then(function (res) {
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
