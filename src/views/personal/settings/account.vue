<template>
  <div class="settings-account">
    <div class="title">Settings</div>
    <div class="title-s" v-title="'Account Basics'">Account Basics</div>
    <div class="form-content" v-if="userInfo">
      <el-form :model="accountForm" class="account-form" label-width="110px">
        <el-form-item label="Username: " prop="username" class="account-item" >
          <div>{{username}}</div>
        </el-form-item>
        <el-form-item label="Email: " prop="" class="account-item" >
          <div>{{email}}</div>
        </el-form-item>
        <el-form-item label="Profile photo: " prop="" class="account-item" >
          <el-upload class="avatar-uploader" 
                    action="upload" 
                    :show-file-list="false" 
                    :before-upload="beforeAvatarUpload"
                    >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <img v-else src="../../../assets/user.png" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="limit-text">Only support .jpg, .gif, .png, and the images shall not be exceed 1MB. </div>
        </el-form-item>
        <el-form-item label="Gender: " prop="" class="account-item" >
          <el-radio v-model="accountForm.sex" label="男"><img class="sex-img" src="../../../assets/setting-account_1.png" alt="">Boy</el-radio>
          <el-radio v-model="accountForm.sex" label="女"><img class="sex-img" src="../../../assets/setting-account_02.png" alt="">Gril</el-radio>
        </el-form-item>
        <el-form-item label="Date of birth: " prop="" class="account-item" >
          <el-date-picker type="date" v-model="accountForm.birthday" ></el-date-picker>
        </el-form-item>
        <el-form-item label="Introduction: " prop="" class="account-item account-item-textarea" >
          <el-input type="textarea" v-model="accountForm.introduce" :rows="6" ></el-input>
        </el-form-item>
      </el-form>
      <!-- <div class="title-s">Linked Accounts</div>
      <div class="facebook-text">
        <img src="../../../assets/setting-account_face.png" alt="">
        <span>Successfully linked to 100466700@qq.com ( <a href="#">Unlink</a>  )</span>
      </div>
      <div class="google-text">
        <img src="../../../assets/setting-account_google.png" alt="">
        <span>Link your Google account</span>
      </div> -->

      <div class="footer-account">
        <el-button @click="changeUserInfo" :loading="saveLoading">Save Setting</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken, getUserId } from '@/utils/auth'
import { mapGetters } from 'vuex'
export default {
  name: 'settings-account',
  data () {
    return {
      accountForm: {
        api_token: getToken(),
        user_id: getUserId(),
        birthday: '',
        introduce: '',
        sex: '男',
        avatar_img: require('../../../assets/user.png')
      },
      imageUrl: require('../../../assets/user.png'),
      userInfo: {},
      saveLoading: false,
    }
  },
  computed: {
    ...mapGetters([
      'userBase',
      'username',
      'email',

    ])
  },
  mounted () {
    setTimeout(() => {
      this.userInfo = this.userBase
      this.accountForm.sex = this.userInfo.sex
      this.accountForm.birthday = this.userInfo.birthday
      this.accountForm.introduce = this.userInfo.introduce
      this.accountForm.avatar_img = this.userInfo.avatar_img
      this.imageUrl = this.accountForm.avatar_img
    })
  },
  methods: {
    //上传图片
    beforeAvatarUpload (file) {
      var isJPG = file.type === 'image/jpeg'
      var isGIF = file.type === 'image/gif'
      var isPNG = file.type === 'image/png'
      var isLt500K = file.size / 1024 / 1024 < 1

      if (!(isJPG || isGIF || isPNG)) {
        this.$snotify.error('Uploaded Unsuccessfully! The image format is incorrect.')
      }
      if (!isLt500K) {
        this.$snotify.error('Uploaded Unsuccessfully! The image size exceeds 1MB.')
      }
      if ((isJPG || isGIF || isPNG) && isLt500K) {
        var formData = new FormData()
        formData.append('api_token', getToken())
        formData.append('user_id', getUserId())
        formData.append('file', file)
        this.$api.uploadImg(formData)
          .then(res => {
            this.accountForm.avatar_img = res.data
            this.imageUrl = this.accountForm.avatar_img
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        return false
      }
    },



    //改变用户信息接口
    changeUserInfo () {
      this.saveLoading = true
      this.$api.userInfoSet(this.accountForm)
        .then(res => {
          this.saveLoading = false
          if (res.code === 200) {
            this.$snotify.success('Submit Successfully!')
            this.$store.dispatch('GetInfo')
            document.body.scrollTop = document.documentElement.scrollTop = 0
          }
        })
        .catch(error => {
          this.saveLoading = false
          console.log(error)
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../../../styles/mixin.less");
  .account-item-textarea {
    width: 710px;
  }
  .facebook-text {
    img {
      float: left;
      margin-right: 10px;
    }
    span {
      font-size: 13px;
      color: #666;
    }
    height: 32px;
    line-height: 32px;
  }
  .google-text {
    img {
      float: left;
      margin-right: 10px;
    }
    span {
      font-size: 13px;
      color: #666;
    }
    height: 32px;
    line-height: 32px;
    margin-bottom: 3rem;
  }
  .footer-account {
    width: 600px;
    margin-left: 110px;
    text-align: center;
    button {
      .btn-h(10rem,3rem, #83b938, #83b938, #fff);
      &:active {
        background: darken(#83b938, 10%);
        border-color: darken(#83b938, 10%);
      }
    }
  }

  .sex-img {
    position: relative;
    top: 3px;
  }
  .el-textarea {
    textarea {
      resize: none;
      height: 200px;
    }
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border-radius: 100%;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 90px;
    height: 90px;
    line-height: 90px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
    border-radius: 100%;
  }
</style>
