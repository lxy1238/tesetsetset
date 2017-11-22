<template>
  <div class="page-index ">
    <div class="pages-content clearfix">
      <explain :is-active="2"></explain>
      <div class="home-content">
        <div class="details">
          <div class="pro-img">
            <img class="img" src="http://www.ghostxy.top/dealsbank/img/01.png" alt="">
          </div>
          <div class="details-price">
            <div class="title">2-PK of 30oz Ozark Trail Double-Wall Vacuum-Sealed Tumblers</div>
            <div class="time"> <i class="iconfont icon-icon-test"></i> Ends in <strong>3</strong>  days <strong>16</strong> hours <strong>52</strong> minutes</div>
            <div class="code-price">
              <div class="price">Price: <del>$198.00</del> </div>
              <div class="refund-price">Refund: <span >$198.00</span> </div>
              <div class="reminder">Please place an order within 4 hours and complete the payment. 
And timely upload your order number, or your trial qualification 
will be canceled.</div>
              <div class="code">
                <!-- <img src="../../assets/code.png" alt="">
                <div class="text">
                    Scan the QR code code to find the product
                </div> -->
              </div>
            </div>
            <div class="footer">
              <button class="to-amazon">
                Go To Amazon 
              </button>
              <div class="right">
                <div class="top"><i class="iconfont icon-xiaohongqi"></i> flow this trials</div>
                <select>
                  <option v-for="(item, index) in options" :value="index"  >{{item}}</option>
                </select>
              </div>
            </div>
            <img class="amazon" src="../../assets/amazon.png" alt="">
          </div>
        </div>
        <div class="submit-order-number">
          <h3>Submit order number</h3>
          <div class="submit">
            <span>Order number: </span>
            <input class="input" type="text" />
            <button class="submit-btn">Confirm</button>
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
import Clip from "@/utils/clipboard.js";
import couponsPro from "@/components/page_index_coupons/image_product.vue";
import pagination from "@/components/page_index_coupons/pagination.vue";
import explain from "@/components/trials/explain.vue"
export default {
  name: "page_index",
  data() {
    return {
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
    };
  },
  components: {
    couponsPro,
    pagination,
    explain
  },
  mounted() {
    this.$root.eventHub.$on("selectClassify", data => {
      this.msg = "";
      setTimeout(() => {
        this.msg = data;
      }, 500);
    });
  },
  methods: {
    test(index) {
      console.log(`当前跳转到 ${index} 页`);
    },
    gotodetails (id) {
      this.$router.push({ path: '/trialsDetails'})
    }
  }
};
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
        font-size: 1.33rem;
        color: #1a1a1a;
        font-weight: bold;
      }
      .time {
        color: #808080;
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
}


</style>
