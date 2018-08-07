<template>

  <!--新建或编辑销售订单-->
  <div>
    <common-header :title="'销售管理'"></common-header>
    <div class="page-content">
      <common-header-tilte :title2="title"></common-header-tilte>

      <el-form ref="form" :model="params" label-width="150px" size="small"  class="add-from">


        <el-form-item label="发票号">
          <el-input v-model="params.invoice_num"></el-input>
        </el-form-item>
        <el-form-item label="开票日期">
          <el-col>
            <el-date-picker  type="datetime" placeholder="选择日期时间" v-model="params.invoice_date" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>

          </el-col>
        </el-form-item>
        <el-form-item label="操作人">
          <el-input v-model="params.op_user"></el-input>
        </el-form-item>
        <el-form-item label="发票含税金额">
          <el-input v-model="params.total_price"></el-input>
        </el-form-item>
        <el-form-item label="发票未含税金额">
          <el-input v-model="params.tax_price"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save()" style="margin:20px auto;">保存</el-button>
        </el-form-item>
      </el-form>


    </div>
  </div>

</template>

<script>
  import axios from 'axios'
/* axios.defaults.withCredentials = true;*/
  import {edit_order_return_invoice} from '../../../api/index'
  import config from '../../../api/config'
  import Header from '../common/common_header.vue'
  import Header2 from '../common/common_headerTitle.vue'

  export default {
    components:{
      'common-header':Header,
      'common-header-tilte':Header2
    },
    created(){
      this.id=this.$route.params.id;
      if(this.$route.params.type=='add'){
        this.sMsg='添加成功';
        this.errMsg='添加失败';
        this.title='增加销售开票';
      }else{
        this.getData();
        this.sMsg='修改成功';
        this.errMsg='修改失败';
        this.title='编辑销售开票';
      }
    },
    data() {
      return {
        id:'',
        sMsg:'',
        errMsg:'',
        title:'',
        params: {
          invoice_num: '',
          invoice_date: '',
          op_user:'',
          total_price:'',
          tax_price:'',
        }
      }
    },
    methods: {
      getData(){
        var _this=this;
        axios.get(config.get_order_return_invoice_detail+this.id).then(function (res) {
          var data=res.data.data;
          _this.params.invoice_num=data.invoice_num;
          _this.params.invoice_date=data.invoice_date;
          _this.params.op_user=data.op_user;
          _this.params.total_price=data.total_price;
          _this.params.tax_price=data.tax_price;

        }).catch(function (err) {
          console.log(err);
        })
      },
      save(){
        var _this=this;
        var obj={};
        obj.token=window.sessionStorage.getItem('session');
        obj.order_out_id=this.$route.params.sellOrderId;
        obj.invoice_num=_this.params.invoice_num;
        obj.invoice_date=_this.params.invoice_date;
        obj.op_user=_this.params.op_user;
        obj.total_price=_this.params.total_price;
        obj.tax_price=_this.params.tax_price;
        if(this.$route.params.type=='edit'){
          obj.id=this.$route.params.id;
        }
        edit_order_return_invoice(obj).then(function (res) {
          if(res.data.errcode==0){
            _this.$message({
              message: _this.sMsg,
              type: 'success'
            });
            _this.$router.push({'name':'sell_order_detail',params:{'sellOrderId':_this.$route.params.sellOrderId}})
          }else{
            _this.$message({
              message: res.data.errdesc,
              type: 'warning'
            })
          }
        }).catch(function (err) {
          console.log(err);
        })
      }
    }
  }
</script>
<style>

</style>
