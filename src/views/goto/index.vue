<template>
  <div  v-loading.fullscreen.lock="fullscreenLoading">
  </div>
</template>

<script>
import {  base64Decode } from '@/utils/randomString'
import { validateAmazonHost } from '@/utils/validate'
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
      country_id: parseInt(base64Decode(this.$route.params.countryId)),
      coupon_id: base64Decode(this.$route.params.couponId),
      amazonLink: '',
      promoterPid1: 'dealsbankamz-20',
      promoterPid2: 'dealsbankamz-21',
      promoterPid3: 'dealsbankamz-21',
      link: '',
      fullscreenLoading: true
    }
  },
  computed: {
    promoterPid: {
      set (value) {
        this.promoterPid1 = value
      },
      get () {
        if (this.country_id === 1) {
          return this.promoterPid1
        } else if (this.country_id === 2){
          return this.promoterPid2
        } else {
          return this.promoterPid3
        }
      }
    }
  },
  mounted () {
    this.getAmazonLink()
  },
  methods: {
    //判断链接中携带哪个pid , 如果有分享人的id 那就携带分享人的pid， 如果没有分享人，则携带公司的pid
    getAmazonLink () {
      if (this.$route.params.productName === 'coupon') {
        this.$api.couponDetails(this.requestCouponDetails)
          .then(res => {
            this.amazonLink = res.data.product_url
            let urlArr = validateAmazonHost(this.amazonLink)
            // let keyword = validateKeyword(this.amazonLink)
            this.hasPromoter(res.data).then(() => {
              if (this.$route.params.gotopage === 'platform') {
                location.href = `https://${urlArr[1]}?tag=${this.promoterPid}`
                return
              }
              if (this.amazonLink.includes('https://') || this.amazonLink.includes('http://')) {
                if (this.amazonLink.includes('?')){
                  this.link = `${this.amazonLink}&tag=${this.promoterPid}`
                } else {
                  this.link = `${this.amazonLink}?tag=${this.promoterPid}`
                }
              } else {
                if (this.amazonLink.includes('?')){
                  this.link = `https://${this.amazonLink}&tag=${this.promoterPid}`
                } else {
                  this.link = `https://${this.amazonLink}?tag=${this.promoterPid}`
                }
              }
              // if (keyword) {
              //   this.link = `https://${urlArr[1]}/dp/${urlArr[urlArr.length - 1]}?tag=${this.promoterPid}`
              // } else {
              //   this.link = `https://${urlArr[1]}/dp/${urlArr[urlArr.length - 1]}?tag=${this.promoterPid}`
              // }
              location.href = this.link
            })
          })
          .catch(error => {
            console.log(error + 'couponDetails')
          })
      } else if (this.$route.params.productName === 'trial') {
        this.$api.trialDetail(this.requestCouponDetails)
          .then(res => {
            this.amazonLink = res.data.product_url
            let urlArr = validateAmazonHost(this.amazonLink)
            // let keyword = validateKeyword(this.amazonLink)
            this.hasPromoter(res.data).then(() => {
              if (this.$route.params.gotopage === 'platform') {
                location.href = `https://${urlArr[1]}?tag=${this.promoterPid}`
                return
              }
              if (this.amazonLink.includes('https://') || this.amazonLink.includes('http://')) {
                if (this.amazonLink.includes('?')){
                  this.link = `${this.amazonLink}&tag=${this.promoterPid}&m=${res.data.user_store.store_id}`
                } else {
                  this.link = `${this.amazonLink}?tag=${this.promoterPid}&m=${res.data.user_store.store_id}`
                }
              } else {
                if (this.amazonLink.includes('?')){
                  this.link = `https://${this.amazonLink}&tag=${this.promoterPid}&m=${res.data.user_store.store_id}`
                } else {
                  this.link = `https://${this.amazonLink}?tag=${this.promoterPid}&m=${res.data.user_store.store_id}`
                }
              }
              // if (keyword) {
              //   this.link = `https://${urlArr[1]}/dp/${urlArr[urlArr.length - 1]}?tag=${this.promoterPid}&m=${res.data.user_store.store_id}`
              // } else {
              //   this.link = `https://${urlArr[1]}/dp/${urlArr[urlArr.length - 1]}?tag=${this.promoterPid}&m=${res.data.user_store.store_id}`
              // }
              location.href = this.link
            })
          })
          .catch(error => {
            console.log(error + 'couponDetails')
          })
      }
    },
    hasPromoter (data) {
      return new Promise((resolve, reject) => {
        if (this.$route.params.promoterId) {
          this.requestPlatData.user_id = base64Decode(this.$route.params.promoterId)
          this.requestPlatData.country_id = base64Decode(this.$route.params.countryId)
          this.$api.postUserPid(this.requestPlatData).then(res => {
            for (let i of res.data) {
              if (i.platform_id === data.platform_id) {
                if (i.PID) {
                  this.promoterPid = i.PID
                } 
              }
            }
            resolve()
          }).catch(err => {
            reject(err)
          })
        } else {
          resolve()
        }
      })
    },
  }
}
</script>

<style>

</style>
