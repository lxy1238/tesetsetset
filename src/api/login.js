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




/**
 * 
 * @param 优惠券审核
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




/**
 * 
 * @param 试用品
 *  
 * 
 */

//首页获取所有的优惠券的信息
export const getAllTrial = data => fetch({
  url: '/api/v1/trial/show',
  method: 'POST',
  data: qs.stringify(data)
})

//显示试用品店铺列表
export const trialsAdd = data => fetch({
  url: '/api/v1/trial/add',
  method: 'POST',
  data: qs.stringify(data)
})

//商户新增试用品
export const trialsStore = data => fetch({
  url: '/api/v1/trial/trial-store',
  method: 'POST',
  data: qs.stringify(data)
})

//商户新增试用品
export const trialDetail = data => fetch({
  url: '/api/v1/trial/detail',
  method: 'POST',
  data: qs.stringify(data)
})

//商户发布的试用品
export const userTrials = data => fetch({
  url: '/api/v1/trial/user-trials',
  method: 'POST',
  data: qs.stringify(data)
})



//新增店铺
export const addStore = data => fetch({
  url: '/api/v1/user/add-store',
  method: 'POST',
  data: qs.stringify(data)
})

//显示店铺列表

export const showStore = data => fetch({
  url: '/api/v1/user/show-store',
  method: 'POST',
  data: qs.stringify(data)
})


/**
 * 
 * @param 试用品审核修改状态
 *  
 * 
 */

// 试用品审核信息
export const trialCensor = data => fetch({
  url: '/api/v1/trial/censor',
  method: 'POST',
  data: qs.stringify(data)
})

//更新试用品状态
export const trialUpdateRunStatus = data => fetch({
  url: '/api/v1/trial/update-run-status',
  method: 'POST',
  data: qs.stringify(data)
})

// 删除试用品
export const trialDetele = data => fetch({
  url: '/api/v1/trial/delete',
  method: 'POST',
  data: qs.stringify(data)
})

//编辑优惠券
export const editTrial = data => fetch({
  url: '/api/v1/trial/edit',
  method: 'POST',
  data: qs.stringify(data)
})

//获取需要编辑的优惠券详情

export const trialEditDetail = data => fetch({
  url: '/api/v1/trial/edit-detail',
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


//获取平台品类
export const getPlatformCate = data => fetch({
  url: '/api/v1/platform/show',
  method: 'POST',
  data: qs.stringify(data)
})


//获取首页头部的品类列表
export const getHeadCateList = () => fetch({
  url: '/api/v1/platform/menu',
  method: 'POST',
})


/**
 * 
 * @param 平台管理
 *  
 * 
 */
//获取首页国家列表
export const getUserCountry = () => fetch({
  url: '/api/v1/platform/country',
  method: 'POST',
})