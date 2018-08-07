<template>
 <!-- <div>

    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="top">


      <el-form-item prop="oldPass">
        <el-input type="password" v-model="ruleForm2.oldPass" auto-complete="off" placeholder="旧密码"></el-input>

     </el-form-item>

      <el-form-item prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="新密码"></el-input>
      </el-form-item>

      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="新密码确认"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>

    </el-form>
  </div>-->
</template>

<script>
  import {updatePwd} from '../../api/index'
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else {

          callback();
        }
      };

      var validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {

        ruleForm2: {
          oldPass: '',
          pass: '',
          checkPass: ''

        },

        rules2: {
          oldPass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          pass: [
            {validator: validatePass1, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],

        }
      };
    },
    methods: {
      submitForm(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {

            updatePwd({oldPwd: _this.ruleForm2.oldPass, newPwd: _this.ruleForm2.pass}).then(function (res) {
              if(res.status==200&&res.data.code==1){
                  _this.$message({
                    message:'修改成功',
                    type:'success'
                  })
              }else{
                  _this.$message({
                    message:'修改失败',
                    type:'error'
                  })
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>

</style>
