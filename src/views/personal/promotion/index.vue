<template>
  <div class="promotion clearfix">
    <div class="pro-header">
      <h3 class="title">promotion</h3>
      <div class="remove-all" @click="removeAll">
        <i class="el-icon-delete"></i>
        <span> Remove All</span>
      </div>
    </div>
    <div class="promotion-content clearfix ">
      <div class="pro-card" v-for="(n, index) in items">
        <div class="expried">EXPRIED</div>
        <img class="pro-img" src="http://www.ghostxy.top/dealsbank/img/01.png" alt="">
        <div class="plotform">amazon </div>
        <div class="pro-title" title="this is title">STATE Geo Mesh CoidGeoMesh Cold
          Shoulder Shift Dress </div>
        <div class="price-remove">
          <span>$98.00</span>
          <span class="remove">
            <i class="el-icon-delete"></i>
          </span>
        </div>
        <div class="pro-coupons">
           <div class="coupons content">
              <span><i class="gray-s">Coupons</i> <strong>12%</strong></span>
              <span class="coupon-right"><strong>35%</strong> <i class="gray-s">off</i> </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'promotion',
  data () {
    return {
      items: [1,2,3,4,5,6,7,8,9,10]
    }
  },
  methods: {
    removeAll () {
      alert("remove all?");
    }
  }
}
</script>

<style lang="less" scoped>
  .promotion {
    .pro-header {
      position: relative;
      border-bottom: 1px solid #e6e6e6;
      margin-bottom: 1rem;
    }
    .title {
      font-size: 1.5rem;
      margin: .7rem 0;
      font-weight: normal;
    }
    .remove-all {
      position: absolute;
      right: 0;
      bottom: 10px;
      color: #808080;
      cursor: pointer;
      &:hover {
        color: darken(#808080, 20%);
      }
    }
    .promotion-content {
      width: 101%;
      // border: 1px solid red;
      .pro-card {
        // float: left;
        position: relative;
        display: inline-block;
        width: 24%;
        height: 21.6rem;
        border: 1px solid #d2d2d2;
        box-shadow: 1px 3px 3px rgba(210, 210, 210, 1);
        border-radius: 4px;
        margin-right: 1%;
        padding-top: 2rem;
        padding-left: .5rem;
        padding-right: 1rem;
        margin-bottom: 1rem;
        text-align: center;
        overflow: hidden;
        .expried {
          position: absolute;
          font-size: .78rem;
          width: 100%;
          height: 2rem;
          line-height: 2rem;
          background: #c4c4c4;
          color: white;
          transform: rotate(-45deg) translateX(-22%) translateY(-230%);
          text-align: center;
        }
        .pro-img {
          display: inline-block;
          width: 10rem;
          height: 10rem;
          margin-bottom: 2rem;
        }
        .plotform {
          font-style: italic;
          font-size: 12px;
          color: #898989;
          text-align: left;
          margin-bottom: .3rem;
        }
        .pro-title {
          font-size: 0.78rem;
          text-align: left;
          color: #1a1a1a;
          margin-bottom: 1.3rem;
          height: 1.8rem;
          overflow: hidden;
        }
        .price-remove {
          text-align: left;
          font-size: 1rem;
          margin-bottom: 3px;
          .remove {
            float: right;
            cursor: pointer;
            color: #808080;
            &:hover {
              color: #874532;
            }
          }
        }
        .pro-coupons {
          text-align: left;
          font-size: 0.67rem;
          .coupon-right {
            float: right;
          }
        }
      }
    }
  }
</style>
