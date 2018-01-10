<template>
  <div  class="coupons-product" ref="imgLoad" @click.stop="goToCouponsPage(couponsDetails.id)"   >
    <div class="expried" v-if="couponsDetails.run_status === 'expired' || couponsDetails.valid_date < (Date.now() / 1000)">EXPRIED</div>
    <div class="img" @click.stop="goToCouponsPage(couponsDetails.id)" :title="couponsDetails.product_title">
      <img class="product-img" v-show="loading"  :data-img="couponsDetails.product_img.split(',')[0]" @load="loadImg"  alt="img">
      <img v-if="!loading" src="../../assets/timg.gif"   alt="img">
    </div>
    <slot name="white"></slot>
    <div class="promo-copy-parent"  v-if="addpromo">
     <div class="promo-copy">
        <div class="span-btn" @click.stop="addPromotion(couponsDetails.id)" v-if="isAddPromo === 0">
          <span>Add Promotion</span>
        </div>
         <!-- <div class="span-btn" v-else-if="isAddPromo === 1">
          <span>Running ...</span>
        </div> -->
         <div class="span-btn active" @click.stop="removePromo(couponsDetails.id)" v-else>
          <span>Cancel <i class="el-icon-check"></i></span>
        </div>
        <div class="line"></div>
        <el-tooltip placement="right">
          <div slot="content" class="copy-content" :id="productDetails">
            <img  class="copy-img" :src="couponsDetails.current_img" />
            <div class="content-line ">{{couponsDetails.product_title}}</div>
            <div class="content-line">Only ***{{currency}} {{couponsDetails.discount_price}}*** after using coupons. </div>
            <div class="content-line">Get {{currency}}{{sub(couponsDetails.product_price,couponsDetails.discount_price)}} coupons: {{dealsbankUrl}}</div>
            <div class="content-line">Order now: {{gotoAmazonUrl}}</div>
            <div class="content-line">{{couponsDetails.product_reason}}</div>
          </div>
          <div class="span-btn" :data-clipboard-target="productDetails1" @click.stop="copy($event)">Copy</div>
        </el-tooltip>
      </div>
     </div> 
      <p class="platfrom content"  :title="couponsDetails.product_title">{{couponsDetails.website}}</p>
      <div class="descript" :title="couponsDetails.product_title">{{couponsDetails.product_title}}</div>
      <slot name="price"></slot>
      <div class="content viewcoupons" :title="couponsDetails.product_title">
        <button class="btn-coupons" @click="goToCouponsPage(couponsDetails.id)">
          <slot name="btn"></slot>
        </button>
      </div>
  </div>
</template>

<script>
import { getToken, getUserId } from '@/utils/auth'
import { getStore } from '@/utils/utils'
import { base64Encode } from '@/utils/randomString'
import { mapGetters } from 'vuex'
import Clip from '@/utils/clipboard.js'
import { NumSub } from '@/utils/calculate'
export default {
  name: 'image_product',
  data () {
    return {
      loading: false,
      isAddPromo: 0,
      country_id: parseInt(getStore('country_id')) || 1,
      addPromoRequestData: {
        api_token: getToken(),
        country_id: getStore('country_id') || 1,
        user_id: getUserId(),
        coupon_id: ''
      }
    }
  },
  props: {
    couponsDetails: {
      type: Object
    },
    addpromo: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    ...mapGetters([
      'promotions'
    ]),
    productDetails () {
      return 'productDetails' + this.couponsDetails.id
    },
    productDetails1 () {
      return '#' + this.productDetails 
    },
    currency () {
      return getStore('currency') || '$'
    },

    //跳转到dealsbank链接
    dealsbankUrl () {
      return location.host + '/coupons/' + base64Encode(this.couponsDetails.id) + '/' + base64Encode(this.country_id) +  (getUserId() ? '?promoter=' + getUserId() : '')
    },

    //跳转到 goto amazon 链接页面
    gotoAmazonUrl () {
      return location.host + '/goto/' + base64Encode(this.couponsDetails.id) + '/' + base64Encode(this.country_id) + '/' +base64Encode(getUserId() ?  getUserId() : '')
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    window.onscroll = null
  },
  watch: {
    //判断是否加入推广, 值从父组件传递过来的时候执行函数，否则会不执行
    promotions () {
      if (this.promotions.includes(this.couponsDetails.id)) {
        this.isAddPromo = 1
        return
      } 
      this.isAddPromo = 0
    },
  },
  methods: {
    init () {
      this.initData()
      this.imgLoad()
    },
    initData () {
      this.addPromoRequestData.coupon_id = this.couponsDetails.id
      if (this.promotions.includes(this.couponsDetails.id)) {
        this.isAddPromo = 1
      }
    },
    loadImg () {
      this.loading = true
    },
    //首页图片懒加载
    imgLoad () {
      setTimeout(() => {
        let card = this.$refs.imgLoad
        let img = card.getElementsByClassName('product-img')[0]
        let cardTop = card.offsetTop
        if (cardTop < 900) {
          img.src = img.getAttribute('data-img')
        } 
        window.onscroll = () => {
          let cards = document.getElementsByClassName('coupons-product')
          let arr = Array.prototype.slice.call(cards)
          let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
          arr.forEach(element => {
            let cardTop = element.offsetTop - scrollTop
            let img = element.getElementsByClassName('product-img')[0]
            if (cardTop < 900) {
              img.src = img.getAttribute('data-img')
            }
          })
        }
      })
    },
    //跳转到详情也，携带coupon_id ,user_id
    goToCouponsPage (id) {
      this.$emit('gotodetails', id)
    },

    //判断数据是否存在
    isDataExit () {
      if (!this.addPromoRequestData.api_token) {
        this.addPromoRequestData.api_token = getToken()
        this.addPromoRequestData.user_id = getUserId()
        this.addPromoRequestData.country_id = parseInt(getStore('country_id')) || 1
      }
    },

    //加入 移除  推广
    addPromotion () {
      if (!getToken()) {
        return
      }
      this.isDataExit()
      this.$api.promotionAddCoupon(this.addPromoRequestData)
        .then(() => {
          this.isAddPromo = 1
          this.promotions.push(this.couponsDetails.id)
          this.$store.commit('SET_PROMOTIONS', this.promotions)
        })
        .catch(error => {
          console.log(error + 'promotionaddcoupon')
        })
    },
    removePromo () {
      this.isDataExit()
      this.$api.promotionUserRemove(this.addPromoRequestData)
        .then(() => {
          this.isAddPromo = 0
          this.ArrayRemove(this.promotions, this.couponsDetails.id)
          this.$store.commit('SET_PROMOTIONS', this.promotions)
        })
        .catch(error => {
          console.log(error + 'promotionaddcoupon')
        })
    },
    //数组移除元素
    ArrayRemove (arr, val) {
      let index = arr.indexOf(val)
      if (index > -1) {
        arr.splice(index, 1)
      }
    },
    copy (e) {
      Clip(e)
    },
    sub (a, b) {
      return NumSub(a, b)
    }
  },
 
 
}
</script>

<style lang="less" >
@import url("../../styles/mixin.less");
.coupons-product {
  .p(r);
  display: inline-block;
  overflow: hidden;
  width: 240px;
  cursor: pointer;
  padding-bottom: 10px;
  background: white;
  border-radius: 4px;
  margin: 0 0.5rem 10px 0;
  z-index: 1;
  border-color: #c7c7c7;
  border-style: solid;
  border-width: 1px 1px 3px 1px;
  border-radius: 4px;
  &:hover {
    border-color:#adadad;
    .promo-copy {
      transform: translateY(-4px);
    }
  }
  .expried {
    position: absolute;
    font-size: 0.78rem;
    width: 242px;
    height: 30px;
    line-height: 30px;
    background: #c4c4c4;
    color: white;
    transform: rotate(-45deg) translateX(-30%) translateY(-217%);
    opacity: 0.8;
    text-align: center;
  }
  .content {
    margin: 10px 0 0 10px;
    color: rgb(137, 137, 137);
    .old {
      text-decoration: line-through;
      margin-right: 5px;
    }
    .coupon-right {
      color: #1a1a1a;
      margin-left: 5px;
    }
    .price-left {
      margin-right: 10px;
      font-size: 12px;
      float: left;
      color: #1a1a1a;
     
      i {
        color: rgb(137, 137, 137);
      }
    }
    .price-right-bottom {
      
      float: right;
      margin-right: 10px;
      color: #1a1a1a;
      i {
        color: rgb(137, 137, 137);
      }
    }
    .price-right {
      color: #333 !important;
      font-size: 18px !important;
      max-width: 65%;
      font-weight: 700;
    }
    .com-right {
      margin-left: 10px;
      font-size: 0.88rem;
      color: red;
    }
  }
  .img {
    position: relative;
    cursor: pointer;
    text-align: center;
    width: 96%;
    margin: 0 auto;
    height: 190px;
    text-align: center;
    padding-top: 10px;
    img {
      display: inline-block;
      margin-top: 15px;
      max-width: 180px;
      max-height: 180px;
      position: absolute;
      display: block;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      z-index: -1;
    }
  }
  .white-trials {
    width: 100%;
    height: 15px;
  }
  
  .promo-copy-parent {
    .p(a);
    overflow: hidden;
    width: 100%;
    top: 160px;
    height: 36px;
  }
  .promo-copy {
    .p(a);
    font-size: 12px;
    width: 100%;
    height: 36px;
    overflow: hidden;
    line-height: 36px;
    transform: translateY(36px);
    margin-top: 0.5rem;
    background: #bfbfbf;
    transition: all 0.2s ease 0.2s;
    .span-btn {
      float: left;
      font-size: 10px;
      width: 50%;
      text-align: center;
      background: #bfbfbf;
      color: rgb(255, 255, 255);
      cursor: pointer;
      &:hover {
        background: darken(#bfbfbf, 10%);
      }
      &.active {
        background: darken(#bfbfbf, 10%);
      }
    }
    .line {
      .p(a);
      width: 1px;
      height: 30px;
      background: white;
      top: 3px;
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
    height: 31px;
    font-family: arial, sans-serif;
    overflow: hidden; /*内容超出后隐藏*/
    // text-overflow: ellipsis;/* 超出内容显示为省略号*/
    // white-space: nowrap;/*文本不进行换行*/
    // margin-top: 0.5rem;
    margin-top: 5px;
    line-height: 1.21;
    padding: 0 10px 0 10px;
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
    margin-top: 15px;
    margin-right: 10px;
    .btn-coupons {
      .btn-h(100%, 2rem);
      line-height: 0.3;
      font-size: 15px;
      background: #eee;
      border: 1px solid #ccc;
      font-weight: bold;
      color: #666 !important;
      &:hover {
        background: #c9caca;
      }
      &:active {
        background: darken(#c9caca, 16%);
      }
    }
  }
  &.last {
    margin-right: 0;
  }
}

.copy-content {
  width: 300px;
  font-size: 14px;
  .copy-img {
    display: block;
    width: 100px;
    height: 100px;
  }
  .content-line {
    margin-bottom: 5px;
  }
}
</style>



