<template>
  <div class="details-left"  :class="{fixed: isTop}" >
      <div class="content" id="content">
        <div class="img">
          <div class="img-big">
            <img :src="imgList[activeNum]" >
          </div>
          <div class="img-small">
            <span class="left" @click="pre"> <i class="iconfont icon-huidaodingbu-copy "></i> </span>
            <img v-for="(item, index) in imgList" v-if="index <= 5" :src="item" alt="" @mouseover="hover(index)"  :class="{active: activeNum == index}">
            <span class="right" @click="next"> <i class="iconfont icon-huidaodingbu-copy"></i> </span>
          </div>
        </div>
        <div class="user" @click="gotouser">
          <div class=" head inline-b">
            <img src="http://www.ghostxy.top/dealsbank/img/01.png" alt="">
          </div>
          <div class=" details inline-b">
              <p>
                <span class="name">Nickname</span>
                <span class="tag">Influencer</span>
              </p>
              <p class="join">
                <span><i class="iconfont icon-date"></i> Joined Dec 2015</span>
                <span><i class="iconfont icon-huiyuandengji0101"> </i> L4: APPrenlice</span>
              </p>
              <p class="coupons-posted">
                 <span><i class="iconfont icon-youhuiquan1"></i> 35 Coupons Posted</span>
                <span><i class="iconfont icon-time"> </i> Posted 09-19-2017 05:39 PM</span>
              </p>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "detailsLeft",
  data() {
    return {
      imgList: [
        "http://www.ghostxy.top/dealsbank/img/01.png",
        "http://www.ghostxy.top/dealsbank/img/02.png",
        "http://www.ghostxy.top/dealsbank/img/03.png",
        "http://www.ghostxy.top/dealsbank/img/04.png",
        "http://www.ghostxy.top/dealsbank/img/05.png",
        // "http://www.ghostxy.top/dealsbank/img/05.png",
      ],
      activeNum: 0
    };
  },
  props: {
    isTop: {
      type: Boolean,
      default: true
    },
    imgLists: {
      type: Array
    }
  },
  mounted() {
   
  },
  computed: {
    imgLen() {
      return this.imgList.length;
    }
  },
  methods: {
    emitdata (index) {
      this.$emit('send', this.imgList[index])
      // this.$root.eventHub.$emit('sendImg', this.imgList[index])  非父子组件之前的数据传递方式
    },
    hover (i) {
      this.activeNum = i
      this.emitdata(i)
    },
    pre () {
      if (this.activeNum === 0) {
        this.activeNum = this.imgLen - 1
      } else {
        this.activeNum--
      }
      this.emitdata(this.activeNum)
    },
    next () {
      if (this.activeNum === this.imgLen - 1) {
        this.activeNum = 0
      } else {
        this.activeNum++
      }
      this.emitdata(this.activeNum)
    },
    gotouser () {
      this.$router.push({path: '/merchant'})
    }
  }
};
</script>

<style lang="less" scoped>
.details-left {
  // position: fixed;
  float: left;
  width: 28.9rem;
  height: 44.44rem;
  .img {
    height: 22rem;
    background: white;
    border-radius: 5px;
    margin-bottom: 1rem;
    .img-big {
      text-align: center;
      padding-top: 2rem;
      height: 15rem;
      img {
        max-width: 10rem;
        max-height: 10rem;
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
          right: 1rem;
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
    height: 8.3rem;
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
           margin-bottom: .5rem;
           margin-top: .5rem;
           width: 10rem;
        }
      }
      .coupons-posted {
        
        span {
          font-size: 12px;
          float: left;
          width: 10rem;
        }
        
      }
    }
  }
}
</style>
