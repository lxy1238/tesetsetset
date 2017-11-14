<template>
  <div class="settings-account">
    <div class="title">Settings</div>
    <div class="title-s">Product Information</div>
    <div class="form-content">
      <el-form :model="accountForm" class="account-form" label-width="100px">
        <el-form-item label="Username: " prop="username" class="account-item" >
          <el-input disabled=""></el-input>
        </el-form-item>
        <el-form-item label="Email: " prop="" class="account-item" >
          <el-input ></el-input>
        </el-form-item>
        <el-form-item label="Avatar: " prop="" class="account-item" >
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="limit-text">Only support .jpg, .gif, .png, and the images shall not be exceed 1MB. </div>
        </el-form-item>
        <el-form-item label="Gende: " prop="" class="account-item" >
          <el-radio v-model="radio" label="1"><img class="sex-img" src="../../../assets/setting-account_1.png" alt="">Boy</el-radio>
          <el-radio v-model="radio" label="2"><img class="sex-img" src="../../../assets/setting-account_02.png" alt="">Gril</el-radio>
        </el-form-item>
        <el-form-item label="Date of birth: " prop="" class="account-item" >
          <el-input ></el-input>
        </el-form-item>
        <el-form-item label="Introduce: " prop="" class="account-item" >
          <el-input type="textarea" ></el-input>
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
        <button>Save Setting</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'settings-account',
  data () {
    return {
      accountForm: {
        username:'ghost'
      },
      imageUrl: '',
      radio: '1'
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style lang="less" >

@import url('../../../styles/mixin.less');

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
    border-color: #409EFF;
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
  }
</style>
