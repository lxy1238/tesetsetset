import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'

// 创建axios实例

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 20000,
})


service.interceptors.response.use(
  response => {
    //请求响应之前可以对数据进行操作
  },
  error => {
    // 请求接口失败
   console.log('err ' + error )
   Message({
     message: error.message,
     type: 'error',
     duration: 5 * 1000
   })
   return Promise.reject(error)
  }
)
export default service