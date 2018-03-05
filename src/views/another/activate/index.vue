<template>
  <div class="activate">
      
      <div class="email-content" v-if="activate === 1">
        <img src="../../../assets/email.png" />
        <div class="success-text">
          <p class="text-top">
            Email is verified successfully.
          </p>
          <p class="text-bottom">
            The email has been verified successfully, please <a class="link" href="javascript:void(0);" @click="activateLogin">login</a>  again.
          </p>
        </div>
      </div>
       <div class="email-content" v-if="activate === 2">
        <img src="../../../assets/login-remind.png" :class="{fail: activate === 2}"/>
        <div class="success-text">
          <p class="text-top">
            The mailbox has been activated successfully or does not exist.
          </p>
          <p class="text-bottom">
            The email has been verified successfully, please login again.
          </p>
        </div>
      </div>
      
      <!-- <el-button type="info" @click="Login">Login immediately</el-button> -->
  </div>
</template>

<script>
import { removeToken, removeUserId, removeEmail } from '@/utils/auth'
import {  base64Decode } from '@/utils/randomString'
import footerSelf from '@/components/global/footer.vue'
export default {
  name: 'activate',
  components: {
    footerSelf
  },
  data () {
    return {
      activate: 0,
      resData: '',
    }
  },
  computed: {
    email () {
      return this.$route.params.email
    }
  },
  mounted () {
    this.$api.userActivate({'email': base64Decode(this.$route.params.email) , 'api_token': this.$route.params.token}).then(res => {
      if (res.code === 200) {
        removeToken()
        removeUserId()
        removeEmail()
        this.resData = res.data
        this.Login()
      } 
    }).catch(error => {
      this.activate = 2
      console.log(error)
    })
  },
  methods: {
    Login () {
      this.$api.updateLogin({'api_token': this.resData.api_token,'user_id': this.resData.id}).then(() => {
        this.activate = 1
      }).catch(error => {
        console.log('登录记录更新失败' + error)
      })
      // this.$store.dispatch('GenerateRoutes', { roles: ['member'] }).then(() => {
      //   this.$router.addRoutes(this.$store.getters.addRouters)
      // })
    },
    activateLogin () {
      this.$root.eventHub.$emit('isLoginInfo')
    }
  }
}
</script>

<style lang="less" scoped>
  .activate {
    .email-content {
      padding: 130px 0 0 150px;
      img {
        float: left;
        &.fail {
          position: relative;
          top: 20px;
        }
      }
      .success-text {
        position: relative;
        top: 38px;
      }
      .text-top {
        font-size: 28px;
        color: #0072bc;
      }
      .text-bottom {
        font-size: 14px;
        color: #808080;
      }
    }
  }
  .about-center .about-page .about-content .card .card-content p {
    margin: 0 0 10px 0;
}
</style>
