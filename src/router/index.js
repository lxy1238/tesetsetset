import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

//主体通用部分
const home = _import('home/index')
const p_center = _import('personal/index')
const another = _import('another/index')

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    component: home,
    children: [{
        path: '/',
        name: 'home',
        component: _import('page_index/index')
      },
      {
        path: '/trials',
        component: _import('trials/index')
      },
      {
        path: '/coupons/:couponsId/:postUserId',
        component: _import('coupons/index')
      },
      {
        path: '/trialsDetails',
        component: _import('trials_details/index')
      },
      {
        path: '/merchant/:userId',
        component: _import('merchant/index')
      },
      {
        path: '/successTrials',
        component: _import('trials_details/apply_success')
      },
     
     
    ]
  },
  {
    path: '/enter',
    component: another,
    children: [
      {
        path: '/enter',
        component: _import('enter_s/index')
      },
      {
        path: '/enter/seller',
        component: _import('enter_s/seller')
      },
      {
        path: '/enter/reds',
        component: _import('enter_s/reds')
      },
      {
        path: '/commissions',
        component: _import('commissions/index')
      },
      {
        path: '/activate/:email',
        component: _import('another/activate/index')
      },
    ]
  },
  {
    path: '/combine',
    component: _import('combine/index'),
    hidden: true
  },

  {
    path: '/404',
    name: '404page',
    component: _import('404')
  },
]

export const asyncRouterMap = [
    {
      path: '/personal',
      redirect: '/personal/index',
      component: p_center,
      text: 'Profile Overview',
      hasChilds: false,
      children: [{
        path: 'index',
        component: _import('personal/member_center/index')
      }]
    },
    {
      path: '/personal/promotion',
      redirect: '/personal/promotion/index',
      component: p_center,
      text: 'My Promotion',
      hasChilds: false,
      children: [{
        path: 'index',
        component: _import('personal/promotion/index')
      }]
    },
    {
      path: '/posted',
      redirect: '/posted/coupons',
      component: p_center,
      hasChilds: true,
      isToggle: false,
      text: 'My Posted',
      meta: {role: ['merchant', 'celebrity']},
      children: [
        {
          path: '/posted/coupons',
          text: 'Coupons',
          component: _import('personal/my_posted/coupons'),
        },
        {
          path: '/posted/coupons/add',
          hidden: true,
          component: _import('personal/my_posted/coupons_add'),
        },
        {
          path: '/posted/coupons/receiptor',
          hidden: true,
          component: _import('personal/my_posted/coupons_receiptor'),
        },
        {
          path: '/posted/trials',
          text: 'Trials',
          component: _import('personal/my_posted/trials'),
          meta: {role: ['merchant']}
        },
        {
          path: '/posted/trials/add',
          hidden: true,
          component: _import('personal/my_posted/trials_add'),
          meta: {role: ['merchant']}
        },
        {
          path: '/posted/trials/receiptor',
          hidden: true,
          component: _import('personal/my_posted/trials_receiptor'),
          meta: {role: ['merchant']}
        }
      ]
    },
    {
      path: '/wallet',
      redirect: '/wallet/financial',
      component: p_center,
      hasChilds: true,
      isToggle: false,
      text: 'My Wallet',
      children: [
        {
          path: '/wallet/financial',
          text: 'Financial Record',
          component: _import('personal/wallet/financial'),
        },
        {
          path: '/wallet/withdraw',
          text: 'Withdraw',
          component: _import('personal/wallet/withdraw')
        },
        {
          path: '/wallet/recharge',
          text: 'Recharge',
          component: _import('personal/wallet/recharge'),
          meta: {role: ['merchant']}
        }
      ]
    },
    {
      path: '/personal/my_coupons',
      redirect: '/personal/my_coupons/index',
      component: p_center,
      text: 'My Coupons',
      hasChilds: false,
      children: [{
        path: 'index',
        component: _import('personal/my_coupons/index')
      }]
    },
    {
      path: '/personal/my_trials',
      redirect: '/personal/my_trials/index',
      component: p_center,
      text: 'My Trials',
      hasChilds: false,
      children: [{
        path: 'index',
        component: _import('personal/my_trials/index')
      }]
    },
    {
      path: '/settings',
      redirect: '/settings/account',
      component: p_center,
      hasChilds: true,
      isToggle: false,
      text: 'Settings',
      children: [
        {
          path: '/settings/account',
          text: 'Acount Basics',
          component: _import('personal/settings/account'),
        },
        {
          path: '/settingsshop',
          text: 'Shop Settings',
          component: _import('personal/settings/shop'),
          meta: {role: ['merchant']}
        },
        {
          path: '/settings/apiManagement',
          text: 'API Management',
          component: _import('personal/settings/apiManagement')
        },
        {
          path: '/settings/modify',
          text: 'Modify Password',
          component: _import('personal/settings/modify')
        }
      ]
    },
  ]



export default new Router({
  // mode: 'history',   // 开启此配置需要进行后端设置
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
