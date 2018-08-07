<template>
  <div>
    <common-header :title="'库存管理'" :title1="'库存列表'"></common-header>
    <div class="page-content">
     <!-- <common-header-tilte :title2="'库存列表'"></common-header-tilte>-->
      <el-form :inline="true" :model="params" class="demo-form-inline"
               style="text-align: left;border:1px solid rgba(1,168,158,0.13); padding:15px;">
        <table class="search-table" style="width:90%;font-size:12px;" cellspacing="10px" cellpadding="5px">
          <tr>
            <td style="min-width:70px;">日期</td>
            <td>
              <el-date-picker v-model="params.start_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                              placeholder="开始时间" @change="search()" style="width:100%;" size="mini"></el-date-picker>
            </td>
            <td style="text-align: center;min-width:70px">至</td>
            <td>
              <el-date-picker v-model="params.end_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                              placeholder="结束时间" @change="search()" style="width:100%;" size="mini">
              </el-date-picker>
            </td>
            <td style="min-width:50px;">存货主体</td>
            <td>
              <el-select v-model="params.entity_id" placeholder="全部" filterable @change="search()" style="width:100%"
                         size="mini">
                <el-option v-for="item in entities" :label="item.label" :value="item.value"
                           :key="item.value"></el-option>
              </el-select>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td style="min-width:70px;">存货地</td>
            <td>
              <el-select v-model="params.chd_id" placeholder="全部" filterable @change="search()" style="width:100%" size="mini">
                <el-option v-for="item in list_location" :label="item.label" :value="item.value"
                           :key="item.value"></el-option>
              </el-select>
            </td>
            <td style="min-width:70px;text-align: center;">存货名称</td>
            <td>
              <el-select v-model="params.chmc_id" placeholder="全部" filterable :filter-method="filterMethod" @change="search()" style="width:100%"
                         size="mini">
                <el-option v-for="item in goods_names" :label="item.label" :value="item.value"
                           :key="item.value"></el-option>
              </el-select>
            </td>
            <td></td>
            <td style="text-align: right">
              <el-button type="primary" @click="search()" size="mini">查询</el-button>
            </td>
          </tr>
        </table>
      </el-form>
      <el-table :data="tableData"  fixed :summary-method="getSummaries" show-summary v-loading="loading"
                style="width: 100%; margin-top: 20px"
                @selection-change="handleSelectionChange">

        <el-table-column type="selection" width="50">
        </el-table-column>
        <el-table-column type="index" width="55">
        </el-table-column>
        <el-table-column prop="entity_name" label="存货主体">
        </el-table-column>
        <el-table-column prop="chd_name" label="存货地">
        </el-table-column>
        <el-table-column prop="chmc_num" label="存货编码">
        </el-table-column>
        <el-table-column prop="chmc_name" label="存货名称">
        </el-table-column>
        <el-table-column prop="chfl_name" label="存货分类">
        </el-table-column>
        <el-table-column prop="unit" label="规格型号">
        </el-table-column>
        <el-table-column prop="start_num" label="数量（期初）" width="105">
        </el-table-column>
        <el-table-column prop="start_price" label="金额（期初）" width="105">
        </el-table-column>
        <el-table-column prop="in_num" label="数量（收入）" width="105">
        </el-table-column>
        <el-table-column prop="in_price" label="金额（收入）" width="105">
        </el-table-column>
        <el-table-column prop="out_num" label="数量（支出）" width="105">
        </el-table-column>
        <el-table-column prop="out_price" label="金额（支出）" width="105">
        </el-table-column>
        <el-table-column prop="end_num" label="数量（期末）" width="105">
        </el-table-column>
        <el-table-column prop="end_price" label="金额（期末）" width="105">
        </el-table-column>
        <el-table-column label="操作" width="110" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleCheck(scope.row.store_id)">查看批次</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="impot-btn">
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
  import {list_all_sell_select, list_order_stores, list_location} from '../../../api/index'

  export default {
    components: {
      'common-header': Header,
      'common-header-tilte': Header2
    },
    data() {
      return {
        list_location: [],
        goods_names: [],
        goods_names_all: [],
        entities: [],
        dateValue: [],
        loading:false,
        params: {
          start_time: '',
          end_time: '',
          chd_id: '',
          entity_id: '',
          chmc_id: ''
        },
        tableData: [],
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
      /*获取所有的下拉框选项*/
      getSelectOptions() {
        var _this = this;
        list_all_sell_select().then(function (res) {
          var data = res.data.data;
          var all = {};
          all.label = '全部';
          all.value = '';
          all.num = '全部';
          _this.list_location.push(all);
          _this.goods_names.push(all);
          _this.goods_names_all.push(all);
          _this.entities.push(all);
          /*存货名称*/
          data.goods_names.forEach(function (item) {
            var obj = {};
            obj.label = item.chmc_name.split('_+_')[0];
            obj.value = item.id;
            obj.num = item.chmc_name.split('_+_')[1];
            _this.goods_names.push(obj);
            _this.goods_names_all.push(obj);
          });
          /*采购主体*/
          data.entities.forEach(function (item) {
            var obj = {};
            obj.label = item.entity_name.split('_+_')[0];
            obj.value = item.id;
            _this.entities.push(obj);
          });
        }).catch(function (err) {
          console.log(err);
        });
        /*获取存货地筛选条件*/
        list_location({'key_words': ''}).then(function (res) {
          var data = res.data.data;
          data.forEach(function (item) {
            var obj = {};
            obj.label = item.chd_name;
            obj.value = item.id;
            _this.list_location.push(obj);
          });
        }).catch(function (err) {
          console.log(err);
        });
      },
      /*获取数据*/
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
        if (this.params.end_time == '') {
          this.params.end_time = this.dateFormat("yyyy-MM-dd hh:mm:ss");
        }
        var _this = this;
        _this.loading=true;
        list_order_stores(this.params).then(function (res) {
          _this.tableData = res.data.data;
          _this.loading=false;
        }).catch(function (err) {
          console.log(err);
        })
      },
      search() {
        this.getData();
      },
     //将当前日期格式化
      dateFormat(fmt) {
        var date = new Date();
        var o = {
          "M+": date.getMonth() + 1, //月份
          "d+": date.getDate(), //日
          "h+": date.getHours(), //小时
          "m+": date.getMinutes(), //分
          "s+": date.getSeconds(), //秒
          "q+": Math.floor((date.getMonth() + 3) / 3), //季度
          "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
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
            if (index == 8 || index == 9 || index == 10 || index == 11 || index == 12 || index == 13 || index == 14 || index == 15) {
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
      handleCheck(store_id) {
        window.sessionStorage.setItem('start_time', this.params.start_time);
        window.sessionStorage.setItem('end_time', this.params.end_time);
        var el = document.createElement("a");
        document.body.appendChild(el);
        el.href = location.href.split('#')[0]+'#/admin_view/stock_detail/' + store_id; //url 是你得到的连接
        el.target = '_blank'; //指定在新窗口打开
        el.click();
        document.body.removeChild(el);
       /* this.$router.push({'name': 'stock_detail', params: {'storeId': store_id}})*/
      },
      exportExcel() {
        /*console.log('tableData',this.excelData);*/
        var path = '../../../vendor/Export2Excel.js';
        var theader = ['存货主体', '存货地', '存货编码', '存货名称', '存货分类', '规格型号', '数量（初期）', '金额（初期）', '数量（收入）', '金额（收入）', '数量（支出）', '金额（支出）', '数量（期末）', '金额（期末）'];
        var filterVal = ['entity_name', 'chd_name', 'chmc_num', 'chmc_name', 'chfl_name', 'unit', 'start_num', 'start_price', 'in_num', 'in_price', 'out_num', 'out_price', 'end_num', 'end_price'];
        var tableData = this.excelData;
        var excelName = 'Excel表格';
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
  /*  .el-range-editor.el-input__inner{
      width:500px!important;
    }*/
  /*#search_item .el-form-item__label{*/
  /*color:#fff!important;*/
  /*}*/
</style>
