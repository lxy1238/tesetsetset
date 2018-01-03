<template>
   <div class="coupons-add">
    <div class="title">
       Add Coupons
    </div>
    <div class="title-s">
      Product Information
    </div>
    <el-form :model="couponsForm" :rules="rules" ref="couponsForm" label-width="140px" class="coupons-form" >
      <template v-if="isEditorData">
        <el-form-item label="Product URL: " prop="product_url" class="item-url" >
          <el-input class="url-input" v-model="couponsForm.product_url"  @blur="getPlatformCateInfo" ></el-input>
          <el-button class="get-pro-info"  type="button" @click="getProInfo(couponsForm.product_url)" :loading="getinfoBtn">get</el-button>
        </el-form-item>
        <el-form-item label="Wedsite: " prop="website" class="item-inline" >
          <el-select v-model="couponsForm.website"  @change="websiteChange">
            <el-option
              v-for="item in optionsWebsite"
              :key="item.label"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Category: " prop="menu_id" class="item-inline" >
          <el-select v-model="couponsForm.menu_id"   >
            <el-option
              v-for="item in optionsCategory"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <!-- <select-self  :list="options"  @child="getSelectValue" v-model="couponsForm.menu_name"></select-self>    -->
        </el-form-item>
        <el-form-item label="List price: " prop="product_price" class="item-inline" >
          <el-input class="input-price-fee input-money " v-model="couponsForm.product_price" >
            <template slot="prepend">{{currency}}</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Shipping fee: "  class="item-inline" prop="shipping_fee">
          <el-input class="input-price-fee input-money " @blur="filterMoney('shipping_fee')" v-model="couponsForm.shipping_fee" >
            <template slot="prepend">{{currency}}</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Image"  prop="product_img_s">
          <el-upload 
                class="upload-demo-img" 
                action="upload"
                :on-remove="handleRemoveP" 
                :before-upload="beforeAvatarUploadP" 
                :file-list="couponsForm.product_img_s"
                ref="upload"
                list-type="picture">
              <el-button size="small" type="primary">Upload</el-button>
              <div slot="tip" class="el-upload__tip">jpg, .gif, or .png accepted,500 KB max,6 photos at most.</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="Title: " prop="product_title" class="item-large" >
          <el-input v-model="couponsForm.product_title">
          </el-input>
        </el-form-item>
        <el-form-item label="Reason: " prop="product_reason"  class="item-large">
          <el-input v-model="couponsForm.product_reason" type="textarea" :rows="8" class="textarea"></el-input>
        </el-form-item>
      </template> 
      <template v-if="couponsForm.menu">
         <el-form-item label="Product URL: "  class="item-url">
          <el-input class="url-input" v-model="couponsForm.product_url" disabled></el-input>
        </el-form-item>
        <el-form-item label="Wedsite: " class="item-inline" >
          <el-input class="input-price-fee"  v-model="couponsForm.website" disabled >
          </el-input>
        </el-form-item>
        <el-form-item label="Category: " class="item-inline" >
          <el-input class="input-price-fee"  v-model="couponsForm.menu.name" disabled >
          </el-input>
        </el-form-item>
        <el-form-item label="List price: " class="item-inline"  prop="product_price"  >
          <el-input class="input-price-fee input-money "  v-model="couponsForm.product_price"  >
            <template slot="prepend">{{currency}}</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Shipping fee: "  class="item-inline" >
          <el-input class="input-price-fee"  v-model="couponsForm.shipping_fee"  disabled>
            <template slot="prepend">{{currency}}</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Image: "  >
          <ul class="is-editor-img">
            <li v-for="item in couponsForm.product_img_s"><img :src="item.url" alt="" ></li>
          </ul>
        </el-form-item>
        <el-form-item label="Title: "  class="item-large" >
          <el-input v-model="couponsForm.product_title" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="Reason: " class="item-large" >
          <el-input v-model="couponsForm.product_reason" type="textarea" :rows="8" class="textarea" disabled></el-input>
        </el-form-item>
      </template>
    <div class="title-s">
       Coupon Information
    </div>
    <el-form-item label="Valid date: " class="item-inline"  prop="valid_date" >
      <el-date-picker size="large" placeholder="Please select the date" v-model="couponsForm.valid_date" :picker-options="pickerOptions1"></el-date-picker>
    </el-form-item>
     <el-form-item label="Discount rate(%): " class="item-inline" prop="discount_rate" >
      <el-input class="input-price-fee" @blur="filterDiscount('discount_rate')" v-model="couponsForm.discount_rate" >
        <!-- <template slot="prepend">%</template> -->
      </el-input>
    </el-form-item>
    <el-form-item label="Quantity per day: " class="item-inline1" prop="quantity_per_day" >
      <el-input class="input-price-fee" @blur="filterMoney('quantity_per_day')" v-model.number="couponsForm.quantity_per_day" >
      </el-input>
    </el-form-item>
    <el-form-item label="Type: " class="item-inline1" >
      <el-radio class="radio" v-model="couponsForm.use_type" label="Unlimited">Unlimited</el-radio>
      <!-- <el-radio class="radio" v-model="couponsForm.use_type" label="Alone">Alone</el-radio> -->
    </el-form-item>
    <el-form-item label="Coupon code: " class="item-inline" prop="coupon_code">
      <el-input v-model="couponsForm.coupon_code" v-if="couponsForm.use_type === 'Unlimited'"></el-input>
      <el-input type="textarea" v-model="couponsForm.coupon_code" v-else ></el-input> 
    </el-form-item>
    <el-form-item class="footer-btn" >
      <el-button type="button" class="save" @click="Submit($event)" :loading="saveLoading">Save</el-button>
      <button type="button" class="cancel" @click="Cancel">Cancel</button>
    </el-form-item>
    </el-form>
   
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken, getUserId } from '@/utils/auth'
import { getStore } from '@/utils/utils'
import { toTimestamp } from '@/utils/date'
import selectSelf from '@/components/sectionVue/el-select-s.vue'
import axios from 'axios'
// import qs from 'qs'
export default {
  name: 'coupoons-add',
  data () {
    let reg =  /^\d+(\.\d{1,2})?$/
    const validateMoney =  (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please enter the product price'))
      } else if(!reg.test(value)){
        callback(new Error ('Please enter the correct format amount'))
      } else {
        callback()
      }
    }
    return {
      country_id: parseInt(getStore('country_id')) || 1,
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 86400000
        },
      },
      rules: {
        product_url: [{ required: true, trigger: 'blur' }],
        product_price: [{ validator: validateMoney, trigger: 'blur' }],
        website: [{ required: true, message: 'website is required', trigger: 'blur' }],
        menu_id: [{type:'number', required: true, message: 'category is required' ,trigger: 'blur' }],
        menu_name: [{required: true, message: 'category is required' ,trigger: 'blur' }],
        product_img_s: [
          {
            type: 'array',
            required: true,
            message: 'Please Upload image',
            trigger: 'change'
          }
        ],
        product_title: [
          { required: true, message: 'title is required', trigger: 'blur' }
        ],
        product_reason: [{ required: true, trigger: 'blur' }],
        valid_date: [{ type: 'date', required: true, trigger: 'blur' }],
        discount_rate: [{ required: true,message: 'discount rate is required', trigger: 'blur' }],
        quantity_per_day: [{type: 'number' ,message: 'quantity per day is required', required: true, trigger: 'blur' }],
        coupon_code: [{ required: true, trigger: 'blur' }]
      },
      optionsWebsite: [],
      optionsCategory: [],
      couponsForm: {
        product_url: '', //产品链接， 是
        user_name: '', // 发布用户名称， 是
        menu_name: '', // 所属分类 , 是   int
        country_id: parseInt(getStore('country_id')) || 1, // 国家  是
        website: '', // 平台   是
        product_title:'', // 商品标题   是 ，
        product_img_s: [
          
        ],
        product_reason: '', //产品描述  是
        use_type: 'Unlimited',
        coupon_code: '', //优惠券
        // reward_type: '1.5', //PerOrder: 按每订单奖励,
        product_price: '', //商品价格
        shipping_fee: '', //运费   否
        discount_rate: '', //折扣率    否
        valid_date:  '', //到期时间  int
        quantity_per_day: '', // 每天上限数量 int
        menu_id: '',
        websiteData: '',
        api_token: getToken(),
        user_id: getUserId(), // 用户ID ， 是，
      },
      couponsFormSubmit: {

      },
      uploadData: {
        api_token: '',
        file: ''
      },
      requestData: {
        api_token: getToken(),
        user_id: getUserId(),
        country_id: parseInt(getStore('country_id')) || 1
      },
      couponDetailsrequestData: {
        api_token: getToken(),
        user_id: getUserId(),
        id: '',
      },
      options: [],
      select: '',
      isEditorData: true,
      //国家与要发布的产品链接是否一直
      countryUrlIsRight: false,
      getinfoBtn: false,
      saveLoading: false,
    }
  },
  components: {
    selectSelf
  },
  mounted () {
    this.init()

  },
  computed: {
    ...mapGetters(['user_id', 'username', 'token']),
    currency () {
      return getStore('currency') || '$'
    }
  },
  methods: {

    //页面初始化
    init () {
      this.initData()
      this.isEditor()
      this.getHeadCateListInfo()
      this.filterInput()
    },

    //数据初始化
    initData () {
      this.couponsForm.user_name = this.username
    },
    //限制只能输入数字和.
    filterInput () {
      if (this.country_id === 4) {
        $('.input-money .el-input__inner').keypress((e) => {
          let code = e.keyCode || e.which || e.charCode
          if (!((code <= 57 && code >= 48) || code === 8)) {
            return false
          }
        })
      } else {
        $('.input-money .el-input__inner').keypress((e) => {
          let code = e.keyCode || e.which || e.charCode
          if (!(code === 46  || (code <= 57 && code >= 48) || code === 8)) {
            return false
          }
        })
      }
    },
    //获取头部品类列表
    getHeadCateListInfo () {
      this.$api.getHeadCateList().then(res => {
        this.optionsCategory = res.data
      }).catch(error => {
        console.log(error)
      })
    },


    //图片拖动位置实现 

    change (x, y) {
      let arr = this.couponsForm.product_img_s
      arr.splice(x - 1, 1, ...arr.splice(y - 1, 1, arr[x - 1]))
      this.couponsForm.product_img_s = arr 
    },

    imgChange () {
      $('.el-upload-list__item').unbind()
      setTimeout(() => {
        $('.el-upload-list__item').unbind()
        $('.el-upload-list__item').mousedown((e) => {
          e.stopPropagation()
          let width = $(e.currentTarget).outerWidth()
          let height = $(e.currentTarget).outerHeight()
          let newArr = []
          let x, y
          $('.el-upload-list__item').each(function (){
            this.ondragstart = function (event) {
              event.preventDefault()
            }
            newArr.push($(this).offset())
          })
          let left = $(e.currentTarget).offset().left
          let top = $(e.currentTarget).offset().top
          
          newArr.forEach((e, i) => {
            if (parseInt(left) == parseInt(e.left) && parseInt(top) == parseInt(e.top)) {
              x = i + 1
              y = i + 1
            }
          })  
          let clientX = e.clientX
          let clientY = e.clientY
          $('#app').append($('<div id="boxOfMove"></div>').css({
            position: 'absolute',
            zIndex: '1',
            width: width,
            height: height,
            left: left,
            top: top,
            border: '1px solid #00ff00',
            borderRadius: '5px',
            color: 'transparent'
          }))
         
          document.onmousemove = function (event) {
            let clientNowX = event.clientX
            let clientNowY = event.clientY
            let disX = clientNowX - clientX
            let disY = clientNowY - clientY
            let boxLeft = left + disX
            let boxTop = top + disY
            $('#boxOfMove').css({
              left: boxLeft,
              top: boxTop
            })
            newArr.forEach((e) => {
              if ( 
                ( parseInt(e.left) <= (boxLeft + width) && (boxLeft + width) <= (parseInt(e.left) + width) ) && 
                ( parseInt(e.top) <= (boxTop + height) && (boxTop + height) <= (parseInt(e.top) + height) ) 
              ) {
                e.area = ((boxLeft + width) - e.left) * ((boxTop + height) - e.top)
                e.isChange = true
              } else if (
                (parseInt(e.left) <= (boxLeft) && (boxLeft) <= (parseInt(e.left) + width)) && 
                (parseInt(e.top) <= (boxTop + height) && (boxTop + height) <= (parseInt(e.top) + height))
              ) {
                e.area = ((e.left + width) - boxLeft) * ((boxTop + height) - e.top)
                e.isChange = true
              } else if (
                (parseInt(e.left) <= (boxLeft + width) && (boxLeft + width) <= (parseInt(e.left) + width)) && 
                (parseInt(e.top) <= (boxTop) && (boxTop) <= (parseInt(e.top) + height))
              ) {
                e.area = ((boxLeft + width) - e.left) * ((e.top + height) - boxTop)
                e.isChange = true
              } else if (
                (parseInt(e.left) <= (boxLeft) && (boxLeft) <= (parseInt(e.left) + width)) && 
                (parseInt(e.top) <= (boxTop) && (boxTop) <= (parseInt(e.top) + height))
              ) {
                e.area = ((e.left + width) - boxLeft) * ((e.top + height) - boxTop)
                e.isChange = true
              } else {
                e.isChange = false
              }
            })
          } 
          document.onmouseup =  () => {
            let maxArea = 0
            let result = newArr.some((e) => {
              return e.isChange
            })
            if (result) {
              newArr.forEach((e, i) => {
                if (i === x - 1) {
                  return
                }
                if (e.area > maxArea) {
                  maxArea = e.area
                  y = i + 1
                }
              })
              this.change(x, y)
            }
            document.onmousemove = null
            document.onmouseup = null
            $('#boxOfMove').remove()
          }
        })
      }, 500)
    },


    //通过输入链接获取所有产品信息
    getProInfo (url) {
      this.getinfoBtn = true
      // this.$message.info('For information on goods, please wait a moment')
      axios.get('http://192.168.1.199:8008/index.php/api/asin', {
        params: {
          url: url,
        }
      })
        .then( (res) =>{
          this.getinfoBtn = false
          if (!res.data.data) {
            this.$message.info('Failed to obtain commodity information!!!')
          }
          
          setTimeout(() => {
            let data = res.data.data
            let newArr = []
            data.product_img.forEach((e) => {
              if (e) {
                newArr.push({url: e})
              }
            })
            this.couponsForm.product_img_s = newArr
            this.imgChange()
            this.couponsForm.product_price = data.product_price ? data.product_price : '',
            this.couponsForm.product_title = data.product_title
            if (res.data.data.Error) {
              this.$message.error('please enter a right url')
            }
          }, 500)
        })
        .catch((err) => {
          console.log(err)
          this.getinfoBtn = false
        })
     
    },


    //获取平台品类信息
    getPlatformCateInfo () {
      if (!this.couponsForm.product_url) {
        return
      }
      this.optionsWebsite = []
      this.$api.getPlatformCate(this.requestData)
        .then(res => {
          if(res.data.length <= 0) {return}
          for (let i of res.data) {
            let ObjWebsite = {
              label: '',
              id: ''
            }
            ObjWebsite.label = i.provider
            ObjWebsite.id = i.id
            if (this.couponsForm.product_url.search(i.url) >= 0) {
              this.couponsForm.website = i.provider
              this.optionsWebsite.push(ObjWebsite)
            } else {
              this.$message.error('The country can only issue products under the platform')
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    //平台发生改变
    websiteChange (label) {
      for (let i of this.optionsWebsite) {
        if (i.label == label) {
          this.couponsForm.platform_id = i.id
        }
      }  
    },

    //上传图片
    beforeAvatarUploadP (file) {
      const isJPG = file.type === 'image/jpeg'
      const isGIF = file.type === 'image/gif'
      const isPNG = file.type === 'image/png'

      const isLt500K = file.size / 1024 / 500 < 1

      let limitF = true
      if (!(isJPG || isGIF || isPNG)) {
        this.$message.error('上传图片只能是 JPG/GIF/PNG格式!')
      }
      if (!isLt500K) {
        this.$message.error('上传图片文件大小 不能超过 500kb!')
      }
      if (this.couponsForm.product_img_s.length >= 6) {
        this.$message.error('最多只能上传6张图片！')
        limitF = false
      }
      if ((isJPG || isGIF || isPNG) && isLt500K && limitF) {
        var formData = new FormData()
        formData.append('api_token', getToken())
        formData.append('user_id', getUserId())
        formData.append('file', file)
        this.$api.uploadImg(formData)
          .then(res => {
            this.couponsForm.product_img_s.push({ url: res.data })
            this.imgChange()
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        return false
      }
    },
    handleRemoveP (file, fileList) {
      this.couponsForm.product_img_s = fileList
    },
    issueCoupon (data) {
      this.saveLoading = true
      if (this.$route.query.editor) {
        data.id = this.$route.query.editor
        this.$api.editorCoupon(data).then(res => {
          this.saveLoading = false
          if (res.code === 200) {
            this.$message.success('issue coupon success')
            this.$router.push({ path: '/posted/coupons' })
          }
        }).catch(error => {
          this.saveLoading  = false
          console.log(error)
        })
      } else {
        this.$api.addCoupon(data)
          .then(res => {
            this.saveLoading = false
            if (res.code === 200) {
              // this.$notify.success('issue coupon success')
              this.$router.push({ path: '/posted/coupons' })
            }
          })
          .catch(error => {
            this.saveLoading = false
            console.log(error)
          })
      }
    },
    Submit (e) {
      //element-ui 的表单验证
      // this.$refs.upload.submit();
      this.$refs['couponsForm'].validate(valid => {
        if (valid) {
          for (var i in this.couponsForm) {
            this.couponsFormSubmit[i] = this.couponsForm[i]
          }
          this.couponsFormSubmit.valid_date = toTimestamp(this.couponsForm.valid_date) + 86400 - 1
          this.couponsFormSubmit.product_img = this.couponsForm.product_img_s.map((e) => e.url)
          if (this.$route.query.editor) {
            this.couponsFormSubmit.website = this.couponsForm.website
          }
          this.issueCoupon(this.couponsFormSubmi)
        } else {
          document.body.scrollTop = document.documentElement.scrollTop = 0
          console.log('error submit!!')
          return false
        }
      })
    },
    //退出
    Cancel () {
      this.$router.go(-1)
    },

    //过滤输入金钱
    filterMoney (value) {
      if (isNaN(Number(this.couponsForm[value]))) {
        this.couponsForm[value] = ''
      }
    },

    //过滤只能输入0-99的数字
    filterDiscount (value) {
      let reg = /^\d{1,2}$/
      if (!reg.test(this.couponsForm[value])) {
        this.couponsForm[value] = ''
      }
    },

    //编辑，判断是否有editor
    isEditor () {
      if (!this.$route.query.editor) {
        return
      }
      this.isEditorData = false
      this.couponDetailsrequestData.id = this.$route.query.editor
      this.$api.editDetail(this.couponDetailsrequestData).then(res => {
        res.data.valid_date = new Date(res.data.valid_date * 1000)
        res.data.product_img_s = res.data.product_img.split(',').map((e)=>{return {url: e}})
        this.couponsForm = res.data
        this.couponsForm.api_token = getToken()
        this.couponsForm.user_id = getUserId()
        this.couponsForm.user_name = this.username
        this.couponsForm.country_id = parseInt(getStore('country_id')) || 1
        setTimeout(() => {
          this.filterInput()
        }, 10)
      })
    }
  }
}
</script>

<style lang="less"  >
@import url("../../../styles/mixin.less");
.coupons-form {
  .input-price-fee,.el-select,.el-date-editor.el-input {
    width: 198px;
  }
  .item-inline {
    width: 44%;
    display: inline-block;
  }
  .item-inline1 {
    width: 43%;
    display: inline-block;
  }
  .item-url {
    .el-input {
      width: 88%;
    }
  }
  .item-large {
    .el-input,.el-textarea {
      width: 88%;
    }
  }
  .textarea {
    textarea {
      height: 108px;
      resize: none;
    }
  }
  .get-pro-info {
    .btn-h(60px, 36px, #3399ff, #3399ff, #fff);
    &:active {
      background: darken(#3399ff, 10%);
      border-color: darken(#3399ff, 10%);
    }
  }
 
  .el-upload-list__item {
    width: 100px;
    float: left;
    margin-right: 1%;
  }
  .footer-btn {
    text-align: center;
    margin-top: 2rem;
    .save {
      .btn-h(120px, 45px, #85bb3b, #85bb3b, #fff);
      margin-right: 3rem;
      &:active {
        background: darken(#85bb3b, 10%);
        border-color: darken(#85bb3b, 10%);
      }
    }
    .cancel {
      .btn-h(120px, 45px, #79b6e0, #79b6e0, #fff);
      &:active {
        background: darken(#79b6e0, 10%);
        border-color: darken(#79b6e0, 10%);
      }
    }
  }
}
.is-editor-img {
  li {
    width: 100px;
    height: 100px;
    padding: 10px;
    border: 1px solid #e1e1e1;
    float: left;
    margin-right: 5px;
    img {
      width: 80px;
      height: 80px;
    }
  }
}
.coupons-form .el-upload-list__item {
  cursor: move;
  img {
    cursor: move;
  }
}
.el-icon-close {
  z-index: 2;
}
</style>
