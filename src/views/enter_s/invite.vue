<template>
  <div class="enter-s">
      <div class="invite-content">
        <div class="content-title">
          Invite friends to earn commissions
        </div>
        <div class="link-box">
           <p>Exclusive invitation link:</p>
           <div class="link">
             <a id="inviteLink" href="javascript:void(0)">http://laqu.com/user-spokesman-index?inviteCode=5FSNJYLVA</a>
           </div>
           <div class="footer-btn-copy">
            <button type="primary" data-clipboard-target="#inviteLink" @click="copy($event)">copy</button>
           </div>
        </div>
      </div>
  </div>
</template>

<script>
import Clip from '@/utils/clipboard.js'
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
    padding-top: 200px;
    background-image: url('../../assets/invite_friend.png');
    .invite-content {
      width: 1000px;
      margin: 0 auto;
      text-align: center;
      .content-title {
        margin-top: 20px;
        margin-bottom: 30px;
        font-size: 60px;
        color: white;
      }
      .link-box {
        font-size: 20px;
        text-align: left;
        padding: 20px 18px 0 18px;
        height: 240px;
        background: rgba(0, 0, 0, 0.65);
        border-radius: 10px;
        line-height: 60px;
        border: 1px solid black;
        .link {
          height: 60px;
          background: #cad1d8;
          padding: 0 0 0 10px;
          border-radius: 5px;
          margin-top: 20px;
          a {
            color: black;
          }
        }
        p {
          margin: 0;
          height: 40px;
          color: white;
          font-size: 36px;
        }
        .footer-btn-copy {
          text-align: center;
          margin-top: 10px;
          button {
            .btn-h(212px, 52px, #12dd80, #12dd80, #000);
            border-radius: 20px;
            &:active {
              border-color: darken(#12dd80, 10%);
              background: darken(#12dd80, 10%);
            }
          }
        }
      }
    }
  }
</style>
