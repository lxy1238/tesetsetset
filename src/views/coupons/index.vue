<template>
  <div class="page-index" >
    <div class="pages-content" >
      <div class="head-crumbs"  v-if="couponDetail.valid_date">
        <span class=" gray-s">Coupons > {{couponDetail.menu.name}}</span> 
      </div>
      <div class="details-content clearfix"  v-if="couponDetail.valid_date"  v-title="couponDetail.product_title">
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
              <span @click="gotoPlatform(couponDetail.product_url)">
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
              <span class="inline-b c-price">Coupon {{currency}}{{(couponDetail.product_price - couponDetail.discount_price).toFixed(2)}}</span>
              <span class="inline-b ratio">{{couponDetail.discount_rate}}%off</span>
            </div>
            <div class="data-info">
              <span class="inline-b expried">Expried:{{couponDetail.valid_date}}</span>
              <span class="inline-b" v-if="couponDetail.shipping_fee == '0.00'">Free shopping</span>
              <span class="inline-b" v-else>Shipping fee: {{couponDetail.shipping_fee}}</span>
              <span class="inline-b right" @click="flagCoupon"><i class="iconfont icon-xiaohongqi"></i> Flag this coupon</span>
            </div>
            <div class="select" v-if="isFlagCoupon">
              <select name="" id="" v-model="selected" @change="selectProblem">
                <option v-for="(item, index) in options" :value="item" :label="item" >{{item}}</option>
              </select>
            </div>
            <div class="btn-promotion">
                <div class="inline-b add-promo">
                  <button v-if="added" @click="removePromotion"><span>Cancel Promo</span> <i class=" el-icon-check"></i></button>
                  <button v-else  @click="addPromotion"><span>Add Promo</span></button>
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
                Modify template
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
                   <a class="share-a" onclick="javascript:window.open('http://pinterest.com/pin/create/link/?url='+encodeURIComponent(document.location.href)+'&t='+encodeURIComponent(document.title));void(0);"  target="_blank"><i class="iconfont icon-pinterest"></i></a>
                   <!-- <a class="share-a" @click="shareFaceBook" href="javascript:void(0);"><i class="iconfont icon-facebook1"></i></a> -->
                  <a class="share-a" onclick="javascript:window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(document.location.href)+'&t='+encodeURIComponent(document.title));void(0);" href="javascript:void(0);"><i class="iconfont icon-facebook1"></i></a>
                   <a class="share-a" onclick="javascript:window.open('http://twitter.com/home?status='+encodeURIComponent(document.location.href)+'&t='+encodeURIComponent(document.title));void(0);" href="javascript:void(0);"><i class="iconfont icon-tuite_twitter"></i></a>
                 </span>
               </div>
               <div class="promo-footer center">
                 <a href="#" class="use-it">How to Use? Click here >></a>
               </div>
            </div>
          </div>
          <div class="recommend">
            <div class="re-head">
              <span class="re-head-l">recommend</span>
              <span class="re-head-r" @click="gotoIndex" >more></span>
            </div>
              <coupons-pro 
                v-for="couponsDetails in arrcouponsDetails"  
                :key="1" 
                :couponsDetails="couponsDetails"
                @gotodetails="gotodetails">
                <template slot="price">
                <p class="price content">{{currency}}{{couponsDetails.product_price}}</p>
                <p class="coupons content">
                  <span><i class="gray-s">Coupons</i> <strong>{{couponsDetails.discount_price}}</strong></span>
                  <span class="coupon-right"><strong>{{couponsDetails.discount_rate}}%</strong> <i class="gray-s">off</i> </span>
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
            <div class="goto-amazon"><span ><a href="javascript:void(0)" @click="gotoPlatform(couponDetail.product_url)">Go to Amszon</a> and paste this code at checkout</span></div>
            <div class="discount" @click="getCouponCode($event)" v-if="!getCodeSuccess"><button>Discount Coupon Worth  {{currency}} {{couponDetail.discount_price}}</button></div>
            <div class="coupon-code"  v-else>
              <span id="couponId" class="code">{{couponDetail.coupon_code}}</span>
              <button data-clipboard-target="#couponId" @click="copyCode($event)">copy</button>
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
              <p>Labels are recommended,You can adjust your content display methods yourself.</p>
              <div class="text"><span>#Platform#</span> <span class="right">This is the platform of the promotion. </span></div>
              <div class="text"><span>#Promo_title#</span> <span class="right">This is the title of the promotion. </span></div>
              <div class="text"><span>#Promo_listprice#</span> <span class="right">This is the listprice of the promotion. </span></div>
              <div class="text"><span>#Promo_saleprice#</span> <span class="right">This is the saleprice of the promotion. </span></div>
              <div class="text"><span>#Coupon_value#</span> <span class="right">This is the coupon of the promotion. </span></div>
              <div class="text"><span>#Discount_scale#</span> <span class="right">This is the scale of the promotion. </span></div>
              <div class="text"><span>#Promo_description#</span> <span class="right">This is the description of the promotion. </span></div>
              <div class="text"><span>#Promo_link#</span> <span class="right">This is the link of the promotion. </span></div>
            </div>
            <div class="footer">
              <span>
                If you do not operate, will not be able to output the corresponding
                information. 
                <a href="javascript:void(0);">Not understand? View tutorial >></a>
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

      promotionTemplate: '#Promo_title#\nSave price: #Promo_listprice# \t Coupon Value: #Coupon_value#\n#Promo_desctiption#\nClick to get coupon: #Promo_link#', 
      promotionTemplateinit: '#Promo_title#\nSave price: #Promo_listprice# \t Coupon Value: #Coupon_value#\n#Promo_desctiption#\nClick to get coupon: #Promo_link#', 
      templateText: '',
      promoterPid: '123456789',         //推广PID  ，默认的
      currency: getStore('currency') || '$'
    }
  },
  computed: {
    ...mapGetters(['username', 'promotions']),
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

    //判断链接中携带哪个pid , 如果有分享人的id 那就携带分享人的pid， 如果没有分享人，则携带公司的pid
    hasPromoter () {
      if (this.$route.query.promoter) {
        let promoterUserId = parseInt(this.$route.query.promoter)
        this.requestPlatData.user_id = promoterUserId
        this.requestPlatData.country_id = base64Decode(this.$route.params.countryId)
        this.$api.postUserPid(this.requestPlatData).then(res => {
          for (let i of res.data) {
            if (i.platform_id === this.couponDetail.platform_id) {
              if (i.PID) {
                this.promoterPid = i.PID
                this.userInfo.pid = i.PID
              } 
            }
          }
        })
      } else {
        this.promoterPid = '12345678'
        this.userInfo.pid = this.promoterPid
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
          this.changeTemplate()
          this.couponsIsPromotion()
          
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
            this.$message.success('Save success')
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
            if (e.status == 1 && e.run_status == 'active') {
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
          this.hasPromoter()
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
          this.$message.info('The activity is over, or the coupon has been received')
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
        this.$message.error('You can only type 30 characters')
        return
      }
      this.btnLoading = true
      this.isDataExit(this.addProblemData)
      this.$api.addProblem(this.addProblemData).then(res => {
        this.btnLoading = false
        if (res.code === 200) {
          this.$message.success('Submitted successfully!')
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

    
   
    //跳转到相应 商品链接
    gotoPlatform (url) {
      let endUrl = `${url}&tag=${this.promoterPid}`
      window.open(endUrl)
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
      .img {
        position: absolute;
        cursor: pointer;
        right: 1.5rem;
        top: 2rem;
      }
      .title {
        width: 70%;
        cursor: pointer;
        font-size: 1.33rem;
        color: #1a1a1a;
        font-weight: bold;
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
          font-size: 1.33rem;
          color: #1a1a1a;
          font-weight: bold;
          margin-right: 1rem;
          margin-left: 1rem;
        }
        .o-price {
          text-decoration: line-through;
          font-weight: bold;
          margin-right: 28rem;
        }
        .c-price {
          margin-right: 1rem;
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
          cursor: pointer;
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
        margin-top: 2rem;
        .add-promo {
          margin-right: 2rem;
          button {
            .btn-h(10rem, 3rem, #85bb3b, #85bb3b, #fff);
            line-height: 3rem;
            text-align: center;
            line-height: 0.8;
            span {
              font-size: 1rem;
            }
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
            font-size: 1rem;
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
      .promo-head {
        padding: 0 1rem;
        height: 3rem;
        line-height: 3rem;
        border-bottom: 1px solid #e1e1e1;
        .promo-head-l {
          display: inline-block;
          height: 100%;
          font-size: 1.22rem;
          font-weight: bold;
          color: #1a1a1a;
          width: 44rem;
          border-right: 1px solid #e1e1e1;
        }
        .promo-head-r {
          display: inline-block;
          width: 9rem;
          text-align: center;
          cursor: pointer;
          &:hover {
            color: #ff6700;
          }
        }
      }
      .promo-content {
        padding: 1rem;
        .card {
          // height: 36rem;
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
            font-size: 1rem;
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
      .re-head {
        height: 3rem;
        padding: 1rem;
        border-bottom: 1px solid #e1e1e1;
        .re-head-l {
          font-size: 1.25rem;
          color: #1a1a1a;
        }
        .re-head-r {
          cursor: pointer;
          float: right;
          color: #808080;
          &:hover {
            color: red;
          }
        }
      }
      .coupons-product {
        width: 16.1rem;
        height: 360px;
        margin: 0.5rem 1rem 0.5rem 0.35rem;
      }
    }
  }
}
.code-dialog {
  .title {
    margin-left: 8rem;
    cursor: pointer;
    display: inline-block;
    width: 24rem;
    font-weight: bold;
    font-size: 1rem;
    img {
      position: absolute;
      left: -110px;
      top: 0;
    }
  }
  .dialog-body {
    text-align: center;
    .top {
      padding-top: 2rem;
      height: 12rem;
      .head {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 1rem;
        color: #1a1a1a;
      }
      .goto-amazon {
        color: #808080;
        margin-bottom: 1rem;
        font-size: 0.66rem;
      }
      .discount {
        button {
          .btn-h(20rem,3rem, #85bb3b, #85bb3b, #fff);
          font-size: 1rem;
        }
      }
      .coupon-code {
        position: relative;
        width: 20rem;
        height: 3rem;
        margin: 0 auto;
        text-align: left;
        padding-left: 4rem;
        line-height: 3rem;
        background: #e5f0e1;
        button {
          position: absolute;
          top: 0.5rem;
          right: 1rem;
          .btn-h(5rem,2rem, #85bb3b, #85bb3b, #fff);
          font-size: 1rem;
        }
        .code {
          color: #49663f;
          font-size: 1rem;
          font-weight: bold;
        }
      }
    }
  }
}

.template-dialog {
  .dialog-body {
    height: 500px;
    padding-left: 50px;
    .box {
      position: relative;
      float: left;
      width: 44%;
      height: 83%;
      margin: 1rem 20px;
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
