<template>
  <div class="about">
    <header-self :need-classify="false"></header-self>
    <subnav :routers="routers"></subnav>
    <broad-side></broad-side>
    <footer-self></footer-self>
  </div>
</template>

<script>
import headerSelf from '../../components/global/header'
import footerSelf from '../../components/global/footer'
import broadSide from '../../components/global/broadside'
import subnav from '../../components/personal/subnav'
import { aboutRouterMap } from '../../router/index'
export default {
  name: 'about',
  components: {
    headerSelf,
    footerSelf,
    broadSide,
    subnav
  },
  data () {
    return {
      msg: 'Welcome to dealsbank',
      routers: []
    }
  },
  mounted () {
    this.routers = aboutRouterMap
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>

