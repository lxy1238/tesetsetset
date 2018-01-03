<template>
  <div class="member-center">
    <h3 class="title">
        Profile Overview
    </h3>
    <div class="center-content">
      <div class="title-sm">
        About Me
      </div>
      <div class="about-me">
        <div class="avatar">
          <img v-if="userData.base.avatar_img" class="avatar-img" :src="userData.base.avatar_img" alt="">
          <img v-else src="../../../assets/user.png" class="avatar-img" />
        </div>
        <div class="personal-info">
          <div class="name-level">
            <span class="name">{{username}}</span>
            <span class="level reds-color" v-if="roles[0] == 'celebrity'">Influencer</span>
            <span class="level merchant-color" v-if="roles[0] == 'merchant'">Merchant</span>
          </div>
          <div class="icon-info">
            <span><i class="iconfont icon-riqi1"> </i> Joined {{userData.joined_date}}</span>
            <span><i class="iconfont icon-level-2"> </i> Level{{userData.base.level}}</span>
            <span><i class="iconfont icon-jifenqianbi"> </i> Points: {{userData.base.score}}</span>
          </div>
          <div class="footer">
            <div v-if="userData.base.introduce">{{userData.base.introduce}} </div>
             <!-- <div> Find this site interesting, <a href="javascript:void(0);" @click="gotoInvite">Invite Friends</a> to join.</div> -->
          </div>
        </div>
      </div>
      <div class="title-sm">
        My Statistics
      </div>
      <div class="statistics clearfix">
        <div class="statistics-child"  v-if="roles[0] == 'celebrity' || roles[0] == 'merchant' ">
          <span class="count link" @click="gotoAnotherRouter('/posted/coupons', userData.account.coupon_posteds)">{{userData.account.coupon_posteds}}</span>
          <p>Coupons posted</p>
        </div>
        <div class="statistics-child" v-if="roles[0] == 'merchant'">
          <span class="count link"  @click="gotoAnotherRouter('/posted/trials', userData.account.trial_posteds)" >{{userData.account.trial_posteds}}</span>
          <p>Trials posted</p>
        </div>
        <div class="statistics-child">
          <span class="count link"  @click="gotoAnotherRouter('/personal/my-coupons/index', userData.account.coupons)">{{userData.account.coupons}}</span>
          <p>My Coupons</p>
        </div>
        <div class="statistics-child">
          <span class="count link"  @click="gotoAnotherRouter('/personal/my-trials/index', userData.account.trials)">{{userData.account.trials}}</span>
          <p>My Trials</p>
        </div>
        <div class="statistics-child last">
          <span class="count link"  @click="gotoAnotherRouter('/personal/promotion/index', userData.account.promotions)">{{userData.account.promotions}}</span>
          <p>My Promotions</p>
        </div>
        <!-- <div class="statistics-child last">
          <span class="count invite-friends">{{userData.account.invite_friends}}</span>
          <p>Invite friends</p>
        </div>
         -->
      </div>
      <div class="title-sm">
        My Wallet
      </div>
      <div class="center-wallet">
        <div class="withdraw wallet">
          <div class="wallet-child">
            <span class="money" v-if="userData.account">{{currency}}{{userData.account.amount}}</span>
            <p>Balance</p>
          </div>
          <div class="money-btn">
            <button  @click="gotoAnotherRouter('/wallet/withdraw')"><i class="iconfont icon-quqian"></i> Withdraw</button>
          </div>
        </div>
        <div class="recharge wallet" v-if="roles[0] == 'merchant'">
          <div class="wallet-child">
            <span class="money">{{currency}}{{userData.account.security_deposit}}</span>
            <p>Security deposit</p>
          </div>
          <div class="money-btn">
            <button @click="gotoAnotherRouter('/wallet/recharge')"><i class="iconfont icon-cunqian"></i> Recharge</button>
          </div>
        </div>
      </div>
    </div>   
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken, getUserId } from '@/utils/auth'
import { getStore } from '@/utils/utils'
import { timestampFormat } from '@/utils/date'
export default {
  name: 'member_center',
  data () {
    return {
      userData: {
        account: {},
        base: {},
        joined_date: ''
      },
      getInfoRequest: {
        api_token: getToken(),
        user_id: getUserId(),
        country_id: getStore('country_id') || 1
      }
    }
  },
  computed: {
    ...mapGetters(['username', 'token', 'roles', 'user_id', 'userAccount', 'userBase', 'joined_date']),
    currency () {
      return getStore('currency') || '$'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.infoUpdate()
      setTimeout(() => {
        this.$store.dispatch('GetInfo').then(() => {
          this.infoUpdate()
        })
      })
    },

    infoUpdate () {
      this.userData.account = this.userAccount
      this.userData.base = this.userBase
      this.userData.joined_date = timestampFormat(this.joined_date)
    },
    //路由跳转
    gotoAnotherRouter (url, account) {
      if (account === 0) {
        return
      }
      this.$router.push({ path: url })
    },

    //跳转到邀请好友页面
    gotoInvite () {
      this.$router.push({path:'/enter/invite' })
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../../../styles/mixin.less");
.member-center {
  .center-content {
    width: 90%;
  }
  .title {
    font-size: 1.5rem;
    margin: 0.7rem 0;
    font-weight: normal;
  }
  .title-sm {
    font-size: 1rem;
    line-height: 1.78rem;
    padding: 0.6rem 0;
    color: #333;
    border-bottom: 1px solid #e6e6e6;
  }
  .about-me {
    position: relative;
    height: 180px;
    padding: 27px 0;
    .avatar {
      position: absolute;
      top: 27px;
      .avatar-img {
        width: 110px;
        height: 110px;
        border-radius: 100%;
      }
    }
    .personal-info {
      margin-left: 146px;
      .name-level {
        padding: 1rem 0;
        .name {
          display: inline-block;
          font-size: 1.28rem;
          color: #1a1a1a;
          margin-right: 1rem;
        }
        .level {
          position: relative;
          top: -3px;
          font-size: 0.61rem;
          color: white;
          // background: #ec5d1c;
          padding: 2px 5px;
          border-radius: 2px;
        }
      }
      .icon-info {
        font-size: 0.78rem;
        color: #808080;
        margin-bottom: 1rem;
        span {
          display: inline-block;
          margin-right: 2rem;
        }
      }
      .footer {
        font-size: 0.78rem;
        color: #808080;
      }
    }
  }
  .statistics {
    // padding-left: 1.5rem;
    padding-top: 1rem;
    margin-bottom: 2rem;
    .statistics-child {
      p {
        margin: 0;
      }
      float: left;
      width: 9.17rem;
      text-align: center;
      border-right: 1px solid #e6e6e6;
      font-size: 0.78rem;
      color: #808080;
      &.last {
        border-right: none;
      }
      .count {
        display: inline-block;
        margin-bottom: 0.6rem;
        cursor: pointer;
        font-size: 1.22rem;
      }
    }
  }
  .center-wallet {
    padding-top: 1rem;
    .wallet {
      float: left;
      width: 50%;
      // border: 1px solid red;
      .money-btn {
        line-height: 3;
        button {
          position: relative;
          top: 2px;
          .btn-h(130px,40px,#83b93a,#83b93a,#fff);
          font-size: 14px;
          padding-left: 36px;
          &:active {
            background: darken(#83b93a, 10%);
            border: darken(#83b93a, 10%);
          }
        }
        .iconfont {
          position: absolute;
          left: 13%;
          top: 9px;
          font-size: 28px;
        }
      }
      .wallet-child {
        p {
          margin: 0;
        }
        float: left;
        width: 10.5rem;
        color: #808080;
        font-size: 13px;
        text-align: center;
        border-right: 1px solid #e6e6e6;
        margin-right: 3rem;
        .money {
          display: inline-block;
          margin-bottom: 10px;
          font-size: 18px;
          color: #333;
        }
      }
    }
  }
}
</style>
