<template>
<div>
<div>abc</div>
  <div v-show="src==''" class="add-img img-box" @click="uploadInput()">
   <i class="el-icon-plus"></i>
  </div>
  <div class="img-box" @click="uploadInput()" v-show="src!=''">
    <img :src="src" alt="" ref="img">
  </div>
  <input type="file" ref="file"  v-on:change="upload()" hidden>
</div>
</template>
<script>
  import config from '../../../api/web_config'
  import axios from 'axios'
/* axios.defaults.withCredentials = true;*/
  import {uploadImg} from '../../../api/web_index'
    export default {
      props:{
        type:''
      },
      data(){
        return {
          file:'',
          src:'',
          params:{
            uploadfile:''
          }
        }
      },
      created(){
        //console.log(this.src);
      },
      methods:{
        uploadInput(){
          this.$refs.file.click();
        },
        upload(){
          var _this=this;
          if(this.$refs.file.files.length==0){
            return;
          }
          var reader=new FileReader();
          reader.readAsDataURL(this.$refs.file.files[0]);
          reader.onload=function () {
            _this.src=this.result;
          };
          var formData = new FormData();
          formData.append('uploadfile',this.$refs.file.files[0]);
          //console.log('rr',formData);
          _this.params.uploadfile = this.$refs.file.files[0];
          //console.log('params',_this.params);
          //console.log('uploadImg',uploadImg);
          uploadImg(this.params).then(function (res) {
              var obj={};
              console.log('type',_this.type);
              obj['type']=_this.type;
              obj.value=res.data.data;
            _this.$emit('getpic',obj);
          }).catch(function (err) {
            console.log(err);
          })

        }
      },
      watch:{
        srcFromParent(n,o){
          this.src=n;

        },
        addClearSrc(n,o){
          this.src='';
        }
      }
    }
</script>
<style scoped="">
.add-img{
  border:1px dashed #aaa;
  line-height:170px;
  text-align: center;
}
.img-box{
  width:150px;
  height:150px;
  overflow: hidden;
}
.add-img:hover{
  border:1px dashed #1e90ff;
}
.add-img i{
    font-size:50px;
  }
.img-box img{
    width:100%;
  }
</style>
