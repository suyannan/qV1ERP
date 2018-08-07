<template>
<div>
  <div v-show=" src==''" class="add-img img-box" @click="uploadInput()">
   <i class="iconfont icon-tianjiazhaopian"></i>
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
        srcFromParent:{
          type:String,
          type:String,
          default:''
        },
        uploadUrl:{
          type:String,
          default:''
        },
        addClearSrc:{},
        type:''
      },
      data(){
        return {
          file:'',
          src:''
        }
      },
      mounted(){
        var _this=this;
        this.src = _this.srcFromParent;
      },
      methods:{
        uploadInput(){
            //console.log('this.$refs.file',this.$refs.file)
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
             //console.log('_this.src',_this.src);
            _this.src=this.result;

          };

          var formData = new FormData();

          formData.append('uploadfile',this.$refs.file.files[0]);

          //console.log('rr',this.$refs.file.files[0])
          axios.post(_this.uploadUrl,formData).then(function (res) {

              if(res.data.errcode==1){
                _this.$message({
                  message: '上传图片失败，请重新上传',
                  type: 'warning'
                });
                  return false;
              }else{
                var obj={};
                //console.log('type',_this.type);
                obj['type']=_this.type;
                obj.value=res.data.data;
                //console.log('obj',obj)
                _this.$emit('getpic',obj);
                return true;
              }

          }).catch(function (err) {
            console.log(err);
          })
        }
      },
      watch:{
        srcFromParent(n,o){
          this.src=n;
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
  margin:0 auto;
  max-width:232px;
  height:150px;
  overflow: hidden;
}
.add-img:hover{
  border:1px dashed #1e90ff;
}
.add-img i{
  font-size: 73px;
  color: #9ea4b1;
  }
.img-box img{
    width:100%;
    height:100%;
  }
</style>
