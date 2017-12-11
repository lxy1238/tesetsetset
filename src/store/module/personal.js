//个人中心侧边栏目跳转需要用到 目前跳转的路由 这个属性


const personal = {
  state : {
    currentRouter: '',
  },

  mutations: {
    SET_CURRENT_ROUTER (state, currentRouter) {
      state.currentRouter = currentRouter
    },
  },
  
  actions: {
    setCurrentRouter ({ commit }, currentRouter) {
      commit('SET_CURRENT_ROUTER', currentRouter)
    },
  }
}

export default personal