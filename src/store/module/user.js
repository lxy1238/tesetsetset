import { login, logOut, getInfo } from '@/api/login.js'
import { getEmail, setEmail, removeEmail, getToken, setToken, removeToken } from '@/utils/auth'
import store from '../../store'
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
          return false;
          if (userInfo.remember === true) {
            setPass(userInfo.password)
          } else {
            removePass()
          }
          setEmail(userInfo.email)
          setToken(res.data.roles[0])
          commit('SET_USERNAME', res.data.username)
          commit('SET_ROLES', res.data.roles)
          commit('SET_EMAIL', userInfo.email)
          commit('SET_TOKEN', res.data.roles[0])
          resolve(res)
        }).catch(err => {
          reject()
        })
        
      })
    },
    GetInfo({ commit , state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          console.log(res)
          const data = res.data
          commit('SET_ROLES', data.roles)
          commit('SET_USERNAME', data.username)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }

  }
}

export default user
