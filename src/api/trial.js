import fetch from '@/utils/fetch.js'
import qs from 'qs'


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

//用户申请试用品
export const trialApply = data => fetch({
  url: '/api/v1/trial/trial-apply',
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

//编辑试用品
export const editTrial = data => fetch({
  url: '/api/v1/trial/edit',
  method: 'POST',
  data: qs.stringify(data)
})

//获取需要编辑的试用品详情

export const trialEditDetail = data => fetch({
  url: '/api/v1/trial/edit-detail',
  method: 'POST',
  data: qs.stringify(data)
})
