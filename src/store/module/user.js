import api from '@/api/index'
import { getEmail, setEmail, getToken, setToken, removeToken, setUserId, getUserId ,removeUserId} from '@/utils/auth'
import router from '../../router'
import { removeEmail, removePass } from '../../utils/auth'
import { getStore } from '../../utils/utils'

const user = {
  state: {
    token: getToken(),
    email: getEmail(),
    user_id: '',
    username: '',
    roles: [],
    promotions: [],
    joined_date: '',
    userAccount: {},
    userBase: {},

  },
  mutations: {
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PROMOTIONS: (state, promotions) => {
      state.promotions = promotions
    },
    SET_USERID: (state, user_id) => {
      state.user_id = user_id
    },
    SET_USERBASE: (state, userBase) => {
      state.userBase = userBase
    },
    SET_USERACCOUNT: (state, userAccount) => {
      state.userAccount = userAccount
    },
    SET_JOINEDDATE: (state, joined_date) => {
      state.joined_date = joined_date
    },
    
  },
  actions: {
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        api.login(userInfo).then(res => {
          setToken(res.data.api_token)
          setUserId(res.data.user_id)
          commit('SET_TOKEN', res.data.api_token)
          commit('SET_USERID',res.data.user_id)
          api.updateLogin({'api_token': res.data.api_token, 'user_id': res.data.user_id})
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        api.getInfo({'api_token': getToken(), 'user_id': getUserId(), 'country_id': getStore('country_id') || 1}).then(res => {
          const data = res.data
          if (res.code === 200) {
            setEmail(data.email)
            commit('SET_ROLES', [data.type])
            commit('SET_PROMOTIONS', data.promotions)
            commit('SET_USERNAME', data.username)
            commit('SET_EMAIL',data.email)   
            commit('SET_USERID',data.id)   
            commit('SET_USERACCOUNT', data.account)
            commit('SET_USERBASE',data.base)   
            commit('SET_JOINEDDATE', data.joined_date)
          } 
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },

    //前端登出
    LogOut ({ commit }) {
      router.push({path: '/'})
      removeToken()
      removeUserId()
      removeEmail()
      removePass()
      commit('SET_TOKEN', '')
      commit('SET_USERID', '') 
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  }
}
export default user
