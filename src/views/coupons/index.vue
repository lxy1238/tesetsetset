<template>
  <div class="page-index">
    <div class="pages-content">
      <div class="head-crumbs">
        <span class=" gray-s">Coupons > Home</span> 
      </div>
      <div class="details-content clearfix">
        <div class="left inline">
          <details-left :isTop="isTop" 
                        :imgList="imgList" 
                        :userInfo="userInfo"
                        @send="getImgUrl" 
                        class="details-left-coupons"
                        ></details-left>      
        </div>
        <div class="right inline">
          <div class="promotion">
            <img class="img"  src="../../assets/amazon.png" alt="">
            <div class="title">
              <span >
                {{couponDetail.product_title}}
              </span>
            </div>
            <div class="describe">
              <span>{{couponDetail.product_reason}}
              </span>
            </div>
            <div class="price-details">
              <span class="inline-b n-price">${{couponDetail.discount_price}}</span>
              <span class="inline-b o-price">${{couponDetail.product_price}}</span>
              <span class="inline-b c-price">Coupons ${{(couponDetail.product_price - couponDetail.discount_price).toFixed(2)}}</span>
              <span class="inline-b ratio">{{couponDetail.discount_rate}}%off</span>
            </div>
            <div class="data-info">
              <span class="inline-b expried">Expried:{{couponDetail.valid_date}}</span>
              <span class="inline-b">Free shopping</span>
              <span class="inline-b right"><i class="iconfont icon-xiaohongqi"></i> Flag this coupon</span>
            </div>
            <div class="select">
              <select name="" id="" v-model="selected">
                <option v-for="(item, index) in options" :value="index" >{{item}}</option>
              </select>
            </div>
            <div class="btn-promotion">
                <div class="inline-b add-promo">
                  <button v-if="userPromotions.indexOf(couponDetail.id) >= 0 " @click="removePromotion"><span>Added</span> <i class=" el-icon-check"></i></button>
                  <button v-else  @click="addPromotion"><span>Add Promo</span></button>
                </div>
                <div class="inline-b add-promo get-code">
                   <button @click="getCode"><span>Get Code</span></button>
                </div>
                <div class="inline-b question">
                  <div class="wrong"><span>What’s wrong with this deal?</span></div>
                  <div class="submit">
                    <input type="text">
                    <button><span>Submit</span></button>
                  </div>
                </div>
            </div>
          </div>
          <div class="commission">
             <div class="commission-title">
              <span>
                Extra commissions
              </span>
            </div>
            <div class="describe">
              <span>After joining the promotion, each issue a coupon, you can recei
              </span>
            </div>
          </div>
          <div class="promotion-template">
            <div class="promo-head">
              <div class="promo-head-l">
                Promotion template
              </div>
              <div class="promo-head-r" @click="templateDialog = true">
                <i class="iconfont icon-modify1"></i>
                Modify template
              </div>
            </div>
            <div class="promo-content">
               <div class="card" id="proCard">
                 <div class="img" >
                   <img :src="imgUrl" alt="">
                 </div>
                 <div class="text-describe">
                   (Amazon) 2-Pk of 30oz Ozark Trail Double-Wall Vacuum-Sealed Tum<br><br>
                    Save price: $99.00       Discount: 25%off       Coupon Value: $15.00<br><br>
                    Women’s Girls Soft PU Multi Card Holder Long Wallet Purse Cellphone Bag Clutch Bag.<br><br>
                    Click to get coupon: https://translate.google.cn/dp/vppdsdf
                 </div>
               </div>
               <div class="share-to-p">
                 <button  data-clipboard-target="#proCard" @click="handleClip($event)">Copy</button>
                 <span class="share">
                   <i class="text">Promotion on:</i> 
                   <a class="share-a" href="#"><i class="iconfont icon-pinterest"></i></a>
                   <a class="share-a" href="#"><i class="iconfont icon-facebook1"></i></a>
                   <a class="share-a" href="#"><i class="iconfont icon-tuite_twitter"></i></a>
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
              <span class="re-head-r">more></span>
            </div>
              <coupons-pro 
              v-for="couponsDetails in arrcouponsDetails"  
              :key="1" 
              :couponsDetails="couponsDetails"
              :promotions="userPromotions" 
              @gotodetails="gotodetails">
                <template slot="price">
                <p class="price content">{{couponsDetails.price}}</p>
                <p class="coupons content">
                  <span><i class="gray-s">Coupons</i> <strong>{{couponsDetails.coupons}}</strong></span>
                  <span class="coupon-right"><strong>35%</strong> <i class="gray-s">off</i> </span>
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
        <span slot="title" class="title">
          {{couponDetail.product_title}}
          <img src="../../assets/amazon.png" alt="">
        </span>
        <div class="dialog-body">
          <div class="top">
            <div class="head"><span >Here's your coupon code</span></div>
            <div class="goto-amazon"><span ><a href="#">Go to Amszon</a> and paste this code at checkout</span></div>
            <div class="discount" @click="getCouponCode" v-if="!getCodeSuccess"><button>Discount Coupon Worth $ 15</button></div>
            <div class="coupon-code"  v-else>
              <span id="couponId" class="code">{{couponDetail.coupon_code}}</span>
              <button data-clipboard-target="#couponId" @click="copyCode($event)">copy</button>
              </div>
          </div>
          <div class="bottom" v-if="false">
            <div class="head"><span>Get great coupons - like this - delivered straight to your inbo</span></div>
            <div class="submit">
              <input type="text" placeholder="Enter your email address" /><button>Submit</button>
            </div>
            <div class="or">
                <span>OR</span>
                <div class="line"></div>
            </div>
            <div class="join-f-g">
              <button class="facebook"><i class="iconfont icon-facebook"></i>Join with Facebook</button>
              <button class="google"><i class="iconfont icon-googleplus"></i> Join with Google</button>
            </div>
            <div class="footer">
              <span>
                By signing up, you agree to our <a href="#">Terms of Sevice</a>  and  <a href="#">Privacy Pol</a>
              </span>
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
              <div class="text"><span>#Platform#</span> <span class="right">This is the title of the promotion. </span></div>
              <div class="text"><span>#Promo_title#</span> <span class="right">This is the title of the promotion. </span></div>
              <div class="text"><span>#Promo_listprice#</span> <span class="right">This is the title of the promotion. </span></div>
              <div class="text"><span>#Promo_saleprice#</span> <span class="right">This is the title of the promotion. </span></div>
              <div class="text"><span>#Coupon_value#</span> <span class="right">This is the title of the promotion. </span></div>
              <div class="text"><span>#Discount_scale#</span> <span class="right">This is the title of the promotion. </span></div>
              <div class="text"><span>#Promo_description#</span> <span class="right">This is the title of the promotion. </span></div>
              <div class="text"><span>#Promo_link#</span> <span class="right">This is the title of the promotion. </span></div>
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
              <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
            <button class="save" @click="saveTemplate">Save</button>
            <div class="footer right">
              <span class="reset"><i class="iconfont icon-reset"></i> Restore</span>
              <span @click="templateDialog = false"> <i class="iconfont icon-cha"></i> Cancel</span>
            </div>
          </div>
        </div>
      </el-dialog>

      <!-- not get trials -->
      <el-dialog  :visible.sync="notGetTrialsDialog" class="not-trials-dialog" size="tiny">
          <p>You did not get trials</p>

          <div class="try-again">
            <button @click="gotoTrials">Try out other gifs</button>
          </div>

      </el-dialog>
  </div>
</template>

<script>
import detailsLeft from "@/components/coupons/details_left.vue";
import couponsPro from "@/components/page_index_coupons/image_product.vue";
import codeDialog from "@/components/coupons/code_dialog.vue";
import explain from "@/components/trials/explain.vue";
import Clip from "@/utils/clipboard.js";

import { getStore, removeStore } from "@/utils/utils";
import { timestampFormat } from "@/utils/date";
import {
  getAllCoupons,
  couponDetails,
  postedUserInfo,
  userGetCoupon,
  isUserGetCoupon,
  promotionAddCoupon,
  promotionUserRemove,
  getInfo
} from "@/api/login";
import { getToken } from "@/utils/auth";
import { mapGetters } from "vuex";
export default {
  name: "coupons",
  components: {
    detailsLeft,
    couponsPro,
    codeDialog,
    explain
  },
  data() {
    return {
      isTop: true,
      userInfo: {
        avatar_img: "",
        username: "",
        type: "",
        level: "",
        joined_date: "",
        coupon_posteds: ""
      },
      imgList: [],
      html: "hello",
      options: [
        "Choose areason",
        "Dead deadl",
        "Duplicate",
        "Bad link",
        "Spam",
        "Inaccurate",
        "No value",
        "Alive again"
      ],
      selected: 0,
      added: true,
      imgUrl: "",
      arrcouponsDetails: [],
      couponDetail: {},
      showGetCodeDialog: false,
      templateDialog: false,
      notGetTrialsDialog: false,
      getCodeSuccess: false, //是否领取优惠券成功
      userPromotions: [],
      requestData: {
        page: 1,
        page_size: 9
      },
      requestCouponDetails: {
        id: ""
      },
      reqGetCodeData: {
        api_token: getToken(),
        coupon_id: "",
        pick_uid: "",
        pick_username: "",
        generalize_uid: "",
        generalize_username: ""
      },
      checkGetCodeData: {
        api_token: getToken(),
        coupon_id: "",
        pick_uid: ""
      },
      addPromotionData: {
        api_token: getToken(),
        coupon_id: "",
        user_id: ""
      }
    };
  },
  computed: {
    ...mapGetters(["username", "user_id"])
  },
  mounted() {
    getAllCoupons(this.requestData)
      .then(res => {
        this.arrcouponsDetails = res.data.data;
        // this.allpage = res.data.last_page
      })
      .catch(error => {
        console.log(error + "getAllCoupons");
      });
    this.getCouponsDetails();
    this.couponsGetInfo();
    // this.getPostUserInfo()
    this.reqGetCodeData.pick_uid = this.user_id;
    this.reqGetCodeData.pick_username = this.username;
    this.reqGetCodeData.coupon_id = this.$route.params.couponsId;
  },
  //组件销毁前
  beforeDestroy() {
    // removeStore('couponId')
  },
  methods: {
    test() {
      var a = document.getElementById("test").value;
      var b = a.replace(/\n/g, "<br>").replace(/a/g, this.html);
      document.getElementById("box").innerHTML = b;
      console.log(this.selected);
    },

    //获取左边的图片信息
    getImgUrl(data) {
      this.imgUrl = data;
    },

    //复制产品推广文案
    handleClip(e) {
      Clip(e);
    },
    //跳转到产品详情页面
    gotodetails(id) {
      this.requestCouponDetails.id = id;
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.getCouponsDetails(this.requestCouponDetails);
      this.$router.push({ path: "/coupons" });
    },
    getCode() {
      this.checkGetCodeData.pick_uid = this.user_id;
      this.checkGetCodeData.coupon_id = this.$route.params.couponsId;
      isUserGetCoupon(this.checkGetCodeData).then(res => {
        console.log(res.data);
        this.showGetCodeDialog = true;
        if (!res.data) {
        } else {
          this.getCodeSuccess = true;
        }
      });
    },
    //关闭领取优惠券的弹窗
    close() {
      this.showGetCodeDialog = false;
    },
    submit() {},
    gotoTrials() {
      this.$router.push({ path: "/trials" });
    },
    saveTemplate() {},
    //获取优惠券详情
    getCouponsDetails() {
      this.requestCouponDetails.id = this.$route.params.couponsId;
      couponDetails(this.requestCouponDetails)
        .then(res => {
          this.userInfo = res.data.user_base;
          this.imgList = res.data.product_img.split(",");
          this.imgUrl = this.imgList[0];
          this.couponDetail = res.data;
          var valid_date = new Date();
          valid_date.setTime(res.data.valid_date * 1000);
          this.couponDetail.valid_date = valid_date.toLocaleDateString();
        })
        .catch(error => {
          console.log(error + "couponDetails");
        });
    },

    //获取发布人的信息
    getPostUserInfo() {
      var request = { user_id: this.$route.params.postUserId };
      postedUserInfo(request)
        .then(res => {
          this.reqGetCodeData.pick_username = res.data.username;
          this.reqGetCodeData.pick_uid = this.$route.params.postUserId;
          this.reqGetCodeData.coupon_id = this.$route.params.couponsId;
        })
        .catch(error => {
          console.log(error + " postedUserInfo");
        });
    },

    //取消推广
    removePromotion() {
      if (this.isLogin()) {
        this.addPromotionData.user_id = this.user_id;
        this.addPromotionData.coupon_id = this.$route.params.couponsId;
        promotionUserRemove(this.addPromotionData).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.couponsGetInfo();
            this.added = true;
          }
        });
      }
    },

    //加入推广
    addPromotion() {
      if (this.isLogin()) {
        this.addPromotionData.user_id = this.user_id;
        this.addPromotionData.coupon_id = this.$route.params.couponsId;
        promotionAddCoupon(this.addPromotionData).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.couponsGetInfo();
            this.added = false;
          }
        });
      }
    },

    //领取优惠券
    getCouponCode() {
      if (this.isLogin()) {
        userGetCoupon(this.reqGetCodeData).then(res => {
          this.getCodeSuccess = true;
        });
      }
    },
    copyCode(e) {
      Clip(e);
    },

    //判断是否登录，否则提醒请登录
    isLogin() {
      if (!getToken()) {
        this.$alert("please log in first", "reminder", {
          confirmButtonText: "confirm"
        });
        return false;
      } else {
        return true;
      }
    },

    //获取用户信息
    couponsGetInfo() {
      getInfo({ api_token: getToken() }).then(res => {
        if (res.code === 500) {
          return 
        }
        var promotions = [];
        for (var i of res.data.promotions) {
          promotions.push(i.coupon_id);
        }
        this.userPromotions = promotions;
      });
    }
  }
};
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
  top: 164px;
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
    width: 53.5rem;
    margin-top: 54px;
    .promotion {
      position: relative;
      height: 22rem;
      padding: 1rem;
      background: white;
      border-radius: 5px;
      margin-bottom: 1rem;
      .img {
        position: absolute;
        right: 1.5rem;
        top: 2rem;
      }
      .title {
        width: 70%;
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
          margin-right: 25rem;
        }
        .c-price {
          margin-right: 2rem;
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
        .get-code {
          button {
            background: #c6f389;
            border-color: #c6f389;
            span {
              font-size: 1.5rem;
            }
            &:hover {
              background: darken(#c6f389, 10%);
              border-color: darken(#c6f389, 10%);
            }
            &:active {
              background: lighten(#c6f389, 10%);
              border-color: lighten(#c6f389, 10%);
            }
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
      height: 48.9rem;
      background: white;
      border-radius: 5px;
      // padding: 1rem;
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
          width: 40rem;
          border-right: 1px solid #e1e1e1;
        }
        .promo-head-r {
          display: inline-block;
          width: 10rem;
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
          height: 36rem;
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
              font-size: 2rem;
              &:hover {
                color: red; //TODO 这里后续不要，可以删除
              }
            }
            .icon-pinterest {
              &:hover {
                color: red;
              }
            }
          }
          button {
            .btn-h;
            width: 9rem;
            height: 2.67rem;
            background: #85bb3a;
            border-color: #85bb3a;
            color: white;
            &:hover {
              background: darken(#85bb3b, 5%);
              border-color: darken(#85bb3b, 5%);
            }
            &:active {
              background: lighten(#85bb3b, 10%);
              border-color: lighten(#85bb3b, 10%);
            }
          }
          span {
            float: right;
          }
        }
        .use-it {
          color: blue;
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
          float: right;
          color: #808080;
        }
      }
      .coupons-product {
        width: 16.1rem;
        height: 370px;
        margin: 0.5rem 1rem 0.5rem 0.35rem;
      }
    }
  }
}
.code-dialog {
  .title {
    margin-left: 8rem;
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
      border: 1px solid #e1e1e1;
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
          .btn-h(20rem,3rem);
          color: white;
          font-size: 1rem;
          background: #85bb3b;
          border-color: #85bb3b;
          &:active {
            background: darken(#85bb3b, 10%);
            border-color: darken(#85bb3b, 10%);
          }
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
          .btn-h(5rem,2rem);
          color: white;
          font-size: 1rem;
          background: #85bb3b;
          border-color: #85bb3b;
          &:active {
            background: darken(#85bb3b, 10%);
            border-color: darken(#85bb3b, 10%);
          }
        }
        .code {
          color: #49663f;
          font-size: 1rem;
          font-weight: bold;
        }
      }
    }
    .bottom {
      padding-top: 1rem;
      height: 14rem;
      background: #f9f9f9;
      .head,
      .submit,
      .or,
      .join-f-g,
      .footer {
        margin-bottom: 1rem;
      }
      .head {
        color: #1a1a1a;
        font-size: 0.89rem;
        font-weight: bold;
      }
      .submit {
        input {
          width: 16.67rem;
          height: 2rem;
          outline: none;
          padding-left: 5px;
        }
        button {
          .btn-h(5.56rem, 2.2rem);
          border-radius: 0;
          color: white;
          background: #7ebbe2;
          border-color: #7ebbe2;
          &:active {
            background: darken(#7ebbe2, 10%);
            border-color: darken(#7ebbe2, 10%);
          }
        }
      }
      .or {
        position: relative;
        height: 1rem;
        span {
          position: relative;
          z-index: 22;
          background: #f9f9f9;
        }
        .line {
          position: absolute;
          top: 7px;
          z-index: 1;
          left: 20%;
          display: inline-block;
          width: 60%;
          height: 1px;
          background: #ddd;
        }
      }
      .join-f-g {
        button {
          .btn-h(11.11rem, 2rem);
          color: white;
          font-size: 0.78rem;
        }
        .facebook {
          background: #3a5899;
          border-color: #3a5899;
          &:active {
            background: darken(#3a5899, 10%);
            border-color: darken(#3a5899, 10%);
          }
        }
        .google {
          background: #dd4a38;
          border-color: #dd4a38;
          &:active {
            background: darken(#dd4a38, 10%);
            border-color: darken(#dd4a38, 10%);
          }
        }
      }
    }
  }
}

.not-trials-dialog {
  p,
  div {
    text-align: center;
  }
  div {
    button {
      .btn-h(50%, 2rem);
      background: #84ba39;
      border-color: #84ba39;
      color: white;
      &:active {
        background: darken(#84ba39, 10%);
        border-color: darken(#84ba39, 10%);
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
        padding-left: 20px;
        padding-right: 10px;
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
        .btn-h(77px,77px);
        background: #2089bb;
        border-color: #2089bb;
        color: white;
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
