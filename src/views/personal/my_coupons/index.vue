<template>
  <div class="my-coupons">
    <div class="title-bottom" v-title="'My Coupons'">
      My Coupons
    </div>
    <div class="coupons-content" v-if="couponLists.length != 0">
      <div class="pro-card" v-for="item in couponLists" v-if="item.coupons">
        <div class="expried" v-if="item.coupons.run_status === 'expired' || item.coupons.valid_date < (Date.now() / 1000)">expired</div>
        <div class="card-top">
          <img class="card-top-img" :src="item.coupons.product_img.split(',')[0]" alt="">
          <div class="pro-title">
              {{item.coupons.product_title}} 
          </div>
          <div class="pro-info">
            <span class="old-price ">{{currency}}{{item.coupons.discount_price}}</span><br />
            <!-- <span class="old-price">{{currency}}{{item.coupons.discount_price}}</span> -->
            <span class="coupons-price"><i>Coupon</i> <b>{{currency}}{{(item.coupons.product_price * item.coupons.discount_rate / 100).toFixed(2)}}</b></span>
            <span class="proportion"><b>{{item.coupons.discount_rate}}%</b> <i>off</i></span>
          </div>
        </div>
        <div class="card-bottom" >
          <span class="code" :title="item.code.code">{{item.code.code}}</span>
          <button class="go-to-amazon" @click="gotoAmazon(item)"> <a :href="item.coupons.product_url" target="_blank">Go to Amazon </a> </button>
        </div>
      </div>
    </div>
    <pagination class="coupons-pagination" 
      v-if="allpage && allpage != 1"
      :allpage="allpage"
      :show-item="showItem"
      :current="requestData.page"
      @handlecurrent="gotoPage">
    </pagination>
  </div>
</template>

<script>
import pagination from '@/components/page_index_coupons/pagination.vue'
import { mapGetters } from 'vuex'
import { getToken, getUserId } from '@/utils/auth' 
import { getStore } from '@/utils/utils'
import { base64Encode } from '@/utils/randomString'
export default {
  name: 'my_coupons',
  data () {
    return {
      allpage: undefined,
      showItem: 7,
      requestData: {
        api_token: getToken(),
        user_id: getUserId(),
        country_id: getStore('country_id') || 1,
        page: 1,
        page_size: 9
      },
      couponLists : [],
      country_id: getStore('country_id') || 1
    }
  },
  computed : {
    ...mapGetters([
      'token',
      'user_id'
    ]),
    currency () {
      return getStore('currency') || '$'
    },
  },
  components: {
    pagination
  },
  mounted () {
    this.getUserCoupons()
  },
  methods : {
    gotoPage (i) {
      this.requestData.page = i
      this.getUserCoupons()
    },
    getUserCoupons () {
      this.$api.userCoupons(this.requestData).then(res => {
        if (res.data.total !== 0) {
          this.couponLists = res.data.data
          this.allpage = res.data.last_page
        }
      }).catch(error => {
        console.log(error + 'my_coupons error')
      })
    },
    gotoAmazon (item) {
      window.open('/goto/product/coupon/' + base64Encode(item.coupon_id) + '/' + base64Encode(this.country_id) + '/')
    }
  }
}
</script>

<style lang="less" >
@import url('../../../styles/mixin.less');
.coupons-content {
  width: 102%;
  height: 34.33rem;
}
 .my-coupons .coupons-pagination {
  margin: 1.5rem 0 0 0;
}

 .pro-card {
        position: relative;
        display: inline-block;
        width: 32%;
        height: 11rem;
        border: 1px solid #d2d2d2;
        border-radius: 4px;
        margin-right: 1%;
        padding: .5rem 1rem 0 1rem;
        margin-bottom: 1rem;
        text-align: center;
        overflow: hidden;
         border-width: 1px 1px 3px 1px;
          &:hover {
            border-color:#adadad;
          
          }
        .expried {
          position: absolute;
          z-index: 222;
          font-size: 12px;
          width: 100%;
          height: 2rem;
          line-height: 2rem;
          background: #c4c4c4;
          color: white;
          transform: rotate(-45deg) translateX(-33%) translateY(-360%);
          text-align: center;
        }
        .card-top {
          position: relative;
          height: 5.5rem;
          width: 100%;
          padding: 10px 0 10px 4.8rem;
          text-align: left;
          .card-top-img {
            position: absolute;
            left: 5%;
            z-index: 111;
            width: 3.5rem;
            height: 3rem;
          }
          .pro-title {
            font-size: 13px;
            color: #333;
            height: 30px;
            line-height: 1.21;
            overflow: hidden;
            position: relative;
            top: -7px;
          }
          .pro-info {
            span {
              display: inline-block;
              margin-right: 4px;
              margin-bottom: .4rem;
            }
            .old-price {
              font-size: 1rem;
              color: #333;
              font-weight: 700;
            }
            .coupons-price{ 
              font-size: 13px;
              display: inline-block;
              margin-right: 20px;
              i {
                color: #808080;
              }
              b {
                color: #1a1a1a;
                font-weight: 400;
              }
            }
            .proportion {
               font-size: 13px;
              i {
                color: #808080;
              }
              b {
                color: #1a1a1a;
                font-weight: 400;
              }
            }
          }

        }
        .card-bottom {
          position: relative;
          top: 1rem;
          height: 2.7rem;
          line-height: 2.7rem;
          overflow: hidden;
          width: 100%;
          background: #f2f2f2;
          padding-right: 10px;
          .code {
            float: left;
            font-size: 12px;
            color: #1a1a1a;
            margin-left: 5px;
            width: 7rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
            margin-right: 5px;
            font-weight: bold;
          }
          .go-to-amazon {
            .btn-h(8rem, 1.8rem, #84ba3a, #84ba3a, #fff);
            font-size: 12px;
            position: relative;
            line-height: 1.8rem;
            top: 0px;
            left: 14px;
            a {
              display: inline-block;
              width: 100%;
              height: 100%;
              color: white;
            }
          }
        }
      }

</style>
