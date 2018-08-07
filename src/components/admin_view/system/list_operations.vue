<template>
  <div>
    <common-header :title="'系统维护'"></common-header>
    <div class="page-content">
      <common-header-tilte :title2="'操作记录'"></common-header-tilte>
      <el-table
        :data="tableData" border
        style="width: 100%" stripe>
        <el-table-column property="id" label="ID"> </el-table-column>
        <el-table-column property="create_time" label="操作日期"> </el-table-column>
        <el-table-column property="username" label="操作人"> </el-table-column>
        <el-table-column property="body" label="操作"> </el-table-column>
      </el-table>
      <div class="block">

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="total_count">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
    import {list_operations} from'../../../api/index'
    import Header from '../common/common_header.vue'
    import Header2 from '../common/common_headerTitle.vue'

    export default {
      components:{
        'common-header':Header,
        'common-header-tilte':Header2
      },
      data(){
        return {
          currentPage1: 1,
          tableData:[

          ],
          total_count:0,
          list_operations:{
            token:'',
            page:'1'
          }
        }
      },
      created(){

        this.list_operations.token = window.sessionStorage.getItem('session');
        this.getData();

      },
      methods:{
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          this.list_operations.page = val;
          this.getData();
          /* console.log(`当前页: ${val}`);*/
        },
        getData(){
          var _this=this;
          list_operations(this.list_operations).then(function (res) {
            _this.tableData=res.data.data.logs;
            _this.total_count = parseInt(res.data.data.total_count);
          }).catch(function (err) {
            console.log(err);
          })
        }
      }
    }
</script>


<style scoped>

</style>
