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
      path: '/coupons/:couponsId/:countryId',
      component: _import('coupons/index')
    },
    {
      path: '/trialsDetails/:trialId/:countryId',
      component: _import('trials_details/index')
    },
    {
      path: '/merchant/:userId',
      component: _import('merchant/index')
    },
    {
      path: '/successTrials/:trialId/:countryId',
      component: _import('trials_details/apply_success')
    },
     
     
    ]
  },
  //申请入驻、 佣金计算、 激活、 忘记密码
  // {
  //   path: '/enter/index',
  //   component: another,
  //   children: [
  //     {
  //       path: '/enter/invite',
  //       component: _import('enter_s/invite')
  //     },
  //     // {
  //     //   path: '/commissions/index',
  //     //   component: _import('commissions/index')
  //     // },
     
  //     // {
  //     //   path: '/resetpass/:email/:token',
  //     //   component: _import('another/resetpass/index')
  //     // },
  //   ]
  // },
  // {
  //   path: '/activate/:email',
  //   component: _import('another/activate/index')
  // },
  // {
  //   path: '/combine/index',
  //   component: _import('combine/index'),
  //   hidden: true
  // },
  {
    path: '/goto/:couponId/:countryId/:promoterId?',
    component: _import('goto/index'),
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
    children: [
      {
        path: 'index',
        component: _import('about/about_us')
      },
      {
        path: 'influencer',
        component: _import('about/page/influencer')
      },
      {
        path: 'merchant',
        component: _import('about/page/merchant')
      },
      {
        path: 'countact',
        component: _import('about/page/countact')
      },
      {
        path: 'faq',
        component: _import('about/page/faq')
      },
      {
        path: 'term',
        component: _import('about/page/term')
      },
      {
        path: 'privacy',
        component: _import('about/page/privacy')
      },
      {
        path: '/activate/:email',
        component: _import('about/page/email')
      },
      {
        path: '/resetpass/:email/:token',
        component: _import('about/page/resetpass')
      },
    ]

  }
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
    text: 'My Promotions',
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
        text: 'Transaction Record',
        component: _import('personal/wallet/financial'),
      },
      {
        path: '/wallet/withdraw',
        text: 'Withdraw',
        component: _import('personal/wallet/withdraw')
      },
      {
        path: '/wallet/recharge/pay-wx',
        text: 'pay-wx',
        hidden: true,
        component: _import('personal/wallet/pay/wx')
      },
      {
        path: '/wallet/recharge/alipay',
        text: 'alipay',
        hidden: true,
        component: _import('personal/wallet/pay/alipay')
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
    path: '/personal/my-coupons',
    redirect: '/personal/my-coupons/index',
    component: p_center,
    text: 'My Coupons',
    hasChilds: false,
    children: [{
      path: 'index',
      component: _import('personal/my_coupons/index')
    }]
  },
  {
    path: '/personal/my-trials',
    redirect: '/personal/my-trials/index',
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
        text: 'Account Basics',
        component: _import('personal/settings/account'),
      },
      {
        path: '/settings/store',
        text: 'Store Settings',
        component: _import('personal/settings/shop'),
        meta: {role: ['merchant']}
      },
      {
        path: '/settings/apiManagement',
        text: 'Affiliate PID',
        component: _import('personal/settings/apiManagement')
      },
      {
        path: '/settings/modify',
        text: 'Modify Password',
        component: _import('personal/settings/modify')
      }
    ]
  },
  { path: '*', redirect: '/404/index', hidden: true }
]



export default new Router({
  mode: 'history',   // 开启此配置需要进行后端设置
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap.concat(aboutRouterMap)
})
