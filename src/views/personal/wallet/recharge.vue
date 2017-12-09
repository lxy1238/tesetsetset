<template>
  <div class="withdraw">
    <div class="title">My Wallet</div>
    <div class="title-s">Recharge</div>
    <el-form>
      <div class="balance">
        <label class="left-label">
          Balance:
        </label>
        <span class="balance-money">
          $123.90
        </span>
      </div>
      <div class="withdrawals">
        <label class="left-label">recharges:</label>
        <el-form-item>
          <el-input ></el-input>
        </el-form-item>
      </div>
      <div class="pay-mode">
        <el-radio class="pay-radio" v-model="radio" label="1"><img src="../../../assets/paypal.png" alt=""></el-radio>
        <el-radio class="pay-radio" v-model="radio" label="2"><img src="../../../assets/pay-amazon.png" alt=""></el-radio>
        <el-radio class="pay-radio" v-model="radio" label="3"><img src="../../../assets/pay-wechat.png" alt=""></el-radio>
      </div>
      <div class="withdrawals">
        <label class="left-label">Acount:</label>
        <el-form-item>
          <el-input ></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="submit">
        <button>Submit</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'withdraw',
  data () {
    return {
      radio: '1'
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
      width: 90px;
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
