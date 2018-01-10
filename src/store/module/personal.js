//个人中心侧边栏目跳转需要用到 目前跳转的路由 这个属性
import api from '@/api/index'

const personal = {
  state : {
    currentRouter: '',
    countryInfo: []
  },

  mutations: {
    SET_CURRENT_ROUTER (state, currentRouter) {
      state.currentRouter = currentRouter
    },
    SET_COUNTRY (state, countryInfo) {
      state.countryInfo = countryInfo
    },
  },
  
  actions: {
    setCurrentRouter ({ commit }, currentRouter) {
      commit('SET_CURRENT_ROUTER', currentRouter)
    },
    getCountryInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        api.getUserCountry().then(res => {
          commit('SET_COUNTRY', res.data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
  }
}

export default personal