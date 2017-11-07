import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

//主体通用部分
const home = _import('home/index')

Vue.use(Router)


export default new Router({
  // mode: 'history',   // 开启此配置需要进行后端设置
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children: [
        {path: '/', component: _import('page_index/index')},
        {path: '/trials', component: _import('trials/index')},
        {path: '/coupons', component: _import('coupons/index')},
        {path: '/trialsDetails', component: _import('trials_details/index')},
        {path: '/merchant', component: _import('merchant/index')},
        {path: '/successTrials', component: _import('trials_details/apply_success')}
      ]
    },
    {
      path: '/combine',
      component:_import('combine/index'),
      hidden: true
    },
    {
      path: '/personal',
      name: 'personal',
      component:  _import('personal/index'),
      children: [
        {path: '/personal', component: _import('personal/member_center/index')},
        {path: '/personal/promotion', component: _import('personal/promotion/index')},
        {path: '/personal/coupons', component: _import('personal/my_posted/coupons')},
        {path: '/personal/trials', component: _import('personal/my_posted/trials')},
        {path: '/personal/statistical', component: _import('personal/performance_report/statistical')},
        {path: '/personal/transaction', component: _import('personal/performance_report/transaction')},
        {path: '/personal/financial', component: _import('personal/wallet/financial')},
        {path: '/personal/withdraw', component: _import('personal/wallet/withdraw')},
        {path: '/personal/my_coupons', component: _import('personal/my_coupons/index')},
        {path: '/personal/my_trials', component: _import('personal/my_trials/index')},
        {path: '/personal/account', component: _import('personal/settings/account')},
        {path: '/personal/shop', component: _import('personal/settings/shop')},
        {path: '/personal/apiManagement', component: _import('personal/settings/apiManagement')},
        {path: '/personal/modify', component: _import('personal/settings/modify')},
      ]
    },
    {
      path: '/404',
      name: '404page',
      component: _import('404')
    },
    {
      path: '*',
      redirect: '/404',
      hidden: true
    },
  ]
})
