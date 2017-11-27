<template>
  <div class="promotion clearfix">
    <div class="pro-header">
      <h3 class="title">promotion</h3>
      <div class="remove-all" @click="removeAllPromotion">
        <i class="el-icon-delete"></i>
        <span> Remove All</span>
        
      </div>
    </div>
    <div class="promotion-coupons">
       <coupons-pro v-for="couponsDetails in arrcouponsDetails"  
                     :key="1" 
                     :couponsDetails="couponsDetails.coupons"
                     :addpromo="false"
                     @gotodetails="gotodetails">
          <template slot="price">
          <p class="price content">
            <span class="price-left">${{couponsDetails.coupons.product_price}}</span>
            <span class="price-right">${{couponsDetails.coupons.discount_price}}</span>
            <span class="remove" @click="removePromotion(couponsDetails.coupons.id)">
              <i class="el-icon-delete"></i>
            </span>
          </p>
          <p class="coupons content"><span>Commissions</span> <span class="com-right">{{couponsDetails.coupons.discount_rate}}%</span></p>
          </template>
          <template slot="btn">
            View Coupons
          </template>
        </coupons-pro>
      </div>
      <pagination 
        v-if="allpage && allpage != 1"
        class="coupons-pagination"
        :allpage="allpage"
        :show-item="showItem"
        @handlecurrent="gotoPage">
      </pagination>
    <!-- <div class="promotion-content clearfix ">
      <div class="pro-card" v-for="(item, index) in promotionDetails">
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
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { promotionUserCoupon, promotionUserRemove } from "@/api/login";
import couponsPro from "@/components/page_index_coupons/image_product.vue";
import pagination from "@/components/page_index_coupons/pagination.vue";
export default {
  name: "promotion",
  data() {
    return {
      arrcouponsDetails: [],
      allpage: undefined,
      showItem: 7,
      requestData: {
        api_token: "",
        user_id: "",
        page: 1,
        page_size: 8,
      },
      removeRequestData: {
        api_token: "",
        user_id: "",
        coupon_id: ""
      },
      removeAllRequestData: {
        api_token: "",
        user_id: "",
        coupon_id: ""
      }
    };
  },
  components: {
    couponsPro,
    pagination
  },
  methods: {
    //获取用户加入推广（收藏）的优惠券信息
    getPromotionDetails() {
      this.requestData.api_token = this.token
      this.requestData.user_id = this.user_id
      promotionUserCoupon(this.requestData)
        .then(res => {
          this.arrcouponsDetails = res.data.data
          this.allpage = res.data.last_page
        })
        .catch(error => {
          console.log(error)
        });
    },

    //移除优惠券
    removePromotion(id) {
      this.removeRequestData.api_token = this.token
      this.removeRequestData.user_id = this.user_id
      this.removeRequestData.coupon_id = id
      promotionUserRemove(this.removeRequestData)
        .then(res => {
          this.getPromotionDetails()
        })
        .catch(error => {
          console.log(error)
        });
    },

    //移除所有的优惠券
    removeAllPromotion() {
      this.removeAllRequestData.api_token = this.token
      this.removeAllRequestData.user_id = this.user_id
      this.$confirm("Do you really want to delete all?", "remove all", {
        confirmButtonText: "confirm"
      })
        .then(() => {
          promotionUserRemove(this.removeAllRequestData)
            .then(res => {
              this.getPromotionDetails()
            })
            .catch(error => {
              console.log(error)
            });
        })
        .catch(() => {
          console.log("quxiao")
        });
    },

    //跳转到详情页面
    gotodetails(id, user_id) {
      this.$router.push({ path: "/coupons/" + id + "/" + user_id })
    },

    //翻页功能
    gotoPage (index) {
      this.requestData.page = index
      this.getPromotionDetails()
    }

  },
  computed: {
    ...mapGetters(["user_id", "token"])
  },
  mounted() {
    this.getPromotionDetails()
  }
};
</script>

<style lang="less" >
.promotion {
  .pro-header {
    position: relative;
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 1rem;
  }
  .title {
    font-size: 1.5rem;
    margin: 0.7rem 0;
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
      padding-left: 0.5rem;
      padding-right: 1rem;
      margin-bottom: 1rem;
      text-align: center;
      overflow: hidden;

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
        margin-bottom: 0.3rem;
      }
      .pro-title {
        font-size: 0.78rem;
        text-align: left;
        color: #1a1a1a;
        margin-bottom: 1.3rem;
        height: 2rem;
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
.promotion-coupons {
  width: 104%;
  .coupons-product {
    width: 23%;
    margin: 0 1.5% 20px 0;
    .remove {
      float: right;
      margin-right: 10px;
      cursor: pointer;
    }
  }
}
.coupons-pagination {
  .pagination {
    width: 100%;
    text-align: right;
    padding-right: 15rem;
    li {
      &.active {
        .items {
          border: none;
        }
      }
      .items {
        background: #fff;
      }
    }
  }
}
</style>
