<template>
  <div class="about-center" v-title="titleMsg">
    <div class="blank"></div>
    <div class="background-img">
      <img src="../../../assets/center.jpg" />
      <h1>Welcome Influencers</h1>
      <p>Join Us for Easily Making Money</p>
      <div class="prompt-text">
        <div class="prompt-item">
          <h4>100% Free</h4>
          <div>Join Us for Free</div>
        </div>
        <div class="prompt-item">
          <h4>Quality</h4>
          <div>Artificial Screening</div>
        </div>
        <div class="prompt-item">
          <h4>Conversion</h4>
          <div>Ultra-high Conversion Rate</div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="content">
        <div class="application-notes">
          <h3 class="center">
            Applications for Joining Us
          </h3>
          <p>
            Online shopping, which pays more attention to quality and public praise, can make anyone become the protagonist with the viral communication through social media. We have a group of professional online shopping celebrities who can select the best content from the mass of promotional information to select to ensure high conversion rate, enhance the marketing effectiveness of the online celebrities, also bring huge profits to themselves. If you succeed in application, the promotional information you post will make more people notice after it is reprintedand shared through other online celebrities.
          </p>
        </div>
        <div class="application-notes">
          <h3 class="center">
            Application Notes
          </h3>
          <ul class="item-ul">


            <li>
               The online celebrities who want to apply should have their own team, the personal marketing incomemore than 1,000 US dollars / month and three or more promotion channels,   such as slickdeals.net, fatwallet.com, dealnews.com and so on.
            </li>
            <li>
                His/Her social media account has more than 20,000 fans which consist lots of active users and has more than 2 social media accounts, such as Facebook, Youtube, Twitter,       Instagram, Pinterest and so on.
            </li>
            <li>
                The product information provided by them must be true and reliable.We reject inferior goods.
            </li>
            <li>
                Should not provide false content or copy someone else's content.
            </li>
            <li>
                After submission, people who do not pass the review can continue to submit an application.
            </li>
          </ul>
        </div>
         <p class="footer-text">
            “When you realize that the Influencer is closely related to hard work, you will become a super Influencer. Don’t bother to work for others, with the available Internet, you are the boss of yourself and free to do your work anywhere .”
         </p>

        <template v-if="!isLogin || (rolesName === 'member' &&
                                    (
                                    (!merchantData && !celebrityData) || 
                                    (merchantData && !celebrityData && merchantData.status === 2) || 
                                    (celebrityData && !merchantData && celebrityData.status === 2 ) || 
                                    (celebrityData && merchantData && celebrityData.status === 2 && merchantData.status === 2)
                                    )
                                    )">
          <reds ></reds>
        </template>

        <template v-else>
          <div class="remind-info">
            <p class="red center" v-if="rolesName === 'merchant'">Merchant can not apply for becoming our cooperation influencer simultaneously. 
            </p>
            <p class="red center" v-if="rolesName === 'celebrity'">Congratulations, you are already our cooperation influencer!
            </p>
            <p class="red center" v-if="merchantData && merchantData.status === 0">You have applied to become a merchant, under review ...</p>
            <p class="red center" v-if="celebrityData && celebrityData.status === 0">You have applied to become a influencer, under review ...</p>
          </div>
        </template>
         
      </div>
    </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import reds from '../../enter_s/reds'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  name: 'about',
  data () {
    return {
      titleMsg: 'Applications for Becoming Our Partner Influencer',
      isLogin: getToken(),
      rolesName: '',
      merchantData: null,
      celebrityData: null,
    }
  },
  components: {
    reds
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
  mounted () {    //钩子函数，等于vue1.0中的ready
    this.initData()
  },
  methods: {
    // 判断用户是不是商家或者红人
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
        top: 10%;
        font-size: 45px;
      }
      p {
        font-size: 39px;
        top: 19%;
      }
      .prompt-text {
        position: absolute;
        bottom: 160px;
        left: 50%;
        margin-left: -400px;
        width: 800px;
        display: flex;
        justify-content: space-between;
        .prompt-item {
          width: 200px;
          text-align: center;
          h4 {
            font-size: 24px;
            margin-bottom: 20px;
            font-weight: normal;
          }
        }
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
      .footer-text {
        color: #0072bc;
        margin: 40px 0 80px 0;
      }
    
    
  }
</style>

