<template>
  <div>
    <common-header :title="'系统维护'"></common-header>
    <div class="page-content">
      <common-header-tilte :title2="'客户名称列表'"></common-header-tilte>
      <el-row>
        <el-col :span="6"><input v-model="listParams.key_words" placeholder="请输入公司名称" @keyup.enter="search()" class="el-input__inner"></el-col>
        <el-col :span="17" :offset="1" style="text-align: left;">
          <el-button type="primary" @click="search()">查询</el-button>
        </el-col>
      </el-row>

      <el-table
        :data="tableData" border
        style="width: 100%;" stripe>
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          property="client_num"
          label="供应商编号" width="150">
        </el-table-column>
        <el-table-column
          property="companyname"
          label="公司名称" >
        </el-table-column>
        <el-table-column
          property="companyemail"
          label="公司邮箱" width="180">
        </el-table-column>
        <el-table-column
          property="mobile"
          label="登录手机号" width="110">
        </el-table-column>
        <el-table-column
          property="linkman_mobile"
          label="联系人手机号" width="120">
        </el-table-column>
        <el-table-column
          property="linkman_name"
          label="联系人姓名" width="120">
        </el-table-column>

        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <div v-if="system_edit==1">
              <el-button size="mini" type="primary" v-if="scope.row.check_status=='1'||scope.row.check_status=='4'" @click="handleEdit(scope.$index, scope.row, 'edit')">编辑审核</el-button>
              <div v-else>
                <el-button size="mini" type="primary"  @click="handleEdit(scope.$index, scope.row)" disabled>已审核</el-button>
                <el-button size="mini" type="primary"  @click="handleEdit(scope.$index, scope.row, 'look')">查看详情</el-button>
              </div>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </div>
            <div v-else>
              <el-button size="mini" type="primary" v-if="scope.row.check_status=='1'||scope.row.check_status=='4'" disabled>编辑审核</el-button>
              <el-button size="mini" type="primary" v-else @click="handleEdit(scope.$index, scope.row)" disabled>已审核</el-button>
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
        <el-form :model="ruleForm2" status-icon  ref="ruleForm2" label-position="left" label-width="120px" class="demo-ruleForm">

          <div class="main_con" style="margin-top: 0px">
            <el-form-item label="请输入手机号" prop="mobile">
              <el-input type="tel" v-model="ruleForm2.mobile" disabled></el-input>
            </el-form-item>

            <el-form-item label="请输入名称 " prop="username">
              <el-input type="tel" v-model="ruleForm2.username" disabled></el-input>
            </el-form-item>

            <el-form-item label="公司名称" prop="companyname">
              <el-input  v-model="ruleForm2.companyname" disabled></el-input>
            </el-form-item>

            <el-form-item label="公司邮箱" prop="companyemail" >
              <el-input v-model="ruleForm2.companyemail" type="email" disabled></el-input>
            </el-form-item>

            <el-form-item label="联系人姓名" prop="linkman_name">
              <el-input v-model="ruleForm2.linkman_name" disabled></el-input>
            </el-form-item>

            <el-form-item label="联系人电话" prop="linkman_mobile">
              <el-input v-model="ruleForm2.linkman_mobile" disabled></el-input>
            </el-form-item>

            <el-form-item label="证件信息">
              <div class="con_width">
                <ul class="upload_imgs" style="overflow: hidden;">
                  <li class="block">
                    <div class="img-container">
                    <img :src="yyzz_pic" v-model="ruleForm2.yyzz_pic_url" /><br>
                    </div>
                    <span class="demonstration">营业执照副本：上传复印件盖章扫描件</span>
                  </li>
                  <li class="block">
                    <div class="img-container">
                    <img :src="zzjgdm_pic" v-model="ruleForm2.zzjgdm_pic_url" /><br>
                    </div>
                    <span class="demonstration">组织机构代码证：上传复印件盖章扫描件</span>
                  </li>
                  <li class="block">
                    <div class="img-container">
                    <img :src="swdi_pic" v-model="ruleForm2.swdi_pic_url" /><br>
                    </div>
                    <span class="demonstration">税务登记证：上传复印件盖章扫描件</span>
                  </li>
                  <li class="block">
                    <div class="img-container">
                    <img :src="ybnsrzg_pic" v-model="ruleForm2.ybnsrzg_pic_url" /><br>
                    </div>
                    <span class="demonstration">一般纳税人资格证书：上传复印件盖章扫描件</span>
                  </li>
                  <li class="block">
                    <div class="img-container">
                    <img :src="khxk_pic" v-model="ruleForm2.khxk_pic_url" /><br>
                    </div>
                    <span class="demonstration">开户许可证：上传复印件盖章扫描件</span>
                  </li>
                  <li class="block">
                    <div class="img-container">
                    <img :src="kpxx_pic" v-model="ruleForm2.kpxx_pic_url" /><br>
                    </div>
                    <span class="demonstration">开户许可证：上传复印件盖章扫描件</span>
                  </li>
                </ul>
              </div>
            </el-form-item>

            <el-form-item label="审核结果">
              <template>
                <el-radio v-model="radio" label="1" v-on:change="changeRadio()"  v-if="type=='edit'">通过</el-radio>
                <el-radio v-model="radio" label="1" v-on:change="changeRadio()"  v-if="type=='look'" disabled>通过</el-radio>
                <el-radio v-model="radio" label="2" v-on:change="changeRadio()" v-if="type=='edit'">拒绝</el-radio>
                <el-radio v-model="radio" label="2" v-on:change="changeRadio()" v-if="type=='look'" disabled>拒绝</el-radio>
                  <el-input :rows="2" type="text" v-if="checkClient.is_pass=='n'&&type=='edit'"  v-model="checkClient.reason" placeholder="请输入拒绝理由"></el-input>
                  <el-input :rows="2" type="text" v-if="checkClient.is_pass=='n'&&type=='look'"  v-model="checkClient.reason" placeholder="请输入拒绝理由" disabled></el-input>
                <!--<div v-if="" >
                </div>-->

              </template>

            </el-form-item>
          </div>

        </el-form>

        <div slot="footer" class="dialog-footer" style="text-align: center;">
          <el-button type="primary" v-if="type=='look'" @click="commit">关闭</el-button>
          <el-button type="primary" v-if="type=='edit'" @click="commit">提交审核</el-button>
        </div>
      </el-dialog>

    </div>
  </div>

</template>

<script>
  import {customer_lsit,delete_client,get_user_detail,check_client} from'../../../api/index'
  import Header from '../common/common_header.vue'
  import Header2 from '../common/common_headerTitle.vue'
  export default {
    components:{
      'common-header':Header,
      'common-header-tilte':Header2
    },
    data(){
      return{
        row:'',
        sign:'0',
        currentPage1: 1,
        total_count:0,
        tableData:[],
        super_lookover:'',
        system_edit:'',
        is_super:'',
        listParams:{
          key_words:'',
          page:'1'
        },
        listDetail:{
            id:''
        },
        delectClient:{
          token:'',
          id:''
        },
        radio:'1',
        type:'',
        checkClient:{
          token:'',
          id:'',
          is_pass:'y',
          reason:''
        },
        dialogFormVisible:false,
        formLabelWidth:'120px',
        dialogTitle:'',
        successMsg:'',
        errorMsg:'',
        yyzz_pic:'',
        zzjgdm_pic:'',
        swdi_pic:'',
        ybnsrzg_pic:'',
        khxk_pic:'',
        kpxx_pic:'',

        ruleForm2: {
          mobile:'',
          username: '',
          companyname:'',
          companyemail:'',
          linkman_name:'',
          linkman_mobile:'',
          yyzz_pic_url:'',
          zzjgdm_pic_url:'',
          swdi_pic_url:'',
          ybnsrzg_pic_url:'',
          khxk_pic_url:'',
          kpxx_pic_url:''
        },
      }
    },
    created(){
      this.getData();
      this.delectClient.token=window.sessionStorage.getItem('session');
      this.checkClient.token=window.sessionStorage.getItem('session');
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
        customer_lsit(this.listParams).then(function (res) {
          _this.tableData=res.data.data.data_list;
    /*      _this.tableData.forEach(function (item) {
            item.super_lookover=window.sessionStorage.getItem('super_lookover')
          })*/
          _this.total_count = parseInt(res.data.data.total_count);
        }).catch(function (err) {
          console.log(err);
        })
      },
      search(){
        this.getData();
      },
      handleEdit(index,row,type){
        var _this = this;
        this.listDetail.id = row.id;
        get_user_detail(this.listDetail).then(function(res){
          _this.ruleForm2 = res.data.data;
          _this.yyzz_pic = res.data.data.yyzz_pic_url;
          _this.zzjgdm_pic = res.data.data.zzjgdm_pic_url;
          _this.swdi_pic = res.data.data.swdi_pic_url;
          _this.ybnsrzg_pic = res.data.data.ybnsrzg_pic_url;
          _this.khxk_pic = res.data.data.khxk_pic_url;
          _this.kpxx_pic = res.data.data.kpxx_pic_url;
          _this.checkClient.id = res.data.data.id;
          if(res.data.data.check_status==3){
            _this.radio='2';
            _this.checkClient.is_pass='n';
            _this.type=type;
            _this.checkClient.reason=res.data.data.refuse_reason;
          }else {
            _this.radio='1';
            _this.checkClient.is_pass='y';
            _this.type=type;
            _this.checkClient.reason='';
          }

        }).catch(function (err) {
          console.log(err);
        })

        this.dialogTitle='查看详情';
        this.dialogFormVisible=true;

      },
      handleDelete(index,row){
        var _this = this;
        this.delectClient.id=row.id;
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delete_client(this.delectClient).then(function (res) {
            if(res.data.errcode==0){
              _this.$message({
                message: '删除成功',
                type: 'success'
              });
              _this.getData();
            }else if(res.data.errcode==90000){
              _this.$message({
                message: res.data.errdesc,
                type: 'warning'
              });
              _this.$router.push('/admin_view/');
              window.sessionStorage.setItem('session','');
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
      changeRadio(){
        var _this = this;
        if(_this.radio =='1'){
          _this.checkClient.is_pass ='y';
        }else{
          _this.checkClient.is_pass ='n';
          console.log('')
        }
      },
      commit(){
          var _this = this;
          if(_this.type=='edit'){
            _this.$confirm('审核后，审核状态不可再修改, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              check_client(_this.checkClient).then(function (res) {
                if(res.data.errcode==0) {

                  _this.$message({
                    type: 'success',
                    message: '审核完成!'
                  });
                  _this.dialogFormVisible=false;
                  _this.getData();
                }else{
                  _this.$message({
                    message: res.data.errdesc,
                    type: 'warning'
                  });
                  _this.dialogFormVisible=false;
                }
              }).catch(function (err) {
                console.log(err);
              })

              /*    _this.sign ='1';*/
            }).catch(() => {
              _this.$message({
                type: 'info',
                message: '已取消审核'
              });
            });
          }else{
            _this.dialogFormVisible=false;
          }


      }
    }
  }
</script>
<style>
  .el-dialog{
    width:75%;
  }
  .demo-ruleForm{
    padding:0 80px;
    width:auto;
  }
  .upload_imgs{
    width:99%;
    padding:0;
  }
  .con_width{
    width:auto;
    max-width:auto;
    min-width:auto;
  }
  .upload_imgs{
    min-width:auto;
  }
  .el-input.is-disabled .el-input__inner{
    color: #5c6067;
  }
  .upload_imgs li{
    margin: 0 1.5% 40px 1.5%;
    width: 30%;
    min-width:30%;
    height:auto;
    max-height:280px;
  }
  .img-container{
    height:200px;
    width:100%;
  }
  .el-form-item{
    text-align: left;
  }
  .block img{
    width:100%;
    max-height:200px;
  }
</style>
