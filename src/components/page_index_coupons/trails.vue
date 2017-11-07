<template>
  <div  class="coupons-product">
    <div class="img">
      <img :src="couponsDetails.imgUrl" alt="img">
    </div>
     <div class="promo-copy">
        <span>Add Promo</span>
        <div class="line"></div>
        <span>Copy</span>
      </div>
      <p class="platfrom content" >{{couponsDetails.platfrom}}</p>
      <p class="descript content" :title="couponsDetails.descript">{{couponsDetails.descript}}</p>
      <!-- <p class="price content">{{couponsDetails.price}}</p>
      <p class="coupons content">
        <span><i class="gray-s">Coupons</i> <strong>{{couponsDetails.coupons}}</strong></span>
        <span class="coupon-right"><strong>35%</strong> <i class="gray-s">off</i> </span>
      </p> -->
      <slot></slot>
      <div class="content viewcoupons">
        <button class="btn-coupons" @gotodetails="gotodetails">View Coupons</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'image_product',
  data () {
    return {
    }
  },
  props: {
    couponsDetails: {
      type: Object,
      default: function () {
        return {
          imgUrl: 'http://www.ghostxy.top/dealsbank/img/01.png',
          platfrom: 'amazon',
          descript: 'STATE Geo Mesh CoidGeoMesh Cold Shoulder Shift Dress ',
          price: '$98.00',
          coupons: '$15.00',
        }
      }
    }
  },
  methods: {
    gotodetails (id) {
      console.log(id)
      this.$router.push({ path: '/trialsDetails'})
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
    height: 400px;
    background: white;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    margin:0 0.5rem 0.5rem 0;
    z-index: 1;
    &:hover {
      .promo-copy {
        visibility: visible;
      }
    }
    .content {
      margin-left: 10px;
      margin-bottom: 0;
      margin-top: 0;
    }
    .img {
      text-align: center;
      img {
        display: inline-block;
        margin-top: 10px;
        width: 80%;
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
      span {
        display: inline-block;
        width: 49%;
        text-align: center;
        background: #bfbfbf;
        cursor: pointer;
        &:hover {
          background: darken(#bfbfbf, 10%);
        }
        &:active {
          //点击后的颜色
          // background: lighten(#bfbfbf, 10%);
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
      color: gray;
      font-size: 11px;
      font-style: italic;
      margin-top: 1rem;
    }
    .descript {
      font-size: 13px;
      color: black;
      height: 3rem;
      // overflow: hidden;/*内容超出后隐藏*/
      // text-overflow: ellipsis;/* 超出内容显示为省略号*/
      // white-space: nowrap;/*文本不进行换行*/
      margin-top: 1rem;
    }
    .price {
      font-size: 16px;
      font-weight: bold;
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



