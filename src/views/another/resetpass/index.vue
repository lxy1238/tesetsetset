<template>
  <div class="modify-password">
    <div class="title-bottom">Reset Password</div>
    <el-form :model="pidForm" :rules="rules" ref="pidForm" label-width="150px">
      <el-form-item label="New password: " prop="password" >  
        <el-input type="password" v-model="pidForm.password"></el-input>
      </el-form-item>
      <el-form-item label="Confirm password: "  prop="password_confirmation" required>  
        <el-input type="password" v-model="pidForm.password_confirmation"></el-input>
      </el-form-item>
    </el-form>
    <div class="pid-footer">
      <button type="button" @click="changePassword">Save</button>
    </div>
  </div>
</template>

<script>
import { checkRetrievePassword } from '@/api/login'
export default {  
  name: 'affiliate_pid',
  data () {
    const validateConfirmPass =  (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please enter the pass"))
      } else if(value.length < 8 || value.length > 20  ){
        callback(new Error ("Use at least 8 characters and No more than 20 characters, It is case sensitive."))
      } else if (this.pidForm.password !== this.pidForm.password_confirmation) {
        callback(new Error("Entered passwords differ"))
      } else {
        callback()
      }
    }
    const validateNewPass =  (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please enter the pass"))
      } else if(value.length < 8 || value.length > 20  ){
        callback(new Error ("Use at least 8 characters and No more than 20 characters, It is case sensitive."))
      } else if (this.pidForm.password === this.pidForm.oldpassword) {
        callback(new Error("The new password can't be the same as the old one"))
      } else {
        callback()
      }
    }
    return {
      modifyShow: true,
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
      }
    }
  },
  computed: {
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
            this.pidForm.api_token = this.$route.params.token
            this.pidForm.email = this.$route.params.email
            checkRetrievePassword(this.pidForm).then(res => {
              console.log(res)
              if (res.code === 402) {
                this.$notify.error(res.message)
                return false
              } else {
                this.$notify.success("reset password success!!!")
                setTimeout( () => {
                  this.$router.push({path: '/'})
                }, 1000)
              }
            })
          } else {
            console.log('error submit!!');
            return false
          }
        });
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
 min-height: 1000px;
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
      &:active {
        backgorund: darken(#85ba3b, 10%);
        border-color: darken(#85ba3b, 10%);
      }
    }
  }
}
</style>

