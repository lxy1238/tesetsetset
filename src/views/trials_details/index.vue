<template>
  <div class="page-index" >
    <div class="pages-content"  v-if="trialDetailData.menu" v-cloak>
      <div class="head-crumbs">
        <span class=" gray-s" v-if="trialDetailData.menu">Trials > {{trialDetailData.menu.name}}</span> 
      </div>
    <div class="blank explain" ></div>
      <explain :is-active="0" class="trials-explain"></explain>
      <div class="details-content clearfix " v-if="trialDetailData.id"  v-title="titleMsg">
        <div class="left inline clearfix">
          <details-left :isTop="isTop" 
                        :imgList="imgList" 
                        :userInfo="userInfo"
                        class="trials-details-left"
           ></details-left>      
        </div>
        <div class="right inline trials-right-content">
          <div class="promotion">
            <img class="img"  :src="logoImg[trialDetailData.website]" alt="" @click="gotoAmazon">
            <div class="title" :title="trialDetailData.product_title">
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
              <div class="price">
                <span>List price: <del>{{currency}}{{trialDetailData.product_price}} </del></span> 
                <span v-if="trialDetailData.shipping_fee != 0">Shipping fee: <del>{{currency}}{{trialDetailData.shipping_fee}}</del> </span>
                <!-- <span v-else >Free Shipping</span> -->
              </div>
              <div class="refund-price">
                <label>Trial price:</label>  
                <span class="free" v-if="sub(trialDetailData.refund_price, trialDetailData.product_price).toFixed(2) >= 0">Free</span>
                <span v-else >{{currency}}{{sub(trialDetailData.product_price, trialDetailData.refund_price).toFixed(2)}}</span>
                <span class="coupon-right" v-if="sub(trialDetailData.refund_price, trialDetailData.product_price).toFixed(2) > 0">
                  <strong class="full-refund" :title="'Extra refund '+currency+sub(trialDetailData.refund_price, trialDetailData.product_price).toFixed(2)+' to you.'">
                    +{{currency}}{{sub(trialDetailData.refund_price, trialDetailData.product_price).toFixed(2)}}
                  </strong>
                  <i class="refund-message">
                    (Extra refund {{currency}}{{sub(trialDetailData.refund_price, trialDetailData.product_price).toFixed(2)}}  to you.)
                  </i>
                </span>
              </div>
              <div class="refund-price">
                <label>Refund amount: </label>
                  <i class="merchant-reward-money">{{currency}}{{add(trialDetailData.refund_price, trialDetailData.shipping_fee).toFixed(2)}}</i>
              </div>
              <div class="reminder"><strong>Specifications: </strong>
                <br />
                <span> {{trialDetailData.specifications}}</span>  
                </div>
              <div class="reminder"><strong>Recommend reason: </strong>
                <br /> 
                <span>
                  {{trialDetailData.product_reason}}
                </span>
              </div>
            </div>
            <div class="btn-promotion">
                <div class="inline-b add-promo" >
                  <el-button @click="trialsApplyBtn($event)" :loading="btnLoading">Apply</el-button>
                </div>
                <!-- <div class="inline-b add-promo" v-else>
                  You have applied or you are not eligible
                </div> -->
                 <!-- <span class="share">
                   <i class="text">Share on: </i> 
                   <a class="share-a" onclick="javascript:window.open('https://www.facebook.com/sharer.php?u='+encodeURIComponent(document.location.href)+'&t='+encodeURIComponent(document.title));void(0);" href="javascript:void(0);"><i class="iconfont icon-facebook1"></i></a>
                   <a class="share-a" onclick="javascript:window.open('https://twitter.com/home?status='+encodeURIComponent(document.location.href)+'&t='+encodeURIComponent(document.title));void(0);" href="javascript:void(0);"><i class="iconfont icon-tuite_twitter"></i></a>
                  <a class="share-a" onclick="javascript:window.open('https://pinterest.com/pin/create/link/?url='+encodeURIComponent(document.location.href)+'&t='+encodeURIComponent(document.title));void(0);"  target="_blank"><i class="iconfont icon-pinterest"></i></a>
                 </span> -->
                 <div class="flag-trial"> 
                  <div class="right">
                    <div class="top" @click="flagCoupon"><i class="iconfont icon-xiaohongqi"></i> <i class="link">Flag this trial</i> </div>
                    <select name="" id="" v-model="selected1" @change="selectProblem"  v-if="isFlagCoupon">
                    <option v-for="(item, index) in options" :value="item" :label="item" >{{item}}</option>
                  </select>
                  </div>
                  <div class="inline-b question" v-if="selected1 !== 'Choose reason'">
                    <div class="wrong"><span>What’s wrong with this deal?</span></div>
                    <div class="submit">
                      <input type="text" v-model="addProblemData.content" @keyup.enter="problemSubmit">
                      <el-button type="button" @click="addProblemSubmit" :loading="problemBtnLoading"><span>Submit</span></el-button>
                      <div class=" error" v-if="!addProblemData.content && addProblemData.menu">Please describe the problem</div>
                    </div>
                  </div>
                </div>
                </div>
            
          </div>
        </div>
         <div class="promotion-template promotion-trmplate-top clearfix" v-if="roles[0] == 'celebrity'">
            <div class="commission-title">
              <span>
                Influencer Reward
              </span>
            </div>
            <div class="describe">
              <span>Per Order Get Bounties: <b>{{currency}}{{ trialDetailData.promotion_commission}}</b>
              </span>
            </div>
          </div>
          <div class="promotion-template clearfix">
            <div class="tabs-trials">
              <div class="head-s clearfix">
                <div class="tabs-label" 
                    v-for="(item, index) in tabsHead"  
                    @click="selectTabs(index)"
                    :class="{active: selected == index}">
                  {{item}}
                </div>
              </div>
              <div class="tabs-body" id="productDetails">
                <div v-if="selected == 0 && trialDetailData.product_details" class="content1" v-html="trialDetailData.product_details">

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



       <!-- 申请之前，显示试用品规则，需要用户确定 -->
      <el-dialog  :visible.sync="applySuccessDialog"  class="not-trials-dialog" size="tiny">
          <p class="sorry-text" >Can Not Apply Again On This Platform!</p>

          <p v-if="hasSubmitOrder">
            In order to ensure fairness and trial effectiveness, 
            each user can only successfully apply for one trial task on the same platform within one month.
            Please  <a class="link" href="javascript:void(0);" @click="gotoMytrials(1)" > 
            click to view</a> the progress of your task.
          </p>
          <p v-else>
            In order to ensure fairness and trial effectiveness, 
            each user can only successfully apply for one trial task on the same platform within one month.
             Please  <a class="link" href="javascript:void(0);" @click="gotoMytrials(0)" > 
            click to view</a> the progress of your task. 
          </p>
      </el-dialog>


        <!-- 已经申请成功 情况1 点击已经申请成功的试用品 -->
      <el-dialog  :visible.sync="applySuccessDialogFirst"  class="not-trials-dialog-first" size="tiny">
          <p class="sorry-text" >Successful Application!</p>

          <p>
            Please place an order and submit the order number within 2 hours, or your product trial task will be canceled.
          </p>
          <p class=" shop-on-amazon">
            <!-- <a class="link" href="javascript:void(0);" @click="gotoAmazon">
            Shop Amazon now to trial!
            </a> -->
            <el-button  @click="gotoAmazon">Shop on Amazon</el-button>
            </p>
          <div class="apply-first">
            <el-input v-model="reqAddOrderData.order_number" placeholder="Your Order Number" @keyup.enter.native="orderSubmit"></el-input> 
            <el-button :loading="confirmLoading" @click="submitOrderNumber">Save</el-button>
          </div>
          <div class="red" v-if="!reqAddOrderData.order_number && reqAddOrderData.isSubmit">The order number is required.</div>
          <div class="red" v-else-if="formatError">Error in order number format.</div>
      </el-dialog>

       <!-- 已经申请成功 情况2 点击已经申请成功的试用品 -->
      <el-dialog  :visible.sync="ruleDialog"  class="trials-policy-dialog" size="tiny">

        <div class="head-title">
              <h3> Product Trial Policy</h3>
              <div class="head-text">
                Please carefully read the product trial policies before applying for a product trial.
              </div>
            </div>
           
            
            <ul>
              <li>
                1. User shall be voluntary to participate in the product trial, in which are initiated by the merchants. 
              </li>
              <li>
                2. Users must read and have clear understanding of both their rights and obligations. 
              </li>
              <li>
                3. Before applying, please confirm that your buyer account is normal and that you are able to post product review. 
              </li>
              <li>
                 4. In the following cases, pls understand that no refund will be provided:   <br />
              (1). If you fail to upload the product's rating link within 15 days after successfully placing an order.  <br />
              (2). If users upload a fake order number or fake review link. <br />
              (3). If review posted is obscene, offensive, threatening or dirty. <br />
              (4). If you provide merchants with untruthful comments by taking bribes and/or other transactions. <br />
              (5). If restricted by sales platform, the buyer account can not post the product evaluation normally. <br />

              </li>
              <li>
                5. Review content must be neutral, true, and trustworthy.
              </li>
              <li>
               6. Within a month (for the same user and on the same sales platform) there will be TWO product trial opportunities available to you, but for the second opportunity you first must have a successful trading order for the previous product trial. 
              </li>
              <li>
                7. The same person, can only register one user account on DealsBank. If more than one account is discovered then this will conclude in all accounts being permanently frozen. 
              </li>
              <li>
               8. After submitting the review link address, if the review is true and within our product trial policies, then the system will refund you within 3 working days. 
              </li>
              <li>
               9. Serving as an information platform, DealsBank can not guarantee the authenticity of the products, and users must make their own judgments before placing orders. If you have any after-sale quality problems, please contact the seller through the sales platform. DealsBank is not responsible for after-sale issues. 
              </li>
            </ul>
            <p class="head-text">
              The behavior of clicking on the consent button means you accept our product trial policies, and that you fully understand your rights and obligations. We look forward to working with you, thank you!
            </p> 
            <div class="try-again">
              <el-button type="info" @click="agreePolicy">I Agree</el-button>
            </div>

      </el-dialog>
  </div>
</template>

<script>
import detailsLeft from '@/components/coupons/details_left.vue'
import explain from '@/components/trials/explain.vue'
import { base64Encode, base64Decode } from '@/utils/randomString'
import { timestampFormat, getTimeDetail } from '@/utils/date'
import { getStore } from '@/utils/utils'
import { getToken, getUserId, getPromotionId } from '@/utils/auth'
import { NumAdd, NumSub } from '@/utils/calculate'
import { mapGetters } from 'vuex'
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
      // isApply: false,
      processData: [
        {
          'title':'Register users, apply for products',
          'content': 'Register as a user of our website, select your favorite product, click the Apply option to submit the application.',
          'imgL': require('../../assets/process01.png'),
          'imgR': require('../../assets/1.png')
        },
        {
          'title':'Submit the application and know the  results timely',
          'content': 'After submitting the application, the system will promptly inform you of the results of the application, also the system will randomly select users, but a user can only apply for the same product once, if unsuccessful, maybe you can try again for another product.',
          'imgL': require('../../assets/process02.png'),
          'imgR': require('../../assets/2.png')
        },
        {
          'title':'Buy immediately, upload order number',
          'content': 'If you have a chance to get a trial, please place an order and complete the payment within 24 hours, then return to our website, to find the taskin your member center, and upload the order number, the system will verify the authenticity of your order. If you do not upload the order number within 24 hours, your trial task will be canceled and you will not be able to proceed to the next step, also will not be refunded.',
          'imgL': require('../../assets/process03.png'),
          'imgR': require('../../assets/3.png')
        },
        {
          'title':'Confirmreceipt, submit review',
          'content': 'After receiving the goods, please carefully use your product, and upload your honest review within 15 days after ordered. The system will not allow you to submit an review until submission of the evaluation time. An objective and impartial review will help other customers to fully understand the product and contribute to improving products for seller.',
          'imgL': require('../../assets/process04.png'),
          'imgR': require('../../assets/4.png')
        },
        {
          'title':'Confirm the review, system refund',
          'content': 'Our professional review team will assess the authenticity of your evaluation, our review is objective and fair, after reviewing, the system will refund within 3 working days.',
          'imgL': require('../../assets/process05.png'),
          'imgR': require('../../assets/5.png')
        },

      ],
      notGetTrialsDialog: false,
      applySuccessDialog: false,
      applySuccessDialogFirst: false,
      ruleDialog: false,
      btnLoading: false,
      hasSubmitOrder: false,
      confirmLoading: false,
      reqAddOrderData: {
        api_token: getToken(),
        user_id: getUserId(),
        id: '',
        order_number: ''
      },
      amazonUrl: '',
      trial_id: '',
      tabsHead: [
        'Description', 'Novice Process'
      ],
      trialDetailData: {},
      currency:  getStore('currency') || '$',
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
        p_uid: getPromotionId(),
      },
      reqSuccedDetailsData0: {
        country_id: getStore('country_id') || 1,
        api_token: getToken(),
        user_id: getUserId(),
        page: 1,
        page_size: 3
      },
      addProblemData: {
        api_token: getToken(),
        user_id: getUserId(),
        product_id: '',
        menu: '',
        title: '',
        content: ''
      },
      agreePolicyData: {
        api_token: getToken(),
        user_id: getUserId(),
      },
      isFlagCoupon: false,
      problemBtnLoading: false,
      options: [
        'Choose reason',
        'Dead trial',
        'Spam trial',
        'No value',
        'Duplicate',
        'Alive again',
        'Price error'
      ],
      selected1: 'Choose reason',
      titleMsg: '',
      trials_policy: 0,
      formatError: false,
    }
  },
  computed: {
    ...mapGetters([
      'currentRouter',
      'userBase',
      'roles'
    ]),
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
  watch: {
    userBase () {
      this.trials_policy = this.userBase.trials_policy
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

      if (this.userBase.trials_policy) {
        this.trials_policy = this.userBase.trials_policy
      }
    },

    

    //获取试用品详情
    getTrialDetail () {
      this.isDataExit(this.reqData)
      this.$api.trialDetail(this.reqData).then(res => {
        this.getPostUserInfo(res.data.user_id)
        this.trialApplyData.trial_id = res.data.id
        this.trialApplyData.platform_id = res.data.platform_id
        this.imgList = res.data.product_img.split(',')
        setTimeout(() => {
          this.trialDetailData = res.data
          this.trialDetailData.timestamp = res.timestamp
        })
        this.titleMsg = res.data.product_title + ' for ' +
                          this.currency + res.data.product_price + 
                           ' + free shipping'
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
    agreePolicy () {
      this.isDataExit(this.agreePolicyData)
      this.$api.trialsPolicy(this.agreePolicyData).then(res => {
        if (res.code === 200) {
          this.ruleDialog = false
          this.userBase.trials_policy = 1
          this.trials_policy = 1
          this.$store.commit('SET_USERBASE', this.userBase)
          this.trialsApplyBtn()
        }
      }).catch(() => {

      })
    },
    trialsApplyBtn () {
      if (!this.isLogin()) {
        return
      }
      if (this.trials_policy === 0) {
        this.ruleDialog = true
        return
      }
      if (this.trialDetailData.run_status === 'stop') {
        this.$snotify.info('The quota of product trial has been applied today, please try again tomorrow.')
        return
      }
      
      if (!this.trialApplyData.api_token) {
        this.trialDetailData.api_token = getToken()
        this.trialDetailData.user_id = getUserId()
      }
      this.btnLoading = true
      this.isDataExit(this.trialApplyData)
      this.trialApplyData.p_uid = getPromotionId()
      this.$api.trialApply(this.trialApplyData).then(res => {
        this.btnLoading = false
        if (res.code === 200) {
          if (res.data === 1) {
            // this.$router.push({ path: '/successTrials/' + this.$route.params.trialId + '/' + this.$route.params.countryId})
            this.isDataExit(this.reqSuccedDetailsData0)
            this.$api.userApplySucced(this.reqSuccedDetailsData0).then(res => {
              this.amazonUrl = res.data[0].trials.product_url
              this.reqAddOrderData.id = res.data[0].id
              this.applySuccessDialogFirst = true
            }).catch(err => { 
              console.log(err)
            })
          } else {
            this.notGetTrialsDialog = true
          }
        }
      }).catch(error => {
        this.btnLoading = false
        if (error.code === 402) {
          this.isDataExit(this.reqSuccedDetailsData0)
          this.$api.userApplySucced(this.reqSuccedDetailsData0).then(res => {
            if (res.data.length === 0) {
              this.hasSubmitOrder = true
            } else {
              this.trial_id = res.data[0].trial_id
              this.hasSubmitOrder = false
            }
            this.applySuccessDialog = true
          }).catch(err => { 
            console.log(err)
          })
        }
      })
    },
    //判断参数是否存在
    isDataExit (object) {
      if (!object.api_token) {
        object.api_token = getToken()
        object.user_id = getUserId()
      }
    },

    // gotoSuccess () {
    //   this.$router.push({ path: '/successTrials/' + base64Encode(this.trial_id) + '/' + this.$route.params.countryId})
    // },
    gotoMytrials (page) {
      this.$router.push( {path: '/personal/my-trials/index', query:{status: page}})
    },
    gotoAmazon () {
      // window.open(url + '&tag=dealsbank')
      let router = this.currentRouter.replace('/trialsDetails', '')
      let endUrl = `/goto/product/trial${router}`
      window.open(endUrl)
    },
    //提交订单 号码
    submitOrderNumber () {
      this.confirmLoading = true
      var reg = /^\d{3}-\d{7}-\d{7}$/
      if (!this.reqAddOrderData.order_number) {
        this.reqAddOrderData.isSubmit = true
        this.confirmLoading = false
        return
      }
      if (!reg.test(this.reqAddOrderData.order_number)) {
        this.confirmLoading = false
        this.formatError = true
        return
      }
      this.isDataExit(this.reqAddOrderData)
      this.$api.userAddOrderNumber(this.reqAddOrderData).then(res => {
        if (res.code === 200) {
          this.$router.push({path: '/personal/my-trials/index', query: { status: 1 }})
        }
        this.confirmLoading = false
      }).catch(() => {
        this.confirmLoading = false
      })

    },
    
    //enter 按键提交
    orderSubmit () {
      this.submitOrderNumber()
    },

    //选择问题, 提交问题反馈
    selectProblem () {
      this.addProblemData.title = this.selected1
    },
    //显示问题反馈选项
    flagCoupon () {
      this.isFlagCoupon = !this.isFlagCoupon
      this.selected1 = 'Choose reason'
    },

   
    //提交问题
    addProblemSubmit () {
      if (!this.isLogin()) {
        return
      }
      if (base64Decode(this.$route.params.trialId)) {
        this.addProblemData.menu = 'trials'
        this.addProblemData.product_id = base64Decode(this.$route.params.trialId)
      }
      if (!this.addProblemData.content) {
        return
      }
      if (this.addProblemData.content.length > 30) {
        this.$snotify.error('Submit Failed! You can only type 30 characters.')
        return
      }
      this.problemBtnLoading = true
      this.isDataExit(this.addProblemData)
      this.$api.addProblem(this.addProblemData).then(res => {
        if (res.code === 200) {
          this.$snotify.success('Submitted successfully!')
          this.isFlagCoupon = false
          this.selected1 = 'Choose reason'
          this.addProblemData.content = ''
          this.addProblemData.menu = ''
          this.problemBtnLoading = false
        }
      }).catch(error => {
        this.problemBtnLoading = false
        console.log(error)
      })
    },
    problemSubmit () {
      this.addProblemSubmit()
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

<style lang="less" scoped >
@import url("../../styles/mixin.less");
.head-crumbs {
  position: fixed;
  width: 100%;
  background: #e4e4e4;
  z-index: 222;
  height: 54px;
  line-height: 54px;
}
.pages-content {
  position: relative;
}
.details-content {
  position: relative;
  top: 76px;
  padding-bottom: 40px;
  margin-bottom: 20px;
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
    margin-top: 48px;
    .promotion {
      position: relative;
      padding: 1rem;
      background: white;
      border-radius: 5px;
      margin-bottom: 1rem;
      min-height: 470px;
      border: 1px solid #d2d2d2;
      .img {
        position: absolute;
        right: 1.5rem;
        top: 2rem;
        height: 35px;
        cursor: pointer;
      }
      .title {
        width: 85%;
        font-size: 21px;
        line-height: 1.21;
        height: 50px;
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
        // min-height: 13rem;
        background: #fafafa;
        color: #808080;
        span {
          display: inline-block;
          font-size: 13px;
          color: #333;
        }
        .price {
          margin-bottom: .6rem;
          del {
            color: #808080;
            display: inline-block;
            margin-right: 30px;
          }
        }
        .refund-price {
          font-size: 13px;
          color: #333;
          margin-bottom: .6rem;
          .free {
            color: #333;
            font-weight: 700;
          }
          span {
            color: #808080;
          }
          .merchant-reward-money {
              font-weight: 700;
              font-size: 13px;
              color: #333;
          }
          .merchant-reward {
            display: inline-block;
            margin-left: 10px;
            label {
              font-size: 13px;
              color: #333;
              font-weight: 400;
            }
            .merchant-reward-money {
              font-weight: 700;
              font-size: 16px;
              color: #333;
            }
            
          }
          .coupon-right {
            font-size: 13px;
            font-weight: 700;
            color: #1a1a1a;
            .full-refund {
              font-style: italic;
              color: #D82323;
            }
            .refund-message {
              font-weight: 400;
            }
          }
        }
        .reminder {
          strong {
            color: #333;
            font-size: 14px;
          }
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
        position: relative;
        margin-top: 1rem;
        .add-promo {
          margin-right: 4rem;
          height: 3rem;
          line-height: 3rem;
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
          .text {
            margin-right: 3px;
          }
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
      background: white;
      border-radius: 5px;
      overflow: hidden;
      padding-bottom: 5rem;
      border: 1px solid #d2d2d2;
      width: 66.5%;
      margin-left: 27.9rem;
      .tabs-trials {
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
            font-size: 16px;
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
          // text-align: center;
          // min-width: 1000px;
          width: 100%;
          margin: 0 auto;
          margin-top: 1rem;
          display: inline-block;
          .content1 {
            padding: 0 20px;
            width: 100%;
            line-height: 18px;
            img {
              max-width: 100%;
            }
          }
          .content {
            padding: 0 3rem;
              .head {
                margin: 3rem 0;
                font-size: 13px;
                color: #808080;
                text-align: left;
              }
              .process {
                position: relative;
                min-height: 200px;
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
                  width: 13.89rem;
                  height: 8.33rem;
                }
                .text {
                  position: relative;
                  margin: 0 auto;
                  width: 20rem;
                  // margin-left: 125px;
                  left: -8rem;
                  text-align: left;

                }
                .title {
                  color: #1a1a1a;
                  font-size: 1rem;
                  margin-bottom: 1rem;
                }
                .text-s {
                  font-size: 13px;
                  color: #808080;
                  line-height: 1.2;
                }
               
              }
            }
        }
      }
    }
    .promotion-trmplate-top {
      margin-bottom: 1rem;
      padding-bottom: 2rem;
       position: relative;
      height: 5.5rem;
      background: white;
      border-radius: 5px;
      margin-bottom: 1rem;
      padding: 1rem;
      .commission-title {
        width: 70%;
        font-size: 16px;
        color: #1a1a1a;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .describe {
        width: 90%;
        font-size: 13px;
        color: #808080;
        margin-bottom: 1rem;
        b {
          font-size: 18px;
          color: #ff3366;
        }
      }
    }
  // trials申请失败
.not-trials-dialog, .not-trials-dialog-first {
  .el-dialog.el-dialog--tiny {
    padding-bottom: 50px;
  }
  .el-input {
    width: 268px;
  }
    p {
      padding:0 80px;
      height: 30px;
      color: #808080;
      font-size: 13px;
      &.sorry-text {
        font-weight: 700;
        font-size: 18px;
        color: #333;
        margin-top: 0;
      }
      .link {
        font-size: 15px;
        font-weight: 300;
      }
    }
    p, div {
      text-align: center;
    }
    div {
      button {
        .btn-h(100px, 36px, #84BA39, #84BA39, #fff);
      }
    }
    .shop-on-amazon {
      button {
        .btn-h(200px, 36px, #84BA39, #84BA39, #fff);
      }
    }
    .red {
      text-align: left;
      padding-left: 95px;
    }
    .apply-first {
      margin-top: 20px;
    }
  }

.explain {
  width: inherit;
  height: 36px;
}
.trials-explain {
  position: fixed;
  margin-top: 18px;
  z-index: 666;
  width: 83.333rem !important;
}
.trials-details-left {
  position: fixed;
  top: 260px; 
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
.flag-trial {
  text-align: right;
  position: absolute;
  height: 1rem;
  top: 0;
  right: 0rem;
  .right {
      margin-right: 2rem;
      // margin-top: 10px;
      select {
        min-width: 120px;
      }
      .top {
        height: 18px;
        overflow: hidden;
        margin-bottom: 5px;
        &:hover {
          .iconfont {
            color: #0072bc;
          }
        }
        .iconfont {
          position: relative;
          font-size: 16px;
          top: 3px;
          color: #808080;
        }
      }
    }
  .question {
    text-align: right;
    margin-right: 2rem;
    // position: absolute;
    // right: 1rem;
    // bottom: -4rem;
    .wrong {
      margin-bottom: 0.3rem;
      font-size: 13px;
      color: #808080;
    }
    .submit {
      position: relative;
      input {
        height: 1.8rem;
      }
      button {
        .btn-h(5rem, 1.8rem, #7db135, #7db135, #fff);
        line-height: 0.4;
        font-size: .8rem;
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
.trials-policy-dialog {
  line-height: 1.42;
  h3 {
    text-align: center;
    font-size: 18px;
  }
  .head-text {
    text-align: left;
  }
  .head-title {
    margin-top: -30px;
  }
  .try-again {
    text-align: center;
  }
}

</style>

