import { login, getInfo, updateLogin } from '@/api/login'
import { getEmail, setEmail, getToken, setToken, removeToken, setUserId, getUserId ,removeUserId} from '@/utils/auth'
import router from '../../router'
import { removeEmail, removePass } from '../../utils/auth'
import { getStore } from '../../utils/utils'

const user = {
  state: {
    username: '',
    roles: [],
    user_id: '',
    email: getEmail(),
    promotions: [],
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
    },
  },
  actions: {
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          setToken(res.data.api_token)
          setUserId(res.data.user_id)
          commit('SET_TOKEN', res.data.api_token)
          commit('SET_USERID',res.data.user_id)
          updateLogin({'api_token': res.data.api_token, 'user_id': res.data.user_id})
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo({'api_token': getToken(), 'user_id': getUserId(), 'country_id': getStore('country_id') || 1}).then(res => {
          const data = res.data
          if (res.code === 200) {
            setEmail(data.email)
            commit('SET_ROLES', [data.type])
            commit('SET_USERNAME', data.username)
            commit('SET_EMAIL',data.email)   
            commit('SET_USERID',data.id)   
            commit('SET_AVATAR',data.base.avatar_img)   
          } else if (res.code === 500) {
            removeToken()
            removeUserId()
            removeEmail()
            removePass()
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
      removeUserId()
      removeEmail()
      removePass()
      commit('SET_TOKEN', '')
      commit('SET_USERID', '') 
      router.push({path: '/'})
      window.location.reload()
    }
  }
}
export default user
