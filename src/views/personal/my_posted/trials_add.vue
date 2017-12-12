<template>
  <div class="trials-add">
     <div class="title">
       Add Coupons
    </div>
    <div class="title-s">
      Product Information
    </div>
    <el-form :model="trialsForm" :rules="rules" ref="trialsForm" label-width="130px" class="coupons-form" >
      <template v-if="isEditorData">
        <el-form-item label="Product URL: " prop="product_url" >
          <el-input class="url-input" v-model="trialsForm.product_url" @blur="urlBlur"></el-input>
          <button class="get-pro-info"  type="button" @click="getProInfo(trialsForm.product_url)">get</button>
        </el-form-item>
        <el-form-item label="Wedsite: " prop="website" class="item-inline"  >
          <el-select v-model="trialsForm.website"  @change="websiteChange">
            <el-option 
              v-for="item in optionsWebsite"
              :key="item.label"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Store: " prop="user_store_id" class="item-inline"  >
          <el-select v-model="trialsForm.user_store_id">
            <el-option 
              v-for="item in optionsStore"
              :key="item.id"
              :label="item.store_name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Category: " prop="menu_id" class="item-inline"   >
          <el-select v-model="trialsForm.menu_id">
            <el-option 
              v-for="(item, index) in optionsCategory"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="List price: "  prop="product_price"  class="item-inline"  >
          <el-input class="url-input input-price-fee" v-model="trialsForm.product_price" @blur="filterMoney('product_price')">
            <template slot="prepend">{{currency}}</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Shipping fee: " prop="shipping_fee" class="item-inline"  >
          <el-input class="url-input input-price-fee" v-model="trialsForm.shipping_fee"  @blur="filterMoney('shipping_fee')" placeholder="Default free freight">
            <template slot="prepend">{{currency}}</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Image" prop="product_img_s" >
          <el-upload 
                class="upload-demo-img" 
                action="upload" 
                :on-remove="handleRemoveP" 
                :before-upload="beforeAvatarUploadP" 
                  :file-list="trialsForm.product_img_s"
                list-type="picture">
              <el-button size="small" type="primary">Upload</el-button>
              <div slot="tip" class="el-upload__tip">jpg, .gif, or .png accepted,500 KB max,6 photos at most.
              </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="Title: " prop="product_title"  >
          <el-input v-model="trialsForm.product_title"></el-input>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="Product URL: " prop="product_url" >
          <el-input class="url-input" v-model="trialsForm.product_url" @blur="urlBlur" disabled></el-input>
        </el-form-item>
        <el-form-item label="Wedsite: " prop="website" class="item-inline"  >
          <el-input class="url-input" v-model="trialsForm.website" disabled></el-input>
        </el-form-item>
        <el-form-item label="Store: " prop="user_store_id" class="item-inline"  >
          <el-input class="url-input" v-model="trialsForm.website" disabled></el-input>
        </el-form-item>
        <el-form-item label="Category: " prop="menu_id" class="item-inline"   >
         <el-input class="url-input" v-model="trialsForm.website" disabled></el-input>
        </el-form-item>
        <el-form-item label="List price: "  prop="product_price"  class="item-inline"  >
          <el-input class="url-input" v-model="trialsForm.product_price"  disabled></el-input>
        </el-form-item>
        <el-form-item label="Shipping fee: " prop="shipping_fee" class="item-inline"  >
          <el-input class="url-input" v-model="trialsForm.shipping_fee"  disabled></el-input>
        </el-form-item>
        <el-form-item label="Image: " prop="product_img_s" >
          <ul class="is-editor-img" v-if="trialsForm.product_img_s">
            <li v-for="item in trialsForm.product_img_s"><img :src="item.url" alt="" ></li>
          </ul>
        </el-form-item>
        <el-form-item label="Title: " prop="product_title"  >
          <el-input v-model="trialsForm.product_title" disabled></el-input>
        </el-form-item>
      </template>
      <el-form-item label="Reason: "  prop="product_reason" >
        <el-input v-model="trialsForm.product_reason" type="textarea" class="textarea"></el-input>
      </el-form-item>
       <el-form-item label="Specifications: " prop="specifications" >
        <el-input v-model="trialsForm.specifications" type="textarea" class="textarea"></el-input>
      </el-form-item>
      <el-form-item label="Product details: " required>
        <div id="summernote"></div>
        <div class="red" v-if="!trialsForm.product_details">product details is required</div>
      </el-form-item>
      <div class="title-s">
        Coupon Information
      </div>
      <el-form-item label="Active date: " class="" prop="active_date"  >
          <el-date-picker
            v-model="trialsForm.active_date"
            type="daterange"
            placeholder="选择日期范围">
          </el-date-picker>
      </el-form-item>
      <el-form-item label="Quantity per day: " class="item-inline1" prop="quantity_per_day" >
        <el-input v-model="trialsForm.quantity_per_day" @blur="filterMoney('quantity_per_day')"></el-input>
      </el-form-item>
    
      <el-form-item label="Total quantity: " class="item-inline" prop="total_quantity">
        <el-input v-model="trialsForm.total_quantity" @blur="filterMoney('total_quantity')"></el-input>
      </el-form-item>
      <el-form-item label="Is Full Return: " class="item-inline1" >
        <el-radio class="radio" v-model="trialsForm.full_refund" label="1" >yes</el-radio>
        <el-radio class="radio" v-model="trialsForm.full_refund" label="0" >no</el-radio>
      </el-form-item>
      <el-form-item label=" Each trial returns: " v-if="trialsForm.full_refund === '0'"  class="item-inline1" >
        <el-input type="text" v-model="trialsForm.refund_price" @blur="filterMoney('refund_price')"></el-input>
      </el-form-item>
    <div class="title-s">
        Security Deposit
      </div>
    <div class="trials-money">
      <p class="money"><label>Refund:</label> {{currency}}{{refund}}</p>
      <p class="money"><label>Platform fee:</label>  {{currency}}{{platform_fee}}</p>
      <p class="money"><label>Total fee:</label>  <span class="red">{{currency}}{{total_fee}}</span></p>
    </div>
    
    <el-form-item class="footer-btn" >
      <button type="button" class="save" @click="Submit($event)">Save</button>
      <button type="button" class="cancel" @click="Cancel">Cancel</button>
    </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
// import qs from 'qs'
import { getStore } from '@/utils/utils'
import { getToken, getUserId } from '@/utils/auth'
import { NumAdd } from '@/utils/calculate'

export default {
  name: 'trials_add',
  data () {
    return {
      country_id: parseInt(getStore('country_id')) || 1,
      optionsWebsite: [
      ],
      optionsStore: [
        {
          'value': '1',
          'label': 'amazon'
        }
      ],
      optionsCategory: [
      ],
      isEditorData: true,
      trialsForm: {
        country_id: parseInt(getStore('country_id')) || 1,
        product_url: '',
        product_title: 'this is titie of trials',
        product_reason: 'this is reason of trials',
        specifications: 'this is specifications of trials',
        website: '',
        menu_id: '',     // 所属分类 , 是   int
        user_store_id: '',        // int
        product_price: '88.00',      //产品价格
        shipping_fee: '',                       //运费
        product_img: [],                        //产品图片
        product_img_s: [{url: 'https://images-na.ssl-images-amazon.com/images/I/5194nZpL9ZL._SL160_.jpg'}],
        product_details: 'details',
        active_date: [],
        start_time: '',
        end_time: '',
        quantity_per_day: '',                //每天上限数量 int
        total_quantity: '' ,                 //发行总量
        full_refund: '1',
        
        return_fee: '',
        refund: '',
        platform_fee: '',

        user_id: getUserId(),  // 用户ID ， 是，
        user_name: '',       // 发布用户名称， 是
        api_token: getToken()
      },
      trialsFormSubmit: {

      },
      rules: {
        product_url: [
          {required: true ,message: 'product url is required', trigger: 'blur'}
        ],
        website: [
          {required: true, message: 'website is required', trigger: 'change'}
        ],
        menu_id: [
          {type:'number',required: true, message: 'category is required', trigger: 'change'}
        ],
        product_price: [
          {required: true ,message: 'product price is required, Must be Numbers', trigger: 'blur'}
        ],
        product_img_s: [
          {
            type: 'array',
            required: true,
            message: 'Please Upload image',
            trigger: 'change'
          }
        ],
        product_title: [
          {required: true ,message: 'product title is required', trigger: 'blur'}
        ],
        user_store_id: [
          {type: 'number', required: true ,message: 'store is required', trigger: 'blur'}
        ],
        product_reason: [
          {required: true ,message: 'reason is required', trigger: 'blur'}
        ],
        specifications: [
          {required: true ,message: 'Specifications is required', trigger: 'blur'}
        ],
        active_date: [
          {type: 'array',required: true ,message: 'active date is required', trigger: 'change'}
        ],
        quantity_per_day: [
          { required: true ,message: 'quantity per day is required , Must be Numbers', trigger: 'blur'}
        ],
        total_quantity: [
          { required: true ,message: 'total quantity per day is required , Must be Numbers', trigger: 'blur'}
        ]
      },
      fileList2: [
      ],
      requestData: {
        api_token: getToken(),
        user_id: getUserId(),
        country_id: parseInt(getStore('country_id')) || 1
      },
      requestStoreData: {
        api_token: getToken(),
        user_id: getUserId(),
        platform_id: ''
      },
      trialDetailsrequestData: {
        api_token: getToken(),
        user_id: getUserId(),
        id: '',
      },

    }
  },

  computed : {
    ...mapGetters([
      'token',
      'user_id',
      'username'
    ]),
    currency () {
      return getStore('currency') || '$'
    },
    refund_one () {
      if(this.trialsForm.refund_price) {
        return NumAdd(this.trialsForm.refund_price, this.trialsForm.shipping_fee).toFixed(2)
      } else {
        return NumAdd(this.trialsForm.product_price, this.trialsForm.shipping_fee).toFixed(2)
      }
    },
    refund () {
      if(this.trialsForm.refund_price && this.trialsForm.full_refund == '0') {
        return (NumAdd(this.trialsForm.refund_price, this.trialsForm.shipping_fee) * this.trialsForm.total_quantity).toFixed(2)
      } else {
        return (NumAdd(this.trialsForm.product_price, this.trialsForm.shipping_fee) * this.trialsForm.total_quantity).toFixed(2)
      }
    },
    platform_fee () {
      switch (this.country_id) {
      case 1:
      case 2:
      case 3:
      case 5:
      case 6:
      case 7:
        if (this.refund_one < 10) {
          return 1 * this.trialsForm.total_quantity
        } else if (this.refund_one <= 20 && this.refund_one >= 10) {
          return 2 * this.trialsForm.total_quantity
        } else if (this.refund_one > 20) {
          return 3 * this.trialsForm.total_quantity
        }
        break
      case 4:
        if (this.refund_one < 1200) {
          return 120 * this.trialsForm.total_quantity
        } else if (this.refund_one <= 2400 && this.refund_one >= 1200) {
          return 240 * this.trialsForm.total_quantity
        } else if (this.refund_one > 2400) {
          return 360 * this.trialsForm.total_quantity
        }
        break
      
      default:
        break
      }
    },
    total_fee () {
      return NumAdd(this.refund, this.platform_fee)
    }
  },  
  mounted () {
    this.init()
  },
  methods: {

    // 初始化操作
    init () {
      this.showEditor()
      this.initData()
      this.getHeadCateListInfo()
      this.getTrialsStore()
      this.isEditor()
    },
    initData () {
      this.trialsForm.user_name = this.username
    },

    //blur 时请求信息
    urlBlur () {
      this.getPlatformCateInfo()
    },
    //获取头部品类列表
    getHeadCateListInfo () {
      this.$api.getHeadCateList().then(res => {
        this.optionsCategory = res.data
      }).catch(error => {
        console.log(error)
      })
    },
    //获取店铺列表
    getTrialsStore () {
      this.$api.trialsStore(this.requestStoreData).then(res => {
        this.optionsStore = res.data
      }).catch(error => {
        console.log(error)
      })
    },

    //图片拖动位置 

    imgChange () {
      setTimeout(() => {
        $('.el-upload-list__item').mousedown((e) => {
          e.stopPropagation()
          console.log(e)
        })
      }, 500)
    },

    //通过输入链接获取所有产品信息
    getProInfo (url) {
      this.$message.info('For information on goods, please wait a moment')
      axios.get('http://23.91.2.69/productsm/index.php/api/asin', {
        params: {
          url: url,
        }
      })
        .then( (res) =>{
          this.getPlatformCateInfo()
          setTimeout(() => {
            console.log(res)
            let data = res.data.data
            let newArr = []
            data.product_img.forEach((e) => {
              if (e) {
                newArr.push({url: e})
              }
            })

            this.trialsForm.product_img_s = newArr
            this.imgChange()
            this.trialsForm.product_price = data.product_price.slice(1)
            // this.trialsForm.product_reason  = data.product_reason.replace(/<br\s*\/?>/gi,'\r\n').replace(/<b>/gi, '').replace(/<\/b>/gi, '')
            this.trialsForm.product_title = data.product_title
            if (res.data.data.Error) {
              this.$notify.error('please enter a right url')
            }
          }, 50)
        })
        .catch(function (err){
          console.log(err)
        })
     
    },

    //获取平台品类信息
    getPlatformCateInfo () {
      this.optionsWebsite = []
      this.$api.getPlatformCate(this.requestData)
        .then(res => {
          console.log(res.data) 
          if(res.data.length <= 0) {return}
          for (let i of res.data) {
            console.log(i)
            var ObjWebsite = {
              label: '',
              id: ''
            }
            ObjWebsite.label = i.website
            ObjWebsite.id = i.id
            this.optionsWebsite.push(ObjWebsite)
            if (this.trialsForm.product_url.search(i.url) >= 0) {
              this.trialsForm.website = i.website
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    //平台发生改变
    websiteChange (label) {
      this.trialsForm.user_store_id = ''
      for (let i of this.optionsWebsite) {
        if (i.label == label) {
          this.trialsForm.platform_id = i.id
          this.requestStoreData.platform_id = i.id
          this.getTrialsStore()
        }
      }  
    },

    radioChange (i) {
      console.log(i)
    },

    //显示富文本编辑器插件
    showEditor () {
      setTimeout(() => {
        $('#summernote').summernote({
          height: 300,
          tabsize: 2
        })
        $('#summernote').summernote('code', '')
      },10)
    },

    //上传图片
    beforeAvatarUploadP (file) {
      var isJPG = file.type === 'image/jpeg'
      var isGIF = file.type === 'image/gif'
      var isPNG = file.type === 'image/png'

      var isLt500K = file.size / 1024 / 500 < 1

      var limitF = true
      if (!(isJPG || isGIF || isPNG)) {
        this.$message.error('上传图片只能是 JPG/GIF/PNG格式!')
      }
      if (!isLt500K) {
        this.$message.error('上传图片文件大小 不能超过 500kb!')
      }
      if (this.trialsForm.length >= 6) {
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
            console.log(res)
            this.trialsForm.product_img_s.push({ url: res.data })
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
      this.trialsForm.product_img_s = fileList
    },
    issueCoupon (data) {
      if (this.$route.query.editor) {
        data.id = this.$route.query.editor
        this.$api.editTrial(data).then(res => {
          if (res.code === 200) {
            this.$notify.success('issue coupon success')
            this.$router.push({ path: '/posted/trials' })
          }
        }).catch(error => {
          console.log(error)
        })
      } else {
        this.$api.trialsAdd (data)
          .then(res => {
            if (res.code === 200) {
              this.$notify.success('issue coupon success')
              this.$router.push({ path: '/posted/trials' })
            }
          })
          .catch(error => {
            console.log(error)
          })
      } 
    },
    Submit (e) {
      //element-ui 的表单验证
      // this.$refs.upload.submit();
      this.$refs['trialsForm'].validate(valid => {
        if (valid) {
          e.target.disabled = true
          for (var i in this.trialsForm) {
            this.trialsFormSubmit[i] = this.trialsForm[i]
          }
          this.trialsFormSubmit.start_time = parseInt((+this.trialsForm.active_date[0])/1000)
          this.trialsFormSubmit.end_time = parseInt((+this.trialsForm.active_date[1])/1000)
          this.trialsFormSubmit.platform_fee = this.platform_fee
          this.trialsFormSubmit.refund = this.refund
          this.trialsFormSubmit.total_fee  = this.total_fee
          var imgArr = []
          for (let i of this.trialsForm.product_img_s) {
            imgArr.push(i.url)
          }
          this.trialsFormSubmit.product_img = imgArr
          var markupStr = $('#summernote').summernote('code')
          this.trialsFormSubmit.product_details = markupStr
          this.trialsForm.product_details = markupStr
          if (!markupStr) {
            return
          }
          console.log(this.trialsFormSubmit)
          this.issueCoupon(this.trialsFormSubmit)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //退出
    Cancel () {
      this.$router.go(-1)
    },
  

    //限制输入
    filterMoney (value) {
      if (isNaN(Number(this.trialsForm[value]))) {
        this.trialsForm[value] = ''
      }
    },

    //编辑，判断是否有editor
    isEditor () {
      if (!this.$route.query.editor) {
        return
      }
      this.isEditorData = false
      this.trialDetailsrequestData.id = this.$route.query.editor
      console.log(this.trialDetailsrequestData)
      this.$api.trialEditDetail(this.trialDetailsrequestData).then(res => {
        res.data.product_img_s = res.data.product_img.split(',').map((e)=>{return {url: e}})
        let newArr = []
        newArr[0] = new Date(res.data.start_time * 1000)
        newArr[1] = new Date(res.data.end_time * 1000)
        res.data.active_date = newArr
        this.trialsForm = res.data
        this.trialsForm.api_token = getToken()
        this.trialsForm.user_id = getUserId()
        this.trialsForm.user_name = this.username
        this.trialsForm.total_quantity = String(res.data.total_quantity)
        this.trialsForm.quantity_per_day = String(res.data.quantity_per_day)
        this.trialsForm.country_id = parseInt(getStore('country_id')) || 1
        $('#summernote').summernote('code', res.data.product_details)
      })
    },
  }
}
</script>

<style lang="less">
@import url('../../../styles/mixin.less');

.coupons-form {
  .input-price-fee {
    width: 198px;
  }
  .item-inline {
    width: 42.9%;
    display: inline-block;
  }
  .item-inline1 {
    width: 43%;
    display: inline-block;
  }
  .textarea {
    textarea {
      height: 108px;
      resize: none;
    }
  }
  .get-pro-info {
    .btn-h(80px, 36px, #3399ff, #3399ff, #fff);
    &:active {
      background: darken(#3399ff, 10%);
      border-color: darken(#3399ff, 10%);
    }
  }
  .el-input {
    &.url-input.input-price-fee {
      width: 198px;
    }
    &.url-input {
      width: 68%;
      margin-right: 5%;
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
  .trials-money {
    label {
      display: inline-block;
      width: 100px;
      text-align: right;
      margin-right: .5rem;
    }
      .money {
        color: #666;
        font-size: 16px;
        line-height: 18px;
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
</style>
