<template>
   <div class="coupons-add">
    <div class="title">
       Add Coupons
    </div>
    <div class="title-s">
      Product Information
    </div>
    <el-form :model="couponsForm" :rules="rules" ref="couponsForm" label-width="140px" class="coupons-form" >
      <el-form-item label="Product URL: " prop="product_url" >
        <el-input class="url-input" v-model="couponsForm.product_url"></el-input>
        <button class="get-pro-info"  type="button" @click="getProInfo">get</button>
      </el-form-item>
      <el-form-item label="Wedsite: " prop="website" class="item-inline" >
        <el-select v-model="couponsForm.website" @change="websiteChange" >
          <el-option
            v-for="item in optionsWebsite"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Category: " prop="menu_id" class="item-inline" >
        <el-select v-model="couponsForm.menu_id"  @change="categoryChange">
          <el-option
            v-for="(item, index) in optionsCategory"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="List price: " prop="product_price" class="item-inline" >
        <el-input class="input-price-fee" @blur="filterMoney('product_price')" v-model="couponsForm.product_price" ></el-input>
      </el-form-item>
      <el-form-item label="Shipping fee: "  class="item-inline" prop="shipping_fee">
        <el-input class="input-price-fee" @blur="filterMoney('shipping_fee')" v-model="couponsForm.shipping_fee" ></el-input>
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
      <el-form-item label="Title: " prop="product_title" >
        <el-input v-model="couponsForm.product_title"></el-input>
      </el-form-item>
      <el-form-item label="Reason: " prop="product_reason" >
        <el-input v-model="couponsForm.product_reason" type="textarea" :rows="8" class="textarea"></el-input>
      </el-form-item>
    <div class="title-s">
       Coupon Information
    </div>
    <el-form-item label="Valid date: " class="item-inline"  prop="valid_date" >
      <el-date-picker size="large" placeholder="Please select the date" v-model="couponsForm.valid_date"></el-date-picker>
    </el-form-item>
     <el-form-item label="Discount rate(%): " class="item-inline" prop="discount_rate" >
        <el-input class="input-price-fee" @blur="filterDiscount('discount_rate')" v-model="couponsForm.discount_rate" >
          <template slot="append">%</template>
        </el-input>
    </el-form-item>
    <el-form-item label="Quantity per day: " class="item-inline1" prop="quantity_per_day" >
       <el-input class="input-price-fee" @blur="filterMoney('quantity_per_day')" v-model.number="couponsForm.quantity_per_day" >
        </el-input>
    </el-form-item>
    <el-form-item label="Type: " class="item-inline1" >
       <el-radio class="radio" v-model="couponsForm.use_type" label="Unlimited">Unllimited</el-radio>
       <el-radio class="radio" v-model="couponsForm.use_type" label="Alone">Alone</el-radio>
    </el-form-item>
    <el-form-item label="Coupon code: " class="item-inline" prop="coupon_code">
       <el-input v-model="couponsForm.coupon_code" v-if="couponsForm.use_type === 'Unlimited'"></el-input>
       <el-input type="textarea" v-model="couponsForm.coupon_code" v-else ></el-input> 
    </el-form-item>
    <el-form-item class="footer-btn" >
      <button type="button" class="save" @click="Submit">Save</button>
      <button type="button" class="cancel" @click="Cancel">Cancel</button>
    </el-form-item>
    </el-form>
   
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addCoupon, uploadImg, getPlatformCate, getHeadCateList } from '@/api/login'
import { getToken, getUserId } from '@/utils/auth'
import { getStore } from '@/utils/utils'
import { toTimestamp } from '@/utils/date'
// import axios from 'axios'
// import qs from 'qs'
export default {
  name: 'coupoons-add',
  data () {
    return {
      rules: {
        product_url: [{ required: true, trigger: 'blur' }],
        product_price: [{ required: true, trigger: 'blur' }],
        website: [{type:'number', required: true, message: 'website is required', trigger: 'blur' }],
        category_id: [{type:'number', required: true, message: 'category is required' ,trigger: 'blur' }],
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
        quantity_per_day: [{message: 'quantity per day is required', required: true, trigger: 'blur' }],
        coupon_code: [{ required: true, trigger: 'blur' }]
      },
      optionsWebsite: [],
      optionsCategory: [],
      couponsForm: {
        product_url: 'http://www.baidu.com', //产品链接， 是
        user_name: '', // 发布用户名称， 是
        menu_id: '', // 所属分类 , 是   int
        country_id: parseInt(getStore('country_id')) || 1, // 国家  是
        website: '', // 平台   是
        product_title:
          '2-PK of 30oz Ozark Trail Double-Wall Vacuum-Sealed Tumblers', // 商品标题   是 ，
        product_img_s: [],
        product_reason: 'This is a product I like very much', //产品描述  是
        use_type: 'Unlimited',
        coupon_code: 'QAKLWEFALWEKFJ', //优惠券
        reward_type: '1.5', //PerOrder: 按每订单奖励,
        product_price: '65', //商品价格
        shipping_fee: '1.11', //运费   否
        discount_rate: '12', //折扣率    否
        valid_date: new Date(), //到期时间  int
        quantity_per_day: '10', // 每天上限数量 int
        influencer_reward: '1.5', // 推荐费用/每个
        platform_fee: '2.2', //支付平台费用/每个
        influencer_reward_count: '66', //推荐总费用
        platform_reward: '55', //  支付平台总费用， 否
        // total_fee: '123', //总费用
        // categoryData: '',
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
        country_id: parseInt(getStore('country_id')) || 1
      }
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    ...mapGetters(['user_id', 'username', 'token'])
  },
  methods: {
    //通过输入链接获取所有产品信息
    getProInfo () {
      console.log('获取产品信息')
    },

    //页面初始化
    init () {
      this.initData()
      this.getPlatformCateInfo()
      this.getHeadCateListInfo()
    },

    //数据初始化
    initData () {
      this.couponsForm.user_name = this.username
    },

    //获取平台品类信息
    getPlatformCateInfo () {
      getPlatformCate(this.requestData)
        .then(res => {
          if(res.data.length <= 0) {return}
          var arrKeysWeb = Object.keys(res.data)
          for (var i of arrKeysWeb) {
            var ObjWebsite = {
              label: '',
              id: ''
            }
            ObjWebsite.label = res.data[i].website
            ObjWebsite.id = parseInt(i)
            this.optionsWebsite.push(ObjWebsite)
          }
          this.couponsForm.website = ''
        })
        .catch(error => {
          console.log(error)
        })
    },

    //平台发生改变
    websiteChange (id) {
      getPlatformCate(this.requestData).then(res => {
        if(res.data.length <= 0) {return}
        this.couponsForm.websiteData = res.data[id]
        // var arrKeysWeb1 = Object.keys(res.data[id].category)
        // for (var j of arrKeysWeb1) {
        //   var ObjCate = {
        //     label: '',
        //     category_id: '',
        //     commission_ratio: '',
        //     menu_id: '',
        //     platform_id: '',
        //   }
        //   ObjCate.label = res.data[id].category[j].website_category
        //   ObjCate.category_id = res.data[id].category[j].category_id
        //   ObjCate.commission_ratio = res.data[id].category[j].commission_ratio
        //   ObjCate.menu_id = res.data[id].category[j].menu_id
        //   ObjCate.platform_id = res.data[id].category[j].platform_id
        //   this.optionsCategory.push(ObjCate)
        //   this.couponsForm.category_id = ''
        // }
      }).catch(error => {
        console.log(error + 'getPlatformCate')
      }) 
      console.log(this.couponsForm)
    },

    //品类发生改变
    categoryChange () {
      // this.couponsForm.categoryData = this.optionsCategory[id]
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
      if (this.couponsForm.length >= 6) {
        this.$message.error('最多只能上传6张图片！')
        limitF = false
      }
      if ((isJPG || isGIF || isPNG) && isLt500K && limitF) {
        var formData = new FormData()
        formData.append('api_token', this.token)
        formData.append('user_id', this.user_id)
        formData.append('file', file)
        uploadImg(formData)
          .then(res => {
            this.couponsForm.product_img_s.push({ url: 'http://' + res.data })
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
      addCoupon(data)
        .then(res => {
          if (res.code === 200) {
            this.$notify.success('issue coupon success')
            this.$router.push({ path: '/posted/coupons' })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    Submit () {
      
      //element-ui 的表单验证
      // this.$refs.upload.submit();
      this.$refs['couponsForm'].validate(valid => {
        if (valid) {
          for (var i in this.couponsForm) {
            this.couponsFormSubmit[i] = this.couponsForm[i]
          }
          this.couponsFormSubmit.valid_date = toTimestamp(this.couponsForm.valid_date)
          this.couponsFormSubmit.website = this.couponsForm.websiteData.website
          // this.couponsFormSubmit.category_id = parseInt(this.couponsForm.categoryData.category_id)
          // this.couponsFormSubmit.menu_id = this.couponsForm.categoryData.menu_id
          this.couponsFormSubmit.country_id = this.couponsForm.websiteData.country_id
          this.couponsFormSubmit.platform_id = this.couponsForm.websiteData.id
          // this.couponsFormSubmit.commission_ratio = this.couponsForm.categoryData.commission_ratio
          // this.couponsFormSubmit.platform_id = this.couponsFormSubmit.categoryData.platform_id
          // var imgArr = []
          // for (let i of this.couponsForm.product_img_s) {
          //   imgArr.push(i.url)
          // }
          this.couponsFormSubmit.product_img = this.couponsForm.product_img_s.map((e) => e.url)
          console.log(this.couponsFormSubmit)
          this.issueCoupon(this.couponsFormSubmit)
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

    //fiterMoney
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

    // 获取所有品类的信息
    getHeadCateListInfo () {
      getHeadCateList().then(res => {
        this.optionsCategory = res.data
      }).catch(error => {
        console.log(error)
      })
    }
   
  }
}
</script>

<style lang="less"  >
@import url("../../../styles/mixin.less");
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
    &.url-input {
      width: 75%;
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
}
</style>
