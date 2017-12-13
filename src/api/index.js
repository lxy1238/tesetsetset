
import * as coupon from '../api/coupon'
import * as commonality from '../api/commonality'
import * as trial from '../api/trial'
import * as user from '../api/user'

let api = {}
Object.assign(api, coupon, commonality, trial, user)

export default api
