<template>
  <div class="withdraw"  v-loading.fullscreen.lock="fullscreenLoading">
    <div class="title">My Wallet</div>
    <div class="title-s" v-title="'Recharge'">Recharge</div>
    <el-form :model="rechangeForm" :rules="rules"  ref="rechangeForm"   >
      <div class="balance">
        <label class="left-label">
          Balance:
        </label>
        <span class="balance-money">
          {{currency}}{{useraccountInfo.amount}}
        </span>
      </div>
      <div class="balance">
        <label class="left-label">
         Required security deposit:
        </label>
        <span class="balance-money balance-money-sd">
          {{currency}}{{useraccountInfo.security_deposit}}
        </span>
      </div>
      <div class="withdrawals">
        <el-form-item prop="withdrawCount" label="Recharge amount:" label-width="150px" required>
          <el-input v-model="rechangeForm.withdrawCount" class="input-money"  @keyup.enter.native="doSubmit">
            <template slot="prepend">{{currency}}</template>
          </el-input>
        </el-form-item>
      </div>
      <div class="pay-mode">
        <el-radio class="pay-radio" v-model="rechangeForm.radio" :label="RECHARGE_TYPE['paypal']"  @keyup.enter.native="doSubmit">
          <img src="../../../assets/paypal.png" alt="">
        </el-radio>
        <el-radio class="pay-radio" v-model="rechangeForm.radio" :label="RECHARGE_TYPE['alipay']" @keyup.enter.native="doSubmit">
          <img src="../../../assets/qLlKVsZuTordMlU.png" alt="">
        </el-radio>
        <el-radio class="pay-radio" v-model="rechangeForm.radio" :label="RECHARGE_TYPE['wechat']"  @keyup.enter.native="doSubmit">
          <img src="../../../assets/pay-wechat.png" alt="">
        </el-radio>
      </div>
     
    </el-form>
    <div class="submit">
        <el-button @click="submit" :loading="btnLoading">Submit</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getStore  } from '@/utils/utils'
import { getToken, getUserId } from '@/utils/auth'
export default {
  name: 'rechange',
  data () {
    let reg =  /^\d+(\.\d{1,2})?$/
    const validateMoney =  (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please enter the amount.'))
      } else if(parseFloat(value) == 0 ){
        callback(new Error ('Invalid recharge amount.'))
      } else if(!reg.test(value)){
        callback(new Error ('Invalid recharge amount.'))
      } else {
        callback()
      }
    }
    return {
      RECHARGE_TYPE: {
        'paypal': '1',   //1  paypal 支付
        'alipay': '2',   //2  支付宝 支付
        'wechat': '3',   //3  微信支付
      },
      fullscreenLoading: false,
      rules: {
        withdrawCount: [
          {validator: validateMoney, trigger: 'blur' },
        ]
      },
      rechangeForm: {
        radio: '1',
        withdrawCount: '',
      },
      btnLoading: false,
      countryLists: [],
      reqData: {
        country_id: parseInt(getStore('country_id')) || 1,
        api_token: getToken(),
        user_id: getUserId(),
        amount: '',
        pay_currency: '',
      },
      useraccountInfo: {},
    }
  },
  computed: {
    ...mapGetters([
      'userAccount'
    ]),
    currency () {
      return getStore('currency') || '$'
    },
    country_id () {
      return parseInt(getStore('country_id')) || 1
    },
    pay_currency () {
      return getStore('pay_currency') || 'USD'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.filterInput()
      this.initData()
      this.$store.dispatch('GetInfo').then(() => {
        this.initData()
      })
    },
    initData () {
      this.useraccountInfo = this.userAccount
      if (this.useraccountInfo.security_deposit != 0) {
        this.rechangeForm.withdrawCount = this.useraccountInfo.security_deposit
      }
    },
    //限制只能输入数字和.
    filterInput () {
      let inputMoney = document.querySelector('.input-money .el-input__inner')
      if (this.country_id === 4) {
        inputMoney.onkeypress = (e) => {
          let code = e.keyCode || e.which || e.charCode
          if (!((code <= 57 && code >= 48) || code === 8)) {
            return false
          }
        }
      } else {
        inputMoney.onkeypress = (e) => {
          let code = e.keyCode || e.which || e.charCode
          if (!(code === 46  || (code <= 57 && code >= 48) || code === 8)) {
            return false
          }
        }
      }
    },
    withdrawSubmit (formName, callback) {
      //element-ui 的表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          callback()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submit () {
      this.withdrawSubmit('rechangeForm', () => {
        if (this.rechangeForm.radio === this.RECHARGE_TYPE['wechat']) {
          this.$router.push({path: '/wallet/recharge/pay-wx', query: {withdrawCount: this.rechangeForm.withdrawCount}})
        } else if (this.rechangeForm.radio === this.RECHARGE_TYPE['alipay']) {
          this.$router.push({path: '/wallet/recharge/alipay', query: {withdrawCount: this.rechangeForm.withdrawCount}})
        } else if (this.rechangeForm.radio === this.RECHARGE_TYPE['paypal']) {
          this.fullscreenLoading = true
          this.reqData.amount = this.rechangeForm.withdrawCount
          this.reqData.pay_currency = this.pay_currency
          this.$api.paypal(this.reqData).then(res => {
            if (!res.data) {
              this.fullscreenLoading = false
              this.$snotify.error('Payment interface error, please refresh the page or other payment method.')
              return
            }
            location.href = res.data
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },

    //回车提交
    doSubmit () {
      this.submit()
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../../styles/mixin.less');
  .withdraw {
    .el-form-item {
      display: inline-block;
      margin-bottom: 0;
      width: 550px;
    }
    .left-label {
      display: inline-block;
      text-align: right;
      margin-right: 5px;
      width: 178px;
      font-size: 14px;
      color: #48576a;
    }
    .balance {
      margin-bottom: 1.5rem;
      .balance-money {
        color: #333;
        font-size: 16px;
        &.balance-money-sd {
          font-weight: 700;
        } 
      }
      
    }
    .withdrawals {
      margin-bottom: 1.5rem;
    }
    .pay-mode {
      margin-bottom: 1rem;
      .pay-radio {
        display: inline-block;
        width: 35%;
        img {
          width: 180px;
          height: 50px;
        }
      }
      .el-radio+.el-radio {
        margin-left: 0;
        margin-bottom: 15px;
      }
      img {
        position: relative;
        top: 20px;
        left: 10px;
      }
    }
    .submit {
      margin-left: 214px;
      button {
        .btn-h(160px, 45px, #84ba3a, #84ba3a, #fff);
      }
    }
  }
</style>
