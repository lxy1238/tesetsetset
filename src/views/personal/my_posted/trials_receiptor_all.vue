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
      <el-select name="" class=" form-control-bootstrap" clearable v-model="searchForm.status">
        <el-option value="0" label="Pending"></el-option>
        <el-option value="1" label="Complete"></el-option>
        <el-option value="2" label="Decline"></el-option>
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
              <td class="img">
                <img class="trials-table-img" :src="item.product_img.split(',')[0]" alt="">
              </td>
              <!-- title -->
              <td class="trials-title" >
                <!-- <div class="trials-title-platform">{{item.website}}</div> -->
                <div class="trials-title-text">{{item.product_title}}</div>
                <!-- <a href="javascript:void(0);">{{item.menu.name}}</a> -->
              </td>
              <!-- List price -->
              <td>
                <div >
                  {{currency}}{{Number(item.product_price)}}
                </div>
              </td>
              <!-- user -->
              <td>
                <div v-if="item.apply">
                  {{item.apply.username}}
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
                <div class="trials-receiptor-review" v-if="item.appraise ">
                  <el-rate  class="rate"
                      v-model="item.appraise.review_star_rating"
                      disabled
                      text-color="#ff9900"
                      >
                    </el-rate>
                    <div class="picture-video">
                      <span class="picture">Picture: {{item.appraise.picture}}</span>
                      <span class="video">Video: {{item.appraise.video}}</span>
                    </div>
                    <div class="view">
                      <a href="javascript:void(0);"  @click="viewApprise(item.appraise_url)" >View</a>
                    </div>
                </div>
              </td>
              <!-- shipping fee -->
              <td>
                <div>
                 {{currency}}{{Number(trialDetails.shipping_fee)}}
                </div>
              </td>

              <!-- platform_fee -->
              <td>
                <div>
                 {{currency}}{{Number(add(item.platform_fee, item.promotion_commission))}}
                </div>
              </td>
              <!-- refund -->
              <td>
                <div>
                 {{currency}}{{Number(item.actual_total_refund)}}
                </div>
              </td>

                <!-- Cost -->
              <td>
                <div>
                 {{currency}}{{Number(item.store_total_fee)}}
                </div>
              </td>
           
                <!-- Status -->
              <td>
                <div v-if="item.status === 0 && item.run_status == 'normal' && item.order_number && !item.platform_user_id" class="blue"> 
                  Ordered
                </div>
                <div v-if="item.status === 0 && item.run_status == 'normal' && !item.order_number && !item.platform_user_id" class="red"> 
                  Decline
                </div>
                <div v-if="item.status === 0 && item.run_status == 'normal' && item.platform_user_id" class="blue"> 
                  Pending
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
                <template v-if="item.status === 0 && item.run_status == 'normal' && item.order_number && !item.platform_user_id">
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
          <p class=" center">Order number: {{checkDetails.order_number}}</p>

          <div class="try-again red">
            {{checkDetails.censor_content}}
          </div>

      </el-dialog>

       <!-- 审核-->
      <el-dialog  :visible.sync="DeclineDetails"  class="not-trials-dialog" size="tiny">
          <h3 class="check-order-header center">Confirm Order Number</h3>
          
          <el-row>
            <el-col   :offset="6">
              <div class=" ">Order number: {{checkDetails.order_number}}</div>
            </el-col>
          </el-row>
          <!-- <template v-if="checkDetails.status === 0"> -->
          <template >
            <div class="try-again">
              <!-- <el-button @click="notPass" type="danger" >Not Pass</el-button>
              <el-button @click="pass" type="info">Pass</el-button> -->
              <el-row>
                <el-col  :span="2" :offset="6">
                  <label class="label-status">Status: </label>
                </el-col>
                <el-col :span="10">
                  <el-select v-model="checkState">
                    <el-option value="0" label="Completed"></el-option>
                    <el-option value="1" label="Unfinished" @click.native="notPass"></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </div>
            <br />
            <div class="not-pass-select" v-if="checkState == '0'" >
              <el-row>
                <el-col :span="8" :offset="6">
                  <el-input v-model="CustomerID" placeholder="Buyer Profile ID"></el-input>
                  <div class="red" v-if="!CustomerID && isSubmitCustomerID">
                    Please enter customer ID.
                  </div>
                </el-col>
                <el-col :span="3" :offset="1">
                  <el-button type="success" @click="PassSubmit">Save</el-button>
                </el-col> 
              </el-row>
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
import Vue from 'vue'
import { DatePicker } from 'element-ui'
import {  getStore, removeStore } from '@/utils/utils'
import { getToken, getUserId } from '@/utils/auth'
import { parseTime } from '@/utils/date'
import { REFUSE_ORDER } from '@/status'
import { NumAdd, NumSub } from '@/utils/calculate'
Vue.use(DatePicker)
export default {
  name: 'posted_trials',
  data () {
    return {
      thLists: ['Image', 'Title', 'Price' , 'User', 'Order date', 'Order number', 
        'Review', 'Shipping fee', 'Platform fee', 'Refund', 
        'Cost', 'Status', 'Operation'
      ],
      trLists: [],
      DeclineDetails: false,
      expiredDetail: false,
      checkState: '0',

      checkDetails: {
        order_number: '',
        appraise_url: '',
        appraise: {
          picture: '',
          vedio: '',
          review_star_rating: '',
        }
      },
      notPassReason:'',
      notPassData: false,
      allpage: undefined,
      showItem: 7,
      requestdata: {
        api_token: getToken(),
        user_id: getUserId(),
        country_id: getStore('country_id') || 1,
        page: 1,
        page_size: 5,
      },
      //审核参数
      reqCheckData: {
        api_token: getToken(),
        user_id: getUserId(),
        order_id: '',
        platform_user_id: '',
      },
      refuseData: {
        api_token: getToken(),
        user_id: getUserId(),
        order_id: '',
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
      },
      CustomerID: '',
      isSubmitCustomerID: false
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
        this.allpage = res.data.last_page
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
        this.expiredDetail = true
      }
    },
    check () {
      
    },
    pass () {
      this.notPassData = !this.notPassData
    },
    notPass () {
      this.refuseData.order_id = this.checkDetails.id
      this.$api.refuseOrder(this.refuseData).then(res => {
        if (res.data === REFUSE_ORDER['SUCCESS']) {
          this.DeclineDetails = false
          this.init()
        }
      })
    },
    PassSubmit () {
      this.isSubmitCustomerID = true
      this.reqCheckData.order_id = this.checkDetails.id
      this.reqCheckData.platform_user_id = this.CustomerID
      if (!this.CustomerID) {
        return
      }
      this.$api.addPlatformUserId(this.reqCheckData).then(res => {
        if (res.code === 200) {
          this.DeclineDetails = false
          this.init()
        }
      })
    },
    //打开评论链接
    viewApprise (url) {
      if (url.search('http://') >= 0 || url.search('https://') >= 0) {
        window.open(url)
      } else {
        window.open('http://' + url)
      }
    },

    add (a, b) {
      return NumAdd(a, b)
    },
    sub (a, b) {
      return NumSub(a, b)
    },
  }
}
</script>

<style lang="less">
@import url('../../../styles/mixin.less');
.table-trials-posted {
  font-size: 10px !important;
    td,th { 
    padding: 10px;
  }
  .trials-table-img {
    width: 5rem;
    height: 4rem;
  }
  .trials-receiptor-review-td {
    width: 180px;
  }
  .img {
    width: 100px;
    img {
      width: 70px;
    }
  }
}

.trials-title {
  width: 150px;
  padding: 10px 0 10px 10px;
  cursor: pointer;
  .trials-title-text {
    font-size: 12px;
    height: 28px;
    line-height: 1.21;
    overflow: hidden;
    cursor: pointer;
  }
}
.star-label {
  float: left;
}
.check-order-header {
  margin-top: -20px;
}
.try-again {
  text-align: center;
  margin-top: 10px;
  // button {
  //   .btn-h(80px, 34px,#3399FF,#3399FF,#fff);
  // }
  .not-pass {
    .btn-h(80px, 34px,#3399FF,#3399FF,red);
  }
  .label-status {
    height: 36px;
    line-height: 36px;
  }
}
.not-pass-select {
  position: relative;
  margin-top: 10px;
  text-align: center;
  height: 22px;
  line-height: 22px;
  select {
    height: 22px;
    position: relative;
    top: 1px;
  }
  // button {
  //   .btn-h(60px, 22px,#85ba3b,#85ba3b,#fff);
  //   line-height: 1.5;
  // }
}
.el-dialog--tiny {
  width: 600px;
}

</style>
