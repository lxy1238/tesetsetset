<template>
  <div class="about-center" v-title="titleMsg">
    <div class="blank"></div>
    <div class="about-page">
      <div class="about-content">
        <div class="head-crumbs"  >
            <span class=" gray-s">Home > Countact Us</span> 
        </div>
        <div class="card">
          <div class="card-content">
            <p>If you have any questions or any good suggestions, please leave us a messagewithout hesitation. We will reply within 2 business days.</p>
            <el-form :model="countactFrom" :rules="rules"  ref="countactFrom" label-width="95px" class="countact-form"  >
                <el-form-item prop="topic" label="Topic:"  required>
                  <el-select v-model="countactFrom.topic"  >
                    <el-option
                      v-for="item in options"
                      :key="item.label"
                      :label="item.label"
                      :value="item.label">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="Username" label="Username:" v-if="isLogin">
                  {{username}}
                </el-form-item>
                <el-form-item prop="email" label="Email:" v-else required>
                  <el-input v-model="countactFrom.email"></el-input>
                </el-form-item>
                 <el-form-item prop="title" label="Subject:" required>
                  <el-input v-model="countactFrom.title"></el-input>
                </el-form-item>
                <el-form-item prop="content" label="Comments:" required>
                  <el-input type="textarea" v-model="countactFrom.content"  :rows="8"></el-input> 
                </el-form-item>
            
            </el-form>
            <div class="submit">
                <el-button @click="submit" :loading="btnLoading">Submit</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken ,getUserId, getEmail} from '@/utils/auth'
import { validateEmail } from '@/utils/validate.js'
import { getStore } from '@/utils/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'countact',
  data () {
    const validateEmailRule =  (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please enter your Email'))
      } else if (!validateEmail(value)) {
        return callback(new Error('Invalid email address'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        topic: [{required: true, message: 'please enter the topic' ,trigger: 'blur' }],
        email: [{ validator:validateEmailRule ,trigger: 'blur' }],
        title: [{required: true, message: 'please enter the subject' ,trigger: 'blur' }],
        content: [{required: true, message: 'please enter the content' ,trigger: 'blur' }],
      },
      titleMsg: 'Contact DealsBank',
      countactFrom: {
        country_id: getStore('country_id') || 1,
        user_id: getUserId() ? getUserId() : '',
        email: getEmail(),
        topic: 'General Help',
        title: '',
        content: '',
      },
      options: [
        {
          label: 'General Help'
        },
        {
          label: 'Technical Help'
        },
        {
          label: 'Advertising'
        },
        {
          label: 'Ideas'
        },
        {
          label: 'Bugs'
        },
        {
          label: 'Report User'
        },
        {
          label: 'Make Money'
        },
        {
          label: 'Influencers Related'
        },
        {
          label: 'Merchants Related'
        },
        {
          label: 'Recharge'
        },
        {
          label: 'Withdraw'
        },
        {
          label: 'Others'
        },
      ],
      btnLoading: false,
    }
  },
  computed: {
    ...mapGetters([
      'username'
    ]),
    isLogin () {
      return getToken()
    }
  },
  mounted () {    //钩子函数，等于vue1.0中的ready
   
  },
  methods: {
    submit () {
      //element-ui 的表单验证
      this.$refs['countactFrom'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          this.$api.contactUs(this.countactFrom).then(res => {
            this.btnLoading = false
            console.log(res.code)
            if (res.code === 200) {
              this.$snotify.success('submit successfully, We will deal with it as soon as possible')
              this.$refs['countactFrom'].resetFields()
            }
          }).catch(err => {
            this.btnLoading = false
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../../styles/mixin.less');
  .countact-form {
    width: 585px;
  }
  .submit {
    width: 490px;
    text-align: center;
    margin-left: 95px;
    button {
      .btn-h(160px, 45px, #84ba3a, #84ba3a, #fff);
    }
  }
</style>
