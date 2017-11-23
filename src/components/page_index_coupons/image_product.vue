<template>
  <div  class="coupons-product" >
    <div class="img" @click.stop="goToCouponsPage(couponsDetails.id, couponsDetails.user_id)">
      <!-- <img v-if="!loading" src="../../assets/timg.gif" > -->
      <img v-show="loading" :src="couponsDetails.product_img.split(',')[0]" @load="loadImg"   alt="img">
      <img v-if="!loading" src="http://www.ghostxy.top/dealsbank/img/01.png"   alt="img">
      <!-- <img v-if="loading" src="http://www.ghostxy.top/dealsbank/img/01.png"   alt="img"> -->
    </div>
     <div class="promo-copy" v-if="addpromo">
        <div class="span-btn" @click="addPromo(couponsDetails.id)">
          <span>{{addPromoMsg}}</span>
        </div>
        <div class="line"></div>
        <div class="span-btn" @click="copy">Copy</div>
      </div>
      <p class="platfrom content" >{{couponsDetails.website}}</p>
      <p class="descript content" :title="couponsDetails.product_title">{{couponsDetails.product_title}}</p>
      <slot name="price"></slot>
      <div class="content viewcoupons">
        <button class="btn-coupons" @click="goToCouponsPage(couponsDetails.id, couponsDetails.user_id)">
          <slot name="btn"></slot>
        </button>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { promotionAddCoupon, promotionUserRemove } from '@/api/login'
export default {
  name: 'image_product',
  data () {
    return {
      loading: false,
      addPromoMsg: "Add Promo",
      runningMsg: 'Running . . .',
      addPromoRequestData: {
        'api_token': getToken(),
        'user_id': '',
        'coupon_id': '',
      }
    }
  },
  props: {
    couponsDetails: {
      type: Object,
    },
    addpromo: {
      type: Boolean,
      default: true
    },
    promotions: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    //跳转到详情也，携带coupon_id ,user_id
    goToCouponsPage (id, user_id) {
      this.$emit('gotodetails', id, user_id)
    },
    loadImg () {
      this.loading = true
    },

    //加入 移除  推广
    addPromo (coupon_id) {
      this.addPromoRequestData.coupon_id = coupon_id
      if (this.addPromoMsg == 'Add Promo') {
        this.addPromoMsg = this.runningMsg
        promotionAddCoupon(this.addPromoRequestData).then(res => {
          if (res.code === 500) {
            this.addPromoMsg = 'Add Promo'
            return 
          }
          this.addPromoMsg = 'Cancel Promo'
        }).catch(error => {
          console.log(error + 'promotionaddcoupon')
        })
      } else {
        this.addPromoMsg = this.runningMsg
        promotionUserRemove(this.addPromoRequestData).then(res => {
          this.addPromoMsg = 'Add Promo'
        }).catch(error => {
          console.log(error + 'promotionaddcoupon')
        })
      }
     
    },
    copy () {

    }
  },
  computed: {
    ...mapGetters([
      'token',
      'user_id'
    ])
  },
  mounted () {
    this.addPromoRequestData.user_id = this.user_id
    setTimeout(() => {
      if(this.promotions.indexOf(this.couponsDetails.id) >= 0) {
        this.addPromoMsg = 'Cancel Promo'
      }
    }, 10)
  }
}
</script>

<style lang="less" scoped>
@import url('../../styles/mixin.less');
  .coupons-product {
    .p(r);
    display: inline-block;
    width: 240px;
    height: 380px;
    background: white;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    margin:0 0.5rem 20px 0;
    z-index: 1;
    &:hover {
      .promo-copy {
        visibility: visible;
      }
    }
    .content {
      margin-left: 10px;
      margin-bottom: 0;
      margin-top: 2px;
      color: rgb(137, 137, 137);
      .price-left {
        margin-right: 10px;
        text-decoration: line-through;
      }
      .price-right {
        color: #1a1a1a;
        font-size: 0.88rem;
      }
      .com-right {
        margin-left: 10px;
        font-size: 0.88rem;
        color: red;
      }
    }
    .img {
      cursor: pointer;
      text-align: center;
      img {
        display: inline-block;
        margin-top: 10px;
        width: 80%;
        height: 150px;
      }
    }
    .promo-copy {
      .p(r);
      font-size: 12px;
      width: 100%;
      height: 2rem;
      line-height: 2rem;
      margin-top: 0.5rem;
      background: #bfbfbf;
      visibility: hidden;
      .span-btn {
        float: left;
        font-size: 13px;
        width: 50%;
        text-align: center;
        background: #bfbfbf;
        color: rgb(255, 255, 255);
        cursor: pointer;
        &:hover {
          background: darken(#bfbfbf, 10%);
        }
      }
      .line {
        .p(a);
        width: 1px;
        height: 1rem;
        background: white;
        top: 0.5rem;
        left: 50%;
      }
    }
    .platfrom {
      text-align: left;
      color: rgb(137, 137, 137);
      font-size: 11px;
      font-style: italic;
      margin-top: 0.5rem;
    }
    .descript {
      font-size: 13px;
      color: rgb(51, 51, 51);
      height: 2.2rem;
      overflow: hidden;/*内容超出后隐藏*/
      // text-overflow: ellipsis;/* 超出内容显示为省略号*/
      // white-space: nowrap;/*文本不进行换行*/
      margin-top: 0.5rem;
      margin-bottom: .5rem;
    }
    .price {
      font-size: 15px;
    }
    .coupons {
      font-size: 10px;
      margin-right: 10px;
      // margin-top: 1rem;
      .coupon-right {
        float: right;
      }
    }
    .viewcoupons {
      margin-top: 10px;
      margin-right: 10px;
      .btn-coupons {
        .btn-h;
        width: 100%;
        height: 2rem;
        line-height: 0.3;
        font-size: 15px;
        background: #eee;
        font-weight: bold;
        &:hover {
          background: #c9caca;
        }
        &:active {
          background: darken(#c9caca, 16%)
        }
        
      }
    }
    &.last {
      margin-right: 0;
    }
  }
</style>



