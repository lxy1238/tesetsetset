<template>
  <div class="posted-coupons">
  <template>
    <div class="pro-header">
      <h3 class="title">Coupons</h3>
    </div>
    <div class="search-form">
      <label for="title">
        Title: 
      </label>
      <input class=" form-control-bootstrap"  type="text" v-model="searchForm.title" />
      <label for="title">
        Category: 
      </label>
      <select name="" class=" form-control-bootstrap" v-model="searchForm.category">
        <option value="1">母婴</option>
        <option value="2">其他</option>
        <option value="3">很多</option>
      </select>

      <label for="title" >
        Status: 
      </label>
      <select name="" class=" form-control-bootstrap" v-model="searchForm.status">
        <option value="1">Pending</option>
        <option value="2">Stop</option>
        <option value="3">Close</option>
        <option value="4">Decline</option>
        <option value="5">Article</option>
        <option value="6">Expired</option>
      </select>

      <button class="search" @click="postedCouponsSearch">Search</button>

    </div>
    <div class="table-box">
      <table class="table table-bordered coupons-table">
        <thead>
          <tr>
            <th v-for="item in thLists">{{item}}</th>
          </tr>
        </thead>
        <tbody >
          <tr v-for="item in trLists">
            <td>
              <img class="product-img" :src="couponsDetails.product_img.split(',')[0]" alt="">
            </td>
            <td class="product-details" @click="gotoDetails(item.id)">
              <div>amazon</div>
              <div class="table-product-title">{{couponsDetails.product_title}}</div>
              <a href="javascript:void(0);" >Electronics</a>
            </td>
            <td class="prcie">
              <div>${{couponsDetails.product_price}}</div>
            </td>
            <td class="discount">
              <div>{{couponsDetails.discount_rate}}%</div>
            </td>
            <td class="receiptor">
              <div>
                {{item.pick_username}}
              </div>
            </td>
            <td class="applied-date">
              <div>{{item.created_at}}</div>
            </td>
            <td class="coupon-code">
              <div>{{couponsDetails.coupon_code}}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination class="coupons-pagination" v-if="allpage"
      :allpage="allpage"
      :show-item="showItem"
      @handlecurrent="gotoPage">
    </pagination>
  </template>
 
  </div>
</template>

<script>
import pagination from "@/components/page_index_coupons/pagination.vue";
import { mapGetters } from "vuex";
import { pickCoupons } from "@/api/login";
import { getToken } from "@/utils/auth";
import { setStore, getStore, removeStore } from "@/utils/utils";
export default {
  name: "center_coupons",
  data() {
    return {
      thLists: [
        "Image",
        "Title",
        "List Price",
        "Discount",
        "Receiptor",
        "Applied date",
        "Coupon Code"
      ],
      trLists: [
        {
          user_id: undefined, // 用户ID ， 是，
          user_name: "", // 发布用户名称， 是
          category_id: 1, // 所属分类 , 是   int
          country: "美国", // 国家  是
          website: "亚马逊2", // 平台   是

          product_reason: "This is a product I like very much", //产品描述  是
          use_type: "Unlimited",
          reward_type: "1.5", //PerOrder:按每订单奖励,
          product_price: "65", //商品价格
          shipping_fee: "1.11", //运费   否
          discount_rate: "12%", //折扣率    否
          valid_date: new Date(), //到期时间  int

          quantity_per_day: "10", // 每天上限数量 int
          influencer_reward: "1.5", // 推荐费用/每个
          platform_fee: "2.2", //支付平台费用/每个
          influencer_reward_count: "66", //推荐总费用
          platform_reward: "55", //  支付平台总费用， 否
          total_fee: "123", //总费用

          product_title: "this is project", // 商品标题   是 ，
          product_img: "http://www.ghostxy.top/dealsbank/img/01.png", // 产品图片， string, 用逗号拼接 , 否
          coupon_id: 1,
          total_receiptor: 365,
          pick_username: "Skyer", //领取人
          coupon_code: "QAKLWEFALWEKFJ", //优惠券
          applied_date: new Date(), //领取时间
          status: 1
        }
      ],
      allpage: undefined,
      showItem: 7,
      searchForm: {
        title: "",
        category: "",
        status: ""
      },
      requestdata: {
        coupon_id: "",
        api_token: "",
        page: 1,
        page_size: 5
      },
      couponsDetails: {
        product_img: "",
        product_title: "",
        product_price: "",
        discount_rate: "",
        coupon_code: ""
      }
    };
  },
  components: {
    pagination
  },
  computed: {
    ...mapGetters(["token"])
  },
  mounted() {
    this.requestdata.api_token = this.token;
    this.requestdata.coupon_id = JSON.parse(getStore("couponDetails")).id;
    var couponsDetails = JSON.parse(getStore("couponDetails"));
    for (var i in this.couponsDetails) {
      this.couponsDetails[i] = couponsDetails[i];
    }
    pickCoupons(this.requestdata)
      .then(res => {
        this.trLists = res.data.data;
        this.allpage = res.data.last_page;
      })
      .catch(error => {
        console.log(error);
      });
  },
  //组件销毁前执行的回调
  beforeDestroy() {
    removeStore("couponDetails");
  },
  methods: {
    //分页跳转
    gotoPage(i) {
      this.requestdata.page = i;
      pickCoupons(this.requestdata).then(res => {
        this.trLists = res.data.data;
        this.allpage = res.data.last_page;
      });
    },

    //发布的优惠券查询
    postedCouponsSearch() {
      console.log(this.searchForm);
    },

    //跳转到优惠券详情页面
    gotoDetails(id) {},
    //跳转到 领取优惠券的用户页面
    gotoReceiptor() {
      this.$router.push({ path: "/posted/coupons/receiptor" });
    }
  }
};
</script>

<style lang="less"  >
@import url("../../../styles/mixin.less");
.posted-coupons {
  .pro-header {
    position: relative;
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 1rem;
  }
  .title {
    font-size: 1.5rem;
    margin: 1rem 0;
    font-weight: normal;
  }
  .title-s {
    margin-bottom: 1rem;
    font-size: 1rem;
    line-height: 2rem;
    color: #1a1a1a;
    border-bottom: 1px solid #e6e6e6;
  }
  .search-form {
    position: relative;
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    margin-bottom: 1rem;
    .form-control-bootstrap {
      margin-right: 4%;
      min-width: 10%;
    }
    .search {
      .btn-h(60px, 34px,#85ba3b,#85ba3b,#fff);
      font-size: 0.78rem;
      &:active {
        background: darken(#85ba3b, 10%);
        border-color: darken(#85ba3b, 10%);
      }
    }
    .add-coupons {
      position: absolute;
      right: 0;
      top: 50%;
      .btn-h(100px, 40px, #7ab7, #7ab7, #fff);
      margin-top: -20px;
      &:active {
        background: darken(#7ab7e0, 10%);
        border-color: darken(#7ab7e0, 10%);
      }
    }
  }
}
.coupons-pagination {
  .pagination {
    width: 100%;
    text-align: right;
    padding-right: 15rem;
    li {
      &.active {
        .items {
          border: none;
        }
      }
      .items {
        background: #fff;
      }
    }
  }
}

.coupons-table {
  .product-img {
    width: 5rem;
    height: 4rem;
  }
  .product-details {
    text-align: left;
    width: 200px;
  }
}
</style>

