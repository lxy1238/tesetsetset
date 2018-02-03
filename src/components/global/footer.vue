<template>
  <div class="footer">
    <div class="footer-top">
      <div class="footer-content">
         <div class="footer-logo">
           <img src="../../assets/logo.png" alt="logo" />
        </div>
        <div class="footer-details clearfix">
          <dl>
            <dt>Follow Us</dt>
            <dd><a href="https://twitter.com/db_DealsBank" target="_blank">Twitter</a></dd>
            <dd><a href="https://www.facebook.com/dealsbank/" target="_blank">Facebook</a></dd>
            <dd><a href="https://www.instagram.com/dealsbank_official/" target="_blank">Instagram</a></dd>
            <dd><a href="https://www.pinterest.com/dealsbank/" target="_blank">Pinterest</a></dd>
          </dl>
          <dl>
            <dt>About</dt>
            <dd> 
              <router-link to="/about/center/index" target="_blank">About</router-link> 
            </dd>
            <dd>
               <router-link to="/about/center/faq" target="_blank">FAQs</router-link> 
            </dd>
            <dd>
              <router-link to="/about/center/countact" target="_blank">Contact</router-link> 
            </dd>
          </dl>
          <dl>
            <dt>Join Us</dt>
            <dd>
              <router-link to="/about/center/influencer" target="_blank">Influencer</router-link>
            </dd>
            <dd>
              <router-link to="/about/center/merchant" target="_blank">Merchant</router-link>
            </dd>
       
          </dl>
          <dl class="last">
            <dt>Help</dt>
            <dd>
              <router-link :to="{ path: '/about/center/faq', query: { id: 2 }}" target="_blank">What Can I Do</router-link>
            </dd>
             <dd>
              <router-link :to="{ path: '/about/center/faq', query: { id: 11 }}" target="_blank">Affiliate ID</router-link>
            </dd>
             <dd>
              <router-link :to="{ path: '/about/center/faq', query: { id: 9 }}" target="_blank">Trial Limitation</router-link>
            </dd>
            <dd>
              <router-link :to="{ path: '/about/center/faq', query: { id: 14 }}" target="_blank">Make Money</router-link>
            </dd>
            
          </dl>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-content clearfix">
        <div class="left">
          ©2018 Dealsbank.com All Rights Reserved.
        </div>
        <div class="right">
           <router-link to="/about/center/term" target="_blank"> Terms of Use</router-link>  ●  
           <router-link to="/about/center/privacy" target="_blank"> Privacy Policy</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'footer',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
@import url('../../styles/mixin.less');
  .footer {
    position: relative;
    bottom: 0;
    z-index: 999;
    min-width:  @Width_content;
     a {
        animation-delay: 1s;
        color: #d0d6da;
        &:hover {
        color: #fff;
        }
      }
    .footer-top {
      
      height: 22.22rem;
      background: #31393f;
      .footer-logo {
        height: 70px;
        border-bottom: 1px solid #4d5459;
        img {
          display: inline-block;
          position: relative;
          top: 10px;
          width: 195px;
          height: 47px;
        }
      }
      .footer-details {
        //ie9 不兼容
        display: flex;
        justify-content: space-between;
        margin-top: -8px;
        width: 56rem;
        color: white;
        dl {
          font-family: Arial, Helvetica, sans-serif;
          margin: 0;
          font-size: 18px;
          width: 12.5rem;
          margin-right: 1.4rem;
          float: left;
         
          dt {
            margin: 1.5rem 0 1.5rem;
          }
          dd {
            font-size: 12px;
            margin: 0 0 1.5rem 0 ;
          }
        }
      }
    }
    .footer-bottom {
      font-size: 14px;
      color: #a8a9aa;
      height: 2rem;
      background: #1a2227;
      line-height: 2rem;
      .left {
        .fl;
      }
      .right {
        float: right;
        a {
          animation-delay: 1s;
          color: #999;
          &:hover {
            color: #fff;
          }
        }
      }
    }
    .footer-content {
      width: 50rem;
      margin: 0 auto;
    }
  }
 
</style>

