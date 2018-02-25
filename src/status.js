//优惠券状态
const PENDING  = 'pending'  //待审核
const STOP     = 'stop'     //暂停中
const CLOSE    = 'close'    //关闭
const DECLINE  = 'decline'  //审核未通过
const ACTIVITY = 'active' //上架中
const EXPIRED  = 'expired'  //已过期

//试用品状态

const UNDERBALANCE = 'underbalance' //余额不足



const CENSOR_PENDING = 0 //待审核
const CENSOR_SUCCESS = 1 //审核通过
const CENSOR_NOPASS  = 2 //拒绝

//国家ID
export const COUNTRY_ID = {
  'USA': 1,
  'UK': 2,
  'Germany': 3,
  'Japan': 4,
  'France': 5,
  'Italy': 6,
  'Spain': 7,
  'Canada': 8,
  'Australia': 9
}


//审核试用品 订单编号  1  成功   0  失败
export const REFUSE_ORDER = {
  SUCCESS: 1,
  FAIL: 0
}

