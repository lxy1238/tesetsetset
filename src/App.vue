<template>
  <div id="app" v-title="titleMsg">
    <router-view/>
  </div>
</template>

<script>
import { getToken, getUserId } from '@/utils/auth.js'
export default {
  data () {
    return {
      titleMsg:'dealbank'
    }
  },
  name: 'app',
  mounted () {
    // if (getToken()) {
    //   this.$api.updateLogin({'api_token': getToken(),'user_id': getUserId()}).then(res => {
    //   }).catch(error => {
    //     console.log('登录记录更新失败' + error)
    //   })
    // }
    
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
