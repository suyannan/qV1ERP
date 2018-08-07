<template>
  <div>
    <common-header :title="'系统维护'" :title1="'备份数据库'"></common-header>
    <div class="page-content">
      <!--<common-header-tilte :title2="'备份数据库'"></common-header-tilte>-->
      <div>
        <p style="color: red;font-size: 14px;">建议每周备份一次</p>
        <span v-if="is_super==1">
           <a class="button" href="http://114.112.175.138/test.php" >导出备份</a>
        </span>
        <span v-else>
            <el-button type="primary" disabled>导出备份</el-button>
        </span>

      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../common/common_header.vue'
  import Header2 from '../common/common_headerTitle.vue'
    export default {
      components:{
        'common-header':Header,
        'common-header-tilte':Header2
      },
      created(){
        this.super_lookover = window.sessionStorage.getItem('super_lookover');
        this.is_super = window.sessionStorage.getItem('is_super');

      },
      data(){
        return{
          super_lookover:'',
          is_super:'',
        }
      }

    }
</script>


<style scoped>
  .button{
    background: #409EFF;
    border-radius: 5px;
    color: #fff;
    height: 35px;
    line-height: 35px;
    font-size: 15px;
    width: 85px;
    display: inline-block;
    text-decoration: none;
  }
  .button1{
    border:none;
  }
  .button1:hover{
    background: rgba(64, 158, 255, 0.8);
  }
</style>
