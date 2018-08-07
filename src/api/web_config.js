/**
 * Created by Administrator on 2017/11/25.
 */
let base = 'http://www.v1gang.com/index.php';
/*测试接口*/
/*let base = ' http://114.112.175.138/admin_test/index.php'*/

export default{

  // 上传图片功能
  uploadImg: `${base}/user/uploadpic`,

  //创建账号
  apply_create_user: `${base}/user/apply_create_user`,

  //审核失败后：获取自己的所有信息
  get_user_detail:`${base}/user/get_user_detail`,

  //审核失败后：重新修改并提交审核
  apply_update_user_account:`${base}/user/apply_update_user_account`,

  //用户登录
  login:`${base}/user/user_login`,


  /*获取登录用户的销售管理列表*/
  list_user_orders:`${base}/order_sell/list_user_orders`,

  /*获取登录用户的销售订单详情*/
  get_user_order_detail:`${base}/order_sell/get_user_order_detail`,

  /*用户创建/编辑订单*/
  user_edit_order:`${base}/order_sell/user_edit_order`,

  /* 用户新建或编辑销售清单*/
  user_edit_order_detail:`${base}/order_sell/user_edit_order_detail`,

  /* 用户删除销售订单*/
  user_delete_order:`${base}/order_sell/user_delete_order`,


  /* 用户删除销售清单*/
  user_delete_order_detail:`${base}/order_sell/user_delete_order_detail`,

  /*用户提交订单审核*/
  user_submit_check_order:`${base}/order_sell/user_submit_check_order`,

  /*用户订单填写折扣折让*/
  user_fill_order_discount:`${base}/order_sell/user_fill_order_discount`,


}
