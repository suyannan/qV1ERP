import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
/*axios.defaults.withCredentials = true;*/
import Login from '../components/admin_view/login.vue'
import AdminMain from '../components/admin_view/public/main.vue'

import AddAdmin from '../components/admin_view/system/add_admin.vue'
import AdminList from '../components/admin_view/system/admin_list.vue'
import SupplierName from '../components/admin_view/system/supplier_name.vue'
import ProcureEntity from '../components/admin_view/system/procure_entity.vue'
import SaveClassify from '../components/admin_view/system/save_classify.vue'
import GoodsName from '../components/admin_view/system/goods_name.vue'
import saveLocation from '../components/admin_view/system/save_location.vue'

import CustomerList from '../components/admin_view/system/customer_list.vue'
import listOperations from '../components/admin_view/system/list_operations.vue'
import listRecycleSell from '../components/admin_view/system/list_recycle_sell.vue'
import listRecyclePurchase from '../components/admin_view/system/list_recycle_purchase.vue'
import copyDatabase from '../components/admin_view/system/copy_database.vue'


/*销售*/
import SellOrder from '../components/admin_view/sell_manage/sell_order_list.vue'
import SellOrderDetail from '../components/admin_view/sell_manage/sell_order_detail.vue'
import AddSellOrder from '../components/admin_view/sell_manage/add_sell_order.vue'
import AddInvioceOrder from '../components/admin_view/sell_manage/add_invoice_order.vue'
import AddPayOrder from '../components/admin_view/sell_manage/add_pay_order.vue'
import AddReturnOrder from '../components/admin_view/sell_manage/add_return_order.vue'
import AddReturnInvioceOrder from '../components/admin_view/sell_manage/add_return_invoice_order.vue'
import AddSellDetailOrder from '../components/admin_view/sell_manage/add_sell_detail_order.vue'

import SellDetailTablePc from '../components/admin_view/sell_manage/sell_detail_table_pc.vue'
import SellReturnTablePc from '../components/admin_view/sell_manage/sell_return_table_pc.vue'
/*采购*/
import PurchasingList from '../components/admin_view/purchasing_manage/purchasing_list.vue'
import purchasing_orderDesc from '../components/admin_view/purchasing_manage/purchasing_orderDesc.vue'

import AddPurchaseOrder from '../components/admin_view/purchasing_manage/add_purchase_order.vue'
import AddPurchaseDetailOrder from '../components/admin_view/purchasing_manage/add_purchase_detail_order.vue'
import AddPurchasePayOrder from '../components/admin_view/purchasing_manage/add_purchase_pay_order.vue'
import AddPurchaseInvioceOrder from '../components/admin_view/purchasing_manage/add_purchase_invoice_order.vue'

import StockList from '../components/admin_view/stock_manage/stock_list.vue'
import StockDetail from '../components/admin_view/stock_manage/stock_detail.vue'
/*前端页面框架*/
import WebLogin from '../components/web_view/login.vue'
import WebRegister from '../components/web_view/register.vue'
import webMain from '../components/web_view/main.vue'
import OrderList from '../components/web_view/sell_manage/order_list.vue'
import NewOrder from '../components/web_view/sell_manage/new_order.vue'
import uploadImg from '../components/web_view/sell_manage/uploadImg.vue'
import editRegister from '../components/web_view/edit_register.vue'
import OrderDetail from '../components/web_view/sell_manage/order_detail.vue'
import NewOrderDetail from '../components/web_view/sell_manage/new_order_detail.vue'




Vue.use(Router);

var router = new Router({
  routes: [
    {
      path: '/', //前端登录
      name: 'WebLogin',
      component: WebLogin
    },
    {
      path: '/web_view/register',  //前端注册
      name: 'WebRegister',
      component: WebRegister,
      children:[
        {
          path:'/uploadImg',
          name: 'uploadImg',
          component: uploadImg
        }
      ]
    },
    {
      path: '/editRegister/:type', //前端注册信息修改
      name: 'editRegister',
      component: editRegister
    },
    {
      path:'/main',   //前端主页
      component: webMain,
      children:[
        {
          path:'/',   //前端销售订单列表
          name: 'order_list',
          component: OrderList,
          meta: {
            webAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/new_order/:type/:id',   //前端新建销售订单
          name: 'new_order',
          component: NewOrder,
          meta: {
            webAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/new_order_detail/:type/:SellId/:id',   //前端新建销售清单
          name: 'new_order_detail',
          component: NewOrderDetail,
          meta: {
            webAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/order_detail/:SellId',   //前端销售订单详情
          name: 'order_detail',
          component: OrderDetail,
          meta: {
            webAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
      ]
    },

    {
      path: '/admin_view',  //后台登录
      name: 'login',
      component: Login
    },

    {
      path:'/admin_view/main',   //后台框架结构
      component: AdminMain,
      children:[
        {

          path:'/admin_view/purchasing_list',   //采购订单列表
          component: PurchasingList,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/admin_view/stock_list',   //库存列表
          name: 'stock_list',
          component: StockList,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/admin_view/stock_detail/:storeId',   //库存列表详情
          name: 'stock_detail',
          component: StockDetail,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },

        {

          path:'/admin_view/purchasing_list',   //采购订单列表
          name: 'PurchasingList',
          component: PurchasingList,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/admin_view/purchasing_orderDesc/:purchaseOrderId',   //采购订单详情
          name: 'purchasing_orderDesc',
          component: purchasing_orderDesc,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/admin_view/add_purchase_order/:type/:id',   //增加编辑采购订单
          name: 'add_purchase_order',
          component: AddPurchaseOrder,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/admin_view/add_purchase_detail_order/:type/:purchaseOrderId/:id',   //增加编辑采购清单
          name: 'add_purchase_detail_order',
          component: AddPurchaseDetailOrder,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/admin_view/add_purchase_pay_order/:type/:purchaseOrderId/:id',   //增加编采购收款单
          name: 'add_purchase_pay_order',
          component: AddPurchasePayOrder,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/admin_view/add_purchase_invoice_order/:type/:purchaseOrderId/:id',   //增加编辑采购开票
          name: 'add_purchase_invoice_order',
          component: AddPurchaseInvioceOrder,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/admin_view/sell_order',   //销售订单列表
          name: 'sell_order',
          component: SellOrder,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/admin_view/sell_order_detail/:sellOrderId',   //销售订单详情
          name: 'sell_order_detail',
          component: SellOrderDetail,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/admin_view/add_sell_order/:type/:id',   //增加编辑销售订单
          name: 'add_sell_order',
          component: AddSellOrder,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/admin_view/add_sell_detail_order/:type/:sellOrderId/:id',   //增加编辑销售清单
          name: 'add_sell_detail_order',
          component: AddSellDetailOrder,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/admin_view/add_pay_order/:type/:sellOrderId/:id',   //增加编收款单
          name: 'add_pay_order',
          component: AddPayOrder,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/admin_view/add_invoice_order/:type/:sellOrderId/:id',   //增加编辑销售开票
          name: 'add_invoice_order',
          component: AddInvioceOrder,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/admin_view/add_return_order/:type/:sellOrderId/:id',   //增加编辑退货单
          name: 'add_return_order',
          component: AddReturnOrder,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/admin_view/add_return_invoice_order/:type/:sellOrderId/:id',   //增加编辑退货开票
          name: 'add_return_invoice_order',
          component: AddReturnInvioceOrder,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/admin_view/sell_detail_table_pc/:id',   //查看销售清单批次详情
          name: 'sell_detail_table_pc',
          component: SellDetailTablePc,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/admin_view/sell_return_table_pc/:id',   //查看退货单批次详情
          name: 'sell_return_table_pc',
          component: SellReturnTablePc,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/admin_view/add_admin/:type/:adminId',   //系统维护--增加操作员
          name: 'add_admin',
          component: AddAdmin,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/admin_view/admin_list',   //系统维护--操作员列表
          name: 'admin_list',
          component: AdminList,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/admin_view/supplier_name',   //系统维护--供应商名称
          name: 'supplier_name',
          component: SupplierName,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/admin_view/procure_entity',   //系统维护--采购主体
          name: 'procure_entity',
          component: ProcureEntity,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {

          path: '/admin_view/save_classify',   //系统维护--存货分类
          name: 'save_classify',
          component: SaveClassify,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/admin_view/goods_name',   //系统维护--存货名称
          name: 'goods_name',
          component: GoodsName,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/admin_view/save_location',   //系统维护--存货地址
          name: 'save_location',
          component: saveLocation,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },{
          path:'/admin_view/customer_list',   //系统维护--客户名称列表
          name: 'customer_list',
          component: CustomerList,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
/*        {
          path:'/admin_view/list_operations',   //系统维护--操作记录
          name: 'list_operations',
          component: listOperations,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },*/
        {
          path:'/admin_view/list_recycle_sell',   //系统维护--订单回收站---销售订单
          name: 'list_recycle_sell',
          component: listRecycleSell,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path:'/admin_view/list_recycle_purchase',   //系统维护--订单回收站---采购订单
          name: 'list_recycle_purchase',
          component: listRecyclePurchase,

          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }

        },
        {
          path:'/admin_view/copy_database',   //系统维护--导出数据库
          name: 'copy_database',
          component: copyDatabase,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }

        },

      ]
    }

  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (window.sessionStorage.getItem('session')) {  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/admin_view',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }

  if (to.meta.webAuth) {  // 判断该路由是否需要登录权限
    if (window.sessionStorage.getItem('web_token')) {  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});
// http response 拦截器
axios.interceptors.response.use(
  response => {
    if(response.data.errcode==90000){
      alert(response.data.errdesc);
      if(router.currentRoute.fullPath.indexOf('admin')>0){
        window.sessionStorage.removeItem('session');
        router.replace({
          path: '/admin_view',
          query: {redirect: router.currentRoute.fullPath}
        });
      }else {
        window.sessionStorage.removeItem('web_token');
        router.replace({
          path: '/',
          query: {redirect: router.currentRoute.fullPath}
        });
      }
      return;
    }
    return response;
  },
  error => {
    if (error.response) {
      console.log('errorerror=====',error.response);
    }
  });

export default router;
