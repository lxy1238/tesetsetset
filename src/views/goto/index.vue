<template>
  <div  v-loading.fullscreen.lock="fullscreenLoading">
  </div>
</template>

<script>
import {  base64Decode } from '@/utils/randomString'
import { validateAmazonHost } from '@/utils/validate'
import { COUNTRY_ID } from '@/status'
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
      ALL_COUNTRY_PID: {
        'USA': 'dealsbankamz-20',
        'UK': 'dealsbank-21',
        'Germany': 'dealsbank02-21',
        'Japan': 'dealsbank0f-22',
        'France': 'dealsbank03-21',
        'Italy': 'dealsbank0c-21',
        // 'Italy': 'yidaliymx-21',
        'Spain': 'dealsbank05-21',
        'Canada': 'dealsbank02-20',
      },
      promoterPid_another: '',
      link: '',
      fullscreenLoading: true,
      

    }
  },
  computed: {
    promoterPid: {
      set (value) {
        this.promoterPid_another = value
      },
      get () {
        if (this.country_id === COUNTRY_ID['USA']) {
          return this.promoterPid_another || this.ALL_COUNTRY_PID['USA']
        } else if (this.country_id === COUNTRY_ID['UK']){
          return this.promoterPid_another || this.ALL_COUNTRY_PID['UK']
        } else if (this.country_id === COUNTRY_ID['Germany']){
          return this.promoterPid_another || this.ALL_COUNTRY_PID['Germany']
        } else if (this.country_id === COUNTRY_ID['Japan']){
          return this.promoterPid_another || this.ALL_COUNTRY_PID['Japan']
        } else if (this.country_id === COUNTRY_ID['France']){
          return this.promoterPid_another || this.ALL_COUNTRY_PID['France']
        } else if (this.country_id === COUNTRY_ID['Italy']){
          return this.promoterPid_another || this.ALL_COUNTRY_PID['Italy']
        } else if (this.country_id === COUNTRY_ID['Spain']){
          return this.promoterPid_another || this.ALL_COUNTRY_PID['Spain']
        } else if (this.country_id === COUNTRY_ID['Canada']){
          return this.promoterPid_another || this.ALL_COUNTRY_PID['Canada']
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
            this.amazonLink = this.filterLink1(this.amazonLink)
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
            console.log(res.data.product_url)
            let urlArr = validateAmazonHost(this.amazonLink)
            this.amazonLink = this.filterLink1(this.amazonLink)
            console.log(this.amazonLink)
            this.hasPromoter(res.data).then(() => {
              if (this.$route.params.gotopage === 'platform') {
                location.href = `https://${urlArr[1]}?tag=${this.promoterPid}`
                return
              }
              if (this.amazonLink.includes('https://') || this.amazonLink.includes('http://')) {
                if (this.amazonLink.includes('?')){
                  this.link = `${this.amazonLink}&tag=${this.promoterPid}`
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
            console.log(error + 'trial Details')
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
                  this.promoterPid_another = i.PID
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

    //处理链接
    // 1、处理keywords 所有的%20 %2B  转化成 + 号
    // 2、链接自带tag 参数 就去掉
    // 3、链接知道店铺ID m=  也去掉
    filterLink (link) {
      let regKeyword = /keywords=([\w\+%]*)/
      let regTag = /(&)?tag=([\w\+%]*)/
      let regM = /(&)?m=([\w\+%]*)/
      let newLink = this.amazonLink
      if (regKeyword.test(link)) {
        newLink = link.replace(regKeyword.exec(link)[0],regKeyword.exec(link)[0].replace(/\%20/g, '+').replace(/\%2B/, '+'))
      }
      if (regTag.test(link)) {
        newLink = newLink.replace(regTag.exec(link)[0], '')
      }
      if (regM.test(link)) {
        newLink = newLink.replace(regM.exec(link)[0], '')
      }
      return newLink
    },
    filterLink1 (link) {
      let regKeyword = /keywords=([\w\+%]*)/
      let regTag = /(&)?tag=([\w\+%]*)/
      let newLink = this.amazonLink
      if (regKeyword.test(link)) {
        newLink = link.replace(regKeyword.exec(link)[0],regKeyword.exec(link)[0].replace(/\%20/g, '+').replace(/\%2B/, '+'))
      }
      if (regTag.test(link)) {
        newLink = newLink.replace(regTag.exec(link)[0], '')
      }
      
      return newLink
    }
  }
}
</script>

<style>

</style>
