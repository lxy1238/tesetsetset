
const product = {
  state : {
    oneLevel: 0,
    productId: '',
  },

  mutations: {
    SET_ONE_LEVEL (state, level) {
      state.oneLevel = level
    },
    SET_PRODUCT_ID (state, id) {
      state.productId = id
    }
  },
  
  actions: {
    setLevel ({ commit }, level) {
      commit('SET_ONE_LEVEL', level)
    },
    setProductId ({ commit }, id) {
      commit('SET_PRODUCT_ID', id)
    }
  }
}

export default product