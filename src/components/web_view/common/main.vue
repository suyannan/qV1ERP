<template>
  <el-container>
    <el-header>
      <header class="clearfix" >
      <div class="con_width clearfix">
        <div class="container_left">供应链数字+金融平台</div>
        <div class="container_right">
          <i class="iconfont icon-lianxidianhua" style="font-size: 20px;color: #00a99d;"></i>
          <p style="display:inline-block;margin-left: 15px;">联系电话：4000-1000-100</p>
          <el-button type="text" >退出</el-button>
        </div>
      </div>
    </header>
    </el-header>
    <el-main>

      <div>
        <el-button @click="new_order">添加销售订单</el-button>
        <router-view ></router-view>
      </div>
    </el-main>
    <el-footer class="footer">
     Copyright 2017-2037北京V1有限公司
    </el-footer>
  </el-container>
</template>

<script>
    export default {

      methods:{
        new_order(){
          var _this=this;
          _this.$router.push('/new_order')
        }
      }
    }
</script>


<style scoped>
  .el-header, .el-footer {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
    position: fixed;
    width:100%;
    left:0;
  }
  .el-header{
    top:0;
  }
  .el-footer{
    bottom:0;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
