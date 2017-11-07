import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import product from './module/product'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    product
  },
  getters
})

export default store
