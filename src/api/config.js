/**
 * Created by zouwengfeng on 17/7/14.
 */

/*正式接口*/

let base = 'http://www.v1gang.com/index.php';

/*测试接口*/
/*let base = ' http://114.112.175.138/admin_test/index.php'*/


export default{

  // 登录功能
  adminLogin: `${base}/user/admin_login`,

  // 注册功能
  addAdmin: `${base}/user/edit_adminstrator`,

  //操作员列表
  adminList:`${base}/user/list_administrator`,

  //删除操作员列表
  deleteAdminList:`${base}/user/delete_adminstrator`,

  /*获取某个管理员的详情*/
  get_administrator_detail:`${base}/user/get_administrator_detail`,

  //供应商列表
  list_supplier:`${base}/system_manager/list_supplier`,

  //删除供应商名称列表
  delete_supplier:`${base}/system_manager/delete_supplier`,

  //新建或编辑供应商名称
  edit_supplier:`${base}/system_manager/edit_supplier`,

  //新建或编辑存货分类
  edit_saveClassify:`${base}/system_manager/edit_goods_type`,


  //删除存货分类
  delete_saveClassify:`${base}/system_manager/delete_goods_type`,

  //获取存货分类列表
  list_procure_classify:`${base}/system_manager/list_goods_type`,

  //获取采购主体列表
  list_procure_entity:`${base}/system_manager/list_procure_entity`,

  //删除采购主体
  delete_procure_entity:`${base}/system_manager/delete_procure_entity`,

  //新建或编辑供应商名称
  edit_procure_entity:`${base}/system_manager/edit_procure_entity`,


  //获取存货名称列表
  list_goods_name:`${base}/system_manager/list_goods_name`,

  //删除存货名称
  delete_goods_name:`${base}/system_manager/delete_goods_name`,

  //新建或编辑存货名称接口
  edit_goods_name:`${base}/system_manager/edit_goods_name`,

  //获取存货地址列表
  list_location:`${base}/system_manager/list_goods_address`,

  //删除存货地址
  delete_location:`${base}/system_manager/delete_goods_address`,

  //新建或编辑存货地址接口
  edit_location:`${base}/system_manager/edit_goods_address`,





  /*获取销售筛选参数列表*/
  list_all_sell_select:`${base}/system_manager/list_all_sell_select`,

/*获取销售订单列表*/
  list_orders:`${base}/order_sell/list_orders`,

  /*获取销售订单详情*/
  get_order_detail:`${base}/order_sell/get_order_detail/`,

  /*销售订单提交审核*/
  submit_check_order:`${base}/order_sell/submit_check_order`,


  /*销售员对客户端提交的订单进行审核*/
  check_client_order:`${base}/order_sell/check_client_order`,



  /*获取客户名称列表*/
  list_clients:`${base}/system_manager/list_clients`,



  /*新建或编辑销售订单*/
  edit_order:`${base}/order_sell/edit_order`,

  /*新建或编辑销售清单*/
  edit_order_detail:`${base}/order_sell/edit_order_detail`,

  /*新建或编辑收款单*/
  edit_order_pay:`${base}/order_sell/edit_order_pay`,

  /*新建或编辑销售开票*/
  edit_order_invoice:`${base}/order_sell/edit_order_invoice`,

  /*新建或编辑销售退货单*/
  edit_order_return:`${base}/order_sell/edit_order_return`,

  /*新建或编辑销售退货开票*/
  edit_order_return_invoice:`${base}/order_sell/edit_order_return_invoice`,


  /*获取编辑时的销售订单详情*/
  get_edit_order_detail:`${base}/order_sell/get_edit_order_detail/`,

  /*获取编辑时的销售清单详情*/
  get_edit_order_sub_detail:`${base}/order_sell/get_edit_order_sub_detail/`,

  /*获取销售收款单详情*/
  get_order_pay_detail:`${base}/order_sell/get_order_pay_detail/`,

  /*获取销售开票详情*/
  get_order_invoice_detail:`${base}/order_sell/get_order_invoice_detail/`,

  /*获取销售退货单详情*/
  get_order_return_detail:`${base}/order_sell/get_order_return_detail/`,
  /*获取销售退货开票详情*/
  get_order_return_invoice_detail:`${base}/order_sell/get_order_return_invoice_detail/`,



  /*删除销售订单*/
  delete_order:`${base}/order_sell/delete_order`,

  /*删除销售清单*/
  delete_order_detail:`${base}/order_sell/delete_order_detail`,

  /*删除销售收款单*/
  delete_order_pay:`${base}/order_sell/delete_order_pay`,

  /*删除销售开票*/
  delete_order_invoice:`${base}/order_sell/delete_order_invoice`,

  /*删除销售退货单*/
  delete_order_return:`${base}/order_sell/delete_order_return`,

  /*删除销售退货开票*/
  delete_order_return_invoice:`${base}/order_sell/delete_order_return_invoice`,


  /*销售订单审核通过/审核不通过*/
  check_order:`${base}/order_sell/check_order`,


  /*查看销售清单批次*/
  list_order_batchs:`${base}/order_sell/list_order_batchs/`,


  /*查看销售退货单批次*/
  list_order_return_batchs:`${base}/order_sell/list_order_return_batchs/`,


  /*销售退货单提交审核*/
  submit_check_order_return:`${base}/order_sell/submit_check_order_return`,

  /*销售退货单审核通过不通过*/
  check_order_return:`${base}/order_sell/check_order_return`,



  //获取采购筛选参数列表
  list_all_purchase_select:`${base}/system_manager/list_all_purchase_select`,

  //获取采购订单列表
  list_purchase_orders:`${base}/order_purchase/list_orders`,

  //获取采购订单详情
  get_purchase_order_detail:`${base}/order_purchase/get_order_detail/`,

  /*采购订单提交审核*/
  submit_purchase_check_order:`${base}/order_purchase/submit_check_order`,

  /*采购订单审核通过/审核不通过*/
  purchase_check_order:`${base}/order_purchase/check_order`,


  /* 修改采购订单状态*/
  change_order_status:`${base}/order_purchase/change_order_status`,

  /* 修改销售订单状态*/
  sell_change_order_status:`${base}/order_sell/change_order_status`,

  /*删除采购订单*/
  purchase_delete_order:`${base}/order_purchase/delete_order`,

  /* 删除采购清单*/
  purchase_delete_order_detail:`${base}/order_purchase/delete_order_detail`,

  /*删除付款单*/
  purchase_delete_order_pay:`${base}/order_purchase/delete_order_pay`,

  /*删除采购开票*/
  purchase_delete_order_invoice:`${base}/order_purchase/delete_order_invoice`,



  /*获取编辑时展示的采购详情*/
  purchase_edit_order_detail:`${base}/order_purchase/get_edit_order_detail/`,

  /*获取编辑时采购清单详情*/
  purchase_edit_order_sub_detail:`${base}/order_purchase/get_edit_order_sub_detail/`,

  /*获取采购收款单详情*/
  purchase_order_pay_detail:`${base}/order_purchase/get_order_pay_detail/`,

  /*获取采购开票详情*/
  purchase_order_invoice_detail:`${base}/order_purchase/get_order_invoice_detail/`,



  /*新建或编辑采购订单*/
  edit_purchase_order:`${base}/order_purchase/edit_order`,

  /*新建或编辑采购清单*/
  edit_purchase_order_detail:`${base}/order_purchase/edit_order_detail`,

  /*新建或编辑付款单*/
  edit_purchase_order_pay:`${base}/order_purchase/edit_order_pay`,

  /*新建或编辑采购开票*/
  edit_purchase_order_invoice:`${base}/order_purchase/edit_order_invoice`,

  /*客户名称列表*/
  customer_lsit:`${base}/system_manager/list_clients`,

  /*客户名称列表详细信息*/
  get_user_detail:`${base}/user/get_user_detail`,

  /*审核某个用户*/
  check_client:`${base}/system_manager/check_client`,

  /*删除用户*/
  delete_client:`${base}/system_manager/delete_client`,

  /*操作记录 — 每页返回20条数据*/
  list_operations:`${base}/system_manager/list_operations`,

  /*订单回收站— 销售订单*/

  list_recycle_sell:`${base}/system_manager/list_recycle_sell`,

  /*采购订单*/
  list_recycle_purchase:`${base}/system_manager/list_recycle_purchase`,

  /*获取库存管理列表*/
  list_order_stores:`${base}/order_store/list_order_stores`,

  /*获取库存管理的某个详情 — 对应批次的*/
  list_order_stores_detail:`${base}/order_store/list_order_stores_detail`,

  /*导出供应商名称*/
  export_supplier_list:`${base}/system_manager/export_supplier_list`,


  /*还原销售订单*/
  restore_recycle_sell:`${base}/system_manager/restore_recycle_sell`,

  /*还原采购订单*/
  restore_recycle_purchase:`${base}/system_manager/restore_recycle_purchase`,

  /*新建采购付款单---获取供应商—采购主体的剩余返利金额*/
  get_entity_supplier_rebate:`${base}/order_purchase/get_entity_supplier_rebate`,

  /*采购付款单提交审核*/
  submit_check_order_pay:`${base}/order_purchase/submit_check_order_pay`,

  /*采购付款单审核通过/不通过*/
  check_order_pay:`${base}/order_purchase/check_order_pay`,

  /*采购开票提交审核*/
  submit_check_order_invoice:`${base}/order_purchase/submit_check_order_invoice`,

  /*采购开票审核通过/不通过*/
  check_order_invoice:`${base}/order_purchase/check_order_invoice`,

  /*采购订单入库*/
  set_order_into_stores:`${base}/order_purchase/set_order_into_stores`,

  /*获取客户—销售主体的剩余总返利*/
  get_entity_client_rebate:`${base}/order_sell/get_entity_client_rebate`,


  /*销售付款单提交审核*/
  submit_check_sell_order_pay:`${base}/order_sell/submit_check_order_pay`,



  /*销售付款单审核通过/不通过*/
  check_sell_order_pay:`${base}/order_sell/check_order_pay`,


  /*销售开票提交审核*/
  submit_check_sell_order_invoice:`${base}/order_sell/submit_check_order_invoice`,


  /*销售开票审核通过/不通过*/
  check_sell_order_invoice:`${base}/order_sell/check_order_invoice`,

  /*销售退货开票提交审核 */
  submit_check_order_return_invoice:`${base}/order_sell/submit_check_order_return_invoice`,

  /*销售退货开票审核通过/不通过 */
  check_order_return_invoice:`${base}/order_sell/check_order_return_invoice`,

  /*销售订单出库 */
  set_order_out_stores:`${base}/order_sell/set_order_out_stores`,

  /*后台管理员修改自己的密码 */
  edit_self_password:`${base}/user/edit_self_password`,

  /*采购订单填写折扣折让*/
  fill_order_discount:`${base}/order_purchase/fill_order_discount`,


  /*销售订单填写折扣折让*/
  sell_fill_order_discount:`${base}/order_sell/fill_order_discount`,

}

