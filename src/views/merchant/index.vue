
<template>
  <div class="page-index ">
    <div class="pages-content clearfix">
      <div class="blank-s">
      </div>
      <div class="merchant" v-if="userInfo.username" v-title="titleMsg" >
         <div class="user">
          <div class=" head">
            <img v-if="userInfo.avatar_img" :src="userInfo.avatar_img" alt="">
            <img v-else src="../../assets/user.png" alt="">
          </div>
          <div class=" details-user">
              <p class="first">
                <span class="name">{{userInfo.username}}</span>
                <span class="seller reds-color" v-if="userInfo.type == 'celebrity'">Influencer</span>
                <span class="seller merchant-color" v-if="userInfo.type == 'merchant'">Merchant</span>
              </p>
              <p class="join">
                <span><i class="iconfont icon-date"></i> Joined {{userInfo.joined_date}}</span>
                <span><i class="iconfont icon-huiyuandengji0101"> </i> Level {{userInfo.level}}</span>
                 <span><i class="iconfont icon-youhuiquan1"></i> {{userInfo.coupon_posteds}}  Coupons Posted</span>
              </p>
              <p class="footer">
                {{userInfo.introduce}}
              </p>
          </div>
        </div>
      </div>
      <coupons-pro 
            v-for="couponsDetails in arrcouponsDetails"  
            :key="1" 
            :couponsDetails="couponsDetails" 
            @gotodetails="gotodetails">
          <template slot="price">
          <p class="price content">
            <span class="price-right">{{currency}}{{couponsDetails.discount_price}}</span>
          </p>
          <p class="price content clearfix">
            <span class="price-left"><i>coupon</i> {{currency}}{{(couponsDetails.product_price - couponsDetails.discount_price).toFixed(2)}}</span>
            <span class="price-right-bottom"> {{couponsDetails.discount_rate}}% <i>off</i></span>
          </p>
          </template>
         <template slot="btn">
           View Coupons
         </template>
      </coupons-pro>
    </div>
    <pagination 
      v-if="allpage && allpage != 1"
      :allpage="allpage"
      :show-item="showItem"
      :current="requestCouponData.page"
      @handlecurrent="gotoPage">
    </pagination>
  </div>
</template>

<script>
import couponsPro from '@/components/page_index_coupons/image_product.vue'
import pagination from '@/components/page_index_coupons/pagination.vue'
import { timestampFormat } from '@/utils/date'
import { getStore } from '@/utils/utils'
import { base64Encode, base64Decode } from '@/utils/randomString'
export default {
  name: 'page_index',
  data () {
    return {
      country_id: getStore('country_id') || 1,
      showItem: 7,
      allpage: undefined,
      userInfo: {
        avatar_img: '',
        coupon_posteds: '',
        introduce: '',
        joined_date: '',
        level: '',
        type: '',
        username: '',
      },
      arrcouponsDetails: [],
      requestCouponData: {
        country_id: getStore('country_id') || 1,
        page: 1,
        page_size: 48,
        user_id: '',
        menu_id: '',
      },
      requestUserData: {
        user_id: ''
      },
      titleMsg: '123',
    }
  },
  computed: {
    currency () {
      return getStore('currency') || '$'
    }
  },
  components: {
    couponsPro,
    pagination,
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    window.onresize = null
  },
  methods: {
    //页面初始化
    init () {
      this.initData()
      this.getPostUserInfo()
      this.getUserCouponInfo()
      this.widthToNum()
      window.onresize = () => {
        this.widthToNum()
      }
    },
    //初始化赋值
    initData () {
      this.requestCouponData.user_id = base64Decode(this.$route.params.userId)
      this.requestUserData.user_id = base64Decode(this.$route.params.userId)
    },
    //翻页功能实现
    gotoPage (index) {
      this.requestCouponData.page = index
      this.getUserCouponInfo()
    },

    //获取发布人的信息
    getPostUserInfo () {
      this.$api.postedUserInfo (this.requestCouponData).then(res => {
        res.data.joined_date = timestampFormat(res.data.joined_date)
        this.userInfo = res.data
        this.titleMsg = res.data.username + ' – DealsBank'
      }).catch(error => {
        console.log(error + ' postedUserInfo')
      })
    },

    //获取用户发布的优惠券信息
    getUserCouponInfo () {
      this.$api.getAllCoupons(this.requestCouponData).then(res => {
        if (res.code === 200) {
          this.arrcouponsDetails = res.data.data
          this.allpage = res.data.last_page

          if (res.data.data.length === 0 && this.requestCouponData.page !== 1) {
            this.gotoPage(1)
          }
        }
      }).catch(error => {
        console.log(error + ' getAllCoupons ')
      })
    },

    //跳转到coupons 详情页面， 在localStroge 中设置couponId 传递过去
    gotodetails (id) {
      this.$router.push({ path: '/coupons/' + base64Encode(id) + '/' + base64Encode(this.country_id) })
    },

    //根据页面尺寸宽度判断首页展示的商品数量
    widthToNum () {
      const LINE_NUM = 8    //默认显示的行数
      if (window.innerWidth <= 1270 && this.requestCouponData.page_size != 4 * LINE_NUM) {
        this.requestCouponData.page_size = 4 * LINE_NUM
        this.getUserCouponInfo()
      } else if (window.innerWidth > 1270 && window.innerWidth <= 1557 && this.requestCouponData.page_size != 5 * LINE_NUM) {
        this.requestCouponData.page_size = 5 * LINE_NUM
        this.getUserCouponInfo()
      } else if (window.innerWidth > 1557 && this.requestCouponData.page_size != 6 * LINE_NUM) {
        this.requestCouponData.page_size = 6 * LINE_NUM
        this.getUserCouponInfo()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.pages-content {
  padding: 0;
}
.page-index {
  background: #e4e4e4;
}
.blank-s {
  height: 1rem;
}
.icon-tuite1 {
  font-size: 34px;
  color: white;
  cursor: pointer;
}
.merchant {
  width: 99%;
  height: 194px;
  margin-bottom: 1rem;
  background: white;
  padding-top: 27px;
  border: 1px solid #c7c7c7;
  border-radius: 4px;
  .user {
    padding-left: 20px;
    height: 140px;
    overflow: hidden;
    .head {
      float: left;
      img {
        border-radius: 100%;
        width: 140px;
        height: 140px;
      }
    }
    .details-user {
      float: left;
      margin-left: 45px;
      .first {
        margin-bottom: 15px;
      }
      p {
        position: relative;
        margin: 0;
      }
      .name {
        font-size: 25px;
        color: #222;
      }
      .seller {
        position: relative;
        top: -3px;
        left: 5px;
        background: #ec5d1c;
        font-size: 13px;
        color: white;
        padding: 2px 10px;
        border-radius: 4px;
      }
      .join, .coupons-posted, .footer {
        margin-bottom: 15px;
        span {
          display: inline-block;
          width: 220px;
        }
        font-size: 14px;
        color: #808080;
      }
    }
  }
}
</style>
