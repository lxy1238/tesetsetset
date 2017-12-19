<template>
  <div class="about-center" v-title="titleMsg">
    help center
    <div id="code"></div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'about',
  data () {
    return {
      titleMsg: 'About Us'
    }
  },
  mounted () {    //钩子函数，等于vue1.0中的ready
    this.$nextTick(function () {
      this.qrcode()
    })
  },
  methods: {
    qrcode () {
      var qrcode = new QRCode(document.getElementById('code'), {
        width : 100,
        height : 100
      })
      this.$api.payWX().then(res => {
        console.log(res)
        qrcode.makeCode(res.data)
      })
    }
  }
}
</script>

<style>

</style>
