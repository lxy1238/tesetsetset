<template>
  <div class="posted-coupons">
    <template>
       <div class="pro-header">
        <h3 class="title">Trials Applied</h3>
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
        <table class="table table-bordered table-trials-posted">
          <thead>
            <tr>
              <th v-for="item in thLists">{{item}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in trLists">
              <td>
                <img class="trials-table-img" :src="item.product_img" alt="">
              </td>
              <!-- title -->
              <td class="trials-title">
                <div class="trials-title-platform">amazon</div>
                <div class="trials-title-text">{{item.product_title}}</div>
                <a href="javascript:void(0);">Electronics</a>
              </td>
              <!-- List price -->
              <td>
                <div >
                  {{item.product_prcie}}
                </div>
              </td>
              <!-- user -->
              <td>
                <div>
                  {{item.receiptor_user}}
                </div>
              </td>

              <!-- order_date -->
              <td>
                <div>
                  {{item.order_date}}
                </div>
              </td>
              
              <!-- order_number -->
              <td>
                <div>
                  {{item.order_number}}
                </div>
              </td>

              <!-- review -->
              <td class="trials-receiptor-review-td">
                <div class="trials-receiptor-review">
                  <el-rate  class="rate"
                      v-model="item.review.rate"
                      disabled
                      text-color="#ff9900"
                      >
                    </el-rate>
                    <div class="picture-video">
                      <span class="picture">Picture: {{item.review.picture}}</span>
                      <span class="video">Video: {{item.review.video}}</span>
                    </div>
                    <div class="view">
                      <a :href="item.review.link">View</a>
                    </div>
                </div>
              </td>
              <!-- shipping fee -->
              <td>
                <div>
                  {{item.shipping_fee}}
                </div>
              </td>

              <!-- platform_fee -->
              <td>
                <div>
                  {{item.platform_fee}}
                </div>
              </td>
              <!-- refund -->
              <td>
                <div>
                  {{item.refund}}
                </div>
              </td>

                <!-- Cost -->
              <td>
                <div>
                  {{item.cost}}
                </div>
              </td>
           
                <!-- Status -->
              <td>
                <div>
                  pedding
                </div>
              </td>
            
                <!-- Operation -->
              <td>
                <div> <a href="javascript:void(0)">Edit</a></div>
                <div> <a href="javascript:void(0)">Open</a></div>
                <div> <a href="javascript:void(0)">Close</a></div>
                <div> <a href="javascript:void(0)">Delete</a></div>
                <div> <a href="javascript:void(0)">Details</a></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <pagination class="coupons-pagination"
        v-if="allpage && allpage != 1"
        :allpage="allpage"
        :show-item="showItem"
        @handlecurrent="gotoPage">
      </pagination>
    </template>
  
  </div>
</template>

<script>
import pagination from '@/components/page_index_coupons/pagination.vue'
export default {
  name: 'posted_trials',
  data () {
    return {
      thLists: ['Image', 'Title', 'Price' , 'User', 'Order date', 'Order number', 
        'Review', 'Shipping fee', 'Platform fee', 'Refund', 
        'Cost', 'Status', 'Operation'
      ],
      trLists: [{
        product_img: 'http://www.ghostxy.top/dealsbank/img/01.png',
        product_title: 'this is title',
        platform: 'Amazon',
        product_prcie: '98.00',
        receiptor_user: 'Skyer',
        order_date: '2017-09-08 10:26:35',
        order_number: '116-7827885-8849945',
        review: {
          rate: 4.1,
          picture: 3,
          video: 0,
          link: 'http://www.baidu.com'
        },
        shipping_fee: '68.00',
        platform_fee: '11.00',
        refund: '1969.00',
        cost: '0',            
        status: '1',
        

        quantity: '20',
        applied: '15',
        promotion_fee: '85.00',
        security_deposit: '2060.00',
        valid_date: '2017-09-08 to 2017-10-01',


      }],
      allpage: undefined,
      showItem: 7,
      searchForm: {
        title: '',
        category: '',
        status: '',
      }
     
   
    }
  },
  components: {
    pagination
  },
  mounted () {
  },
  methods: {
    gotoPage (i) {
      console.log(i)
    },

    //查询 trails
    postedCouponsSearch () {
      console.log(this.searchForm)
    },

  
  }
}
</script>

<style lang="less">
@import url('../../../styles/mixin.less');
.posted-coupons {
  .pro-header {
    position: relative;
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 1rem;
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
.table-trials-posted {
  font-size: 10px !important;
  .trials-table-img {
    width: 5rem;
    height: 4rem;
  }
  .trials-receiptor-review-td {
    width: 180px;
  }
  
}

</style>
