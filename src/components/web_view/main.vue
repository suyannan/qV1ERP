<template>
  <div class="container">
    <div class="user-header">
      <div class="con_width">
        <span>你好，{{user}}</span><span class="line"></span>
        <router-link class="my-order" to="/main">我的订单</router-link><span class="line"></span>
        <router-link class="my-order" to="/editRegister/modify">修改资料</router-link>
        <span class="line"></span><span class="login-out" @click="loginout()">退出</span>
      </div>
    </div>
    <header class="container_header clearfix">
      <div class="con_width clearfix">
        <div class="container_left" style="color: #333;"><a :href="href"><img src="../../assets/log.png" alt=""
                                                                                style="margin-right:15px;height: 33px;float: left;"></a><span
          style="float: left;margin-top: 9px;">供应链数字+金融平台</span></div>
        <div class="container_right"><i class="iconfont icon-dianhua" style="font-size: 40px;color: #1F88E4;"></i>
          <div style="display:inline-block;margin-left: 15px;"><p
            style="font-size: 15px;color:#333;margin-bottom: 4px;">联系电话</p>
            <p style="color: #1F88E4;font-size: 15px;">4000-1000-100</p></div>
        </div>
      </div>
    </header>
    <main style="background: #EDEEF2;">

      <router-view></router-view>

    </main>
    <!--    <footer class="footer">
          Copyright 2017-2037北京V1有限公司
        </footer>-->

  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: '',
        href:''
      }
    },
    created() {
      this.user = window.sessionStorage.getItem('web_username');
      this.href=location.href.split('#')[0]+'#/main';
    },
    methods: {
      loginout() {
        this.$router.push('/');
        sessionStorage.removeItem('web_token');
      }
    }

  }
</script>


<style scoped>
  @import "../../style/web_index.css";

</style>
