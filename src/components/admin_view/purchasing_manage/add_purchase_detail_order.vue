<template>

  <!--新建或编辑采购订单-->
  <div>
    <common-header :title="'采购管理'" :title1="title"></common-header>
    <div class="page-content">
      <!--<common-header-tilte :title2="title"></common-header-tilte>-->

      <el-form ref="form" :model="params" label-width="200px" size="small"  class="add-from">

        <el-form-item label="存货名称">
          <el-select v-model="chmc_num" placeholder="请选择存货名称" filterable >
            <el-option v-for="item in params.goods_name" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="存货名称代码">
          <el-input v-model="chmc_words_new"></el-input>
        </el-form-item>
        <el-form-item label="存货编号">
          <el-input v-model="chmc_num" @blur="judgeName()"></el-input>
        </el-form-item>
        <el-form-item label="存货分类">
          <el-select v-model="chfl_num" placeholder="请选择存货分类" filterable>
            <el-option v-for="item in params.procure_classify" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="存货分类代码">
          <el-input v-model="chfl_words_new"></el-input>
        </el-form-item>
        <el-form-item label="存货分类编号">
          <el-input v-model="chfl_num"  @blur="judgeChfl()"></el-input>
        </el-form-item>
        <el-form-item label="存货地">
          <el-select v-model="chd_num" placeholder="请选择存货地" filterable>
            <el-option v-for="item in params.list_location" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="存货地代码">
          <el-input v-model="chd_words_new"></el-input>
        </el-form-item>
        <el-form-item label="存货地编号">
          <el-input v-model="chd_num" @blur="judgeChd()"></el-input>
        </el-form-item>
        <el-form-item label="存货批次">
          <el-input v-model="params.order_in_batch"></el-input>
        </el-form-item>
        <el-form-item label="规格型号">
          <el-input v-model="params.unit"></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="params.number"></el-input>
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="params.unit_price"></el-input>
        </el-form-item>
        <el-form-item label="税率%">
          <el-input v-model="params.tax_rate" placeholder="（0.00~100.00）"></el-input>
        </el-form-item>
        <el-form-item label="单台返利">
          <el-input v-model="params.rebate"></el-input>
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
  import config from '../../../api/config'
  import Header from '../common/common_header.vue'
  import Header2 from '../common/common_headerTitle.vue'
  import {edit_purchase_order_detail,list_goods_name,list_procure_classify,list_location} from '../../../api/index'
  export default {
    components:{
      'common-header':Header,
      'common-header-tilte':Header2
    },
    created(){
      this.id=this.$route.params.id;
      this.getSelectOptions();
      if(this.$route.params.type=='add'){
        this.sMsg='添加成功';
        this.errMsg='添加失败';
        this.params.isEdit=false;
        this.title='增加采购清单';
      }else{
        this.getData();
        this.sMsg='修改成功';
        this.errMsg='修改失败';
        this.title='编辑采购清单';
      }
    },
    data() {
      return {
        id:'',
        sMsg:'',
        errMsg:'',
        title:'',
        chmc_words:'',
        chfl_words:'',
        chd_words:'',
        chmc_words_new:'',
        chfl_words_new:'',
        chd_words_new:'',
        chmc_num:'',
        chfl_num:'',
        chd_num:'',
        params: {
          goods_name:[],
          procure_classify:[],
          list_location:[],
          chmc_num:'',
          chfl_num: '',
          chd_num: '',
          order_in_batch:'',
          unit: '',
          number: '',
          unit_price: '',
          tax_rate: '',
          rebate: ''
        }
      }
    },
    methods: {
      judgeName(){
        var exit=false;
        var _this=this;
        this.params.goods_name.forEach(function (item) {
          if(item.value==_this.chmc_num){
            exit=true;
          }
        });
        if(!exit){
          _this.$message({
            message: '输入存货编号不存在',
            type: 'warning'
          })
        }
      },
      judgeChfl(){
        var exit=false;
        var _this=this;
        this.params.procure_classify.forEach(function (item) {
          if(item.value==_this.chfl_num){
            exit=true;
          }
        });
        if(!exit){
          _this.$message({
            message: '输入存货分类编号不存在',
            type: 'warning'
          })
        }
      },
      judgeChd(){
        var exit=false;
        var _this=this;
        this.params.list_location.forEach(function (item) {
          if(item.value==_this.chd_num){
            exit=true;
          }
        });
        if(!exit){
          _this.$message({
            message: '输入存货地编号不存在',
            type: 'warning'
          })
        }
      },
      getData(){
        var _this=this;
        axios.get(config.purchase_edit_order_sub_detail+this.id).then(function (res) {
          var data=res.data.data;
          _this.chmc_num=data.chmc_num;
          _this.chfl_num=data.chfl_num;
          _this.chd_num=data.chd_num;
          _this.chmc_words_new=data.chmc_words;
          _this.chfl_words_new=data.chfl_words;
          _this.chd_words_new=data.chd_words;
          _this.params.order_in_batch=data.order_in_batch;
          _this.params.unit=data.unit;
          _this.params.number=data.number;
          _this.params.unit_price=data.unit_price;
          _this.params.tax_rate=data.tax_rate;
          _this.params.rebate=data.rebate;

        }).catch(function (err) {
          console.log(err);
        })
      },
      getSelectOptions(){
        var _this=this;
        var obj={};
        obj.key_words='';
        list_goods_name(obj).then(function (res) {
          var data=res.data.data;
          data.forEach(function (item) {
            var obj={};
            obj.label=item.chmc_name.trim();
            /*把每项的值根据编号绑定*/
            obj.value=item.chmc_num.trim();
            /*代码*/
            obj.word=item.chmc_words.toUpperCase().trim();
            obj.id=item.id;
            _this.params.goods_name.push(obj);
            console.log(_this.params.goods_name);
          });
        }).catch(function (err) {
          console.log(err);
        });

        list_procure_classify(obj).then(function (res) {
          var data=res.data.data;
          data.forEach(function (item) {
            var obj={};
            obj.label=item.chfl_name.trim();
            obj.value=item.chfl_num.trim();
            obj.word=item.chfl_words.toUpperCase().trim();
            obj.id=item.id;
            _this.params.procure_classify.push(obj);
          });
        }).catch(function (err) {
          console.log(err);
        });

        list_location(obj).then(function (res) {
          var data=res.data.data;
          data.forEach(function (item) {
            var obj={};
            obj.label=item.chd_name.trim();
            obj.value=item.chd_num.trim();
            obj.word=item.chd_words.toUpperCase().trim();
            obj.id=item.id;
            _this.params.list_location.push(obj);
          });
        }).catch(function (err) {
          console.log(err);
        });
      },
      save(){
        var _this=this;
        var obj={};
        obj.token=window.sessionStorage.getItem('session');
        obj.order_in_id=this.$route.params.purchaseOrderId;
        obj.order_in_batch=_this.params.order_in_batch;
        obj.unit=_this.params.unit;
        obj.number=_this.params.number;
        obj.unit_price=_this.params.unit_price;
        obj.tax_rate=_this.params.tax_rate;
        obj.rebate=_this.params.rebate;
        var nameExit=false;
        var chflExit=false;
        var chdExit=false;
        this.params.goods_name.forEach(function (item) {
          if(item.value==_this.chmc_num){
            obj.chmc_id=item.id;
            nameExit=true;
            return;
          }
        });

        _this.params.procure_classify.forEach(function (item) {
          if(item.value==_this.chfl_num){
            obj.chfl_id=item.id;
            chflExit=true;
            return;
          }
        });
        _this.params.list_location.forEach(function (item) {
          if(item.value==_this.chd_num){
            obj.chd_id=item.id;
            chdExit=true;
            return;
          }
        });
        if(this.$route.params.type=='edit'){
          obj.id=this.$route.params.id;
        }
        if(nameExit&&chflExit&&chdExit){
          edit_purchase_order_detail(obj).then(function (res) {
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
        }else if(nameExit==false){
          _this.$message({
            message: '输入存货编号不存在',
            type: 'warning'
          })
        }else if(chflExit==false){
          _this.$message({
            message: '输入存货分类编号不存在',
            type: 'warning'
          })
        }else if(chdExit==false){
          _this.$message({
            message: '输入存货地编号不存在',
            type: 'warning'
          })
        }

      }
    },
    watch:{
     // 根据下拉框选择的值来进行编号的变化
      chmc_num(n,o){
        var _this=this;
        this.params.goods_name.forEach(function (item) {
          if(item.value==n){
            _this.chmc_words_new=item.word;
          }
        })
      },
      chfl_num(n,o){
        var _this=this;
        this.params.procure_classify.forEach(function (item) {
          if(item.value==n){
            _this.chfl_words_new=item.word;
          }
        })
      },
      chd_num(n,o){
        var _this=this;

        this.params.list_location.forEach(function (item) {
          if(item.value==n){
            _this.chd_words_new=item.word;
          }
        })
      },
/*      chmc_words_new(n,o){
        this.chmc_words=n.toUpperCase();
      },
      chfl_words_new(n,o){
        this.chfl_words=n.toUpperCase();
      },
      chd_words_new(n,o){
        this.chd_words=n.toUpperCase();
      }*/
    }
  }
</script>
<style>

</style>
