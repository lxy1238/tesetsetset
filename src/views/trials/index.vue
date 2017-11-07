<template>
  <div class="page-index ">
    <div class="pages-content clearfix">
      <explain ></explain>
      <coupons-pro v-for="n in 60"  :key="n" :couponsDetails="couponsDetails" @gotodetails="gotodetails">
        <template slot="price">
         <p class="trials-price content">
          <span class="old"> <i >{{couponsDetails.priceOld}} </i></span>
          <span class="gray-s"> Refund </span>
          <span class="coupon-right"><strong> {{couponsDetails.priceRefund}}</strong>  </span>
         </p>
         </template>
         <template slot="btn" >View trials</template>
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
import Clip from "@/utils/clipboard.js";
import couponsPro from "@/components/page_index_coupons/image_product.vue";
import pagination from "@/components/page_index_coupons/pagination.vue";
import explain from "@/components/trials/explain.vue"
export default {
  name: "page_index",
  data() {
    return {
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
          priceOld: "$98.00",
          priceRefund: "$88.00",
      }
    };
  },
  components: {
    couponsPro,
    pagination,
    explain
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
      this.$router.push({ path: '/trialsDetails'})
    }
  }
};
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
