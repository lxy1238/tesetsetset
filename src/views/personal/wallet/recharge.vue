<template>
  <div class="withdraw">
    <div class="title">My Wallet</div>
    <div class="title-s">Recharge</div>
    <el-form :model="rechangeForm" :rules="rules"  ref="rechangeForm"   >
      <div class="balance">
        <label class="left-label">
          Balance:
        </label>
        <span class="balance-money">
          {{currency}}{{amount}}
        </span>
      </div>
      <div class="balance">
        <label class="left-label">
          Security deposit:
        </label>
        <span class="balance-money">
          {{currency}}{{amount}}
        </span>
      </div>
      <div class="withdrawals">
        <label class="left-label">recharges:</label>
        <el-form-item prop="withdrawCount">
          <el-input v-model="rechangeForm.withdrawCount" class="input-money"></el-input>
        </el-form-item>
      </div>
      <div class="pay-mode">
        <el-radio class="pay-radio" v-model="rechangeForm.radio" label="1"><img src="../../../assets/paypal.png" alt=""></el-radio>
        <el-radio class="pay-radio" v-model="rechangeForm.radio" label="2"><img src="../../../assets/qLlKVsZuTordMlU.png" alt=""></el-radio>
        <el-radio class="pay-radio" v-model="rechangeForm.radio" label="3"><img src="../../../assets/pay-wechat.png" alt=""></el-radio>
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
export default {
  name: 'rechange',
  data () {
    let reg =  /^\d+(\.\d{1,2})?$/
    const validateMoney =  (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please enter the recharge amount'))
      } else if(parseFloat(value) == 0 ){
        callback(new Error ('Please enter the correct amount'))
      } else if(!reg.test(value)){
        callback(new Error ('The amount can only enter two decimal places'))
      } else {
        callback()
      }
    }
    return {
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
    }
  },
  computed: {
    ...mapGetters([
      'amount'
    ]),
    currency () {
      return getStore('currency') || '$'
    },
    country_id () {
      return parseInt(getStore('country_id')) || 1
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.filterInput()
    },
    //限制只能输入数字和.
    filterInput () {
      if (this.country_id === 4) {
        $('.input-money .el-input__inner').eq(0).keypress((e) => {
          let code = e.keyCode || e.which || e.charCode
          if (!((code <= 57 && code >= 48) || code === 8)) {
            return false
          }
        })
      } else {
        $('.input-money .el-input__inner').eq(0).keypress((e) => {
          let code = e.keyCode || e.which || e.charCode
          if (!(code === 46  || (code <= 57 && code >= 48) || code === 8)) {
            return false
          }
        })
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
        if (this.rechangeForm.radio == '3') {
          this.$router.push({path: '/wallet/recharge/pay-wx', query: {withdrawCount: this.rechangeForm.withdrawCount}})
        } else if (this.rechangeForm.radio == '2') {
          this.$router.push({path: '/wallet/recharge/alipay', query: {withdrawCount: this.rechangeForm.withdrawCount}})
        } else if (this.rechangeForm.radio == '1') {
          console.log('this is paypal')
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
@import url('../../../styles/mixin.less');
  .withdraw {
    .el-form-item {
      display: inline-block;
      margin-bottom: 0;
      width: 400px;
    }
    .left-label {
      display: inline-block;
      text-align: right;
      margin-right: 5px;
      width: 140px;
      color: #666;
      font-size: 16px;
    }
    .balance {
      margin-bottom: 1.5rem;
      .balance-money {
        color: #333;
        font-size: 16px;
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
      button {
        .btn-h(160px, 45px, #84ba3a, #84ba3a, #fff);
        font-size: 24px;
        &:active {
          background: darken(#84ba3a, 10%);
          border-color: darken(#84ba3a, 10%);
        }
      }
    }
  }
</style>
