<template>


  <div>

    <el-col :span="24" class="top">
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" :disabled="listLoading">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="listLoading" @click="importFile">导入用户</el-button>
          <input type="file" id="file" style="display:none" accept="application/vnd.ms-excel">
        </el-form-item>
      </el-form>
    </el-col>


    <el-table ref="multipleTable" :data="rows" stripe tooltip-effect="dark" style="width: 100%"
              @selection-change="handleSelectionChange" v-loading="listLoading">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="120">
        <template scope="scope">
          <a href="" @click.prevent="userMes(scope.row)" class="username">{{scope.row.username}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="idCard" label="证件" show-overflow-tooltip>
      </el-table-column>

      <el-table-column prop="phone" label="电话" show-overflow-tooltip>
      </el-table-column>


      <el-table-column prop="totalScore" label="积分" width="120" show-overflow-tooltip>
        <template scope="scope">
          <el-tooltip class="item" effect="dark" content="查看积分" placement="top">

            <el-button size="mini" :plain="true" class="scoreButton" @click="handleIntegtalList(scope.row.id)">
              {{scope.row.totalScore}}
            </el-button>

          </el-tooltip>
        </template>
      </el-table-column>





      <el-table-column label="操作" show-overflow-tooltip>
        <template scope="scope">
          <el-button size="small" type="danger" @click="isDisabled(scope.row,1)" v-if="scope.row.disabled==0">禁用
          </el-button>
          <el-button size="small" type="info" @click="isDisabled(scope.row,0)" v-if="scope.row.disabled==1">启用
          </el-button>
          <el-button :plain="true" type="info" @click="resetPass(scope.row.id)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row  class="bottom">

      <el-col :span="3" >
        <el-button @click="resetPassBatch" :disabled="selection.length==0">批量重置</el-button>
      </el-col>
      <el-col :span="9">
        <el-button @click="toggleSelection()" :disabled="selection.length==0">取消选择</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination :page-size="pageSize" layout="total,prev, pager, next, jumper" :total="total"
                       @current-change="handleCurrentChange" v-show="!listLoading"></el-pagination>
      </el-col>

    </el-row>

    <el-dialog title="积分列表" v-model="dialogTableVisible" :visible.sync="dialogTableVisible" size="large" :close-on-click-modal="false">
      <integrallist  :userId="userId" :show="dialogTableVisible"></integrallist>
    </el-dialog>
    <el-dialog title="用户信息" v-model="dialogMessVisible" :visible.sync="dialogMessVisible" :close-on-click-modal="false">
      <userinfo  :userMess="userMess" ></userinfo>
    </el-dialog>

  </div>
</template>

<script>
  import {getUserList, resetPwd, setUserState, importUsers} from '../../api/index'
  import IntegralList from './IntegralList.vue'
  import UserInfo from './UserInfo.vue'
  export default {
      components:{
          'integrallist':IntegralList,
        'userinfo':UserInfo
      },
    data(){
      return {

        rows: [],
        selection: [],
        total: 0,
        page: 1,
        pageSize: 10,
        keyword: '',
        listLoading: false,
        dialogTableVisible: false,
        dialogMessVisible: false,
        userId:'',
        userMess:{}
      }
    },
    created(){
      this.getData();
    },
    methods: {
      importFile(){
        var inputFile = document.getElementById('file');
        inputFile.click();
        inputFile.onchange = function () {
          if (this.files.length == 0) {
            return
          } else {
            var fileName = this.files[0];
            var data = new FormData();
            data.append('myFile', fileName);
            importUsers(data).then(function () {

            })
          }

        }
      },
      search(){
        this.page=1;
        this.getData();
      },
      handleSelectionChange(selection){
        this.selection = selection;

      },
      resetPass(id){
        var _this = this;
        resetPwd({userIds: id}).then(function (res) {

          if (res.status == 200 && res.data.code == 1) {
            _this.$message({
              message: '重置成功',
              type: 'success'
            })
          } else {
            _this.$message({
              message: '重置失败',
              type: 'error'
            })
          }
        })
      },
      resetPassBatch(){
        var ids = this.selection.map(function (item) {
          return item.id;
        });
        this.resetPass(ids.toString());
      },
      toggleSelection() {
        this.$refs.multipleTable.clearSelection();
      },
      isDisabled(row, state){
        var _this = this;
        setUserState({user_id: row.id, disabled: state}).then(function (res) {
          row.disabled = state;
          if (res.status == 200 && res.data.code == 1) {
            _this.$message({
              message: '修改成功',
              type: 'success'
            })
          } else {
            _this.$message({
              message: '修改失败',
              type: 'error'
            })
          }

        })
      },
      handleCurrentChange(val){

        this.page = val;
        this.getData();
      },
      /*getData(){
      /!*  this.listLoading = true;*!/
        var _this = this;
        getUserList({page: _this.page, rows: _this.pageSize, keyword: _this.keyword}).then(function (res) {

          /!*_this.listLoading = false;*!/
          if (res.data && res.data.code == 1) {
            _this.rows = res.data.rows;
            _this.total = res.data.total;
          }

        })
      },*/
      handleIntegtalList(userId){
          this.userId=userId;
       this.dialogTableVisible=true;

      },
      userMes(row){
         this.userMess=row;
          this.dialogMessVisible=true;
      }

    }
  }
</script>

<style scoped>

  .scoreButton {
    background-color: #e4e8f1;
  }
  .username{
    color:dodgerblue;
  }
  .bottom,.top{
    margin-top:10px;
    background-color: #f2f2f2;
    width:100%;
    height:70px;
    padding:10px;
  }
  .top{
    margin-bottom: 10px;
  }
</style>
