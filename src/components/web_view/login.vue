<template>

  <div class="container">
      <header class="container_header clearfix" >
        <div class="con_width clearfix">
          <div class="container_left"  style="color: #333;"><img src="../../assets/log.png" alt="" style="margin-right:15px;height: 33px;float: left;"><span style="float: left;margin-top: 9px;">供应链数字+金融平台</span></div>
          <div class="container_right"><i class="iconfont icon-dianhua" style="font-size: 40px;color: #1F88E4;"></i><div style="display:inline-block;margin-left: 15px;"><p style="font-size: 15px;color:#333;margin-bottom: 4px;">联系电话</p><p style="color: #1F88E4;font-size: 15px;">4000-1000-100</p></div></div>
        </div>
      </header>

      <div class="main" ref="mainHeight">
        <div class="con_width" style="position: relative;height: 100%;">
          <div class="clearfix posi_div" ref="posiHeight">
            <div style="width: 50%;float:left">
              <img src="../../assets/login_pic.png" alt="" style="width:100%;">
            </div>
            <div style="width: 50%;float:right">
              <div class="right_div">
                <div class="main_con">
                  <h1 class="login_header">登录</h1>
                  <form action="">
                    <div class="login_group clearfix  Form-Item">
                      <i class="iconfont icon-shouji container_left" style="color: #C1BEBE;"></i>
                      <input type="text" v-model="user.companyname" required="true" placeholder="请输入公司名称">
                    </div>
                    <div class="login_group clearfix" >
                      <i class="iconfont icon-mima container_left" style="color: #C1BEBE;"></i>
                      <input type="password" v-model="user.password" required="true" placeholder="请输入密码" auto-complete="off">
                    </div>
                    <div class="clearfix">
                      <div class="container_left" >
                        <el-checkbox v-model="checked" >记住密码</el-checkbox>
                      </div>
                      <!--<div class="container_right" >
                        <span type="text" style="font-size:14px;color: #333;cursor:pointer" >忘记密码？</span>
                      </div>-->

                    </div>
                    <el-button type="primary"  v-if="!isLoading"  @click="login_btn">登录</el-button>
                    <el-button type="primary" :loading="isLoading" class="login-button" v-if="isLoading">加载中</el-button>
                  </form>

                  <!--审核失败-->
                  <div style="font-size:14px;margin-bottom: 10px;" v-if="reset_id!=''">
                    <span style="color: red;">审核失败，</span><span type="text" @click="reset_regist" style="color: #4487f3;cursor:pointer" >点击重新上传？</span>
                  </div>

                  <div style="font-size:14px;">
                    <span>还没有账号？</span><span style="color: #4487f3;cursor:pointer" @click="register_btn">免费注册！</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="text-align: center;background:#fff;height: 80px;line-height: 80px;position: fixed;bottom: 0;width: 100%;"> Copyright 2017-2037北京V1有限公司</div>
  </div>

</template>

<script>
  import {login} from '../../api/web_index'

  export default {
    created(){
      var _this=this;
      document.onkeydown=function (e) {
        if(e.key=='Enter'){
          _this.login_btn();
        }
      }
    },
      data() {
        return {
          checked: true,
          user: {
            companyname: '',
            password: ''
          },
          isLoading: false,
          reset_id:'',
          reset_token:'',
          refuse_reson:''
        };
      },
      mounted(){
        var winHeight = document.documentElement.clientHeight;
        this.$refs.mainHeight.style.height= (winHeight-85)+'px';
        this.$refs.posiHeight.style.marginTop= -(490/2)+'px';
        this.user.companyname=window.sessionStorage.getItem('web_username');
        this.user.password=window.sessionStorage.getItem('web_password');
      },
      methods: {
        login_btn(){
          var _this = this;

          if(this.user.companyname ==''){
            this.$message({
              message: '账户名不能为空',
              type: 'warning'
            });
          }else if(this.user.password ==''){
            this.$message({
              message: '密码不能为空',
              type: 'warning'
            });
          }else{
            if(this.checked){
              window.sessionStorage.setItem('web_username',this.user.companyname);
              window.sessionStorage.setItem('web_password',this.user.password);
            }else{

              window.sessionStorage.setItem('web_username','');
              window.sessionStorage.setItem('web_password','');
              this.user.companyname='';
              this.user.password='';

            }

            this.user.companyname=window.sessionStorage.getItem('web_username');
            this.user.password=window.sessionStorage.getItem('web_password');

            login(this.user).then(function(res){
                if(res.data.errcode==0){
                  _this.$message({
                    message: '登录成功',
                    type: 'success'
                  });

                  window.sessionStorage.setItem('web_token',res.data.data.token);
                  window.sessionStorage.setItem('web_user',res.data.data.username);
                  window.sessionStorage.setItem('web_lose_id',res.data.data.id);
                  window.sessionStorage.setItem('web_lose_token',res.data.data.token);

                  setTimeout(function(){
                    _this.$router.push('/main')
                  },1000)

                }else if(res.data.errcode==2){

                  _this.$message({
                    message: res.data.errdesc,
                    type: 'error'
                  });

                  //审核失败后获取用户自己的ID和session，以便后期修改信息，重新审核
                  _this.reset_id =res.data.data.id;
                  _this.reset_token = res.data.data.token;
                  _this.refuse_reson = res.data.data.refuse_reason;

                  //获取用户自己的ID和session，以便后期修改信息，重新审核
                   window.sessionStorage.setItem('web_lose_id',_this.reset_id);
                   window.sessionStorage.setItem('web_lose_token',_this.reset_token);
                   window.sessionStorage.setItem('web_refuse_reson',_this.refuse_reson);
                }else{

                  _this.$message({
                    message: res.data.errdesc,
                    type: 'error'
                  });

                }
            }).catch(function (err) {
              console.log(err);
            })

          }

        },
        register_btn(){
          this.isLoading = true;
          var _this = this;
          _this.isLoading = false;
          _this.$router.push('/web_view/register')
        },
        reset_regist(){
          var _this =this;
          _this.$router.push({'name':'editRegister',params:{'type':'registerAgain'}});
        },
      }
    }
</script>

<style scoped>
  header{
    background: #fff;
    padding:19px 0;
  }
  .container_header{
    line-height:1;
    border-bottom:transparent;

  }
  .main{
    background: #EBF6FF;
  }
  .posi_div{
    position: absolute;
    top:50%;
    width:100%;
  }
  .left_div{
    float: left;
    width:50%;
  }
  .left_div img{
    width:90%;
    margin-top:15%;
  }
  .right_div{
    width:380px;
    top:50%;
    float: right;
    background: #fff;
    /*border:1px solid #dcdcdc;*/
    padding:20px 30px;
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;
    -webkit-box-shadow: 0 0 50px #dcdcdc ;
    -moz-box-shadow: 0 0 50px #dcdcdc ;
    box-shadow: 0 0  50px #dcdcdc ;
  }
  .el-button--primary{
    background-color: #1F88E4;
    border-color: #1F88E4;
    width:250px;
    height:45px;
    margin-top:35px;
    font-size:16px;
    margin-bottom:30px;
  }
  .login_group input{
    width:100%;
  }
  form{
    border-bottom:1px solid #dcdcdc;
    margin-bottom:15px;
  }
</style>
