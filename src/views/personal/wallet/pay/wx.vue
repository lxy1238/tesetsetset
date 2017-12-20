<template>
  <section class="pay-wx"  >
    <h3 class="title-s">WeChat Pay</h3>
    <div class="pay-wx-content">
      <template v-if="resData != ''">
        <div class="red info-text" v-if="countDown > 0" >二维码将在 {{countDown}} 秒后过期</div>
        <div class="red info-text" v-else>二维码已过期, <a href="javascript:void(0);" @click="refresh">刷新</a>
          页面重新获取二维码。
        </div>
      </template>
      <div id="codeWx" >

      </div>
      <div class="pay-img">
        <img src="../../../../assets/pay-wx.png" />
      </div>
      <div class="scan-text">
        Please use WeChat scan scan qr code to pay
      </div>
      <div class="footer">
        <a href="javasctipt:void(0);" @click="goback">
          <i class="iconfont icon-down-trangle1"></i>  选择其他支付接口
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'pay-wx',
  data () {
    return {
      acount: 0,
      countDown: 40,
      timer: null,
      resData: '',
      reqData: {
        amount: '',
      }
    }
  },
  computed: {

  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    init () {
      if (this.$route.query.withdrawCount) {
        this.reqData.amount = this.$route.query.withdrawCount
      } else {
        this.$router.push({path: '/404/index'})
      }
      this.$nextTick(function () {
        this.qrcode()
      })
    },
    qrcode () {
      var qrcode = new QRCode(document.getElementById('codeWx'), {
        width : 300,
        height : 300
      })
      this.$api.payWX().then(res => {
        this.resData = res.data
        qrcode.makeCode(res.data)
        this.timer = setInterval(() => {
          this.countDown-- 
          if (this.countDown === 0) {
            clearInterval(this.timer)
          }
        }, 1000)
      }).catch(err => {
        console.log(err)
      })
    },
    refresh () {
      window.location.reload()
    },
    goback () {
      window.history.back()
    }
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
        }
      }
      .scan-text {
        width: 300px;
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
      font-size: 18px;
      .icon-down-trangle1 {
        position: absolute;
        left: 0;
        top: 0;
        transform: rotate(90deg);
      }
    }
  }
</style>
