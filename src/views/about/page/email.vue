<template>
  <div class="about-center" v-title="titleMsg">
    <div class="about-page">
      <div class="about-content">
        <div class="head-crumbs"  >
            <span class=" gray-s">Home > Email Verified</span> 
        </div>
        <div class="card">
          <div class="card-content">
           <activate-email></activate-email>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import activateEmail from '../../another/activate/index'
export default {
  name: 'about_email',
  data () {
    return {
      titleMsg: 'Email Verified'
    }
  },
  components: {
    activateEmail
  },
  mounted () {    //钩子函数，等于vue1.0中的ready
   
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
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
</style>
