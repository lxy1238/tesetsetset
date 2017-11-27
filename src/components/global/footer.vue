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
            <dd><a href="#">Twitter</a></dd>
            <dd><a href="#">Facebook</a></dd>
            <dd><a href="#">Instagram</a></dd>
            <dd><a href="#">Pinterest</a></dd>
          </dl>
          <dl>
            <dt>About</dt>
            <dd> <a href="#">About</a> </dd>
            <dd> <a href="#">FAQ</a> </dd>
          </dl>
          <dl>
            <dt>Join Us</dt>
            <dd>
              <router-link to="/enter/index">Seller</router-link>
            </dd>
            <!-- <dd><a href="#">Sensation</a></dd>
            <dd><a href="#">Member</a></dd> -->
          </dl>
          <dl class="last">
            <dt>Help</dt>
            <dd><a href="#">Customer Service</a></dd>
            <dd><a href="#">Disputes & Reports</a></dd>
            <dd><a href="#">Making Payment</a></dd>
            <dd><a href="#">Delivery Options</a></dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-content clearfix">
        <div class="left">
          ©2006-2017 dealsbank.com All rights reserved.
        </div>
        <div class="right">
          Privacy Policy   ●  Terms of Service   ●  Interest-Based Ads
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
    .footer-top {
      
      height: 22.22rem;
      background: #31393f;
      .footer-logo {
        height: 6.6rem;
        line-height: 7.8rem;
        border-bottom: 1px solid #4d5459;
        img {
          display: inline-block;
        }
      }
      .footer-details {
        //ie9 不兼容
        // display: flex;
        // justify-content: space-between;
        margin-top: -8px;
        width: 54rem;
        color: white;
        dl {
          font-family: Arial, Helvetica, sans-serif;
          margin: 0;
          font-size: 1rem;
          width: 12.5rem;
          margin-right: 1.4rem;
          float: left;
          &.last {
            width: 11rem;
            margin-right: 0rem;
          }
          dt {
            margin: 1.5rem 0 1.5rem;
          }
          dd {
            font-size: 0.78rem;
            margin: 0 0 1.5rem 0 ;
            a {
              animation-delay: 1s;
              color: white;
              &:hover {
              color: #a8a9aa;
              }
            }
            
          }
        }
      }
    }
    .footer-bottom {
      font-size: 0.8rem;
      color: #a8a9aa;
      height: 2rem;
      background: #1a2227;
      line-height: 2rem;
      .left {
        .fl;
      }
      .right {
        .fr;
      }
    }
    .footer-content {
      width: 50rem;
      margin: 0 auto;
    }
  }
 
</style>

