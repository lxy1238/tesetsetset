<template>
  <div class="broadside">
    <ul class="side-icons">
      <li><i class="iconfont icon-666"></i></li>
      <li><i class="iconfont icon-tuite1"></i></li>
      <li><i class="iconfont icon-liaotian"></i></li>
      <li class="last"><i class="iconfont icon-icon_huaban" @click="goTop"></i></li>
    </ul>
  </div>
</template>

<script>
import { animate } from '@/utils/utils.js'
export default {
  name: 'broadside',
  data () {
    return {
    }
  },
  methods: {
    goTop () {
      animate(document.body, {scrollTop: 0},800)
      animate(document.documentElement, {scrollTop: 0}, 800)
      animate(window, {scrollTop: 0},800)
    }
  }
}
</script>

<style lang="less" scoped>
  .broadside {
    position: fixed;
    top: 200px;
    background: #b5b5b5;
    right: 0px;
    width: 3rem;
    height: 13.5rem;
    z-index: 1000;
    .side-icons {
      width: 2rem;
      margin: 0 auto;
      color: white;
      text-align: center;
      li {
        height: 3.3rem;
        line-height: 3.3rem;
        cursor: pointer;
        &:hover {
          color: #e1e1e1;
        }
        border-bottom: 2px solid white;
        .iconfont {
          font-size: 24px;
        }
        &.last {
          border-bottom: none;
        }
      }
    }
  }
</style>

