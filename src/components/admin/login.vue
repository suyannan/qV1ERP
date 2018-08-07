<template>
<!--  <div class="box">

    <header><img src="../../image/logo.png" alt=""></header>
    <div class="text">系统登录</div>
    <el-form label-width="80px" class="self-form">

      <el-input v-model="user.username" placeholder="账号" class="same-col"></el-input>


      <el-input v-model="user.password" placeholder="密码" class="same-col"></el-input>


      <el-col :span="16" class="same-col">
        <el-input v-model="user.checkcode" placeholder="验证码" x></el-input>
      </el-col>
      <el-col :span="2" class="same-col">
      </el-col>
      <el-col :span="6" class="same-col">
        <img :src="src" alt="" @click="imgChange">
      </el-col>


      <el-button type="primary" @click="sureLogin" size="large" class="login-button" v-if="!isLoading">登录</el-button>
      <el-button type="primary" :loading="isLoading" class="login-button" v-if="isLoading">加载中</el-button>
    </el-form>
  </div>-->
  <!--<div class="login">
    <input type="text" v-model="username">
    <input type="text" v-model="password">
    <input type="text" v-model="checkcode">
    <img :src="src" @click="imgChange">
    <button @click="login">登录</button>
  </div>-->
</template>

<script>
  import {login} from '../../api/index'  //接口方法
  import axios from 'axios'              //用这种方式调用接口
  import config from '../../api/config'  //接口路径
//  axios.defaults.withCredentials = true;  //允许跨域


  export default {
    data(){
      return {
        user: {
          username: 'admin',
          password: '123456',
          checkcode: ''
        },
        src: config.checkCode + '?' + Date.now(),
        isLoading: false
      }

    },
    methods: {
      imgChange(){
        this.src = config.checkCode + '?' + Date.now()
      },
      sureLogin(){
        this.isLoading = true;
        var _this = this;
        login(_this.user).then(function (res) {
          _this.isLoading = false;
          if (res.data.code == 1) {
            _this.$router.push('/home')

          }
        });
      }
    }
  }


</script>

<style scoped>

  .box {
    width: 400px;
    height: 400px;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    box-shadow: 10px 10px 10px lightgray;

  }

  .box header {
    background-color: dodgerblue;
    height: 40px;
    padding: 10px;
  }

  .box header img {
    height: 100%;
  }

  .self-form {
    padding: 0 30px;
  }

  .same-col {
    padding: 10px 0;
  }

  .text {
    text-align: center;
    padding: 15px 0;
  }

  .login-button {
    display: block;
    width: 100%;
    margin-top: 80px;
  }

</style>
