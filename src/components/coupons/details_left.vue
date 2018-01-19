<template>
  <div class="details-left"  :class="{fixed: isTop}" >
      <div class="content" id="content">
        <div class="img">
          <div class="img-big">
            <a @click="gotoCoupon" target="_blank">
              <img :src="imgList[activeNum]"  >
            </a>
          </div>
          <div class="img-small">
            <!-- <span class="left" @click="pre"> <i class="iconfont icon-huidaodingbu-copy "></i> </span> -->
            <img v-for="(item, index) in imgList" v-if="index <= 5" :src="item" alt="" @mouseover="hover(index)"  :class="{active: activeNum == index}">
            <!-- <span class="right" @click="next"> <i class="iconfont icon-huidaodingbu-copy"></i> </span> -->
          </div>
        </div>
        <template v-if="userInfo.username">
          <div class="user" >
            <div class=" head inline-b" >
              <img v-if="userInfo.avatar_img"  :src="userInfo.avatar_img" alt=""  @click="gotouser">
              <img  v-else src="../../assets/user.png" alt=""  @click="gotouser">
            </div>
            <div class=" details inline-b">
                <p>
                  <span class="name link"  @click="gotouser">{{userInfo.username}}</span>
                  <span class="tag" v-if="userInfo.type == 'celebrity'">Influencer</span>
                  <span class="tag" v-if="userInfo.type == 'merchant'">Merchant</span>
                </p>
                <p class="join">
                  <span><i class="iconfont icon-date"></i> Joined {{userInfo.joined_date}}</span>
                  <span class="level"><i class="iconfont icon-huiyuandengji0101"> </i> Level{{userInfo.level}}</span>
                </p>
                <p class="coupons-posted">
                  <span ><i class="iconfont icon-youhuiquan1"></i> {{userInfo.coupon_posteds}} Coupons Posted</span>
                </p>
            </div>
          </div>
        </template>
      </div>
  </div>
</template>

<script>
import { base64Encode } from '@/utils/randomString'
import { getStore }  from '@/utils/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'detailsLeft',
  data () {
    return {
      activeNum: 0,
      country_id: parseInt(getStore('country_id')) || 1,
    }
  },
  props: {
    isTop: {
      type: Boolean,
      default: true
    },
    imgList: {
      default: function () {
        return [
        ]
      }
    },
    userInfo: {
      type: Object,
      default: function () {
        return {
        }
      }
    }
  },
  mounted () {
    this.activeNum = 0
    
  },
  computed: {
    ...mapGetters([
      'currentRouter'
    ]),
  },
  methods: {
   
    //图片效果
    hover (i) {
      this.activeNum = i
    },
    //跳转到商家或者红人发布优惠券的页面
    gotouser () {
      this.$router.push({path: '/merchant/' + base64Encode(this.userInfo.user_id)})
    },

    gotoCoupon () {
      if ((this.$router.currentRoute.path).search('trialsDetails') >= 0) {
        return
      }
      let router = this.currentRouter.replace('/coupons', '')
      window.open('/goto/product/coupon' + router)
    }
  }
}
</script>

<style lang="less" scoped>
.details-left {
  float: left;
  width: 26.9rem;
  .img {
    background: white;
    border-radius: 5px;
    margin-bottom: 1rem;
    border: 1px solid #d2d2d2;
    .img-big {
      text-align: center;
      width: 22.22rem;
      height: 22.22rem;
      margin: 0 auto;
      padding-top: 1rem;
      position: relative;
      img {
        max-width: 100%;
        max-height: 95%;
        position: absolute;
        display: block;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
      }
    }
    .img-small {
      position: relative;
      height: 6.5rem;
      margin-top: 0.8rem;
      padding: 1.2rem 0 0 0;
      text-align: center;
      img {
        width: 3rem;
        height: 3rem;
        border: 1px solid #e1e1e1;
        padding: 0.3rem;
        margin: 0 0 0 0.8rem;
        cursor: pointer;
        &.active {
          border: 1px solid red;
        }
      }
    }
  }
  .user {
    position: relative;
    height: 7rem;
    background: white;
    margin-top: 0.4rem;
    border-radius: 5px;
    border: 1px solid #d2d2d2;
    p{
      position: relative;
      margin: .3rem 0 .5rem 0;
    }
    .head {
      width: 8rem;
      height: 7rem;
      line-height: 7rem;
      text-align: center;
      padding: 1.3rem 0;
      img {
        width: 4rem;
        height: 4rem;
        border-radius: 100%;
        border: 1px solid #f9f9f9;
        cursor: pointer;
      }
    }
    .details {
      position: absolute;
      top: 0;
      height: 7rem;
      color: #808080;
      .name {
        font-size: 18px;
        font-weight: bold;
        color: black;
        cursor: pointer;
        &:hover {
          color: #0072bc;
          text-decoration: underline;
        }
      }
      .tag {
        position: relative;
        top: -0.1rem;
        left: .5rem;
        font-size: 12px;
        background: #ec5d1c;
        border-radius: 4px;
        color: white;
        padding: .2rem;
        display: inline-block;
        margin-top: 1rem;
      }
      .join {
        
        span {
           font-size: 12px;
           float: left;
           margin-bottom: 1px;
           width: 12rem;
        }
        .level {
          width: 6rem;
        }
      }
      .coupons-posted {
        
        span {
          font-size: 12px;
          float: left;
          width: 15rem;
        }
        
      }
    }
  }
}
</style>
