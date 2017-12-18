<template>
  <div class="personal" v-title="titleMsg">
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
export default {
  name: 'personal',
  components: {
    headerSelf,
    footerSelf,
    broadSide,
    subnav
  },
  data () {
    return {
      titleMsg: 'member center',
      routers: []
    }
  },
  mounted () {
    this.routers = this.$store.getters.addRouters
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
