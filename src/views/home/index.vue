<template>
  <div class="home">
    <header-self  ></header-self>
    <router-view />
    <broad-side   v-if="showC"></broad-side>
    <footer-self v-if="showC"></footer-self>
  </div>
</template>

<script>
import headerSelf from '../../components/global/header'
import footerSelf from '../../components/global/footer'
import broadSide from '../../components/global/broadside'
export default {
  name: 'home',
  components: {
    headerSelf,
    footerSelf,
    broadSide
  },
  data () {
    return {
      showC: false,
    }
  },
  mounted () {
    setTimeout(() => {
      this.showC = true
    }, 300)
  }

}
</script>

<style lang="less" scoped>

</style>
