<template>
  <div class="withdraw">
    <div class="title">My Wallet</div>
    <div class="title-s">Withdraw</div>
    <el-form  :model="withdrawForm" :rules="rules"  ref="withdrawForm" >
      <div class="balance">
        <label class="left-label">
          Balance:
        </label>
        <span class="balance-money">
          {{currency}}{{amount}}
        </span>
      </div>
      <div class="withdrawals">
        <label class="left-label">Withdrawals:</label>
        <el-form-item prop="withdrawCount">
          <el-input v-model="withdrawForm.withdrawCount" class="input-money" ></el-input>
        </el-form-item>
      </div>
      <div class="pay-mode">
        <el-radio class="pay-radio"v-model="withdrawForm.radio" label="1"><img src="../../../assets/paypal.png" alt=""></el-radio>
        <el-radio class="pay-radio" v-model="withdrawForm.radio" label="2"><img src="../../../assets/pay-amazon.png" alt=""></el-radio>
        <el-radio class="pay-radio" v-model="withdrawForm.radio" label="3"><img src="../../../assets/qLlKVsZuTordMlU.png" alt=""></el-radio>
      </div>
      <div class="withdrawals" v-if="withdrawForm.radio !== '2'">
        <label class="left-label">Acount:</label>
        <el-form-item prop="account">
          <el-input v-model="withdrawForm.account"></el-input>
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
import { getStore  } from '@/utils/utils'
export default {
  name: 'withdraw',
  data () {
    let reg =  /^\d+(\.\d{1,2})?$/
    const validateMoney =  (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please enter the withdraw amount'))
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
        ],
        account: [
          { required: true, message: 'Please enter the withdrawal account', trigger: 'blur' },
        ]
      },
      withdrawForm: {
        radio: '1',
        withdrawCount: '',
        account: '',
      },
      withdrawDialog: false
    }
  },
  computed: {
    ...mapGetters([
      'amount'
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
      if (this.radio == '3') {
        // this.$router.push({path: '/wallet/withdraw/pay-wx', query: {withdrawCount: this.withdrawCount}})
      }
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
      width: 100px;
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
