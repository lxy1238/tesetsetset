<template>
  <div class="about-center" v-title="titleMsg">
    <div class="blank"></div>
    <div class="about-page">
      <div class="about-content">
        <div class="head-crumbs"  >
            <span class=" gray-s">Home > Reset Password</span> 
        </div>
        <div class="card">
          <div class="card-content">
            <reset-pass></reset-pass>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import resetPass from '../../another/resetpass/index'
export default {
  name: 'about_resetpass',
  data () {
    return {
      titleMsg: 'Reset New Password'
    }
  },
  components: {
    resetPass
  },
  mounted () {    //钩子函数，等于vue1.0中的ready
   
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
  .card-content {
    color: #333;
    font-size: 16px;
    width: 1100px;
    margin: 0 auto;
    padding: 40px 0 70px 0;
    p {
      margin: 0 0 40px 0;
    }
  }
</style>
