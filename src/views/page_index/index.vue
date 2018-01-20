<template>
  <div class="page-index " v-title="titleMsg">
    <div class="pages-content clearfix">
      <div class="blank-s">
      </div>
      <template v-if="search">
        <div class="head-crumbs"  >
          <div class="numResults">
            <span class="semibold"> {{total}} </span> results found matching <strong>{{search}}</strong>
          </div>
        <hr />
        </div>

      </template>
        <coupons-pro v-for="couponsDetails in arrcouponsDetails"  
                     :key="1" 
                     :couponsDetails="couponsDetails"
                     :addpromo="true"
                     @gotodetails="gotodetails">
          <template slot="price">
          <p class="price content">
            <span class="price-right">{{currency}}{{couponsDetails.discount_price}}</span>
          </p>
          <p class="price content clearfix">
            <span class="price-left"><i>Coupon</i> {{currency}}{{(couponsDetails.product_price - couponsDetails.discount_price).toFixed(2)}}</span>
            <span class="price-right-bottom"> {{couponsDetails.discount_rate}}% <i>off</i></span>
          </p>
          <!-- <el-tooltip  :visible-arrow="false" placement="top" effect="light">
             <div slot="content">Expected Commissions {{currency}} {{couponsDetails.commission_amount}}</div>
            <p class="coupons content" ><span>Commissions</span> <span class="com-right">{{couponsDetails.commission_ratio}}%</span></p>
          </el-tooltip> -->
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
      :current="requestData.page"
      @handlecurrent="gotoPage">
    </pagination>
  </div>
</template>

<script>
import couponsPro from '@/components/page_index_coupons/image_product.vue'
import pagination from '@/components/page_index_coupons/pagination.vue'
import { getStore } from '@/utils/utils'
import { getUserId } from '@/utils/auth'
import { base64Encode } from '@/utils/randomString'
import { mapGetters } from 'vuex'
export default {
  name: 'page_index',
  data () {
    return {
      showItem: 7,
      allpage: undefined,
      country_id: parseInt(getStore('country_id')) || 1,
      arrcouponsDetails: [],
      userPromotions: [],
      classifyList: [{
        id: 0,
        name: 'Top Coupons'
      }],
      requestData: {
        country_id: parseInt(getStore('country_id')) || 1,
        page: 1,
        page_size: '',
        menu_id: 0,
        keyword: '',
      },
      titleMsg: 'Best Deals, Coupons, Promo Codes, Great Discounts on Dealsbank.com',
      total: 0,
    }
  },
  components: {
    couponsPro,
    pagination
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    window.onresize = null
    window.onscroll = null
    this.$root.eventHub.$emit('initClassify')    //进入其他页面时，头部品类导航高亮消失
  },
  computed: {
    ...mapGetters([
      'promotions'
    ]),
    //导航条变化的时候触发查询需要展示商品的信息
    menu_name () {
      if (this.$route.params.menuId) {
        return this.$route.params.menuId
      } else {
        return 'Top Coupons'
      }
    },
    //查询字段变化的时候触发
    search () {
      if (this.$route.query.search) {
        return this.$route.query.search
      } else {
        return ''
      }
    },
    currency () {
      return getStore('currency') || '$'
    }
  },
  watch: {
    menu_name () {
      this.gotoPage(1)
    },
    search () {
      this.gotoPage(1)
    }
  },
  methods: {

    //初始化
    init () {
      this.requestData.keyword = this.$route.query.search
      this.getHeadCateListInfo()
      window.onresize = this.widthToNum
    },
    //翻页功能实现
    gotoPage (index) {
      this.requestData.keyword = this.search
      this.requestData.page = index
      this.getAllCouponsInfo()
    },

    //接收 选择国家时传递的数据
    // getheadData () {
    //   this.$root.eventHub.$on('changeCountryId', data => {
    //     this.requestData.country_id = data
    //     this.requestData.page = 1
    //     this.requestData.keyword = ''
    //     this.getAllCouponsInfo()
    //   })
    // },

    //跳转到coupons 详情页面， 在localStroge 中设置couponId 传递过去
    gotodetails (id) {
      this.$router.push({ path: '/coupons/' + base64Encode(id) + '/' + base64Encode(this.country_id) + (getUserId() ? '/' +  base64Encode(getUserId()) : '')})
    },

    //获取首页所有优惠券的信息
    getAllCouponsInfo () {
      this.arrcouponsDetails = []
      if (this.$route.params.menuId) {
        this.requestData.menu_id = 0
        for (var i of this.classifyList) {
          if (i.name === this.$route.params.menuId) {
            this.selectedC = i.id
            this.requestData.menu_id = i.id
          }
        }
      } else {
        this.requestData.menu_id = 0
      }
      this.$api.getAllCoupons(this.requestData)
        .then(res => {
          this.arrcouponsDetails = res.data.data
          this.allpage = res.data.last_page
          this.total = res.data.total
          this.userPromotions = this.promotions.map((e) => { return e.coupon_id })
          if (res.data.data.length === 0 && this.requestData.page !== 1) {
            this.gotoPage(1)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

 

    //根据页面尺寸宽度判断首页展示的商品数量
    widthToNum () {
      const LINE_NUM = 8 //默认显示的行数
      if (
        window.innerWidth <= 1270 &&
        this.requestData.page_size != 4 * LINE_NUM
      ) {
        this.requestData.page_size = 4 * LINE_NUM
        this.getAllCouponsInfo()
      } else if (
        window.innerWidth > 1270 &&
        window.innerWidth <= 1557 &&
        this.requestData.page_size != 5 * LINE_NUM
      ) {
        this.requestData.page_size = 5 * LINE_NUM
        this.getAllCouponsInfo()
      } else if (
        window.innerWidth > 1557 &&
        this.requestData.page_size != 6 * LINE_NUM
      ) {
        this.requestData.page_size = 6 * LINE_NUM
        this.getAllCouponsInfo()
      }
    },

    //获取头部品类列表
    getHeadCateListInfo () {
      this.$api.getHeadCateList().then(res => {
        this.classifyList = this.classifyList.concat(res.data)
        this.widthToNum()
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="less" scoped>
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
  .pages-content {
    min-height: 1000px;
    .head-crumbs {
      width: 99.05%;
      hr {
          background-color: #eee;
          width: 100%;
          height: 1px;
          border: 0;
          border-top: 1px #d6d6d6 solid;
          clear: both;
          margin-bottom: 10px;
      }
    }
    .numResults {
      font-family: "Open Sans", Arial, sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      color: #444;
      flex: 1;
      justify-self: flex-start;
      margin-bottom: 10px;
    }
    .semibold {
      font-family: "Open Sans Semibold", "Open Sans", Arial, sans-serif;
      font-style: normal;
      font-weight: 600;
    }
  }
</style>
