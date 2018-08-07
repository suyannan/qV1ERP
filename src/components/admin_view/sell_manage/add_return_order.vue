<template>

  <!--新建或编辑销售订单-->
  <div>
    <common-header :title="'销售管理'"></common-header>
    <div class="page-content">
      <common-header-tilte :title2="title"></common-header-tilte>

      <el-form ref="form" :model="params" label-width="150px"  size="small" class="add-from">


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

        <el-form-item label="存货地">
          <el-select v-model="chd_num" placeholder="请选择存货地" filterable>
            <el-option v-for="item in params.list_location" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="存货地代码">
          <el-input v-model="chd_words_new"></el-input>
        </el-form-item>
        <el-form-item label="存货地编号">
          <el-input v-model="chd_num"  @blur="judgeChd()"></el-input>
        </el-form-item>

        <el-form-item label="退货单编号">
          <el-input v-model="params.return_num"></el-input>
        </el-form-item>
        <el-form-item label="开票日期">
          <el-col>
            <el-date-picker  type="datetime" placeholder="选择日期时间" v-model="params.return_date" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>

          </el-col>
        </el-form-item>
        <el-form-item label="退货数量">
          <el-input v-model="params.number"></el-input>
        </el-form-item>
        <el-form-item label="退货单价">
          <el-input v-model="params.unit_price"></el-input>
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
  import {edit_order_return,list_goods_name,list_procure_classify,list_location} from '../../../api/index'
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
        this.title='增加退货单';
      }else{
        this.getData();
        this.sMsg='修改成功';
        this.errMsg='修改失败';
        this.title='编辑退货单';
      }
    },
    data() {
      return {
        id:'',
        sMsg:'',
        errMsg:'',
        title:'',
        chmc_words:'',
        chd_words:'',
        chmc_words_new:'',
        chd_words_new:'',
        chmc_num:'',
        chd_num: '',
        params: {
          goods_name:[],
          list_location:[],
          chmc_num:'',
          chd_num: '',
          return_num: '',
          return_date: '',
          number: '',
          unit_price: ''
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

        axios.get(config.get_order_return_detail+this.id).then(function (res) {

          var data=res.data.data;
          _this.chmc_num=data.chmc_num;
          _this.chd_num=data.chd_num;
          _this.chmc_words_new=data.chmc_words;
          _this.chd_words_new=data.chd_words;
          _this.params.return_num=data.return_num;
          _this.params.number=data.number;
          _this.params.return_date=data.return_date;
          _this.params.unit_price=data.unit_price;

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
            obj.label=item.chmc_name;
            obj.value=item.chmc_num;
            obj.word=item.chmc_words.toUpperCase();
            obj.id=item.id;
            _this.params.goods_name.push(obj);
          });
        }).catch(function (err) {
          console.log(err);
        });

        list_location(obj).then(function (res) {
          var data=res.data.data;
          data.forEach(function (item) {
            var obj={};
            obj.label=item.chd_name;
            obj.value=item.chd_num;
            obj.word=item.chd_words.toUpperCase();
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
        obj.order_out_id=this.$route.params.sellOrderId;
        obj.return_num=_this.params.return_num;
        obj.return_date=_this.params.return_date;
        obj.number=_this.params.number;
        obj.unit_price=_this.params.unit_price;
        var nameExit=false;
        var chdExit=false;
        this.params.goods_name.forEach(function (item) {
          if(item.value==_this.chmc_num){
            obj.chmc_id=item.id;
            nameExit=true;
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
        if(nameExit&&chdExit) {
          edit_order_return(obj).then(function (res) {
            if (res.data.errcode == 0) {
              _this.$message({
                message: _this.sMsg,
                type: 'success'
              });
              _this.$router.push({
                'name': 'sell_order_detail',
                params: {'sellOrderId': _this.$route.params.sellOrderId}
              })
            } else {
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
        }else if(chdExit==false){
          _this.$message({
            message: '输入存货地编号不存在',
            type: 'warning'
          })
        }
      }
    },
    watch:{
      chmc_num(n,o){
        var _this=this;

        this.params.goods_name.forEach(function (item) {
          if(item.value==n){
            _this.chmc_words_new=item.word;
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
   /*   chmc_words_new(n,o){
        this.chmc_words=n.toUpperCase();
      },
      chd_words_new(n,o){
        this.chd_words=n.toUpperCase();
      }*/
    }
  }
</script>
<style>

</style>
