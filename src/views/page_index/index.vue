<template>
  <div class="page-index ">
    <div class="pages-content clearfix">
      <div class="blank-s">
      </div>
        <coupons-pro v-for="couponsDetails in arrcouponsDetails"  :key="1" :couponsDetails="couponsDetails" @gotodetails="gotodetails">
          <template slot="price">
          <p class="price content">{{couponsDetails.product_price}}</p>
          <p class="coupons content">
            <span><i class="gray-s">Coupons</i> <strong>${{couponsDetails.product_price * couponsDetails.discount_rate / 100}}</strong></span>
            <span class="coupon-right"><strong>{{couponsDetails.discount_rate}}%</strong> <i class="gray-s">off</i> </span>
          </p>
          </template>
          <template slot="btn">
            View Coupons
          </template>
        </coupons-pro>
    </div>
    <pagination 
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
      allpage: 30,
      arrcouponsDetails: [
        {
          imgUrl: "http://www.ghostxy.top/dealsbank/img/01.png",
          platfrom: "amazon1",
          descript: "STATE Geo Mesh CoidGeoMesh Cold Shoulder Shift Dress111 ",
          price: "$98.00",
          coupons: "$18.00"
        },
        {
          imgUrl: "http://www.ghostxy.top/dealsbank/img/01.png",
          platfrom: "amazon2",
          descript: "STATE Geo Mesh CoidGeoMesh Cold Shoulder Shift Dress113 ",
          price: "$98.00",
          coupons: "$18.00"
        }
      ],
      couponsDetails: {
          id: 1,
          imgUrl: "http://www.ghostxy.top/dealsbank/img/01.png",
          platfrom: "amazon2",
          descript: "STATE Geo Mesh CoidGeoMesh Cold Shoulder Shift Dress113 ",
          price: "$98.00",
          coupons: "$18.00",
      },
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
    gotodetails (id) {
      this.$router.push({ path: '/coupons' })
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
