<template>
   <div class="header-all">
     <div class="header clearfix">
       <div class="header-top">
         <div class="header-top-content">
           <div class="content">
             <a href="javascript:void(0);"  @click="coupons"> 
               <img class="logo" src="../../assets/logo.png" alt="logo">
             </a>
             <a class="inline-b coupons coupons-c" href="javascript:void(0);" @click="coupons">Coupons</a>
             <a class="inline-b coupons coupons-t" href="javascript:void(0);"  @click="trials">Trials</a>
              <!-- <a class="inline-b coupons commissions-s" href="javascript:void(0);"  @click="gotoCommissions">Commissions Inquire</a> -->
              <div class=" inline-b search">
                <input class="inline-b " type="text" placeholder="Search" v-model="keyword" @keyup="headerSearch($event, keyword)" />  
                <i class="iconfont icon-search" @click="filterKeyword(keyword)"></i>                
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
                   <img v-if="avatar_img" :src="avatar_img" />
                   <img v-else src="../../assets/user.png" alt="user" />
                 </div>
                 <div class="absolute username">{{username}}</div>
                 <div class="absolute tag " v-if="roles[0] == 'celebrity'">
                   <span class="reds-color">Influencer</span>
                 </div>
                 <div class="absolute tag " v-if="roles[0] == 'merchant'">
                   <span class="merchant-color">Merchant</span>
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
               <span>
                 <i>{{selectedCountryShop}}</i> 
                 <template>
                 <i v-if="!showDropdownC" class="iconfont icon-xiangxia"></i>
                 <i v-else class="iconfont icon-icon-"></i>
                 </template>
                </span>
                <div v-if="showDropdownC" class="dropdown" style="position: absolute">
                 <ul class="items">
                   <li v-for="item in countryLists" @click="filterCountry(item)">{{item.name}} </li>
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
           <li v-for="item in classifyList" :class="{ active: selectedC === item.id }" @click="selectClassify(item)">{{item.name}}</li>
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
              <button class="google" id="customBtn"><i class="iconfont icon-googleplus" ></i> Join with Google</button>
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
                <el-button type="button" class="sign-up-btn" @click="signUp" :loading="signloading">Sign up</el-button>
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
                <el-button  type="button" class="sign-up-btn" @click="resetPasswordBtn" :loading="resetLoading">Request Password</el-button>
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
import { getEmail, getPass, getToken, setPass } from '@/utils/auth.js'
import { validateEmail } from '@/utils/validate.js'
import { sign,getHeadCateList, retrievePassword , getUserCountry} from '@/api/login.js'
import { mapGetters } from 'vuex'
import { getStore, setStore } from '@/utils/utils'
import { base64Encode, base64Decode } from '@/utils/randomString'
// import '../../utils/google'
export default {
  name: 'header',
  data () {
    const validateEmailRule =  (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please enter your Email'))
      } else if (!validateEmail(value)) {
        return callback(new Error('Please enter the correct mailbox'))
      } else {
        callback()
      }
    }
    return {
      signform: {
        email: '',
        username: '',
        password:'',
        activate_url: '',
      },
      loginform: {
        email: '',
        password:'',
        remember: false
      },
      resetform: {
        email: '',
      },
      rulesSign: {
        email: [
          {  validator:validateEmailRule , trigger: 'blur' },
        ],
        username: [
          { required: true, message: 'Please enter your nickname', trigger: 'blur' },
          { min: 3, max: 16, message: 'Use at least 3 characters, It is case sensitive.', trigger: 'blur' }
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

      //头部分类列表
      classifyList: [
        {
          id: 0,
          name: 'Top Coupons'
        }
      ],

      //国家列表
      countryLists: [
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
      signloading: false,
      resetLoading: false,
      keyword: '',     //搜索用的关键字
      country_id: parseInt(getStore('country_id')) || 1
    }
  },
  props: {
    needClassify: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    if(this.$route.query.search) {
      this.keyword = this.$route.query.search
    }
    this.init()
  },
  //组件销毁时，关闭来自其他组件的事件接收
  beforeDestroy () {
    this.$root.eventHub.$off('initClassify')
    this.$root.eventHub.$off('selectClassify1')
    this.$root.eventHub.$off('isLoginInfo')
  },  
  computed: {
    isLogin () {
      return getToken()
    },
    ...mapGetters([
      'username',
      'token',
      'roles',
      'addRouters',
      'avatar',
      'currentRouter'
    ]),
    avatar_img () {
      return this.avatar
    },
    selectedCountryShop : {
      get () {
        for (var i of this.countryLists) {
          if (i.id === this.country_id) {
            return i.name
          }
        }
      },
      set (value) {
        this.country_id = value
      }
    },
  },
  methods: {
    //初始化 
    init () {
      this.docuemntAddEvent()
      this.enterSubmitForm()
      this.getHeadCateListInfo()
      this.getOtherEvent()
      this.getUserCountryInfo()
    },
    //数据初始化
    initData () {
      for (var i of this.classifyList) {
        if (i.name === this.$route.params.menuId) {
          this.selectedC = i.id
        }
      }
    },

    //document 全局事件添加 点击空白或者其他地方的时候下拉菜单消失
    docuemntAddEvent () {
      document.body.addEventListener('click', () => {
        this.showDropdownU = false
        this.showDropdownC = false
        this.showDropdownL = false
      }, false)
    },

    //点击enter 按钮的时候 提交表单
    enterSubmitForm () {
      window.addEventListener('keyup', (e) => {
        if (e.keyCode === 13 && this.signDialog === true && this.signloading === false) {
          this.signUp()
          return
        } else if(e.keyCode === 13 && this.loginDialog === true && this.loginLoading === false) {
          this.Login()
        } else if (e.keyCode === 13 && this.resetPassword === true && this.resetLoading === false) {
          this.resetPasswordBtn()
        } else {
          return false
        }
      })
    },

    //头部查询输入框点击确认按钮事件触发
    headerSearch (e, keyword) {
      if (e.keyCode === 13) {
        this.filterKeyword(keyword)
      }
    },

    //接受其他组件传递的事件
    getOtherEvent () {
      this.$root.eventHub.$on('initClassify', () => {
        this.selectedC = -1
      })

      //优惠券点击更多的时候触发的事件
      this.$root.eventHub.$on('selectClassify1', data => {
        for (var i of this.classifyList) {
          if (i.id === data) {
            this.selectedC = data
            this.$router.push({path:'/' + i.name})
          }
        }
      })

      //头部接受其他组件需要弹出登录的信号
      this.$root.eventHub.$on('isLoginInfo', () => {
        this.ShowLoginDialog()
      })
    },

    //通过国家过滤首页的优惠券信息
    filterCountry (item) {
      setStore('country_id',item.id)
      setStore('currency',item.currency)
      this.$router.push({path: '/'})
      window.location.reload()
      // this.selectedCountryShop  = item.id
      // this.keyword = ''
      // this.$root.eventHub.$emit('changeCountryId', item.id)
      // this.selectClassify(this.classifyList[0])
    },

    //通过关键字查询过滤首页商品
    filterKeyword (keyword) {
      this.selectedC = -1
      if (this.currentRouter.search('/trials') >= 0) {
        this.$router.push({ path: '/trials/index', query: { search: keyword }})
      } else {
        this.$router.push({ path: '/', query: { search: keyword }})
      }
      
    },

    //选择不同的分类时，跳转到相应的路由
    selectClassify (item) {
      this.selectedC = item.id
      this.keyword = ''
      if (this.currentRouter.search('/trials') >= 0) {
        this.$router.push({path: '/trials/'+ item.name})
      } else {
        this.$router.push({path: '/'+ item.name})
      }
      
    },
    coupons () {
      this.keyword = ''
      this.$router.push({ path: '/'})
      this.selectedC = 0
      this.$store.dispatch('setLevel', 0)
    },
    trials () {
      this.selectedC = 0
      this.$router.push({ path: '/trials/index' })
      this.$store.dispatch('setLevel', 1)
    },
    ShowLoginDialog () {
      // this.googleLogin()
      this.loginform.email = getEmail()
      if (getPass()) {
        this.loginform.password = base64Decode(getPass())
      }
      this.signDialog = false 
      this.loginDialog = true
     
    },
    ShowSignDialog () {
      this.resetPassword = false
      this.loginDialog = false
      this.signDialog = true
    },
    //弹出忘记密码窗口
    forgetPass () {
      this.loginDialog = false
      this.resetPassword = true
    },
    signSubmit (formName, callback) {
      //element-ui 的表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          callback()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    //下拉菜单的功能实现
    showDropdownUser () {
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
    showDropdownLanguage () {
      return
      setTimeout( () => {
        this.showDropdownL = !this.showDropdownL
        this.showDropdownC = false
        this.showDropdownU = false
      })
    },
    showAllLanguage () {
      this.isShowAllLanguage = !this.isShowAllLanguage
    },
    signUp () {
      this.signSubmit('signform', () => {
        this.signloading = true
        this.signform.activate_url = location.protocol + '//' + location.host + '/#/activate/' + this.signform.email
        sign(this.signform).then(res => {
          if (res.code === 200) {
            this.signDialog = false
            this.signloading = false
            this.$notify.success('Please login to the mailbox for activation validation')
            this.$refs['signform'].resetFields()
          } 
        }).catch(error => {
          this.signloading = false
          console.error('sign fail' + error)
        })
      })
    },
    Login () {
      this.signSubmit('loginform', () => {
        this.loginLoading = true
        this.$store.dispatch('Login', this.loginform).then(res => {
          if (res.code == 200) {
            if(this.loginform.remember == true) {
              setPass(base64Encode(this.loginform.password))
            }
            this.loginDialog = false
            this.$notify.success('login success')
            this.$refs['loginform'].resetFields()
          }
          this.$store.dispatch('GetInfo').then(() => {
            this.loginLoading = false
            window.location.reload()
          })
        }).catch(err => {
          this.loginLoading = false
          console.log(err+ ' login2')
        })    
      })
    },
    resetPasswordBtn () {
      this.signSubmit('resetform', () => {
        this.resetLoading = true
        this.resetform.url = location.protocol + '//' + location.host + '/#/resetpass/' + this.resetform.email + '/'
        console.log(this.resetform)
        retrievePassword(this.resetform).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.resetLoading = false
            this.$notify.success('Please click the link to change the password')
          }
        }).catch(() => {
          this.resetLoading = false
        })
      })
    },

    //登出
    logOut () {
      this.$store.dispatch('LogOut')
    },

    //获取头部品类列表
    getHeadCateListInfo () {
      getHeadCateList().then(res => {
        this.classifyList = this.classifyList.concat(res.data)
        this.initData()
      }).catch(error => {
        console.log(error)
      })
    },
    //获取国家列表，携带货币符号，
    getUserCountryInfo () {
      getUserCountry().then(res => {
        this.countryLists = res.data
      }).catch(error => {
        console.log(error)
      })
    },

    //google 登录
    googleLogin () {
      var startApp = function () {
        gapi.load('auth2', function (){
          // Retrieve the singleton for the GoogleAuth library and set up the client.
          let auth2 = gapi.auth2.init({
            client_id: '308959858897-r2qme5tvr34qlbnq3qs5j5d3ohdqlopi.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            // Request scopes in addition to 'profile' and 'email'
            // scope: 'additional_scope'
            scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'    //需要获取的用户信息领域
          })
          auth2.attachClickHandler('customBtn', {}, onSuccess, onFailure)
        })
      }
      /**
     * Handle successful sign-ins.
     */
      var onSuccess = function (user) {
        var profile = user.getBasicProfile()
        console.log('ID: ' + profile.getId()) // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName())
        console.log('Given Name: ' + profile.getGivenName())
        console.log('Family Name: ' + profile.getFamilyName())
        console.log('Image URL: ' + profile.getImageUrl())
        console.log('Email: ' + profile.getEmail())
        
        // document.getElementById('name').innerText = 'Signed in: ' + profile.getName()
    
        // The ID token you need to pass to your backend:
        var id_token = user.getAuthResponse().id_token
        console.log('ID Token: ' + id_token)
    
        var xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://dealsbank.com/api/v1/user/loginGoogle')
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.onload = function () {
          console.log('Signed in as: ' + xhr.responseText)
        }
        xhr.send('id_token=' + id_token)
      }

      /**
     * Handle sign-in failures.
     */
      var onFailure = function (error) {
        console.log(error)
      }
    
      startApp()
    }
  }
}
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
                  width: 5.0rem;
                  text-align: center;
                  top: -6px;
                  left: 2.8rem;
                  font-size: 0.833rem;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                &.tag {
                  // display: inline-block;
                  height: 1rem;
                  top: 10px;
                  left: 3.5rem;
                  span {
                    // background: #ec5d1c;
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
          width: 32rem;
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
