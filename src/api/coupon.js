import fetch from '@/utils/fetch.js'
import qs from 'qs'


/*
 * @param 优惠券信息 
 * 
 * 
 */

//首页获取所有的优惠券的信息
export const getAllCoupons = data => fetch({
  url: '/api/v1/coupon/show',
  method: 'POST',
  data: qs.stringify(data)
})
//新增优惠券
export const addCoupon = data => fetch({
  url: '/api/v1/coupon/add',
  method: 'POST',
  data: qs.stringify(data)
})

//编辑优惠券
export const editorCoupon = data => fetch({
  url: '/api/v1/coupon/edit',
  method: 'POST',
  data: qs.stringify(data)
})

//获取需要编辑的优惠券详情

export const editDetail = data => fetch({
  url: '/api/v1/coupon/edit-detail',
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

//优惠券问题反馈
export const addProblem = data => fetch({
  url: '/api/v1/user/add-problem',
  method: 'POST',
  data: qs.stringify(data)
})

//优惠券模板编辑
export const editTemplate = data => fetch({
  url: '/api/v1/coupon/edit-template',
  method: 'POST',
  data: qs.stringify(data)
})


//添加,设置 pid 

export const userAlliancePID = data => fetch({
  url: '/api/v1/user/user-alliance-PID',
  method: 'POST',
  data: qs.stringify(data)
})



/**
 * 
 * @param 优惠券审核， 状态改变
 *  
 * 
 */

//优惠券审核不通过查看详情
export const couponCensor = data => fetch({
  url: '/api/v1/coupon/censor',
  method: 'POST',
  data: qs.stringify(data)
})

//更新状态
export const couponUpdateRunStatus = data => fetch({
  url: '/api/v1/coupon/update-run-status',
  method: 'POST',
  data: qs.stringify(data)
})

//删除优惠券
export const couponDetele = data => fetch({
  url: '/api/v1/coupon/delete',
  method: 'POST',
  data: qs.stringify(data)
})

