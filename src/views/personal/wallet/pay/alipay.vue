<template>
  <section class="alipay"  >
    <!-- <div class="info-text">
      <span>
        正在跳转支付宝支付页面,请稍后...(请勿刷新页面)
      </span> 
      <div class="waiting">
        <ul>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
    </div> -->
    <div  v-loading.fullscreen.lock="fullscreenLoading"></div>
    <div class="alipay" v-html="resForm"></div>
  </section>
</template>

<script>
import { getUserId, getToken } from '@/utils/auth'
import { getStore } from '@/utils/utils'
import { RandomPayNumber } from '@/utils/randomString'
export default {
  name: 'pay-wx',
  data () {
    return {
      resForm: '',
      timer: null,
      country_id:  parseInt(getStore('country_id')) || 1,
      countryLists: [],
      reqData: {
        country_id: parseInt(getStore('country_id')) || 1,
        api_token: getToken(),
        user_id: getUserId(),
        pay_order_number: '',
        amount: '',
        bank_conversion_pri: '',
        subject: 'recharge on Alipay',
        body: 'recharge on Alipay',
      },
      fullscreenLoading: true,
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.initData()
      this.getUserCountryInfo()
    },
    initData () {
      if (this.$route.query.withdrawCount) {
        this.reqData.amount = this.$route.query.withdrawCount
        this.reqData.pay_order_number = RandomPayNumber()
      } else {
        this.$router.push({path: '/404/index'})
      }
    },

    //获取国家列表，携带货币符号，
    getUserCountryInfo () {
      this.$api.getUserCountry().then(res => {
        this.countryLists = res.data
        for (let i of this.countryLists) {
          if (i.id === this.country_id) {
            this.reqData.bank_conversion_pri = i.bank_conversion_pri
          }
        }
        this.alipay()
      }).catch(error => {
        console.log(error)
      })
    },

    alipay () {
      this.$api.alipay(this.reqData).then(res => {
        if (!res.data) {
          this.fullscreenLoading = false
          this.$snotify.info('Payment interface error, please refresh the page or other payment method')
          return
        }
        let num = res.data.search('</form>')
        this.resForm = res.data.slice(0, num + 7)
        setTimeout(() => {
          if (document.forms['alipaysubmit']) {
            document.forms['alipaysubmit'].submit()
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .alipay {
    padding: 100px 0 0 0;
    text-align: center;
    font-size: 18px;
    .info-text {
      position: relative;
      text-align: center;
      width: 800px;
      margin: 0 auto;
      height: 60px;
      line-height: 60px;
      text-align: left;
      padding-left: 30px;
      background: #e1e1e1;
      border-radius: 5px;
      background: -webkit-linear-gradient(#e1e1e1, #999);
      background: linear-gradient(#e1e1e1, #999); /* 标准的语法（必须放在最后） */
      span {
      }
    }
  }
  .waiting {
  position: absolute;
  right:30px;
  top: 0;
  width: 69px;
  height: 35px;
  line-height: 35px;
  background: #E4F1FD;
  border-radius: 20px;
  margin-top: 15px;
  margin-left: 15px;
  color: #FFAF32;
}
/*这个是每个点的自己的块*/
.waiting li {
    position: absolute; 
    top: 13px; 
    width: 10px; 
    height: 10px;
    line-height: 10px;
    list-style: none;
    -webkit-animation: bounce_waiting 1.2s linear infinite;
    -webkit-transform: scale(0); 
    -webkit-border-radius: 5px;
    animation: bounce_waiting 1.2s linear infinite;
    transform: scale(0); 
    border-radius: 5px; 
}
.waiting li:first-child { 
    left: 15px; 
    -webkit-animation-delay: 0.48s; 
    animation-delay: .48s; 
}
.waiting li:nth-child(2) { 
    left: 30px; 
    -webkit-animation-delay: 0.6s; 
    animation-delay: 0.6s; 
}
.waiting li:nth-child(3) { 
    left: 45px; 
    -webkit-animation-delay: 0.72s; 
    animation-delay: 0.72s; 
}

/*定义动画函数，从1倍减小到0*/
@-webkit-keyframes bounce_waiting { 
     0% {
        -webkit-transform:scale(1);
        background-color:#FFAF32;
    }
     100% {
        -webkit-transform:scale(0);
        background-color:#ffffff;
    }
}
@keyframes bounce_waiting { 
     0% {
        transform:scale(1);
        background-color:#FFAF32;
    }
     100% {
        transform:scale(0);
        background-color:#ffffff;
    }
}
</style>
