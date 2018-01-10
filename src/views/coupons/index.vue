<template>
  <div class="page-index" >
    <div class="pages-content" >
      <div class="head-crumbs"  v-if="couponDetail.valid_date">
        <span class=" gray-s">Coupons > {{couponDetail.menu.name}}</span> 
      </div>
      <div class="details-content clearfix"  v-if="couponDetail.valid_date"  v-title="titleMsg">
        <div class="left inline">
          <details-left :imgList="imgList" 
                        :userInfo="userInfo"
                        @send="getImgUrl" 
                        class="details-left-coupons">
          </details-left>      
        </div>
        <div class="right inline" >
          <div class="promotion">
            <img class="img"  :src="logoImg[couponDetail.website]" alt="" @click="gotoPlatform(couponDetail.product_url)" >
            <div class="title">
              <span >
                {{couponDetail.product_title}}
              </span>
            </div>
            <div class="describe">
              <span>{{couponDetail.product_reason}}
              </span>
            </div>
            <div class="price-details" v-if="couponDetail.discount_price">
              <span class="inline-b n-price">{{currency}}{{couponDetail.discount_price}}</span>
              <span class="inline-b o-price">{{currency}}{{couponDetail.product_price}}</span>
              <span class="inline-b c-price">Coupon {{currency}}{{sub(couponDetail.product_price, couponDetail.discount_price).toFixed(2)}}</span>
              <span class="inline-b ratio">{{couponDetail.discount_rate}}% off</span>
            </div>
            <div class="data-info">
              <span class="inline-b expried">Expried: {{couponDetail.valid_date}}</span>
              <span class="inline-b" v-if="couponDetail.shipping_fee == '0.00'">Free shopping</span>
              <span class="inline-b" v-else>Shipping fee: {{currency}}{{couponDetail.shipping_fee}}</span>
              <span class="inline-b right flagcoupon" @click="flagCoupon"><i class="iconfont icon-xiaohongqi"></i>  <i class="link">Flag this coupon</i>  </span>
            </div>
            <div class="select" v-if="isFlagCoupon">
              <select name="" id="" v-model="selected" @change="selectProblem">
                <option v-for="(item, index) in options" :value="item" :label="item" >{{item}}</option>
              </select>
            </div>
            <div class="btn-promotion">
                <div class="inline-b add-promo">
                  <button v-if="added" @click="removePromotion"><span>Cancel </span> <i class=" el-icon-check"></i></button>
                  <button v-else  @click="addPromotion"><span>Add Promotion</span></button>
                </div>
                <div class="inline-b add-promo get-code">
                   <button @click="getCode"><span>Get Code</span></button>
                </div>
                <div class="inline-b question" v-if="selected !== 'Choose reason' && isFlagCoupon">
                  <div class="wrong"><span>What’s wrong with this deal?</span></div>
                  <div class="submit">
                    <input type="text" v-model="addProblemData.content" @keyup.enter="enterSubmit">
                    <el-button type="button" @click="addProblemSubmit" :loading="btnLoading"><span>Submit</span></el-button>
                    <div class=" error" v-if="!addProblemData.content && addProblemData.menu">Please describe the problem</div>
                  </div>
                </div>
            </div>
          </div>
          <!-- <div class="commission">
             <div class="commission-title">
              <span>
                Affiliate reward
              </span>
            </div>
            <div class="describe">
              <span>Get {{couponDetail.commission_ratio}}% commission, about $ {{couponDetail.commission_amount}} affiliate reward
              </span>
            </div>
          </div> -->
          <div class="promotion-template">
            <div class="promo-head">
              <div class="promo-head-l">
                Promotion template
              </div>
              <div class="promo-head-r" @click="modifyTemplate">
                  <i class="iconfont icon-modify1"></i>
                  <a href="javascript:void(0);">
                    Modify template
                  </a>
              </div>
            </div>
            <div class="promo-content">
               <div class="card" id="proCard">
                 <div class="img" >
                   <img :src="imgUrl" alt="">
                 </div>
                 <div class="text-describe" v-html="templateText" >
                   
                 </div>
               </div>
               <div class="share-to-p">
                 <button  data-clipboard-target="#proCard" @click="handleClip($event)">Copy</button>
                 <span class="share">
                   <i class="text">Promotion on:</i> 
                   <a class="share-a" onclick="javascript:window.open('https://pinterest.com/pin/create/link/?url='+encodeURIComponent(document.location.href)+'&t='+encodeURIComponent(document.title));void(0);"  target="_blank"><i class="iconfont icon-pinterest"></i></a>
                   <!-- <a class="share-a" @click="shareFaceBook" href="javascript:void(0);"><i class="iconfont icon-facebook1"></i></a> -->
                  <a class="share-a" onclick="javascript:window.open('https://www.facebook.com/sharer.php?u='+encodeURIComponent(document.location.href)+'&t='+encodeURIComponent(document.title));void(0);" href="javascript:void(0);"><i class="iconfont icon-facebook1"></i></a>
                   <a class="share-a" onclick="javascript:window.open('https://twitter.com/home?status='+encodeURIComponent(document.location.href)+'&t='+encodeURIComponent(document.title));void(0);" href="javascript:void(0);"><i class="iconfont icon-tuite_twitter"></i></a>
                 </span>
               </div>
               <div class="promo-footer center">
                 <a href="#" class="use-it">How to use? Click here >></a>
               </div>
            </div>
          </div>
          <div class="recommend">
            <div class="re-head">
              <span class="re-head-l">Related Coupons</span>
              <span class="re-head-r link" @click="gotoIndex" >more <i>></i></span>
            </div>
              <coupons-pro 
                v-for="couponsDetails in arrcouponsDetails"  
                :key="1" 
                :couponsDetails="couponsDetails"
                @gotodetails="gotodetails">
                <template slot="price">
                <!-- <p class="price content">{{currency}}{{couponsDetails.product_price}}</p>
                <p class="coupons content">
                  <span><i class="gray-s">Coupons</i> <strong>{{couponsDetails.discount_price}}</strong></span>
                  <span class="coupon-right"><strong>{{couponsDetails.discount_rate}}%</strong> <i class="gray-s">off</i> </span>
                </p> -->
                <p class="price content">
                  <span class="price-right">{{currency}}{{couponsDetails.product_price}}</span>
                </p>
                <p class="price content clearfix">
                  <span class="price-left"><i>Coupon</i> {{currency}}{{sub(couponsDetails.product_price , couponsDetails.discount_price).toFixed(2)}}</span>
                  <span class="price-right-bottom"> {{couponsDetails.discount_rate}}% <i>off</i></span>
                </p>
                </template>
                <template slot="btn">
                  View Coupons
                </template>
              </coupons-pro>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹出窗  getcode-->
      <el-dialog  :visible.sync="showGetCodeDialog" class="code-dialog">
        <span slot="title" class="title" @click="gotoPlatform(couponDetail.product_url)">
          {{couponDetail.product_title}}
          <img :src="logoImg[couponDetail.website]" alt="">
        </span>
        <div class="dialog-body">
          <div class="top">
            <div class="head"><span >Here's your coupon code</span></div>
            <div class="goto-amazon"><span ><a href="javascript:void(0)" @click="gotoPlatform(couponDetail.product_url)" class="link"><strong>Go to Amazon</strong></a> and paste this code at checkout</span></div>
            <div class="discount" @click="getCouponCode($event)" v-if="!getCodeSuccess"><button>Discount Coupon Worth  {{currency}} {{sub(couponDetail.product_price, couponDetail.discount_price).toFixed(2)}}</button></div>
            <div class="coupon-code"  v-else>
              <span id="couponId" class="code">{{couponDetail.coupon_code}}</span>
              <button data-clipboard-target="#couponId" @click="copyCode($event)">Copy</button>
              </div>
          </div>
        </div>

      </el-dialog>

      <!-- Modidy template -->
      <el-dialog  :visible.sync="templateDialog" class="template-dialog">
        <div class="dialog-body">
          <div class="box dialog-l">
              <h3>Generic label</h3>
            <div class="content">
              <p>Labels are recommended,you can adjust your content display methods yourself.</p>
              <div class="text"><span>#Platform#, </span> <span >This is the platform of the promotion. </span></div>
              <div class="text"><span>#Promo_title#, </span> <span >This is the title of the promotion. </span></div>
              <div class="text"><span>#Promo_listprice#, </span> <span >This is the listprice of the promotion. </span></div>
              <div class="text"><span>#Promo_saleprice#, </span> <span >This is the saleprice of the promotion. </span></div>
              <div class="text"><span>#Coupon_value#, </span> <span >This is the coupon of the promotion. </span></div>
              <div class="text"><span>#Discount_scale#, </span> <span >This is the scale of the promotion. </span></div>
              <div class="text"><span>#Promo_description#, </span> <span >This is the description of the promotion. </span></div>
              <div class="text"><span>#Promo_link#, </span> <span >This is the link of the promotion. </span></div>
              <div class="text"><span>#Order_link#, </span> <span >This is the link of the order. </span></div>
            </div>
            <div class="footer">
              <span>
                If you do not operate, will not be able to output the corresponding
                information. 
                <a class="link" href="javascript:void(0);">Not understand? View tutorial >></a>
              </span>
            </div>
          </div>
          <div class="box dialog-r">
              <h3>Promotion template</h3>
            <div class="content">
              <textarea name="" id="" cols="30" rows="10" v-model="promotionTemplate"></textarea>
            </div>
            <button class="save" @click="saveTemplate">Save</button>
            <div class="footer right">
              <span class="reset" @click="restoreTemplate"><i class="iconfont icon-reset"></i> Restore</span>
              <span @click="templateDialog = false"> <i class="iconfont icon-cha"></i> Cancel</span>
            </div>
          </div>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import detailsLeft from '@/components/coupons/details_left.vue'
import couponsPro from '@/components/page_index_coupons/image_product.vue'
import explain from '@/components/trials/explain.vue'
import Clip from '@/utils/clipboard.js'

import { parseTime, timestampFormat } from '@/utils/date'
import { getToken, getUserId } from '@/utils/auth'
import { getStore } from '@/utils/utils'
import { mapGetters } from 'vuex'
import { base64Encode, base64Decode } from '@/utils/randomString'
import { NumSub } from '@/utils/calculate'
export default {
  name: 'coupons',
  components: {
    detailsLeft,
    couponsPro,
    explain
  },
  data () {
    return {
      
      //接口请求参数列表

      //获取详情 参数
      requestCouponDetails: {
        user_id: getUserId() ,
        country_id: base64Decode(this.$route.params.countryId),
        id: base64Decode(this.$route.params.couponsId),
      },
      //获取该品类下的产品 
      requestData: {
        country_id: base64Decode(this.$route.params.countryId),
        menu_id: '',
        page: 1,
        page_size: 9
      },
      //领券
      reqGetCodeData: {
        country_id: base64Decode(this.$route.params.countryId),
        api_token: getToken(),
        user_id: getUserId(),
        coupon_id: base64Decode(this.$route.params.couponsId),
        username: '',
        generalize_uid: '',
        generalize_username: ''
      },
      //检测是否领券
      checkGetCodeData: {
        api_token: getToken(),
        user_id: getUserId(),
        coupon_id: ''
      },
      //加入推广
      addPromotionData: {
        api_token: getToken(),
        user_id: getUserId(),
        country_id: base64Decode(this.$route.params.countryId),
        coupon_id: base64Decode(this.$route.params.couponsId),
      },
      //提交问题
      addProblemData: {
        api_token: getToken(),
        user_id: getUserId(),
        product_id: '',
        menu: '',
        title: '',
        content: ''

      },
      //获取平台信息
      requestPlatData: {
        country_id: '',
        user_id: '',
      },
      //模板默认样式
      submitTemplateData: {
        api_token: getToken(),
        user_id: getUserId(),
        coupon_id:  base64Decode(this.$route.params.couponsId),
        content: '',
      },


      //品类列表
      classifyList: [
        {
          id: 0,
          name: 'Top'
        }
      ],
      arrcouponsDetails: [],   //该品类下的所有优惠券
      couponDetail: {},
      logoImg: {              //相应的平台logo
        amazon: require('../../assets/amazon_logo.png'),
        aliexpress: require('../../assets/aliexpress_logo.png')
      },
      userInfo: {            //发布人用户信息
        avatar_img: '',
        username: '',
        type: '',
        level: '',
        joined_date: '',
        coupon_posteds: '',
        pid: '',
      },
      options: [
        'Choose reason',
        'Dead deal',
        'Duplicate',
        'Bad link',
        'Spam',
        'Inaccurate',
        'No value',
        'Alive again'
      ],
      selected: 'Choose reason',
      imgList: [],
      imgUrl: '',

      added: false,                       //是否加入推广
      btnLoading: false,                 //按钮正在加载
      showGetCodeDialog: false,          //领取优惠券弹窗
      templateDialog: false,             //编辑模板弹窗
      getCodeSuccess: false,             //是否领取优惠券成功
      isFlagCoupon: false,              //是否显示问题反馈

      promotionTemplate: '#Promo_title#\nOnly ***#Promo_listprice#*** after using coupons\nGet #Coupon_value# coupons: #Promo_link#\nOrder now: #Order_link#\n#Promo_desctiption#\n', 
      promotionTemplateinit: '#Promo_title#\nOnly ***#Promo_listprice#*** after using coupons\nGet #Coupon_value# coupons: #Promo_link#\nOrder now: #Order_link#\n#Promo_desctiption#\n', 
      templateText: '',
      promoterPid: '123456789',         //推广PID  ，默认的
      currency: getStore('currency') || '$',
      titleMsg: '',
    }
  },
  computed: {
    ...mapGetters(['username', 'promotions', 'currentRouter']),
   
  },
  mounted () {
    this.init()
  },
  watch: {
    username () {
      this.reqGetCodeData.username = this.$store.getters.username
    },
    promotions () {
      this.couponsIsPromotion()
    }
  },
  methods: {
    //初始化
    init () {
      this.initData()
      this.getCouponsDetails()
    },

    //数据初始化
    initData () {
      this.reqGetCodeData.username = this.username

      //获取国家id ,传递给头部组件
      let country_id = base64Decode(this.$route.params.countryId)
      this.$root.eventHub.$emit('changeCountryId', country_id)

      this.$root.eventHub.$on('changeCurrency', data => {
        this.currency = data
      })


    },

    //判断参数是否存在
    isDataExit (object) {
      if (!object.api_token) {
        object.api_token = getToken()
        object.user_id = getUserId()
      }
    },


    //获取优惠券详情
    getCouponsDetails () {
      this.isDataExit(this.requestCouponDetails)
      this.$api.couponDetails(this.requestCouponDetails)
        .then(res => {
          if (res.data.coupon_user_template) {
            this.promotionTemplate = res.data.coupon_user_template.content
          }
          this.imgList = res.data.product_img.split(',')
          this.imgUrl = res.data.current_img
          this.couponDetail = res.data
          this.couponDetail.valid_date = parseTime(res.data.valid_date, '{y}-{m}-{d}')
          this.getAllCouponsInfo(res.data.menu_id)
          this.getPostUserInfo(res.data.user_id)
          this.couponsIsPromotion()
          this.changeTemplate()
          this.titleMsg = res.data.product_title + ' for ' +
                          this.currency + res.data.discount_price + 
                          (res.data.shipping_fee == 0 ? ' + free shipping' : '')
          
        })
        .catch(error => {
          console.log(error + 'couponDetails')
        })
    },

    //模版替换
    changeTemplate () {
      let template = this.promotionTemplate
      let promoLink
      if (location.href.indexOf('?promoter') >= 0) {
        promoLink = location.href
      } else {
        promoLink = `${location.href}${getUserId() ? '?promoter=' + getUserId() : ''}`
      }
      this.templateText = template
        .replace(/\n/g, '<br>')
        .replace(/#Platform#/g, this.couponDetail.website)
        .replace(/#Promo_title#/g, this.couponDetail.product_title)
        .replace(/#Promo_listprice#/g, `${this.currency}${this.couponDetail.product_price}`)
        .replace(/#Promo_scleprice#/g, this.couponDetail.discount_price)
        .replace(/#Coupon_value#/g, this.currency+(this.couponDetail.product_price - this.couponDetail.discount_price).toFixed(2))
        .replace(/#Discount_scale#/g, '%'+'this.couponDetail.discount_rate')
        .replace(/#Promo_desctiption#/g, this.couponDetail.product_reason)
        .replace(/#Promo_link#/g, promoLink)
        .replace(/#Order_link#/g, 'https://' + location.host + this.getOrderLink())
    },
    //显示编辑模板
    modifyTemplate () {
      if(this.isLogin()) {
        this.templateDialog = true
      }
    }, 
    
    //模板保存
    saveTemplate () {
      if (this.isLogin()) {
        this.isDataExit(this.submitTemplateData)
        this.submitTemplateData.content = this.promotionTemplate
        this.$api.editTemplate(this.submitTemplateData).then(res => {
          if (res.code === 200) {
            this.$snotify.success('save success')
            this.getCouponsDetails()
            this.templateDialog = false
          }
        }).catch(err =>{
          console.log(err)
        })
      }
    },

    //模版重置
    restoreTemplate () {
      this.promotionTemplate = this.promotionTemplateinit
      this.saveTemplate()
    },

    //获取左边的图片信息
    getImgUrl (data) {
      this.imgUrl = data
    },

    //复制产品推广文案
    handleClip (e) {
      Clip(e)
    },

    //跳转到产品详情页面
    gotodetails (id) {
      this.requestCouponDetails.id = id
      document.body.scrollTop = document.documentElement.scrollTop = 0
      this.$router.push({ path: '/coupons/' + base64Encode(id) + '/' + this.$route.params.countryId })
      this.getCouponsDetails()
    },

    //领取优惠券
    getCode () {  
      if(!this.isLogin()) {
        return
      }
      this.isDataExit(this.checkGetCodeData)
      this.checkGetCodeData.coupon_id = base64Decode(this.$route.params.couponsId)
      this.$api.isUserGetCoupon(this.checkGetCodeData).then(res => {
        this.showGetCodeDialog = true
        if (res.data) {
          this.getCodeSuccess = true
        }
      })
    },
    //关闭领取优惠券的弹窗
    close () {
      this.showGetCodeDialog = false
    },

    gotoTrials () {
      this.$router.push({ path: '/trials' })
    },
    


    //获取该品类下的优惠券
    getAllCouponsInfo (menuId) {
      this.requestData.menu_id = menuId
      this.$api.getAllCoupons(this.requestData) 
        .then(res => {
          let newArr = []
          res.data.data.forEach(e => {
            if (e.status == 1) {
              newArr.push(e)
            }
          })
          this.arrcouponsDetails = newArr
        })
        .catch(error => {
          console.log(error + 'getAllCoupons')
        })
    },

    //获取发布人的信息
    getPostUserInfo (user_id) {
      var request = { user_id: user_id }
      this.$api.postedUserInfo(request)
        .then(res => {
          res.data.joined_date = timestampFormat(res.data.joined_date)
          this.userInfo = res.data
          this.userInfo.user_id = this.couponDetail.user_id
          this.userInfo.product_url = this.couponDetail.product_url
        })
        .catch(error => {
          console.log(error + ' postedUserInfo')
        })
    },

    //加入推广
    addPromotion () {
      if (this.isLogin()) {
        this.isDataExit(this.addPromotionData)
        this.$api.promotionAddCoupon(this.addPromotionData).then(res => {
          if (res.code === 200) {
            this.added = true
            this.promotions.push(this.couponDetail.id)
            this.$store.commit('SET_PROMOTIONS', this.promotions)
          }
        })
      }
    },

    //取消推广
    removePromotion () {
      if (this.isLogin()) {
        this.isDataExit(this.addPromotionData)
        this.$api.promotionUserRemove(this.addPromotionData).then(res => {
          if (res.code === 200) {
            this.added = false
            this.ArrayRemove(this.promotions, this.couponDetail.id)
            this.$store.commit('SET_PROMOTIONS', this.promotions)
          }
        })
      }
    },

    //数组移除元素
    ArrayRemove (arr, val) {
      let index = arr.indexOf(val)
      if (index > -1) {
        arr.splice(index, 1)
      }
    },
 

    //领取优惠券
    getCouponCode (e) {
      if (this.isLogin()) {
        if (this.isStop()) {
          this.$snotify.info('The activity is over, or the coupon has been received')
          return
        }
        e.target.disabled = true
        this.isDataExit(this.reqGetCodeData)
        this.$api.userGetCoupon(this.reqGetCodeData).then(() => {
          e.target.disabled = false
          this.getCodeSuccess = true
        }).catch(() => {
          e.target.disabled = false
        })
      }
    },

    //复制优惠券
    copyCode (e) {
      Clip(e)
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

    //判断状态是否为停止，停止则不能领劵
    isStop () {
      return this.couponDetail.run_status === 'stop' ? true : false
    },  

    //如果用户登录，判断该产品用户是否加入推广
    couponsIsPromotion () {
      if (getToken()) {
        if (this.promotions.includes(this.couponDetail.id)) {
          this.added = true
          return
        } 
        this.added = false
      }
    },

    //选择不同品类优惠券过滤
    gotoIndex () {
      this.$root.eventHub.$emit('selectClassify1', this.requestData.menu_id)
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
      if (!this.isLogin()) {
        return
      }
      if (base64Decode(this.$route.params.couponsId)) {
        this.addProblemData.menu = 'coupons'
        this.addProblemData.product_id = base64Decode(this.$route.params.couponsId)
      }
      if (!this.addProblemData.content) {
        return
      }
      if (this.addProblemData.content.length > 30) {
        this.$snotify.error('You can only type 30 characters')
        return
      }
      this.btnLoading = true
      this.isDataExit(this.addProblemData)
      this.$api.addProblem(this.addProblemData).then(res => {
        this.btnLoading = false
        if (res.code === 200) {
          this.$snotify.success('Submitted successfully!')
          this.isFlagCoupon = false
          this.selected = 'Choose reason'
        }
      }).catch(error => {
        this.btnLoading = false
        console.log(error)
      })
    },

    enterSubmit () {
      this.addProblemSubmit()
    },

    getOrderLink () {
      let router = this.currentRouter.replace('/coupons', '')
      let endUrl = `/goto${router}/${base64Encode(getUserId() ? getUserId() : '')}`
      return endUrl
    },
   
    //跳转到相应 商品链接
    gotoPlatform (url) {
      let route = this.getOrderLink()
      window.open(route)
    },

    //facebook 分享
    shareFaceBook () {
      FB.ui(
        {
          method: 'share_open_graph',
          action_type: 'og.likes',
          action_properties: JSON.stringify({
            object: location.href,
          })
        },
        
        // callback
        function (response) {
          if (response && !response.error_message) {
            alert('Posting completed.')
          } else {
            alert('Error while posting.')
          }
        }
      )
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
  padding: 0;
}
.details-content {
  position: relative;
}
.details-left-coupons {
  top: 149px;
}
.el-dialog--small {
  width: 40rem !important;
}
.el-dialog {
  width: 40rem;
}
.inline {
  display: inline-block;
  &.left {
  }
  &.right {
    float: right;
    width: 55.5rem;
    margin-top: 54px;
    .promotion {
      position: relative;
      // height: 22rem;
      padding: 1rem;
      background: white;
      border-radius: 5px;
      margin-bottom: 1rem;
      border: 1px solid #d2d2d2;  
      .img {
        position: absolute;
        cursor: pointer;
        right: 1.5rem;
        top: 2rem;
        height: 35px;
      }
      .title {
        width: 80%;
        font-size: 21px;
        color: black;
        font-weight: 500;
        margin-bottom: 1rem;
      }
      .describe {
        width: 90%;
        font-size: 0.9rem;
        color: #808080;
        margin-bottom: 1rem;
      }
      .price-details {
        height: 4.22rem;
        background: #fafafa;
        line-height: 4.22rem;
        span {
          display: inline-block;
          font-size: 0.78rem;
          color: #808080;
        }
        .n-price {
          font-size: 21px;
          color: #333;
          font-weight: 700;
          margin-right: 1rem;
          margin-left: 1rem;
        }
        .o-price {
          text-decoration: line-through;
          font-weight: bold;
          margin-right: 100px;
        }
        .c-price {
          margin-right: 80px;
        }
      }
      .data-info {
        height: 20px;
        line-height: 20px;
        color: #808080;
        font-size: 12px;
        margin-top: 0.5rem;
        .right {
          float: right;
          cursor: pointer;
          height: 17px;
          line-height: 1;
          overflow: hidden;
          &.flagcoupon {
            &:hover {
              color: #0072bc;
              .iconfont {
                color: #0077bc;
              }
            }
          }
          .iconfont {
            position: relative;
            top: 3px;
            color: #808080;
          }
        }
        .expried {
          margin-right: 2rem;
          margin-left: 0rem;
        }
      }
      .select {
        position: absolute;
        right: 10px;
        font-weight: normal;
        height: 2rem;

        select {
          position: absolute;
          right: 5px;
          color: #808080;
          font-size: 12px;
          min-width: 6rem;
          option {
            color: #808080;
            font-size: 12px;
          }
        }
      }
      .btn-promotion {
        margin-top: 22px;
        .add-promo {
          margin-right: 2rem;
          button {
            .btn-h(10rem, 3rem, #85bb3b, #85bb3b, #fff);
            line-height: 3rem;
            text-align: center;
            line-height: 0.8;
          }
        }
        .get-code {
          button {
            .btn-h(10rem, 3rem, #85bb3b, #85bb3b, #fff);
          }
        }
        .question {
          float: right;
          text-align: right;
          .wrong {
            margin-bottom: 0.3rem;
            margin-top: 6px;
            font-size: 12px;
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
    }
    .commission {
      position: relative;
      height: 5.5rem;
      background: white;
      border-radius: 5px;
      margin-bottom: 1rem;
      padding: 1rem;
      .commission-title {
        width: 70%;
        font-size: 1.33rem;
        color: #1a1a1a;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .describe {
        width: 90%;
        font-size: 0.9rem;
        color: #808080;
        margin-bottom: 1rem;
      }
    }
    .promotion-template {
      position: relative;
      background: white;
      border-radius: 5px;
      margin-bottom: 1rem;
      border: 1px solid #d2d2d2;
      .promo-head {
        padding: 0 1rem;
        height: 3rem;
        line-height: 3rem;
        border-bottom: 1px solid #e1e1e1;
        .promo-head-l {
          display: inline-block;
          height: 100%;
          font-size: 16px;
          font-weight: bold;
          color: #1a1a1a;
          width: 43rem;
          border-right: 1px solid #e1e1e1;
        }
        .promo-head-r {
          display: inline-block;
          width: 10rem;
          text-align: center;
          cursor: pointer;
          &:hover {
            color: #0072bc;
            a {
              text-decoration: underline;
            }
          }
        }
      }
      .promo-content {
        padding: 1rem;
        .card {
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
          border-radius: 5px;
          .img {
            padding: 2rem 0 0 0;
            text-align: center;
            img {
              width: 23rem;
              height: 20rem;
            }
          }
          .text-describe {
            margin-top: 2rem;
            font-size: 13px;
            padding: 1rem;
          }
        }
        .share-to-p {
          margin-top: 1.67rem;
          height: 5rem;
          .share {
            .share-a {
              color: #cccccc;
              &:hover {
                text-decoration: none;
              }
            }
            .text {
              color: #808080;
              margin-right: 0.5rem;
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
          }
          button {
            .btn-h(9rem, 2.67rem, #85bb3a, #85bb3a, #fff);
          }
          span {
            float: right;
          }
        }
        .use-it {
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    .recommend {
      position: relative;
      min-height: 10rem;
      background: white;
      border-radius: 5px;
      margin-bottom: 1rem;
      padding-left: 1rem;
      border: 1px solid #d2d2d2;
      .re-head {
        padding: 1rem 1rem 1rem 0;
        height: 3rem;
        border-bottom: 1px solid #e1e1e1;
        .re-head-l {
          font-size: 16px;
          font-weight: 700;
          color: #333;
        }
        .re-head-r {
          position: relative;
          cursor: pointer;
          float: right;
          margin-right: 12px;
          display: inline-block;
          i {
            position: absolute;
            right: -10px;
            top: 1px;
          }
        }
      }
      .coupons-product {
        width: 16.1rem;
        margin: 0.5rem 1rem 0.5rem 0.35rem;
      }
    }
  }
}
.code-dialog {
  .title {
    margin-left: 144px;
    cursor: pointer;
    display: inline-block;
    width: 432px;
    font-weight: bold;
    font-size: 18px;
    img {
      position: absolute;
      left: -125px;
      top: 0;
    }
  }
  .dialog-body {
    text-align: center;
    
    .top {
      padding-top: 36px;
      height: 216px;
      .head {
        font-size: 21px;
        font-weight: bold;
        margin-bottom: 18px;
        color: #1a1a1a;
      }
      .goto-amazon {
        color: #808080;
        margin-bottom: 18px;
        font-size: 13px;
      }
      .discount {
        button {
          .btn-h(360px,54px, #85bb3b, #85bb3b, #fff);
          font-size:18px
        }
      }
      .coupon-code {
        position: relative;
        width: 360px;
        height: 54px;
        border-radius: 4px;
        margin: 0 auto;
        text-align: left;
        padding-left: 72px;
        line-height: 54px;
        background: #e5f0e1;
        button {
          position: absolute;
          top: 9px;
          right: 18px;
          .btn-h(90px,36px, #85bb3b, #85bb3b, #fff);
          font-size: 18px;
        }
        .code {
          color: #49663f;
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
  }
}

.template-dialog {
  .dialog-body {
    height: 500px;
    display: flex;
    justify-content: space-between;
    margin-left: 20px;
    margin-right: 20px;
    .box {
      position: relative;
      float: left;
      width: 440px;
      height: 83%;
      border-radius: 5px;
      box-shadow: 0 0px 5px rgba(0, 0, 0, 0.3);
      h3 {
        border-bottom: 1px solid #e1e1e1;
        padding-bottom: 20px;
        padding-left: 20px;
      }
      .content {
        padding-left: 5px;
        padding-right: 5px;
        .right {
          float: right;
        }
        .text {
          margin-bottom: 5px;
        }
        textarea {
          width: 100%;
          height: 300px;
          border: none;
          outline: none;
          resize: none;
          overflow: hidden;
          overflow-y: auto;
          font-size: 14px;
          color: #565656;
        }
      }
      .footer {
        position: absolute;
        bottom: -50px;
        width: 100%;
        height: 30px;
        text-align: left;
        &.right {
          line-height: 2;
          text-align: center;
          span {
            color: #808080;
            cursor: pointer;
            &:hover {
              color: darken(#808080, 80%);
            }
          }
          .reset {
            margin-right: 100px;
          }
        }
      }
      .save {
        position: absolute;
        .btn-h(77px,77px,#2089bb, #2089bb, white);
        bottom: -38.5px;
        left: 50%;
        margin-left: -38.5px;
        border-radius: 100%;
        &:active {
          background: darken(#2089bb, 10%);
          border-color: darken(#2089bb, 10%);
        }
      }
    }
  }
}
.explain {
  width: inherit;
}
</style>
