import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import store from './store'
import { getEmail , getToken} from './utils/auth'
// import { getInfo } from '@/api/login'

var whiteList = ['/']
router.beforeEach((to, from, next) => {
  store.dispatch('setCurrentRouter', to.path)  //存储当前路由path
  NProgress.start()
  if (getEmail() && getToken()) {
    if (store.getters.roles.length === 0) {
      store.dispatch('GetInfo').then(res => {
        const roles =[ res.data.type ]
        store.dispatch('GenerateRoutes', { roles }).then(() => {
          router.addRoutes(store.getters.addRouters)
          next({ ...to })
        })
      })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next()
      NProgress.start(100)
      NProgress.done()
    }
  }
  next()
})

router.afterEach(() => {
  NProgress.start(100)
  NProgress.done() // 结束Progress
})

