<template>
  <div class="page-index " v-title="titleMsg">
    <div class="pages-content clearfix">
      <explain ></explain>
      <coupons-pro  v-for="couponsDetails in arrcouponsDetails"  
                    :key="1" 
                    :couponsDetails="couponsDetails"
                    :addpromo="false" 
                    @gotodetails="gotodetails(couponsDetails.id)">
        <template slot="white">
          <div class="white-trials"></div>
        </template>
        <template slot="price">
         <p class="trials-price content">
          <span class="old"> <i >{{currency}}{{couponsDetails.product_price}} </i></span>
          <span class="gray-s"> Refund </span>
          <span class="coupon-right"><strong> {{currency}}{{couponsDetails.refund_price}}</strong>  </span>
         </p>
         </template>
         <template slot="btn" >View Trials</template>
      </coupons-pro>
    </div>
    <pagination 
      v-if="allpage && allpage != 1"
      :allpage="allpage"
      :show-item="showItem"
      :current="requestdata.page"
      @handlecurrent="gotoPage">
    </pagination>
  </div>
</template>

<script>
import couponsPro from '@/components/page_index_coupons/image_product.vue'
import pagination from '@/components/page_index_coupons/pagination.vue'
import explain from '@/components/trials/explain.vue'
import { getStore } from '@/utils/utils'
import { base64Encode } from '@/utils/randomString'
export default {
  name: 'page_index',
  data () {
    return {
      showItem: 7,
      country_id: parseInt(getStore('country_id')) || 1,
      allpage: undefined,
      arrcouponsDetails: [],
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
      titleMsg: 'trials'
    }
  },
  components: {
    couponsPro,
    pagination,
    explain
  },
  computed: {
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
  mounted () {
    this.init()
  },
  beforeDestroy () {
    window.onresize = null
    this.$root.eventHub.$emit('initClassify')    //进入其他页面时，头部品类导航高亮消失
    // this.$root.eventHub.$off('changeCountryId')
  },
  methods: {
    init () {
      this.initData()
      this.getHeadCateListInfo()
      window.onresize = this.widthToNum
    },
    initData () {
      this.requestData.keyword = this.$route.query.search
    },

    //翻页功能实现
    gotoPage (index) {
      this.requestData.keyword = this.search
      this.requestData.page = index
      this.getTrialsList()
    },
    
    //获取试用品首页列表信息
    getTrialsList () {
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
      this.$api.getAllTrial(this.requestData).then(res => {
        this.arrcouponsDetails = res.data.data
      }).catch(error => {
        console.log(error)
      })
    },

    //跳转到trials详情页面
    gotodetails (id) {
      this.$router.push({ path: '/trialsDetails/' + base64Encode(id) + '/' + base64Encode(this.country_id) })
    },

    //根据页面尺寸宽度判断首页展示的商品数量
    widthToNum () {
      const LINE_NUM = 8 //默认显示的行数
      if (
        window.innerWidth <= 1270 &&
        this.requestData.page_size != 4 * LINE_NUM
      ) {
        this.requestData.page_size = 4 * LINE_NUM
        this.getTrialsList()
      } else if (
        window.innerWidth > 1270 &&
        window.innerWidth <= 1557 &&
        this.requestData.page_size != 5 * LINE_NUM
      ) {
        this.requestData.page_size = 5 * LINE_NUM
        this.getTrialsList()
      } else if (
        window.innerWidth > 1557 &&
        this.requestData.page_size != 6 * LINE_NUM
      ) {
        this.requestData.page_size = 6 * LINE_NUM
        this.getTrialsList()
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
.icon-tuite1 {
  font-size: 34px;
  color: white;
  cursor: pointer;
}
.trials-price {
  text-align: center;
  font-size: 13px;
  .coupon-right {
    font-size: 16px;
  }
  
}
.trials-explain {
  width: 99.05%;
  height: 5.5rem;
  // padding: 1rem 0;
  border: 1px solid #e1e1e1;
  background: white;
  margin: 1rem 0 1.3rem 0;
  text-align: left;
}
.inline {
  position: relative;
  float: left;
  height: inherit;
  border: 1px solid transparent;
  padding: 1rem 0 1rem 1rem;
  width: 16rem;
  margin: 0;
  .title {
    font-size: 1rem;
    color: #666;
  }
  .content {
    font-size: 0.8rem;
    color: #b2b2b2;
  }
  .icon-icon_huaban {
    position: absolute;
    font-size: 30px;
    right: 0;
    top: 1.6rem;
    color: #b2b2b2;
    display: inline-block;
    transform: rotate(90deg);
  }
}
</style>
