<template>
  <div class="enter-s">
    <div class="generalize-banner">
        推广Banner
    </div>

    <div class="enter-invite">
      <div class="invite-content">
        <div class="content-title">
          invite friends
        </div>
        <div class="invite-way">
          <span class="left">One way to invite: </span>
          <span class="right">Enter your invitation ID when your friend signs up to receive a bonus</span>
        </div>
        <div class="link-box">
         <span>Exclusive invitation link:</span>  <a id="inviteLink" href="#">http://laqu.com/user-spokesman-index?inviteCode=5FSNJYLVA</a>
         <el-button type="primary" data-clipboard-target="#inviteLink" @click="copy($event)">copy</el-button>
        </div>
      </div>
     
    </div>
    
  </div>
</template>

<script>
import Clip from "@/utils/clipboard.js";
export default {
  name: 'enter_s',
  data () {
    return {

    }
  },
  mounted () {

  },
  computed: {

  },
  methods: {
    copy (e) {
      Clip(e)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../styles/mixin.less');
  .enter-s {
    height: 1000px;
    .generalize-banner {
      min-width: 1000px;
      height: 255px;
      border: 1px solid red;
      text-align: center;
      line-height: 255px;
    }
    .invite-content {
      width: 1000px;
      margin: 0 auto;
      text-align: center;
      .content-title {
        margin-top: 20px;
        margin-bottom: 30px;
        font-size: 24px;
      }
      .invite-way {
        margin-bottom: 15px;
        text-align: left;
        .left {
          font-size: 20px;
        }
        .right {
          font-size: 14px;
        }
      }
      .link-box {
        font-size: 20px;
        text-align: left;
        padding-left: 10px;
        height: 60px;
        line-height: 60px;
        border: 1px solid black;
      }
    }
  }
</style>
