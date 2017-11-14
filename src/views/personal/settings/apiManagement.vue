<template>
  <div class="affiliate-pid">
    <div class="title-bottom">Affiliate PID</div>
    <el-form :model="pidForm" rules="rules" ref="pidForm" label-width="150px">
      <el-form-item label="USA amazon: ">  
        <el-input></el-input>
        <a class="goto-getpid" href="javascript:void(0);">I don’t know how to get it?</a>
      </el-form-item>
      <el-form-item label="France amazon: ">  
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="Germany amazon: ">  
        <el-input></el-input>
      </el-form-item>
    </el-form>
    <div class="pid-footer">
      <button type="button">Save</button>
    </div>
  </div>
</template>

<script>
export default {  
  name: 'affiliate_pid',
  data () {
    return {
      msg: '',
      pidForm: {

      },
      rules: []
    }
  }
}
</script>

<style lang="less" >
@import url('../../../styles/mixin.less');
.affiliate-pid {
  .el-input {
    width: 40%;
  }
  .goto-getpid {
    display: inline-block;
    margin-left: 2rem;
  }
  .pid-footer {
    text-align: center;
    margin-top: 60px;
    button {
      .btn-h(10rem, 3rem , #85ba3b, #85ba3b, #fff);
      font-size: 1.4rem;
      &:active {
        backgorund: darken(#85ba3b, 10%);
        border-color: darken(#85ba3b, 10%);
      }
    }
  }
}
</style>
