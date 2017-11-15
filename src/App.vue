<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { setPass, setEmail } from '@/utils/auth.js'
export default {
  name: 'app',
  mounted () {
    window.onbeforeunload = function() { 
      setPass("luoxuyou")
      setEmail("1243433362@qq.com")
    } 
  }
}
</script>

<style lang="less" >
//引入全局字体图标
@import url('../node_modules/normalize.css');
@import url("./static/iconfont/iconfont.css");
@import url("./styles/index.less");
</style>
