<template>
  <div class="activate">
    {{msg}} {{date}}s
  </div>
</template>

<script>
import { userActivate } from '@/api/login'
import { setToken, setUserId } from '@/utils/auth'
export default {
  name: 'activate',
  data () {
    return {
      msg: 'Active, please later...',
      date: 3,
    }
  },
  mounted () {
    userActivate({'email': this.$route.params.email}).then(res => {
      var timer = null
      if (res.code === 200) {
        timer = setInterval( () => {
          this.date = this.date - 1
          if (this.date === 0) {
            clearInterval(timer)
            setToken(res.data.api_token)
            setUserId(res.data.id)
            this.$store.dispatch('GenerateRoutes', { roles: ['member'] }).then(() => {
              this.$router.addRoutes(this.$store.getters.addRouters)
            })
            this.$router.push({path: '/'})
          }
        }, 1000)
         
      }
    })
  }
}
</script>

<style lang="less" scoped>
  .activate {
    width: 100%;
    height: 600px;
    background: #e1e1e1;
    font-size: 40px;
    color: red;
    text-align: center;
    padding: 200px;
  }
</style>
