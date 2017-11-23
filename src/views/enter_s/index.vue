<template>
  <div class="enter-s">
    <div class="generalize-banner">
        推广Banner
    </div>

    <div class="enter-link">
      <button>
        <router-link to="/enter/seller">成为商家</router-link>
      </button>
      <button>
        <router-link to="/enter/reds">成为红人</router-link>
      </button>
     
    </div>
    
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
@import url('../../styles/mixin.less');
  .enter-s {
    height: 1000px;
    .generalize-banner {
      min-width: 1000px;
      height: 255px;
      border: 1px solid red;
      text-align: center;
      line-height: 255px;
    }
    .enter-link {
      text-align: center;
      margin-top: 100px;
      button {
        .btn-h(200px,80px);
        a {
          display: inline-block;
          width: 100%;
          height: 100%;
          line-height: 80px;
        }
      }
    }
  }
</style>
