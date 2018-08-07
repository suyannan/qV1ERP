<template>
  <div class="main-box">
    <div class="con_width clearfix main-div choose">
        <el-form :inline="true" :model="params" class="demo-form-inline list-from" style="text-align: left">
          <el-col :span="5">
            <div class="el-form-item" style="width:100%; font-size:14px;">
              <input v-model="params.order_num" placeholder="请输入订单号" class="el-input__inner" @keyup.enter="search()" style="width:100%">
            </div>
          </el-col>
          <el-col :span="11" :offset="1">
            <div class="el-form-item" style="width:100%;">
              <el-date-picker v-model="params.start_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="开始时间" @change="search()" style="width:45%;"></el-date-picker><span style="padding:0 5px;">至</span>
              <el-date-picker v-model="params.end_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="结束时间" @change="search()" style="width:45%;">
              </el-date-picker>
            </div>
          </el-col>
          <el-col :span="2" :offset="5" style="text-align: right; padding-right:10px;">
            <div class="el-form-item" style="width:100%;">
              <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
            </div>
          </el-col>
          <br>
          <el-col :span="6">
            <el-form-item label="销售主体" style="width:100%;">
              <el-select v-model="params.entity_id" placeholder="全部" filterable @change="search()">
                <el-option v-for="item in entities" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="付款状态" style="width:100%;">
              <el-select v-model="params.pay_status" placeholder="全部" @change="search()">
                <el-option label="全部" value="2"></el-option>
                <el-option label="已付款" value="1"></el-option>
                <el-option label="未付款" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="开票状态" style="width:100%;">
              <el-select v-model="params.invoice_status" placeholder="全部" @change="search()">
                <el-option label="全部" value="2"></el-option>
                <el-option label="已开票" value="1"></el-option>
                <el-option label="未开票" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发货状态" style="width:100%;">
              <el-select v-model="params.receive_status" placeholder="全部" @change="search()">
                <el-option label="全部" value="2"></el-option>
                <el-option label="已发货" value="1"></el-option>
                <el-option label="未发货" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
    </div>
    <div class="con_width clearfix main-div table-div">
      <div class="new-order" @click="newOrder()">
        <span><i class="icon iconfont icon-xinjiandingdan"></i>新建采购订单</span>
      </div>
    <el-table :data="tableData" border :summary-method="getSummaries"  show-summary style="width: 100%;  margin-top: 20px"
              @selection-change="handleSelectionChange">

      <el-table-column type="selection" width="50">
      </el-table-column>
      <el-table-column type="index" width="55">
      </el-table-column>
      <el-table-column prop="out_num" label="订单编号">
      </el-table-column>
      <el-table-column prop="out_date" label="订单日期" width="175">
      </el-table-column>
      <el-table-column prop="chmc_name" label="存货名称">
      </el-table-column>
      <el-table-column prop="unit" label="规格型号">
      </el-table-column>
      <el-table-column prop="number" label="数量">
      </el-table-column>
      <el-table-column prop="total_price" label="含税金额">
      </el-table-column>
      <el-table-column prop="no_tax_price" label="未含税金额" width="105">
      </el-table-column>
      <el-table-column prop="entity_name" label="销售主体">
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
      <el-table-column prop="remarks" label="备注">
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="105">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleCheck(scope.row.order_id)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="impot-btn">
      <el-button type="primary" @click="exportExcel()">导出Excel</el-button>
      <el-button type="danger" @click="statistics()">统计</el-button>
    </div>
    </div>
  </div>
</template>

<script>
  import ExcelFunction from '../../../js/export_excel'
  import {list_all_sell_select} from '../../../api/index'
  import {list_user_orders} from '../../../api/web_index'
  export default {
    data() {
      return {
        clients:[],
        goods_names:[],
        entities:[],
        dateValue:'',
        params: {
          token:'',
          order_num:'',
          start_time:'',
          end_time:'',
          entity_id:'',
          receive_status:'2',
          invoice_status:'2',
          pay_status:'2'

        },
        excelData:[],
        newData:[],
        tableData: []
      };
    },
    created(){
      this.params.token= sessionStorage.getItem('web_token')
      this.getSelectOptions();
      this.getData();
    },
    methods: {
      getSelectOptions(){
        var _this=this;
        list_all_sell_select().then(function (res) {
          //console.log('select',res.data.data);
          var data=res.data.data;
          var all={};
          all.label='全部';
          all.value='';

          _this.entities.push(all);
          //console.log('data',data)
          //console.log('_this.entities',_this.entities)
          //console.log('data.entities',data.entities)

          data.entities.forEach(function (item) {
            var obj={};
            obj.label=item.entity_name.split('_+_')[0];
            obj.value=item.id;
            _this.entities.push(obj);
          });


          _this.selectOptions=res.data.data;

        }).catch(function (err) {
          console.log(err);
        })
      },
/*      getDateParams(){
        console.log(this.dateValue);
        this.params.start_time=this.dateValue[0];
        this.params.end_time=this.dateValue[1];
        this.getData();
      },*/
      getData(){
        if(this.params.start_time!=''&&this.params.end_time!=''){
          if((new Date(this.params.start_time)) > (new Date(this.params.end_time))){
            this.$message({
              message: '开始时间不能大于结束时间',
              type: 'warning'
            });
            return;
          }
        }
        //console.log(this.params);
        var _this=this;
        list_user_orders(this.params).then(function (res) {
          console.log('',res.data.data);
          _this.tableData=res.data.data;
        }).catch(function (err) {
          console.log(err);
        })
      },
      search(){
        this.getData();

      },
      getSummaries(param) {
        /*columns为每列的信息*/
        /*data为每行的信息*/
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '';
            return;
          }
          if(index===1){
            sums[index] = '总计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          /*检测所有元素都是数字*/
          if (values.every(value => !isNaN(value))) {
            if(index==6||index==7||index==8){
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
            }

          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      handleSelectionChange(val) {
        this.excelData = val;
      },
      handleCheck(order_id){
        //console.log(order_id);
        this.$router.push({'name':'order_detail',params:{'SellId':order_id}})
      },
      newOrder(){
        this.$router.push({'name':'new_order',params:{'type':'add','id':'add'}});
      },
      exportExcel(){
        var _this = this;
        this.newData = [];

        this.excelData.forEach(function(item){
          var obj ={};
          obj.receive = item.receive_status;
          obj.pay = item.pay_status;
          obj.invoice = item.invoice_status;
          obj.out_num = item.out_num;
          obj.out_date = item.out_date;
          obj.chmc_name = item.chmc_name;
          obj.unit = item.unit;
          obj.number = item.number;
          obj.total_price = item.total_price;
          obj.no_tax_price = item.no_tax_price;
          obj.entity_name = item.entity_name;
          obj.remarks = item.remarks;
          _this.newData.push(obj);
        })

        for(var i = 0;i<this.newData.length;i++){
          if(this.newData[i].receive == 0){
            this.newData[i].receive = '未发货';
          }else{
            this.newData[i].receive = '已发货';
          }

          if(this.newData[i].pay == 0){
            this.newData[i].pay = '未付款';
          }else{
            this.newData[i].pay = '已付款';
          }

          if(this.newData[i].invoice == 0){
            this.newData[i].invoice = '未开票';
          }else{
            this.newData[i].invoice = '已开票';
          }
        }

        var path='../../../vendor/Export2Excel.js';
        var theader=['订单编号', '订单日期', '存货名称','规格型号','数量','含税金额','未含税金额','销售主体','付款状态','发货状态','开票状态','备注'];
        var filterVal= ['out_num','out_date','chmc_name','unit','number','total_price','no_tax_price','entity_name','pay','receive','invoice','remarks'];
        var tableData=this.newData;
        var excelName='销售管理列表';
        ExcelFunction.exportExcel(theader,filterVal,tableData,excelName)
      },
      //统计
      statistics(){
        this.tableData=this.excelData;
      }
    }
  };
</script>
<style scoped="">
  .el-range-editor.el-input__inner{
    width:450px!important;
  }
  .impot-btn {
    text-align: right;
    margin-top:30px;
  }
  .new-order{
    cursor:pointer;
  }

</style>
