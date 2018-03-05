<template>
  <div id="app"  v-cloak>
    <vue-snotify></vue-snotify>
    <router-view/>
  </div>
</template>

<script>
require('core-js/es7/array')
require('core-js/es6/string')
import { mapGetters } from 'vuex'
import { getToken, getUserId, getPromotionId, setPromotionId } from '@/utils/auth'
import { base64Encode, base64Decode } from '@/utils/randomString'
export default {
  data () {
    return {
      titleMsg:'dealbank'
    }
  },
  name: 'app',
  computed: {
    ...mapGetters([
      'currentRouter',
      'roles'
    ])
  },
  watch: {
    currentRouter () {
      // if (getToken() && getUserId()) {
      //   let params ={ promoter: getUserId()}
      //   if (this.$route.query.editor) {
      //     params.editor = this.$route.query.editor
      //   }
      //   if (this.$route.query.apply) {
      //     params.apply = this.$route.query.apply
      //   }
      //   this.$router.push({path: this.currentRouter, query: params })
      // }
    }
  },
  beforeDestroy () {
  },
  mounted () {
    setTimeout(() =>{
      this.setPromotionIdCookie()
    })
  },
  updated () {
    this.setPromotionIdCookie()
  },
  beforeUpdate () {
    this.init()
  },
  methods: {
    init () {
      setTimeout(() => {
        this.addPromoterId()
      })
    },
    //判断用户是否登录，给链接中加上用户ID
    addPromoterId () {
      if (getUserId() && getToken() && 
      (this.currentRouter.search('/trialsDetails') >= 0 
        || this.currentRouter.search('/coupon') >= 0
        || this.currentRouter.search('/trials') >= 0
        || this.currentRouter === '/'
      ) ) {
        if (this.$route.params.promoterId) {
          return
        }else if (this.currentRouter[this.currentRouter.length - 1] === '/') {
          this.$router.replace({path: this.currentRouter + (getUserId() ?   base64Encode(getUserId()) : '')})
        } else {
          this.$router.replace({path: this.currentRouter + (getUserId() ? '/' +  base64Encode(getUserId()) : '')})
        }
      }
    },

    // 设置推广ID， 存入cookie
    setPromotionIdCookie () {
      //登录的情况下
      if (getToken()) {
        if (this.roles[0] == 'celebrity') {
          setPromotionId(base64Decode(getUserId()))
        } else {
          if (getPromotionId()) {
            return
          } else {
            setPromotionId(base64Decode(this.$route.params.promoterId))
          }
        }
      } else {
        if (getPromotionId()) {
          return
        } else {
          setPromotionId(base64Decode(this.$route.params.promoterId))
        }
      }
    }

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
