<template>
  <div class="promotion clearfix">
    <div class="pro-header" v-title="titleMsg">
      <h3 class="title">My Promotions</h3>
      <div class="remove-all" @click="removeAllPromotion">
        <i class="el-icon-delete"></i>
        <span> Remove all</span>
      </div>
    </div>
    <div class="promotion-coupons">
       <coupons-pro v-for="couponsDetails in arrcouponsDetails"  v-if="couponsDetails.coupons"
                     :key="1" 
                     :couponsDetails="couponsDetails.coupons"
                     :addpromo="false"
                     @gotodetails="gotodetails">
          <template slot="price" v-if="couponsDetails.coupons">
           <p class="price content">
            <span class="price-right">{{currency}}{{couponsDetails.coupons.discount_price}}</span>
            <span class="remove" @click.stop="removePromotion(couponsDetails.coupons.id)">
              <i class="el-icon-delete" title="Remove"></i>
            </span>
          </p>
          <p class="price content clearfix">
            <span class="price-left"><i>Coupon</i> {{currency}}{{(couponsDetails.coupons.product_price - couponsDetails.coupons.discount_price).toFixed(2)}}</span>
            <span class="price-right-bottom"> {{couponsDetails.coupons.discount_rate}}% <i>off</i></span>
          </p>
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
        :current="requestData.page"
        @handlecurrent="gotoPage">
      </pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import couponsPro from '@/components/page_index_coupons/image_product.vue'
import pagination from '@/components/page_index_coupons/pagination.vue'
import { base64Encode } from '@/utils/randomString'
import { getStore } from '@/utils/utils'
import { getToken, getUserId } from '@/utils/auth'
export default {
  name: 'promotion',
  data () {
    return {
      country_id: getStore('country_id') || 1,
      arrcouponsDetails: [],
      allpage: undefined,
      showItem: 7,
      requestData: {
        api_token: getToken(),
        user_id: getUserId(),
        country_id: getStore('country_id') || 1,
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
      },
      titleMsg: 'My Promotions'
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
      this.arrcouponsDetails = []
      this.$api.promotionUserCoupon(this.requestData)
        .then(res => {
          this.arrcouponsDetails = res.data.data
          this.allpage = res.data.last_page
          if (res.data.data.length === 0 && this.requestData.page !== 1) {
            this.gotoPage(1)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    //移除优惠券
    removePromotion (id) {
      this.removeRequestData.coupon_id = id
      this.$api.promotionUserRemove(this.removeRequestData)
        .then(() => {
          this.getPromotionDetails()
          this.ArrayRemove(this.promotions, id)
          this.$store.commit('SET_PROMOTIONS', this.promotions)
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
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      })
        .then(() => {
          this.$api.promotionUserRemove(this.removeAllRequestData)
            .then(() => {
              this.getPromotionDetails()
              this.$store.commit('SET_PROMOTIONS', [])
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(() => {
          console.log('quxiao')
        })
    },
    //数组移除元素
    ArrayRemove (arr, val) {
      let index = arr.indexOf(val)
      if (index > -1) {
        arr.splice(index, 1)
      }
    },

    //跳转到详情页面
    gotodetails (id) {
      this.$router.push({ path: '/coupons/' + base64Encode(id) + '/' + base64Encode(this.country_id) })
    },

    //翻页功能
    gotoPage (index) {
      this.requestData.page = index
      this.getPromotionDetails()
    }
  },
  computed: {
    ...mapGetters(['user_id', 'token', 'promotions']),
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
    margin-bottom: 5px;
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
  min-height: 730px;
  .coupons-product {
    width: 23%;
    margin: 0 1.5% 5px 0;
    .remove {
      float: right;
      margin-right: 10px;
      cursor: pointer;
    }
    .img {
      height: 10rem;
      img {
        max-width: 10rem;
        max-height: 10rem;
      }
    }
  }
  
}
  .coupons-pagination {
    margin: -8px 0 0 0;
  }

</style>
