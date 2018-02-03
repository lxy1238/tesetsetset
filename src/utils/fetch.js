import axios from 'axios'
import store from '../store'

import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
// import { getToken } from '@/utils/auth'


// 创建axios实例

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 30000
})


// request拦截器
service.interceptors.request.use(config => {
  // NProgress.start(90)
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})


//response

service.interceptors.response.use(
  response => {
    //请求响应之前可以对数据进行操作
    if (response.data.code !== 200 ) {
      if (response.data.code === 500) {
        // MessageBox.alert('You have logged in elsewhere, please log in again', 'log out', {
        //   confirmButtonText: 'confirm',
        //   callback: () => {
        store.dispatch('LogOut').then(() => {
        })
        // }
        // })
      }
      NProgress.done()
      return Promise.reject(response.data)
    } else {
      NProgress.done()
      return response.data
    }

  },
  error => {
    // 请求接口失败
    console.log('err ' + error )
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 10 * 1000
    // })
    NProgress.done()
    return Promise.reject(error)
  }
)
export default service