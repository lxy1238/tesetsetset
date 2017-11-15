<template>
  <div  class="coupons-product" >
    <div class="img" @click.stop="goToCouponsPage(couponsDetails.id)">
      <img v-if="!loading" src="../../assets/timg.gif" >
      <img v-show="loading" :src="couponsDetails.imgUrl" @load="loadImg($event, couponsDetails)"  alt="img">
    </div>
     <div class="promo-copy" v-if="addpromo">
        <div class="span-btn" @click="addPromo">
          <span>{{addPromoMsg}}</span>
        </div>
        <div class="line"></div>
        <div class="span-btn" @click="copy">Copy</div>
      </div>
      <p class="platfrom content" >{{couponsDetails.platfrom}}</p>
      <p class="descript content" :title="couponsDetails.descript">{{couponsDetails.descript}}</p>
      <!-- <p class="price content">{{couponsDetails.price}}</p>
      <p class="coupons content">
        <span><i class="gray-s">Coupons</i> <strong>{{couponsDetails.coupons}}</strong></span>
        <span class="coupon-right"><strong>35%</strong> <i class="gray-s">off</i> </span>
      </p> -->
      <slot name="price"></slot>
      <div class="content viewcoupons">
        <button class="btn-coupons" @click="goToCouponsPage(couponsDetails.id)">
          <slot name="btn"></slot>
        </button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'image_product',
  data () {
    return {
      loading: false,
      addPromoMsg: "Add Promo",
      runningMsg: 'Running . . .'
    }
  },
  props: {
    couponsDetails: {
      type: Object,
      default: function () {
        return {
          id: 1,
          imgUrl: 'http://www.ghostxy.top/dealsbank/img/01.png',
          platfrom: 'amazon2',
          descript: 'STATE Geo Mesh CoidGeoMesh Cold Shoulder Shift Dress ',
          price: '$98.00',
          coupons: '$15.00',
        }
      }
    },
    addpromo: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    goToCouponsPage (id) {
      this.$store.dispatch('setProductId', id)
      this.$emit('gotodetails', id)
    },
    loadImg (e, data) {
      this.loading = true
    },
    addPromo () {
      if (this.addPromoMsg == 'Add Promo') {
        this.addPromoMsg = this.runningMsg
        setTimeout( () => {
        this.addPromoMsg = 'Cancel Promo'
        }, 500)
      } else {
        this.addPromoMsg = this.runningMsg
        setTimeout( () => {
        this.addPromoMsg = 'Add Promo'
        }, 500)
      }
     
    },
    copy () {

    }
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
      margin-top: 5px;
    }
    .img {
      cursor: pointer;
      text-align: center;
      img {
        display: inline-block;
        margin-top: 10px;
        width: 80%;
        height: 40%;
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
        display: inline-block;
        font-size: 13px;
        width: 49.2%;
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
      color: rgb(26, 26, 26);
      // font-weight: bold;
      // margin-top: 0.3rem;
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



