import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

//主体通用部分
const home = _import('home/index')
const p_center = _import('personal/index')
const about_center = _import('about/index')
const another = _import('another/index')

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    component: home,
    children: [{
      path: '/:menuId?',
      name: 'home',
      component: _import('page_index/index')
    },
    {
      path: '/trials/:menuId?',
      component: _import('trials/index')
    },
    {
      path: '/coupons/:couponsId',
      component: _import('coupons/index')
    },
    {
      path: '/trialsDetails/index',
      component: _import('trials_details/index')
    },
    {
      path: '/merchant/:userId',
      component: _import('merchant/index')
    },
    {
      path: '/successTrials/index',
      component: _import('trials_details/apply_success')
    },
     
     
    ]
  },
  //申请入驻、 佣金计算、 激活、 忘记密码
  {
    path: '/enter/index',
    component: another,
    children: [
      {
        path: '/enter/index',
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
        path: '/enter/invite',
        component: _import('enter_s/invite')
      },
      // {
      //   path: '/commissions/index',
      //   component: _import('commissions/index')
      // },
      {
        path: '/activate/:email',
        component: _import('another/activate/index')
      },
      {
        path: '/resetpass/:email/:token',
        component: _import('another/resetpass/index')
      },
    ]
  },
  {
    path: '/combine/index',
    component: _import('combine/index'),
    hidden: true
  },

  {
    path: '/404/index',
    name: '404page',
    component: _import('404')
  },
]

//帮助中心路由配置
export const aboutRouterMap = [
  {
    path: '/about/center',
    redirect: '/about/center/index',
    component: about_center,
    text: 'About Us',
    hasChilds: false,
    children: [{
      path: 'index',
      component: _import('about/about_us')
    }]
  },
  {
    path: '/about/faqs',
    redirect: '/about/faqs',
    component: about_center,
    hasChilds: true,
    isToggle: true,
    text: 'FAQs / Common Issues',
    children: [
      {
        path: '/about/login_sign',
        text: '用户登录与注册',
        component: _import('about/fqa/login_sign'),
      },
      {
        path: '/about/pick_coupons',
        text: '折扣券领取流程',
        component: _import('about/fqa/pick_coupons'),
      },
      {
        path: '/about/coupon_promo',
        text: '折扣券营销推广',
        component: _import('about/fqa/coupon_promo')
      },
      {
        path: '/about/trials_apply',
        text: '试用品申请规则',
        component: _import('about/fqa/trials_apply')
      },
      {
        path: '/about/release',
        text: '如何发布折扣券和试用品',
        component: _import('about/fqa/release')
      },
      {
        path: '/about/member_level',
        text: '会员等级与积分',
        component: _import('about/fqa/member_level')
      },
      {
        path: '/about/pid',
        text: 'PID获取方式',
        component: _import('about/fqa/pid')
      },
    ]
  },
]


//登录后加载异步路由
export const asyncRouterMap = [
  {
    path: '/personal/member',
    redirect: '/personal/member/index',
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
    path: '/posted/coupons',
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
    path: '/wallet/financial',
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
    path: '/settings/account',
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
        path: '/settings/shop',
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
  // { path: '*', redirect: '/404/index', hidden: true }
]



export default new Router({
  // mode: 'history',   // 开启此配置需要进行后端设置
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap.concat(aboutRouterMap)
})
