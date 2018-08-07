<template>
  <div>
    <common-header :title="'库存管理'" :title1="'批次详情'"></common-header>
    <div class="page-content">
      <!--<common-header-tilte :title2="'批次详情'"></common-header-tilte>-->
<!--      <el-form :inline="true" :model="params" class="demo-form-inline" style="text-align: left">
        <el-form-item label="日期">
          <el-date-picker v-model="dateValue" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="开始时间" end-placeholder="默认当前时间" @change="getDateParams()">
          </el-date-picker>
        </el-form-item>
      </el-form>-->

      <el-table :data="tableData"  :summary-method="getSummaries" show-summary v-loading="loading" style="width: 100%; margin-top: 20px"
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
        <el-table-column prop="order_in_batch" label="存货批次">
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
      </el-table>
      <div class="impot-btn">
        <el-button type="success" @click="exportExcel()">导出Excel</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  import ExcelFunction from '../../../js/export_excel'
  import Header from '../common/common_header.vue'
  import Header2 from '../common/common_headerTitle.vue'
  import {list_all_sell_select,list_order_stores_detail,list_location} from '../../../api/index'
  export default {
    components:{
      'common-header':Header,
      'common-header-tilte':Header2
    },
    data() {
      return {
        loading:false,
        list_location:[],
        goods_names:[],
        entities:[],
        dateValue:'',
        params: {
          start_time:'',
          end_time:'',
          store_id:'',
        },
        excelData:[],
        newData:[],
        tableData: []
      };
    },
    created(){
      this.params.store_id=this.$route.params.storeId;
      /*从库存列表页面传过来的时间*/
      this.params.start_time=window.sessionStorage.getItem('start_time');
      this.params.end_time=window.sessionStorage.getItem('end_time');
      this.getData();
    },
    methods: {
      /*获取数据*/
      getData(){
        var _this=this;
        _this.loading=true;
        list_order_stores_detail(this.params).then(function (res) {
          _this.tableData=res.data.data;
          _this.loading=false;
        }).catch(function (err) {
          console.log(err);
        })
      },
      search(){
        this.getData();
      },
      //  将当前日期格式化
      dateFormat(fmt){
        var date=new Date();
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
          if(index===1){
            sums[index] = '总计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          /*检测所有元素都是数字*/
          if (values.every(value => !isNaN(value))) {
            if(index==9||index==10||index==11||index==12||index==13||index==14||index==15||index==16){
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
      handleCheck(store_id){
        this.$router.push({'name':'stock_detail',params:{'storeId':store_id}})
      },
      exportExcel(){

        var path='../../../vendor/Export2Excel.js';
        var theader=['存货主体', '存货地', '存货编号','存货名称','存货批次','存货分类','规格型号','数量（初期）','金额（初期）','数量（收入）','金额（收入）','数量（支出）','金额（支出）','数量（期末）','金额（期末）'];
        var filterVal= ['entity_name','chd_name','chmc_num','chmc_name','order_in_batch','chfl_name','unit','start_num','start_price','in_num','in_price','out_num','out_price','end_num','end_price'];
        var tableData=this.excelData;
        var excelName='批次详情列表';
        ExcelFunction.exportExcel(theader,filterVal,tableData,excelName)
      },
      statistics(){
        this.tableData=this.excelData;
      }
    }
  };
</script>
<style scoped="">

</style>
