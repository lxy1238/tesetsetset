<template>
  <div class="modify-password">
    <div class="title-bottom">Modify Password</div>
    <el-form :model="pidForm" rules="rules" ref="pidForm" label-width="150px">
      <el-form-item label="Original password: ">  
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="New password: ">  
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="Confirm password: ">  
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
.modify-password {
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
