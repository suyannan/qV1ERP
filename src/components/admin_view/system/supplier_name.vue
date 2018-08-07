<template>
  <div>
    <common-header :title="'系统维护'" :title1="'供应商名称'"></common-header>
    <div class="page-content">
<!--      <common-header-tilte :title2="'供应商名称'"></common-header-tilte>-->
      <el-row>
        <el-col :span="5"><input v-model="listParams.key_words" placeholder="请输入供应商名称或代码" @keyup.enter="search()" class="el-input__inner"></el-col>
        <el-col :span="18" :offset="1" style="text-align: left;">
          <el-button type="primary" @click="search()">查询</el-button>
          <span v-if="system_edit==1">
            <el-button type="primary" @click="handleAdd()">增加供应商</el-button>
          </span>
          <span v-else>
             <el-button type="primary" disabled>增加供应商</el-button>
          </span>
          <el-button type="primary" @click="exportTable()">导出Excel</el-button>
        </el-col>
      </el-row>

      <el-table
        :data="tableData" border
        style="width: 100%" stripe>
        <el-table-column
          type="index"
          width="82">
        </el-table-column>
        <el-table-column
          property="num"
          label="供应商编号" width="180">
        </el-table-column>
        <el-table-column
          property="name"
          label="供应商名称" width="250">
        </el-table-column>
        <el-table-column
          property="words"
          label="输入代码">
        </el-table-column>
       <!-- <el-table-column
          property="shuiwu_num"
          label="税务代码" width="150">
        </el-table-column>-->
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <div v-if="system_edit==1">
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </div>
            <div v-else>
              <el-button size="mini" type="primary" disabled>编辑</el-button>
              <el-button size="mini" type="danger" disabled>删除</el-button>
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

      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
        <el-form :model="editParams">
          <el-form-item label="供应商编号" :label-width="formLabelWidth">
            <el-input v-model="editParams.num" auto-complete="off" placeholder="请输入供应商编号"></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" :label-width="formLabelWidth">
            <el-input v-model="editParams.name" auto-complete="off" placeholder="请输入供应商名称"></el-input>
          </el-form-item>
          <el-form-item label="输入代码" :label-width="formLabelWidth">
            <el-input v-model="editParams.words" auto-complete="off" placeholder="请输入供应商名称的首字母拼音"></el-input>
          </el-form-item>
         <!-- <el-form-item label="税务代码" :label-width="formLabelWidth">
            <el-input v-model="editParams.shuiwu_num" auto-complete="off" placeholder="请输入税务代码"></el-input>
          </el-form-item>-->

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="commit()">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>

</template>

<script>
 /* import Blob from '../../../vendor/Blob';
  import Export from "../../../vendor/Export2Excel";*/
  import {list_supplier,delete_supplier,edit_supplier,export_supplier_list} from'../../../api/index'
  import Header from '../common/common_header.vue'
  import Header2 from '../common/common_headerTitle.vue'
    export default {
      components:{
        'common-header':Header,
        'common-header-tilte':Header2
      },
      data(){
        return{
          tableData:[],
          super_lookover:'',
          system_edit:'',
          is_super:'',
          currentPage1: 1,
          total_count:0,
          listParams:{
            key_words:'',
            page:'1'
          },
          dialogFormVisible:false,
          formLabelWidth:'120px',
          dialogTitle:'',
          successMsg:'',
          errorMsg:'',
          editParams:{
            token:'',
            num:'',
            name:'',
            words:'',
            shuiwu_num:''
          },
          deletParams:{
            id:'',
            token:''
          }

        }
      },
      created(){
        this.getData();
        this.editParams.token=sessionStorage.getItem('session');
        this.deletParams.token=sessionStorage.getItem('session');
        this.super_lookover=window.sessionStorage.getItem('super_lookover');
        this.is_super=window.sessionStorage.getItem('is_super');
        this.system_edit=window.sessionStorage.getItem('system_edit');



      },
      methods:{
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          this.listParams.page = val;
          this.getData();
          /* console.log(`当前页: ${val}`);*/
        },
        getData(){
          var _this=this;
          list_supplier(this.listParams).then(function (res) {
            _this.tableData=res.data.data.data_list;
            _this.total_count = parseInt(res.data.data.total_count);
          }).catch(function (err) {
            console.log(err);
          })
        },
        search(){
          this.getData();
        },
        handleAdd(){
          if(this.editParams.id){
            delete this.editParams.id;
          }
          this.editParams.num='';
          this.editParams.name='';
          this.editParams.words='';
          this.editParams.shuiwu_num='';
          this.successMsg='添加成功';
          this.errorMsg='添加失败';
          this.dialogTitle='添加';
          this.dialogFormVisible=true;
        },
        handleEdit(index,row){
          this.editParams['id']=row.id;
          this.editParams.num=row.num;
          this.editParams.name=row.name;
          this.editParams.words=row.words;
          this.editParams.shuiwu_num=row.shuiwu_num;
          this.successMsg='修改成功';
          this.errorMsg='修改失败';
          this.dialogTitle='编辑';
          this.dialogFormVisible=true;
        },
        handleDelete(index,row){
          this.deletParams.id=row.id;
          var _this=this;
          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            delete_supplier(this.deletParams).then(function (res) {
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
              console.log(err);
            })
          }).catch(() => {
            _this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });


        },
        exportTable() {
          require.ensure([], () => {
            const { export_json_to_excel } = require('../../../vendor/Export2Excel');
            const tHeader = ['供应商编号', '供应商名称', '输入代码', '税务代码'];
            const filterVal = ['num', 'name', 'words', 'shuiwu_num'];
            const list = this.tableData;
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '供应商名称列表');
          })
        },
        formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]))
        },
        commit(){
          var _this=this;
          edit_supplier(this.editParams).then(function (res) {
            if(res.data.errcode==0){
              _this.$message({
                message: _this.successMsg,
                type: 'success'
              });
              _this.dialogFormVisible=false;
              _this.getData();
            }else{
              _this.$message({
                message: res.data.errdesc,
                type: 'warning'
              });
            }
          }).catch(function (err) {
            console.log(err);
          })
        }
      }
    }
</script>
<style>

</style>
