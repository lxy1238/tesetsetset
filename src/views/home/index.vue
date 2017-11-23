<template>
  <div class="home">
    <header-self  ></header-self>
    <router-view  v-if="showA" />
    <broad-side   v-if="showB" ></broad-side>
    <footer-self v-if="showC" ></footer-self>
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
      msg: 'Welcome to dealsbank',
      showB: false,
      showC: false,
      showA: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.showA = true
    }, 100)
    setTimeout(() => {
      this.showB = true
    }, 200)
      setTimeout(() => {
      this.showC = true
    }, 300)
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
