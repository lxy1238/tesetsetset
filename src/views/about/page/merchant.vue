<template>
  <div class="about-center" v-title="titleMsg">
    <div class="blank"></div>
    <div class="background-img">
      <img src="../../../assets/joinas.png" />
      <h1>Join Us</h1>
      <p>Let the Performance Improve Rapidly</p>
    </div>
    <div class="card">
      <div class="content">
        <div class="head-text">
          <p>
            We are the bridge between the online celebrities and businesses. Aim to get more accurate traffic, quickly improve business performance and solve business promotion problems, we gather a group of excellent people to provide great promotion strategy.
          </p>
          <p>
            Become a business partner of us, then you can post coupons and product trials.
          </p>
        </div>
        <div class="blue-card">
          <div class="card-item">
            <div class="card-title">
              <img src="../../../assets/pig.png" />
              Coupons
            </div>
            <div class="text">
                Merchants issue a certain number of coupons and ensure that their promotion price is competitive.The wide-range forwarding and sharing of online celebrities will bring a large number of orders. It is the simplest, most scientific, lowest-cost marketing mode.
            </div>
          </div>
          <div class="card-item">
              <div class="card-title">
                <img src="../../../assets/shiyong.png" />
                Trials
              </div>
              <div class="text">
                Merchants give a certain number of products, and attract buyers to order, including online stars. And buyers can get a full refund or partial refund if they use the products and post real evaluations. This is a quick way to help businesses build user experience as the real evaluation can provide purchase reference and benefit to the improvement plan of the product.
              </div>
          </div>
        </div>
        <div class="application-notes">
          <h3 class="center">
            Application Notes
          </h3>
          <ul class="item-ul">
            <li>
              Merchants should provide their own store information and ensure that the contact information is real and complete.
            </li>
            <li>
              The products should not infringe others' intellectual property rights.
            </li>
            <li>
              We reject inferior products and the product information must be real.
            </li>
            <li>
              The promotional price must be competitive, otherwise it may not be passed.
            </li>
            <li>
              After submission, people who do not pass the review can continue to submit an application.
            </li>
          </ul>
        </div>

        <template v-if="!isLogin || (rolesName === 'member' &&
                                    (
                                    (!merchantData && !celebrityData) || 
                                    (merchantData && !celebrityData && merchantData.status === 2) || 
                                    (celebrityData && !merchantData && celebrityData.status === 2 ) || 
                                    (celebrityData && merchantData && celebrityData.status === 2 && merchantData.status === 2)
                                    )
                                    )">
          <seller></seller>
        </template>
        <template v-else >
          <div class="remind-info">
            <p class="red center" v-if="rolesName === 'merchant'">Congratulations, you are already our cooperation merchant! 
            </p>
            <p class="red center" v-if="rolesName === 'celebrity'">Influencer can not apply for becoming our cooperation merchant simultaneously.
            </p>
            <p class="red center" v-if="merchantData && merchantData.status === 0">You have applied to become a merchant, under review ...</p>
            <p class="red center" v-if="celebrityData && celebrityData.status === 0">You have applied to become a influencer, under review ...</p>
          </div>
        </template>
        
      </div>
    </div>
  </div>
</template>

<script>
import seller from '../../enter_s/seller'
import { mapGetters } from  'vuex'
import { getToken } from '@/utils/auth'
export default {
  name: 'about',
  data () {
    return {
      titleMsg: 'Applications for Becoming Our Partner Merchant',
      isLogin: getToken(),
      rolesName: '',
      merchantData: null,
      celebrityData: null
    }
  },
  components: {
    seller
  },
  computed: {
    ...mapGetters([
      'roles',
      'merchant',
      'celebrity'
    ])
  },
  watch: {
    roles () {
      this.initData() 
    }
  },
  mounted () {    
    this.initData() 
  },
  methods: {
    initData () {
      this.rolesName = this.roles[0]
      this.merchantData = this.merchant
      this.celebrityData = this.celebrity
    },
    gotoMember () {
      this.$router.push({path: '/personal/member/index'})
    }
  }
}
</script>

<style lang="less" scoped>
  .about-center {
    // min-height: 1000px;
    background: #e4e4e4;
    font-size: 14px;
    color: #333;
    line-height: 1.42;
    .blank {
      height: 65px;
    }
    .background-img {
      position: relative;
      color: #fff;
      img {
        width: 100%;
        min-width: 1100px;
        min-height: 400px;
      }
      h1, p {
        position: absolute;
        display: block;
        width: 100%;
        min-width: 1100px;
        text-align: center;
        top: 20%;
        font-size: 45px;
      }
      p {
        font-size: 39px;
        top: 30%;
      }
    }
    .card {
      position: relative;
      top: -140px;
      max-width: 1510px;
      min-width: 1100px;
      background: #fff;
      min-height: 800px;
      border-radius: 4px;
      border: 1px solid #ccc;
      margin: 0 auto;
      padding: 80px 0 100px 0;
      margin-bottom: -60px;
      .content {
        width: 1100px;
        margin: 0 auto;
        .head-text {
          p {
            margin: 0 0 40px 0;
            line-height: 1.42;
          }
        }
        .blue-card {
          display: flex;
          justify-content: space-between;
          color: #fff;
          .card-item {

            width: 500px;
            height: 200px;
            background: #0072bc;
            border-radius: 4px;
            padding: 25px 45px;
            .card-title {
              position: relative;
              padding-left: 30px;
              font-size: 21px;
              height: 25px;
              margin-bottom: 10px;
              img {
                float: left;
                position: absolute;
                left: 0;
                bottom: 0;
              }
            }
          }
        }
        .remind-info {
          font-size: 24px;
          font-weight: 700;
        }
        .application-notes {
          margin-top: 80px;
          h3 {
            font-size: 30px;
          }
          .item-ul {
            li {
              list-style: disc;
              margin-left: 15px;
              line-height: 2;
            }
          }
        }
      }
    }
    
  }
</style>
