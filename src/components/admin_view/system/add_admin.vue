<template>
  <div>
    <common-header :title="'系统维护'" :title1="title"></common-header>
    <div class="page-content">
      <!--<common-header-tilte :title2="title"></common-header-tilte>-->
      <el-form :model="ruleForm" :label-position="labelPosition" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="操作员编号" prop="num">
          <el-input v-model="ruleForm.num" placeholder="请输入操作员编号"></el-input>
        </el-form-item>
        <el-form-item label="操作员名称" prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入操作员名称"></el-input>
        </el-form-item>
        <el-form-item label="登录手机号" prop="mobile">
          <el-input v-model="ruleForm.mobile" placeholder="请输入登录手机号"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输入登录密码" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确定密码" prop="repassword">
          <el-input v-model="ruleForm.repassword" placeholder="请输入确定密码" type="password" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="操作员权限">
          <div class="checkbox_btn">
              <p v-for="(item,index) in ruleForm.items">
                <input type="checkbox" :id="index" :value="item.key"  v-model="checkedOptions" >
                <label :for="index">{{item.message}}</label>
              </p>
          </div>
        </el-form-item>

        <el-form-item style="text-align: center;">
          <span v-if="is_super==1">
            <el-button type="primary" @click="submitForm('ruleForm')">确定提交</el-button>
          </span>
          <span v-else>
              <el-button type="primary" disabled>确定提交</el-button>
          </span>

        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {addAdmin,get_administrator_detail} from '../../../api/index'
  import Header from '../common/common_header.vue'
  import Header2 from '../common/common_headerTitle.vue'
  export default {
    components:{
      'common-header':Header,
      'common-header-tilte':Header2
    },
    created(){
      this.checkedOptions=[];
      if(this.$route.params.type=='edit'){
        this.title='编辑操作员';
        this.successMsg='修改成功';
        this.errMsg='修改失败';
        this.params.id=this.$route.params.adminId;
        this.getData();
      }else{
        this.title='增加操作员';
        this.successMsg='添加成功';
        this.errMsg='添加失败';
        if(this.params.id){
          delete this.params.id;
        }
      }
      this.super_lookover = window.sessionStorage.getItem('super_lookover');
      this.is_super=window.sessionStorage.getItem('is_super');
    },
    data () {
      return {
        title:'',
        super_lookover: '',
        is_super:'',
        labelPosition: 'left',
        newArray: [],
        newa:'',
        successMsg:'',
        errMsg:'',
        checkedOptions:[],
        params: {
          token:'',
          num: '',
          username: '',
          mobile: '',
          password: '',
          is_super: 0,
          buy_enter: 0,
          buy_check: 0,
          sell_enter: 0,
          sell_check: 0,
          buy_pay_enter: 0,
          buy_pay_check: 0,
          buy_invoice_enter: 0,
          buy_invoice_check: 0,
          buy_store: 0,
          sell_pay_enter: 0,
          sell_pay_check: 0,
          sell_invoice_enter: 0,
          sell_invoice_check: 0,
          sell_store: 0,
          sell_return_enter: 0,
          sell_return_check: 0,
          sell_return_invoice_enter: 0,
          sell_return_invoice_check: 0,
          super_lookover: 0
        },
        ruleForm: {
          num: '',
          username: '',
          mobile: '',
          password: '',
          repassword: '',
          items: [
            {message: '采购录入删除', key: 'buy_enter'},
            {message: '采购审核权限', key: 'buy_check'},
            {message: '采购付款单录入删除', key: 'buy_pay_enter'},
            {message: '采购付款单审核权限', key: 'buy_pay_check'},
            {message: '采购开票录入删除', key: 'buy_invoice_enter'},
            {message: '采购开票审核权限', key: 'buy_invoice_check'},
            {message: '采购入库权限', key: 'buy_store'},
            {message: '销售录入删除', key: 'sell_enter'},
            {message: '销售审核权限', key: 'sell_check'},
            {message: '销售收款单录入删除', key: 'sell_pay_enter'},
            {message: '销售收款单审核权限', key: 'sell_pay_check'},
            {message: '销售开票录入删除', key: 'sell_invoice_enter'},
            {message: '销售开票审核权限', key: 'sell_invoice_check'},
            {message: '销售退货单录入删除', key: 'sell_return_enter'},
            {message: '销售退货单审核权限', key: 'sell_return_check'},
            {message: '销售退货开票录入删除', key: 'sell_return_invoice_enter'},
            {message: '销售退货开票审核权限', key: 'sell_return_invoice_check'},
            {message: '销售出库权限', key: 'sell_store'},
            {message: '系统维护录入和删除', key: 'system_edit'},
            {message: '超级查看员权限，可查看所有内容', key: 'super_lookover'},
            {message: '超级管理员权限，可操作所有内容', key: 'is_super'}
          ]
        },
        rules: {
          num: [
            { required: true, message: '请输入操作员编号', trigger: 'blur' }
          ],
          username: [
            { required: true, message: '请输入操作员名称', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '请输入登录手机号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          repassword: [
            { required: true, message: '请输入确认密码', trigger: 'blur' }
          ]

        }
      };
    },
    methods: {
      getData(){
        var _this=this;
        get_administrator_detail({'id':this.params.id}).then(function (res) {
          _this.checkedOptions=[];
          var data=res.data.data;
          _this.ruleForm.num=data.num;
          _this.ruleForm.username=data.username;
          _this.ruleForm.mobile=data.mobile;
          _this.ruleForm.password=data.password;
          _this.ruleForm.repassword=data.password;
          for(var i=0;i<_this.ruleForm.items.length; i++){
            var key=_this.ruleForm.items[i].key;
            if(data[key]==1){
              _this.checkedOptions.push(key);
            }
          }
        }).catch(function (err) {
          console.log(err);
        })
      },
      submitForm(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var is_choose_super=false;
            // 选中的多选框
            if (_this.ruleForm.password ==_this.ruleForm.repassword){
              _this.params.num=_this.ruleForm.num;
              _this.params.username=_this.ruleForm.username;
              _this.params.mobile=_this.ruleForm.mobile;
              _this.params.password=_this.ruleForm.password;
              _this.params.token=window.sessionStorage.getItem('session');

              /*先把上一次选择的参数清空*/
              for(var j=0;j<_this.ruleForm.items.length;j++){
                var key=_this.ruleForm.items[j].key;
                _this.params[key]=0;
              }

              /*根据所选项判断是不是选择了超级管理员*/
              for (var i = 0; i < _this.checkedOptions.length; i++){
                  var m= _this.checkedOptions[i];
                  if(m=='is_super'){
                    _this.checkedOptions=[];
                    is_choose_super=true;
                    break;
                  }else{
                    is_choose_super=false;
                    _this.params[m]=1;
                  }
              }

              /*如果选择了超级管理员，选中全部*/
                if(is_choose_super){
                  /*选中全部，把所有的值都放进去*/
                  for(var j=0;j<_this.ruleForm.items.length;j++){
                    var key=_this.ruleForm.items[j].key;
                    _this.checkedOptions.push(key);
                  }
                  /*选择超级管理员以后，传参为超级管理员*/
                  _this.params.is_super=1;
                  _this.commit();
                }else{
                  _this.commit();
                }

            } else {
              _this.$message({
                message: res.data.errdesc,
                type: 'warning'
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      commit(){
        var _this=this;
        addAdmin(_this.params)
          .then(function (res) {
            if(res.data.errcode==0){
              _this.$message({
                message: _this.successMsg,
                type: 'success'
              });
              if(_this.$route.params.type=='edit'){
                _this.getData();
              }
              _this.$router.push('/admin_view/admin_list');
            }else{
              _this.$message({
                message: res.data.errdesc,
                type: 'warning'
              });
            }
          })
          .catch(function (res) {
            console.log('error', res);
          })
      }
    }
  }
</script>


<style scoped>
  .demo-ruleForm{
    width:600px;
  }
</style>
