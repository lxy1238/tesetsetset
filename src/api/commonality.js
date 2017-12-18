import fetch from '@/utils/fetch.js'
import qs from 'qs'




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


//支付

export const payWX = () => fetch({
  url: '/api/v1/pay/wx-pay',
  method: 'POST',
})