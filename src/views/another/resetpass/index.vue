<template>
  <div class="modify-password">
    <div class="title-bottom">Reset Password</div>
    <el-form :model="pidForm" :rules="rules" ref="pidForm" label-width="150px">
      <el-form-item label="New password: " prop="password" required>  
        <el-input type="password" v-model="pidForm.password"  @keyup.enter.native="enterSubmit"></el-input>
      </el-form-item>
      <el-form-item label="Confirm password: "  prop="password_confirmation" required>  
        <el-input type="password" v-model="pidForm.password_confirmation" @keyup.enter.native="enterSubmit"></el-input>
      </el-form-item>
    </el-form>
    <div class="pid-footer">
      <button type="button" @click="changePassword" :loading="submitLoading">Save</button>
    </div>
  </div>
</template>

<script>
export default {  
  name: 'affiliate_pid',
  data () {
    const validateConfirmPass =  (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please enter the pass'))
      } else if(value.length < 8 || value.length > 20  ){
        callback(new Error ('Use at least 8 characters and No more than 20 characters, It is case sensitive.'))
      } else if (this.pidForm.password !== this.pidForm.password_confirmation) {
        callback(new Error('Entered passwords differ'))
      } else {
        callback()
      }
    }
    const validateNewPass =  (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please enter the pass'))
      } else if(value.length < 8 || value.length > 20  ){
        callback(new Error ('Use at least 8 characters and No more than 20 characters, It is case sensitive.'))
      } else if (this.pidForm.password === this.pidForm.oldpassword) {
        callback(new Error('The new password can\'t be the same as the old one'))
      } else {
        callback()
      }
    }
    return {
      pidForm: {
        email: '',
        password: '',
        password_confirmation: '',
        api_token: '',
      },
      rules:{
        password: [
          {validator: validateNewPass, trigger: 'blur'}
        ],
        password_confirmation: [
          {validator: validateConfirmPass, trigger: 'blur'}
        ],
      },
      submitLoading: false
    }
  },
  computed: {
  },
  mounted () {
  },
  beforeDestroy () {
  },  
  methods: {
    changePassword () {
      this.$refs['pidForm'].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          this.pidForm.api_token = this.$route.params.token
          this.pidForm.email = this.$route.params.email
          this.$api.checkRetrievePassword(this.pidForm).then(res => {
            this.submitLoading = false
            if (res.code === 200) {
              this.$snotify.success('reset password success!!!')
              setTimeout( () => {
                this.$router.push({path: '/'})
              }, 500)
            } else {
              this.$snotify.error(res.message)
              return false
            }
          }).catch(() => {
            this.submitLoading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    enterSubmit () {
      this.changePassword()
    }
  }
}
</script>

<style lang="less" >
@import url('../../../styles/mixin.less');
.modify-password {
 width: 800px;
 margin: 150px auto;
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
    }
  }
}
</style>

