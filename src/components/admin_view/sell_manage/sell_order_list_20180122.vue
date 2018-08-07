<template>
  <div>
    <common-header :title="'销售管理'"></common-header>
    <div class="page-content">
      <common-header-tilte :title2="'销售订单列表'"></common-header-tilte>
      <el-form :inline="true" :model="params" class="demo-form-inline" style="text-align: left">
        <el-row>
          <el-col :span="4">
            <div class="el-form-item" style="width:100%;">
              <label class="el-form-item__label" style="">订单号</label>
              <div class="el-form-item__content" style="width:75%;">
                <input v-model="params.order_num" placeholder="请输入订单号" class="el-input__inner" style=""
                       @keyup.enter="search()">
              </div>

            </div>
          </el-col>
          <el-col :span="9">
            <el-form-item label="日期" style="width:100%">
              <el-date-picker v-model="params.start_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                              placeholder="开始时间" @change="search()" style="width:42%"></el-date-picker>
              <span style="padding:0 5px;">至</span>
              <el-date-picker v-model="params.end_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                              placeholder="结束时间" @change="search()" style="width:42%">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="客户名称" style="width:100%">
              <el-select v-model="params.client_id" placeholder="全部" filterable @change="search()">
                <el-option v-for="item in clients" :label="item.label" :value="item.value"
                           :key="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="存货名称" style="width:100%">
              <el-select v-model="params.chmc_id" placeholder="全部" filterable @change="search()">
                <el-option v-for="item in goods_names" :label="item.label" :value="item.value"
                           :key="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="el-form-item" style="width:100%;">
              <label class="el-form-item__label" style="">销售主体</label>
              <div class="el-form-item__content" style="width:65%;">
                <el-select v-model="params.entity_id" placeholder="全部" @change="search()" style="width:100%">
                  <el-option v-for="item in entities" :label="item.label" :value="item.value"
                             :key="item.value"></el-option>
                </el-select>
              </div>

            </div>

          </el-col>
          <el-col :span="4">
            <div class="el-form-item" style="width:100%;">
              <label class="el-form-item__label" style="">收款状态</label>
              <div class="el-form-item__content" style="width:65%;">
                <el-select v-model="params.pay_status" placeholder="全部" @change="search()" style="width:100%">
                  <el-option label="全部" value="2"></el-option>
                  <el-option label="已收款" value="1"></el-option>
                  <el-option label="未收款" value="0"></el-option>
                </el-select>
              </div>

            </div>

          </el-col>
          <el-col :span="4">
            <div class="el-form-item" style="width:100%;">
              <label class="el-form-item__label" style="">开票状态</label>
              <div class="el-form-item__content" style="width:65%;">
                <el-select v-model="params.invoice_status" placeholder="全部" @change="search()" style="width:100%">
                  <el-option label="全部" value="2"></el-option>
                  <el-option label="已开票" value="1"></el-option>
                  <el-option label="未开票" value="0"></el-option>
                </el-select>
              </div>

            </div>

          </el-col>
          <el-col :span="4">
            <div class="el-form-item" style="width:100%;">
              <label class="el-form-item__label" style="">出货状态</label>
              <div class="el-form-item__content" style="width:65%;">
                <el-select v-model="params.receive_status" placeholder="全部" @change="search()" style="width:100%">
                  <el-option label="全部" value="2"></el-option>
                  <el-option label="已出货" value="1"></el-option>
                  <el-option label="未出货" value="0"></el-option>
                </el-select>
              </div>

            </div>

          </el-col>

          <!--新增审核状态-->
          <el-col :span="4">
            <div class="el-form-item" style="width:100%;">
              <label class="el-form-item__label" style="">审核状态</label>
              <div class="el-form-item__content" style="width:65%;">
                <el-select v-model="params.check_status" placeholder="全部" @change="search()" style="width:100%">
                  <el-option label="全部" value=""></el-option><!--这个地方传什么-->
                  <el-option label="未提交" value="0,11,14"></el-option>
                  <el-option label="待审核" value="1,4"></el-option><!--这个地方传什么？-->
                  <el-option label="审核通过" value="2"></el-option>
                  <el-option label="审核不通过" value="3"></el-option>
                </el-select>
              </div>

            </div>

          </el-col>
          <el-col :xs="3" :sm="3" :md="2" :lg="2" :xl="3">
            <div class="el-form-item" style="width:100%;color:#fff">
              <label class="el-form-item__label" style="color: #fff;padding:0">占位</label>
              <div class="el-form-item__content" style="max-width:70%">
                <el-button type="primary" style="display: block;" @click="search()">查询</el-button>
              </div>

            </div>
          </el-col>
        </el-row>
      </el-form>

      <el-table :data="tableData" max-height="450" border :summary-method="getSummaries" show-summary
                style="width: 100%; margin-top: 20px"
                @selection-change="handleSelectionChange">

        <el-table-column type="selection" width="50">
        </el-table-column>
        <el-table-column type="index" width="55">
        </el-table-column>
        <el-table-column prop="out_num" label="订单编号">
        </el-table-column>
        <el-table-column prop="out_date" label="订单日期" width="175">
        </el-table-column>
        <el-table-column prop="client_name" label="客户名称">
        </el-table-column>
        <el-table-column prop="chmc_name" label="存货名称">
        </el-table-column>
        <el-table-column prop="unit" label="规格型号">
        </el-table-column>
        <el-table-column prop="number" label="数量">
        </el-table-column>
        <el-table-column prop="total_price" label="含税金额" width="120">
        </el-table-column>
        <el-table-column prop="no_tax_price" label="未含税金额" width="120">
        </el-table-column>
        <el-table-column prop="entity_name" label="销售主体">
        </el-table-column>
        <el-table-column label="收款状态">
          <template slot-scope="scope">
            <span v-if="scope.row.pay_status==0">未收款</span>
            <span v-if="scope.row.pay_status==1">已收款</span>
          </template>
        </el-table-column>
        <el-table-column label="出货状态">
          <template slot-scope="scope">
            <span v-if="scope.row.receive_status==0">未出货</span>
            <span v-if="scope.row.receive_status==1">已出货</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="开票状态">
          <template slot-scope="scope">
            <span v-if="scope.row.invoice_status==0">未开票</span>
            <span v-if="scope.row.invoice_status==1">已开票</span>
          </template>
        </el-table-column>
        <!--新增审核状态-->
        <el-table-column  label="审核状态">
          <template slot-scope="scope">
            <span v-if="scope.row.check_status==0||scope.row.check_status==11||scope.row.check_status==14">未提交</span>
            <span v-if="scope.row.check_status==1||scope.row.check_status==4">待审核</span><!--提交审核或审核被拒后重新提交审核-->
            <span v-if="scope.row.check_status==2">审核通过</span>
            <span v-if="scope.row.check_status==3">审核不通过</span>
          </template>
        </el-table-column>
        <!---->
        <el-table-column prop="remarks" label="备注">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleCheck(scope.row.order_id)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="impot-btn">
        <el-button type="success" @click="exportExcel()">导出Excel</el-button>
        <el-button type="danger" @click="statistics()">统计</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import ExcelFunction from '../../../js/export_excel'
  import Header from '../common/common_header.vue'
  import Header2 from '../common/common_headerTitle.vue'
  import {list_all_sell_select, list_orders} from '../../../api/index'

  export default {
    components: {
      'common-header': Header,
      'common-header-tilte': Header2
    },
    data() {
      return {
        clients: [],
        goods_names: [],
        entities: [],
        dateValue: '',
        params: {
          order_num: '',
          start_time: '',
          end_time: '',
          client_id: '',
          entity_id: '',
          chmc_id: '',
          receive_status: '2',
          invoice_status: '2',
          pay_status: '2',
          check_status:''
        },
        tableData: [],
        newData: [],
        excelData: []
      };
    },
    created() {
      this.getSelectOptions();
      this.getData();
    },
    methods: {
      getSelectOptions() {
        var _this = this;
        list_all_sell_select().then(function (res) {
          var data = res.data.data;
          var all = {};
          all.label = '全部';
          all.value = '';
          _this.clients.push(all);
          _this.goods_names.push(all);
          _this.entities.push(all);
          data.clients.forEach(function (item) {
            var obj = {};
            obj.label = item.companyname;
            obj.value = item.id;
            _this.clients.push(obj);
          });
          data.goods_names.forEach(function (item) {
            var obj = {};
            obj.label = item.chmc_name.split('_+_')[0];
            obj.value = item.id;
            _this.goods_names.push(obj);
          });
          data.entities.forEach(function (item) {
            var obj = {};
            obj.label = item.entity_name.split('_+_')[0];
            obj.value = item.id;
            _this.entities.push(obj);
          });


          _this.selectOptions = res.data.data;

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
      getData() {
        if (this.params.start_time != '' && this.params.end_time != '') {
          if ((new Date(this.params.start_time)) > (new Date(this.params.end_time))) {
            this.$message({
              message: '开始时间不能大于结束时间',
              type: 'warning'
            });
            return;
          }
        }
        var _this = this;
        list_orders(this.params).then(function (res) {
          _this.tableData = res.data.data;
        }).catch(function (err) {
          console.log(err);
        })
      },
      search() {
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
          if (index === 1) {
            sums[index] = '总计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          /*检测所有元素都是数字*/
          if (values.every(value => !isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] = sums[index].toFixed(2);
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      handleSelectionChange(val) {
        this.excelData = val;
      },
      handleCheck(order_id) {
        this.$router.push({'name': 'sell_order_detail', params: {'sellOrderId': order_id}})
      },
      exportExcel() {

        var _this = this;
        this.newData = [];
        this.excelData.forEach(function (item) {
          var obj = {};
          obj.receive = item.receive_status;
          obj.pay = item.pay_status;
          obj.invoice = item.invoice_status;
          obj.out_num = item.out_num;
          obj.out_date = item.out_date;
          obj.client_name = item.client_name;
          obj.chmc_name = item.chmc_name;
          obj.unit = item.unit;
          obj.number = item.number;
          obj.total_price = item.total_price;
          obj.no_tax_price = item.no_tax_price;
          obj.entity_name = item.entity_name;
          obj.remarks = item.remarks;
          _this.newData.push(obj);
        })

        for (var i = 0; i < this.newData.length; i++) {
          if (this.newData[i].receive == 0) {
            this.newData[i].receive = '未出货';
          } else {
            this.newData[i].receive = '已出货';
          }

          if (this.newData[i].pay == 0) {
            this.newData[i].pay = '未收款';
          } else {
            this.newData[i].pay = '已收款';
          }

          if (this.newData[i].invoice_status == 0) {
            this.newData[i].invoice = '未开票';
          } else {
            this.newData[i].invoice = '已开票';
          }
        }

        var path = '../../../vendor/Export2Excel.js';
        var theader = ['订单编号', '订单日期', '客户名称', '存货名称', '规格型号', '数量', '含税金额', '未含税金额', '销售主体', '收款状态', '出货状态', '开票状态', '备注'];
        var filterVal = ['out_num', 'out_date', 'client_name', 'chmc_name', 'unit', 'number', 'total_price', 'no_tax_price', 'entity_name', 'pay', 'receive', 'invoice', 'remarks'];
        var tableData = this.newData;
        var excelName = '销售订单列表';
        ExcelFunction.exportExcel(theader, filterVal, tableData, excelName)
      },
      //统计
      statistics() {
        this.tableData = this.excelData;
      }
    }
  };
</script>
<style scoped="">
</style>
