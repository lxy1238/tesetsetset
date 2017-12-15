<template>
  <div class="my-trials">
    <div class="title-bottom">My Trials</div>
      <div class="tabs">
        <div class="head-s clearfix">
          <div class="tabs-label" 
              v-for="(item, index) in tabsHead"  
              @click="selectTabs(index)"
              :class="{'active': selected == index, 'last': selected == 3 && selected == index, 'first': selected == 0 && selected == index }"
              >
            {{item}}
          </div>
        </div>
        <div class="tabs-body">
          <div v-if="selected == 0" class="content">
            <div class="wait-order">
              <div class="order" v-for="(item, index) in orderDetails0" :class="{last: index == 2}" v-if="!item.isExpried">
                <img class="order-img" :src="item.trials.product_img.split(',')[0]" alt=""  @click="gotoSuccessDetail(item)">
                <div class="center-content">
                  <div class="order-title" @click="gotoSuccessDetail(item)">{{item.trials.product_title}} </div>
                  <div class="info">
                    <span>
                      <label>Price: </label>
                      <i>{{currency}}{{item.trials.product_price}}</i>
                    </span>
                    <span>
                      <label>Shipping fee: </label>
                      <i>{{currency}}{{item.trials.shipping_fee}}</i>
                    </span>
                    <span>
                      <label>Refund: </label>
                      <i>{{currency}}{{item.trials.refund_price}}</i>
                    </span>
                  </div>
                  <div class="footer">
                    <span class="footer-span">Order number:</span>
                    <input class="footer-input" v-model="item.order_number" ></input>
                    <button type="button" @click="submitOrderNumber(item, $event)" >Save</button>
                  </div>
                </div>
                <div class="right-content">
                  <p> Count down: {{item.countDownData.hours}}:{{item.countDownData.minutes}}:{{item.countDownData.seconds}} </p>
                  <p>If the order number is not submitted within
                    the allowed time, your trial qualification will
                    be canceled.</p>
                </div>
              </div>
              <pagination
               v-if="allpage && allpage != 1"
              :allpage="allpage"
              :show-item="showItem"
              :current="requestdata.page"
              @handlecurrent="test">
              </pagination>
            </div>
          </div>
          <div v-if="selected == 1" class="content">
            <div class="wait-order">
             <div class="order" v-for="(item, index) in orderDetails1" :class="{last: index == 2}">
               <img class="order-img" :src="item.product_img.split(',')[0]" alt="" >
                <div class="center-content">
                  <div class="order-title" >{{item.product_title}} </div>
                  <div class="info">
                    <span>
                      <label>Price: </label>
                      <i>{{currency}}{{item.product_price}}</i>
                    </span>
                    <span>
                      <label>Shipping fee: </label>
                      <i>{{currency}}{{item.shipping_fee}}</i>
                    </span>
                    <span>
                      <label>Refund: </label>
                      <i>{{currency}}{{item.refund_price}}</i>
                    </span>
                  </div>
                  <div class="footer">
                    <span class="footer-span">Order number:</span>
                    <span class="footer-span" v-if="item.Modify">{{item.order_number}}</span>
                    <el-input v-else class="footer-input" v-model="item.order_number"></el-input>

                    <button v-if="item.Modify" type="button" @click="modifyOrderBtn(item)">Modity</button>
                    <button v-else type="button" @click="editOrderNumberBtn(item, $event)">Save</button>
                  </div>
                </div>
                <div class="right-content">
                  <template v-if="item.status === 0 &&  !item.modifyUrl">  
                    <div class="footer">
                      <span class="footer-span">Review URL:</span>
                      <el-input class="footer-input" v-model="item.appraise_url_input"></el-input>
                      <button type="button" @click="submitAppraiseUrl(item)">Save</button>
                    </div>
                    <p>Please upload your review within 30 business days after 
                      ordering and submit the link address for the review, 
                      otherwise your money will not the returned.</p>
                  </template>
                  <template v-else-if="item.status === 0  && item.modifyUrl">
                    <div class="pending">
                      <span class="pending-l">Pending</span>
                    </div>
                    <div class="pending">
                      <a  href="javascript:void(0);" target="_blank" @click="viewApprise(item.appraise_url)">View</a>
                    </div>
                    <div class="pending">
                      <button type="button" @click="modifyUrlBtn(item)">Modity</button>
                    </div>
                  </template>
                  <template v-else>
                    <div class="not-pass">
                      <div class="not-pass-title">Not pass</div>
                      <div class="not-pass-text">No relevant orders 
                        were found</div>
                    </div> 
                    <div class="pending " style="visibility:hidden">
                      <span class="pending-l">Pending</span>
                    </div>
                    <div class="pending">
                      <a  href="#" >View</a>
                    </div>
                    <div class="pending">
                      <button type="button" @click="modifyUrlBtn(item)">Modity</button>
                    </div>
                  </template>
                </div>
              </div>
              <pagination
              v-if="allpage && allpage != 1"
              :allpage="allpage"
              :show-item="showItem"
              @handlecurrent="test">
              </pagination>
            </div>
          </div>
          <div v-if="selected == 2" class="content">
            <div class="wait-order">
              <div class="order" v-for="(item, index) in orderDetails2" :class="{last: index == 2}">
               <img class="order-img" :src="item.product_img.split(',')[0]" alt="">
                <div class="center-content">
                  <div class="order-title">{{item.product_title}} </div>
                  <div class="info">
                    <span>
                      <label>Price: </label>
                      <i>{{currency}}{{item.product_price}}</i>
                    </span>
                    <span>
                      <label>Shipping fee: </label>
                      <i>{{currency}}{{item.shipping_fee}}</i>
                    </span>
                    <span>
                      <label>Refund: </label>
                      <i>{{currency}}{{item.refund_price}}</i>
                    </span>
                  </div>
                   <div class="footer">
                    <span class="footer-span">Order number:</span>
                    <span class="footer-span" v-if="true">{{item.order_number}}</span>
                  </div>
                </div>
                <div class="right-content">
                  <div class="pending complete complete-left">
                      <div class="complete-text">complete</div>
                      <div class="complete-refunded">Refunded to balance</div>
                  </div>
                  <div class="pending complete complete-right">
                    <el-rate  class="rate"
                      v-model="value5"
                      disabled
                      text-color="#ff9900"
                      >
                    </el-rate>
                    <div class="picture-video">
                      <span class="picture">Picture: 3</span>
                      <span class="video">Video: 1</span>
                    </div>
                    <div class="view">
                      <a href="">View</a>
                    </div>
                  </div>
                </div>
              </div>
              <pagination
                v-if="allpage && allpage != 1"
                :allpage="allpage"
                :show-item="showItem"
                @handlecurrent="test">
              </pagination>
            </div>
          </div>
          <div v-if="selected == 3" class="content">
            <div class="wait-order">
              <div class="order" v-for="(item, index) in orderDetails3" :class="{last: index == 2}">
                <img class="order-img" :src="item.product_img.split(',')[0]" alt="">
                <div class="center-content">
                 <div class="order-title">{{item.product_title}} </div>
                  <div class="info">
                    <span>
                      <label>Price: </label>
                      <i>{{currency}}{{item.product_price}}</i>
                    </span>
                    <span>
                      <label>Shipping fee: </label>
                      <i>{{currency}}{{item.shipping_fee}}</i>
                    </span>
                    <span>
                      <label>Refund: </label>
                      <i>{{currency}}{{item.refund_price}}</i>
                    </span>
                  </div>
                  <div class="footer">
                    <span class="footer-span">Order number:</span>
                    <span class="footer-span" v-if="true">{{item.order_number}}</span>
                  </div>
                </div>
                <div class="right-content expired">
                  <p class="expired-top">Expired</p>
                  <p class="expired-text">If fail to upload review in time,<br />
you will exceed the time limit of task.</p>
                </div>
              </div>
              <pagination
               v-if="allpage && allpage != 1"
              :allpage="allpage"
              :show-item="showItem"
              @handlecurrent="test">
              </pagination>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import pagination from '@/components/page_index_coupons/pagination.vue'
import { getToken, getUserId } from '@/utils/auth'
import { getTimeDetail } from '@/utils/date.js'
import { getStore } from '@/utils/utils'
import { base64Encode } from '@/utils/randomString.js'
export default {
  name: 'my_trials',
  components: {
    pagination
  },
  data () {
    return {
      country_id: getStore('country_id') || 1,
      tabsHead: [
        'Waiting for Order', 'Waiting for Review', 'Completed', 'Expired'
      ],
      selected: 0,
      allpage: undefined,
      showItem: 7,
      value5: 3.6,
      isExpried: false,
      timer: null,
      countDownData: {},
      orderDetails0: [],
      orderDetails1: [],
      orderDetails2: [],
      orderDetails3: [],
      reqSuccedDetailsData: {
        api_token: getToken(),
        user_id: getUserId(),
        country_id: getStore('country_id') || 1,
      },
      reqAddOrderData: {
        api_token: getToken(),
        user_id: getUserId(),
        id: '',
        order_number: ''
      },
      reqReviewData: {
        api_token: getToken(),
        user_id: getUserId(),
        country_id: getStore('country_id') || 1,
        page: 1,
        page_size: 3
      }

    }
  },
  computed: {
    currency () {
      return getStore('currency') || '$'
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    init () {
      this.gotoPanel()
      this.getWaitingData()
      this.getReviewInfo()
      this.getCompleteInfo()
      this.getExpiredInfo()
    },
    initData () {
      
    },
    //获取第一个列表信息
    getWaitingData () {
      this.$api.userApplySucced(this.reqSuccedDetailsData).then(res => {
        this.orderDetails0 = res.data
        for (let i of this.orderDetails0) {
          let expiry_time = getTimeDetail(i.expiry_time)
          i.countDownData = expiry_time
          i.countDown = i.expiry_time
          this.countDown(i)
        }
      }).catch(err => { 
        console.log(err)
      })
    },
    //定时器，时间倒计时
    countDown (i) {
      this.timer = setInterval(() => {
        let expiry_time1 = getTimeDetail(i.countDown)
        i.countDownData = expiry_time1
        this.refresh(this.orderDetails0)
        if (expiry_time1.day == 0 && expiry_time1.hours == 0 && expiry_time1.minutes == 0 && expiry_time1.seconds == 0) {
          clearInterval(this.timer)
          i.isExpried = true
        }
      }, 1000)
    },
    //提交订单 号码
    submitOrderNumber (item, e) {
      e.target.disabled = true
      this.reqAddOrderData.id = item.id
      this.reqAddOrderData.order_number = item.order_number
      if (!this.reqAddOrderData.order_number) {
        return
      }
      this.$api.userAddOrderNumber(this.reqAddOrderData).then(res => {
        if (res.code === 200) {
          this.selected = 1
          this.init()
        }
        e.target.disabled = false
      }).catch(() => {
        e.target.disabled = false
      })
    },
    //review
    getReviewInfo () {
      this.$api.userTrialOrder(this.reqReviewData).then(res => {
        this.orderDetails1 = res.data.data
        for (let i of this.orderDetails1) {
          i.Modify = true
          if (i.appraise_url) {
            i.modifyUrl = true
            i.appraise_url_input = i.appraise_url
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },

    //修改按钮变成save 按钮
    modifyOrderBtn (item) {
      item.Modify = false
      this.refresh(this.orderDetails1)
    },
    //修改订单号
    editOrderNumberBtn (item, e) {
      e.target.disabled = true
      this.reqAddOrderData.order_id = item.id
      this.reqAddOrderData.order_number = item.order_number
      this.$api.userOrderNumber(this.reqAddOrderData).then(res => {
        console.log(res)
        if (res.code === 200) {
          e.target.disabled = false
          this.getReviewInfo()
        }
      }).catch(() => {
        e.target.disabled = false
      })
    },

    //提交review url
    submitAppraiseUrl (item) {
      if (!item.appraise_url_input) {
        return
      }
      let reqData =  {
        api_token: getToken(),
        user_id: getUserId(),
        order_id: '',
        appraise_url: '',
      }
      reqData.order_id = item.id
      reqData.appraise_url = item.appraise_url_input
      console.log(reqData)
      this.$api.userAppraiseUrl(reqData).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.getReviewInfo()
        }
      })
    },

    //点击modify按钮
    modifyUrlBtn (item) {
      item.modifyUrl = false
      this.refresh(this.orderDetails1)
    },  
    viewApprise (url) {
      if (url.search('http://') < 0) {
        window.open('http://' + url)
      }
      window.open(url)
    },
    
    //userApplyFinish  完成详情展示
    getCompleteInfo () {
      this.$api.userApplyFinish(this.reqSuccedDetailsData).then(res => {
        this.orderDetails2 = res.data.data
      })
    },

    //userApplyFinish  订单过期信息展示
    getExpiredInfo () {
      this.$api.userApplyExpired(this.reqSuccedDetailsData).then(res => {
        this.orderDetails3 = res.data.data
      })
    },
    //进入页面之后判断跳转到哪个页面
    gotoPanel () {
      if (this.$route.query.status) {
        this.selectTabs(parseInt(this.$route.query.status))
      }
    },

    selectTabs (index) {
      this.selected = index
    },
    refresh (array) {
      array.push(0)
      array.pop()
    } ,
    test (i) {
      console.log(i)
    },
    gotoSuccessDetail (item) {
      
      this.$router.push({ path: '/trialsDetails/' + base64Encode(item.trial_id) + '/' + base64Encode(this.country_id) })

      console.log(item)
    }
  }
}
</script>

<style lang="less">
@import url('../../../styles/mixin.less');
   .tabs {
     height: 730px;
     border: 1px solid #e1e1e1;
      .head-s {
        font-size: 1.33rem;
        height: 72px;
        background: #f9f9f9;
        border-bottom: 1px solid #e1e1e1;
        border-left: 1px solid #e1e1e1;
        margin-left: -1px;
        .tabs-label {
          width: 25%;
          height: 100%;
          float: left;
          text-align: center;
          line-height: 72px;
          cursor: pointer;
          color: #808080;
          &:hover {
            color: #808080;
          }
          &.active {
            height: 72px;
            color: #1a1a1a;
            background: white;
            border-left: 1px solid #e1e1e1;
            border-right: 1px solid #e1e1e1;
            &.last {
              border-right: none;
            }
            &.first {
              border-left: none;
            }
          }
        }
      }
      .tabs-body {
        .wait-order {
          .order {
            position: relative;
            height: 190px;
            border-bottom: 1px solid #e1e1e1;
            padding: 38px 0 38px 160px;
            &.last {
              border-bottom: none;
            }
            .order-img {
              position: absolute;
              top: 38px;
              left: 15px;
              width: 120px;
              height: 108px;
            }
            .center-content {
              display: inline-block;
              margin-left: 25px;
              width: 44%;
              height: 118px;
              .order-title {
                color: #333;
                font-size: 12px;
                height: 24px;
                overflow: hidden;
                margin-bottom: 20px;
                width: 80%;
              }
              .info {
                margin-bottom: 20px;
                span {
                  margin-right: 10px;
                  font-size: 0.78rem;
                  label {
                    color: #808080;
                  }
                }
              }
              .footer {
                .footer-span {
                  color: #333;
                  font-size: 0.89rem;
                }
                .footer-input {
                  width:40%;
                  .el-input__inner {
                    height: 24px;
                  }
                }
                button {
                  .btn-h(4rem, 24px, #82b838, #82b838, #fff);
                  font-size: 0.78rem;
                  line-height: 1.43;
                  &:active {
                    background: darken(#82b838, 10%);
                    border-color: darken(#82b838, 10%);
                  }
                }

              }
            }
            .right-content {
              position: absolute;
              top: 38px;              
              right: 10px;
              width: 36%;
              height: 118px;
              p {
                strong {
                  color: #1a1a1a;
                }
                color: #898989;
                font-size: 0.83rem;
              }
              .footer {
                .footer-span {
                  color: #333;
                  font-size: 0.89rem;
                }
                .footer-input {
                  width:40%;
                  .el-input__inner {
                    height: 24px;
                  }
                }
                button {
                  .btn-h(4rem, 24px, #82b838, #82b838, #fff);
                  font-size: 0.78rem;
                  line-height: 1.43;
                  &:active {
                    background: darken(#82b838, 10%);
                    border-color: darken(#82b838, 10%);
                  }
                }
              }
              .pending {
                display: inline-block;
                position: relative;
                top: 47px;
                color: #88bb3a;
                width: 32%;
                text-align: center;
                button {
                  .btn-h(4rem, 24px, #82b838, #82b838, #fff);
                  font-size: 0.78rem;
                  line-height: 1.43;
                  &:active {
                    background: darken(#82b838, 10%);
                    border-color: darken(#82b838, 10%);
                  }
                }
                &.complete {
                  width: 46%;
                  .complete-text {
                    font-size: 0.88rem;
                    margin-bottom: 5px;
                  }
                  .complete-refunded {
                    color: #8a8a8a;
                    font-size: 0.78rem;
                  }
                  &.complete-left {
                    position: relative;
                    top: -8px;
                  }
                  &.complete-right {
                    position: relative;
                    top: 11px;
                    .rate {
                      margin-bottom: 15px;
                    }
                    .picture-video {
                      margin-bottom: 15px;
                      span {
                        color: #666;
                        font-size: 0.78rem;
                        &.picture {
                          margin-right: 15px;
                        }
                      }
                    }
                  }
                }
              }
              .not-pass {
                position: absolute;
                display: inline-block;
                width: 6rem;
                top: 34px;
                text-align: center;
                left: 0;
                font-size: 0.89rem;
                .not-pass-title {
                  color: #ec5b1c;
                }
                .not-pass-text {
                  color: #8a8a8a;
                }
              }

              &.expired {
                width: 28%;
                text-align: center;
                .expired-top {
                  color: #ec5b1c;
                  font-size: 0.88rem;
                  margin-bottom: 8px;
                }
                .expired-text {
                  color: #8a8a8a;
                  font-size: 0.78rem;
                }
              }
            }
          }
        }
        

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
  }
</style>
