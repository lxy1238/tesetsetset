<template>
  <div class="settings-account">
    <div class="title">Settings</div>
    <div class="title-s">Product Information</div>
    <div class="form-content" v-if="userInfo">
      <el-form :model="accountForm" class="account-form" label-width="100px">
        <el-form-item label="Username: " prop="username" class="account-item" >
          <el-input disabled  v-model="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="Email: " prop="" class="account-item" >
          <el-input disabled v-model="userInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="Avatar: " prop="" class="account-item" >
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
        <el-form-item label="Gende: " prop="" class="account-item" >
          <el-radio v-model="accountForm.sex" label="男"><img class="sex-img" src="../../../assets/setting-account_1.png" alt="">Boy</el-radio>
          <el-radio v-model="accountForm.sex" label="女"><img class="sex-img" src="../../../assets/setting-account_02.png" alt="">Gril</el-radio>
        </el-form-item>
        <el-form-item label="Date of birth: " prop="" class="account-item" >
          <el-date-picker type="date" v-model="accountForm.birthday" ></el-date-picker>
        </el-form-item>
        <el-form-item label="Introduce: " prop="" class="account-item" >
          <el-input type="textarea" v-model="accountForm.introduce" :rows="6" ></el-input>
        </el-form-item>
      </el-form>
      <div class="title-s">Linked Accounts</div>
      <div class="facebook-text">
        <img src="../../../assets/setting-account_face.png" alt="">
        <span>Successfully linked to 100466700@qq.com ( <a href="#">Unlink</a>  )</span>
      </div>
      <div class="google-text">
        <img src="../../../assets/setting-account_google.png" alt="">
        <span>Link your Google account</span>
      </div>

      <div class="footer-account">
        <button @click="changeUserInfo">Save Setting</button>
      </div>
    </div>
  </div>
</template>

<script>
import { userInfoSet, uploadImg } from '@/api/login'
import { getToken, getUserId } from '@/utils/auth'
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
      userInfo: {}
    }
  },
  computed: {
  },
  mounted () {
    this.$store.dispatch('GetInfo').then(res => {
      this.userInfo = res.data
      this.accountForm.sex = this.userInfo.base.sex
      this.accountForm.birthday = this.userInfo.base.birthday
      this.accountForm.introduce = this.userInfo.base.introduce
      this.accountForm.avatar_img = this.userInfo.base.avatar_img
      this.imageUrl = this.accountForm.avatar_img
    })
  },
  methods: {
    //上传图片
    beforeAvatarUpload (file) {
      var isJPG = file.type === 'image/jpeg'
      var isGIF = file.type === 'image/gif'
      var isPNG = file.type === 'image/png'
      var isLt500K = file.size / 1024 / 500 < 1

      if (!(isJPG || isGIF || isPNG)) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt500K) {
        this.$message.error('上传头像图片大小不能超过 500kb!')
      }
      if ((isJPG || isGIF || isPNG) && isLt500K) {
        var formData = new FormData()
        formData.append('api_token', getToken())
        formData.append('user_id', getUserId())
        formData.append('file', file)
        uploadImg(formData)
          .then(res => {
            console.log(res)
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
      userInfoSet(this.accountForm)
        .then(() => {
          this.$notify.success('reset info success')
          this.$store.dispatch('GetInfo')
          document.body.scrollTop = document.documentElement.scrollTop = 0
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../../../styles/mixin.less");

.facebook-text {
  img {
    float: left;
    margin-right: 10px;
  }
  span {
    font-size: 0.88rem;
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
    font-size: 0.88rem;
    color: #666;
  }
  height: 32px;
  line-height: 32px;
  margin-bottom: 3rem;
}
.footer-account {
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
  width: 178px;
  height: 178px;
  display: block;
  border-radius: 100%;
}
</style>
