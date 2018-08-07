<template>
  <div>
    <common-header :title="'系统维护'" :title1="'操作员列表'"></common-header>
    <div class="page-content">
      <!--<common-header-tilte :title2="'操作员列表'"></common-header-tilte>-->
      <div class="header_search">
        <el-row>
          <el-col :span="5">
            <input v-model="searchKey" placeholder="用户编号或用户名称" @keyup.enter="search()" class="el-input__inner">
          </el-col>
          <el-col :span="18" :offset="1" style="text-align: left;">
            <el-button type="primary" class="search-btn" @click="search()">搜索</el-button>
            <span v-if="is_super==1">
              <el-button type="primary" class="search-btn" @click="handleAdd()">增加操作员</el-button>
            </span>
            <span v-else>
              <el-button type="primary" class="search-btn" disabled>增加操作员</el-button>
            </span>

          </el-col>
        </el-row>
      </div>
      <el-table :data="tableData" max-height="450" border>
        <el-table-column prop="num" label="用户编号"></el-table-column>
        <el-table-column prop="username" label="用户名称"></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <!--<el-table-column prop="register_date" label="新建日期"> </el-table-column>-->
        <el-table-column label="操作" width="250">

          <template slot-scope="scope">
            <div v-if="is_super==1">

              <el-button style="margin: 0px 5px 0" @click.native.prevent="deleteRow(scope.$index, scope.row)"
                         type="danger" size="mini"> 删除
              </el-button>
              <el-button style="margin: 0px 5px 0" @click.native.prevent="handleEdit(scope.$index, scope.row)"
                         type="primary" size="mini"> 编辑
              </el-button>
            </div>
            <div v-else>
              <el-button style="margin: 0px 5px 0" disabled type="danger" size="mini"> 删除 </el-button>
              <el-button style="margin: 0px 5px 0" disabled type="primary" size="mini"> 编辑 </el-button>


            </div>
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <div class="block">

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="total_count">
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
  import Header from '../common/common_header.vue'
  import Header2 from '../common/common_headerTitle.vue'
  import {adminList} from '../../../api/index'
  import {deleteAdminList} from '../../../api/index'

  export default {
    components: {
      'common-header': Header,
      'common-header-tilte': Header2
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.getData();
        /* console.log(`当前页: ${val}`);*/
      },
      handleEdit(index, row) {
//        this.userId=row.id;
//        console.log(this.userId);
        this.$router.push({'name': 'add_admin', params: {'type': 'edit', 'adminId': row.id}});
      },
      handleAdd() {
        this.$router.push({'name': 'add_admin', params: {'type': 'add', 'adminId': 'add'}});
      },
      deleteRow(index, row) {
        this.params2.id = window.sessionStorage.getItem('userId');
        this.params2.token = window.sessionStorage.getItem('session');
        var _this = this;
        this.$confirm('您确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (row.id == this.params2.id) {
            _this.$message({
              message: '删除失败，不能删除自己',
              type: 'warning'
            });
          } else {
            this.params2.id = row.id;
            deleteAdminList(this.params2).then(function (res) {
              if (res.data.errcode == 0) {
                _this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                _this.getData();
              }

            }).catch(function (err) {
              console.log(err);
            });

          }
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      getData() {
        var _this = this;
        adminList(this.params).then(function (res) {
          _this.tableData = res.data.data.data_list;
          _this.total_count = parseInt(res.data.data.total_count);
        }).catch(function (err) {
          console.log(err);
        })
      },
      search() {
        this.params.key_words = this.searchKey;
        this.getData();
      },
    },
    data() {
      return {
        super_lookover: '',
        system_edit: '',
        is_super:'',
        tableData: [],
        currentPage1: 1,
        total_count: 0,
        searchKey: '',
        params: {
          key_words: '',
          page: '1'
        },
        params2: {
          token: '',
          id: ''
        }
      }
    },
    created() { //一进页面就执行方法
      this.getData();
      this.super_lookover = window.sessionStorage.getItem('super_lookover');
      this.is_super=window.sessionStorage.getItem('is_super');
      this.system_edit=window.sessionStorage.getItem('system_edit');

    }

  }
</script>


<style scoped>
</style>
