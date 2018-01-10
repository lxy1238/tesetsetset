<template>
  <div  v-loading.fullscreen.lock="fullscreenLoading">
  </div>
</template>

<script>
import {  base64Decode } from '@/utils/randomString'
export default {
  name: 'goto',
  data () {
    return {
      //获取平台信息
      requestPlatData: {
        country_id: base64Decode(this.$route.params.countryId),
        user_id: base64Decode(this.$route.params.promoterId),
      },

      requestCouponDetails: {
        country_id: base64Decode(this.$route.params.countryId),
        id: base64Decode(this.$route.params.couponId),
      },
      user_id: base64Decode(this.$route.params.promoterId),
      country_id: base64Decode(this.$route.params.countryId),
      coupon_id: base64Decode(this.$route.params.couponId),
      amazonLink: '',
      promoterPid: '12345678',
      link: '',
      fullscreenLoading: true

    }
  },
  mounted () {
    this.getAmazonLink()
  },
  methods: {
    //判断链接中携带哪个pid , 如果有分享人的id 那就携带分享人的pid， 如果没有分享人，则携带公司的pid
    getAmazonLink () {
      this.$api.couponDetails(this.requestCouponDetails)
        .then(res => {
          this.amazonLink = res.data.product_url
          this.hasPromoter(res.data).then(() => {
            this.link = `${this.amazonLink}&tag=${this.promoterPid}`
            location.href = this.link
          })
        })
        .catch(error => {
          console.log(error + 'couponDetails')
        })
    },
    hasPromoter (data) {
      return new Promise((resolve, reject) => {
        if (this.$route.params.promoterId) {
          this.requestPlatData.user_id = base64Decode(this.$route.params.promoterId)
          this.requestPlatData.country_id = base64Decode(this.$route.params.countryId)
          console.log(this.requestPlatData)
          this.$api.postUserPid(this.requestPlatData).then(res => {
            console.log(res)
            for (let i of res.data) {
              console.log(data)
              if (i.platform_id === data.platform_id) {
                if (i.PID) {
                  this.promoterPid = i.PID
                  console.log(this.promoterPid)
                } 
              }
            }
            resolve()
          }).catch(err => {
            reject(err)
          })
        } else {
          resolve()
          this.promoterPid = '12345678'
        }
      })
    },
  }
}
</script>

<style>

</style>
