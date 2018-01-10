<template>
  <div class="activate">
      
      <div class="email-content">
        <img src="../../../assets/email.png" />
        <div class="success-text">
          <p class="text-top">
            Email is verified successfully.
          </p>
          <p class="text-bottom">
            The email address {{email}} has been verified successfully, please login again.
          </p>
        </div>
      </div>
      
      <!-- <el-button type="info" @click="Login">Login immediately</el-button> -->
  </div>
</template>

<script>
import { setToken, setUserId, setEmail } from '@/utils/auth'
import footerSelf from '@/components/global/footer.vue'
export default {
  name: 'activate',
  components: {
    footerSelf
  },
  data () {
    return {
      activate: true,
      resData: '',
    }
  },
  computed: {
    email () {
      return this.$route.params.email
    }
  },
  mounted () {
    this.$api.userActivate({'email': this.$route.params.email}).then(res => {
      if (res.code === 200) {
        this.activate = true
        this.resData = res.data
        setToken(res.data.api_token)
        setUserId(res.data.id)
        setEmail(this.$route.params.email)
      }
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    Login () {
      this.$api.updateLogin({'api_token': this.resData.api_token,'user_id': this.resData.id}).then(() => {
      }).catch(error => {
        console.log('登录记录更新失败' + error)
      })
      this.$store.dispatch('GenerateRoutes', { roles: ['member'] }).then(() => {
        this.$router.addRoutes(this.$store.getters.addRouters)
        this.$router.push({path: '/'})
      })
    },
    gotoindex () {
      this.$router.push({path: '/'})
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
      }
      .success-text {
        position: relative;
        top: 38px;
      }
      .text-top {
        font-size: 30px;
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
