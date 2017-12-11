import fetch from '@/utils/fetch.js'
import qs from 'qs'


//用户基本信息

//注册
export const sign = data => fetch({
  url: '/api/v1/user/register',
  method: 'POST',
  data: qs.stringify(data)
})

//激活
export const userActivate = data => fetch({
  url: '/api/v1/user/activate',
  method: 'POST',
  data: qs.stringify(data)
})


//登录

export const login = data => fetch({
  url: '/api/v1/user/login',
  method: 'POST',
  data: qs.stringify(data)
})




//获取用户基本信息
export const getInfo = data => fetch({
  url: '/api/v1/user/info',
  method: 'POST',
  data: qs.stringify(data)
})


//登录次数更新接口
export const updateLogin = data => fetch({
  url: '/api/v1/user/login-records',
  method: 'POST',
  data: qs.stringify(data)
})

//修改密码
export const resetPassword = data => fetch({
  url: '/api/v1/user/reset-password',
  method: 'POST',
  data: qs.stringify(data)
})

//重置密码提交  忘记密码使用 
export const retrievePassword = data => fetch({
  url: '/api/v1/user/retrieve-password',
  method: 'POST',
  data: qs.stringify(data)
})


//重置密码   忘记密码使用
export const checkRetrievePassword = data => fetch({
  url: '/api/v1/user/check-retrieve-password',
  method: 'POST',
  data: qs.stringify(data)
})


//用户基本信息设置
export const userInfoSet = data => fetch({
  url: '/api/v1/user/base-setting',
  method: 'POST',
  data: qs.stringify(data)
})


//用户公开信息  发布优惠券的人的信息获取， 不用登录校验就可以获取
export const postedUserInfo = data => fetch({
  url: '/api/v1/user/open-info',
  method: 'POST',
  data: qs.stringify(data)
})
