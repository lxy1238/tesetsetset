import Vue from 'vue'
// 解决ie9 不支持promise问题
import 'babel-polyfill'
require('es6-promise').polyfill()
import Vuex from 'vuex'
import user from './module/user'
import personal from './module/personal'
import permisstion from './module/permisstion'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    personal,
    permisstion
  },
  getters
})

export default store
