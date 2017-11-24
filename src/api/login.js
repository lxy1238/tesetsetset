import fetch from '@/utils/fetch.js'
import qs from 'qs'


//用户基本信息

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


//用户公开信息  发布优惠券的人的信息获取， 不用登录校验就可以获取
export const postedUserInfo = data => fetch({
  url: '/api/v1/user/open-info',
  method: 'POST',
  data: qs.stringify(data)
})



/*
 * @param 优惠券信息 
 * 
 * 
 */
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

//用户发布的优惠券
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


//通过用户ID查看该用户领取的优惠券
export const userCoupons = data => fetch({
  url: '/api/v1/coupon/user-pick',
  method: 'POST',
  data: qs.stringify(data)
})

//优惠券领取

export const userGetCoupon = data => fetch({
  url: '/api/v1/coupon/receive',
  method: 'POST',
  data: qs.stringify(data)
})

//检测优惠券时候已经领取
export const isUserGetCoupon = data => fetch({
  url: '/api/v1/coupon/check-receive',
  method: 'POST',
  data: qs.stringify(data)
})

//收藏优惠券
export const promotionAddCoupon = data => fetch({
  url: '/api/v1/coupon/promotions',
  method: 'POST',
  data: qs.stringify(data)
})

//用户收藏的优惠券
export const promotionUserCoupon = data => fetch({
  url: '/api/v1/coupon/user-promotions',
  method: 'POST',
  data: qs.stringify(data)
})

//移除收藏的优惠券
export const promotionUserRemove = data => fetch({
  url: '/api/v1/coupon/promotion-del',
  method: 'POST',
  data: qs.stringify(data)
})

/**
 * 
 * @param 试用品
 * 
 * 
 */

//商户新增试用品
export const trialsAdd = data => fetch({
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