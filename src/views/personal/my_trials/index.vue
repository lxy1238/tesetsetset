<template>
  <div class="my-trials">
    <div class="title-bottom" v-title="'My Trials'">My Trials
      <router-link class="link" to="/about/center/policy-trials">Trials Policy</router-link>
    </div>
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
                <img class="order-img pointer" :src="item.trials.product_img.split(',')[0]" alt=""  @click="gotoSuccessDetail(item)">
                <div class="center-content">
                  <div class="order-title pointer" @click="gotoSuccessDetail(item)">{{item.trials.product_title}} </div>
                  <div class="info">
                    <span>
                      <label>List price: </label>
                      <i class="free-price">{{currency}}{{item.trials.product_price}}</i>
                    </span>
                    <span v-if="item.trials.shipping_fee != 0">
                      <label>Shipping fee: </label>
                      <i class="free-price">{{currency}}{{item.trials.shipping_fee}}</i>
                    </span>
                    <span v-else>
                       <label for="">Free shipping</label>
                    </span>
                    <div class="trials-price-all">
                      <span>
                        <label >Trial price: </label>
                        <i class="free" v-if="sub(item.trials.refund_price, item.trials.product_price).toFixed(2) >= 0">Free</i>
                        <i class="trials-price" v-else>{{currency}}{{sub(item.trials.product_price,item.trials.refund_price).toFixed(2)}}</i>
                      </span>
                      <span>
                        <label class="refund-amount">Refund amount: </label>
                        <i class="merchant-reward">{{currency}}{{add(item.trials.refund_price, item.trials.shipping_fee).toFixed(2)}}</i>
                      </span>
                    </div>
                  </div>
                  <div class="footer">
                    <span class="footer-span">Order number:</span>
                    <el-input class="footer-input" v-model="item.order_number" @keyup.enter.native="orderBtnSubmit(item)" ></el-input>
                    <el-button class="order-number" type="button" @click="submitOrderNumber(item)" :loading="orderBtnLoading">Save</el-button>
                    <el-button class="order-number goto-platform" type="button" @click="gotoPlatform(item)" >Go to Amazon</el-button>
                    <div class="red" v-if="!item.order_number && item.hasOrderNumber">Please enter the order number.</div>
                  </div>
                </div>
                <div class="right-content">
                  <p><i class="iconfont icon-icon-test"></i> Count down: {{item.countDownData.hours}}:{{item.countDownData.minutes}}:{{item.countDownData.seconds}} </p>
                  <p>If the order number is not submitted within
                    the allowed time, your trial qualification will
                    be canceled.</p>
                </div>
              </div>
              <pagination
               v-if="allpage && allpage != 1"
              :allpage="allpage"
              :show-item="showItem"
              :current="reqSuccedDetailsData0.page"
              @handlecurrent="gotoPage0">
              </pagination>
            </div>
          </div>
          <div v-if="selected == 1" class="content">
            <div class="wait-order">
             <div class="order" v-for="(item, index) in orderDetails1" :class="{last: index == 2}">
               <img class="order-img pointer" :src="item.product_img.split(',')[0]" alt="" >
                <div class="center-content">
                  <div class="order-title pointer" >{{item.product_title}} </div>
                   <div class="info">
                    <span>
                      <label>List price: </label>
                      <i class="free-price">{{currency}}{{item.product_price}}</i>
                    </span>
                    <span v-if="item.shipping_fee != 0">
                      <label>Shipping fee: </label>
                      <i class="free-price">{{currency}}{{item.shipping_fee}}</i>
                    </span>
                    <span v-else>
                       <label for="">Free shipping</label>
                    </span>
                    <div class="trials-price-all">
                      <span>
                        <label >Trial price: </label>
                        <i class="free" v-if="sub(item.refund_price, item.product_price).toFixed(2) >= 0">Free</i>
                        <i class="trials-price" v-else >{{currency}}{{add(item.product_price,item.refund_price).toFixed(2)}}</i>
                      </span>
                      <span>
                        <label class="refund-amount">Refund amount: </label>
                        <i class="merchant-reward">{{currency}}{{add(item.refund_price, item.shipping_fee).toFixed(2)}}</i>
                      </span>
                    </div>
                  </div>
                  <div class="footer">
                    <span class="footer-span">Order number:</span>
                    <span class="footer-span" v-if="item.Modify">{{item.order_number}}</span>
                    <el-input v-else class="footer-input" v-model="item.order_number" @keyup.enter.native="editOrderSubmit(item)"></el-input>

                    <button v-if="item.Modify" class="order-number" type="button" @click="modifyOrderBtn(item)">Edit</button>
                    <el-button v-else type="button" class="order-number" :loading="saveLoading" @click="editOrderNumberBtn(item)">Save</el-button>
                    <div class="red" v-if="!item.order_number">Please enter the order number.</div>
                  </div>
                </div>
                <div class="right-content">
                  <template v-if="!item.modifyUrl">  
                    <div class="footer">
                      <span class="footer-span">Review URL:</span>
                      <el-input class="footer-input" v-model="item.appraise_url_input" @keyup.enter.native="urlSubmit(item)"></el-input>
                      <el-button type="button" class="save-btn" @click="submitAppraiseUrl(item)" :loading="urlSaveLoading">Save</el-button>
                       <div class="red" v-if="!item.appraise_url_input && item.notHasInputUrl">Please enter the review URL.</div>
                    </div>
                    <p>Please upload your review within 15 days after ordering and submit the link address for the review, otherwise your money can not refund to you.</p>
                  </template>
                  <template v-else-if="item.status === 0  && item.modifyUrl">
                    <div class="pending">
                      <span class="pending-l">Pending</span>
                    </div>
                    <div class="pending">
                      <a  href="javascript:void(0);" target="_blank" @click="viewApprise(item.appraise_url)" class="link">View Review</a>
                    </div>
                    <div class="pending">
                      <button type="button" @click="modifyUrlBtn(item)">Edit</button>
                    </div>
                  </template>
                  <template v-else>
                    <div class="not-pass">
                      <div class="not-pass-title">Reject</div>
                      <div class="not-pass-text">{{item.censor_content}}</div>
                    </div> 
                    <div class="pending " style="visibility:hidden">
                      <span class="pending-l">Pending</span>
                    </div>
                    <div class="pending">
                      <a  href="#" >View Review</a>
                    </div>
                    <div class="pending">
                      <button type="button" @click="modifyUrlBtn(item)">Edit</button>
                    </div>
                  </template>
                </div>
              </div>
              <pagination
              v-if="allpage && allpage != 1"
              :allpage="allpage"
              :show-item="showItem"
              :current="reqReviewData.page"
              @handlecurrent="gotoPage1">
              </pagination>
            </div>
          </div>
          <div v-if="selected == 2" class="content">
            <div class="wait-order">
              <div class="order" v-for="(item, index) in orderDetails2" :class="{last: index == 2}">
               <img class="order-img pointer" :src="item.product_img.split(',')[0]" alt="">
                <div class="center-content">
                  <div class="order-title pointer">{{item.product_title}} </div>
                   <div class="info">
                    <span>
                      <label>List price: </label>
                      <i class="free-price">{{currency}}{{item.product_price}}</i>
                    </span>
                    <span v-if="item.shipping_fee != 0">
                      <label>Shipping fee: </label>
                      <i class="free-price">{{currency}}{{item.shipping_fee}}</i>
                    </span>
                    <span v-else>
                       <label for="">Free shipping</label>
                    </span>
                    <div class="trials-price-all">
                      <span>
                        <label >Trial price: </label>
                        <i class="free" v-if="sub(item.refund_price, item.product_price).toFixed(2) >= 0">Free</i>
                        <i class="trials-price" v-else >{{currency}}{{sub(item.product_price,item.refund_price).toFixed(2)}}</i>
                      </span>
                      <span>
                        <label class="refund-amount">Refund amount: </label>
                        <i class="merchant-reward">{{currency}}{{add(item.refund_price, item.shipping_fee).toFixed(2)}}</i>
                      </span>
                    </div>
                  </div>
                  <div class="footer">
                    <span class="footer-span">Order number:</span>
                    <span class="footer-span" v-if="true">{{item.order_number}}</span>
                  </div>
                </div>
                <div class="right-content">
                  <div class="pending complete complete-left">
                      <div class="complete-text">Completed</div>
                      <div class="complete-refunded">Refunded to balance</div>
                  </div>
                  <div class="pending complete complete-right">
                    <!-- <el-rate  class="rate"
                      v-model="value5"
                      disabled
                      text-color="#ff9900"
                      >
                    </el-rate>
                    <div class="picture-video">
                      <span class="picture">Picture: 3</span>
                      <span class="video">Video: 1</span>
                    </div> -->
                    <div class="view">
                      <a href="javascript:void(0);"@click="viewApprise(item.appraise_url)" class="link">View Review</a>
                    </div>
                  </div>
                </div>
              </div>
              <pagination
                v-if="allpage && allpage != 1"
                :allpage="allpage"
                :show-item="showItem"
                :current="reqSuccedDetailsData2.page"
                @handlecurrent="gotoPage2">
              </pagination>
            </div>
          </div>
          <div v-if="selected == 3" class="content">
            <div class="wait-order">
              <div class="order" v-for="(item, index) in orderDetails3" :class="{last: index == 2}">
                <img class="order-img pointer" :src="item.product_img.split(',')[0]" alt="">
                <div class="center-content">
                 <div class="order-title pointer">{{item.product_title}} </div>
                  <div class="info">
                    <span>
                      <label>List price: </label>
                      <i class="free-price">{{currency}}{{item.product_price}}</i>
                    </span>
                    <span v-if="item.shipping_fee != 0">
                      <label class="free-price">Shipping fee: </label>
                      <i>{{currency}}{{item.shipping_fee}}</i>
                    </span>
                    <span v-else>
                       <label for="">Free shipping</label>
                    </span>
                    <div class="trials-price-all">
                      <span>
                        <label >Trial price: </label>
                       <i class="free" v-if="sub(item.refund_price, item.product_price).toFixed(2) >= 0">Free</i>
                        <i class="trials-price" v-else >{{currency}}{{sub(item.product_price,item.refund_price).toFixed(2)}}</i>
                      </span>
                      <span>
                        <label class="refund-amount">Refund amount: </label>
                        <i class="merchant-reward">{{currency}}{{add(item.refund_price, item.shipping_fee).toFixed(2)}}</i>
                      </span>
                    </div>
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
              :current="reqSuccedDetailsData3.page"
              @handlecurrent="gotoPage3">
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
import { validateURL } from '@/utils/validate.js'
import { NumAdd, NumSub } from '@/utils/calculate'
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
      saveLoading: false,
      orderBtnLoading: false,
      urlSaveLoading: false,
      timer: null,
      countDownData: {},
      orderDetails0: [],
      orderDetails1: [],
      orderDetails2: [],
      orderDetails3: [],
      reqSuccedDetailsData0: {
        country_id: getStore('country_id') || 1,
        api_token: getToken(),
        user_id: getUserId(),
        page: 1,
        page_size: 3
      },
      reqSuccedDetailsData2: {
        country_id: getStore('country_id') || 1,
        api_token: getToken(),
        user_id: getUserId(),
        page: 1,
        page_size: 3
      },
      reqSuccedDetailsData3: {
        country_id: getStore('country_id') || 1,
        api_token: getToken(),
        user_id: getUserId(),
        page: 1,
        page_size: 3
      },
      reqAddOrderData: {
        api_token: getToken(),
        user_id: getUserId(),
        id: '',
        order_number: ''
      },
      reqReviewData: {
        country_id: getStore('country_id') || 1,
        api_token: getToken(),
        user_id: getUserId(),
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
      this.$api.userApplySucced(this.reqSuccedDetailsData0).then(res => {
        this.orderDetails0 = res.data
        for (let i of this.orderDetails0) {
          i.leftTime = i.expiry_time - res.timestamp
          let expiry_time = getTimeDetail(i.leftTime)
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
        i.leftTime--
        let expiry_time1 = getTimeDetail(i.leftTime)
        i.countDownData = expiry_time1
        this.refresh(this.orderDetails0)
        if (expiry_time1.day == 0 && expiry_time1.hours == 0 && expiry_time1.minutes == 0 && expiry_time1.seconds == 0) {
          clearInterval(this.timer)
          i.isExpried = true
        }
      }, 1000)
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

    //userApplyFinish  完成详情展示
    getCompleteInfo () {
      this.$api.userApplyFinish(this.reqSuccedDetailsData2).then(res => {
        this.orderDetails2 = res.data.data
      })
    },

    //userApplyFinish  订单过期信息展示
    getExpiredInfo () {
      this.$api.userApplyExpired(this.reqSuccedDetailsData3).then(res => {
        this.orderDetails3 = res.data.data
      })
    },
   
    //提交订单 号码
    submitOrderNumber (item) {
      if (!item.order_number) {
        item.hasOrderNumber = true
        return
      } else {
        item.hasOrderNumber = false
      }
      this.orderBtnLoading = true
      this.reqAddOrderData.id = item.id
      this.reqAddOrderData.order_number = item.order_number
      if (!this.reqAddOrderData.order_number) {
        return
      }
      this.$api.userAddOrderNumber(this.reqAddOrderData).then(res => {
        if (res.code === 200) {
          this.init()
          this.selected = 1
        }
        this.orderBtnLoading = false
      }).catch(() => {
        this.orderBtnLoading = false
      })
    },

    //enter 提交订单
    orderBtnSubmit (item) {
      this.submitOrderNumber(item)
    },
 
    //修改按钮变成save 按钮
    modifyOrderBtn (item) {
      item.Modify = false
      this.refresh(this.orderDetails1)
    },
    //修改订单号
    editOrderNumberBtn (item) {
      if (!item.order_number) {
        return
      }
      this.saveLoading = true
      this.reqAddOrderData.order_id = item.id
      this.reqAddOrderData.order_number = item.order_number
      this.$api.userOrderNumber(this.reqAddOrderData).then(res => {
        if (res.code === 200) {
          this.saveLoading = false
          item.Modify = true
          this.orderDetails1.push(1)
          this.orderDetails1.pop()
        }
      }).catch(() => {
        this.saveLoading = false
      })
    },

    editOrderSubmit (item) {
      this.editOrderNumberBtn(item)
    },

    //提交review url
    submitAppraiseUrl (item) {
      
      if (!item.appraise_url_input) {
        item.notHasInputUrl = true
        this.refresh(this.orderDetails1)
        return
      } else {
        item.notHasInputUrl = false
      }
      let reqData =  {
        api_token: getToken(),
        user_id: getUserId(),
        order_id: '',
        appraise_url: '',
      }
      reqData.order_id = item.id
      reqData.appraise_url = item.appraise_url_input
      this.urlSaveLoading = true
      this.$api.userAppraiseUrl(reqData).then(res => {
        this.urlSaveLoading = false        
        if (res.code === 200) {
          item.status = 0
          item.modifyUrl = reqData.appraise_url
          item.appraise_url = reqData.appraise_url
          this.orderDetails1.push(1)
          this.orderDetails1.pop()
        }
      }).catch(() => {
        this.urlSaveLoading = false
      })
    },
    urlSubmit (item) {
      this.submitAppraiseUrl(item)
    },
    //点击modify按钮
    modifyUrlBtn (item) {
      item.modifyUrl = false
      this.refresh(this.orderDetails1)
    }, 

    //打开评论链接
    viewApprise (url) {
      if (url.search('http://') >= 0 || url.search('https://') >= 0) {
        window.open(url)
      } else {
        window.open('http://' + url)
      }
    },
    
   
    //进入页面之后判断跳转到哪个页面
    gotoPanel () {
      if (this.$route.query.status) {
        this.selectTabs(parseInt(this.$route.query.status))
      }
      if (this.$route.query.id) {
        this.reqSuccedDetailsData2.order_id = this.$route.query.id
      }
    },

    selectTabs (index) {
      this.selected = index
    },
    refresh (array) {
      array.push(0)
      array.pop()
    } ,
    //翻页
    gotoPage0 (i) {
      this.reqSuccedDetailsData0.page = i
      this.getWaitingData()
    },
    gotoPage1 (i) {
      this.reqReviewData.page = i
      this.getReviewInfo()
    },
    gotoPage2 (i) {
      this.reqSuccedDetailsData2.page = i
      this.getCompleteInfo()
    },
    gotoPage3 (i) {
      this.reqSuccedDetailsData3.page = i
      this.getExpiredInfo()
    },
    
    gotoSuccessDetail (item) {
      this.$router.push({ path: '/trialsDetails/' + base64Encode(item.trial_id) + '/' + base64Encode(this.country_id) })
    },
    gotoPlatform (item) {
      window.open( '/goto/product/trial/' + base64Encode(item.trial_id) + '/' + base64Encode(this.country_id) )
    },

    add (a, b) {
      return NumAdd(a, b)
    },
    sub (a, b) {
      return NumSub(a, b)
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
        font-size: 16px;
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
              left: 30px;
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
                font-size: 13px;
                font-weight: 700;
                line-height: 1.21;
                height: 31px;
                overflow: hidden;
                margin-bottom: 20px;
                width: 80%;
              }
              .info {
                margin-bottom: 10px;
                span {
                  margin-right: 10px;
                  font-size: 0.78rem;
                  label {
                    color: #808080;
                  }
                }
                .trials-price-all {
                  margin-top: 5px;
                  .refund-amount {
                    color: #808080;
                  }
                  .merchant-reward {
                    color: #333;
                    font-weight: 700;
                  }
                }
                .free-price {
                  text-decoration: line-through;
                }
                .free {
                  // font-weight: 700;
                }
              }
              .footer {
  
                position: relative;
                height: 22px;
                line-height: 22px;
                .footer-span {
                  color: #333;
                  font-size: 13px;
                }
                .footer-input {
                  width:40%;
                  .el-input__inner {
                    height: 24px;
                  }
                }
                .order-number {
                  position: absolute;
                  top: 0;
                  margin-left: 5px;
                  z-index: 10;
                  &.goto-platform {
                      .btn-h(120px, 24px, #82b838, #82b838, #fff);
                      font-size: 13px;
                      margin-left: 80px;
                  }
                }
                button {
                  .btn-h(70px, 24px, #82b838, #82b838, #fff);
                  font-size: 13px;
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
              z-index: 1;
              p {
                z-index: -1;
                strong {
                  color: #1a1a1a;
                }
                color: #898989;
                font-size: 13px;
              }
              .footer {
                .red {
                  position: relative;
                  top: -4px;
                }
                position: relative;
                height: 22px;
                line-height: 22px;
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
                .save-btn {
                  position: absolute;
                  top: 0;
                  margin-left: 5px;
                }
                button {
                  .btn-h(4rem, 24px, #82b838, #82b838, #fff);
                  font-size: 13px;
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
                button {
                  .btn-h(4rem, 24px, #82b838, #82b838, #fff);
                  font-size: 13px;
                  line-height: 1.43;
                  &:active {
                    background: darken(#82b838, 10%);
                    border-color: darken(#82b838, 10%);
                  }
                }
                &.complete {
                  width: 46%;
                  text-align: center;
                  .complete-text {
                    font-size: 13px;
                    margin-bottom: 5px;
                  }
                  .complete-refunded {
                    color: #8a8a8a;
                    font-size: 13px;
                  }
                  &.complete-left {
                    position: relative;
                  }
                  &.complete-right {
                    position: relative;
                    top: 38px;
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
                top: 38px;
                text-align: center;
                left: 0;
                font-size: 13px;
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
                  font-size: 13px;
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
  .title-bottom {
    .link {
      float: right;
      margin-top: 10px;
      font-size: 16px;
    }
  }
</style>
