<template>
  <div class="page-index ">
    <div class="pages-content clearfix">
      <div class="blank-s">
      </div>
        <coupons-pro v-for="couponsDetails in arrcouponsDetails"  :key="1" :couponsDetails="couponsDetails" @gotodetails="gotodetails">
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
      v-if="allpage"
      :allpage="allpage"
      :show-item="showItem"
      @handlecurrent="gotoPage">
    </pagination>
  </div>
</template>

<script>
import couponsPro from "@/components/page_index_coupons/image_product.vue"
import pagination from "@/components/page_index_coupons/pagination.vue"
import { couponsDetails } from '@/mock/trials/index.js'
import { getAllCoupons } from '@/api/login'
import { setStore } from '@/utils/utils'
export default {
  name: "page_index",
  data() {
    return {  
      msg: "pageindex",
      showItem: 7,
      allpage: undefined,
      arrcouponsDetails: [
      ],
      requestData: {
        page: 1,
        page_size: 12,
      }
    }
  },
  components: {
    couponsPro,
    pagination,
  },
  mounted() {
    getAllCoupons(this.requestData).then(res => {
      this.arrcouponsDetails = res.data.data
      this.allpage = res.data.last_page
    })   
  },
  methods: {
    gotoPage(index) {
      this.requestData.page = index
      getAllCoupons(this.requestData).then(res => {
        this.arrcouponsDetails = res.data.data
        this.allpage = res.data.last_page
      }).catch(error => {
        console.log(error)
      })
    },

    //跳转到coupons 详情页面， 在localStroge 中设置couponId 传递过去
    gotodetails (id, user_id) {
      console.log(id, user_id)
      this.$router.push({ path: '/coupons/' + id  + '/' + user_id})
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
</style>
