<template>
   <div class="header-all">
     <div class="header clearfix">
       <div class="header-top">
         <div class="header-top-content">
           <div class="content">
             <a href="javascript:void(0);"  @click="couponsLogo"> 
               <img class="logo" src="../../assets/logo.png" alt="logo">
             </a>
             <a class="inline-b coupons coupons-c" href="javascript:void(0);" @click="coupons" :class="{ active: selectedCoupon ===  1}" >Coupons</a>
             <a class="inline-b coupons coupons-t" href="javascript:void(0);"  @click="trials" :class="{ active: selectedCoupon ===  2}">Trials</a>
              <!-- <a class="inline-b coupons commissions-s" href="javascript:void(0);"  @click="gotoCommissions">Commissions Inquire</a> -->
              <div class=" inline-b search" :class="{isnotLanguage: !initLanguageSuccess}">
                <input class="inline-b " type="text" placeholder="Search" v-model="keyword" @keyup="headerSearch($event, keyword)" />  
                <i class="iconfont icon-search" @click="filterKeyword(keyword)"></i>                
              </div>
              
            <template v-if="!isLogin">
              <button class="inline-b btn-h login" @click="ShowLoginDialog">Log In</button>
              <button class="inline-b btn-h sign" @click="ShowSignDialog">Sign Up</button>
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
                 <div class="absolute username" :class="{member: roles[0] == 'member'}">{{username}}
                   
                 </div>
                 <div class="absolute tag " v-if="roles[0] == 'celebrity'">
                   <span class="reds-color">Influencer</span>
                 </div>
                 <div class="absolute tag " v-if="roles[0] == 'merchant'">
                   <span class="merchant-color">Merchant</span>
                 </div>
                 <i v-if="!showDropdownU" class="iconfont icon-xiangxia"></i>
                <i v-else class="iconfont icon-icon-"></i>
                 <div class="icon">
                   
                </div>
               </div>
               <div v-if="showDropdownU" class="dropdown" style="position: absolute">
                 <ul class="items">
                   <li v-for="syncRouter in addRouters" v-if="!syncRouter.hidden">
                     <router-link :to="syncRouter.path">{{syncRouter.text}}</router-link>
                   </li>
                   <li  @click="logOut"> <a href="javascript:void(0);">Log Out</a></li>
                 </ul>
               </div>
             </div>
            </template>
            <div class="inline-b login-y country " :class="{active: showDropdownC}" @click.stop="showDropdownCountry($event)">
               <span class="country-span">
                 <!-- {{selectedCountryShop}} -->
                 <img :src="countryImg[selectedCountryShop]" />
                 <template>
                 <i v-if="!showDropdownC" class="iconfont icon-xiangxia"></i>
                 <i v-else class="iconfont icon-icon-"></i>
                 </template>
                </span>
                <div v-if="showDropdownC" class="dropdown" style="position: absolute">
                 <ul class="items">
                    <li v-for="item in countryLists" @click="filterCountry(item)">
                      <img :src="countryImg[item.name]" />
                     {{item.name}} 
                    </li>
                 </ul>
               </div>
            </div>
            <div class="inline-b login-y language" :class="{active: showDropdownL}"  @click.stop="showDropdownLanguage($event)" v-if="initLanguageSuccess" >
               <span class="language-span" >Language 
                <i v-if="!showDropdownL" class="iconfont icon-xiangxia"></i>
                 <i v-else class="iconfont icon-icon-"></i>
              </span>
              <div v-show="showDropdownL" class="dropdown" style="position: absolute">
                 <ul class="items" style="text-align:center" >
                     <div id="google_translate_element"  @click.stop="showDropdownLanguage1($event)"></div>
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
     <el-dialog :visible.sync = "loginDialog" class="sign-dialog"  >
      <!-- <span slot="title" class="title">Log In</span> -->
        
        <div class="dialog-body">
          <div class="sign-dialog-head">
            <div class="center">Welcome to Dealsbank</div>
            <p class="center">Log In to start saving and earning.</p>
          </div>
          <div class="top">
            <div class="facebook">
              <button type="button" class="facebook" @click="loginFacebook"><i class="iconfont icon-facebook"></i>Join with Facebook</button>
            </div>
            <div class="google">
              <button  type="button" class="google" id="customBtn"><i class="iconfont icon-googleplus" ></i> Join with Google</button>
            </div>
          </div>
          <div class="bottom">
            <div class="or">
                <span>OR</span>
                <div class="line"></div>
            </div>
            <el-form :model="loginform" :rules="rulesLogin" ref="loginform"  >
              <el-form-item  prop="email" v-if="loginDialog">
                <el-input v-model="loginform.email" placeholder="Email Address"></el-input>
              </el-form-item>
              <el-form-item  prop="password" v-if="loginDialog">
                <el-input type="password" v-model="loginform.password" placeholder="Password"></el-input>
              </el-form-item>
              <div class="remember">
                <div class="box">
                  <el-checkbox v-model="loginform.remember" label="Remember me" name="type" ></el-checkbox> 
                  <span class="forget" @click="forgetPass"><a href="javascript:void(0);">Forgot password?</a></span>
                </div>
              </div>
              <el-form-item >
                <el-button class="sign-up-btn login" @click="Login" :loading="loginLoading">Log In</el-button>
              </el-form-item>

            </el-form>
            <div class="footer top">
              <div>
                By clicking Log In, you agree to our <a href="javascript:void(0);" @click="gotoTerm">Terms of Sevice</a>  and  <a href="javascript:void(0);" @click="gotoPrivacy">Privacy Policy.</a>
              </div>
            </div>
             <div class="footer bottom">
              Not a member? <a href="javascript:void(0);" @click="ShowSignDialog"> <b>Create an Account ></b> </a>
            </div>
          </div>
        </div>
     </el-dialog>

     <!-- sign-form -->

     <el-dialog :visible.sync = "signDialog" class="sign-dialog" >
        
        <div class="dialog-body">
          <div class="sign-dialog-head">
            <div class="center">Join Dealsbank</div>
            <p class="center">Not only saving, more to earning.</p>
          </div>
          <div class="top">
            <div class="facebook">
              <button class="facebook"  @click="loginFacebook"><i class="iconfont icon-facebook"></i>Join with Facebook</button>
            </div>
            <div class="google">
              <button class="google" id="customBtn1"><i class="iconfont icon-googleplus"></i> Join with Google</button>
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
                <el-input v-model="signform.username" placeholder="Username"></el-input>
              </el-form-item>
              <el-form-item  prop="password">
                <el-input type="password" v-model="signform.password" placeholder="Password (8 to 20 characters)"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="button" class="sign-up-btn" @click="signUp" :loading="signloading" >Sign Up</el-button>
              </el-form-item>
            </el-form>
            <div class="footer top">
              <div>
                By creating an account, you agree to our <a  href="javascript:void(0);" @click="gotoTerm">Terms of Sevice</a>  and  <a href="javascript:void(0);" @click="gotoPrivacy">Privacy Policy.</a>
              </div>
            </div>
             <div class="footer bottom">
              Already a member? <a href="javascript:void(0);" @click="ShowLoginDialog"> <b>Log In ></b> </a> 
            </div>
          </div>
        </div>
     </el-dialog>

      <!-- reset-password -->
       <el-dialog :visible.sync = "resetPassword" class="sign-dialog" >
       <span slot="title" class="title resetpass">Reset Password</span>
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
               <el-form-item  prop="email" class=" hidden">
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
              <button class="facebook"   @click="loginFacebook"><i class="iconfont icon-facebook"></i>Join with Facebook</button>
            </div>
            <div class="google">
              <button class="google" id="customBtn2"><i class="iconfont icon-googleplus"></i> Join with Google</button>
            </div>
          </div>
             <div class="footer bottom">
              Not a member? <a href="javascript:void(0);" @click="ShowSignDialog"> <b>Create an Account ></b> </a> 
            </div>
          </div>
        </div>
     </el-dialog>


       <!--发送右键-->
      <el-dialog :visible.sync = "sendEmailDialog" class="sign-dialog" >
        <div class="send-email">
          <p class="sorry-text">Activeation Email Has Been Sent.</p>

          <p>An account activation email has been sent to your email.</p>
          <p class="footer-p">
            If it isn't there, please check your Spam/Junk/Bulk mail folder.
          </p>
          <div class="send-footer">
            <el-button class="send-button" @click="reSendEmail" v-if="!isSendEmail">Resend Activeation Email</el-button>
            <el-button type="info" disabled class="btn-disabled" v-else>Sending after {{seconds}} seconds </el-button>
          </div>
        </div>
     </el-dialog>


    
   </div>
</template>

<script>
import { validateEmail } from '@/utils/validate.js'
import { mapGetters } from 'vuex'
import { getStore, setStore } from '@/utils/utils'
import { base64Encode, base64Decode } from '@/utils/randomString'
import { getEmail, getToken,getPass, setToken, setUserId ,setPass, getUserId} from '@/utils/auth'
export default {
  name: 'header',
  data () {
    const validateEmailRule =  (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please enter your Email.'))
      } else if (!validateEmail(value)) {
        return callback(new Error('Invalid email address.'))
      } else {
        callback()
      }
    }
    const validateEmailRule1 =  (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please enter your Email.'))
      } else if (!validateEmail(value)) {
        return callback(new Error('Invalid email address.'))
      } else {
        this.$api.checkEmail({email: value}).then(res => {
          if (!res.data) {
            callback()
          } else {
            callback(new Error('The Email has been used.'))
          }
        })
      }
    }
    const validateUsername = (rule, value, callback) => {
      this.$api.checkUsername({username: value}).then(res => {
        if (!res.data) {
          callback()
        } else {
          callback(new Error('This username is already in use.'))
        }
      }).catch(() => {
        callback()
      })
    }
    const validateLoginEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please enter your Email.'))
      } else if (!validateEmail(value)) {
        return callback(new Error('Invalid email address.'))
      } else {
        this.$api.checkEmail({email: value}).then(res => {
          if (!res.data) {
            return callback(new Error('The Email is Invalid.')) 
          } else if (res.data && res.data.status === 'waiting') {
            return callback(new Error('Please login to the email activation account.'))
          } else if (res.data && res.data.status === 'normal') {
            return callback()
          }
        })
        
      }
    }
    const validateLoginPass = (rule, value, callback) => {
      if (this.loginform.email) {
        this.$api.login(this.loginform).then(res => {
          callback()            
        }).catch(err => {
          callback(new Error('The password is incorrect.'))
        })
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
          {  validator:validateEmailRule1 , trigger: 'blur' },
        ],
        username: [
          { required: true, message: 'Please enter your username.', trigger: 'blur' },
          { min: 3, max: 16, message: 'Use at least 3 characters, It is case sensitive.', trigger: 'blur' },
          {  validator:validateUsername , trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Please enter your password.', trigger: 'blur' },
          { min: 8, max: 20, message: 'Use at least 8 characters, It is case sensitive.', trigger: 'blur' }
        ]
      },
      rulesLogin: {
        email: [
          { validator:validateLoginEmail, trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Please enter your password.', trigger: 'blur' },
          { min: 8, max: 20, message: 'Use at least 8 characters, It is case sensitive.', trigger: 'blur' },
          { validator:validateLoginPass, trigger: 'submit' },
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
          name: 'Top'
        }
      ],

      //国家列表
      countryLists: [
      ],
      selectedC: 0,
      loginDialog: false,
      signDialog: false,
      resetPassword: false,
      sendEmailDialog: false,
      isSendEmail: false,
      seconds: 60,
      showDropdownC: false,
      showDropdownL: false,
      showDropdownU: false,
      loginLoading: false,
      signloading: false,
      resetLoading: false,
      keyword: '',     //搜索用的关键字
      country_id: parseInt(getStore('country_id')) || 1,
      app_id: '894275327387425',
      selectedCoupon: 1,
      isLogin: getToken(),
      countryImg: {
        'United States': require('../../assets/United States.png'),
        'United Kingdom': require('../../assets/united_kingdom.png'),
        'Germany': require('../../assets/germany.png'),
        'Japan': require('../../assets/japan.png'),
        'France': require('../../assets/france.png'),
        'Italy': require('../../assets/italy.png'),
        'Spain': require('../../assets/spain.png'),
        'Canada': require('../../assets/Canada.png'),
        'Australia': require('../../assets/australia.png')
      },
      initLanguageSuccess: false,  //判断翻译插件是否加载完成
      sendEmailnum: '',
    }
  },
  props: {
    needClassify: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters([
      'countryInfo',
      'username',
      'roles',
      'addRouters',
      'userBase',
      'currentRouter'
    ]),
    avatar_img () {
      return this.userBase.avatar_img
    },
    selectedCountryShop : {
      get () {
        for (var i of this.countryLists) {
          if (i.id === this.country_id) {
            console.log(i.name)
            return i.name
          }
        }
      },
      set (value) {
        this.country_id = value
      }
    },
  },
  beforeCreate () {
    this.$store.dispatch('getCountryInfo').then(()=> {
      this.countryLists = this.countryInfo
    })
  },
  mounted () {
    this.init()
  },
  //组件销毁时，关闭来自其他组件的事件接收
  beforeDestroy () {
    this.$root.eventHub.$off('initClassify')
    this.$root.eventHub.$off('selectClassify1')
    this.$root.eventHub.$off('isLoginInfo')
    this.$root.eventHub.$off('changeCountryId')
  },  

  methods: {
    //初始化 
    init () {
      this.initLanguage()
      this.docuemntAddEvent()
      this.enterSubmitForm()
      this.getHeadCateListInfo()
      this.getOtherEvent()
      // this.initChat()
    },
    //数据初始化
    initData () {
      //获取查询字段
      if(this.$route.query.search) {
        this.keyword = this.$route.query.search
      }
      //获取品类ID
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
        this.selectedC = 0
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

      //头部接受进入试用品页面触发的修改selectedCoupon 字段的信号
      this.$root.eventHub.$on('changeSelectCoupon', () => {
        this.selectedCoupon = 2
      })

      this.$root.eventHub.$on('changeCountryId', data => {
        this.selectedCountryShop = parseInt(data)
        setTimeout(() => {
          for (let i of this.countryLists) {
            if (i.id == data) {
              setStore('country_id',i.id)
              setStore('currency',i.currency)
              setStore('pay_currency', i.pay_currency)
              this.$root.eventHub.$emit('changeCurrency', i.currency)
            }
          }
        }, 500)
      })

    },

    //通过国家过滤首页的优惠券信息
    filterCountry (item) {
      setStore('country_id',item.id)
      setStore('currency',item.currency)
      setStore('pay_currency', item.pay_currency)
      this.$router.push({path: '/'})
      window.location.reload()
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

    //如果是当前路由的话，就不进行跳转
    isCurrentRouter (routePath) {
      if (this.currentRouter.search(routePath) >= 0) {
        return true
      } else {
        return false
      }
    },

    //选择不同的分类时，跳转到相应的路由
    selectClassify (item) {
      this.selectedC = item.id
      this.keyword = ''
      if (this.currentRouter.search('/trials') >= 0) {
        if (this.isCurrentRouter('/trials/'+ item.name)) {
          return
        }
        this.$router.push({path: '/trials/'+ item.name})
      } else {
        if (this.isCurrentRouter('/coupon/'+ item.name)) {
          return
        }
        this.$router.push({path: '/coupon/'+ item.name})
      }
    },
    coupons () {
      this.keyword = ''
      this.selectedC = 0
      this.selectedCoupon = 1
      if (this.isCurrentRouter('/coupon/Top')) {
        return
      }
      this.$router.push({ path: '/coupon/Top'})
    },
    couponsLogo () {
      this.keyword = ''
      this.selectedC = 0
      this.selectedCoupon = 1
      if (this.currentRouter.lastIndexOf('/') === 0) {
        return
      }
      this.$router.push({ path: '/'})
    },
    trials () {
      this.keyword = ''
      this.selectedC = 0
      this.selectedCoupon = 2 
      if (this.isCurrentRouter('/trials/Top')) {
        return
      }
      this.$router.push({ path: '/trials/Top' })
    },
    ShowLoginDialog () {
      setTimeout(() => {
        this.googleLogin()
        this.initFacebook()
      }, 500)
      if (getEmail()) {
        this.loginform.email = getEmail()
      }
      if (getPass()) {
        this.loginform.password = base64Decode(getPass())
      }
      this.hideAllDialog()
      this.loginDialog = true
     
    },
    ShowSignDialog () {
      setTimeout(() => {
        this.googleLogin()
        this.initFacebook()
      }, 500)
      this.hideAllDialog()
      this.signDialog = true
    },
    //弹出忘记密码窗口
    forgetPass () {
      setTimeout(() => {
        this.googleLogin()
        this.initFacebook()
      }, 500)
      this.hideAllDialog()
      this.resetPassword = true
    },
    hideAllDialog () {
      this.resetPassword = false
      this.loginDialog = false
      this.signDialog = false
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
      setTimeout( () => {
        this.showDropdownL = !this.showDropdownL
        this.showDropdownC = false
        this.showDropdownU = false
        this.initLanguage()
      })
    },
    showDropdownLanguage1 () {
      setTimeout( () => {
        this.showDropdownL = true
        this.showDropdownC = false
        this.showDropdownU = false
        this.initLanguage()
      })
    },
    showAllLanguage () {
      this.isShowAllLanguage = !this.isShowAllLanguage
    },
    signUp () {
      
      this.signSubmit('signform', () => {
        this.signloading = true
        this.signform.activate_url = location.protocol + '//' + location.host + '/activate/' + base64Encode(this.signform.email)  + '/'
        this.$api.sign(this.signform).then(res => {
          if (res.code === 200) {
            this.signDialog = false
            this.signloading = false
            // this.$snotify.success('Please login to the mailbox for activation validation.')
            this.sendEmailnum = this.signform.email
            this.sendEmailDialog = true
            this.$refs['signform'].resetFields()
          } 
        }).catch(error => {
          this.$snotify.error('Submit Failed! ' + error.message)
          this.signloading = false
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
            this.loginLoading = false
            this.$refs['loginform'].resetFields()
          }
          this.$store.dispatch('GetInfo').then(res => {
            const roles =[ res.data.type ]
            this.$store.dispatch('GenerateRoutes', { roles }).then(() => {
              this.$router.addRoutes(this.$store.getters.addRouters)
              // this.$router.push({path: this.currentRouter, query:{promoter: getUserId()}})
              this.isLogin = getToken()
              if (this.currentRouter.search('/activate') >= 0) {
                this.$router.push({path: '/'})
                return
              }
              if (this.currentRouter.search('/opration-err/index') >= 0) {
                if (this.$route.query.apply == 'influence') {
                  this.$router.push({path: '/about/center/influencer'})
                  return
                } else  if (this.$route.query.apply == 'merchant') {
                  this.$router.push({path: '/about/center/merchant'})
                  return
                }
              }
              this.addPromoterId()
            })
          })
        }).catch(err => {
          this.$snotify.error('Submit Failed! ' + err.message)
          this.loginLoading = false
        })    
      })
    },
    resetPasswordBtn () {
      this.signSubmit('resetform', () => {
        this.resetLoading = true
        this.resetform.url = location.protocol + '//' + location.host + '/resetpass/' + base64Encode(this.resetform.email)  + '/'
        this.$api.retrievePassword(this.resetform).then(res => {
          if (res.code === 200) {
            this.resetLoading = false
            this.hideAllDialog()
            this.$snotify.success('The reset passwrod Email has been sent.')
          }
        }).catch(err => {
          this.resetLoading = false
          this.$snotify.error('Submit Failed! ' + err.message)
        })
      })
    },

    //判断用户是否登录，给链接中加上用户ID
    addPromoterId () {
      if (this.$route.params.promoterId) {
        return
      }
      if (getUserId() && getToken() && 
      (this.currentRouter.search('/trialsDetails') >= 0 
        || this.currentRouter.search('/coupon') >= 0
        || this.currentRouter.search('/trials') >= 0
        || this.currentRouter === '/'
      ) ) {
        if (this.$route.params.promoterId) {
          return
        }else if (this.currentRouter[this.currentRouter.length - 1] === '/') {
          this.$router.replace({path: this.currentRouter + (getUserId() ?   base64Encode(getUserId()) : '')})
        } else {
          this.$router.replace({path: this.currentRouter + (getUserId() ? '/' +  base64Encode(getUserId()) : '')})
        }
      }
    },

    //登出
    logOut () {
      this.$store.dispatch('LogOut')
    },

    //获取头部品类列表
    getHeadCateListInfo () {
      this.$api.getHeadCateList().then(res => {
        this.classifyList = this.classifyList.concat(res.data)
        this.initData()
      }).catch(error => {
        console.log(error)
      })
    },
    //获取国家列表，携带货币符号，
    getUserCountryInfo () {
      this.$store.dispatch('getCountryInfo').then(()=> {
        this.countryLists = this.countryInfo
      })
    },

    //google 登录
    googleLogin () {
      require('../../utils/google') 
      var _this = this
      var startApp = function () {
        gapi.load('auth2', function (){
          let auth2 = gapi.auth2.init({
            client_id: '308959858897-deq7102qpgo6ku4763p75rl734skf0mf.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'    //需要获取的用户信息领域
          })
          auth2.attachClickHandler('customBtn', {}, onSuccess, onFailure)
          auth2.attachClickHandler('customBtn1', {}, onSuccess, onFailure)
          auth2.attachClickHandler('customBtn2', {}, onSuccess, onFailure)
        })
      }
      /**
     * Handle successful sign-ins.
     */
      //google登录回调
      var onSuccess = function (user) {
        var profile = user.getBasicProfile()
        let data = {
          client_id : '308959858897-deq7102qpgo6ku4763p75rl734skf0mf.apps.googleusercontent.com',
          user_id : profile.getId(),
          email : profile.getEmail(),
          id_token : user.getAuthResponse().id_token
        }
        _this.$api.loginGoogle(data).then(res => {
          _this.loginCallback(res)
        }).catch(err => {
          console.log(err)
        })  
      }
      /**
     * Handle sign-in failures.
     */
      var onFailure = function (error) {
        console.log(error)
      }
      startApp()
    },


    //facebook 登录初始化
    initFacebook () {
      // Load the SDK asynchronously
      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) return
        js = d.createElement(s); js.id = id
        js.src = 'https://connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
      }(document, 'script', 'facebook-jssdk'))
      window.fbAsyncInit = function () {
        FB.init({
          appId      : '908467375968806',
          cookie     : true,  // enable cookies to allow the server to access
          xfbml      : true,  // parse social plugins on this page
          version    : 'v2.11' // use graph api version 2.8
        })
      }
    },

    //facebook 登录回调函数
    statusChangeCallback (response) {
      if (response.status === 'connected') {
        // Logged into your app and Facebook.
        var user_id = response.authResponse.userID
        var accessToken = response.authResponse.accessToken

        // /me为API指定的调用方法，用于获取登陆用户相关信息
        FB.api('/me?fields=name,first_name,last_name,email', response => {
          if(response.email!=null){ 
            var data = {
              app_id: '908467375968806',
              user_id: user_id,
              email: response.email,
              accessToken: accessToken
            }
            this.$api.loginFacebook(data).then(res => {
              this.loginCallback(res)
            }).catch(err => {
              console.log(err)
            })
          }else{
            console.log('获取登陆用户相关信息失败！')
          }
        })
      }
    },

    //登录facebook 按钮
    loginFacebook () {
      FB.login((response) => { 
        this.statusChangeCallback(response)  //登录回调函数
      },{scope: 'email'})  //需要获取的信息scope
    },

    //第三方登录回调
    loginCallback (res) {
      if(res.code == 200){
        let api_token = res.data.api_token
        let user_id = res.data.user_id
        setToken(api_token)
        setUserId(user_id )
        this.$api.updateLogin({'api_token': api_token, 'user_id': user_id})
        this.$store.dispatch('GetInfo').then(res => {
          this.hideAllDialog()
          const roles =[ res.data.type ]
          this.$store.dispatch('GenerateRoutes', { roles }).then(() => {
            this.$router.addRoutes(this.$store.getters.addRouters)
            this.isLogin = getToken()
          })
        }) 
        if (res.data.email) {
          this.resetform.email = res.data.email
          this.resetform.url = location.protocol + '//' + location.host + '/resetpass/' + base64Encode(res.data.email) + '/'
          this.$api.retrievePassword(this.resetform).then(() => {
          })      
        }
      }
    },

    //语言翻译
    initLanguage () {
      // Load the SDK asynchronously
      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) return
        js = d.createElement(s) 
        js.id = id
        js.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
        fjs.parentNode.insertBefore(js, fjs)
      }(document, 'script', 'google-translate'))

      window.googleTranslateElementInit =  () => {
        this.initLanguageSuccess = true
        setTimeout(() => {
          new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, multilanguagePage: true}, 'google_translate_element', function (){console.log(123)})
          var obj = document.getElementsByClassName('goog-te-gadget-icon')[0]
          obj.style.width= '10px'
          obj.style.height = '10px'
          obj.style.background = 'url(http://i02.i.aliimg.com/wimg/buyer/single/google-translate-logo.png) 0px 0px no-repeat'
          let iDiv = document.createElement('i')
          iDiv.className = 'iconfont icon-xiangxia icongoogle'
          document.getElementsByClassName('goog-te-menu-value')[0].appendChild(iDiv)
        }, 300)
      }
    },

    //在线聊天
    initChat () {
      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) return
        js = d.createElement(s); js.id = id
        js.src = '//code.tidio.co/wwxicxxl9u01djk3x47kgpadzqfohwie.js'
        fjs.parentNode.insertBefore(js, fjs)
      }(document, 'script', 'tidioChat'))
    },

    gotoPrivacy () {
      window.open('/about/center/privacy')
    },
    gotoTerm () {
      window.open('/about/center/term')
    },

    reSendEmail () {
      this.isSendEmail = true
      let sendEmailData = {
        activate_url: '',
        email: ''
      }
      sendEmailData.activate_url = location.protocol + '//' + location.host + '/activate/' +  base64Encode(this.sendEmailnum)  + '/'
      sendEmailData.email = this.sendEmailnum
      this.$api.getActivateEmail(sendEmailData).then(() => {
      })
      let timer = setInterval(() => {
        this.seconds = 60
        this.seconds--
        if (this.seconds === 0) {
          this.isSendEmail = false
          clearInterval(timer)
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../../styles/mixin.less");

.header-all {
  height: 95px;
}
.header {
  .p(f);
  display: block;
  z-index: 999;
  width: 100%;
  color: white;
  height: 65px;
  .header-top {
    background: #31393f;
    width: 100%;
    min-width: @Width_content;
    height: 65px;
    vertical-align: middle;
    .header-top-content {
      height: 65px;
      .pct(@Width_content);
      border: 1px solid #31393f;
      vertical-align: middle;
      .content {
        .p(r);
        height: 65px;
        line-height: 65px;
        // margin-top: 1rem;
        padding-left: 12rem;
        // border: 1px solid yellow;
        .logo {
          .p(a);
          left: 4px;
          top: 50%;
          margin-top: -1.4rem;
          width: 10.83rem;
          height: 2.78rem;
          height: inherit;
        }
        .inline-b {
          float: left;
          margin-right: 1rem;
        }
        .login-y {
          position: relative;
          margin-right: 1px;
          top: -1px;
          width: 15%;
          text-align: center;
          cursor: pointer;
          min-width: 10px;
          width: 10rem;
          height: 100%;
          background: #31393f;
          .dropdown {
              position: absolute;
              text-align: left;
              top: 65px;
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
                  overflow: hidden;
                  img {
                      float: left;
                      margin-top: 8.5px;
                      margin-right: 5px;
                  }
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
              .iconfont {
                right: 6px;
              }
              .absolute {
                position: absolute;
                top: 0;
                left: 0;
                &.img {
                  top: 0.8rem;
                  left: .8rem;
                  img {
                    width: 2rem;
                    height: 2rem;
                    border-radius: 100%;
                  }
                }
                &.username {
                  width: 5.4rem;
                  text-align: center;
                  top: -6px;
                  left: 2.8rem;
                  font-size: 0.833rem;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  &.member {
                    top: 0;
                  }
                }
                &.tag {
                  height: 1rem;
                  top: 12px;
                  width: 5.4rem;
                  text-align: center;
                  left: 2.8rem;
                  span {
                    font-size: 11px;
                    overflow: hidden;
                    padding:0px 5px;
                    border-radius: 4px;
                  }
                }
              }
            }
          }
          &.country {
            width: 12%;
            font-size: 0.833rem;
            .country-span {
              width: 100%;
              overflow: hidden;
              img {
                position: relative;
                top: 2px;
              }
              .iconfont {
                top: -1px;
              }
            }
            .dropdown {
              width: 130%;
              left: -30%;
            }
          }
          &.language {
            width: 12%;
            font-size:  0.833rem;
            .language-span {
              width: 100%;
              overflow: hidden;
            }
            .dropdown {
              width: 130%;
              left: -30%;
               .items {
            
              }
            }
          }
          .top {
            position: absolute;
            bottom: -10px;
          }
          .iconfont {
            position: relative;
            font-size: 10px;
            top: 1px;
            right: 1px;
          }
          
        }
        .coupons {
          font-weight: 600;
          color: #d0d6da;
          text-decoration: none;
          position: relative;
          line-height: 64px;
          display: block;
          text-align: center;
          overflow: hidden;
          font-size: 13px;
          width: 8%;
          height: 65px;
          &:hover {
            color: white;
          }
          &.active {
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
          width: 38%;
          height: 36px;
          top: 15px;
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
            top: -15px;
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
          &.isnotLanguage {
            width: 48%;
          }
        }
        .btn-h {
          text-align: center;
          position: relative;
          top: 15px;
        }
        .login {
          .btn-h(4.5rem, 36px, #ffffff, #ffffff, #000000);
          font-size: 13px;
          margin-left: 0;
          margin-right: 1rem;
              background-color: #f1f1f1;

          
        }
        .sign {
          .btn-h(4.5rem, 36px, #0077c5, #0077c5, #fff );
          font-size: 13px;
          margin-right: 1rem;
        }
      }
    }
  }
  .header-bottom {
    .classify-items {
      .pct(@Width_content);
      line-height: 30px;
      height: 30px;
      overflow: hidden;
      padding-left: 5px;
      li {
        font-size: 10px;
        display: inline-block;
        color: rgb(34, 24, 21);
        cursor: pointer;
        text-align: center;
        margin: 0 1.5rem 0 0;
        font-weight: 700;
        &.active {
          color: #D62828;
          &:hover {
            color: #D62828;
          }
        }
        &:hover {
          color: #0072bc;
        }
      }
    }
    height: 35px;
    background: white;
    box-shadow: 0px 2px 10px rgba(100, 100, 100, .15);
  }
}

.login-dialog,
.sign-dialog {
  .sign-dialog-head {
    div.center {
      color: #333;
      font-size: 30px;
      // font-family: "Open Sans Bold", "Open Sans", Arial, sans-serif;
      font-style: normal;
      font-weight: 1000;
      margin-top: -15px;
      margin-bottom: 15px;
    }
    p.center {
      color: #4A4A4A;
      margin-bottom: 30px;
      font-size: 15px;
    }
  }
  .title {
    width: 17rem;
    text-align: center;
    margin-left: 150px;
    font-weight: bold;
    font-size: 26px;
    &.resetpass {
      margin-left: 100px;
    }
  }
  .dialog-body {
    text-align: center;
  }
  .or {
    position: relative;
    height: 1rem;
    margin-bottom: 1rem;
    font-size: 11px;
    color: #666;
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
    }
    .facebook {
      button {
         .btn-h(80%, 42px, #3b5998, #3b5998, #ffffff);
      }
    }
    .google {
      button {
         .btn-h(80%, 42px, #dd4b39, #dd4b39, #ffffff);
      }
    }
  }
  .sign-up-btn {
    margin-bottom: 10px;
    .btn-h(100%, 42px, #7fbadf, #7fbadf, #fff);
    &.login {
    .btn-h(100%, 42px, #0075C1, #0075C1, #fff);
    }
  }
  .footer {
    width: 80%;
    &.bottom {
      margin: 30px auto 0;
      font-size: 14px;
    }
    &.top {
      margin: -10px auto 0;
      font-size: 10px;
      line-height: 1.42;
    }
  }
  .remember {
    .el-checkbox {
      font-size: 12px;
    }
    
    font-size: 12px;
    .box {
      width: 80%;
      margin: 0 auto;
      text-align: left;
      .forget {
        float: right;
      }
    }
  }
  .el-checkbox__label {
    font-size: 10px;
  }
}
.send-email {
  p {
      height: 30px;
      color: #808080;
      font-size: 13px;
      &.sorry-text {
        font-weight: 700;
        font-size: 18px;
        color: #333;
        margin-top: 40px;
      }
      .link {
        font-size: 15px;
        font-weight: 700;
      }
    }
    p, div {
      text-align: left;
      padding-left: 65px;
      &.footer-p {
        margin-top: -20px;
      }
    }
    .send-button {
      .btn-h(300px, 36px, #7fbadf, #7fbadf, #fff);
    }
    .send-button-succ {
      background-color: #7fbadf;
      border-color: #7fbadf;
        &:hover {
        background: darken(#7fbadf, 5%);
        border-color: darken(#7fbadf, 5%);
        }
        &:active {
          background: lighten(#7fbadf, 5%);
          border-color: lighten(#7fbadf, 5%);
        }
    }
    .btn-disabled {
      width: 300px;
      margin-left: 0;
    }
}
</style>
