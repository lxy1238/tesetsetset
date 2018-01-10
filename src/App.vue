<template>
  <div id="app" v-title="titleMsg" v-cloak>
    <vue-snotify></vue-snotify>
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      titleMsg:'dealbank'
    }
  },
  name: 'app',
  mounted () {
  },

  beforeDestroy () {
  }
}
</script>

<style lang="less" >
//引入全局字体图标
@import url('../node_modules/normalize.css');
@import url("./static/iconfont/iconfont.css");
@import url("./static/iconfont-editor/iconfont.css");
@import url("./styles/index.less");
</style>
