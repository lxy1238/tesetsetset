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
          <el-input v-model="withdrawForm.withdrawCount" @change="change"></el-input>
        </el-form-item>
      </div>
      <div class="pay-mode">
        <el-radio class="pay-radio"v-model="withdrawForm.radio" label="1"><img src="../../../assets/paypal.png" alt=""></el-radio>
        <el-radio class="pay-radio" v-model="withdrawForm.radio" label="2"><img src="../../../assets/pay-amazon.png" alt=""></el-radio>
        <el-radio class="pay-radio" v-model="withdrawForm.radio" label="3"><img src="../../../assets/pay-wechat.png" alt=""></el-radio>
        <el-radio class="pay-radio" v-model="withdrawForm.radio" label="4"><img src="../../../assets/qLlKVsZuTordMlU.png" alt=""></el-radio>
      </div>
      <div class="withdrawals">
        <label class="left-label">Acount:</label>
        <el-form-item prop="account">
          <el-input v-model="withdrawForm.account"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="submit">
        <button @click="submit">Submit</button>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getStore  } from '@/utils/utils'
export default {
  name: 'withdraw',
  data () {
    return {
      rules: {
        withdrawCount: [
          { required: true, message: 'Please enter the withdrawal amount', trigger: 'blur' },
        ],
        account: [
          { required: true, message: 'Please enter the withdrawal account', trigger: 'blur' },
        ]
      },
      withdrawForm: {
        radio: '1',
        withdrawCount: '',
      }
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

  },
  methods: {
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
        this.$router.push({path: '/wallet/withdraw/pay-wx', query: {withdrawCount: this.withdrawCount}})
      }
    },
    change () {
      console.log(this.withdrawCount)
      this.withdrawCount = this.withdrawCount.replace(/\D/g, '')
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
      // .el-input {
      //   width: 50%;
      // }
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
