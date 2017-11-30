<template>
  <div class="page-index pages">
   <!-- 这个组件演示了复制div内容的使用方法 -->
    <div id="test">
        <img src="http://imgproxy.dataoke.com/imgextra/i4/570958094/*t*b28q*b*diqag*s*k*jjy0*fc*x*xc*ze*v*xa_!!570958094.jpg_400x400.jpg"><br />
        <span>你好，这是测试图片</span>
    </div>

    <button  data-clipboard-target="#test" @click="handleClip($event)">Copy</button>
  </div>
</template>

<script>
import Clip from '@/utils/clipboard.js'
export default {
  name: 'page_index',
  data () {
    return { 
      msg: 'pageindex'
    }
  },
  methods : {
    handleClip (event) {
      Clip(event)
    }
  },
}
</script>

<style lang="less" scoped>
  p {
    border: 1px solid hotpink;
    height: 60px;
    margin: 10px;
  }
</style>
