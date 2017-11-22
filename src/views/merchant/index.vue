
<template>
  <div class="page-index ">
    <div class="pages-content clearfix">
      <div class="blank-s">
      </div>
      <div class="merchant">
         <div class="user">
          <div class=" head">
            <img src="http://www.ghostxy.top/dealsbank/img/user.png" alt="">
          </div>
          <div class=" details-user">
              <p class="first">
                <span class="name">Nickname</span>
                <span class="seller">seller</span>
              </p>
              <p class="join">
                <span><i class="iconfont icon-date"></i> Joined Dec 2015</span>
                <span><i class="iconfont icon-huiyuandengji0101"> </i> L4: APPrenlice</span>
              </p>
              <p class="coupons-posted">
                 <span><i class="iconfont icon-youhuiquan1"></i> 35 Coupons Posted</span>
                <span><i class="iconfont icon-time"> </i> Posted 09-19-2017 05:39 PM</span>
              </p>
              <p class="footer">
                Professional to create exclusive coupons, directional 
                marketing plan, cabbage cost-effective product explosion!
              </p>
          </div>
        </div>
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
      v-if="allpage"
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
      allpage: undefined,
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
.merchant {
  width: 99%;
  height: 194px;
  margin-bottom: 2rem;
  background: white;
  padding-top: 27px;
  .user {
    padding-left: 20px;
    height: 140px;
    overflow: hidden;
    .head {
      float: left;
      img {
        width: 140px;
        height: 140px;
      }
    }
    .details-user {
      float: left;
      margin-left: 45px;
      .first {
        margin-bottom: 10px;
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
