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


//新增优惠券
export const addCoupon = data => fetch({
  url: '/api/v1/coupon/add',
  method: 'POST',
  data: qs.stringify(data)
})

//优惠券详情
export const couponDetails = data => fetch({
  url: '/api/v1/user/login-records',
  method: 'POST',
  data: qs.stringify(data)
})

//用户领取的优惠券
export const userPickCoupons = data => fetch({
  url: 'api/v1/coupon/user-coupons',
  method: 'POST',
  data: qs.stringify(data)
})


//上传图片
export const uploadImg = data => fetch({
  url: '/api/v1/common/upload-file',
  method: 'POST',
  data: qs.stringify(data)
})