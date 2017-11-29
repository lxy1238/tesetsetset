<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { setPass, setEmail, getToken, getUserId } from '@/utils/auth.js'
import { updateLogin } from '@/api/login.js'
import { removeStore } from '@/utils/utils'
export default {
  name: 'app',
  mounted () {
    if (getToken()) {
      updateLogin({'api_token': getToken(),'user_id': getUserId()}).then(res => {
      }).catch(error => {
        console.log('登录记录更新失败')
      })
    }
  },
  beforeDestroy () {
    // removeStore('userInfo')
  }
}
</script>

<style lang="less" >
//引入全局字体图标
@import url('../node_modules/normalize.css');
@import url("./static/iconfont/iconfont.css");
@import url("./styles/index.less");
</style>
