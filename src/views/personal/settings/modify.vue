<template>
  <div class="modify-password">
    <div class="title-bottom">Modify Password</div>
    <el-form :model="pidForm" :rules="rules" ref="pidForm" label-width="150px">
      <el-form-item label="Original password: " prop="oldpassword" >  
        <el-input type="password"  v-model="pidForm.oldpassword"></el-input>
      </el-form-item>
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
import { resetPassword } from '@/api/login'
import { mapGetters } from 'vuex'
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
      msg: '',
      pidForm: {
        oldpassword: '', 
        password: '',
        password_confirmation: '',
        api_token: '',
        user_id: ''
      },
      rules:{
        oldpassword: [
          { required: true, message: 'Please enter  password', trigger: 'blur' },
          { min: 8, max: 20, message: 'Use at least 8 characters and No more than 20 characters, It is case sensitive.', trigger: 'blur' }
        ],
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
    ...mapGetters([
      'token',
      'user_id'
    ])
  },
  mounted () {
       window.addEventListener('keyup', (e) => {
      if (e.keyCode === 13 ) {
        this.changePassword()
        return
      } else {
        return false
      }
    })
  },
  methods: {
    changePassword () {
       this.$refs['pidForm'].validate((valid) => {
          if (valid) {
            this.pidForm.api_token = this.token
            this.pidForm.user_id = this.user_id
            resetPassword(this.pidForm).then(res => {
              console.log(res)
              this.$notify.success("reset password success!!!")
              this.$router.push({path: '/personal/index'})
            })
          } else {
            console.log('error submit!!');
            return false
          }
        });
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
