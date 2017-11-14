
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