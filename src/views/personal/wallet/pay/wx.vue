<template>
  <section class="pay-wx"  >
    <h3 class="title-s"  v-loading.fullscreen.lock="fullscreenLoading">WeChat Pay</h3>
    <div class="pay-wx-content">
      <template v-if="resData != ''">
        <div class="red info-text" v-if="countDown > 0" >The qr code will expire in {{countDown}} seconds.</div>
        <div class="red info-text" v-else>QR code has expired, <a href="javascript:void(0);" @click="refresh">refresh</a> the page to regain the QR code.
        </div>
      </template>
      <div id="codeWx" >

      </div>
      <div class="pay-img"  v-show="resData != ''" >
        <img src="../../../../assets/pay-wx.png" />
      </div>
      <div class="scan-text"   v-show="resData != ''">
        Please use WeChat scan scan qr code to pay
      </div>
      <div class="footer"  v-show="resData != ''">
        <a href="javasctipt:void(0);" @click="goback" class="link">
          <i class="iconfont icon-down-trangle1"></i>  Please choose other recharge method
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import QRCode from 'qrcodejs2'
import { getUserId, getToken } from '@/utils/auth'
import { getStore } from '@/utils/utils'
import { RandomPayNumber } from '@/utils/randomString'
export default {
  name: 'pay-wx',
  data () {
    return {
      acount: 0,
      countDown: 60,
      timer: null,
      timerPay: null,
      resData: '',
      countryLists: [],
      country_id: parseInt(getStore('country_id')) || 1,
      reqData: {
        country_id: parseInt(getStore('country_id')) || 1,
        api_token: getToken(),
        user_id: getUserId(),
        amount: '',
        pay_order_number: '',
        bank_conversion_pri: '',
      },
      reqDataPayInfo: {
        country_id: parseInt(getStore('country_id')) || 1,
        api_token: getToken(),
        user_id: getUserId(),
        pay_order_number: '',
      },
      fullscreenLoading: false
    }
  },
  computed: {

  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    clearInterval(this.timer)
    clearInterval(this.timerPay)
  },
  methods: {
    init () {
      this.initData()
      this.getUserCountryInfo()
    },

    //获取需要充值的金额
    initData () {
      this.fullscreenLoading = true

      if (this.$route.query.withdrawCount) {
        this.reqData.amount = this.$route.query.withdrawCount
        this.reqData.pay_order_number = RandomPayNumber()
      } else {
        this.$router.push({path: '/404/index'})
      }
    },

    //绘制二维码
    qrcode () {
      let qrcode = new QRCode(document.getElementById('codeWx'), {
        width : 240,
        height : 240
      })
      this.$api.payWX(this.reqData).then(res => {
        if (!res.data) {
          clearInterval(this.timer)
          clearInterval(this.timerPay)
          this.$snotify.info('The WeChat payment interface is wrong, please reload the page or use other payment methods.')
          return
        }
        this.resData = res.data
        qrcode.makeCode(res.data)
        this.fullscreenLoading = false
        this.timer = setInterval(() => {
          this.countDown-- 
          if (this.countDown === 0) {
            clearInterval(this.timer)
            clearInterval(this.timerPay)
          }
        }, 1000)
        this.timerPay = setInterval( () => {
          this.getWXPayInfo()
        }, 3000)
      }).catch(err => {
        console.log(err)
      })
    },
    //定时器获取支付结果
    getWXPayInfo () {
      this.reqDataPayInfo.pay_order_number = this.reqData.pay_order_number
      this.$api.WXcheckPayNotify(this.reqDataPayInfo).then(res => {
        if (!res.data) {
          return
        }
        if (res.data.result_code == 'SUCCESS') {
          this.$store.dispatch('GetInfo').then(() => {
            this.$router.push({path: '/wallet/financial'})
          })
          clearInterval(this.timerPay)
        }
      }).catch(err => {
        console.log(err)
      })
    },
   
    //获取国家列表，携带货币符号，
    getUserCountryInfo () {
      this.$api.getUserCountry().then(res => {
        this.countryLists = res.data
        for (let i of this.countryLists) {
          if (i.id === this.country_id) {
            this.reqData.bank_conversion_pri = i.bank_conversion_pri
          }
        }
        this.qrcode()
      }).catch(error => {
        console.log(error)
      })
    },

    refresh () {
      window.location.reload()
    },
    goback () {
      window.history.back()
    },
  }

}
</script>

<style lang="less" scoped>
  .pay-wx {
    .info-text {
      margin-bottom: 1rem;
    }
    .pay-wx-content {
      position: relative;
      padding: 20px 0 0 30px;
      .pay-img {
        img {
          position: absolute;
          right: 5%;
          top: 10px;
          top: -7px;
          height: 450px;
        }
      }
      .scan-text {
        width: 240px;
        height: 60px;
        color: white;
        font-size: 18px;
        background: #FF7674;
        padding: 10px 0 10px 0;
        text-align: center;
        margin: 30px 0 30px 0;
      }
    }
    .footer {
      position: relative;
      margin-top: 1rem;
      padding-left: 20px;
      font-size: 16px;
      .icon-down-trangle1 {
        position: absolute;
        left: 0;
        // top: 2px;
        transform: rotate(90deg);
      }
    }
  }
</style>
