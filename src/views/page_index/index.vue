<template>
  <div class="page-index ">
    <div class="pages-content clearfix">
      <div class="blank-s">
      </div>
        <coupons-pro v-for="n in 60"  :key="n" :couponsDetails="couponsDetails" @gotodetails="gotodetails">
          <template slot="price">
          <p class="price content">{{couponsDetails.price}}</p>
          <p class="coupons content">
            <span><i class="gray-s">Coupons</i> <strong>{{couponsDetails.coupons}}</strong></span>
            <span class="coupon-right"><strong>35%</strong> <i class="gray-s">off</i> </span>
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
      @handlecurrent="test">
    </pagination>
  </div>
</template>

<script>
import couponsPro from "@/components/page_index_coupons/image_product.vue"
import pagination from "@/components/page_index_coupons/pagination.vue"
import { couponsDetails } from '@/mock/trials/index.js'
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
      }
    };
  },
  components: {
    couponsPro,
    pagination,
  },
  mounted() {
    this.$root.eventHub.$on("selectClassify", data => {
      this.msg = "";
      setTimeout(() => {
        this.msg = data;
      }, 500);
    });
  },
  methods: {
    test(index) {
      console.log(`当前跳转到 ${index} 页`);
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
