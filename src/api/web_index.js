/**
 * Created by Administrator on 2017/11/25.
 */

import config from './web_config'
import axios from 'axios'
var qs = require('qs');
// axios.defaults.withCredentials = true;
import router from '../router/index'

/*
axios.interceptors.response.use(
  response => {
    if(response.data.errcode==90000){
      alert(response.data.errdesc);
      window.sessionStorage.removeItem('web_token');
      router.replace({
        path: '/',
        query: {redirect: router.currentRoute.fullPath}
      });
      return;
    }

       console.log('=====web',response);

    return response;
  },
  error => {
    if (error.response) {
      console.log('errorerror=====',error.response);
    }
  });
*/

/* 创建Post x-www-form-urlencode请求参数 */
function createPostParams(obj) {
  return qs.stringify(obj);
}

/* 上传图片功能 */
export const uploadImg = (data) => {
  return axios.post(config.uploadImg,createPostParams(data))
};

/*创建账号*/
export const apply_create_user = (data) => {
  return axios.post(config.apply_create_user,createPostParams(data))
};

  // 审核失败后：获取自己的所有信息
  export const get_user_detail = (data) => {
    return axios.post(config.get_user_detail,createPostParams(data))
  }

  // 审核失败后：获取自己的所有信息
  export const apply_update_user_account = (data) => {
    return axios.post(config.apply_update_user_account,createPostParams(data))
  }

/*登录功能*/
export const login = (data) => {
  return axios.post(config.login,createPostParams(data))
}


/*获取登录用户的销售管理列表*/
export const list_user_orders = (data) => {
  return axios.post(config.list_user_orders,createPostParams(data))
}


/*用户创建/编辑订单*/
export const user_edit_order = (data) => {
  return axios.post(config.user_edit_order,createPostParams(data))
}

/* 用户新建或编辑销售清单*/
export const user_edit_order_detail = (data) => {
  return axios.post(config.user_edit_order_detail,createPostParams(data))
}


/*获取登录用户的销售订单详情*/
export const get_user_order_detail = (data) => {
  return axios.post(config.get_user_order_detail,createPostParams(data))
}

/*用户提交订单审核*/
export const user_submit_check_order = (data) => {
  return axios.post(config.user_submit_check_order,createPostParams(data))
}

/* 用户删除销售订单*/
export const user_delete_order = (data) => {
  return axios.post(config.user_delete_order,createPostParams(data))
}

  /* 用户删除销售清单*/
export const user_delete_order_detail = (data) => {
  return axios.post(config.user_delete_order_detail,createPostParams(data))
}

/*用户订单填写折扣折让*/
export const user_fill_order_discount = (data) => {
  return axios.post(config.user_fill_order_discount,createPostParams(data))
}






/*export const uploadImg = (data) => {
  return axios.post(config.uploadImg,data)
};*/
