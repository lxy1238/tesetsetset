import fetch from '@/utils/fetch.js'
import qs from 'qs'


//用户基本信息

//验证邮箱是否存在
export const checkEmail = data => fetch({
  url: '/api/v1/user/check-email',
  method: 'POST',
  data: qs.stringify(data)
})
//验证username 是否存在
export const checkUsername = data => fetch({
  url: '/api/v1/user/check-username',
  method: 'POST',
  data: qs.stringify(data)
})
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

//激活后手动发送右键
export const getActivateEmail = data => fetch({
  url: '/api/v1/user/get-active-email',
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


//用户PID 信息获取
export const postUserPid = data => fetch({
  url: '/api/v1/user/user-pid',
  method: 'POST',
  data: qs.stringify(data)
})



/**
 * @param  第三方登录接口
 * 
 */

//google 登录
export const loginGoogle = data => fetch({
  url: '/api/v1/user/login-google',
  method: 'POST',
  data: qs.stringify(data)
})

//用户公开信息  发布优惠券的人的信息获取， 不用登录校验就可以获取
export const loginFacebook = data => fetch({
  url: '/api/v1/user/login-facebook',
  method: 'POST',
  data: qs.stringify(data)
})


//用户联系我们
export const contactUs = data => fetch({
  url: '/api/v1/assist/contact-us',
  method: 'POST',
  data: qs.stringify(data)
})

//申请成为商家
export const applyMerchant = data => fetch({
  url: '/api/v1/user/apply-merchant',
  method: 'POST',
  data: qs.stringify(data)
})

//申请成为红人
export const applyCelebritys = data => fetch({
  url: '/api/v1/user/apply-celebritys',
  method: 'POST',
  data: qs.stringify(data)
})