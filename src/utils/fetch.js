import axios from 'axios'
import store from 'vuex'
import { Message, MessageBox } from 'element-ui'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
// import { getToken } from '@/utils/auth'


// 创建axios实例

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 20000
})


// request拦截器
service.interceptors.request.use(config => {
  NProgress.start()
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
      console.log(response.data)
      if (response.data.code !== 500) {
        Message({
          message: response.data.message,
          type: 'error',
          duration: 3 * 1000
        })
      }
      if (response.data.code === 500) {
        MessageBox.confirm('You have logged in elsewhere, please log in again', 'log out', {
          confirmButtonText: 'confirm',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('LogOut').then(() => {
            console.log('log out success！！')
          })
        })
        console.log(response)
      }
      NProgress.done()
      return Promise.reject('error')
    } else {
      NProgress.done()
      return response.data
    }

  },
  error => {
    // 请求接口失败
    console.log('err ' + error )
    Message({
      message: error.message,
      type: 'error',
      duration: 10 * 1000
    })
    NProgress.done()
    return Promise.reject(error)
  }
)
export default service