<template>
  <div class="combine">
    <div class="header">
      <img src="../../assets/logo.png" alt="" @click="gotoindex">
    </div>
    <div class="content">
      <div class="card">
        <h3>Almost Finished!</h3>
        <div class="text1">Looks like you already have an account on DEALSBANK and this is
your first time signing in with your Google accou</div>
        <div class="text2">Do you want to link this Google account to this DEALSBANK account?</div>
        <div class="img">
          <img class="combine-img" src="../../assets/combine.png" alt="">
          <div class="img-l">
            <div class="avatar">
              <img class="head-p" src="../../assets/combine_06.png" alt="">
            </div>
            <div class="name">Name</div>
            <div class="email">33553215@qq.com</div>
          </div>
          <div class="img-l img-r">
            <div class="avatar">
              <img class="head-p" src="../../assets/combine_06.png" alt="">
            </div>
            <div class="name">Name</div>
            <div class="email">33553215@qq.com</div>
          </div>
        </div>
        <div class="btn"><button>Link These Accounts</button></div>
        <div class="footer"><a href="#">Nevermind,let’s try again.</a></div>
      </div>
    </div>
    <footer-self></footer-self>
  </div>
</template>

<script>
import footerSelf from '@/components/global/footer.vue'
export default {
  name: 'combine',
  components: {
    footerSelf
  },
  methods: {
    gotoindex () {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../styles/mixin.less');
.combine {
  .header {
    text-align: center;
    background: #31393f;
    height: 3rem;
    img {
      height: 3rem;
      cursor: pointer;
    }
    
  }
}
  .content {
    background: url('../../assets/background.png') repeat;
    height: 600px;
    padding-top: 40px;
    .card {
      width: 672px;
      height: 450px;
      text-align: center;
      background: white;
      border-radius: 5px;
      margin: 0 auto;
      padding-top: 20px;
      h3 {
        color: #1a1a1a;
        font-size: 26px;
      }
      .text1 {
        color: #808080;
        font-size: 13.25px;
        width: 400px;
        margin: 20px auto;
      }
      .text2 {
        
        color: #1a1a1a;
        font-size: 13.25px;
      }
      .img {
        position: relative;
        width: 500px;
        margin: 20px auto;
        height: 127px;
        .combine-img {
          position: absolute;
          top: 30%;
          left: 47%;
        }
        .img-l {
          float: left;
          text-align: center;
           width: 40%;
          height: 100%;
          background: #f1f1f1;
          .avatar {
            margin: 10px 0;
            .head-p {
              border-radius: 100%;
            }
          }
          .name {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .email {
            font-size: 14px;
          }
        }
        .img-r {
          float: right;
        }
      }
      .btn {
        margin-bottom: 20px;
        button {
          .btn-h(380px,40px);
          color: white;
          background: #7fbadf;
          border-color: #7fbadf;
          &:active {
            background: darken(#7fbadf, 10%);
            border-color: darken(#7fbadf, 10%);
          }
        }
      }
      .footer {
        color: #0072bc;
        font-size: 13.25px;
      }
    }
  }
</style>
