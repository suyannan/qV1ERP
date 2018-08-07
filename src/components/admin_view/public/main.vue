<template>
  <div class="container">
    <header>
      <div class="header-left">
        <img src="../../../assets/log.png" alt="" class="logo">
        <h4>供应链数字+金融平台</h4>
      </div>
      <div class="header-right">
        <span class="username">你好，{{user}}</span>
        <el-dropdown>
          <i class="iconfont icon-icon-pscenter redlogo" style="cursor: pointer;"></i>
          <el-dropdown-menu slot="dropdown">
             <el-dropdown-item @click.native="updatePass">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
    <div class="main" ref="heightDate">
      <el-col :span="4" class="left">
        <el-menu :default-active="key" class="el-menu-vertical-demo"  :router="true" background-color="#2C2E43" :unique-opened="true" @select="handleSelect"  text-color="#fff" active-text-color="#ffd04b">

          <el-submenu index="1">

            <template slot="title"><span>采购管理</span></template>
              <el-menu-item index="/admin_view/purchasing_list">采购订单列表</el-menu-item>
              <el-menu-item index="/admin_view/add_purchase_order/add/add">新建采购订单</el-menu-item>

          </el-submenu>

          <el-submenu index="2">

            <template slot="title"><span>销售管理</span></template>
            <el-menu-item index="/admin_view/sell_order">销售订单列表</el-menu-item>
            <el-menu-item index="/admin_view/add_sell_order/add/add">新建销售订单</el-menu-item>

          </el-submenu>
          <el-submenu index="3">

            <template slot="title"><span>库存管理</span></template>
            <el-menu-item index="/admin_view/stock_list">库存列表</el-menu-item>
          </el-submenu>


          <el-submenu index="4">

            <template slot="title"><span>系统维护</span></template>
            <el-menu-item index="/admin_view/customer_list">客户名称列表</el-menu-item>
            <el-menu-item index="/admin_view/supplier_name">供应商名称</el-menu-item>
            <el-menu-item index="/admin_view/procure_entity">采购主体</el-menu-item>
            <el-menu-item index="/admin_view/goods_name">存货名称</el-menu-item>
            <el-menu-item index="/admin_view/save_classify">存货分类</el-menu-item>
            <el-menu-item index="/admin_view/save_location">存货地址</el-menu-item>
            <el-submenu index="/admin_view/add_admin/add/add">
              <template slot="title">操作员维护</template>
              <el-menu-item index="/admin_view/add_admin/add/add">增加操作员</el-menu-item>
              <el-menu-item index="/admin_view/admin_list">操作员列表</el-menu-item>
            </el-submenu>

            <!--<el-menu-item index="/admin_view/list_operations"  v-if="is_super=='1'">操作记录</el-menu-item>-->
            <el-menu-item index="/admin_view/copy_database">备份数据库</el-menu-item>
            <el-submenu index="/admin_view/list_recycle_purchase">
              <template slot="title">订单回收站</template>
              <el-menu-item index="/admin_view/list_recycle_purchase">采购订单</el-menu-item>
              <el-menu-item index="/admin_view/list_recycle_sell">销售订单</el-menu-item>
            </el-submenu>

          </el-submenu>

        </el-menu>
      </el-col>

      <el-col :span="20" class="content">
        <router-view></router-view>
      </el-col>
    </div>
   <!--修改密码-->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="old_password">
          <el-input type="password" v-model="ruleForm2.old_password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitPass">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {edit_self_password} from '../../../api/index'
  export default {
    data() {
      var validateOldPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        key:'/admin_view/purchasing_list',
        dialogFormVisible: false,
        activeIndex: '1',
        activeIndex2: '1',
        user:'',
        is_super:'0',
        is_buy:'0',
        is_sell:'0',
        is_store:'0',
        is_system:'0',
        buy_enter:'0',
        buy_check:'0',
        sell_enter:'0',
        sell_check:'0',
        super_lookover:'0',
        ruleForm2: {
          pass: '',
          checkPass: '',
          old_password:''
        },
        rules2: {
          old_password: [
            { validator: validateOldPass, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }

      }
    },
    mounted(){
      this.user=window.sessionStorage.getItem('mobile');
      this.is_super =window.sessionStorage.getItem('is_super');
      this.is_buy =Number(window.sessionStorage.getItem('buy_enter'))||Number(window.sessionStorage.getItem('buy_check'))||Number(window.sessionStorage.getItem('buy_pay_enter'))||Number(window.sessionStorage.getItem('buy_pay_check'))||Number(window.sessionStorage.getItem('buy_invoice_enter'))||Number(window.sessionStorage.getItem('buy_invoice_check'))||Number(window.sessionStorage.getItem('buy_store'));
      this.is_sell =Number(window.sessionStorage.getItem('sell_enter'))||Number(window.sessionStorage.getItem('sell_check'))||Number(window.sessionStorage.getItem('sell_pay_enter'))||Number(window.sessionStorage.getItem('sell_pay_check'))||Number(window.sessionStorage.getItem('sell_invoice_enter'))||Number(window.sessionStorage.getItem('sell_invoice_check'))||Number(window.sessionStorage.getItem('sell_return_enter'))||Number(window.sessionStorage.getItem('sell_return_check'))||Number(window.sessionStorage.getItem('sell_return_invoice_enter'))||Number(window.sessionStorage.getItem('sell_return_invoice_check'))||Number(window.sessionStorage.getItem('sell_store'));
      this.is_store =Number(window.sessionStorage.getItem('buy_store'))||Number(window.sessionStorage.getItem('sell_store'));
      this.is_system =window.sessionStorage.getItem('system_edit');
      this.super_lookover =window.sessionStorage.getItem('super_lookover');
      this.buy_enter =window.sessionStorage.getItem('buy_enter');
      this.buy_check =window.sessionStorage.getItem('buy_check');
      this.sell_enter =window.sessionStorage.getItem('sell_enter');
      this.sell_check =window.sessionStorage.getItem('sell_check');
      this.key=window.sessionStorage.getItem('keyPath');
    },
    methods: {
      handleSelect(key, keyPath) {
        this.key=keyPath[1];
        window.sessionStorage.setItem('keyPath',keyPath[1]);
      },
      updatePass(){
        this.ruleForm2.old_password='';
        this.ruleForm2.pass='';
        this.ruleForm2.checkPass='';
        this.dialogFormVisible=true;
      },
      loginOut(){
        this.$confirm('您确定要退出吗?', '退出管理平台', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
            this.$router.push({ path: '/admin_view'});
            window.sessionStorage.removeItem('session');
        }).catch(() => {

        })
      },
      submitPass(){
        var _this=this;
        var obj={};
        obj.token=window.sessionStorage.getItem('session');
        obj.old_password=this.ruleForm2.old_password;
        obj.new_password=this.ruleForm2.pass;
        edit_self_password(obj).then(function (res) {
          if(res.data.errcode==0){
            _this.$message({
              message: '修改成功',
              type: 'success'
            });
            _this.dialogFormVisible=false;
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
  };
</script>

<style scoped>
/*@import "../../../style/admin_main.css";*/
.container{
  height:100%;
  display: flex;
  flex-direction: column;
  min-width:780px;
}
header{
  box-sizing:border-box;
  color: #fff;
  padding:15px 20px;
  background-color: #01A89E;
  text-align: left;
  font-size:16px;
}
.header-left{
  display: inline-block;
}
.header-right{
  text-align: right;
  display: inline-block;
  float:right;
  padding-right:20px;
}
.main{
  flex:1;
  overflow: hidden;
  background: #545C64;
}

.left{
  height:100%;
  overflow-y: scroll;
  background: #2C2E43;
}
.el-menu{
  overflow: hidden;
  border-right:1px solid #2C2E43;

}
.el-menu li{
  text-align: left;
}
.el-submenu__title * {
  font-size: 15px;
}
.el-submenu .el-menu-item {
  font-size: 15px;
}
.el-menu-item {
  font-size: 15px;
}
.el-submenu__title {
  font-size: 15px;
}
header h4{
  margin-top:7px;
  display: inline-block;
}
.logo{
  width:65px;
  vertical-align: middle;
  margin-right:10px;
}
.redlogo {
  font-size:30px;
  color: #fff;
  border-radius: 50%;
  margin-right: 10px;
  margin-top: 3px;
  display: inline-block;
}
.content{
  overflow: scroll;
}

.redlogo{
  float: right;
  margin:0;
}
.username{
  float: left;
  color: rgb(255, 255, 255);
  display: inline-block;
  height: 33px;
  line-height: 33px;
  font-size: 16px;
  margin-right: 10px;
}
.el-submenu__title i{
  color: #fff;
  font-size: 16px;
}

i.el-submenu__icon-arrow{
  color: #fff;
  font-size: 16px;
}
.el-button--success{
  background: #01A89E;
  border:1px solid #01A89E;
}
.el-button--success:hover{
  background: #41c5bd;
  border:1px solid #41c5bd;
}
.el-button--danger{
  background: #FF6A7C;
}
.el-button--danger:hover{
  background: #F97F8E;
}
.impot-btn{
  margin-top:50px;
  text-align: right;
}
.el-table thead tr  {
  background: #EDEEF2;
}

.el-range-editor.el-input__inner{
  width:390px!important;
}

.el-submenu__title i{
  color:#fff !important;
}

.el-menu-item i{
  color: #ffffff !important;
}
i.el-submenu__icon-arrow ,i.el-icon-arrow-down{
  display: none!important;
}
i.el-submenu__icon-arrow{
  display: none!important;
}
i.el-icon-arrow-down{
  display: none!important;
}
.el-menu.el-menu-vertical-demo .el-submenu .el-menu-item .el-submenu__icon-arrow, .el-menu.el-menu-vertical-demo .el-submenu__title {
  color: #fff!important;
}
.el-icon-arrow-down:before {
  content: "\271A"!important;
  color: #b5b4c2!important;
  font-size:16px!important;
}
.el-menu-item{
  color: #b5b4c2 !important;
}
</style>
