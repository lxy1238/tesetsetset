import { login, logOut, getInfo } from '@/api/login.js'
import { getEmail, setEmail, removeEmail, getToken, setToken, removeToken } from '@/utils/auth'
import store from '../../store'
import router from '../../router'
import { setPass, removePass } from '../../utils/auth';

const user = {
  state: {
    username: '',
    roles: [],
    email: getEmail(),
    avatar: '',
    joinedDate: '',
    memberLever: '',
    couponsPosted: '',
    lastPostedDate: '',
    token: getToken(),

  },
  mutations: {
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_JOINED_DATE: (state, joinedDate) => {
      state.joinedDate = joinedDate
    },
    SET_MEMBER_LEVEL: (state, memberLever) => {
      state.memberLever = memberLever
    },
    SET_COUPONS_POSTED: (state, couponsPosted) => {
      state.couponsPosted = couponsPosted
    },
    SET_LAST_POSTED_DATE: (state, lastPostedDate) => {
      state.lastPostedDate = lastPostedDate
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }

  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          console.log(res)
          setToken(res.data)
          commit('SET_TOKEN', res.data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    GetInfo({ commit , state }) {
      return new Promise((resolve, reject) => {
        getInfo({'api_token':getToken()}).then(res => {
          console.log(res)
          const data = res.data
          if (res.code === 200) {
            setEmail(data.email)
            commit('SET_ROLES', [data.type])
            commit('SET_USERNAME', data.username)
            commit('SET_EMAIL',data.email)   
            console.log(store)  
          } else if (res.code === 500) {
            removeEmail()
            removeToken()
            commit('SET_EMAIL', '')
            commit('SET_TOKEN', '')
            router.push({path: '/'})
          }
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    LogOut ({ commit }) {
      removeToken()
      commit('SET_TOKEN', '')
      router.push({path: '/'})
      window.location.reload()
    }

  }
}

export default user
