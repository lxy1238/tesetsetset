import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/utils/auth'

// 创建axios实例

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 20000
  // withCredentials: true,
})


// request拦截器
service.interceptors.request.use(config => {
  NProgress.start()
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})


//response

service.interceptors.response.use(
  response => {
    //请求响应之前可以对数据进行操作
    NProgress.done()
    return response.data
  },
  error => {
    // 请求接口失败
   console.log('err ' + error )
   Message({
     message: error.message,
     type: 'error',
     duration: 10 * 1000
   })
   return Promise.reject(error)
  }
)
export default service