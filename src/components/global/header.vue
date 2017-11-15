<template>
   <div class="header-all">
     <div class="header clearfix">
       <div class="header-top">
         <div class="header-top-content">
           <div class="content">
             <a href="#/" > 
               <img class="logo" src="../../assets/logo.png" alt="logo">
             </a>
             <a class="inline-b coupons coupons-c" href="javascript:void(0);" @click="coupons">Coupons</a>
             <a class="inline-b coupons coupons-t" href="javascript:void(0);"  @click="trials">Trials</a>
              <a class="inline-b coupons commissions-s" href="javascript:void(0);"  @click="gotoCommissions">Commissions Inquire</a>
              <div class=" inline-b search">
                <input class="inline-b " type="text" placeholder="Search" />  
                <i class="iconfont icon-icon_huaban"></i>                
                <i class="iconfont icon-search"></i>                
              </div>
            <template v-if="!isLogin">
              <button class="inline-b btn-h login" @click="ShowLoginDialog">Login</button>
              <button class="inline-b btn-h sign" @click="ShowSignDialog">Sign up</button>
             </template>
            <template v-else>
             <div class="inline-b login-y user-info" 
                  :class="{active: showDropdownU}" 
                  @click.stop="showDropdownUser($event)">
               <div class="user-info-content">
                 <div class="absolute img">
                   <img src="http://www.ghostxy.top/dealsbank/img/user.png" />
                 </div>
                 <div class="absolute username">{{username}}</div>
                 <div class="absolute tag">
                   <span>Influencer</span>
                 </div>
                 <div class="icon">
                   <i v-if="!showDropdownU" class="iconfont icon-xiangxia"></i>
                   <i v-else class="iconfont icon-icon-"></i>
                </div>
               </div>
               <div v-if="showDropdownU" class="dropdown" style="position: absolute">
                 <ul class="items">
                   <!-- <li class="items-li"> <router-link to="/personal">coup0ons</router-link></li>
                   <li> <router-link to="/combine">combine</router-link></li>
                   <li> <router-link to="/successTrials">successTrials</router-link></li> -->
                   <li v-for="syncRouter in addRouters">
                     <router-link :to="syncRouter.path">{{syncRouter.text}}</router-link>
                   </li>
                   <li  @click="logOut"> <a href="javascript:void(0);">log out</a></li>
                 </ul>
               </div>
             </div>
            </template><div class="inline-b login-y country " :class="{active: showDropdownC}" @click.stop="showDropdownCountry($event)">
               <span>Country 
                 <i v-if="!showDropdownC" class="iconfont icon-xiangxia"></i>
                 <i v-else class="iconfont icon-icon-"></i>
                </span>
                <div v-if="showDropdownC" class="dropdown" style="position: absolute">
                 <ul class="items">
                   <li> <router-link to="/personal">coup0ons</router-link></li>
                   <li> <router-link to="/combine">combine</router-link></li>
                   <li> <router-link to="/successTrials">successTrials</router-link></li>
                 </ul>
               </div>
            </div><div class="inline-b login-y language" :class="{active: showDropdownL}"   @click.stop="showDropdownLanguage($event)">
               <span>Language 
                <i v-if="!showDropdownL" class="iconfont icon-xiangxia"></i>
                 <i v-else class="iconfont icon-icon-"></i>
              </span>
              <div v-if="showDropdownL" class="dropdown" style="position: absolute">
                 <ul class="items" >
                   <li> <router-link to="/personal">coup0ons</router-link></li>
                   <li> <router-link to="/combine">combine</router-link></li>
                   <li> <router-link to="/successTrials">successTrials</router-link></li>
                    <li @click.stop="showAllLanguage">
                      <input class="language-input" type="text" readonly  v-model="selectedCountry" >
                      <img class="google" src="../../assets/language-google.png" />
                      <i class="iconfont icon-xiangxia"></i>
                      <div class="all-language" v-if="isShowAllLanguage" >
                        <tbody>
                          <tr>
                            <template >
                            <td>
                              <div>aefawef</div>
                            </td>
                            <td class="line"></td>
                            </template>
                          </tr>
                        </tbody>
                      </div>
                    </li>
                 </ul>
               </div>
            </div>
           </div>
         </div>
       </div>
       <div  v-if="needClassify" class="header-bottom">
         <ul class="classify-items">
           <li v-for="(item, index) in classifyList" :class="{ active: selectedC === index }" @click="selectClassify(item, index)">{{item}}</li>
         </ul>
       </div>
     </div>
     <div class="blank"></div>

     <!-- login-form -->
     <el-dialog :visible.sync = "loginDialog" class="sign-dialog" >
      <span slot="title" class="title">Log In / Sign Up</span>
        <div class="dialog-body">
          <div class="top">
            <div class="facebook">
              <button class="facebook"><i class="iconfont icon-facebook"></i>Join with Facebook</button>
            </div>
            <div class="google">
              <button class="google"><i class="iconfont icon-googleplus"></i> Join with Google</button>
            </div>
          </div>
          <div class="bottom">
            <div class="or">
                <span>OR</span>
                <div class="line"></div>
            </div>
            <el-form :model="loginform" :rules="rulesLogin" ref="loginform"  >
              <el-form-item  prop="email">
                <el-input v-model="loginform.email" placeholder="Email Address"></el-input>
              </el-form-item>
              <el-form-item  prop="password">
                <el-input type="password" v-model="loginform.password" placeholder="Password"></el-input>
              </el-form-item>
              <div class="remember">
                <div class="box">
                  <el-checkbox v-model="loginform.remember" label="Remember me" name="type"></el-checkbox> 
                  <span class="forget" @click="forgetPass"><a href="javascript:void(0);">Forgot password?</a></span>
                </div>
              </div>
              <el-form-item >
                <el-button class="sign-up-btn login" @click="Login" :loading="loginLoading">Login in</el-button>
              </el-form-item>

            </el-form>
            <div class="footer">
              <div>
                By signing up, you agree to our <a href="#">Terms of Sevice</a>  and  <a href="#">Privacy Pol</a>
              </div>
            </div>
             <div class="footer">
              Not a member? <a href="javascript:void(0);" @click="ShowSignDialog">Create an Account ></a>
            </div>
          </div>
        </div>
     </el-dialog>

     <!-- sign-form -->

     <el-dialog :visible.sync = "signDialog" class="sign-dialog" >
       <span slot="title" class="title">Log In / Sign Up</span>
        <div class="dialog-body">
          <div class="top">
            <div class="facebook">
              <button class="facebook"><i class="iconfont icon-facebook"></i>Join with Facebook</button>
            </div>
            <div class="google">
              <button class="google"><i class="iconfont icon-googleplus"></i> Join with Google</button>
            </div>
          </div>
          <div class="bottom">
            <div class="or">
                <span>OR</span>
                <div class="line"></div>
            </div>
            <el-form :model="signform" :rules="rulesSign" ref="signform" >
              <el-form-item  prop="email">
                <el-input v-model="signform.email" placeholder="Email Address"></el-input>
              </el-form-item>
              <el-form-item  prop="username">
                <el-input v-model="signform.username" placeholder="Nickname"></el-input>
              </el-form-item>
              <el-form-item  prop="password">
                <el-input type="password" v-model="signform.password" placeholder="Password (8 to 20 characters)"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="button" class="sign-up-btn" @click="signUp">Sign up</el-button>
              </el-form-item>
            </el-form>
            <div class="footer">
              <div>
                By signing up, you agree to our <a href="#">Terms of Sevice</a>  and  <a href="#">Privacy Pol</a>
              </div>
            </div>
             <div class="footer">
              Already a member? <a href="javascript:void(0);" @click="ShowLoginDialog">Log In ></a> 
               
            </div>
          </div>
        </div>
     </el-dialog>

      <!-- reset-password -->
       <el-dialog :visible.sync = "resetPassword" class="sign-dialog" >
       <span slot="title" class="title">Reset Password</span>
        <div class="dialog-body">
          <div class="top">
            <div class="text">
              <span>
                If you have forgotten your password, you can request to reset your password. When you fill in your registered email address, you will be sent instructions on how to reset your password.
              </span>
            </div>
           
          <div class="bottom top">
           
            <el-form :model="resetform" :rules="rules" ref="resetform" >
              <el-form-item  prop="email">
                <el-input v-model="resetform.email" placeholder="Email Address "></el-input>
              </el-form-item>
              <el-form-item>
                <button class="sign-up-btn">Request Password</button>
              </el-form-item>
            </el-form>
             <div class="or">
                <span>OR</span>
                <div class="line"></div>
            </div>
             <div class="facebook">
              <button class="facebook"><i class="iconfont icon-facebook"></i>Join with Facebook</button>
            </div>
            <div class="google">
              <button class="google"><i class="iconfont icon-googleplus"></i> Join with Google</button>
            </div>
          </div>
             <div class="footer">
              Not a member? <a href="javascript:void(0);" @click="ShowSignDialog">Create an Account ></a> 
            </div>
          </div>
        </div>
     </el-dialog>
   </div>
</template>

<script>
import { getEmail, getPass, getToken } from '@/utils/auth.js'
import { validateEmail } from '@/utils/validate.js'
import { sign, login } from '@/api/login.js'
import { mapGetters } from 'vuex'
export default {
  name: "header",
  data() {
    const validateEmailRule =  (rule, value, callback) => {
        if (!value) {
          return callback(new Error("Please enter your Email"))
        } else if (!validateEmail(value)) {
          return callback(new Error("Please enter the correct mailbox"))
        } else {
          callback()
        }
    }
    return {
      signform: {
        email: '',
        username: '',
        password:'',
      },
      loginform: {
        email: '',
        password:'',
        remember: false
      },
      resetform: {
        username: '',
        password:'',
      },
      rulesSign: {
        email: [
          {  validator:validateEmailRule , trigger: 'blur' },
        ],
        username: [
          { required: true, message: 'Please enter your nickname', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Please enter your password', trigger: 'blur' },
          { min: 8, max: 20, message: 'Use at least 8 characters, It is case sensitive.', trigger: 'blur' }
        ]
      },
      rulesLogin: {
        email: [
          { required: true, message: 'Please enter your email', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Please enter your password', trigger: 'blur' },
          { min: 8, max: 20, message: 'Use at least 8 characters, It is case sensitive.', trigger: 'blur' }
        ]
      },
      rules: {
        email: [
           {  validator:validateEmailRule , trigger: 'blur' },
        ]
      },
      classifyList: [
        "Top Coupons",
        "Grocery",
        "Appliances",
        "Electronics",
        "Software",
        "Apparel",
        "Home",
        "Auto",
        "Health & Beauty",
        "Pet",
        "Children",
        "Entertainment",
        "Sports & Outdoors",
        "Travel",
        "Books",
        "Office",
        "Sex Toys"
      ],
      allLanguage: [
        ['中文(简体)'],
        ['中文(简体)'],
        ['中文(简体)'],
        ['中文(简体)'],
        ['中文(简体)'],
        ['中文(简体)'],
        ['中文(简体)'],
      ],
      selectedC: 0,
      loginDialog: false,
      signDialog: false,
      resetPassword: false,
      showDropdownC: false,
      showDropdownL: false,
      showDropdownU: false,
      selectedCountry: '中文(简体)',
      isShowAllLanguage: false,
      loginLoading: false,
    }
  },
  props: {
    needClassify: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    document.body.addEventListener('click', (e) => {
      this.showDropdownU = false
      this.showDropdownC = false
      this.showDropdownL = false
    }, false)
    window.addEventListener('keyup', (e) => {
      if (e.keyCode === 13 && this.signDialog === true) {
        this.signUp()
        return
      } else if(e.keyCode === 13 && this.loginDialog === true) {
        this.Login()
      } else if (e.keyCode === 13 && this.resetPassword === true) {

      } else {
        return false
      }
    })
   
    this.loginform.email = getEmail()
    this.loginform.password = getPass()
    // this.loginDialog = true
    console.log(this.addRouters)
  },
  computed: {
    isLogin () {
      return (Boolean(this.$store.getters.email) || Boolean(getEmail())) && getToken()
    },
    ...mapGetters([
      'username',
      'token',
      'addRouters'
    ])
  },
  methods: {
    gotoCommissions () {
      this.$router.push({path: '/commissions'})
    },
    selectClassify(item, index) {
      //请求数据
      this.selectedC = index
      //非父子组件之间的数据传
      this.$root.eventHub.$emit("selectClassify", index)
    },
    coupons() {
      this.$router.push({ path: "/" })
      this.selectedC = 0
      this.$store.dispatch("setLevel", 0)
    },
    trials() {
      this.$router.push({ path: "/trials" })
      this.selectedC = 0;
      this.$store.dispatch("setLevel", 1)
    },
    ShowLoginDialog() {
      // this.loginform.email = getEmail()
      // this.loginform.password = getPass()
      this.signDialog = false
      this.resetPassword = false
      this.loginDialog = true
     
    },
    ShowSignDialog() {
      this.resetPassword = false
      this.loginDialog = false
      this.signDialog = true
    },
    signSubmit(formName, callback) {
      //element-ui 的表单验证
       this.$refs[formName].validate((valid) => {
          if (valid) {
            callback()
          } else {
            console.log('error submit!!');
            return false
          }
        });
    },
    forgetPass () {
      this.loginDialog = false
      this.resetPassword = true
    },
    showDropdownUser (e) {
      setTimeout( () => {
        this.showDropdownU = !this.showDropdownU
        this.showDropdownC = false
        this.showDropdownL = false
      })
    },
    showDropdownCountry () {
      setTimeout( () => {
        this.showDropdownC = !this.showDropdownC
        this.showDropdownU = false
        this.showDropdownL = false
      })
    },
    showDropdownLanguage (e) {
      setTimeout( () => {
        this.showDropdownC = false
        this.showDropdownU = false
        this.showDropdownL = !this.showDropdownL
      })
    },
    showAllLanguage () {
      this.isShowAllLanguage = !this.isShowAllLanguage
    },
    signUp () {
      this.signSubmit('signform', () => {
        sign(this.signform).then(res => {
          console.log(res)
          this.signDialog = false
          this.$message.success("Please login to the mailbox for activation validation")
          this.$refs['signform'].resetFields();
        }).catch(error => {
          console.error("sign fail")
        })
      })
    },
    Login () {
      this.signSubmit('loginform', () => {
        this.loginLoading = true
        this.$store.dispatch('Login', this.loginform).then(res => {
          if (res.code === 402) {
            this.$notify.error(res.message)
            this.loginLoading = false
            return false
          } else if (res.code === 401) {
            const errorMsg = JSON.parse(res.message).email[0]
            this.$notify.error(errorMsg)
            this.loginLoading = false
            return false
          } else if (res.code == 200) {
            this.loginDialog = false
            this.$notify.success("login success")
          }
          this.$store.dispatch('GetInfo').then(res => {
            console.log(res.data)
            this.loginLoading = false
            window.location.reload()
          })
        }).catch(err => {
          console.log(err+ ' login2')
        })    
      })
    },
    logOut () {
      this.$store.dispatch('LogOut')
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../styles/mixin.less");
.header-all {
  height: 110px;
}
.header {
  .p(f);
  display: block;
  z-index: 999;
  width: 100%;
  color: white;
  height: 70px;
  .header-top {
    background: #31393f;
    width: 100%;
    min-width: @Width_content;
    height: 70px;
    vertical-align: middle;
    .header-top-content {
      height: 70px;
      .pct(@Width_content);
      border: 1px solid #31393f;
      .content {
        .p(r);
        height: 70px;
        line-height: 70px;
        // margin-top: 1rem;
        padding-left: 15rem;
        // border: 1px solid yellow;
        .logo {
          .p(a);
          left: 0;
          top: 12px;
          width: 180px;
          height: inherit;
        }
        .inline-b {
          display: inline-block;
          margin-right: 1rem;
        }
        .login-y {
          position: relative;
          margin-right: 1px;
          top: -1px;
          text-align: center;
          cursor: pointer;
          min-width: 10px;
          width: 10rem;
          height: 100%;
          background: #31393f;
          .dropdown {
              position: absolute;
              text-align: left;
              top: 70px;
              z-index: 999;
              background: #4d6170;
              line-height: 1;
              width: 100%;
              .items {
                margin: 10px 0 10px 0;
                li {
                  padding-left: 10px;
                  height: 32px;
                  line-height: 32px;
                  &:hover {
                    background: #3a4853;
                  }
                  a {
                    display: inline-block;
                    width: 100%;
                    color: white;
                    font-size: 12px;
                  }
                }
              }
            }
          &:hover {
            background: #4d6170;
          }
          &.active {
            background: #4d6170;
          }
          &.user-info {
            position: relative;
            text-align: right;
            padding-right: 1rem;
            .user-info-content {
              .absolute {
                position: absolute;
                top: 0;
                left: 0;
                &.img {
                  top: 0.6rem;
                  left: .8rem;
                  img {
                    width: 2rem;
                    height: 2rem;
                    border-radius: 100%;
                  }
                }
                &.username {
                  top: -6px;
                  left: 3.5rem;
                  font-size: 0.833rem;
                }
                &.tag {
                  // display: inline-block;
                  height: 1rem;
                  top: 10px;
                  left: 3.5rem;
                  span {
                  background: #ec5d1c;
                  font-size: 11px;
                  padding:0px 5px;
                  border-radius: 4px;
                    
                  }
                }
              }
            }
          }
          &.country {
            top: -2px;
            width: 6.27rem;
            font-size: 0.833rem;
            .dropdown {
              width: 130%;
              left: -30%;
             
            }
          }
          &.language {
            top: -2px;
            width: 7.27rem;
            font-size:  0.833rem;
            .dropdown {
              width: 130%;
              left: -30%;
               .items {
                li {
                  position: relative;
                  .language-input {
                    .el-input-self;
                    width: 87%;
                    height: 20px;
                    border-radius: 0;
                    background: #4d6170;
                    color: white;
                    text-align: center;
                    
                  }
                  .google {
                    position: absolute;
                    left: 14px;
                    top: 10px;
                  }
                  .iconfont {
                    position: absolute;
                    right: 15%;
                    top: 2px;
                  }
                  .all-language {
                    position: absolute;
                    background: white;
                    right: 0.666rem;
                    top: 27px;
                    width: 1024px;
                    height: 320px;
                    background-color: rgb(255, 255, 255);
                    text-decoration: none;
                    border-width: 1px;
                    border-style: solid;
                    border-color: rgb(107, 144, 218);
                    border-image: initial;
                    overflow: hidden;
                    padding: 4px;
                    color: blue;
                    tr {
                      vertical-align: top;
                    }
                    td {
                      height: 275px;
                      line-height: 24px;
                      font-size: 16px;
                      &.line {
                        width: 6px;
                      }
                      div {
                        padding: 2px 5px;
                        &:hover {
                          background: #3366cc;
                          color: white;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          .top {
            position: absolute;
            bottom: -10px;
          }
          .iconfont {
            position: relative;
            top: 1px;
          }
          
        }
        .coupons {
          font-weight: bold;
          color: #c1c1c1;
          &:hover {
            color: white;
          }
        }
        .coupons-t {
          margin-right: 1rem;
        }
        .coupons-c {
          margin-left: 1rem;
        }
        .search {
          .p(r);
          width: 20rem;
          height: 36px;
          margin-right: 0.90rem;
          input {
            .el-input-self;
            height: 36px;
            font-size: 14px;
            &:focus {
              border: 1px solid #2d84f4;
            }
          }
          .icon-search {
            .p(a);
            right: 10px;
            top: 0;
            color: #999;
            font-size: 16px;
            cursor: pointer;
          }
          .icon-icon_huaban {
            .p(a);
            right: 30px;
            top: 1px;
            font-size: 16px;
            color: #999;
            cursor: pointer;
            transform: rotate(180deg);
          }
        }
        .btn-h {
          .btn-h(4.5rem, 36px);
          font-size: 0.78rem;
          font-weight: bold;
          text-align: center;
        }
        .login {
          // font-family: Arial, Helvetica, sans-serif;
          background: white;
          border-color: white;
          color: black;
          margin-left: 0;
          &:hover {
            background: darken(white, 10%);
            border-color: darken(white, 10%);
          }
          &:active {
            background: darken(white, 20%);
            border-color: darken(white, 20%);
          }
        }
        .sign {
          background: #0077c5;
          border-color: #0077c5;
          color: white;
          margin-right: 1rem;
          &:hover {
            background: lighten(#0077c5, 10%);
            border-color: lighten(#0077c5, 10%);
          }
          &:active {
            background: lighten(#0077c5, 20%);
            border-color: lighten(#0077c5, 20%);
          }
        }
      }
    }
  }
  .header-bottom {
    .classify-items {
      .pct(@Width_content);
      line-height: 40px;
      height: 40px;
      overflow: hidden;
      text-align: center;
      li {
        font-size: 12px;
        font: HelveticaNeueLT  bold 12px;
        display: inline-block;
        color: rgb(34, 24, 21);
        cursor: pointer;
        text-align: center;
        margin: 0 1.5rem 0 0;
        &.active {
          color: rgb(230, 49, 115);
          font-weight: bold;
        }
      }
    }
    height: 40px;
    background: white;
  }
}

.login-dialog,
.sign-dialog {
  .title {
    width: 17rem;
    text-align: center;
    margin-left: 5rem;
    font-weight: bold;
    font-size: 26px;
  }
  .dialog-body {
    text-align: center;
  }

  .or {
    position: relative;
    height: 1rem;
    margin-bottom: 1rem;
    span {
      position: relative;
      z-index: 22;
      background: #f9f9f9;
    }
    .line {
      position: absolute;
      top: 7px;
      z-index: 1;
      left: 10%;
      display: inline-block;
      width: 80%;
      height: 1px;
      background: #ddd;
    }
  }
}
.sign-dialog {
  .top {
    .text {
      width: 80%;
      text-align: left;
      margin: 0 auto;
      margin-bottom: 20px;
    }
    .facebook, .google {
      width: 100%;
      margin-bottom: 10px;
      button {
       .btn-h(80%, 42px);
       color: white;
      }
    }
    .facebook {
      button {
        background: #3b5998;
        border-color: #3b5998;
        &:active {
          background: darken(#3b5998, 10%);
          border-color: darken(#3b5998, 10%);
        }
      }
    }
    .google {
      button {
        background: #dd4b39;
        border-color: #dd4b39;
        &:active {
          background: darken(#dd4b39, 10%);
          border-color: darken(#dd4b39, 10%);
        }
      }
    }
  }
  .sign-up-btn {
    margin-bottom: 10px;
    .btn-h(100%, 42px);
    color: white;
    background: #7fbadf;
    border-color: #7fbadf;
    &:active {
      background: darken(#7fbadf, 10%);
      border-color: darken(#7fbadf, 10%);
    }
    &.login {
      background: #0075C1;
      border-color: #0075C1;
       &:active {
      background: darken(#0075C1, 10%);
      border-color: darken(#0075C1, 10%);
    }
    }

  }
  .footer {
    margin: 20px auto;
    width: 80%;
  }
  .remember {
    .box {
      width: 80%;
      margin: 0 auto;
      text-align: left;
      .forget {
        float: right;
      }
    }
  }
}
</style>
