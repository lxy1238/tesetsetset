<template>
  <div class="home">
    <header-self ></header-self>
    <router-view />
    <broad-side></broad-side>
    <footer-self></footer-self>
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
      msg: 'Welcome to dealsbank'
    }
  },
  mounted () {
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
