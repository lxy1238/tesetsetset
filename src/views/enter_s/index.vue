<template>
  <div class="enter-s">
    <div class="generalize-banner">
        推广Banner
    </div>
    <router-link to="/enter/seller">成为商家</router-link>
    <router-link to="/enter/reds">成为红人</router-link>
  </div>
</template>

<script>
export default {
  name: 'enter_s',
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
  .enter-s {
    .generalize-banner {
      min-width: 1000px;
      height: 255px;
      border: 1px solid red;
      text-align: center;
      line-height: 255px;
    }
  }
</style>
