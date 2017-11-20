<template>
  <div class="posted-coupons">
    <div class="pro-header">
      <h3 class="title">Coupons Posted</h3>
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

      <button class="add-coupons" @click="add"><i class="el-icon-plus"></i> Add</button>
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
              <img class="product-img" :src="item.product_img" alt="">
            </td>
            <td>
              <div>amazon</div>
              <div class="table-product-title">{{item.product_title}}</div>
              <a href="javascript:void(0);" @click="gotoDetails(item.id)">Electronics</a>
            </td>

            <td class="prcie">
              <div>${{item.product_price}}</div>
            </td>
            <td class="discount">
              <div>{{item.discount_rate}}%</div>
            </td>
            <td class="qty">
              <div>
                <a href="javascript:void(0);" @click="gotoReceiptor(item)">{{item.pick_numbers}}</a>/
                <span>{{item.total_quantity}}</span>
              </div>
            </td>
            <td class="valid-date">
              <div>{{item.valid_date}}</div>
            </td>
            <td class="status">
              <div class="blue" v-if="item.status === 1">
                pedding
              </div>
            </td>
            <td class="operation">
              <div> <a href="javascript:void(0)">Edit</a></div>
              <div> <a href="javascript:void(0)">Open</a></div>
              <div> <a href="javascript:void(0)">Close</a></div>
              <!-- <div> <a href="javascript:void(0)">Delete</a></div>
              <div> <a href="javascript:void(0)">Details</a></div> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination class="coupons-pagination"
      :allpage="allpage"
      :show-item="showItem"
      @handlecurrent="gotoPage">
    </pagination>
  </div>
</template>

<script>
import pagination from '@/components/page_index_coupons/pagination.vue'
import { mapGetters } from 'vuex'
import { userPickCoupons } from '@/api/login'
export default {
  name: 'center_coupons',
  data () {
    return {
      thLists: ["Image", "Title", "Price", "Discount", "Qty", "Valid Date", "Status", "Operation"],
      trListsTest: [{
        user_id: undefined,  // 用户ID ， 是，
        user_name: '',       // 发布用户名称， 是
        category_id: 1,     // 所属分类 , 是   int
        country: '美国' ,    // 国家  是
        website: '亚马逊2',         // 平台   是 
       
        product_reason: 'This is a product I like very much',  //产品描述  是
        use_type: 'Unlimited',
        coupon_code: 'QAKLWEFALWEKFJ',     //优惠券码
        reward_type: '1.5',     //PerOrder:按每订单奖励,
        product_price: '65',   //商品价格
        shipping_fee: '1.11',   //运费   否
        discount_rate: '12%',   //折扣率    否
        valid_date: new Date(),      //到期时间  int
       
        quantity_per_day: 10, // 每天上限数量 int
        influencer_reward:'1.5',// 推荐费用/每个
        platform_fee: '2.2',    //支付平台费用/每个
        influencer_reward_count: '66',    //推荐总费用
        platform_reward: '55',   //  支付平台总费用， 否
        total_fee: '123', //总费用


        product_title: 'this is project',   // 商品标题   是 ，
        product_img: 'http://www.ghostxy.top/dealsbank/img/01.png',     // 产品图片， string, 用逗号拼接 , 否
        coupon_id: 1,
        total_quantity: 1000,  // 总数量   int
        total_receiptor: 365,
        status: 1,
      }],
      trLists: [],
      allpage: 30,
      showItem: 7,
      searchForm: {
        title: "",
        category: '',
        status: "",
      },
      requestdata: {
        user_id: '',
        api_token: '',
        page: 1,
        page_size: 5
      }
     
    }
  },
  components: {
    pagination
  },
  mounted () {
    this.requestdata.user_id = this.user_id
    this.requestdata.api_token = this.token
    console.log(this.requestdata)
    userPickCoupons(this.requestdata).then(res => {
      console.log(res)
      this.trLists = res.data.data
      this.allpage = res.data.last_page
    }).catch(error => {
      console.log(error)
    })
  },
  computed: {
    ...mapGetters([
      'user_id',
      'token'
    ])
  },
  methods: {
    //分页跳转
    gotoPage (i) {
      this.requestdata.page = i
      userPickCoupons(this.requestdata).then(res => {
        console.log(res)
        this.trLists = res.data.data
        // this.allpage = res.data.last_page
      })
    },

    //跳转到添加优惠券页面
    add () {
      this.$router.push({path: '/posted/coupons/add'})
    },

    //发布的优惠券查询
    postedCouponsSearch () {
      console.log(this.searchForm)
    },

    //跳转到优惠券详情页面
    gotoDetails (id) {
      
    },
    //跳转到 领取优惠券的用户页面
    gotoReceiptor (item) {
      this.$router.push({path: '/posted/coupons/receiptor'})
      this.$store.dispatch('setCouponId', item.id)
    }
  }
}
</script>

<style lang="less"  >
@import url('../../../styles/mixin.less');
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
      .btn-h(100px, 40px, #7ab7e0, #7ab7e0, #fff);
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
}


</style>
