<template>
  <div class="container">
    <header class="container_header clearfix" >
      <div class="con_width clearfix">
        <div class="container_left">供应链数字+金融平台</div>
        <div class="container_right"><i class="iconfont icon-lianxidianhua" style="font-size: 20px;color: #00a99d;"></i><p style="display:inline-block;margin-left: 15px;">联系电话：4000-1000-100</p></div>
      </div>
    </header>

    <div class="main">
      <div class="con_width">

          <h1 class="login_header">用户注册</h1>
          <!--表单上传-->
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-position="left" label-width="120px" class="demo-ruleForm">

            <div class="main_con" style="width: 650px;margin-top: 30px">
              <el-form-item label="请输入手机号" prop="mobile">
                <el-input type="tel" v-model="ruleForm2.mobile" ></el-input>
              </el-form-item>

              <el-form-item label="请输入名称 " prop="username">
                <el-input type="tel" v-model="ruleForm2.username"></el-input>
              </el-form-item>

              <el-form-item label="请输入密码" prop="password">
                <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
              </el-form-item>

              <el-form-item label="再次输入密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
              </el-form-item>

              <el-form-item label="公司名称" prop="companyname">
                <el-input  v-model="ruleForm2.companyname"></el-input>
              </el-form-item>

              <el-form-item label="公司邮箱" prop="companyemail" >
                <el-input v-model="ruleForm2.companyemail" type="email"></el-input>
              </el-form-item>

              <el-form-item label="联系人姓名" prop="linkman_name">
                <el-input v-model="ruleForm2.linkman_name"></el-input>
              </el-form-item>

              <el-form-item label="联系人电话" prop="linkman_mobile">
                <el-input v-model="ruleForm2.linkman_mobile"></el-input>
              </el-form-item>

            </div>

            <div class="con_width">
              <ul class="upload_imgs" style="overflow: hidden;">
                <li class="block">
                  <upload :uploadUrl="uploadUrl" v-model="ruleForm2.yyzz_pic" :type="'a'" @getpic="getpicname"></upload>
                  <span class="demonstration">营业执照副本：上传复印件盖章扫描件</span>
                </li>
                <li class="block">
                  <upload :uploadUrl="uploadUrl" v-model="ruleForm2.zzjgdm_pic" :type="'b'" @getpic="getpicname"></upload>
                  <span class="demonstration">组织机构代码证：上传复印件盖章扫描件</span>
                </li>
                <li class="block">
                  <upload :uploadUrl="uploadUrl" v-model="ruleForm2.swdi_pic" :type="'c'" @getpic="getpicname"></upload>
                  <span class="demonstration">税务登记证：上传复印件盖章扫描件</span>
                </li>
                <li class="block">
                  <upload :uploadUrl="uploadUrl" v-model="ruleForm2.ybnsrzg_pic" :type="'d'" @getpic="getpicname"></upload>
                  <span class="demonstration">一般纳税人资格证书：上传复印件盖章扫描件</span>
                </li>
                <li class="block">
                  <upload :uploadUrl="uploadUrl" v-model="ruleForm2.khxk_pic" :type="'e'" @getpic="getpicname"></upload>
                  <span class="demonstration">开户许可证：上传复印件盖章扫描件</span>
                </li>

              </ul>

              <el-form-item>
                <el-button style="margin-left: -100px;" type="primary" @click="submitForm('ruleForm2')">注册</el-button>
              </el-form-item>
            </div>

          </el-form>

          <!--多图片上传-->

        </div>

    </div>
  </div>
</template>

<script>
  import UploadImg from './sell_manage/uploadImg.vue'
  import {uploadImg,apply_create_user} from '../../api/web_index'
  import config from '../../api/web_config'

  export default {
    components:{
      upload:UploadImg
    },
    created(){

      this.uploadUrl=config.uploadImg;
      var _this=this;
      _this.$router.push('/uploadImg');
    },
    data() {
      var checkTel = (rule, value, callback)=>{
        var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (!value) {
          return callback(new Error('请输入手机号'));
        }else{
            if(!reg.test(value)){
              callback(new Error('手机号格式不正确'));
            }
            callback();
        }
      };
      var checkTel2 = (rule, value, callback)=>{
        var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (!value) {
          return callback(new Error('请输入联系人手机号'));
        }else{
          if(!reg.test(value)){
            callback(new Error('手机号格式不正确'));
          }
          callback();
        }
      };

      var checkName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入公司名称'));
        } else {
          callback();
        }
      };

      var checkEmail = (rule,value,callback)=>{
        var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          if(value ==''){
              callback(new Error('请输入公司邮箱'));
          }else{
              if(!emailRE.test(value)){
                callback(new Error('邮箱格式不正确'));
              }
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

      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

     /* var checkTroName = (rule, value,callback)=>{
        if (value === '') {
          callback(new Error('请输入联系人姓名'));
        } else {

          callback();
        }
      };

      var checkTroTel = (rule,value,callback)=>{
        if (value === '') {
          callback(new Error('请输入联系人电话'));
        } else {

          callback();
        }
      };*/

      return {
          a:'',
          b:'',
          c:'',
          d:'',
          e:'',
        sMessage:'',
        uploadfile:'',
        picData:'',
        picUrl:'',
        addClearSrc:0,
        images: [],
        dialogFormVisible:false,
        formLabelWidth:'120px',
        dialogTitle:'',
        ruleForm2: {
          mobile:'',
          username: '',
          password: '',
          companyname:'',
          companyemail:'',
          linkman_name:'',
          linkman_mobile:'',
          yyzz_pic:'',
          zzjgdm_pic:'',
          swdi_pic:'',
          ybnsrzg_pic:'',
          khxk_pic:'',
        },
        yyzz_pic1:'1',
        zzjgdm_pic1:'1',
        swdi_pic1:'1',
        ybnsrzg_pic1:'1',
        khxk_pic1:'1',
        rules2: {
          mobile:[
            { required: true, validator: checkTel, trigger: 'blur' }
          ],
          password: [
            {required: true,  validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          companyname: [
            { required: true, message: '请输入公司名称', trigger: 'blur' }
          ],
          name: [
            {required: true,  validator: checkName, trigger:'blur'}
          ],
          linkman_name:[
            {required: true, message: '请输入联系人名称', trigger: 'blur'}
          ],
          linkman_mobile:[
            {required: true, validator:checkTel2, trigger: 'blur'}
          ],
          companyemail:[
            {required: true, validator:checkEmail,trigger: 'blur'}
          ],
          linkman_name:[
            { required: true, message: '请输入联系人姓名', trigger: 'blur' }
          ],
        },
        imageUrl: ''
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            var _this = this;
//            console.log('valid',valid)
          if (valid) {

            if(this.yyzz_pic1 ==1){
              this.$message({
                message: '请上传营业执照',
                type: 'warning'
              })

            }else if(this.zzjgdm_pic1 ==1){
              this.$message({
                message: '请上传组织机构代码',
                type: 'warning'
              })
            }else if(this.swdi_pic1 ==1){
              this.$message({
                message: '请上传税务登记',
                type: 'warning'
              })
            }else if(this.ybnsrzg_pic1 ==1){
              this.$message({
                message: '请上传一般纳税人资格证',
                type: 'warning'
              })
            }else if(this.khxk_pic1 ==1){
              this.$message({
                message: '请上传开户许可',
                type: 'warning'
              })
            }else{
//                console.log('ok',this.ruleForm2)
              apply_create_user(this.ruleForm2).then(function (res) {

                if(res.data.errcode==0){
                  _this.$message({
                    message:'注册成功',
                    type: 'success'
                  })
                  _this.dialogAddFormVisible=false;
                  setTimeout(function(){
                    _this.$router.push('/')
                  },3000)

                }else{
                  _this.$message.error(res.data.errdesc);
                }
              })
            }


          } else {
//            console.log('error submit!!');
            return false;
          }

        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getpicname(data){
//        console.log('data_type',data.type);
        var _this=this;
        switch (data.type){
          case('a'):
              _this.a=data.value;
            this.ruleForm2.yyzz_pic = _this.a.filename;
            this.yyzz_pic1 = 0;
              break;
          case('b'):
              _this.b=data.value;
              this.ruleForm2.zzjgdm_pic = _this.b.filename;
              this.zzjgdm_pic1 = 0;

              break;
          case('c'):
              _this.c=data.value;
              this.ruleForm2.swdi_pic = _this.c.filename;
              this.swdi_pic1 = 0;

              break;
          case('d'):
              _this.d=data.value;
              this.ruleForm2.ybnsrzg_pic = _this.d.filename;
              this.ybnsrzg_pic1 = 0;

              break;
          case('e'):
              _this.e=data.value;
             this.ruleForm2.khxk_pic = _this.e.filename;
             this.khxk_pic1 = 0;

              break;
        }
      }
    }
  }

</script>


<style scoped>

  .login_header{
    margin-top:30px;
    margin-bottom:0px;
  }
  .demo-ruleForm{
    padding:0;
    width:auto;
  }
  .el-button--primary{
    background-color: #00a99d;
    border-color: #00a99d;
    width:250px;
    height:45px;
    margin-top:50px;
    font-size:16px;
    margin-bottom:20px;
    margin-left:-100px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 120px;
    border:1px dashed #d5d5d5;
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;
    color: #d5d5d5;
    width: 290px;
    height: 150px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 290px;
    height: 150px;
    display: block;
    border:1px dashed #d5d5d5;
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;
  }
  .demonstration{
    color: #333333;
    margin-top:20px;
    font-size:14px;
    display: inline-block;
  }


</style>
