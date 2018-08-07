<template>
  <div>userinfo</div>
  <!--<div>
    <el-row>
      <el-col :span="8">
        <div class="header">
          <img :src="userMess.header" alt="">
          <div>{{userMess.username}}</div>
        </div>
        <div class="a"><i class="icon iconfont icon-dianhua"></i>{{userMess.phone}}</div>
        <div class="a"><i class="icon iconfont icon-qq"></i>{{userMess.qqNum}}</div>
        <div class="a"><i class="icon iconfont icon-wx"></i>{{userMess.wxNum}}</div>
      </el-col>
      <el-col :span="16" class="right">
        <div><span>民族:</span>{{userMess.nation}}</div>
        <div><span>年龄:</span>{{userMess.age}}</div>
        <div><span>性别:</span>{{userMess.sex == 1 ? "男" : "女"}}</div>
        <div><span>党支部:</span>{{userMess.branchName}}</div>
        <div><span>专业:</span>{{userMess.special}}</div>
        <div><span>学历:</span>{{userMess.education}}</div>
        <div><span>职称:</span>{{userMess.jobRank}}</div>
        <div><span>入党时间:</span>{{userMess.joinPartyTime}}</div>
        <div><span>当前积分:</span><el-button size="mini" class="button">{{userMess.totalScore}}</el-button></div>
        <div><span>状态:</span>{{userMess.disabled == 0 ? "禁用" : "正常"}}</div>

      </el-col>
    </el-row>
  </div>-->
</template>

<script>

  export default {
    props: {
      userMess: {},
      show:''
    }
  }
</script>

<style scoped>
@import "../../iconfont/iconfont.css";
i{
  margin-right: 10px;
}
  .header{

    text-align: center;
    margin-bottom: 30px;
  }
  .header img{
    overflow: hidden;
    width:100px;
    height:100px;
    border-radius: 50%;
    border:1px solid gainsboro;
    margin-bottom: 10px;
  }
.right div{
  margin: 10px;
}
.right div span{
  display: inline-block;
  width:60px;
  margin-right:25px;
}
  .button{
    background-color: #e4e8f1 ;
  }
  .a{
    margin:10px;
  }
</style>
