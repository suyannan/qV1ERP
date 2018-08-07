<template>
  <div class="container">
    <header class="container_header clearfix">
      <div class="con_width clearfix">
        <div class="container_left" style="color: #333;"><img src="../../assets/log.png" alt=""
                                                              style="margin-right:15px;height: 33px;float: left;"><span
          style="float: left;margin-top: 9px;">供应链数字+金融平台</span></div>
        <div class="container_right"><i class="iconfont icon-dianhua" style="font-size: 40px;color: #1F88E4;"></i>
          <div style="display:inline-block;margin-left: 15px;"><p
            style="font-size: 15px;color:#333;margin-bottom: 4px;">联系电话</p>
            <p style="color: #1F88E4;font-size: 15px;">4000-1000-100</p></div>
        </div>
      </div>
    </header>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">

    </el-dialog>
    <div class="main" style="background:#EDEEF2">
      <div class="con_width" style="padding-top: 30px;">

        <!--表单上传-->
        <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-position="left" label-width="140px"
                 class="demo-ruleForm">
          <div class="con_width" style="background: #fff;margin: 0 auto;padding: 30px 0 10px;width: 100%;">
            <h1 class="login_header"
                style="margin-top: 0px;text-align: left;font-size: 18px;width: 90%;padding-bottom: 15px;margin: 0 auto;border-bottom: 1px solid #E1E1E1;">
              用户信息修改
              <el-button size="small" type="warning" v-if="reason_button" style="float: right;" @click=checkResult()>
                查看拒绝理由
              </el-button>
            </h1>
            <div>
              <div class="main_con" style="width: 500px;margin:0 auto;margin-top: 30px">
                <el-form-item label="请输入手机号" prop="mobile">
                  <el-input type="tel" v-model="ruleForm2.mobile"></el-input>
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
                  <el-input v-model="ruleForm2.companyname"></el-input>
                </el-form-item>

                <el-form-item label="公司邮箱" prop="companyemail">
                  <el-input v-model="ruleForm2.companyemail" type="email"></el-input>
                </el-form-item>

                <el-form-item label="联系人姓名" prop="linkman_name">
                  <el-input v-model="ruleForm2.linkman_name"></el-input>
                </el-form-item>

                <el-form-item label="联系人电话" prop="linkman_mobile">
                  <el-input v-model="ruleForm2.linkman_mobile"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>

          <div class="con_width" style="width: 100%;">
            <div style="background: #fff;margin: 30px auto 0;padding: 30px 0 30px;">
              <p style="color: darkred;height: 50px;line-height: 50px;letter-spacing: .1em;">*三证合一的商户请上传相同的图片信息</p>
              <ul class="upload_imgs" style="overflow: hidden;">
                <li class="block">
                  <upload :uploadUrl="uploadUrl" v-model="ruleForm2.yyzz_pic" :srcFromParent="picUrl" :type="'a'"
                          @getpic="getpicname"></upload>
                  <span class="demonstration">营业执照副本：上传复印件盖章扫描件</span>
                </li>
                <li class="block">
                  <upload :uploadUrl="uploadUrl" v-model="ruleForm2.zzjgdm_pic" :srcFromParent="picUrl2" :type="'b'"
                          @getpic="getpicname"></upload>
                  <span class="demonstration">组织机构代码证：上传复印件盖章扫描件</span>
                </li>
                <li class="block">
                  <upload :uploadUrl="uploadUrl" v-model="ruleForm2.swdi_pic" :srcFromParent="picUrl3" :type="'c'"
                          @getpic="getpicname"></upload>
                  <span class="demonstration">税务登记证：上传复印件盖章扫描件</span>
                </li>
                <li class="block">
                  <upload :uploadUrl="uploadUrl" v-model="ruleForm2.ybnsrzg_pic" :srcFromParent="picUrl4" :type="'d'"
                          @getpic="getpicname"></upload>
                  <span class="demonstration">一般纳税人资格证书：上传复印件盖章扫描件</span>
                </li>
                <li class="block">
                  <upload :uploadUrl="uploadUrl" v-model="ruleForm2.khxk_pic" :srcFromParent="picUrl5" :type="'e'"
                          @getpic="getpicname"></upload>
                  <span class="demonstration">开户许可证：上传复印件盖章扫描件</span>
                </li>
                <li class="block">
                  <upload :uploadUrl="uploadUrl" v-model="ruleForm2.kpxx_pic" :srcFromParent="picUrl5" :type="'f'"
                          @getpic="getpicname"></upload>
                  <span class="demonstration">开票信息：上传复印件盖章扫描件</span>
                </li>
              </ul>

              <el-form-item style="margin: 0 auto;text-align: center;">
                <el-button style="margin-left: -170px;" type="primary" @click="submitForm('ruleForm2')">保存</el-button>
              </el-form-item>
            </div>
          </div>

        </el-form>

        <!--多图片上传-->

      </div>

    </div>
  </div>
</template>

<script>
  import UploadImg from './sell_manage/uploadImg.vue'
  import {uploadImg, apply_update_user_account, get_user_detail} from '../../api/web_index'
  import config from '../../api/web_config'

  export default {
    components: {
      upload: UploadImg
    },
    created() {
      this.ruleForm3.token = window.sessionStorage.getItem('web_lose_token');
      this.getDataForm.id = window.sessionStorage.getItem('web_lose_id');
      this.getData();
      this.uploadUrl = config.uploadImg;
    },
    data() {
      /*表单校验方法*/
      var checkTel = (rule, value, callback) => {
        var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (!value) {
          return callback(new Error('请输入手机号'));
        } else {
          if (!reg.test(value)) {
            callback(new Error('手机号格式不正确'));
          }
          callback();
        }
      };
      var checkTel2 = (rule, value, callback) => {
        var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (!value) {
          return callback(new Error('请输入联系人手机号'));
        } else {
          if (!reg.test(value)) {
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

      var checkEmail = (rule, value, callback) => {
        var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (value == '') {
          callback(new Error('请输入公司邮箱'));
        } else {
          if (!emailRE.test(value)) {
            callback(new Error('邮箱格式不正确'));
          }
          callback();
        }
      };

      var validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };

      var validatePass2 = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        a: '',
        b: '',
        c: '',
        d: '',
        e: '',
        f: '',
        reason_button: false,
        web_refuse_reson:'',
        sMessage: '',
        uploadfile: '',
        picData: '',
        picUrl: '',
        picUrl2: '',
        picUrl3: '',
        picUrl4: '',
        picUrl5: '',
        addClearSrc: 0,
        images: [],
        dialogFormVisible: false,
        formLabelWidth: '120px',
        dialogTitle: '',
        ruleForm2: {  //表单提交
          token: '',
          mobile: '',
          username: '',
          password: '',
          checkPass: '',
          companyname: '',
          companyemail: '',
          linkman_name: '',
          linkman_mobile: '',
          yyzz_pic: '',
          zzjgdm_pic: '',
          swdi_pic: '',
          ybnsrzg_pic: '',
          khxk_pic: '',
          kpxx_pic: '',
        },
        ruleForm3: {
          "token": ''
        },
        getDataForm: { //获取所有值
          id: ''
        },
        yyzz_pic1: '0',
        zzjgdm_pic1: '0',
        swdi_pic1: '0',
        ybnsrzg_pic1: '0',
        khxk_pic1: '0',
        kpxx_pic1: '0',
        /*表单验证规则*/
        rules2: {
          /* mobile:[
             { required: true, validator: checkTel, trigger: 'blur' }
           ],*/
          password: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {required: true, validator: validatePass2, trigger: 'blur'}
          ]
          /*username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          companyname: [
            { required: true, message: '请输入公司名称', trigger: 'blur' }
          ],
          name: [
            {required: true,  validator: checkName, trigger:'blur'}
          ],
          linkman_mobile:[
            {required: true, validator:checkTel2, trigger: 'blur'}
          ],
          companyemail:[
            {required: true, validator:checkEmail,trigger: 'blur'}
          ],
          linkman_name:[
            { required: true, message: '请输入联系人姓名', trigger: 'blur' }
          ],*/
        },
        imageUrl: ''
      };
    },
    methods: {
      /*审核失败原因*/
      checkResult() {
        this.$alert(this.web_refuse_reson, '审核失败原因', {
          confirmButtonText: '确定'

        });
      },
      /*保存数据*/
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          var _this = this;
          if (valid) {
            if (this.yyzz_pic1 == 1) {
              this.$message({
                message: '请上传营业执照',
                type: 'warning'
              })
            } else if (this.zzjgdm_pic1 == 1) {
              this.$message({
                message: '请上传组织机构代码',
                type: 'warning'
              })
            } else if (this.swdi_pic1 == 1) {
              this.$message({
                message: '请上传税务登记',
                type: 'warning'
              })
            } else if (this.ybnsrzg_pic1 == 1) {
              this.$message({
                message: '请上传一般纳税人资格证',
                type: 'warning'
              })
            } else if (this.khxk_pic1 == 1) {
              this.$message({
                message: '请上传开户许可',
                type: 'warning'
              })
            } else if (this.kpxx_pic1 == 1) {
              this.$message({
                message: '请上传开票信息',
                type: 'warning'
              })
            } else if (!this.ruleForm2.password) {
              this.$message({
                message: '请输入密码',
                type: 'warning'
              })
            } else if (!this.ruleForm2.checkPass) {
              this.$message({
                message: '请再次输入密码',
                type: 'warning'
              })
            } else if (this.ruleForm2.password != this.ruleForm2.checkPass) {
              this.$message({
                message: '两次输入密码不一致',
                type: 'warning'
              })
            } else {
              this.ruleForm3.mobile = this.ruleForm2.mobile;
              this.ruleForm3.username = this.ruleForm2.username;
              this.ruleForm3.password = this.ruleForm2.password;
              this.ruleForm3.companyname = this.ruleForm2.companyname;
              this.ruleForm3.companyemail = this.ruleForm2.companyemail;
              this.ruleForm3.linkman_name = this.ruleForm2.linkman_name;
              this.ruleForm3.linkman_mobile = this.ruleForm2.linkman_mobile;
              this.ruleForm3.yyzz_pic = this.ruleForm2.yyzz_pic;
              this.ruleForm3.zzjgdm_pic = this.ruleForm2.zzjgdm_pic;
              this.ruleForm3.swdi_pic = this.ruleForm2.swdi_pic;
              this.ruleForm3.ybnsrzg_pic = this.ruleForm2.ybnsrzg_pic;
              this.ruleForm3.khxk_pic = this.ruleForm2.khxk_pic;
              this.ruleForm3.kpxx_pic = this.ruleForm2.kpxx_pic;
              /*提交资料请求*/
              apply_update_user_account(this.ruleForm3).then(function (res) {
                if (res.data.errcode == 0) {
                  _this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                  _this.dialogAddFormVisible = false;
                  /*修改资料后跳转到主页面*/
                  if (_this.$route.params.type == 'modify') {
                    setTimeout(function () {
                      _this.$router.push('/main')
                    }, 3000)
                  } else {
                    /*审核被拒重新注册后跳转到登录页*/
                    setTimeout(function () {
                      _this.$router.push('/')
                    }, 3000)
                  }


                } else {
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
      /*上传图片获取图片名称*/
      getpicname(data) {
        var _this = this;
        switch (data.type) {
          case('a'):
            _this.a = data.value;
            this.ruleForm2.yyzz_pic = _this.a.filename;
            this.yyzz_pic1 = 0;
            break;
          case('b'):
            _this.b = data.value;
            this.ruleForm2.zzjgdm_pic = _this.b.filename;
            this.zzjgdm_pic1 = 0;

            break;
          case('c'):
            _this.c = data.value;
            this.ruleForm2.swdi_pic = _this.c.filename;
            this.swdi_pic1 = 0;

            break;
          case('d'):
            _this.d = data.value;
            this.ruleForm2.ybnsrzg_pic = _this.d.filename;
            this.ybnsrzg_pic1 = 0;

            break;
          case('e'):
            _this.e = data.value;
            this.ruleForm2.khxk_pic = _this.e.filename;
            this.khxk_pic1 = 0;

            break;
          case('f'):
            _this.f = data.value;
            this.ruleForm2.kpxx_pic = _this.f.filename;
            this.kpxx_pic1 = 0;

            break;
        }
      },
      /*获取数据信息*/
      getData() {
        var _this = this;
        get_user_detail(this.getDataForm).then(function (res) {
          _this.ruleForm2 = res.data.data;
          _this.ruleForm2.password = res.data.data.num;
          _this.ruleForm2.yyzz_pic = res.data.data.yyzz_pic;
          _this.ruleForm2.zzjgdm_pic = res.data.data.zzjgdm_pic;
          _this.ruleForm2.swdi_pic = res.data.data.swdi_pic;
          _this.ruleForm2.ybnsrzg_pic = res.data.data.ybnsrzg_pic;
          _this.ruleForm2.khxk_pic = res.data.data.khxk_pic;
          _this.picUrl = res.data.data.yyzz_pic_url;
          _this.picUrl2 = res.data.data.zzjgdm_pic_url;
          _this.picUrl3 = res.data.data.ybnsrzg_pic_url;
          _this.picUrl4 = res.data.data.ybnsrzg_pic_url;
          _this.picUrl5 = res.data.data.khxk_pic_url;
          _this.web_refuse_reson=res.data.data.refuse_reason ;
          /*当审核被拒绝时查看原因*/
          if (res.data.data.check_status == 3) {
            _this.reason_button = true;
          }
          if (res.data.errcode == 0) {
            /* setTimeout(function(){
               _this.$router.push('/')
             },3000)*/

          } else {
            _this.$message.error(res.data.errdesc);
          }
        })

      }
    }
  }

</script>


<style scoped>

  header {
    background: #fff;
    padding: 19px 0;
  }

  .container {
    display: block;
  }

  .main {
    background: #fff;
  }

  .container_header {
    background: #fff;
    line-height: 1;
  }

  .login_header {
    margin-top: 30px;
    margin-bottom: 0px;
  }

  .demo-ruleForm {
    padding: 0;
    width: auto;
  }

  .el-button--primary {
    background-color: #00a99d;
    border-color: #00a99d;
    width: 250px;
    height: 45px;
    margin-top: 50px;
    font-size: 16px;
    margin-bottom: 20px;
    margin-left: -100px;
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
    border: 1px dashed #d5d5d5;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
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
    border: 1px dashed #d5d5d5;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .demonstration {
    color: #333333;
    margin-top: 20px;
    font-size: 14px;
    display: inline-block;
    width: 100%;
  }

  .el-input {
    width: 416px;
  }

  .el-form-item {
    text-align: left;
  }

  .el-button--primary {
    background-color: #1F88E4;
    border-color: #00a99d;
  }

</style>
