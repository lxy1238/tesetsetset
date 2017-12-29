// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 解决ie9 不支持promise问题
import 'babel-polyfill'
require('es6-promise').polyfill()
import router from './router'  // 路由配置文件
import store from './store'    // 全局状态管理
import api from './api/index'  //所有的接口

import './directive/title/index'

// import VueHtml5Editor from 'vue-html5-editor'
// Vue.use(VueHtml5Editor, {
//   icons: {
//     text: 'el-icon-document',
//     color: 'fa fa-paint-brush',
//     font: 'fa fa-font',
//     align: 'fa fa-align-justify',
//     list: 'fa fa-list',
//     link: 'fa fa-chain',
//     unlink: 'fa fa-chain-broken',
//     tabulation: 'fa fa-table',
//     image: 'el-icon-picture',
//     hr: 'fa fa-minus',
//     eraser: 'fa fa-eraser',
//     undo: 'fa-undo fa',
//     'full-screen': 'fa fa-arrows-alt',
//     info: 'fa fa-info',
//   },
// })



import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

// 设置语言
locale.use(lang)
// import Element from 'element-ui'
import {
  Dialog,
  Input,
  Radio,
  Select,
  Option,
  Button,
  DatePicker,
  Tooltip,
  Form,
  FormItem,
  Alert,
  Icon,
  Row,
  Col,
  Upload,
  Rate,
  Loading,
  MessageBox,
  Message,
  Checkbox
} from 'element-ui'

Vue.use(Dialog)
Vue.use(Checkbox)
Vue.use(Input)
Vue.use(Radio)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(DatePicker)
Vue.use(Tooltip)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Alert)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Rate)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message


// 全局css样式,重置样式
// import 'normalize.css'
import 'element-ui/lib/theme-default/index.css'


//验证权限
import './permission'

Vue.prototype.$api = api
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
