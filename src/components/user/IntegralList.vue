<template>
  <div>integralist</div>
  <!--<div>
    <el-table :data="rows" v-loading="listLoading">
      <el-table-column type="index" show-overflow-tooltip>
      </el-table-column>
      <el-table-column property="username" label="用户名" width="150" show-overflow-tooltip></el-table-column>

      <el-table-column property="typeName" label="积分途径" width="200" show-overflow-tooltip></el-table-column>

      <el-table-column property="singleDesc" label="增量" show-overflow-tooltip>
        <template scope="scope">
          <el-button size="mini" :plain="true" class="add">
            {{scope.row.singleDesc}}
          </el-button>
        </template>
      </el-table-column>

      <el-table-column property="timeFormat" label="时间" show-overflow-tooltip></el-table-column>

    </el-table>

    <div style="margin-top: 25px">
      <el-col :span="10" :offset="14">
        <el-pagination :page-size="pageSize" layout="prev, pager, next" :total="total"
                       @current-change="handleCurrentChange" v-show="!listLoading"></el-pagination>
      </el-col>
    </div>

  </div>-->
</template>

<script>
  import {getIntegralList} from '../../api/index'
  export default {

    props: {
      userId: {
        type: Number
      },
      show: {
        type: Boolean,
        defalut: false
      }
    },
    data(){
      return {
        rows: [],
        listLoading: false,
        pageSize: 10,
        total: 0,
        page: 1,

      }
    },
    created(){

      this.getData();
    },
    methods: {
      handleCurrentChange(val){
        this.page = val;
        this.getData();
      },
      getData(){
        this.listLoading = true;
        var _this = this;
        getIntegralList({page: _this.page, rows: _this.pageSize, user_id: _this.userId}).then(function (res) {
          _this.listLoading = false;

          _this.rows = res.data.rows
          _this.total = res.data.total;
        })
      }
    },
    watch: {
      show(n, o){
        if (n) {
          this.getData();
        }
      }
    }
  }
</script>

<style>

</style>
