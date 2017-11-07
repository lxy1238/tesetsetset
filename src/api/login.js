import fetch from '@/utils/fetch.js'
import qs from 'qs'

//登录

export const login = data => fetch({
  url: '/user/login',
  method: 'POST',
  data: qs.stringify(data)
})

//登出

export const logOut = () => fetch({
  url: '/user/logOut',
  method: 'GET'
})

//获取用户基本信息

export const getInfo = (data) => fetch({
  url: 'user/getInfo',
  method: 'POST',
  data: qs.stringify(data)
})