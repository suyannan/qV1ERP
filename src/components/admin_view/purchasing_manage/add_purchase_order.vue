<template>
  <!--新建或编辑采购订单-->
<div>
  <common-header :title="'采购管理'" :title1="title"></common-header>
  <div class="page-content">
    <el-form ref="form" :model="params" label-width="150px"  class="add-from">
      <el-form-item label="订单编号">
        <el-input v-model="params.in_num" size="small"></el-input>
      </el-form-item>
      <el-form-item label="订单日期">
        <el-col>
          <el-date-picker  size="small" type="datetime" placeholder="选择日期时间" v-model="params.in_date" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="供应商名称">
        <el-select v-model="s_words" placeholder="请选择供应商名称" filterable  size="small">
          <el-option v-for="item in params.suppliers" :label="item.label.split('_+_')[0]" :value="item.value" :key="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供应商代码">
        <el-input v-model="s_words_new"  size="small"></el-input>
      </el-form-item>
      <el-form-item label="供应商编号">
        <el-input v-model="params.s_num"  size="small"></el-input>
      </el-form-item>
      <!--名称-->
      <el-form-item label="采购主体">
        <el-select v-model="entity_words" placeholder="请选择采购主体" filterable  size="small">
          <el-option v-for="item in params.entities" :label="item.label.split('_+_')[0]" :value="item.value" :key="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采购主体代码">
        <el-input v-model="entity_words_new"  size="small"></el-input>
      </el-form-item>
      <!--编号-->
      <el-form-item label="采购主体编号">
        <el-input v-model="params.entity_num"  size="small"></el-input>
      </el-form-item>
      <el-form-item label="采购员">
        <el-input v-model="params.sell_user"  size="small"></el-input>
      </el-form-item>
      <el-form-item label="商务专员">
        <el-input v-model="params.business_user"  size="small"></el-input>
      </el-form-item>
     <!-- <el-form-item label="备注">
        <el-input  type="textarea" :autosize="{ minRows:5}" v-model="params.remarks"></el-input>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="save()" style="margin:20px auto;" v-if="buy_enter==1"  size="small">保存</el-button>
        <el-button type="primary" disabled style="margin:20px auto;" v-else  size="small">保存</el-button>
      </el-form-item>
    </el-form>


</div>
</div>

</template>

<script>
  import axios from 'axios'
/* axios.defaults.withCredentials = true;*/
  import {list_all_purchase_select,edit_purchase_order} from '../../../api/index'
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
          this.params.isEdit=false;
          this.title='新建采购订单';
        }else{
          this.getData();
          this.sMsg='修改成功';
          this.errMsg='修改失败';
          this.params.isEdit=true;
          this.title='编辑采购订单';
        }
        this.params.type=this.$route.params.type;
        this.getSelectOptions();
        this.buy_enter=window.sessionStorage.getItem('buy_enter');

      },
      data() {
        return {
          buy_enter:'',
          sMsg:'',
          errMsg:'',
          title:'',
          id:'',
          s_words:'',
          s_words_new:'',
          entity_words: '',
          entity_words_new:'',
          params: {
            isEdit:false,
            type:'',
            suppliers:[],
            entities:[],
            in_num: '',
            in_date: '',
            s_num:'',
            entity_num:'',
            receive_status: '0',
            invoice_status: '0',
            pay_status: '0',
            sell_user: '',
            business_user: '',
            remarks:''
          }
        }
      },
      methods: {
        getData(){
          var _this=this;
          axios.get(config.purchase_edit_order_detail+this.id).then(function (res) {
            var data=res.data.data;
            _this.params.in_num=data.in_num;
            _this.params.in_date=data.in_date;
            _this.params.s_num=data.s_num;
            _this.s_words=data.s_words;
            _this.entity_words=data.entity_words;
            _this.params.entity_num=data.entity_num;
            _this.params.receive_status=data.receive_status;
            _this.params.invoice_status=data.invoice_status;
            _this.params.pay_status=data.pay_status;
            _this.params.sell_user=data.sell_user;
            _this.params.business_user=data.business_user;
            _this.params.remarks=data.remarks;

          }).catch(function (err) {
            console.log(err);
          })
        },
        getSelectOptions(){
          var _this=this;
          list_all_purchase_select().then(function (res) {
            var data=res.data.data;
            data.suppliers.forEach(function (item) {
              var obj={};
              obj.label=item.name;
              obj.value=item.words.toUpperCase();
              obj.id=item.id;
              _this.params.suppliers.push(obj);
            });
            data.entities.forEach(function (item) {
              var obj={};
              obj.label=item.entity_name;
              obj.value=item.entity_words.toUpperCase();
              obj.id=item.id;
              _this.params.entities.push(obj);
            });

          }).catch(function (err) {
            console.log(err);
          })
        },
        save(){
          var _this=this;
          var obj={};
          obj.token=window.sessionStorage.getItem('session');
          obj.in_num=_this.params.in_num;
          obj.in_date=_this.params.in_date;
          this.params.suppliers.forEach(function (item) {
            if(item.value==_this.s_words){
              obj.supplier_id=item.id;
              return;
            }
          });

          _this.params.entities.forEach(function (item) {
            if(item.value==_this.entity_words){
              obj.entity_id=item.id;
              return;
            }
          });
          obj.sell_user=_this.params.sell_user;
          obj.business_user=_this.params.business_user;
          obj.remarks=_this.params.remarks;
          if(this.$route.params.type=='add'){
            obj.receive_status=0;
            obj.invoice_status=0;
            obj.pay_status=0;
          }else{
            obj.receive_status=_this.params.receive_status;
            obj.invoice_status=_this.params.invoice_status;
            obj.pay_status=_this.params.pay_status;
            obj.id=_this.id;
          }
          edit_purchase_order(obj).then(function (res) {
            if(res.data.errcode==0){
              _this.$message({
                message: _this.sMsg,
                type: 'success'
              });
              if(_this.$route.params.type=='add'){
                _this.$router.push({'name':'purchasing_orderDesc',params:{'purchaseOrderId':res.data.data}})
              }else{
                _this.$router.push({'name':'purchasing_orderDesc',params:{'purchaseOrderId':_this.id}})

              }
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
      },
      watch:{
        entity_words(n,o){
          var _this=this;
          _this.entity_words_new=n;
          this.params.entities.forEach(function (item) {
            if(item.value==n){
              _this.params.entity_num=item.label.split('_+_')[1];
            }
          })
        },
        entity_words_new(n,o){
          this.entity_words=n.toUpperCase();
        },
        s_words(n,o){
          var _this=this;
          _this.s_words_new=n;
          this.params.suppliers.forEach(function (item) {
            if(item.value==n){
              _this.params.s_num=item.label.split('_+_')[1];
            }
          })
        },
        s_words_new(n,o){
          this.s_words=n.toUpperCase();
        },
      }

    }
</script>
<style scoped>

</style>
