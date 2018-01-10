<template>
  <div class="withdraw">
    <div class="title">My Wallet</div>
  <div class="title-s" v-title="'Withdraw'">Withdraw</div>
    <el-form  :model="withdrawForm" :rules="rules"  ref="withdrawForm" class="withdraw-form" >
      <div class="balance">
        <label class="left-label">
          Balance:
        </label>
        <span class="balance-money">
          {{currency}}{{amount}}
        </span>
      </div>
      <div class="withdrawals">
        <el-form-item prop="withdraw_amount"  label="Withdraw amount:" label-width="170px" required>
          <el-input v-model="withdrawForm.withdraw_amount" class="input-money" @keyup.enter.native="enterSubmit" @keyup.native="keyupMoney" >
            <template slot="prepend">{{currency}}</template>
          </el-input>
        </el-form-item>
      </div>
      <div class="pay-mode">
        <el-radio class="pay-radio" v-model="withdrawForm.account_type" :label="WITHDRAW_TYPE['paypal']" @keyup.enter.native="enterSubmit">
          <img src="../../../assets/paypal.png" alt="">
        </el-radio>
        <el-radio class="pay-radio" v-model="withdrawForm.account_type" :label="WITHDRAW_TYPE['amazon']" @keyup.enter.native="enterSubmit">
          <img src="../../../assets/pay-amazon.png" alt="">
        </el-radio>
        <el-radio class="pay-radio" v-model="withdrawForm.account_type" :label="WITHDRAW_TYPE['alipay']" @keyup.enter.native="enterSubmit">
          <img src="../../../assets/qLlKVsZuTordMlU.png" alt="">
        </el-radio>
      </div>
      <div class="withdrawals" v-if="withdrawForm.account_type !== WITHDRAW_TYPE['amazon']">
        <el-form-item prop="account_payee" label="Your Paypal account:" label-width="170px" v-if="withdrawForm.account_type === WITHDRAW_TYPE['paypal']">
          <el-input v-model="withdrawForm.account_payee"  @keyup.enter.native="enterSubmit"></el-input>
        </el-form-item>
        <el-form-item prop="account_payee" label="Your Alipay account:" label-width="170px" v-if="withdrawForm.account_type === WITHDRAW_TYPE['alipay']">
          <el-input v-model="withdrawForm.account_payee"  @keyup.enter.native="enterSubmit"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="submit">
        <el-button @click="submit" >Submit</el-button>
    </div>
    
    <el-dialog  :visible.sync="withdrawDialog" title="result" class="withdraw-dialog" size="tiny">
          <p class="info">
            The withdrawal is successful and we will deal with it within three working days.
          </p>
      </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken, getUserId, getEmail } from '@/utils/auth'
import { getStore  } from '@/utils/utils'
import { NumMul } from '@/utils/calculate.js'
export default {
  name: 'withdraw',
  data () {
    let reg =  /^\d+(\.\d{1,2})?$/
    const validateMoney =  (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please enter the withdraw amount'))
      } else if(parseFloat(value) == 0 ){
        callback(new Error ('Invalid withdraw amount.'))
      } else if(!reg.test(value)){
        callback(new Error ('Invalid withdraw amount.'))
      } else {
        callback()
      }
    }
    return {
      WITHDRAW_TYPE: {
        'paypal': 'PayPal',
        'amazon': 'Amazon',
        'alipay': 'Alipay'
      },
      countryLists: [],
      country_id: parseInt(getStore('country_id')) || 1,
      rules: {
        withdraw_amount: [
          {validator: validateMoney, trigger: 'blur' },
        ],
        account_payee: [
          { required: true, message: 'Please enter the account.', trigger: 'blur' },
        ]
      },
      withdrawForm: {
        country_id: getStore('country_id') || 1,
        currency: getStore('pay_currency') || 'USD',
        api_token: getToken(),
        user_id: getUserId(),
        account_type :'PayPal',
        user_type: '',
        withdraw_amount: '',
        account_payee: '',
        rmb_exchange: '',
        rmb_withdraw_amount: '',

      },
      withdrawDialog: false,
      amount: '',
    }
  },
  computed: {
    ...mapGetters([
      'userAccount',
      'roles',
      'countryInfo'
    ]),
    currency () {
      return getStore('currency') || '$'
    },
  },
  mounted () {
    this.init()
    
  },
  methods: {
    init () {
      this.initData()
      this.filterInput()
      
    },
    initData () {
      this.withdrawForm.user_type = this.roles[0]
      this.amount = this.userAccount.amount
      this.$store.dispatch('GetInfo').then(() => {
        this.amount = this.userAccount.amount
      })
      setTimeout(() => {
        this.getUserCountryInfo()
      })
    },
    //限制只能输入数字和.  e.keyCode 不兼容 火狐浏览器，需要调整
    filterInput () {
      $('.input-money .el-input__inner').eq(0).keypress((e) => {
        let code = e.keyCode || e.which || e.charCode
        if (!(code === 46  || (code <= 57 && code >= 48) || code === 8)) {
          return false
        }
      })
    },

    keyupMoney () {
      var amount = parseFloat(this.withdrawForm.withdraw_amount)
      if (amount > this.amount) {
        this.withdrawForm.withdraw_amount = this.amount
      }
    },

     
    //获取国家列表，携带货币符号，
    getUserCountryInfo () {
      if (this.countryInfo) {
        this.countryLists = this.countryInfo
        for (let i of this.countryLists) {
          if (i.id === this.country_id) {
            this.withdrawForm.rmb_exchange = i.bank_conversion_pri
            this.withdrawForm.currency = i.pay_currency
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
    //提现接口请求
    postWithdrawApi () {
      this.withdrawForm.rmb_withdraw_amount = NumMul(this.withdrawForm.rmb_exchange, this.withdrawForm.withdraw_amount)
      this.$api.withdrawApi(this.withdrawForm).then(res => {
        if (res.code === 200) {
          this.withdrawDialog = true
          this.clearInput()
          this.initData()
        }
      }).catch(err => {
        console.log(err)
      })
      
    },
    submit () {
      this.withdrawSubmit('withdrawForm', () => {
        if (this.withdrawForm.account_type === this.WITHDRAW_TYPE['paypal']) {
          this.postWithdrawApi()
        } else if (this.withdrawForm.account_type === this.WITHDRAW_TYPE['amazon']) {
          this.withdrawForm.account_payee = getEmail()
          this.postWithdrawApi()
        } else if (this.withdrawForm.account_type === this.WITHDRAW_TYPE['alipay']) {
          this.withdrawForm.rmb_exchange = 1
          this.postWithdrawApi()
        }
      })
    },

    //提现完成清空数据
    clearInput () {
      this.withdrawForm.withdraw_amount = ''
      this.withdrawForm.account_payee = ''

    },

    //回车提交
    enterSubmit () {
      this.submit()
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../../styles/mixin.less');
  .withdraw {
    .withdraw-form {
      height: 330px;
    }
    .el-form-item {
      display: inline-block;
      margin-bottom: 0;
      width: 570px;
   
    }
    
    .left-label {
      display: inline-block;
      text-align: right;
      margin-right: 5px;
      width: 158px;
      font-size: 14px;
      color: #48576a;
    }
    .balance {
      margin-bottom: 1.5rem;
      .balance-money {
        color: #333;
        font-size: 16px;
        font-weight: 700;
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
        &:active {
          background: darken(#84ba3a, 10%);
          border-color: darken(#84ba3a, 10%);
        }
      }
    }
    .withdraw-dialog {
      .info {
        height: 80px;
        font-size: 18px;
        text-align: center;
        color: #1a1a1a;
      }
    }
  }
</style>
