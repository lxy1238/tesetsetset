<template>
  <div class="broadside">
    <ul class="side-icons">
      <li>
          <a href="https://www.facebook.com/dealsbank/" target="_blank">
            <i class="iconfont icon-facebookicon">
            </i>
          </a>
      </li>
       <li>
          <a href="https://twitter.com/db_DealsBank/" target="_blank">
            <i class="iconfont icon-tuite1">
            </i>
          </a>
      </li>
       <li>
          <a href="https://www.pinterest.com/dealsbank/" target="_blank">
            <i class="iconfont icon-pinterestp">
            </i>
          </a>
      </li>
      <li @click="contactUs"><i class="iconfont icon-liaotian"></i></li>
      <li class="last" @click="goTop"><i class="iconfont icon-icon_huaban" ></i></li>
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
    },
    contactUs () {
      window.open('/about/center/countact')
    }
  }
}
</script>

<style lang="less" scoped>
  .broadside {
    position: fixed;
    top: 200px;
    background: #b5b5b5;
    border: 1px solid #c7c7c7;
    right: 0px;
    width: 50px;
    // height: 13.5rem;
    z-index: 1000;
    .side-icons {
      margin: 0 auto;
      color: white;
      text-align: center;
      li {
        height: 50px;
        line-height: 50px;
        background: #fff;
        color: #c2c2c2;
        cursor: pointer;
        a {
          color: #c2c2c2;
        }
        &:hover {
          a {
            color: #fff;
          }
          background: #0077c5;
        }
        border-bottom: 1px solid #c7c7c7;
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

