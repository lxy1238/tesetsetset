<template>
  <div class="about">
    <header-self></header-self>
    <router-view />
    <footer-self></footer-self>
  </div>
</template>

<script>
import headerSelf from '../../components/help_center/header'
import footerSelf from '../../components/global/footer'
import { aboutRouterMap } from '../../router/index'
export default {
  name: 'about',
  components: {
    headerSelf,
    footerSelf,
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
<style lang="less" >
.about {
  font-family: Arial, Helvetica, sans-serif;
}
 .about-center {
    background: #e4e4e4;
    .blank {
      height: 65px;
    }
   .about-page {
     width: 100%;
     background: #e4e4e4;
     padding-bottom: 80px;
     .about-content {
       max-width: 1520px;
       min-width: 1100px;
       margin: 0 auto;
       .head-crumbs {
         height: 50px;
         line-height: 50px;
         font-size: 15px;
       }
       .card {
         width: 100%;
         background: #fff;
         border: 1px solid #ccc;
         border-radius: 4px;
         min-height: 700px;
         line-height: 1.42;
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
       }
     }
   }
  }
</style>

