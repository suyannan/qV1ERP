import config from './config'
import axios from 'axios'
var qs = require('qs');
/*axios.defaults.withCredentials = true;*/
import router from '../router/index'
/*axios.interceptors.response.use(
  response => {
        if(response.data.errcode==90000){
          alert(response.data.errdesc);
          window.sessionStorage.removeItem('session');
          router.replace({
            path: '/admin_view',
            query: {redirect: router.currentRoute.fullPath}
          });
          return;
        }
    return response;
  },
  error => {
    if (error.response) {
      console.log('errorerror=====',error.response);
    }
  });*/


/* 登录功能 */
export const adminLogin = (data) => {
  return axios.post(config.adminLogin, createPostParams(data))
};

/*后台管理员修改自己的密码 */
export const edit_self_password = (data) => {
  return axios.post(config.edit_self_password, createPostParams(data))
};


// 注册功能
export const addAdmin = (data) => {
  return axios.post(config.addAdmin, createPostParams(data))
};

//操作员列表
export const adminList = (data) => {
  return axios.post(config.adminList, createPostParams(data))
};

// 删除操作员列表
export const  deleteAdminList = (data) => {
  return axios.post(config.deleteAdminList, createPostParams(data))
};

/*获取某个管理员的详情*/
export const  get_administrator_detail = (data) => {
  return axios.post(config.get_administrator_detail, createPostParams(data))
};

//供应商列表
export const list_supplier = (data) => {
  return axios.post(config.list_supplier, createPostParams(data))
};


  //删除供应商名称列表
export const delete_supplier = (data) => {
  return axios.post(config.delete_supplier, createPostParams(data))
};

  //新建或编辑供应商名称

export const edit_supplier = (data) => {
  return axios.post(config.edit_supplier, createPostParams(data))
};

//新建或编辑存货分类
export const edit_saveClassify = (data) => {
  return axios.post(config.edit_saveClassify, createPostParams(data))
};

//删除存货分类列表
export const delete_saveClassify = (data) => {
  return axios.post(config.delete_saveClassify, createPostParams(data))
};

//获取存货分类列表
export const list_procure_classify = (data) => {
  return axios.post(config.list_procure_classify, createPostParams(data))
};



//获取采购主体列表
export const list_procure_entity = (data) => {
  return axios.post(config.list_procure_entity, createPostParams(data))
};

  //删除采购主体
export const delete_procure_entity = (data) => {
  return axios.post(config.delete_procure_entity, createPostParams(data))
};

  //新建或编辑采购主体
export const edit_procure_entity = (data) => {
  return axios.post(config.edit_procure_entity, createPostParams(data))
};



//获取存货名称列表
export const list_goods_name = (data) => {
  return axios.post(config.list_goods_name, createPostParams(data))
};

  //删除存货名称
export const delete_goods_name = (data) => {
  return axios.post(config.delete_goods_name, createPostParams(data))
};

  //新建或编辑存货名称接口
export const edit_goods_name = (data) => {
  return axios.post(config.edit_goods_name, createPostParams(data))
};

//获取存货地址列表
export const list_location = (data) => {
  return axios.post(config.list_location, createPostParams(data))
};

//删除存货地址
export const delete_location = (data) => {
  return axios.post(config.delete_location, createPostParams(data))
};

//新建或编辑存货地址接口
export const edit_location = (data) => {
  return axios.post(config.edit_location, createPostParams(data))
};


/*获取销售筛选参数列表*/
export const list_all_sell_select = () => {
  return axios.get(config.list_all_sell_select)
};


/*获取销售订单列表*/
export const list_orders = (data) => {
  return axios.post(config.list_orders, createPostParams(data))
};



/*销售订单提交审核*/
export const submit_check_order = (data) => {
  return axios.post(config.submit_check_order, createPostParams(data))
};


/*销售退货单提交审核*/
export const submit_check_order_return = (data) => {
  return axios.post(config.submit_check_order_return, createPostParams(data))
};

/*销售退货单审核通过不通过*/
export const check_order_return = (data) => {
  return axios.post(config.check_order_return, createPostParams(data))
};



/*销售员对客户端提交的订单进行审核*/
export const check_client_order = (data) => {
  return axios.post(config.check_client_order, createPostParams(data))
};


/*获取用户名称列表*/
export const customer_lsit = (data) => {
  return axios.post(config.customer_lsit, createPostParams(data))
};


/*销售订单提交审核*/
export const list_clients = (data) => {
  return axios.post(config.list_clients, createPostParams(data))
};

/*获取用户名称列表详细信息*/
export const get_user_detail = (data) => {
  return axios.post(config.get_user_detail, createPostParams(data))
}


/*审核某个用户*/
export const check_client = (data) => {
  return axios.post(config.check_client, createPostParams(data))
}


/*新建或编辑销售订单*/
export const edit_order = (data) => {
  return axios.post(config.edit_order, createPostParams(data))
};

/*删除某个用户*/
export const delete_client = (data) => {
  return axios.post(config.delete_client, createPostParams(data))
}


/*操作记录 — 每页返回20条数据*/
export const list_operations = (data) => {
  return axios.post(config.list_operations, createPostParams(data))
}


/*新建或编辑销售清单*/
export const edit_order_detail = (data) => {
  return axios.post(config.edit_order_detail, createPostParams(data))
};
/*新建或编辑收款单*/
export const edit_order_pay = (data) => {
  return axios.post(config.edit_order_pay, createPostParams(data))
};

/*新建或编辑销售开票*/
export const edit_order_invoice = (data) => {
  return axios.post(config.edit_order_invoice, createPostParams(data))
};

  /*新建或编辑销售退货单*/
export const edit_order_return = (data) => {
  return axios.post(config.edit_order_return, createPostParams(data))
};


  /*新建或编辑销售退货开票*/
export const edit_order_return_invoice = (data) => {
  return axios.post(config.edit_order_return_invoice, createPostParams(data))
};


/*删除销售订单*/
export const delete_order = (data) => {
  return axios.post(config.delete_order, createPostParams(data))
};
/*删除销售清单*/
export const delete_order_detail = (data) => {
  return axios.post(config.delete_order_detail, createPostParams(data))
};

/*删除销售收款单*/
export const delete_order_pay = (data) => {
  return axios.post(config.delete_order_pay, createPostParams(data))
};

/*删除销售开票*/
export const delete_order_invoice = (data) => {
  return axios.post(config.delete_order_invoice, createPostParams(data))
};

/*删除销售退货单*/
export const delete_order_return = (data) => {
  return axios.post(config.delete_order_return, createPostParams(data))
};

  /*删除销售退货开票*/
export const delete_order_return_invoice = (data) => {
  return axios.post(config.delete_order_return_invoice, createPostParams(data))
};

/*销售订单审核通过/审核不通过*/
export const check_order = (data) => {
  return axios.post(config.check_order, createPostParams(data))
};


/*查看销售清单批次*/
export const list_order_batchs = (data) => {
  return axios.get(config.list_order_batchs+data)
};


  /*查看销售退货单批次*/
export const list_order_return_batchs = (data) => {
  return axios.get(config.list_order_return_batchs+data)
};


//获取采购筛选参数列表
export const list_all_purchase_select = () => {
  return axios.get(config.list_all_purchase_select)
};

  //获取采购订单列表
export const list_purchase_orders = (data) => {
  return axios.post(config.list_purchase_orders, createPostParams(data))
};


/*采购订单提交审核*/
export const submit_purchase_check_order = (data) => {
  return axios.post(config.submit_purchase_check_order, createPostParams(data))
};


  /*采购订单审核通过/审核不通过*/
export const purchase_check_order = (data) => {
  return axios.post(config.purchase_check_order, createPostParams(data))
};

/* 修改采购订单状态*/
export const change_order_status = (data) => {
  return axios.post(config.change_order_status, createPostParams(data))
};


/* 修改销售订单状态*/
export const sell_change_order_status = (data) => {
  return axios.post(config.sell_change_order_status, createPostParams(data))
};

/*删除采购订单*/
export const purchase_delete_order = (data) => {
  return axios.post(config.purchase_delete_order, createPostParams(data))
};


  /* 删除采购清单*/
export const purchase_delete_order_detail = (data) => {
  return axios.post(config.purchase_delete_order_detail, createPostParams(data))
};


  /*删除付款单*/
export const purchase_delete_order_pay = (data) => {
  return axios.post(config.purchase_delete_order_pay, createPostParams(data))
};


  /*删除采购开票*/
export const purchase_delete_order_invoice = (data) => {
  return axios.post(config.purchase_delete_order_invoice, createPostParams(data))
};


/*新建或编辑采购订单*/
export const edit_purchase_order = (data) => {
  return axios.post(config.edit_purchase_order, createPostParams(data))
};

  /*新建或编辑采购清单*/
export const edit_purchase_order_detail = (data) => {
  return axios.post(config.edit_purchase_order_detail, createPostParams(data))
};


  /*新建或编辑付款单*/
export const edit_purchase_order_pay = (data) => {
  return axios.post(config.edit_purchase_order_pay, createPostParams(data))
};


  /*新建或编辑采购开票*/
export const edit_purchase_order_invoice = (data) => {
  return axios.post(config.edit_purchase_order_invoice, createPostParams(data))
}


/*获取库存管理列表*/
export const list_order_stores = (data) => {
  return axios.post(config.list_order_stores, createPostParams(data))
}

/*获取库存管理的某个详情 — 对应批次的*/
export const list_order_stores_detail = (data) => {
  return axios.post(config.list_order_stores_detail, createPostParams(data))
}




/*订单回收站— 销售订单*/
export const list_recycle_sell = (data) => {
  return axios.post(config.list_recycle_sell, createPostParams(data))
}

/*订单回收站— 采购订单*/
export const list_recycle_purchase = (data) => {
  return axios.post(config.list_recycle_purchase,createPostParams(data))
}

/*订单回收站— 还原采购订单*/
export const restore_recycle_purchase = (data) => {
  return axios.post(config.restore_recycle_purchase, createPostParams(data))
}

/*订单回收站—  还原销售订单*/
export const restore_recycle_sell = (data) => {
  return axios.post(config.restore_recycle_sell, createPostParams(data))
}

/*新建采购付款单---获取供应商—采购主体的剩余返利金额*/
export const get_entity_supplier_rebate = (data) => {
  return axios.post(config.get_entity_supplier_rebate, createPostParams(data))
}

/*采购付款单提交审核*/
export const submit_check_order_pay = (data) => {
  return axios.post(config.submit_check_order_pay, createPostParams(data))
}

  /*采购付款单审核通过/不通过*/
export const check_order_pay = (data) => {
  return axios.post(config.check_order_pay, createPostParams(data))
}


  /*采购开票提交审核*/
export const submit_check_order_invoice = (data) => {
  return axios.post(config.submit_check_order_invoice, createPostParams(data))
}


  /*采购开票审核通过/不通过*/
export const check_order_invoice = (data) => {
  return axios.post(config.check_order_invoice, createPostParams(data))
}

/*采购订单入库*/
export const set_order_into_stores = (data) => {
  return axios.post(config.set_order_into_stores, createPostParams(data))
}


/*获取客户—销售主体的剩余总返利*/
export const get_entity_client_rebate = (data) => {
  return axios.post(config.get_entity_client_rebate, createPostParams(data))
}



/*销售付款单提交审核*/
export const submit_check_sell_order_pay = (data) => {
  return axios.post(config.submit_check_sell_order_pay, createPostParams(data))
}



  /*销售付款单审核通过/不通过*/
export const check_sell_order_pay = (data) => {
  return axios.post(config.check_sell_order_pay, createPostParams(data))
}


  /*销售开票提交审核*/
export const submit_check_sell_order_invoice = (data) => {
  return axios.post(config.submit_check_sell_order_invoice, createPostParams(data))
}


  /*销售开票审核通过/不通过*/
export const check_sell_order_invoice = (data) => {
  return axios.post(config.check_sell_order_invoice, createPostParams(data))
}

  /*销售退货开票提交审核 */
export const submit_check_order_return_invoice = (data) => {
  return axios.post(config.submit_check_order_return_invoice, createPostParams(data))
}

  /*销售退货开票审核通过/不通过 */
export const check_order_return_invoice = (data) => {
  return axios.post(config.check_order_return_invoice, createPostParams(data))
}


/*销售订单出库 */
export const set_order_out_stores = (data) => {
  return axios.post(config.set_order_out_stores, createPostParams(data))
}


/*采购订单填写折扣折让*/
export const fill_order_discount = (data) => {
  return axios.post(config.fill_order_discount, createPostParams(data))
}

/*销售订单填写折扣折让*/
export const sell_fill_order_discount = (data) => {
  return axios.post(config.sell_fill_order_discount, createPostParams(data))
}







/*
 * 创建Post x-www-form-urlencode请求参数
 * */
function createPostParams(obj) {
  return qs.stringify(obj);
}
