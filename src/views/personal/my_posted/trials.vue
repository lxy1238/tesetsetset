<template>
  <div class="posted-coupons">
    <template>
       <div class="pro-header">
        <h3 class="title">Trials Posted</h3>
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
              <!-- store -->
              <td class="trials-store">
                <div class="trials-store-content">
                  {{item.store}}
                </div>
              </td>
              <!-- List price -->
              <td>
                <div >
                  {{item.product_prcie}}
                </div>
              </td>
              <!-- quantity -->
              <td>
                <div>
                  {{item.quantity}}
                </div>
              </td>
              <!-- applied -->
              <td>
                 <a href="javascript:void(0)" @click="gotoTrailsreceiptor">
                   {{item.applied}}
                </a>
               
              </td>
              <!-- shipping_fee -->
              <td>
                <div>
                  {{item.shipping_fee}}
                </div>
              </td> 
              <!-- promotion_fee -->
              <td>
                <div>
                  {{item.promotion_fee}}
                </div>
              </td>
              <!-- refund -->
              <td>
                <div>
                  {{item.refund}}
                </div>
              </td>
              <!-- security_deposit -->
              <td>
                <div>
                  {{item.security_deposit}}
                </div>
              </td>

                <!-- Cost -->
              <td>
                <div>
                  {{item.cost}}
                </div>
              </td>
                <!-- valid_date -->
              <td>
                <div>
                  {{item.valid_date}}
                </div>
              </td>
                <!-- Status -->
              <td>
                <div>
                  pedding
                </div>
              </td>
                <!-- security_deposit -->
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
      thLists: ['Image', 'Title', 'Store' , 'List Price', 'Quantity', 'Applied', 
        'Shipping fee', 'Promotion Fee', 'Pefund', 'Security Deposit',
        'Cost', 'Valid date', 'Status', 'Operation'
      ],
      trLists: [{
        product_img: 'http://www.ghostxy.top/dealsbank/img/01.png',
        product_title: 'this is title',
        platform: 'Amazon',
        store: 'A11',
        product_prcie: '98.00',
        quantity: '20',
        applied: '15',
        shipping_fee: '68.00',
        promotion_fee: '85.00',
        refund: '1969.00',
        security_deposit: '2060.00',
        cost: '0',            
        valid_date: '2017-09-08 to 2017-10-01',
        status: '1',


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
    add () {
      this.$router.push({path: '/posted/trials/add'})
    },

    //查询 trails
    postedCouponsSearch () {
      console.log(this.searchForm)
    },

    // 跳转到领取人详情页面
    gotoTrailsreceiptor () {
      this.$router.push({path: '/posted/trials/receiptor'})
    }
  
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
  
}

</style>
