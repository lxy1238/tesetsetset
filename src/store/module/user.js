import { login, logOut, getInfo } from '@/api/login.js'
import { getUser, setUser, removeUser } from '@/utils/auth'

const user = {
  state: {
    username: '',
    avatar: '',
    joinedDate: '',
    memberLever: '',
    couponsPosted: '',
    lastPostedDate: ''
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

  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.trim()
      return new Promise((resolve, reject) => {
          setUser(username)
          commit('SET_USERNAME', username)
          resolve()
      })
    },
  }
}

export default user
