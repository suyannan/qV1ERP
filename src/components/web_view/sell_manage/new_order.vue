<template>

      <!--新建或编辑销售订单-->
    <div class="main" style="background:#EDEEF2">

        <div class="con_width clearfix choose" style="height: 100%;padding-top: 30px;">
          <div style="background: #fff;max-width: 1000px;min-width: 780px;margin: 0 auto;padding: 30px 0 10px;">
            <h1 class="login_header" style="margin-top: 0px;text-align: left;font-size: 18px;width: 90%;padding-bottom: 15px;margin: 0 auto;border-bottom: 1px solid #E1E1E1;">{{title}}</h1>
              <el-form ref="form" label-position="left" :model="params" label-width="110px" class="add-from">
              <el-form-item label="订单编号">
                <el-input v-model="params.out_num"></el-input>
              </el-form-item>
              <el-form-item label="订单日期">
                <el-col>
                  <el-date-picker  type="datetime" placeholder="选择日期时间" v-model="params.out_date" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>

                </el-col>
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

              <el-form-item label="备注">
                <el-input  type="textarea" :autosize="{ minRows:5}" v-model="params.remarks"></el-input>
              </el-form-item>
                <el-form-item style="margin: 0 auto;text-align: center;">
                <el-button type="primary" style="margin-left: 0;"  @click="save()">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
    </div>



</template>

<script>
  import axios from 'axios'
/* axios.defaults.withCredentials = true;*/
  import {user_edit_order} from '../../../api/web_index'
  import {list_all_sell_select} from '../../../api/index'
  import config from '../../../api/config'

  export default {
    created(){
      //console.log(this.$route.params.id);
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
      //console.log(this.$route.params.id);
      this.params.type=this.$route.params.type;
      this.getSelectOptions();

    },
    data() {
      return {
        sMsg:'',
        errMsg:'',
        title:'',
        id:'',
        entity_words:'',
        entity_words_new:'',
        params: {
          type:'',
          entities:[],
          out_num: '',
          out_date: '',
          entity_num: '',
          remarks:''
        }
      }
    },
    methods: {
      getData(){
        var _this=this;
        axios.get(config.get_edit_order_detail+this.id).then(function (res) {
          //console.log('editMsg--',res.data.data);
          var data=res.data.data;
          _this.params.out_num=data.out_num;
          _this.params.out_date=data.out_date;
          _this.entity_words=data.entity_words;
          _this.params.entity_num=data.entity_num;
          _this.params.remarks=data.remarks;

        }).catch(function (err) {
          console.log(err);
        })
      },
      getSelectOptions(){
        var _this=this;
        list_all_sell_select().then(function (res) {
          console.log('select',res.data.data);
          var data=res.data.data;

          data.entities.forEach(function (item) {
            var obj={};
            obj.label=item.entity_name;
            obj.value=item.entity_words.toUpperCase();
            obj.id=item.id;
            _this.params.entities.push(obj);
          });
          //console.log('b',_this.params.entities);

        }).catch(function (err) {
          console.log(err);
        })
      },
      save(){
        var _this=this;
        var obj={};
        obj.token=window.sessionStorage.getItem('web_token');
        obj.out_num=_this.params.out_num;
        obj.out_date=_this.params.out_date;


        _this.params.entities.forEach(function (item) {
          if(item.value==_this.entity_words){
            obj.entity_id=item.id;
            console.log('aa2');
            return;
          }
        });
        obj.remarks=_this.params.remarks;
        if(this.$route.params.type=='edit'){
          obj.id=_this.id;
        }
        //console.log('obj',obj);
        user_edit_order(obj).then(function (res) {
          //console.log(res.data);
          if(res.data.errcode==0){
            _this.$message({
              message: _this.sMsg,
              type: 'success'
            });
            if(_this.$route.params.type=='add'){
              _this.$router.push({'name':'order_detail',params:{'SellId':res.data.data}})
            }else{
              _this.$router.push({'name':'order_detail',params:{'SellId':_this.id}})

            }
          }else{
            _this.$message({
              message: res.data.errdesc,
              type: 'warning'
            });
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
<style scoped>
  @import "../../../style/web_index.css";
  .add-from{
    padding:30px 0 80px;
    width:500px;
  }
  .el-input{
    width:100%;
  }
  .el-button--primary{
    margin-top: 20px;
    width: 250px;
  }
</style>
