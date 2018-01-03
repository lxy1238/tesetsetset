<template>
  <div class="modify-password">
    <div class="title-bottom">Modify Password</div>
    <el-form :model="pidForm" :rules="rules" ref="pidForm" label-width="150px">
      <el-form-item label="Original password: " prop="oldpassword" >  
        <el-input type="password"  v-model="pidForm.oldpassword"></el-input>
      </el-form-item>
      <el-form-item label="New password: " prop="password" required >  
        <el-input type="password" v-model="pidForm.password"></el-input>
      </el-form-item>
      <el-form-item label="Confirm password: "  prop="password_confirmation" required>  
        <el-input type="password" v-model="pidForm.password_confirmation"></el-input>
      </el-form-item>
    </el-form>
    <div class="pid-footer">
      <el-button type="button" @click="changePassword" :loading="saveLoading">Save Password</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {getToken, getUserId } from '@/utils/auth'
export default {  
  name: 'affiliate_pid',
  data () {
    const validateConfirmPass =  (rule, value, callback) => {
      if (!value) {
        return callback(new Error(' Please enter the confirm password.'))
      } else if(value.length < 8 || value.length > 20  ){
        callback(new Error ('Must be at least 8 to 20 characters.'))
      } else if (this.pidForm.password !== this.pidForm.password_confirmation) {
        callback(new Error('The confirm password does not match new password.'))
      } else {
        callback()
      }
    }
    const validateNewPass =  (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please enter the new password.'))
      } else if(value.length < 8 || value.length > 20  ){
        callback(new Error ('Must be at least 8 to 20 characters.'))
      } else if (this.pidForm.password === this.pidForm.oldpassword) {
        callback(new Error('The new password can\'t be the same as the old one'))
      } else {
        callback()
      }
    }
    return {
      modifyShow: true,
      pidForm: {
        oldpassword: '', 
        password: '',
        password_confirmation: '',
        api_token: getToken(),
        user_id: getUserId()
      },
      rules:{
        oldpassword: [
          { required: true, message: 'Please enter the original password', trigger: 'blur' },
          { min: 8, max: 20, message: 'Must be at least 8 to 20 characters.', trigger: 'blur' }
        ],
        password: [
          {validator: validateNewPass, trigger: 'blur'}
        ],
        password_confirmation: [
          {validator: validateConfirmPass, trigger: 'blur'}
        ],
      },
      saveLoading: false,
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'user_id'
    ])
  },
  mounted () {
    this.modifyShow = true
    window.addEventListener('keyup', this.keyupSubmit, false)
  },
  beforeDestroy () {
    this.modifyShow = false
    window.removeEventListener('keyup', this.keyupSubmit)
  },  
  methods: {
    changePassword () {
      this.$refs['pidForm'].validate((valid) => {
        if (valid) {
          this.saveLoading = true
          this.$api.resetPassword(this.pidForm).then(res => {
            this.saveLoading = false
            if (res.code === 402) {
              this.$message.error(res.message)
              return false
            } else {
              this.$message.success('reset password success!!!')
              this.$router.push({path: '/personal/member/index'})
            }
          })
        } else {
          this.saveLoading = false
          console.log('error submit!!')
          return false
        }
      })
    },
    keyupSubmit (e) {
      if (e.keyCode === 13 && this.modifyShow === true) {
        this.changePassword()
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="less" >
@import url('../../../styles/mixin.less');
.modify-password {
  .el-input {
    width: 400px;
  }
  .goto-getpid {
    display: inline-block;
    margin-left: 2rem;
  }
  .pid-footer {
    width: 400px;
    text-align: center;
    margin-top: 60px;
    margin-left: 150px;
    button {
      .btn-h(12rem, 3rem , #85ba3b, #85ba3b, #fff);
      &:active {
        backgorund: darken(#85ba3b, 10%);
        border-color: darken(#85ba3b, 10%);
      }
    }
  }
}
</style>
