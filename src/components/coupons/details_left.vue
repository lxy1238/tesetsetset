<template>
  <div class="details-left"  :class="{fixed: isTop}" >
      <div class="content" id="content">
        <div class="img">
          <div class="img-big">
            <a :href="userInfo.product_url" target="_blank">
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
          <div class="user" @click="gotouser" >
            <div class=" head inline-b">
              <img v-if="userInfo.avatar_img"  :src="userInfo.avatar_img" alt="">
              <img  v-else src="../../assets/user.png" alt="">
            </div>
            <div class=" details inline-b">
                <p>
                  <span class="name">{{userInfo.username}}</span>
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
export default {
  name: 'detailsLeft',
  data () {
    return {
      activeNum: 0,
      country_id: parseInt(getStore('country_id')) || 1
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
    imgLen () {
      return this.imgList.length
    }
  },
  methods: {
    //页面图片效果
    emitdata () {
      this.$emit('send', this.imgList[0])
    },
    //图片效果
    hover (i) {
      this.activeNum = i
      // this.emitdata(i)
    },
    pre () {
      if (this.activeNum === 0) {
        this.activeNum = this.imgLen - 1
      } else {
        this.activeNum--
      }
      // this.emitdata(this.activeNum)
    },
    next () {
      if (this.activeNum === this.imgLen - 1) {
        this.activeNum = 0
      } else {
        this.activeNum++
      }
      // this.emitdata(this.activeNum)
    },
    //跳转到商家或者红人发布优惠券的页面
    gotouser () {
      if ((this.$router.currentRoute.path).search('trialsDetails') >= 0) {
        return
      }
      this.$router.push({path: '/merchant/' + base64Encode(this.userInfo.user_id)})
    },
  }
}
</script>

<style lang="less" scoped>
.details-left {
  // position: fixed;
  float: left;
  width: 26.9rem;
  // height: 44.44rem;
  .img {
    height: 20rem;
    background: white;
    border-radius: 5px;
    margin-bottom: 1rem;
    .img-big {
      text-align: center;
      padding-top: 1rem;
      height: 14rem;
      img {
        width: 16rem;
        height: 14rem;
      }
    }
    .img-small {
      position: relative;
      height: 6.5rem;
      margin-top: 0.8rem;
      padding: 1.2rem 0 0 0;
      text-align: center;
      span {
        cursor: pointer;
        position: absolute;
        top: 1.5rem;
        transform: rotate(90deg);
        &.left {
          transform: rotate(-90deg);
          left: 1rem;
        }
        &.right {
          right: .5rem;
        }
        i {
          font-size: 2rem;
        }
      }
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
    cursor: pointer;
    p{
      position: relative;
      margin: .3rem 0 .5rem 0;
    }
    .head {
      width: 8rem;
      height: 7rem;
      line-height: 7rem;
      text-align: center;
      padding: 0.5rem 0;
      img {
        width: 6rem;
        height: 6rem;
        border-radius: 100%;
        border: 1px solid #f9f9f9;
      }
    }
    .details {
      position: absolute;
      top: 0;
      height: 7rem;
      color: #808080;
      .name {
        font-size: 1.3rem;
        font-weight: bold;
        color: black;
      }
      .tag {
        position: relative;
        top: -0.2rem;
        left: 1rem;
        font-size: 0.61rem;
        background: #ec5d1c;
        color: white;
        padding: .2rem;
        display: inline-block;
        margin-top: 1rem;
      }
      .join {
        margin-top: .5rem;
        
        span {
           font-size: 12px;
           float: left;
           margin-bottom: 1px;
           margin-top: .5rem;
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
