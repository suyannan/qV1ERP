<template>

  <!--新建或编辑采购订单-->
  <div>
    <common-header :title="'采购管理'" :title1="title"></common-header>
    <div class="page-content">
     <!-- <common-header-tilte :title2="title"></common-header-tilte>-->

      <el-form ref="form" :model="params" label-width="150px" size="small"  class="add-from">
        <el-form-item label="付款公司名称">
          <el-select v-model="entity_words" placeholder="请选择付款公司名称" filterable @change="showTotalRebate()">
            <el-option v-for="item in params.entities" :label="item.label.split('_+_')[0]" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="付款公司代码">
          <el-input v-model="entity_words_new"></el-input>
        </el-form-item>
        <el-form-item label="付款公司编号">
          <el-input v-model="params.entity_num"></el-input>
        </el-form-item>
        <el-form-item label="剩余返利金额">
          <el-input v-model="total_rebate" readonly></el-input>
        </el-form-item>
        <el-form-item label="付款日期">
          <el-col>
            <el-date-picker  type="datetime" placeholder="选择日期时间" v-model="params.pay_date" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>

          </el-col>
        </el-form-item>
        <el-form-item label="实际付款金额">
          <el-input v-model="params.price"></el-input>
        </el-form-item>
        <el-form-item label="使用返利金额">
          <el-input v-model="params.rebate_price" v-if="total_rebate==0" disabled></el-input>
          <el-input v-model="params.rebate_price" v-else></el-input>
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
  import {list_all_purchase_select,edit_purchase_order_pay,get_entity_supplier_rebate} from '../../../api/index'
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
      this.getSupplierId();
      if(this.$route.params.type=='add'){
        this.getSelectOptions();
        this.sMsg='添加成功';
        this.errMsg='添加失败';
        this.title='增加付款单';
      }else{
        this.getData();
        this.sMsg='修改成功';
        this.errMsg='修改失败';
        this.title='编辑付款单';
      }
    },
    data() {
      return {
        id:'',
        sMsg:'',
        errMsg:'',
        title:'',
        entity_words:'',
        entity_words_new:'',
        supplier_id:'',
        total_rebate:'',
        params: {
          entities:[],
          entity_num:'',
          pay_date: '',
          price: '',
          rebate_price:''
        }
      }
    },
    methods: {
      getData(){
        var _this=this;
        axios.get(config.purchase_order_pay_detail+this.id).then(function (res) {
          var data=res.data.data[0];
          _this.params.entity_num=data.entity_num;
          _this.entity_words=data.entity_words;
          _this.params.pay_date=data.pay_date;
          _this.params.price=data.price;
          _this.params.rebate_price=data.rebate_price;
          list_all_purchase_select().then(function (res) {
            var data=res.data.data;
            data.entities.forEach(function (item) {
              var obj={};
              obj.label=item.entity_name;
              obj.value=item.entity_words;
              obj.id=item.id;
              _this.params.entities.push(obj);
            });
            _this.showTotalRebate();
          }).catch(function (err) {
            console.log(err);
          })

        }).catch(function (err) {
          console.log(err);
        })
      },
      getSupplierId(){
        var _this=this;
        axios.get(config.get_purchase_order_detail+this.$route.params.purchaseOrderId).then(function (res) {
          _this.supplier_id=res.data.data.order[0].supplier_id;
        }).catch(function (err) {
          console.log(err);
        })
      },
      getSelectOptions(){
        var _this=this;
        list_all_purchase_select().then(function (res) {
          var data=res.data.data;
          data.entities.forEach(function (item) {
            var obj={};
            obj.label=item.entity_name;
            obj.value=item.entity_words;
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
        obj.order_in_id=this.$route.params.purchaseOrderId;
        obj.pay_date=_this.params.pay_date;
        obj.price=_this.params.price;
        obj.rebate_price=_this.params.rebate_price;
        _this.params.entities.forEach(function (item) {
          if(item.value==_this.entity_words){
            obj.entity_id=item.id;
            return;
          }
        });
        if(this.$route.params.type=='edit'){
          obj.id=this.$route.params.id;
        }
        if(this.params.rebate_price>this.total_rebate){
          this.$message({
            message:'使用返利金额不能大于剩余返利金额',
            type: 'warning'
          })
        }else{
          edit_purchase_order_pay(obj).then(function (res) {
            if(res.data.errcode==0){
              _this.$message({
                message: _this.sMsg,
                type: 'success'
              });
              _this.$router.push({'name':'purchasing_orderDesc',params:{'purchaseOrderId':_this.$route.params.purchaseOrderId}})
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
      showTotalRebate(){
        var _this=this;
        var obj={};
        obj.supplier_id=_this.supplier_id;
        _this.params.entities.forEach(function (item) {
          if(item.value==_this.entity_words){
            obj.entity_id=item.id;
            return;
          }
        });
        get_entity_supplier_rebate(obj).then(function (res) {
        _this.total_rebate=res.data.data.total_rebate;
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
