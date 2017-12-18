<template>
  <section class="pay-wx">
    <div>微信支付二维码</div>
    <div id="codeWx">

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
  methods: {
    init () {
      if (this.$route.query.withdrawCount) {
        this.reqData.amount = this.$route.query.withdrawCount
      } else {
        // this.$router.push({path: '/404/index'})
      }
      this.$nextTick(function () {
        this.qrcode()
      })
    },
    qrcode () {
      var qrcode = new QRCode(document.getElementById('codeWx'), {
        width : 200,
        height : 200
      })
      this.$api.payWX().then(res => {
        console.log(res)
        qrcode.makeCode(res.data)
      }).catch(err => {
        console.log(err)
        this.qrcode()
      })
    }
  }

}
</script>

<style>

</style>
