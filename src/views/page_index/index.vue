<template>
  <div class="page-index ">
    <div class="pages-content clearfix">
      <div class="blank-s">
      </div>
        <coupons-pro v-for="couponsDetails in arrcouponsDetails"  
                     :key="1" 
                     :couponsDetails="couponsDetails"
                     :promotions="userPromotions"
                     @gotodetails="gotodetails">
          <template slot="price">
          <p class="price content">
            <span class="price-left">${{couponsDetails.product_price}}</span>
            <span class="price-right">${{couponsDetails.discount_price}}</span>
          </p>
          <p class="coupons content"><span>Commissions</span> <span class="com-right">{{couponsDetails.discount_rate}}%</span></p>
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
      @handlecurrent="gotoPage">
    </pagination>
  </div>
</template>

<script>
import couponsPro from "@/components/page_index_coupons/image_product.vue";
import pagination from "@/components/page_index_coupons/pagination.vue";
import { getAllCoupons, getInfo, getHeadCateList } from "@/api/login";
import { getToken, getUserId } from "@/utils/auth";
import { mapGetters } from "vuex";
export default {
  name: "page_index",
  data() {
    return {
      msg: "pageindex",
      showItem: 7,
      allpage: undefined,
      arrcouponsDetails: [],
      userPromotions: [],
      classifyList: [{
        id: 0,
        name: 'Top Coupons'
      }],
      requestData: {
        page: 1,
        page_size: 6 * 8,
        menu_id: '',
      }
    };
  },
  components: {
    couponsPro,
    pagination
  },
  mounted() {
    this.getHeadCateListInfo()
    window.onresize = this.widthToNum
  },
  beforeDestroy() {
    window.onresize = null
    this.$root.eventHub.$emit('initClassify')
  },
  computed: {
    menu_name () {
      if (this.$route.params.menuId) {
        return this.$route.params.menuId
      } else {
        return "Top Coupons"
      }
    }
  },
  watch: {
    menu_name () {
      this.getAllCouponsInfo()
    }
  },
  methods: {
    //翻页功能实现
    gotoPage(index) {
      this.requestData.page = index
      this.getAllCouponsInfo()
    },

    //跳转到coupons 详情页面， 在localStroge 中设置couponId 传递过去
    gotodetails(id, user_id) {
      this.$router.push({ path: "/coupons/" + id + "/" + user_id })
    },

    //获取用户信息 ，判断首页的coupon是否加入推广
    getUserInfo() {
      if (getToken()) {
        getInfo({ api_token: getToken(), user_id: getUserId() }).then(res => {
          var newArr = []
          for (var i of res.data.promotions) {
            newArr.push(i.coupon_id)
          }
          this.userPromotions = newArr
        });
      }
    },

    //获取首页所有优惠券的信息
    getAllCouponsInfo() {
      for (var i of this.classifyList) {
        if (i.name === this.$route.params.menuId) {
          this.selectedC = i.id
          this.requestData.menu_id = i.id
          this.$router.push({path:'/' + i.name})
        }
      }
      getAllCoupons(this.requestData)
        .then(res => {
          this.arrcouponsDetails = res.data.data
          this.allpage = res.data.last_page
        })
        .catch(error => {
          console.log(error)
        });
    },

    //根据页面尺寸宽度判断首页展示的商品数量
    widthToNum() {
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
      getHeadCateList().then(res => {
        this.classifyList = this.classifyList.concat(res.data)
        this.widthToNum()
      }).catch(error => {
        console.log(error)
      })
    }
  }
};
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
}
</style>
