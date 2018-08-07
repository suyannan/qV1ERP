<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  created(){
    String.prototype.trim = function() {
      var str = this,
        str = str.replace(/^\s\s*/, ''),
        ws = /\s/,
        i = str.length;
      while (ws.test(str.charAt(--i)));
      return str.slice(0, i + 1);
    };
  }
}
</script>

<style>
  @import "style/index.css";
  @import 'iconfont/iconfont.css';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #333;
    /*margin-top: 60px;*/
  }
  *{
    margin:0;
    padding:0;
    box-sizing: border-box;
  }
  button{
    color: #fff;
  }
  .self-table{
    margin-bottom:35px;
  }
  .self-table h4{
    text-align: left;
  }
  .detail-add-btn{
    margin-top:15px;
  }
  body,html,#app{
    height:100%;
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
  .el-submenu.is-active.is-opened .el-menu-item{
    background: #222;
  }
  .el-table th {
    text-align: center!important;
  }
  .el-form-item{
    margin-bottom: 10px;
  }
</style>
