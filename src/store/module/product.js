
const product = {
  state : {
    oneLevel: 0,
    productId: '',
    couponId: '',
  },

  mutations: {
    SET_ONE_LEVEL (state, level) {
      state.oneLevel = level
    },
    SET_PRODUCT_ID (state, id) {
      state.productId = id
    },
    SET_COUPON_ID (state, id) {
      state.couponId = id
    }
  },
  
  actions: {
    setLevel ({ commit }, level) {
      commit('SET_ONE_LEVEL', level)
    },
    setProductId ({ commit }, id) {
      commit('SET_PRODUCT_ID', id)
    },
    setCouponId ({ commit }, id) {
      commit('SET_COUPON_ID', id) 
    }
  }
}

export default product