// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 解决ie9 不支持promise问题
import 'babel-polyfill'
require('es6-promise').polyfill()
import router from './router'  // 路由配置文件
import store from './store'    // 全局状态管理

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'summernote/dist/summernote.css'
import 'summernote'



import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
Vue.use(Element ,{ locale })


// 全局css样式,重置样式
// import 'normalize.css'
import 'element-ui/lib/theme-default/index.css'

import './permission'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  data: {
    eventHub: new Vue()
  },
  template: '<App/>',
  components: { App }
})
