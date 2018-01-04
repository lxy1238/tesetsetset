<template>
  <div class="page-index" >
    <div class="pages-content"  v-if="trialDetailData.menu" v-cloak>
      <div class="head-crumbs">
        <span class=" gray-s" v-if="trialDetailData.menu">Trials > {{trialDetailData.menu.name}}</span> 
      </div>
    <div class="blank explain" ></div>
      <explain :is-active="0" class="trials-explain"></explain>
      <div class="details-content clearfix " v-if="trialDetailData.id"  v-title="trialDetailData.product_title">
        <div class="left inline clearfix">
          <details-left :isTop="isTop" 
                        :imgList="imgList" 
                        :userInfo="userInfo"
                        class="trials-details-left"
           ></details-left>      
        </div>
        <div class="right inline trials-right-content">
          <div class="promotion">
            <img class="img"  :src="logoImg[trialDetailData.website]" alt="">
            <div class="title">
              <span>
                {{trialDetailData.product_title}}
              </span>
            </div>
            <div class="describe">
              <div class="time" v-if="leftTime"> <i class="iconfont icon-icon-test">
                </i> Ends in <span>{{leftTime.day}}</span>  days <span>{{leftTime.hours}}</span> hours <span>{{leftTime.minutes}}</span> minutes
              </div>
              <div class="time" v-else >
                expried
              </div>
            </div>
            <div class="price-details">
                <div class="price">Price: <del>{{currency}}{{trialDetailData.product_price}} </del></div>
                <div class="price" v-if="trialDetailData.shipping_fee != 0">Shipping fee: <del>{{currency}}{{trialDetailData.shipping_fee}}</del> </div>
                <div class="price" v-else >Free Shipping</div>
              <div class="refund-price">Refund: <span >{{currency}}{{add(trialDetailData.refund_price, trialDetailData.shipping_fee).toFixed(2)}}</span> </div>
              <div class="reminder">Specifications: <span> {{trialDetailData.specifications}}</span>  </div>
              <div class="reason">Reason: 
                <span>
                  {{trialDetailData.product_reason}}
                </span>
              </div>
            </div>
            <div class="btn-promotion">
                <div class="inline-b add-promo" v-if="!trialDetailData.trial_apply && !isApply">
                  <button @click="trialsApplyBtn($event)">Apply</button>
                </div>
                <div class="inline-b add-promo" v-else>
                You have applied or you are not eligible
                </div>
                 <span class="share">
                   <i class="text">Share on:</i> 
                  <a class="share-a" onclick="javascript:window.open('https://pinterest.com/pin/create/link/?url='+encodeURIComponent(document.location.href)+'&t='+encodeURIComponent(document.title));void(0);"  target="_blank"><i class="iconfont icon-pinterest"></i></a>
                   <a class="share-a" onclick="javascript:window.open('https://www.facebook.com/sharer.php?u='+encodeURIComponent(document.location.href)+'&t='+encodeURIComponent(document.title));void(0);" href="javascript:void(0);"><i class="iconfont icon-facebook1"></i></a>
                   <a class="share-a" onclick="javascript:window.open('https://twitter.com/home?status='+encodeURIComponent(document.location.href)+'&t='+encodeURIComponent(document.title));void(0);" href="javascript:void(0);"><i class="iconfont icon-tuite_twitter"></i></a>
                 </span>
            </div>
          </div>
        </div>
          <div class="promotion-template">
            <div class="tabs">
              <div class="head-s clearfix">
                <div class="tabs-label" 
                    v-for="(item, index) in tabsHead"  
                    @click="selectTabs(index)"
                    :class="{active: selected == index}">
                  {{item}}
                </div>
              </div>
              <div class="tabs-body" id="productDetails">
                <div v-if="selected == 0 && trialDetailData.product_details" class="content" v-html="trialDetailData.product_details">
                  
                </div>
                <div v-if="selected == 1" class="content">
                  <div class="head">
                    In order to ensure your rights, we would like you to read this process carefully.
                  </div>
                  <div class="process" v-for="item in processData">
                    <div class="text">
                      <div class="title">{{item.title}}</div>
                      <div class="text-s">
                        {{item.content}}
                      </div>
                    </div>
                    <img class="img-l" :src="item.imgL">
                    <img class="img-r" :src="item.imgR" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>

      <!-- not get trials -->
      <el-dialog  :visible.sync="notGetTrialsDialog" title="result" class="not-trials-dialog" size="tiny">
          <p>You did not get trials</p>

          <div class="try-again">
            <button @click="gotoTrials">Try out other gifs</button>
          </div>

      </el-dialog>
  </div>
</template>

<script>
import detailsLeft from '@/components/coupons/details_left.vue'
import explain from '@/components/trials/explain.vue'
import { base64Decode } from '@/utils/randomString'
import { timestampFormat, getTimeDetail } from '@/utils/date'
import { getStore } from '@/utils/utils'
import { getUserId, getToken } from '@/utils/auth'
import { NumAdd } from '@/utils/calculate'
export default {
  name: 'coupons',
  components: {
    detailsLeft,
    explain
  },
  data () {
    return {
      logoImg: {
        amazon: require('../../assets/amazon_logo.png'),
        aliexpress: require('../../assets/aliexpress_logo.png')
      },
      isTop: false,
      selected: 0,
      added: true,
      isApply: false,
      processData: [
        {
          'title':'Register users, apply for products',
          'content': 'Register as a user of our website, select your favorite product, click the Apply option to submit the application.',
          'imgL': require('../../assets/process01.png'),
          'imgR': require('../../assets/VCG41157399986.jpg')
        },
        {
          'title':'Submit the application and know the  results timely',
          'content': 'Aftersubmitting the application, the system will promptly inform you of the results of the application, also the system will randomly selectusers, but a usercan only apply for the same product once, if unsuccessful, maybe you can try again for another product.',
          'imgL': require('../../assets/process02.png'),
          'imgR': require('../../assets/VCG41AA023536.jpg')
        },
        {
          'title':'Buy immediately, upload order number',
          'content': 'If you have a chance to get a trial, please place an order and complete the paymentwithin 4 hours, then return to our website, to find the taskin your member center, and upload the order number, the system will verify the authenticity of your order. If you do not upload the order number within 4 hours, your trial task will be canceled and you will not be able to proceed to the next step, also will not be refunded.',
          'imgL': require('../../assets/process03.png'),
          'imgR': require('../../assets/process_r_03.png')
        },
        {
          'title':'Confirmreceipt, submit review',
          'content': 'After receiving the goods, please carefully use your product, andupload your honest review within 7-15 days after receipt. The system will not allow you to submit an review until submission of the evaluation time. An objective and impartial review will help other customers to fully understand the product and contribute to improvingproducts for seller.',
          'imgL': require('../../assets/process04.png'),
          'imgR': require('../../assets/VCG4194739362.jpg')
        },
        {
          'title':'Confirm the review, system refund',
          'content': 'Our professional review team will assess the authenticity of your evaluation, our review is objective and fair, afterreviewing, the system will refundwithin 3-5 business days.',
          'imgL': require('../../assets/process05.png'),
          'imgR': require('../../assets/VCG41477120854.jpg')
        },

      ],
      notGetTrialsDialog: false,
      tabsHead: [
        'Description', 'Novice Process'
      ],
      trialDetailData: {},
      userInfo: {
        avatar_img: '',
        username: '',
        type: '',
        level: '',
        joined_date: '',
        coupon_posteds: ''
      },
      imgList: [],
      reqData: {
        id: '',
      },
      trialApplyData: {
        api_token: getToken(),
        user_id: getUserId(),
        trial_id: '',
        country_id: base64Decode(this.$route.params.countryId),
        platform_id: '',
      },
      currency:  getStore('currency') || '$'
    }
  },
  computed: {
    leftTime () {
      if (this.trialDetailData.end_time) {
        let leftTime = (this.trialDetailData.end_time - this.trialDetailData.timestamp)
        let time = getTimeDetail(leftTime)
        if (time.day == 0 && time.hours == 0 && time.minutes == 0) {
          return false
        } else {
          return getTimeDetail(leftTime)
        }
      } else {
        return false
      }
    }
  },
  mounted () {
    this.init()

  },
  methods: {
    init () {
      this.initData()
      this.getTrialDetail()
    },
    initData () {
      this.reqData.id = base64Decode(this.$route.params.trialId)


      //通过路由中的国家id 修改头部的国家id
      let country_id = base64Decode(this.$route.params.countryId)
      this.$root.eventHub.$emit('changeCountryId', country_id)

      
      this.$root.eventHub.$on('changeCurrency', data => {
        this.currency = data
      })
    },

    //获取试用品详情
    getTrialDetail () {
      this.$api.trialDetail(this.reqData).then(res => {
        this.getPostUserInfo(res.data.user_id)
        this.trialApplyData.trial_id = res.data.id
        this.trialApplyData.platform_id = res.data.platform_id
        this.imgList = res.data.product_img.split(',')
        setTimeout(() => {
          this.trialDetailData = res.data
          this.trialDetailData.timestamp = res.timestamp
        })
      }).catch(error => {
        console.log(error)
      })
    },

    //获取发布人的信息
    getPostUserInfo (id) {
      var request = { user_id: id }
      this.$api.postedUserInfo(request)
        .then(res => {
          res.data.joined_date = timestampFormat(res.data.joined_date)
          this.userInfo = res.data
          this.userInfo.user_id = this.trialDetailData.user_id
          this.userInfo.product_url = this.trialDetailData.product_url
        })
        .catch(error => {
          console.log(error + ' postedUserInfo')
        })
    },
    getImgUrl (data) {
      this.imgUrl = data
    },

    gotoTrials () {
      this.$router.push({path: '/trials/index'})
    },
    selectTabs (index) {
      this.selected = index
    },
    //判断是否登录，否则提醒请登录
    isLogin () {
      if (!getToken()) {
        this.$root.eventHub.$emit('isLoginInfo')
        return false
      } else {
        return true
      }
    },
    trialsApplyBtn (e) {
      if (!this.isLogin()) {
        return
      }
      if (this.trialDetailData.run_status === 'stop') {
        this.$message.info('The test supplies have been distributed today. Please come and apply tomorrow')
        return
      }
      e.target.disabled = true
      if (!this.trialApplyData.api_token) {
        this.trialDetailData.api_token = getToken()
        this.trialDetailData.user_id = getUserId()
      }
      this.$api.trialApply(this.trialApplyData).then(res => {
        if (res.code === 200) {
          this.isApply = true
          if (res.data === 1) {
            this.$router.push({ path: '/successTrials/' + this.$route.params.trialId + '/' + this.$route.params.countryId})
          } else {
            this.notGetTrialsDialog = true
          }
        }
      }).catch(error => {
        if (error.code === 402) {
          this.$router.push({path: '/personal/my-trials/index'})
          this.$message.info('You have already applied for a successful product. According to the rules, you can not apply for this month')
        }
      })
    },
    add (a, b) {
      return NumAdd(a, b)
    }
  }
}
</script>

<style lang="less" scoped >
@import url("../../styles/mixin.less");
.head-crumbs {
  position: fixed;
  width: 100%;
  background: #e4e4e4;
  z-index: 222;
  height: 3rem;
  line-height: 3rem;
}
.pages-content {
  position: relative;
  padding: 0;
}
.details-content {
  position: relative;
  top: 4rem;
}
.el-dialog--small {
  width: 40rem !important;
}
.el-dialog {
  width: 40rem;
}
.inline {
  display: inline-block;
  &.right {
    float: right;
    width: 55.5rem;
    margin-top: 3.1rem;
    .promotion {
      position: relative;
      padding: 1rem;
      background: white;
      border-radius: 5px;
      margin-bottom: 1rem;
      min-height: 28rem;
      .img {
        position: absolute;
        right: 1.5rem;
        top: 2rem;
      }
      .title {
        width: 85%;
        font-size: 24px;
        line-height: 1;
        height: 48px;
        overflow: hidden;
        color: #1a1a1a;
        font-weight: bold;
        margin-bottom: 1rem;
      }
      .describe {
        width: 90%;
        font-size: 0.9rem;
        color: #808080;
        margin-bottom: 1rem;
        .icon-icon-test {
          font-size: 20px;
        }
        .time {
          position: relative;
          padding-left: 25px;
          span {
            color: #1a1a1a;
          }
          .iconfont {
            position: absolute;
            top: -4px;
            left: 0;
          }
        }
      }
      .price-details {
        padding: 1rem 0 1rem .5rem;
        min-height: 13rem;
        background: #fafafa;
        color: #808080;
        span {
          display: inline-block;
          font-size: 0.88rem;
          color: #1a1a1a;
        }
        .price {
          margin-bottom: .6rem;
        }
        .refund-price {
          margin-bottom: .6rem;
          span {
            font-size: 1.3rem;
            font-weight: bold;
          }
        }
        .reminder {
          margin-bottom: .6rem;
        }
      }
      .data-info {
        height: 2rem;
        line-height: 2rem;
        color: #808080;
        font-size: 0.78rem;
        margin-top: 0.5rem;
        .right {
          float: right;
        }
        .expried {
          margin-right: 2rem;
          margin-left: 1rem;
        }
      }
      .select {
        position: relative;
        font-weight: normal;
        height: 2rem;

        select {
          position: absolute;
          right: 0;
          color: #808080;
          font-size: 0.78rem;
          min-width: 6rem;
          option {
            color: #808080;
            font-size: 0.78rem;
          }
        }
      }
      .btn-promotion {
        margin-top: 1rem;
        .add-promo {
          margin-right: 4rem;
          button {
            .btn-h;
            width: 12rem;
            height: 3rem;
            color: white;
            line-height: 3rem;
            background: #85bb3b;
            border-color: #85bb3b;
            text-align: center;
            line-height: 0.8;
            span {
              font-size: 1.5rem;
            }
            &:hover {
              background: darken(#85bb3b, 5%);
              border-color: darken(#85bb3b, 5%);
            }
            &:active {
              background: lighten(#85bb3b, 10%);
              border-color: lighten(#85bb3b, 10%);
            }
          }
        }
        .share {
          float: right;
          margin-right: 2rem;
          a {
            color: #808080;
            .iconfont {
              font-size: 2rem;
            }
          }
        }
      }
    }
 
  
  }
}

  .promotion-template {
      // min-height: 1000px;
      background: white;
      border-radius: 5px;
      overflow: hidden;
      // margin-bottom: 5rem;
      padding-bottom: 5rem;
      width: 100%;
      .tabs {
        .head-s {
          font-size: 1.33rem;
          height: 4rem;
          background: #f9f9f9;
          border-bottom: 1px solid #e1e1e1;
          margin-left: -1px;
          .tabs-label {
            width: 13rem;
            height: 100%;
            float: left;
            text-align: center;
            line-height: 4rem;
            cursor: pointer;
            color: #333;
            font-size: 18px;
            font-weight: 700;

            &:hover {
              color: #1a1a1a;
            }
            &.active {
              height: 4.01rem;
              background: white;
              border-left: 1px solid #e1e1e1;
              border-right: 1px solid #e1e1e1;
            }
          }
        }
        .tabs-body {
          text-align: center;
          min-width: 1000px;
          margin: 0 auto;
          margin-top: 1rem;
          .content {
            padding: 0 3rem;
              .head {
                margin: 3rem 0;
                font-size: 0.78rem;
                color: #808080;
                text-align: left;
              }
              .process {
                position: relative;
                min-height: 245px;
                margin-bottom: 36px;
                img {
                  position: absolute;
                  top: 0;
                }
                .img-l {
                  left: 0;
                }
                .img-r {
                  right: 0;
                  width: 360px;
                  height: 234px;
                }
                .text {
                  position: relative;
                  margin: 0 auto;
                  width: 324px;
                  // margin-left: 125px;
                  left: -130px;

                }
                .title {
                  color: #1a1a1a;
                  font-size: 1rem;
                  margin-bottom: 1rem;
                }
                .text-s {
                  font-size: 0.88rem;
                  color: #808080;
                  line-height: 1.2;
                }
               
              }
            }
        }
      }
    }
  // trials申请失败
.not-trials-dialog {
    p {
      height: 40px;
    }
    p, div {
      text-align: center;
    }
    div {
      button {
        .btn-h(50%, 2rem);
        background: #84BA39;
        border-color: #84BA39;
        color: white;
        &:active {
          background: darken(#84BA39, 10%);
          border-color: darken(#84BA39, 10%);
        }
      }
    }
  }

.explain {
  width: inherit;
  height: 2rem;
}
.trials-explain {
  position: fixed;
  margin-top: 1rem;
  z-index: 666;
  width: 83.333rem !important;
}
.trials-details-left {
  // position: fixed;
  height: 28rem;
  margin-top: 3.1rem !important
}
.iconfont {
    position: relative;
    top: 6px;
    font-size: 2rem;
    &.icon-facebook1 {
      &:hover {
        color: #39579C;
      }
    }
      &.icon-tuite_twitter {
      &:hover {
        color: #26ABE1;
      }
    }
   
  }
  .icon-pinterest {
    &:hover {
      color: red;
    }
  }
</style>

