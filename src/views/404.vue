<template>
  <div class="not-found" v-title="'not found'">
    <img class="not-found-img" src="../assets/404.png" alt="404"/>
    <div class="text">
      <span>ERROR !</span> <el-button type="info" ><router-link to="/">Home</router-link></el-button>
    </div>
    <div class="footer-text">Sorry, the webpage you're visiting does not exist</div>
  </div>
</template>
<script>
export default {
  name: 'notFound',
}
</script>

<style lang="less" scoped>
  .not-found {
    width: 1000px;
    margin: 200px auto;
    height: 600px;
    .not-found-img {
      margin-left: 250px;
    }
    .text, .footer-text {
      text-align: center;
    }
    .text {
      a {
        color: white;
      }
      span {
        display: inline-block;
        position: relative;
        top: 3px;
        color: #660265;
        font-size: 28px;
        font-weight: bold;
        margin-right: 20px;
      }
    }
    .footer-text {
      margin-top: 20px;
      font-size: 20px;
      color: black;
      font-weight: bold;
    }
  }
</style>
