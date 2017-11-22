import { login, logOut, getInfo, updateLogin } from '@/api/login.js'
import { getEmail, setEmail, removeEmail, getToken, setToken, removeToken } from '@/utils/auth'
import store from '../../store'
import router from '../../router'
import { setPass, removePass } from '../../utils/auth';
import { setStore, removeStore } from '../../utils/utils'

const user = {
  state: {
    username: '',
    roles: [],
    user_id: '',
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
    },
    SET_USERID: (state, user_id) => {
      state.user_id = user_id
    }

  },
  actions: {
    // 登录s
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          console.log(res)
          setToken(res.data)
          commit('SET_TOKEN', res.data)
          updateLogin({'api_token': res.data})
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    GetInfo({ commit , state }) {
      return new Promise((resolve, reject) => {
        getInfo({'api_token':getToken()}).then(res => {
          const data = res.data
          console.log(res)
          if (res.code === 200) {
            setEmail(data.email)
            setStore('userInfo', JSON.stringify(res.data))
            commit('SET_ROLES', [data.type])
            commit('SET_USERNAME', data.username)
            commit('SET_EMAIL',data.email)   
            commit('SET_USERID',data.id)   
            commit('SET_AVATAR',data.base.avatar_img)   
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
      removeStore('userInfo')
      commit('SET_TOKEN', '')
      router.push({path: '/'})
      window.location.reload()
    }

  }
}

export default user
