<template>
  <header class="help-center">
    <div class="content">
        <img src="../../assets/DB.png"  alt="logo" @click="gotoIndex"/>
        <ul class="item-route">
          <li v-for="item in routes" :class="{active: item.link == currentRouter}" >
            <router-link :to="item.link">
            {{item.name}}
            </router-link>
          </li>
          
        </ul>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'about',
  data () {
    return {
      routes: [
        {
          name: 'About Us',
          link: '/about/center/index'
        },
        {
          name: 'Join as Influencer',
          link: '/about/center/influencer'
        },
        {
          name: 'Join as Merchant',
          link: '/about/center/merchant'
        },
        {
          name: 'Contact Us',
          link: '/about/center/countact'
        },
        {
          name: 'FAQs',
          link: '/about/center/faq'
        },
        {
          name: 'Terms of Use',
          link: '/about/center/term'
        },
        {
          name: 'Privacy Policy',
          link: '/about/center/privacy'
        },
      ]
    }
  },
  computed: {
    ...mapGetters([
      'currentRouter'
    ])
  },
  methods: {
    gotoIndex () {
      this.$router.push({path: '/'})
    }
  },
  

}
</script>

<style lang="less" scoped>
  .help-center {
    position: fixed;
    height: 65px;
    line-height: 65px;
    background: #fff;
    z-index: 999;
    width: 100%;
    display: block;
    border-bottom: 1px solid #ccc;
    .content {
      max-width: 1520px;
      min-width: 1100px;
      margin: 0 auto;
      img {
        position: relative;
        top: 8px;
        cursor: pointer;
      }
      .item-route {
        float: right;
        display: block;
        margin: 0;
        width: 900px;
        li {
          float: left;
          font-size: 15px;
          color: #333;
          display: block;
          margin-right: 30px;
          text-align: center;
          a {
            color: #333;
            &:hover {
              color: #0072bc;
              text-decoration: underline;
            }
          }
          &.active {
            a {
              color: #0072bc;
            }
          }
        }
      }
    }
  }
</style>
