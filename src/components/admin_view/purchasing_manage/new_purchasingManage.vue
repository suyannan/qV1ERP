<template>
  <div>
    <h3 class="child_title">新建采购订单</h3>
    <div class="page-content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">

        <el-form-item label="订单编号" prop="OrderNumber">
        <el-input v-model="ruleForm.OrderNumber" placeholder="请输入订单编号"></el-input>
      </el-form-item>

      <el-form-item label="订单日期" required>
        <el-col>
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="供应商编号" prop="SupplierNumber" required>
        <el-input v-model="ruleForm.SupplierNumber" placeholder="请输入供应商编号"></el-input>
      </el-form-item>

      <el-form-item label="供应商名称" prop="SupplierName" style="text-align:left" required>
        <el-select v-model="ruleForm.SupplierName" placeholder="请选择供应商名称">
          <el-option label="供应商一" value="shanghai"></el-option>
          <el-option label="供应商二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="采购主体编号" prop="PurchaseNumber" required>
        <el-input v-model="ruleForm.PurchaseNumber" placeholder="请输入采购主体编号"></el-input>
      </el-form-item>

      <el-form-item label="采购主体" prop="Purchase" style="text-align:left" required>
        <el-select v-model="ruleForm.Purchase" placeholder="请选择采购主体">
          <el-option label="信息工程" value="shanghai"></el-option>
          <el-option label="信息工程二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="备注信息" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入备注信息"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>

    export default {
      data() {
        return {
          ruleForm: {
            // 订单编号
            OrderNumber: '',
            // 供应商名称
            SupplierName: '',
            // 订单日期
            date1: '',
            // 供应商编号
            SupplierNumber: '',
            // 采购主体编号
            PurchaseNumber: '',
            // 采购主体
            Purchase: '',
            // 备注
            desc: ''
          },
          rules: {
            OrderNumber: [
              {required: true, message: '订单编号不能为空', trigger: 'change'}
            ],
            region: [
              { required: true, message: '请选择活动区域', trigger: 'change' }
            ],
            date1: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            SupplierNumber: [
              {required: true, message: '供应商编号不能为空', trigger: 'change'}
            ],
            SupplierName: [
              {required: true, message: '请选择供应商名称', trigger: 'change'}
            ],
            PurchaseNumber: [
              {required: true, message: '采购主体编号不能为空', trigger: 'change'}
            ],
            Purchase: [
              {required: true, message: '请选择采购主体名称', trigger: 'change'}
            ]
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      }
    }
</script>


<style scoped>

</style>
