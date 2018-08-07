<template>

  <!--新建或编辑销售订单-->
<div>
  <common-header :title="'销售管理'" :title1="title"></common-header>
  <div class="page-content">

    <el-form ref="form" :model="params" label-width="150px" size="small" class="add-from">
      <el-form-item label="订单编号">
        <el-input v-model="params.out_num" ></el-input>
      </el-form-item>
      <el-form-item label="订单日期">
        <el-col>
          <el-date-picker  type="datetime" placeholder="选择日期时间" v-model="params.out_date" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>

        </el-col>
      </el-form-item>

      <el-form-item label="客户名称">
        <el-select v-model="params.client_num" placeholder="请选择客户名称" filterable >
          <el-option v-for="item in params.clients" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户编号">
        <el-input v-model="params.client_num"></el-input>
      </el-form-item>

      <el-form-item label="销售主体">
        <el-select v-model="entity_words" placeholder="请选择销售主体" filterable>
          <el-option v-for="item in params.entities" :label="item.label.split('_+_')[0]" :value="item.value" :key="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="销售主体代码">
        <el-input v-model="entity_words_new"></el-input>
      </el-form-item>
      <el-form-item label="销售主体编号">
        <el-input v-model="params.entity_num"></el-input>
      </el-form-item>
      <el-form-item label="销售员">
        <el-input v-model="params.sell_user"></el-input>
      </el-form-item>
      <el-form-item label="商务专员">
        <el-input v-model="params.business_user"></el-input>
      </el-form-item>
     <!-- <el-form-item label="备注">
        <el-input  type="textarea" :autosize="{ minRows:5}" v-model="params.remarks"></el-input>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="save()" style="margin:20px auto;" v-if="sell_enter==1">保存</el-button>
        <el-button type="primary" disabled style="margin:20px auto;" v-else>保存</el-button>
      </el-form-item>
    </el-form>


</div>
</div>

</template>

<script>
  import axios from 'axios'
/* axios.defaults.withCredentials = true;*/
  import {list_all_sell_select,edit_order} from '../../../api/index'
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
          this.title='新建销售订单';
        }else{
          this.getData();
          this.sMsg='修改成功';
          this.errMsg='修改失败';
          this.params.isEdit=true;
          this.title='编辑销售订单';
        }

        this.params.type=this.$route.params.type;
        this.getSelectOptions();
        this.sell_enter=window.sessionStorage.getItem('sell_enter');

      },
      data() {
        return {
          sell_enter:'',
          sMsg:'',
          errMsg:'',
          title:'',
          id:'',
          entity_words:'',
          entity_words_new:'',
          params: {
            isEdit:false,
            type:'',
            clients:[],
            entities:[],
            out_num: '',
            out_date: '',
            client_num:'',
            entity_num: '',
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
          axios.get(config.get_edit_order_detail+this.id).then(function (res) {
            var data=res.data.data;
            _this.params.out_num=data.out_num;
            _this.params.out_date=data.out_date;
            _this.params.client_num=data.client_num;
            _this.params.entity_num=data.entity_num;
            _this.entity_words=data.entity_words;
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
          list_all_sell_select().then(function (res) {

            var data=res.data.data;
            data.clients.forEach(function (item) {
              var obj={};
              obj.label=item.companyname;
              obj.value=item.client_num;
              obj.id=item.id;
              _this.params.clients.push(obj);
            });
            console.log( _this.params.clients);

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
          obj.out_num=_this.params.out_num;
          obj.out_date=_this.params.out_date;
          this.params.clients.forEach(function (item) {
            if(item.value==_this.params.client_num){
              obj.client_id=item.id;

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

          edit_order(obj).then(function (res) {

            if(res.data.errcode==0){
              _this.$message({
                message: _this.sMsg,
                type: 'success'
              });
              if(_this.$route.params.type=='add'){
                _this.$router.push({'name':'sell_order_detail',params:{'sellOrderId':res.data.data}})
              }else{
                _this.$router.push({'name':'sell_order_detail',params:{'sellOrderId':_this.id}})

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
          this.entity_words_new=n;
          this.params.entities.forEach(function (item) {
            if(item.value==n){
              _this.params.entity_num=item.label.split('_+_')[1];
            }
          })
        },
        entity_words_new(n,o){
          this.entity_words=n.toUpperCase();
        }
      }
    }
</script>
<style>

</style>
