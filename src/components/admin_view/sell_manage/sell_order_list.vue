<template>
  <div>
    <common-header :title="'销售管理'" :title1="'销售订单列表'"></common-header>
    <div class="page-content">
      <el-form :inline="true" :model="params" class="demo-form-inline" style="text-align: left;border:1px solid rgba(1,168,158,0.13); padding:15px;">
        <table class="search-table" style="width:90%;font-size:12px;" cellspacing="10px" cellpadding="5px">
          <tr>
            <td style="min-width:70px;">日期</td>
            <td>
              <el-date-picker v-model="params.start_time" type="date" value-format="yyyy-MM-dd"
                              placeholder="开始时间" @change="search()" style="width:100%;" size="mini"></el-date-picker>
            </td>
            <td style="text-align: center;min-width:70px">至</td>
            <td>
              <el-date-picker v-model="params.end_time" type="date" value-format="yyyy-MM-dd"
                              placeholder="结束时间" @change="search()" style="width:100%;" size="mini">
              </el-date-picker>
            </td>
            <td style="min-width:70px">订单号</td>
            <td>
              <div class="el-input el-input--mini">
                <input v-model="params.order_num" placeholder="请输入订单号" class="el-input__inner el-input--mini"
                       size="mini" @keyup.enter="search()">
              </div>
            </td>
            <td style="min-width:70px">审核状态</td>
            <td>
              <el-select v-model="params.check_status" placeholder="全部" @change="search()" style="width:100%"
                         size="mini">
                <el-option label="全部" value=""></el-option>
                <el-option label="未提交" value="0,11,14"></el-option>
                <el-option label="待审核" value="1,4"></el-option>
                <el-option label="审核通过" value="2"></el-option>
                <el-option label="审核不通过" value="3"></el-option>
              </el-select>
            </td>

          </tr>
          <tr>
            <td>客户名称</td>
            <td>
              <el-select v-model="params.client_id" placeholder="全部" filterable @change="search()" style="width:100%"
                         size="mini">
                <el-option v-for="item in clients" :label="item.label" :value="item.value"
                           :key="item.value"></el-option>
              </el-select>
            </td>
            <td>存货名称</td>
            <td>
              <el-select v-model="params.chmc_id" placeholder="全部" filterable  :filter-method="filterMethod" @change="search()" style="width:100%"
                         size="mini">
                <el-option v-for="item in goods_names" :label="item.label" :value="item.value"
                           :key="item.value"></el-option>
              </el-select>
            </td>
            <td>销售主体</td>
            <td>
              <el-select v-model="params.entity_id" placeholder="全部" filterable @change="search()" style="width:100%"
                         size="mini">
                <el-option v-for="item in entities" :label="item.label" :value="item.value"
                           :key="item.value"></el-option>
              </el-select>
            </td>
            <td>收款状态</td>
            <td>
              <el-select v-model="params.pay_status" placeholder="全部" @change="search()" style="width:100%" size="mini">
                <el-option label="全部" value="2"></el-option>
                <el-option label="已收款" value="1"></el-option>
                <el-option label="未收款" value="0"></el-option>
              </el-select>
            </td>
          <tr>
            <td>开票状态</td>
            <td>
              <el-select v-model="params.invoice_status" placeholder="全部" @change="search()" style="width:100%"
                         size="mini">
                <el-option label="全部" value="2"></el-option>
                <el-option label="已开票" value="1"></el-option>
                <el-option label="未开票" value="0"></el-option>
              </el-select>
            </td>
            <td>出货状态</td>
            <td>
              <el-select v-model="params.receive_status" placeholder="全部" @change="search()" style="width:100%"
                         size="mini">
                <el-option label="全部" value="2"></el-option>
                <el-option label="已出货" value="1"></el-option>
                <el-option label="未出货" value="0"></el-option>
              </el-select>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td style="text-align: right">
              <el-button type="primary" @click="search()" size="mini">查询</el-button>
            </td>
          </tr>
        </table>
      </el-form>

      <el-table :data="tableData" max-height="450"  :summary-method="getSummaries" show-summary v-loading="loading"
                style="width: 100%; margin-top: 20px"
                @selection-change="handleSelectionChange"  @row-click="rowOption">

        <el-table-column type="selection" width="30">
        </el-table-column>
        <!--<el-table-column type="index" width="55">
        </el-table-column>-->
        <el-table-column prop="out_num" label="订单编号">
        </el-table-column>
        <el-table-column label="订单日期">
          <template slot-scope="scope">
            <span>{{scope.row.out_date.split(' ')[0]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="客户名称">
          <template slot-scope="scope">
            <span :title="scope.row.client_name">{{scope.row.client_name.slice(0, 5) + '...'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="chmc_name" label="存货名称">
          <template slot-scope="scope">
            <span :title="scope.row.chmc_name">{{scope.row.chmc_name.slice(0, 5) + '...'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="unit" label="规格型号">
        </el-table-column>
        <el-table-column prop="number" label="数量">
        </el-table-column>
        <el-table-column prop="total_price" label="含税金额" width="100">
        </el-table-column>
        <el-table-column prop="no_tax_price" label="未含税金额" width="100">
        </el-table-column>
        <el-table-column  label="销售主体">
          <template slot-scope="scope">
            <span :title="scope.row.entity_name">{{scope.row.entity_name.slice(0, 4) + '...'}}</span>
          </template>
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
        <!--<el-table-column prop="remarks" label="备注">
        </el-table-column>-->
       <!-- <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleCheck(scope.row.order_id)">查看详情</el-button>
          </template>
        </el-table-column>-->
      </el-table>
      <div class="pl" style="margin-top: 50px;text-align: left;display: inline-block;width:45%;">
        <!--<el-button type="danger" size="mini">批量删除</el-button>
        <el-button type="success" size="mini">批量审核</el-button>-->
      </div>
      <div class="impot-btn" style="display: inline-block;width:45%;">
        <el-button type="success" @click="exportExcel()" size="mini">导出Excel</el-button>
        <el-button type="danger" @click="statistics()" size="mini">统计</el-button>
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
        loading:false,
        clients: [],
        goods_names: [],
        goods_names_all: [],
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
        excelData: [],
        /*不在这直接定义方法是因为用this找不到data里面的数值*/
        filterMethod: new Function(),
      };
    },
    created() {
      /*将过滤方法赋给filterMethod*/
      this.filterMethod = this.selfFilter;
      this.getSelectOptions();
      this.getData();
    },
    methods: {
      /*点击table某行在新窗口打开订单详情*/
      rowOption(row, event, column) {
        console.log(row.order_id);
        var el = document.createElement("a");
        document.body.appendChild(el);
        el.href = location.href.split('#')[0]+'#/admin_view/sell_order_detail/' + row.order_id; //url 是你得到的连接
        el.target = '_blank'; //指定在新窗口打开
        el.click();
        document.body.removeChild(el);
      },
      /*自定义带搜索的输入框过滤函数，参数value为输入的值，默认参数*/
      selfFilter(value) {
        var _this = this;
        var arr = [];
        if (value == '全部') {
          this.goods_names_all.forEach(function (item) {
            /*用深拷贝不影响原来的数组*/
            var obj = _this.deepCopy(item);
            arr.push(obj);
          });
          _this.goods_names = arr;
          return;
        }
        /*不为全部时匹配*/
        this.goods_names_all.forEach(function (item) {
          if (item.label.indexOf(value) >= 0) {
            var obj = _this.deepCopy(item);
            arr.push(obj);
          } else if (item.num.indexOf(value) >= 0) {
            var obj = _this.deepCopy(item);
            arr.push(obj);
          }
        });
        _this.goods_names = arr;
      },
      /*对象的深拷贝函数*/
      deepCopy(p, c) {
        var c = c || {};
        for (var i in p) {
          if (!p.hasOwnProperty(i)) {
            continue;
          }
          if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            this.deepCopy(p[i], c[i]);
          } else {
            c[i] = p[i];
          }
        }
        return c;
      },
      /*获取筛选条件*/
      getSelectOptions() {
        var _this = this;
        list_all_sell_select().then(function (res) {
          var data = res.data.data;
          var all = {};
          all.label = '全部';
          all.value = '';
          all.num = '全部';
          _this.clients.push(all);
          _this.goods_names.push(all);
          _this.goods_names_all.push(all);
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
            obj.num = item.chmc_name.split('_+_')[1];
            _this.goods_names.push(obj);
            _this.goods_names_all.push(obj);
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
      /*获取数据*/
      getData() {
        /*日期选择时间判断*/
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
        /*加载状态*/
        _this.loading=true;
        list_orders(this.params).then(function (res) {
          _this.tableData = res.data.data;
          _this.loading=false;
        }).catch(function (err) {
          console.log(err);
        })
      },
      /*查询*/
      search() {
        this.getData();
      },
      /*总计*/
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
      /*选中函数*/
      handleSelectionChange(val) {
        this.excelData = val;
      },
      /*查看详情*/
      handleCheck(order_id) {
        this.$router.push({'name': 'sell_order_detail', params: {'sellOrderId': order_id}})
      },
      /*导出Excel*/
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
  .el-table:hover{
    cursor: pointer;
  }
</style>
