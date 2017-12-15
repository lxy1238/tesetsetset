<template>
  <div class="page-index " v-if="trialDetail.product_price" v-title="trialDetail.product_title">
    <div class="pages-content clearfix">
      <explain :is-active="2"></explain>
      <div class="home-content" >
        <div class="details" v-if="trialDetail.product_price">
          <div class="pro-img">
            <img class="img" :src="trialDetail.product_img.split(',')[0]" alt="">
          </div>
          <div class="details-price">
            <div class="title" :title="trialDetail.product_title" @click="gotoAmazon(trialDetail.product_url)">{{trialDetail.product_title}}</div>
            <div class="time"> Count down: {{countDownData.hours}}:{{countDownData.minutes}}:{{countDownData.seconds}} <span class="red" v-if="isExpired">已过期</span></div>
            <div class="code-price">
              <div class="price">Price: {{currency}} {{trialDetail.product_price}} </div>
              <div class="price">Shipping fee: {{currency}} {{trialDetail.shipping_fee}} </div>
              <div class="refund-price">Refund: <span >{{currency}} {{trialDetail.refund_price}}</span> </div>
              <div class="reminder">Please place an order within 24 hours and complete the payment. 
                                    And timely upload your order number, or your trial qualification 
                                    will be canceled.</div>
            </div>
            <div class="footer">
              <button class="to-amazon" @click="gotoAmazon(trialDetail.product_url)">
                Go To Amazon 
              </button>
              <div class="right">
                <div class="top" @click="flagCoupon"><i class="iconfont icon-xiaohongqi"></i> flow this trials</div>
                <select name="" id="" v-model="selected" @change="selectProblem"  v-if="isFlagCoupon">
                <option v-for="(item, index) in options" :value="item" :label="item" >{{item}}</option>
              </select>
              </div>
               <div class="inline-b question" v-if="selected !== 'Choose reason'">
                  <div class="wrong"><span>What’s wrong with this deal?</span></div>
                  <div class="submit">
                    <input type="text" v-model="addProblemData.content">
                    <button type="button" @click="addProblemSubmit"><span>Submit</span></button>
                    <div class=" error" v-if="!addProblemData.content && addProblemData.menu">Please describe the problem</div>
                  </div>
                </div>
            </div>
            <img class="amazon" src="../../assets/amazon.png" alt="">
          </div>
        </div>
        <div class="submit-order-number" v-if="!isExpired">
          <h3>Submit order number</h3>
          <div class="submit">
            <span>Order number: </span>
            <input class="input" type="text" v-model="reqAddOrderData.order_number" />
            <button class="submit-btn" @click="submitOrderNumber($event)" ref="submitBtn">Confirm</button>
          </div>
          <div>Please confirm that the order number is valid and the transaction is successful, 
            otherwise your trial qualification will be canceled.</div>
        </div>
        <div class="precautions">
          <div class="precautions-s">
            <h3>Precautions</h3>
            <div class="content">
              <div>1. After the success of application, please place an order and submit the order number to our website.</div>
              <div>2. Please upload evaluation of the product within 7-15 days after receiving the product.</div>
              <div>3. We gently recommend you to choose credit card to pay. </div>
              <div>4. If you have any problems in the course of evaluation, please contact us in time.</div>
              <div>5. You will receive a refund in 3-5 days after your evaluation passing the review.</div>
              <div>6. You are responsible if your operation is not in accordance with our requirements.</div>
            </div>
          </div>
          <div class="description">
            <h3>Description of Trial</h3>
             <div class="content">
                <div>1. We strictly prohibit sellers to manipulate the evaluation through our website.</div>
                <div>2. The products provided by sellers must meet the requirements of our website.</div>
                <div>3. Sellers should stick to integrity management and we will check the authenticity of the sellers thoroughly.</div>
                <div>4. The trial products must comply with local laws and regulations.</div>
                <div>5. All products are provided by the sellers directly and sellers can not ask the reviewer to praise their products. We will close the </div>
                <div>seller’s account if any illegal behavior is discovered.</div>
                <div>6. Reviewers who participate in the trial process must ensure that their using evaluation is real and objective.</div>
                <div>7. Reviewers should not apply for multiple trial tasks at the same time. You must complete one task before applying for the next one.</div>
            </div>
          </div>
          <div class="rights-statement">
            <h3>Rights Statement</h3>
             <div class="content">
               <div class="text">
             All the products are provided by sellers directly and 
             we completely forbid all products from non-formal channel 
             source. This site only provides users with channels and 
             platform of information exchange. The use experience will 
             vary because the products and the users’ individual differences 
             are different. If you have any discomfort during the usage of the product, 
             please immediately stop using and contact the seller directly. This site is not 
             responsible for any flaws, fault, responsibility and disputes caused by products and services.
                 
               </div>

            </div>
          </div>
        </div> 
        <div class="footer">

        </div>
      </div>
     
    </div>
   
  </div>
</template>

<script>
import couponsPro from '@/components/page_index_coupons/image_product.vue'
import pagination from '@/components/page_index_coupons/pagination.vue'
import explain from '@/components/trials/explain.vue'
import { getToken, getUserId } from '@/utils/auth'
import { getStore } from '@/utils/utils'
import { getTimeDetail } from '@/utils/date.js'
import { base64Decode } from '@/utils/randomString.js'
export default {
  name: 'page_index',
  data () {
    return {
      trialDetail: {},
      countDownData: {},
      isExpired: false,
      options: [
        'Choose reason',
        'Dead deadl',
        'Duplicate',
        'Bad link',
        'Spam',
        'Inaccurate',
        'No value',
        'Alive again'
      ],
      selected: 'Choose reason',
      isFlagCoupon: false,
      reqSuccedDetailsData: {
        api_token: getToken(),
        user_id: getUserId(),
        country_id: getStore('country_id') || 1,
        trial_id: '',
      },
      reqAddOrderData: {
        api_token: getToken(),
        user_id: getUserId(),
        id: '',
        order_number: ''
      },
      addProblemData: {
        api_token: getToken(),
        user_id: getUserId(),
        product_id: '',
        menu: '',
        title: '',
        content: ''

      },
      timer: null,
    }
  },
  components: {
    couponsPro,
    pagination,
    explain
  },
  computed: {
    currency () {
      return getStore('currency') || '$'
    },
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    init () {
      this.initData()
      this.getTrialDetails()
    },
    initData () {
      this.reqSuccedDetailsData.trial_id = base64Decode(this.$route.params.trialId)

      let country_id = base64Decode(this.$route.params.countryId)
      this.$root.eventHub.$emit('changeCountryId', country_id)
    },
    
    gotoAmazon (url) {
      window.open(url)
    },

    //进入页面获取到产品详情 以及id
    getTrialDetails () {
      this.$api.userApplySucced(this.reqSuccedDetailsData).then(res => {
        let expiry_time = getTimeDetail(res.data[0].expiry_time)
        this.reqAddOrderData.id = res.data[0].id
        this.trialDetail = res.data[0].trials
        this.countDownData = expiry_time
        this.trialDetail.countDown = res.data[0].expiry_time
        this.countDown()
      })
    },

    //定时器，时间倒计时
    countDown () {
      this.timer = setInterval(() => {
        let expiry_time1 = getTimeDetail(this.trialDetail.countDown)
        this.countDownData = expiry_time1
        if (expiry_time1.day == 0 && expiry_time1.hours == 0 && expiry_time1.minutes == 0 && expiry_time1.seconds == 0) {
          clearInterval(this.timer)
          this.isExpired = true
        }
      }, 1000)
    },

    //提交订单 号码
    submitOrderNumber (e) {
      e.target.disabled = true
      if (!this.reqAddOrderData.order_number) {
        return
      }
      this.$api.userAddOrderNumber(this.reqAddOrderData).then(res => {
        if (res.code === 200) {
          this.$router.push({path: '/personal/my-trials/index', query: { status: 1 }})
        }
        e.target.disabled = false
      }).catch(() => {
        e.target.disabled = false
      })

    },
    
    //enter 按键提交
    enter (e) {
      if (e.keyCode === 13) {
        this.submitOrderNumber()
      }
    },

    //选择问题, 提交问题反馈
    selectProblem () {
      this.addProblemData.title = this.selected
    },
    //显示问题反馈选项
    flagCoupon () {
      this.isFlagCoupon = !this.isFlagCoupon
    },
    //提交问题
    addProblemSubmit () {
      if (base64Decode(this.$route.params.trialId)) {
        this.addProblemData.menu = 'trials'
        this.addProblemData.product_id = base64Decode(this.$route.params.trialId)
      }
      if (!this.addProblemData.content) {
        return
      }
      if (this.addProblemData.content.length > 30) {
        this.$notify.error('You can only type 30 characters')
        return
      }
      this.$api.addProblem(this.addProblemData).then(res => {
        if (res.code === 200) {
          this.$message.success('Submitted successfully!')
          this.isFlagCoupon = false
          this.selected = 'Choose reason'
        }
      }).catch(error => {
        console.log(error)
      })
    },
  }
}
</script>

<style lang="less" scoped>
@import url('../../styles/mixin.less');
.pages-content {
  padding: 0;
  padding-top: 1rem;
}
.home-content {
  width: 99.05%;
  .details {
    position: relative;
    height: 26rem;
    background: white;
    margin-bottom: 1.3rem;
    border-radius: 5px;
    padding-left: 27rem;
    padding-top: 1rem;
    .pro-img {
      position: absolute;
      left: 3rem;
      width: 24rem;
      height: 24rem;
      text-align: center;
      padding: 1.5rem 0;
      .img {
        width: 21rem;
        height: 21rem;
      }
    }
    .details-price {
      position: relative;
      margin-left: 2rem;
      .amazon {
        position: absolute;
        right: 1rem;
        top: 1rem;
      }
      .title {
        width: 35rem;
        font-size: 24px;
        height: 48px;
        line-height: 1;
        overflow: hidden;
        color: #1a1a1a;
        font-weight: bold;
      }
      .time {
        color: #1a1a1a;
        font-size: 18px;
        margin-bottom: 1.5rem;
        strong {
          color: #1a1a1a;
        }
      }
      .code-price {
        position: relative;
        width: 97%;
        height: 12rem;
        background: #fafafa;
        padding: 20px 0 0 5px;
        color: #808080;
        font-size: 1rem;
        margin-bottom: 1rem;
        .price {
          margin-bottom: .8rem;
        }
        .refund-price {
          margin-bottom: .8rem;
          span {
            font-size: 1.5rem;
            font-weight: bold;
            color: black;
          }
        }
        .reminder {
          margin-bottom: .8rem;
          width: 60%;
        }
        .code {
          position: absolute;
          width: 12rem;
          // height: rem;
          right: 2rem;
          top: .5rem;
          .text {
            font-size: 12px;
          }
        }
      }
      .footer {
        .to-amazon {
          .btn-h(15rem,3rem);
          background: #84bb3a;
          border-color: #84bb3a;
          font-size: 1rem;
          color: white;
          &:active {
            background: darken(#84bb3a, 10%);
            border-color: darken(#84bb3a, 10%);
          }

        }
        .right {
          float: right;
          margin-right: 2rem;
          select {
            min-width: 120px;
          }
        }
      }
    }
  } 
  .submit-order-number {
    height: 12rem;
    background: white;
    margin-bottom: 1.3rem;
    border-radius: 5px;
    padding: 20px 0 0 50px;
    font-size: 1rem;
    color: #808080;
    h3 {
      font-size: 1.33rem;
      color: #1a1a1a;
      margin: 1rem 0 1rem 0;
    }
    .submit {
      margin-bottom: 1rem;
      button {
        .btn-h(110px, 30px);
        background: #84bb3a;
        border-color: #84bb3a;
        color: white;
        &:active {
          background: darken(#84bb3a, 10%);
          border-color: darken(#84bb3a, 10%);
        }

      }
    }
  } 
  .precautions {
    height: 41.66rem;
    background: white;
    padding: 10px 20px;
    border-radius: 5px;
    .precautions-s, .description ,.rights-statement {
      padding: 10px 20px;
      border-bottom: 1px solid #d2d2d2;
      h3 {
        font-weight: normal;
      }
      .content {
        padding-bottom: 1rem;
        color: #808080;
        font-size: 0.88rem;
        .text {
          width: 75%;
        }
      }
    }
  }

  .footer {
    height: 30px;
  }
   .question {
          float: right;
          text-align: right;
          margin-right: 5px;
          .wrong {
            margin-bottom: 0.3rem;
            font-size: 1rem;
            color: #808080;
          }
          .submit {
            position: relative;
            input {
              height: 1.8rem;
            }
            button {
              .btn-h;
              width: 5rem;
              height: 1.8rem;
              background: #7db135;
              border-color: #7db135;
              color: white;
              line-height: 0.4;
              &:hover {
                background: darken(#7db135, 10%);
                border-color: darken(#7db135, 10%);
              }
              &:active {
                background: lighten(#7db135, 10%);
                border-color: lighten(#7db135, 10%);
              }
            }
            .error {
              position: absolute;
              left: 0;
              text-align: left;
              color: red;
            }
          }
        }
}


</style>
