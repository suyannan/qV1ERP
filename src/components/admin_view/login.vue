<template>

  <div class="container" style="height: 93%;">
    <header class="container_header clearfix" >
      <div class="con_width clearfix">
        <div class="container_left"  style="color: #333;"><img src="../../assets/log.png" alt="" style="margin-right:15px;height: 33px;float: left;"><span style="float: left;margin-top: 9px;">供应链数字+金融平台</span></div>
        <div class="container_right"><i class="iconfont icon-dianhua" style="font-size: 40px;color: #1F88E4;"></i><div style="display:inline-block;margin-left: 15px;"><p style="font-size: 15px;color:#333;margin-bottom: 4px;">联系电话</p><p style="color: #1F88E4;font-size: 15px;">4000-1000-100</p></div></div>
      </div>
    </header>

    <div class="main" style="background: #EEEEEE;">
      <div class="con_width" >
        <div class="main_con" style="padding: 40px;">
          <h1 class="login_header" style="color: #00A99D;">欢迎登录</h1>
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm">

            <el-form-item label="账号" prop="mobile">
              <el-input v-model="ruleForm2.mobile"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password" style="margin-bottom: 10px;">
              <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
            </el-form-item>

            <div style="text-align: left;margin-left: 80px;margin-top: 10px;">
              <el-checkbox v-model="checked" >记住密码</el-checkbox>
            </div>

            <el-form-item style="position: relative;">
              <el-button type="primary" class="login-button" @click="submitForm('ruleForm2')" v-if="!isLoading">登录</el-button>
              <el-button type="primary" :loading="isLoading" class="login-button" v-if="isLoading">加载中</el-button>
            </el-form-item>

          </el-form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {adminLogin} from '../../api/index'
  export default {
    created(){
      var _this=this;
      document.onkeydown=function (e) {
        if(e.key=='Enter'){
          _this.submitForm('ruleForm2');
        }
      }
    },
    data() {

      var checkName = (rule,value,callback)=>{
        if(value==''){
          callback(new Error('请输入账号'));
        }else{
          callback();
        }
      };

      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };

      return {
        checked:true,
        ruleForm2: {
          mobile: '',
          password: ''
        },
        rules2: {
          mobile: [
            {validator: checkName,trigger:'blur'}
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ]
        },
        isLoading: false
      };
    },
    methods: {
      submitForm(formName) {
        var _this = this;

        //判断复选框是否被勾选 勾选则调用配置session方法
        if(this.checked){
          /*保存的账号*/
          window.sessionStorage.setItem('mobile',this.ruleForm2.mobile);

          /*保存的密码*/
          window.sessionStorage.setItem('password',this.ruleForm2.password);
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isLoading = true;

            //接口
            adminLogin(_this.ruleForm2)
            .then(function (res) {
              _this.isLoading = false;
              if (res.data.errcode == 0) {
                window.sessionStorage.setItem('session',res.data.data.token);
                window.sessionStorage.setItem('userId',res.data.data.id);
                window.sessionStorage.setItem('buy_check',res.data.data.buy_check);/*采购审核权限*/
                window.sessionStorage.setItem('buy_enter',res.data.data.buy_enter);/*采购录入删除*/
                window.sessionStorage.setItem('sell_check',res.data.data.sell_check);/*销售审核权限*/
                window.sessionStorage.setItem('sell_enter',res.data.data.sell_enter);/*销售录入删除*/
                window.sessionStorage.setItem('system_edit',res.data.data.system_edit);/*系统维护录入和删除*/
                window.sessionStorage.setItem('is_super',res.data.data.is_super);/*超级管理员权限*/
                window.sessionStorage.setItem('buy_pay_enter',res.data.data.buy_pay_enter);/*采购付款编辑权限*/
                window.sessionStorage.setItem('buy_pay_check',res.data.data.buy_pay_check);/*采购付款审核权限*/
                window.sessionStorage.setItem('buy_invoice_enter',res.data.data.buy_invoice_enter);/*采购开票编辑权限*/
                window.sessionStorage.setItem('buy_invoice_check',res.data.data.buy_invoice_check);/*采购开票审核权限*/
                window.sessionStorage.setItem('buy_store',res.data.data.buy_store);/*采购入库权限*/
                window.sessionStorage.setItem('sell_pay_enter',res.data.data.sell_pay_enter);/*销售付款编辑权限*/
                window.sessionStorage.setItem('sell_pay_check',res.data.data.sell_pay_check);/*销售付款审核权限*/
                window.sessionStorage.setItem('sell_invoice_enter',res.data.data.sell_invoice_enter);/*销售开票编辑权限*/
                window.sessionStorage.setItem('sell_invoice_check',res.data.data.sell_invoice_check);/*销售开票审核权限*/
                window.sessionStorage.setItem('sell_store',res.data.data.sell_store);/*销售出库权限*/
                window.sessionStorage.setItem('sell_return_enter',res.data.data.sell_return_enter);/*销售退货编辑权限*/
                window.sessionStorage.setItem('sell_return_check',res.data.data.sell_return_check);/*销售退货审核权限*/
                window.sessionStorage.setItem('sell_return_invoice_enter',res.data.data.sell_return_invoice_enter);/*销售退货开票编辑权限*/
                window.sessionStorage.setItem('sell_return_invoice_check',res.data.data.sell_return_invoice_check);/*销售退货开票审核权限*/
                window.sessionStorage.setItem('super_lookover',res.data.data.super_lookover);/*超级管理员查看权限*/
                window.sessionStorage.setItem('keyPath','/admin_view/purchasing_list');
                _this.$router.push('/admin_view/purchasing_list');
              }else{
                _this.$message({
                  message: res.data.errdesc,
                  type: 'warning'
                });
                this.ruleForm2.mobile='';
                this.ruleForm2.password='';

              }
            })
            .catch(function (res) {
              console.log(res)
            })

          } else {
            console.log('error submit!!')
            return false
          }
        });
      },
      getSession:function(){
        if(this.checked) {
          this.ruleForm2.mobile = window.sessionStorage.getItem('mobile');
          this.ruleForm2.password = window.sessionStorage.getItem('password');
        }else{
          this.ruleForm2.mobile = '';
          this.ruleForm2.password = '';
        }

      }
    },
    /*页面加载调用获取session值*/
    mounted(){
      this.getSession();
    }
  }
</script>

<style scoped>
  header{
    background: #fff;
    padding:19px 0;
    /*border-bottom:1px solid #ccc;*/
  }
  .container_header{
    line-height:1;
    /*border-bottom:transparent;*/

  }
  .container_header{
    padding: 0;

  }
  .con_width{
    padding:15px 0px;
    width:100%;
    height:100%;
  }
  .login_header{
    margin:24px auto;
  }
  .main_con{
    width:460px;

  }

  .main{
    background: #fff;
    width:100%;
    height:100%;
  }
  .el-form-item{
    text-align: left;
  }
  .demo-ruleForm{
    padding:10px;
    width:360px;
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;
    border:1px solid #ccc;
    padding: 45px 64px 20px 0px;
    background: #fff;
  }
  .el-button--primary{
    background-color: #00a99d;
    border-color: #00a99d;
    width:100%;
    height:40px;
    margin-top:15px;
    font-size:16px;
    margin-bottom:0px;
  }
  .login_header{
    font-size:26px;
  }
</style>
