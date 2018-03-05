
<template>
  <div class="posted-coupons">
    <template>
       <div class="pro-header">
        <h3 class="title">My Promotions</h3>
      </div>
 <div class="search-form">
      <label for="title">
        Title: 
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
        <el-option value="0" label="Processing"></el-option>
        <el-option value="1" label="Complete"></el-option>
        <el-option value="2" label="Failure"></el-option>
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
              <!-- order_date -->
              <td>
                <div>
                  {{item.apply_time}}
                </div>
              </td>
              <td class="img">
                <img class="trials-table-img" :src="item.product_img.split(',')[0]" alt="">
              </td>
              <!-- title -->
              <td class="trials-title" @click="gotoProtectUrl(item)">
                {{item.product_title}}
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

              
              
              <!-- order_number -->
              <td>
                <div>
                  {{item.order_number}}
                </div>
              </td>
                <!-- promotion_commission -->
              <td>
                <div>
                   {{currency}}{{Number(item.promotion_commission)}}
                </div>
              </td>
           
                <!-- Status -->
              <td>
                <div v-if="item.status === 0 && item.run_status == 'normal'" class="blue"> 
                  Processing
                </div>
                <div v-if="item.status === 1" class="green"> 
                Complete
                </div>
                <div v-if="item.status === 2" class="red"> 
                  Failure
                </div>
              
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



       <!-- 审核-->
      <el-dialog  :visible.sync="DeclineDetails" title="check" class="not-trials-dialog" size="tiny">
          <p>Order number: {{checkDetails.order_number}}</p>
          <p>Review link: </p>
          <p>
            <a href="javasctipt:void(0);" @click="viewApprise(checkDetails.appraise_url)">
              {{checkDetails.appraise_url}}
            </a>
          </p>
          <p>
            <span>Picture: {{checkDetails.appraise.picture}}</span>
            <span>Video:  {{checkDetails.appraise.video}}</span>
          </p>
          <span class="star-label">Star Level: </span>
             <el-rate  class="rate"
                      v-model="checkDetails.appraise.review_star_rating"
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
              <option value="Comment does not exist."  >Comment does not exist.</option>
              <option value="The comment does not correspond to the trial policy.">The comment does not correspond to the trial policy.</option>
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
import { base64Encode, base64Decode } from '@/utils/randomString'
import { parseTime } from '@/utils/date'
import Vue from 'vue'
import { DatePicker } from 'element-ui'
Vue.use(DatePicker)
export default {
  name: 'posted_trials',
  data () {
    return {
      country_id: getStore('country_id') || 1,
      thLists: ['Order date', 'Image', 'Title' , 'Price', 'Applicant', 'Order number', 
        'Bounties', 'Status'
      ],
      trLists: [],
      DeclineDetails: false,
      expiredDetail: false,

      checkDetails: {
        order_number: '',
        appraise_url: '',
        appraise: {
          picture: '',
          vedio: '',
          review_star_rating: '',
        }
      },
      notPassReason:'未查到订单',
      notPassData: false,
      allpage: undefined,
      showItem: 7,
      requestdata: {
        api_token: getToken(),
        user_id: getUserId(),
        p_uid: getUserId(),
        country_id: getStore('country_id') || 1,
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
        product_img: 'https://images-na.ssl-images-amazon.com/images/I/418yzLEdvgL.jpg,https://images-na.ssl-images-amazon.com/images/I/51lBuAXmZML.jpg,https://images-na.ssl-images-amazon.com/images/I/51jh2HmyInL.jpg,https://images-na.ssl-images-amazon.com/images/I/511VWPUroIL.jpg,https://images-na.ssl-images-amazon.com/images/I/51jUpWJHplL.jpg,https://images-na.ssl-images-amazon.com/images/I/41jexd-LtOL.jpg',
        product_title: 'awef',
        product_price: '123',
        discount_rate: '12',
        coupon_code: '12',
        shipping_fee: '12',
        platform_fee: '12',
        refund_price: '12',
        real_fee: '12',
      },
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
    },
    //打开评论链接
    viewApprise (url) {
      if (url.search('http://') >= 0 || url.search('https://') >= 0) {
        window.open(url)
      } else {
        window.open('http://' + url)
      }
    },
    gotoProtectUrl (item) {
      window.open(`/goto/product/trial/${base64Encode(item.trial_id)}/${base64Encode(this.country_id)}`)
    }
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
    height: 28px;
    line-height: 1.21;
    overflow: hidden;
    cursor: pointer;
  }
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
  button {
    .btn-h(60px, 22px,#85ba3b,#85ba3b,#fff);
    line-height: 1.5;
  }
}
.el-dialog--tiny {
  width: 600px;
}

</style>
