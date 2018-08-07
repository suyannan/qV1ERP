<template>
  <div class="self-table">
      <!--销售订单-->
      <h4>销售订单</h4>
      <el-table :data="order" border  style="width: 100%; margin-top: 20px">
        <el-table-column prop="out_num" label="订单编号">
        </el-table-column>
        <el-table-column prop="out_date" label="订单日期" width="175">
        </el-table-column>
        <el-table-column prop="client_num" label="客户编号">
        </el-table-column>
        <el-table-column prop="client_name" label="客户名称">
        </el-table-column>
        <el-table-column prop="entity_num" label="销售主体编号" width="125">
        </el-table-column>
        <el-table-column prop="entity_name" label="销售主体">
        </el-table-column>
        <el-table-column prop="total_money" label="销售总额">
        </el-table-column>

        <el-table-column label="收款状态" width="165">
          <template slot-scope="scope">
            <el-switch v-if="sell_pay_enter==1||sell_pay_check==1" v-model="params.pay_status" active-color="#13ce66" inactive-color="#ff4949"
                       active-text="已收款" inactive-text="未收款" active-value="1" inactive-value="0" @change="submitStateModify(scope.row,'pay_status')">

            </el-switch>
            <div v-else>
              <span v-if="scope.row.pay_status==0">未收款</span>
              <span v-if="scope.row.pay_status==1">已收款</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="name" label="开票状态" width="165">
          <template slot-scope="scope">
            <el-switch v-if="sell_invoice_enter==1||sell_invoice_check==1" v-model="params.invoice_status" active-color="#13ce66"
                       inactive-color="#ff4949" active-text="已开票" inactive-text="未开票" active-value="1" inactive-value="0" @change="submitStateModify(scope.row,'invoice_status')">
            </el-switch>
            <div v-else>
              <span v-if="scope.row.invoice_status==0">未开票</span>
              <span v-if="scope.row.invoice_status==1">已开票</span>
            </div>

          </template>
        </el-table-column>
        <el-table-column label="出货状态" width="165">
          <template slot-scope="scope">
            <el-switch v-if="sell_store==1&&scope.row.check_status==2&&scope.row.is_out_store==0" v-model="params.is_out_store" active-color="#13ce66" inactive-color="#ff4949"
                       active-text="已出货" inactive-text="未出货" active-value="1" inactive-value="0" @change="outStore(scope.row)">
            </el-switch>
            <div v-else>
              <el-switch v-model="params.is_out_store" active-color="#13ce66" inactive-color="#ff4949"
                         active-text="已出货" inactive-text="未出货" active-value="1" inactive-value="0" disabled>
              </el-switch>
            </div>

          </template>
        </el-table-column>
        <el-table-column prop="sell_user" label="销售员">
        </el-table-column>
        <el-table-column prop="business_user" label="商务专员">
        </el-table-column>
        <el-table-column prop="create_user_name" label="录入人员">
        </el-table-column>
        <el-table-column prop="check_user_name" label="审核人员">
        </el-table-column>
       <!-- <el-table-column prop="remarks" label="备注">
        </el-table-column>
-->
        <el-table-column label="操作" fixed="right" width="200px" class="cz-cell" style="text-align: left">

          <template slot-scope="scope">

            <!--不是超级管理员-->
            <div v-if="scope.row.is_super==0">

              <!--同时有销售录入删除权限和销售审核权限-->
              <div  v-if="scope.row.sell_enter==1&&scope.row.sell_check==1">

                <!--order_type为0时代表是后台订单-->
                <div v-if="scope.row.order_type==0">
                  <!--有录入权限，在执行录入功能的时候，需要判断订单是不是别人录入的订单，录入人员无法编辑别人录入的订单-->
                  <!--是自己录入的订单时-->
                  <div v-if="userId==scope.row.create_user_id">
                    <!--未提交审核和审核不通过时-->
                    <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                      <el-button v-if="scope.row.check_status==0" size="mini" type="primary" disabled>未提交审核</el-button>
                      <el-button v-if="scope.row.check_status==3" size="mini" type="primary" disabled>审核不通过</el-button>
                      <el-button v-if="scope.row.check_status==3" size="mini" type="primary"  @click="checkReason(scope.row.refuse_reason)">查看不通过原因</el-button>
                      <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                      <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
                      <el-button size="mini" type="primary" @click="upCheck(scope.row)">提交审核</el-button>
                    </div>

                    <!--提交审核时和审核被拒时重新提交审核时-->
                    <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                      <el-button size="mini" type="primary" disabled>正在审核</el-button>
                      <el-button size="mini" type="primary" @click="orderPassOrNot(scope.row,'y','admin')">审核通过</el-button>
                      <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n','admin')">审核不通过</el-button>
                    </div>

                    <!--审核通过后-->
                    <div v-if="scope.row.check_status==2">
                      <el-button size="mini" type="primary" disabled>审核通过</el-button>
                    </div>

                  </div>
                  <div v-else>
                    <!--未提交审核和审核不通过时-->
                    <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                      <el-button v-if="scope.row.check_status==0" size="mini" type="primary" disabled>未提交审核</el-button>
                      <el-button v-if="scope.row.check_status==3" size="mini" type="primary" disabled>审核不通过</el-button>
                      <el-button v-if="scope.row.check_status==3" size="mini" type="primary"  @click="checkReason(scope.row.refuse_reason)">查看不通过原因</el-button>
                      <el-button size="mini" type="primary" disabled>编辑</el-button>
                      <el-button size="mini" type="danger" disabled>删除</el-button>
                      <el-button size="mini" type="primary" disabled>提交审核</el-button>
                    </div>
                    <!--提交审核时和审核被拒时重新提交审核时-->
                    <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                      <el-button size="mini" type="primary" disabled>正在审核</el-button>
                      <el-button size="mini" type="primary" @click="orderPassOrNot(scope.row,'y','admin')">审核通过</el-button>
                      <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n','admin')">审核不通过</el-button>
                    </div>

                    <!--审核通过后-->
                    <div v-if="scope.row.check_status==2">
                      <el-button size="mini" type="primary" disabled>审核通过</el-button>
                    </div>
                  </div>



                </div>


                <!--order_type为1时代表是前端订单-->
                <div v-if="scope.row.order_type==1">

                  <!--未提交订单-->
                  <div v-if="scope.row.check_status==0">
                    <el-button  size="mini" type="primary" disabled>未提交订单</el-button>
                    <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
                  </div>
                  <!--前端已提交订单和订单被拒后重新提交订单-->
                  <div v-if="scope.row.check_status==11||scope.row.check_status==14">
                    <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
                    <el-button size="mini" type="primary" @click="upCheck(scope.row)">提交审核</el-button>
                    <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n','web')">订单不通过</el-button>
                  </div>
                  <!--前端订单不通过，查看订单不通过原因-->
                  <div v-if="scope.row.check_status==13">
                    <el-button  size="mini" type="primary" disabled>订单申请失败</el-button>
                    <el-button  size="mini" type="primary"  @click="checkReason(scope.row.client_refuse_reason)">查看订单申请失败原因</el-button>
                  </div>

                  <!--订单通过后，提交审核时和审核被拒时重新提交审核时-->
                  <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                    <el-button size="mini" type="primary" disabled>正在审核</el-button>
                    <el-button size="mini" type="primary" @click="orderPassOrNot(scope.row,'y','admin')">审核通过</el-button>
                    <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n','admin')">审核不通过</el-button>
                  </div>
                  <!--审核通过后-->
                  <div v-if="scope.row.check_status==2">
                    <el-button size="mini" type="primary" disabled>审核通过</el-button>
                  </div>

                  <!--审核不通过时-->
                  <div v-if="scope.row.check_status==3">
                    <el-button  size="mini" type="primary" disabled>审核不通过</el-button>
                    <el-button  size="mini" type="primary"  @click="checkReason(scope.row.refuse_reason)">查看不通过原因</el-button>
                    <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n','web')">订单不通过</el-button>
                    <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
                    <el-button size="mini" type="primary" @click="upCheck(scope.row)">提交审核</el-button>
                  </div>


                </div>

              </div>



              <!--只有销售录入删除权限，没有销售审核权限-->
              <div  v-if="scope.row.sell_enter==1&&scope.row.sell_check==0">
                <!--order_type为0时代表是后台订单-->
                <div v-if="scope.row.order_type==0">
                  <!--有录入权限，在执行录入功能的时候，需要判断订单是不是别人录入的订单，录入人员无法编辑别人录入的订单-->
                  <!--是自己录入的订单时-->
                  <div v-if="userId==scope.row.create_user_id">
                    <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                      <el-button v-if="scope.row.check_status==3" size="mini" type="primary" disabled>审核不通过</el-button>
                      <el-button v-if="scope.row.check_status==3" size="mini" type="primary"  @click="checkReason(scope.row.refuse_reason)">查看不通过原因</el-button>
                      <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                      <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
                      <el-button size="mini" type="primary" @click="upCheck(scope.row)">提交审核</el-button>
                    </div>
                    <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                      <el-button size="mini" type="primary" disabled>正在审核</el-button>
                  <!--    <el-button size="mini" type="primary" @click="modifyState(scope.row)">修改订单状态</el-button>-->
                    </div>
                    <div v-if="scope.row.check_status==2">
                      <el-button size="mini" type="primary" disabled>审核通过</el-button>
          <!--            <el-button size="mini" type="primary" @click="modifyState(scope.row)">修改订单状态</el-button>-->
                    </div>
                  </div>
                  <div v-else>
                    <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                      <el-button v-if="scope.row.check_status==3" size="mini" type="primary" disabled>审核不通过</el-button>
                      <el-button v-if="scope.row.check_status==3" size="mini" type="primary"  @click="checkReason(scope.row.refuse_reason)">查看不通过原因</el-button>
                      <el-button size="mini" type="primary" disabled>编辑</el-button>
                      <el-button size="mini" type="danger" disabled>删除</el-button>
                      <el-button size="mini" type="primary" disabled>提交审核</el-button>
                    </div>
                    <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                      <el-button size="mini" type="primary" disabled>正在审核</el-button>
                    </div>
                    <div v-if="scope.row.check_status==2">
                      <el-button size="mini" type="primary" disabled>审核通过</el-button>
                    </div>
                  </div>

                </div>
                <!--order_type为0时代表是前端订单-->
                <div v-if="scope.row.order_type==1">
                  <!--未提交订单-->
                  <div v-if="scope.row.check_status==0">
                    <el-button  size="mini" type="primary" disabled>未提交订单</el-button>
                    <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
                  </div>
                  <!--前端已提交订单和订单被拒后重新提交订单-->
                  <div v-if="scope.row.check_status==11||scope.row.check_status==14">
                    <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
                    <el-button size="mini" type="primary" @click="upCheck(scope.row)">提交审核</el-button>
                    <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n','web')">订单不通过</el-button>
                  </div>
                  <!--前端订单不通过，查看订单不通过原因-->
                  <div v-if="scope.row.check_status==13">
                    <el-button  size="mini" type="primary" disabled>订单申请失败</el-button>
                    <el-button  size="mini" type="primary"  @click="checkReason(scope.row.client_refuse_reason)">查看订单申请失败原因</el-button>
                  </div>
                  <!--订单通过后，提交审核时和审核被拒时重新提交审核时-->
                  <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                    <el-button size="mini" type="primary" disabled>正在审核</el-button>
                  </div>
                  <!--审核通过后-->
                  <div v-if="scope.row.check_status==2">
                    <el-button size="mini" type="primary" disabled>审核通过</el-button>
                  </div>
                  <!--审核不通过时-->
                  <div v-if="scope.row.check_status==3">
                    <el-button  size="mini" type="primary" disabled>审核不通过</el-button>
                    <el-button  size="mini" type="primary"  @click="checkReason(scope.row.refuse_reason)">查看不通过原因</el-button>
                    <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n','web')">订单不通过</el-button>
                    <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
                    <el-button size="mini" type="primary" @click="upCheck(scope.row)">提交审核</el-button>
                  </div>

                </div>

              </div>



              <!--没有销售录入删除权限，只有销售审核权限-->
              <div  v-if="scope.row.sell_enter==0&&scope.row.sell_check==1">

                <!--order_type为0时代表是后台订单-->
                <div v-if="scope.row.order_type==0">
                  <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                    <el-button v-if="scope.row.check_status==0" size="mini" type="primary" disabled>未提交审核</el-button>
                    <el-button v-if="scope.row.check_status==3" size="mini" type="primary" disabled>审核不通过</el-button>
                    <el-button v-if="scope.row.check_status==3" size="mini" type="primary"  @click="checkReason(scope.row.refuse_reason)">查看不通过原因</el-button>
                  </div>
                  <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                    <el-button size="mini" type="primary" @click="orderPassOrNot(scope.row,'y','admin')">审核通过</el-button>
                    <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n','admin')">审核不通过</el-button>
                  </div>
                  <div v-if="scope.row.check_status==2">
                    <el-button size="mini" type="primary" disabled>审核通过</el-button>
                  </div>
                </div>
                <!--order_type为1时代表是前端订单-->
                <div v-if="scope.row.order_type==1">
                  <div v-if="scope.row.check_status==0||scope.row.check_status==11||scope.row.check_status==13||scope.row.check_status==14">
                    <el-button size="mini" type="primary" disabled>未提交审核</el-button>
                  </div>

                  <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                    <el-button size="mini" type="primary" @click="orderPassOrNot(scope.row,'y','admin')">审核通过</el-button>
                    <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n','admin')">审核不通过</el-button>
                  </div>
                  <div v-if="scope.row.check_status==2">
                    <el-button size="mini" type="primary" disabled>审核通过</el-button>
                  </div>
                  <div v-if="scope.row.check_status==3">
                    <el-button v-if="scope.row.check_status==3" size="mini" type="primary" disabled>审核不通过</el-button>
                    <el-button v-if="scope.row.check_status==3" size="mini" type="primary"  @click="checkReason(scope.row.refuse_reason)">查看不通过原因</el-button>
                  </div>


                </div>


              </div>

              <!--没有销售录入删除权限，没有销售审核权限-->
              <div  v-if="scope.row.sell_enter==0&&scope.row.sell_check==0">
                <!--order_type为0时代表是后台订单-->
                <div v-if="scope.row.order_type==0">
                  <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                    <el-button v-if="scope.row.check_status==3" size="mini" type="primary" disabled>审核不通过</el-button>
                    <el-button v-if="scope.row.check_status==3" size="mini" type="primary"  @click="checkReason(scope.row.refuse_reason)">查看不通过原因</el-button>
                    <el-button size="mini" type="primary" disabled>编辑</el-button>
                    <el-button size="mini" type="danger" disabled>删除</el-button>
                    <el-button size="mini" type="primary" disabled>提交审核</el-button>
                  </div>
                  <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                    <el-button size="mini" type="primary" disabled>正在审核</el-button>
                  </div>
                  <div v-if="scope.row.check_status==2">
                    <el-button size="mini" type="primary" disabled>审核通过</el-button>
                  </div>
                </div>
                <!--order_type为1时代表是前台订单-->
                <div v-if="scope.row.order_type==1">
                  <!--未提交订单-->
                  <div v-if="scope.row.check_status==0">
                    <el-button  size="mini" type="primary" disabled>未提交订单</el-button>
                    <el-button size="mini" type="primary" disabled>编辑</el-button>
                    <el-button size="mini" type="danger" disabled>删除</el-button>
                  </div>
                  <!--前端已提交订单和订单被拒后重新提交订单-->
                  <div v-if="scope.row.check_status==11||scope.row.check_status==14">
                    <el-button size="mini" type="primary" disabled>编辑</el-button>
                    <el-button size="mini" type="danger" disabled>删除</el-button>
                    <el-button size="mini" type="primary" disabled>提交审核</el-button>
                    <el-button size="mini" type="danger" disabled>订单不通过</el-button>
                  </div>
                  <!--前端订单不通过，查看订单不通过原因-->
                  <div v-if="scope.row.check_status==13">
                    <el-button  size="mini" type="primary" disabled>订单申请失败</el-button>
                    <el-button  size="mini" type="primary"  disabled>查看订单申请失败原因</el-button>
                  </div>
                  <!--订单通过后，提交审核时和审核被拒时重新提交审核时-->
                  <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                    <el-button size="mini" type="primary" disabled>正在审核</el-button>
                  </div>
                  <!--审核通过后-->
                  <div v-if="scope.row.check_status==2">
                    <el-button size="mini" type="primary" disabled>审核通过</el-button>
                  </div>
                  <!--审核不通过时-->
                  <div v-if="scope.row.check_status==3">
                    <el-button  size="mini" type="primary" disabled>审核不通过</el-button>
                    <el-button v-if="scope.row.check_status==3" size="mini" type="primary"  @click="checkReason(scope.row.refuse_reason)">查看不通过原因</el-button>
                    <el-button size="mini" type="danger" disabled>订单不通过</el-button>
                    <el-button size="mini" type="primary" disabled>编辑</el-button>
                    <el-button size="mini" type="danger" disabled>删除</el-button>
                    <el-button size="mini" type="primary" disabled>提交审核</el-button>
                  </div>
                </div>

              </div>
            </div>


            <!--超级管理员-->
            <div v-if="scope.row.is_super==1">

              <!--order_type为0时代表是后台订单-->
              <div v-if="scope.row.order_type==0">
                <!--有录入权限，在执行录入功能的时候，需要判断订单是不是别人录入的订单，录入人员无法编辑别人录入的订单-->
                <!--是自己录入的订单时-->
                <div v-if="userId==scope.row.create_user_id">
                  <!--未提交审核和审核不通过时-->
                  <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                    <el-button v-if="scope.row.check_status==0" size="mini" type="primary" disabled>未提交审核</el-button>
                    <el-button v-if="scope.row.check_status==3" size="mini" type="primary" disabled>审核不通过</el-button>
                    <el-button v-if="scope.row.check_status==3" size="mini" type="primary"  @click="checkReason(scope.row.refuse_reason)">查看不通过原因</el-button>
                    <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="primary" @click="upCheck(scope.row)">提交审核</el-button>
                  </div>

                  <!--提交审核时和审核被拒时重新提交审核时-->
                  <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                    <el-button size="mini" type="primary" disabled>正在审核</el-button>
                    <el-button size="mini" type="primary" @click="orderPassOrNot(scope.row,'y','admin')">审核通过</el-button>
                    <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n','admin')">审核不通过</el-button>
                  </div>

                  <!--审核通过后-->
                  <div v-if="scope.row.check_status==2">
                    <el-button size="mini" type="primary" disabled>审核通过</el-button>
                  </div>
                </div>
                <div v-else>
                  <!--未提交审核和审核不通过时-->
                  <div v-if="scope.row.check_status==0||scope.row.check_status==3">
                    <el-button v-if="scope.row.check_status==0" size="mini" type="primary" disabled>未提交审核</el-button>
                    <el-button v-if="scope.row.check_status==3" size="mini" type="primary" disabled>审核不通过</el-button>
                    <el-button v-if="scope.row.check_status==3" size="mini" type="primary"  @click="checkReason(scope.row.refuse_reason)">查看不通过原因</el-button>
                    <el-button size="mini" type="primary" disabled>编辑</el-button>
                    <el-button size="mini" type="primary" disabled>提交审核</el-button>
                  </div>

                  <!--提交审核时和审核被拒时重新提交审核时-->
                  <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                    <el-button size="mini" type="primary" disabled>正在审核</el-button>
                    <el-button size="mini" type="primary" @click="orderPassOrNot(scope.row,'y','admin')">审核通过</el-button>
                    <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n','admin')">审核不通过</el-button>
                  </div>

                  <!--审核通过后-->
                  <div v-if="scope.row.check_status==2">
                    <el-button size="mini" type="primary" disabled>审核通过</el-button>
                  </div>
                </div>


              </div>


              <!--order_type为1时代表是前端订单-->
              <div v-if="scope.row.order_type==1">

                <!--未提交订单-->
                <div v-if="scope.row.check_status==0">
                  <el-button  size="mini" type="primary" disabled>未提交订单</el-button>
                  <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                </div>
                <!--前端已提交订单和订单被拒后重新提交订单-->
                <div v-if="scope.row.check_status==11||scope.row.check_status==14">
                  <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                  <el-button size="mini" type="primary" @click="upCheck(scope.row)">提交审核</el-button>
                  <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n','web')">订单不通过</el-button>
                </div>
                <!--前端订单不通过，查看订单不通过原因-->
                <div v-if="scope.row.check_status==13">
                  <el-button  size="mini" type="primary" disabled>订单申请失败</el-button>
                  <el-button  size="mini" type="primary"  @click="checkReason(scope.row.client_refuse_reason)">查看订单申请失败原因</el-button>
                </div>

                <!--订单通过后，提交审核时和审核被拒时重新提交审核时-->
                <div v-if="scope.row.check_status==1||scope.row.check_status==4">
                  <el-button size="mini" type="primary" disabled>正在审核</el-button>
                  <el-button size="mini" type="primary" @click="orderPassOrNot(scope.row,'y','admin')">审核通过</el-button>
                  <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n','admin')">审核不通过</el-button>
                </div>
                <!--审核通过后-->
                <div v-if="scope.row.check_status==2">
                  <el-button size="mini" type="primary" disabled>审核通过</el-button>
                </div>

                <!--审核不通过时-->
                <div v-if="scope.row.check_status==3">
                  <el-button  size="mini" type="primary" disabled>审核不通过</el-button>
                  <el-button  size="mini" type="primary"  @click="checkReason(scope.row.refuse_reason)">查看不通过原因</el-button>
                  <el-button size="mini" type="danger" @click="orderPassOrNot(scope.row,'n','web')">订单不通过</el-button>
                  <el-button size="mini" type="primary" @click="orderEdit(scope.row)">编辑</el-button>
                  <el-button size="mini" type="primary" @click="upCheck(scope.row)">提交审核</el-button>
                </div>
              </div>
              <el-button size="mini" type="danger" @click="orderDelete(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
  import config from '../../../api/config'
  import axios from 'axios'
  import {submit_check_order,delete_order,check_order,sell_change_order_status,check_client_order,set_order_out_stores} from '../../../api/index'
  export default {
    props:{
      sellOrderId:''
    },
    created(){
      this.sell_enter=window.sessionStorage.getItem('sell_enter');
      this.sell_check=window.sessionStorage.getItem('sell_check');
      this.is_super=window.sessionStorage.getItem('is_super');
      this.sell_store=window.sessionStorage.getItem('sell_store');
      this.sell_pay_enter=window.sessionStorage.getItem('sell_pay_enter');
      this.sell_pay_check=window.sessionStorage.getItem('sell_pay_check');
      this.sell_invoice_enter=window.sessionStorage.getItem('sell_invoice_enter');
      this.sell_invoice_check=window.sessionStorage.getItem('sell_invoice_check');
      this.params.token=window.sessionStorage.getItem('session');
      this.userId=window.sessionStorage.getItem('userId');
      this.super_lookover=window.sessionStorage.getItem('super_lookover');
      this.getData();
    },
    data(){
      return {
        dialogFormVisible:false,
        sell_enter:'',
        sell_check:'',
        is_super:'',
        sell_store:'',
        sell_pay_enter:'',
        sell_pay_check:'',
        sell_invoice_enter:'',
        sell_invoice_check:'',
        order:[],/*销售订单表格*/
        params:{
          token:'',
          id:'',
          is_out_store:'',
          invoice_status:'',
          pay_status:''
        }
      }
    },
    methods:{
      getData(){
        var _this=this;
        axios.get(config.get_order_detail+this.$route.params.sellOrderId).then(function (res) {
          /*销售订单表格*/
          _this.order=res.data.data.order;
          _this.order[0].sell_enter=_this.sell_enter;
          _this.order[0].sell_check=_this.sell_check;
          _this.order[0].is_super=_this.is_super;
          _this.params.is_out_store=_this.order[0].is_out_store;
          _this.params.invoice_status=_this.order[0].invoice_status;
          _this.params.pay_status=_this.order[0].pay_status;
        }).catch(function (err) {
          console.log(err);
        })
      },
      orderEdit(row){
        this.$router.push({'name':'add_sell_order',params:{'type':'edit','id':row.id}});
      },
      orderDelete(row){
        var _this=this;
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delete_order({'token':window.sessionStorage.getItem('session'),'id':row.id}).then(function (res) {
            if(res.data.errcode==0){
              _this.$message({
                message: '删除成功',
                type: 'success'
              });
              _this.$router.push('/admin_view/sell_order');
            }else{
              _this.$message({
                message: res.data.errdesc,
                type: 'warning'
              })
            }
          }).catch(function (err) {
            console.log(err);
          })
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      orderPassOrNot(row,is_pass,type){
        var _this=this;
        var obj={};
        obj.token=window.sessionStorage.getItem('session');
        obj.id=row.id;
        obj.is_pass=is_pass;
        if(is_pass=='n'){
          this.$prompt('请输入不通过原因', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({ value }) => {
            obj.reason=value;
            if(type=='admin'){
              _this.upPassOrNot(obj,obj.id);
            }else{
              _this.upWebPassOrNot(obj,obj.id);
            }

          }).catch(() => {
            _this.$message({
              type: 'info',
              message: '已取消审核'
            });
          });
        }else{
          obj.reason='';
          if(type=='admin'){
            _this.upPassOrNot(obj,obj.id);
          }else{
            _this.upWebPassOrNot(obj,obj.id);
          }

        }
      },
      /*审核通过不通过*/
      upPassOrNot(obj,id){
        var _this=this;
        check_order(obj).then(function (res) {
          if(res.data.errcode==0){
            _this.$message({
              type: 'success',
              message: '提交成功'
            });
            location.reload();
          }else{
            _this.$message({
              message: res.data.errdesc,
              type: 'warning'
            })
          }
        }).catch(function (err) {
          console.log(err);
        })
      },
      /*审核前端订单通过不通过*/
      upWebPassOrNot(obj,id){
        var _this=this;
        check_client_order(obj).then(function (res) {
          if(res.data.errcode==0){
            _this.$message({
              type: 'success',
              message: '提交成功'
            });
            location.reload();
          }else{
            _this.$message({
              message: res.data.errdesc,
              type: 'warning'
            })
          }
        }).catch(function (err) {
          console.log(err);
        })
      },
/*提交审核*/
      upCheck(row){
        var _this=this;
        submit_check_order({'token':window.sessionStorage.getItem('session'),'id':row.id}).then(function (res) {
          if(res.data.errcode==0){
            _this.$message({
              message: '提交成功',
              type: 'success'
            });
            location.reload();
          }else{
            _this.$message({
              message: res.data.errdesc,
              type: 'warning'
            })
          }
        }).catch(function (err) {
          console.log(err);
        })
      },
      checkReason(reason){
        this.$alert(reason, '审核不通过原因');
      },
      submitStateModify(row,type){
        var _this=this;
        var obj={};
        obj.token=window.sessionStorage.getItem('session');
        obj.id=row.id;
        obj.type=type;
        obj.value=_this.params[type];
        sell_change_order_status(obj).then(function (res) {
          if(res.data.errcode==0){
            _this.$message({
              message: '修改成功',
              type: 'success'
            });
           /* _this.dialogFormVisible=false;*/
            _this.getData();
          }else{
            _this.$message({
              message: res.data.errdesc,
              type: 'warning'
            });
          /*  _this.dialogFormVisible=false;*/
          }
        })
      },
      outStore(row){
        var _this=this;
        var obj={};
        obj.token=window.sessionStorage.getItem('session');
        obj.id=row.id;
        set_order_out_stores(obj).then(function (res) {
          if(res.data.errcode==0){
            _this.$message({
              message: '出库成功',
              type: 'success'
            });
            _this.getData();
          }else{
            _this.$message({
              message: res.data.errdesc,
              type: 'warning'
            })
            _this.getData();
          }
        }).catch(function (err) {
          console.log(err);
        })
      }

    }
  }
</script>
<style>
  .cell button{
    margin:5px;
  }
  .el-table div{
    display: inline-block;
  }
</style>
