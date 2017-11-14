import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import product from './module/product'
import personal from './module/personal'
import permisstion from './module/permisstion'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    product,
    personal,
    permisstion
  },
  getters
})

export default store
