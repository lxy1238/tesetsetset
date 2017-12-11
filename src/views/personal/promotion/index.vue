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
       <coupons-pro v-for="couponsDetails in arrcouponsDetails"  v-if="couponsDetails.coupons"
                     :key="1" 
                     :couponsDetails="couponsDetails.coupons"
                     :addpromo="false"
                     @gotodetails="gotodetails">
          <template slot="price" v-if="couponsDetails.coupons">
          <p class="price content" >
            <span class="price-left">{{currency}}{{couponsDetails.coupons.product_price}}</span>
            <span class="price-right">{{currency}}{{couponsDetails.coupons.discount_price}}</span>
            <span class="remove" @click="removePromotion(couponsDetails.coupons.id)">
              <i class="el-icon-delete"></i>
            </span>
          </p>
          <p class="coupons content"><span>discount</span> <span class="com-right">{{couponsDetails.coupons.discount_rate}}%</span></p>
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
        :current="requestdata.page"
        @handlecurrent="gotoPage">
      </pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { promotionUserCoupon, promotionUserRemove } from '@/api/login'
import couponsPro from '@/components/page_index_coupons/image_product.vue'
import pagination from '@/components/page_index_coupons/pagination.vue'
import { base64Encode } from '@/utils/randomString'
import { getStore } from '@/utils/utils'
import { getToken, getUserId } from '@/utils/auth'
export default {
  name: 'promotion',
  data () {
    return {
      arrcouponsDetails: [],
      allpage: undefined,
      showItem: 7,
      requestData: {
        api_token: getToken(),
        user_id: getUserId(),
        country_id: getStore('country_id'),
        page: 1,
        page_size: 8,
      },
      removeRequestData: {
        api_token: getToken(),
        user_id: getUserId(),
        coupon_id: ''
      },
      removeAllRequestData: {
        api_token: getToken(),
        user_id: getUserId(),
      }
    }
  },
  components: {
    couponsPro,
    pagination
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getPromotionDetails()
    },
    initData () {
      
    },
    //获取用户加入推广（收藏）的优惠券信息
    getPromotionDetails () {
      promotionUserCoupon(this.requestData)
        .then(res => {
          console.log(res)
          this.arrcouponsDetails = res.data.data
          this.allpage = res.data.last_page
        })
        .catch(error => {
          console.log(error)
        })
    },

    //移除优惠券
    removePromotion (id) {
      this.removeRequestData.coupon_id = id
      promotionUserRemove(this.removeRequestData)
        .then(() => {
          this.getPromotionDetails()
        })
        .catch(error => {
          console.log(error)
        })
    },

    //移除所有的优惠券
    removeAllPromotion () {
      if (this.arrcouponsDetails.length === 0) {
        return
      }
      this.$confirm('Do you really want to delete all?', 'remove all', {
        confirmButtonText: 'confirm'
      })
        .then(() => {
          promotionUserRemove(this.removeAllRequestData)
            .then(() => {
              this.getPromotionDetails()
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(() => {
          console.log('quxiao')
        })
    },

    //跳转到详情页面
    gotodetails (id) {
      this.$router.push({ path: '/coupons/' + base64Encode(id) })
    },

    //翻页功能
    gotoPage (index) {
      this.requestData.page = index
      this.getPromotionDetails()
    }
  },
  computed: {
    ...mapGetters(['user_id', 'token']),
    currency () {
      return getStore('currency') || '$'
    }
  },

}
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
