<template>
  <div class="posted-coupons">
  <template>
    <div class="pro-header">
      <h3 class="title">Coupons</h3>
    </div>
    <div class="search-form">
          <el-date-picker type="daterange" placeholder="Applied date" v-model="daterange"></el-date-picker>
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
              <div>{{currency}}{{couponsDetails.product_price}}</div>
            </td>
            <td class="discount">
              <div>{{couponsDetails.discount_rate}}%</div>
            </td>
            <td class="receiptor">
              <div>
                {{item.username}}
              </div>
            </td>
            <td class="applied-date">
              <div>{{item.created_at}}</div>
            </td>
            <td class="coupon-code">
              <div>{{couponsDetails.coupon_code}}</div>
            </td>
          </tr>
          <tr v-if="trLists.length === 0">
            <td colspan="10">No Data</td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination class="coupons-pagination" 
      v-if="allpage && allpage != 1"
      :allpage="allpage"
      :show-item="showItem"
      :current="requestdata.page"
      @handlecurrent="gotoPage">
    </pagination>
  </template>
 
  </div>
</template>

<script>
import pagination from '@/components/page_index_coupons/pagination.vue'
import {  getStore, removeStore } from '@/utils/utils'
import { getToken, getUserId } from '@/utils/auth'
export default {
  name: 'center_coupons',
  data () {
    return {
      thLists: [
        'Image',
        'Title',
        'List Price',
        'Discount',
        'Receiptor',
        'Applied date',
        'Coupon Code'
      ],
      trLists: [
        {
        
        }
      ],
      allpage: undefined,
      showItem: 7,
      daterange: '',
      requestdata: {
        user_id: getUserId(),
        api_token: getToken(),
        coupon_id: '',
        page: 1,
        page_size: 5,
        start_time: '',
        end_time: '',
      },
      couponsDetails: {
        product_img: '',
        product_title: '',
        product_price: '',
        discount_rate: '',
        coupon_code: ''
      }
    }
  },
  components: {
    pagination
  },
  computed: {
    currency () {
      return getStore('currency') || '$'
    }
  },
  mounted () {
    this.init()
  },
  //组件销毁前执行的回调
  beforeDestroy () {
    removeStore('couponDetails')
  },
  methods: {
    //初始化
    init () {
      this.initData()
      this.getPickCoupons()
    },
    initData () {
      this.requestdata.coupon_id = JSON.parse(getStore('couponDetails')).id
      var couponsDetails = JSON.parse(getStore('couponDetails'))
      console.log(couponsDetails)
      for (var i in this.couponsDetails) {
        this.couponsDetails[i] = couponsDetails[i]
      }
    },

    //获取领取人列表信息
    getPickCoupons () {
      this.$api.pickCoupons(this.requestdata)
        .then(res => {
          console.log(res)
          this.trLists = res.data.data
          this.allpage = res.data.last_page
        })
        .catch(error => {
          console.log(error)
        })
    },
    //分页跳转
    gotoPage (i) {
      this.requestdata.page = i
      this.requestdata.start_time = ''
      this.requestdata.end_time = ''
      this.getPickCoupons()
    },

    //发布的优惠券查询
    postedCouponsSearch () {
      if (!this.daterange[0]) {
        this.requestdata.start_time = ''
        this.requestdata.end_time = ''
        //对日期做处理，加上八个小时
      } else {
        this.requestdata.start_time = new Date(this.daterange[0].getTime() + 8 * 3600 * 1000) 
        this.requestdata.end_time = new Date(this.daterange[1].getTime() + 8 * 3600 * 1000) 
      }
      this.getPickCoupons()
    },

    //跳转到优惠券详情页面
    gotoDetails () {},


  }
}
</script>

<style lang="less" scoped>
@import url("../../../styles/mixin.less");
.posted-coupons {
  font-size: 12px;
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
  .item-inline {
    display: inline-block;
    width: 50%;
  }
  .search-form {
    position: relative;
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    margin-bottom: 1rem;
    .form-control-bootstrap {
      margin-right: 3%;
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

