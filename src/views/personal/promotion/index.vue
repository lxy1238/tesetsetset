<template>
  <div class="promotion clearfix">
    <div class="pro-header">
      <h3 class="title">promotion</h3>
      <div class="remove-all" @click="removeAllPromotion">
        <i class="el-icon-delete"></i>
        <span> Remove All</span>
      </div>
    </div>
    <div class="promotion-content clearfix ">
      <div class="pro-card" v-for="(item, index) in promotionDetails">
        <div class="expried">EXPRIED</div>
        <img class="pro-img" :src="item.product_img.split(',')[0]" alt="">
        <div class="plotform">{{item.website}} </div>
        <div class="pro-title" title="this is title">{{item.product_title}} </div>
        <div class="price-remove">
          <span>${{item.product_price}}</span>
          <span class="remove" @click="removePromotion(item.id)">
            <i class="el-icon-delete"></i>
          </span>
        </div>
        <div class="pro-coupons">
           <div class="coupons content">
              <span><i class="gray-s">Coupons</i> <strong>${{item.discount_price}}</strong></span>
              <span class="coupon-right"><strong>{{item.discount_rate}}%</strong> <i class="gray-s">off</i> </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { promotionUserCoupon, promotionUserRemove } from '@/api/login'
export default {
  name: 'promotion',
  data () {
    return {
      promotionDetails: {

      },
      requestData: {
        api_token: '',
        user_id: ''
      },
      removeRequestData: {
        api_token: '',
        user_id: '',
        coupon_id: '',
      },
      removeAllRequestData: {
        api_token: '',
        user_id: '',
        coupon_id: '',
      }

    }
  },
  methods: {
    removeAll () {
      alert("remove all?");
    },

    //获取用户加入推广（收藏）的优惠券信息
    getPromotionDetails () {
      this.requestData.api_token = this.token
      this.requestData.user_id = this.user_id
      promotionUserCoupon(this.requestData).then(res => {
        this.promotionDetails = res.data.data
      }).catch(error => {
        concole.log(error)
      })
    },

    //移除优惠券
    removePromotion (id) {
      this.removeRequestData.api_token = this.token
      this.removeRequestData.user_id = this.user_id
      this.removeRequestData.coupon_id = id
      console.log(this.removeRequestData)
      promotionUserRemove (this.removeRequestData).then(res => {
        console.log(res)
        this.getPromotionDetails()
      }).catch(error => {
        console.log(error)
      })
    },

    //移除所有的优惠券
    removeAllPromotion () {
      this.removeAllRequestData.api_token = this.token
      this.removeAllRequestData.user_id = this.user_id
      console.log(this.removeAllRequestData)
      this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: () => {
            promotionUserRemove (this.removeAllRequestData).then(res => {
              this.getPromotionDetails()
              console.log(res)
            }).catch(error => {
              console.log(error)
            })
          }
        });
    }
  },
  computed: {
    ...mapGetters([
      'user_id',
      'token'
    ])
  },
  mounted () {

    this.getPromotionDetails()
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
          height: 2.0rem;
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
