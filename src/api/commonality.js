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
export const getHeadCateList = data => fetch({
  url: '/api/v1/platform/menu',
  method: 'POST',
  data: qs.stringify(data)
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


/**
 * 
 * @param 支付
 *  
 * 
 */

//支付

export const payWX = data => fetch({
  url: '/api/v1/pay/wx-pay',
  method: 'POST',
  data: qs.stringify(data)
})

//微信支付回调
export const WXcheckPayNotify = data => fetch({
  url: '/api/v1/pay/wx-check-pay-notify',
  method: 'POST',
  data: qs.stringify(data)
})

//支付流水
export const tradeRecord = data => fetch({
  url: '/api/v1/pay/business-log',
  method: 'POST',
  data: qs.stringify(data)
})


//支付宝支付
export const alipay = data => fetch({
  url: '/api/v1/pay/ali-pay',
  method: 'POST',
  data: qs.stringify(data)
})

//paypal

export const paypal = data => fetch({
  url: '/api/v1/pay/pay-pal',
  method: 'POST',
  data: qs.stringify(data)
})



/**
 * 
 * @param 提现
 *  
 * 
 */

//提现
export const withdrawApi = data => fetch({
  url: '/api/v1/pay/withdraw',
  method: 'POST',
  data: qs.stringify(data)
})