import fetch from '@/utils/fetch.js'
import qs from 'qs'

//本地数据测试
export const getTestData = data => fetch({
  url: '/api/v1/user/register',
  method: 'POST',
  data: qs.stringify(data)
})


//注册
export const sign = data => fetch({
  url: '/api/v1/user/register',
  method: 'POST',
  data: qs.stringify(data)
})

//登录

export const login = data => fetch({
  url: '/api/v1/user/login',
  method: 'POST',
  data: qs.stringify(data)
})


//首页获取所有的优惠券的信息
export const getAllCoupons = data => fetch({
  url: '/api/v1/coupon/show',
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

//用户基本信息设置
export const userInfoSet = data => fetch({
  url: '/api/v1/user/base-setting',
  method: 'POST',
  data: qs.stringify(data)
})


//新增优惠券
export const addCoupon = data => fetch({
  url: '/api/v1/coupon/add',
  method: 'POST',
  data: qs.stringify(data)
})

//优惠券详情  通过优惠卷ID查看优惠卷详情
export const couponDetails = data => fetch({
  url: '/api/v1/coupon/detail',
  method: 'POST',
  data: qs.stringify(data)
})

//用户领取的优惠券
export const userPickCoupons = data => fetch({
  url: 'api/v1/coupon/user-coupons',
  method: 'POST',
  data: qs.stringify(data)
})


//通过优惠卷ID查看该优惠券领取的用户接口

export const pickCoupons = data => fetch({
  url: '/api/v1/coupon/coupon-pick',
  method: 'POST',
  data: qs.stringify(data)
})


//通过用户ID查看该用户获取的优惠券接口
export const userCoupons = data => fetch({
  url: '/api/v1/coupon/user-pick',
  method: 'POST',
  data: qs.stringify(data)
})


//商户新增试用品
export const addTrials = data => fetch({
  url: '/api/v1/trial/add',
  method: 'POST',
  data: qs.stringify(data)
})








//公用

//上传图片
export const uploadImg = data => fetch({
  url: '/api/v1/common/upload-file',
  method: 'POST',
  data: data
})