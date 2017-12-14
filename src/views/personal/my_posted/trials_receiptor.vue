<template>
  <div class="posted-coupons">
    <template>
       <div class="pro-header">
        <h3 class="title">Trials Applied</h3>
      </div>
 <div class="search-form">
      <label for="title">
        Order: 
      </label>
      <el-input class=" form-control-bootstrap"  type="text" v-model="searchForm.order_number" ></el-input>
      <label for="title">
        Date: 
      </label>
       <el-date-picker type="daterange" placeholder="Applied date" v-model="searchForm.date"></el-date-picker>
      <label for="title" >
        Status: 
      </label>
      <el-select name="" class=" form-control-bootstrap" v-model="searchForm.status">
        <el-option value="0" label="Pending">Pending</el-option>
        <el-option value="1" label="Complete">Complete</el-option>
        <el-option value="2" label="Decline">Decline</el-option>
      </el-select>

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
            <tr v-for="item in trLists" v-if="trLists.length != 0">
              <td>
                <img class="trials-table-img" :src="trialDetails.product_img.split(',')[0]" alt="">
              </td>
              <!-- title -->
              <td class="trials-title" v-if="trialDetails.menu">
                <div class="trials-title-platform">{{trialDetails.website}}</div>
                <div class="trials-title-text">{{trialDetails.product_title}}</div>
                <a href="javascript:void(0);">{{trialDetails.menu.name}}</a>
              </td>
              <!-- List price -->
              <td>
                <div >
                  {{currency}}{{trialDetails.product_price}}
                </div>
              </td>
              <!-- user -->
              <td>
                <div v-if="item.user">
                  {{item.user.username}}
                </div>
              </td>

              <!-- order_date -->
              <td>
                <div>
                  {{item.apply_time}}
                </div>
              </td>
              
              <!-- order_number -->
              <td>
                <div>
                  {{item.order_number}}
                </div>
              </td>

              <!-- review -->
              <td class="trials-receiptor-review-td" >
                <div class="trials-receiptor-review" v-if="item.review">
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
                 {{currency}}{{trialDetails.shipping_fee}}
                </div>
              </td>

              <!-- platform_fee -->
              <td>
                <div>
                 {{currency}}{{trialDetails.platform_fee}}
                </div>
              </td>
              <!-- refund -->
              <td>
                <div>
                 {{currency}}{{trialDetails.refund_price}}
                </div>
              </td>

                <!-- Cost -->
              <td>
                <div>
                 {{currency}}{{trialDetails.real_fee}}
                </div>
              </td>
           
                <!-- Status -->
              <td>
                <div v-if="item.status === 0 && item.run_status == 'normal' && !item.review"> 
                  Waiting for review
                </div>
                <div v-if="item.status === 0 && item.run_status == 'normal' && item.review"> 
                  To be confirmed
                </div>
                <div v-if="item.status === 0 && item.isExpired" class="red"> 
                  Expired
                </div>

                <div v-if="item.status === 2" class="red"> 
                  Decline
                </div>
                <div v-if="item.status === 1" class="green"> 
                  Complete
                </div>
              </td>
            
                <!-- Operation -->
              <td>
                <template v-if="item.status === 0 && item.run_status == 'normal' && item.review">
                  <div> <a href="javascript:void(0)" @click="confirmedOrder(item)">Confirmed</a></div>
                </template>
                <template v-if="item.status === 2">
                  <div> <a href="javascript:void(0)" @click="OrderDetails(item)">Details</a></div>
                </template>
                 <template v-if="item.status === 1">
                  <div></div>
                </template>
              </td>
            </tr>
            <tr v-if="trLists.length === 0">
              <td colspan="13">No Data</td>
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


    <!-- 弹窗 -->
        <!-- expiredDetail -->
      <el-dialog  :visible.sync="expiredDetail" title="result" class="not-trials-dialog" size="tiny">
          <p>用户超时未上评，保证金已退回账户</p>

          <div class="try-again">
            <button @click="check">check</button>
          </div>

      </el-dialog>

       <!-- 审核-->
      <el-dialog  :visible.sync="DeclineDetails" title="check" class="not-trials-dialog" size="tiny">
          <p>Order number: {{checkDetails.order_number}}</p>
          <p>Review link: </p>
          <p>
            <a href="javasctipt:void(0);">
              https://www.amazon.com/gp/customer-reviews/R342IRE0KQXMMN/ref=cm_cr_arp_d_rvw_ttl?ie=UTF8&ASIN=B01AK8HPP4
            </a>
          </p>
          <p>
            <span>Picture: 3</span>
            <span>Video: 0</span>
          </p>
          <span class="star-label">Star Level: </span>
             <el-rate  class="rate"
                      v-model="checkDetails.rate"
                      disabled
                      text-color="#ff9900"
                      >
                    </el-rate>
          <template v-if="checkDetails.status === 0">
          <div class="try-again">
            <button @click="notPass" class="not-pass" >Not Pass</button>
            <button @click="pass">Pass</button>
          </div>
          <div class="not-pass-select" v-if="notPassData">
            <select v-model="notPassReason">
              <!-- <option value="">请选择未通过原因</option> -->
              <option value="未查到订单"  >未查到订单</option>
              <option value="评论与内容不符合">评论与内容不符合</option>
            </select>
             <button @click="notPassSubmit">Save</button>
          </div>
          </template>
           <template v-if="checkDetails.status === 2">
          <div class="try-again red">
              {{checkDetails.censor_content}}
          </div>
          </template>

      </el-dialog>
  </div>
</template>

<script>
import pagination from '@/components/page_index_coupons/pagination.vue'
import {  getStore, removeStore } from '@/utils/utils'
import { getToken, getUserId } from '@/utils/auth'
import { parseTime } from '@/utils/date'
export default {
  name: 'posted_trials',
  data () {
    return {
      thLists: ['Image', 'Title', 'Price' , 'User', 'Order date', 'Order number', 
        'Review', 'Shipping fee', 'Platform fee', 'Refund', 
        'Cost', 'Status', 'Operation'
      ],
      trLists: [{
      }],
      DeclineDetails: false,
      expiredDetail: false,

      checkDetails: {
        order_number: 12312,
        rate: 3,
      },
      notPassReason:'未查到订单',
      notPassData: false,
      allpage: undefined,
      showItem: 7,
      requestdata: {
        api_token: getToken(),
        user_id: getUserId(),
        trial_id: '',
        page: 1,
        page_size: 5,
        order_number: '',
        status: '',
        start_time: '',
        end_time: '',
      },
      //审核参数
      reqCheckData: {
        api_token: getToken(),
        user_id: getUserId(),
        id: '',
        status: '',
        censor_content: '',
      },

      searchForm: {
        order_number:'',
        date: '',
        status: '',
      },
      trialDetails: {
        product_img: '',
        product_title: '',
        product_price: '',
        discount_rate: '',
        coupon_code: '',
        shipping_fee: '',
        platform_fee: '',
        refund_price: '',
        real_fee: '',
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
    removeStore('trialDetails')
  },
  methods: {
    init () {
      this.initData()
      this.getReceiptorInfo()
    },

    initData () {
      this.requestdata.trial_id = JSON.parse(getStore('trialDetails')).id
      var trialDetails = JSON.parse(getStore('trialDetails'))
      this.trialDetails = trialDetails
    },

    //获取领取人列表接口
    getReceiptorInfo () {
      this.$api.trialOrder(this.requestdata).then(res => {
        this.trLists = res.data.data
        for (let i of this.trLists) {
          i.isExpired = (i.appraise_expiry_time < parseInt(new Date()/1000))
          i.apply_time = parseTime(i.apply_time, '{y}-{m}-{d}')
        }
      })
    },

    gotoPage (i) {
      this.requestdata.page = i
      this.getReceiptorInfo()
    },

    //查询 trails
    postedCouponsSearch () {
      this.requestdata.status = this.searchForm.status
      this.requestdata.order_number = this.searchForm.order_number
      if (!this.searchForm.date[0]) {
        this.requestdata.start_time = ''
        this.requestdata.end_time = ''
        //对日期做处理，加上八个小时
      } else {
        this.requestdata.start_time = new Date(this.searchForm.date[0].getTime() + 8 * 3600 * 1000) 
        this.requestdata.end_time = new Date(this.searchForm.date[1].getTime() + 8 * 3600 * 1000) 
      }
      this.getReceiptorInfo()
    },
    confirmedOrder (item) {
      this.checkDetails = item
      this.DeclineDetails = true
    },
    OrderDetails (item) {
      this.checkDetails = item
      if (item.status === 0) {
        this.expiredDetail = true
      } else if (item.status === 2) {
        this.DeclineDetails = true
      }
    },
    check () {
      
    },
    pass () {
      this.notPassReason = ''
      this.checkSubmit(1)
    },
    notPass () {
      this.notPassData = !this.notPassData
    },
    notPassSubmit () {
      this.checkSubmit(2)
    },
    //审核提交
    checkSubmit (status) {
      this.reqCheckData.id = this.checkDetails.id
      this.reqCheckData.censor_content = this.notPassReason
      this.reqCheckData.status = status
      this.$api.updateOrderStatus(this.reqCheckData).then(res => {
        if (res.code === 200) {
          this.DeclineDetails = false
          this.getReceiptorInfo()
        }
      })
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
      width: 16%;
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

.trials-title {
  width: 150px;
}
.star-label {
  float: left;
}
.try-again {
  text-align: center;
  margin-top: 10px;
  button {
     .btn-h(80px, 34px,#3399FF,#3399FF,#fff);
  }
  .not-pass {
    .btn-h(80px, 34px,#3399FF,#3399FF,red);
  }
}
.not-pass-select {
  margin-top: 10px;
  // width: 200px;
  text-align: center;
  button {
    .btn-h(60px, 22px,#85ba3b,#85ba3b,#fff);
    line-height: 1.5;
  }
}
.el-dialog--tiny {
    width: 600px;
}
</style>
