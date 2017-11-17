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
        <el-select v-model="couponsForm.website">
          <el-option
            v-for="item in optionsWebsite"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Category: " prop="category_id" class="item-inline" >
        <el-select v-model="couponsForm.category_id">
          <el-option
            v-for="item in optionsCategory"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="List price: " prop="product_price" class="item-inline" >
        <el-input class="input-price-fee" v-model="couponsForm.product_price"></el-input>
      </el-form-item>
      <el-form-item label="Shipping fee: "  class="item-inline" prop="shipping_fee">
        <el-input class="input-price-fee" v-model="couponsForm.shipping_fee"></el-input>
      </el-form-item>
      <el-form-item label="Image"  prop="product_img">
        <el-upload 
              class="upload-demo-img" 
              action="http://dealsbank.zhuo.com/api/v1/common/upload-file"
              
              :data="uploadData"
              :on-remove="handleRemoveP" 
              :on-success="uploadSuccess" 
              :before-upload="beforeAvatarUploadP" 
              :file-list="fileList2"
              list-type="picture">
            <el-button size="small" type="primary">Upload</el-button>
            <div slot="tip" class="el-upload__tip">jpg, .gif, or .png accepted,500 KB max,6 photos at most.
            </div>
        </el-upload>

        <!-- <form  enctype="multipart/form-data" action="http://dealsbank.zhuo.com/api/v1/common/upload-file" method="post" >
           <input :value="token"  name="api_token" />
           <input type="file" name="file"  multiple  id="file"/>
          <button type="submit">test</button>
        </form> -->
       
      </el-form-item>
      <el-form-item label="Title: " prop="product_title" >
        <el-input v-model="couponsForm.product_title"></el-input>
      </el-form-item>
      <el-form-item label="Reason: " prop="product_reason" >
        <el-input v-model="couponsForm.product_reason" type="textarea" class="textarea"></el-input>
      </el-form-item>
    <div class="title-s">
       Coupon Information
    </div>
    <el-form-item label="Valid date: " class="item-inline"  prop="valid_date" >
      <el-date-picker size="large" placeholder="Please select the date" v-model="couponsForm.valid_date"></el-date-picker>
    </el-form-item>
     <el-form-item label="Discount rate: " class="item-inline" prop="discount_rate" >
       <el-input v-model="couponsForm.discount_rate"></el-input>
    </el-form-item>
    <el-form-item label="Quantity per day: " class="item-inline1" prop="quantity_per_day" >
       <el-input v-model="couponsForm.quantity_per_day"></el-input>
    </el-form-item>
    <el-form-item label="Type: " class="item-inline1" >
       <el-radio class="radio" v-model="couponsForm.use_type" label="Unlimited">Unllimited</el-radio>
       <el-radio class="radio" v-model="couponsForm.use_type" label="Alone">Alone</el-radio>
    </el-form-item>
    <el-form-item label="Coupon code: " class="item-inline" prop="coupon_code">
       <el-input v-model="couponsForm.coupon_code"></el-input>
    </el-form-item>
    <el-form-item class="footer-btn" >
      <button type="button" class="save" @click="Submit">Save</button>
      <button type="button" class="cancel">Cancel</button>
    </el-form-item>
    </el-form>
   
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addCoupon, uploadImg }  from '@/api/login'
import { getToken } from '@/utils/auth'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'coupoons-add',
  data () {
    return {
       optionsWebsite: [{
          value: '亚马逊',
          label: '亚马逊'
        }, {
          value: '亚马逊1',
          label: '亚马逊1'
        }, {
          value: '亚马逊2',
          label: '亚马逊2'
        }, {
          value: '亚马逊3',
          label: '亚马逊3'
        }, {
          value: '亚马逊4',
          label: '亚马逊4'
      }],
      optionsCategory: [{
          value: 1,
          label: '母婴'
        }, {
          value: 2,
          label: '运动'
        }, {
          value: 3,
          label: '男装'
        }, {
          value: 4,
          label: '女装'
        }, {
          value: 5,
          label: '零食'
      }],
      couponsForm: {
        product_url: 'http://www.baidu.com',     //产品链接， 是
        user_id: undefined,  // 用户ID ， 是，
        user_name: '',       // 发布用户名称， 是
        category_id: 1,     // 所属分类 , 是   int
        country: '美国' ,    // 国家  是
        website: '亚马逊2',         // 平台   是 
        product_title: 'this is project',   // 商品标题   是 ，
        product_img: '12',     // 产品图片， string, 用逗号拼接 , 否
        product_reason: 'This is a product I like very much',  //产品描述  是
        use_type: 'Unlimited',
        coupon_code: 'QAKLWEFALWEKFJ',     //优惠券
        reward_type: '1.5',     //PerOrder:按每订单奖励,
        product_price: '65',   //商品价格
        shipping_fee: '1.11',   //运费   否
        discount_rate: '12%',   //折扣率    否
        valid_date: new Date(),      //到期时间  int
        total_quantity: 100,  // 总数量   int
        quantity_per_day: "10", // 每天上限数量 int
        influencer_reward:'1.5',// 推荐费用/每个
        platform_fee: '2.2',    //支付平台费用/每个
        influencer_reward_count: '66',    //推荐总费用
        platform_reward: '55',   //  支付平台总费用， 否
        total_fee: '123', //总费用
        // shipping_fee: ' '  // 运费  
        api_token: getToken()
      },
      rules: {
        product_url: [
          {required: true , trigger: 'blur' },
        ],
        product_price: [
          { required: true,  trigger: 'blur' },
        ],
        website: [
          { required: true, trigger: 'blur' },
        ],
        product_img: [
          { required: true, trigger: 'change'}
        ],
        product_title: [
          { required: true, message: 'title is required', trigger: 'blur'}
        ],
        product_reason: [
          { required: true, trigger: 'blur'}
        ],
        valid_date: [
          {type: 'date', required: true, trigger: 'blur'}
        ],
        discount_rate: [
          { required: true, trigger: 'blur'}
        ],
        quantity_per_day: [
          { required: true, trigger: 'blur'}
        ],
        coupon_code: [
          { required: true, trigger: 'blur'}
        ],
      },
      fileList2: [
        { url: 'http://www.ghostxy.top/dealsbank/img/01.png'}, 
        { url: 'http://www.ghostxy.top/dealsbank/img/02.png'}, 
        { url: 'http://www.ghostxy.top/dealsbank/img/03.png'}, 
      ],
      uploadData: {
        api_token: '',
        file: ''
      }
    }
  },
  mounted () {
    this.couponsForm.user_id = this.user_id
    this.couponsForm.user_name = this.username
    this.uploadData.api_token = this.token
  },  
  computed: {
    ...mapGetters([
      'user_id',
      'username',
      'token'
    ])
  },
  methods: {
    getProInfo () {
      console.log("获取产品信息")
    },
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
      if (this.fileList2.length >= 6) {
          this.$message.error('最多只能上传6张图片！')
          limitF = false
      }
      this.uploadData.file = file
      var fetch = axios.create({
        baseURL:"http://dealsbank.zhuo.com",
        timeout:20000,
        headers: {'Content-Type':'multipart/form-data'}
      });
      console.log(this.uploadData)
      const uploadImgTest = data => fetch({
        url: '/api/v1/common/upload-file',
        method: 'POST',
        data: data
      })
      uploadImgTest(this.uploadData).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
      return (isJPG || isGIF || isPNG) && isLt500K && limitF
    },
    uploadSuccess (res, file, fileList) {
      if (fileList > 6) {
        this.fileList2 = fileList.pop()
      } else {
         this.fileList2 = fileList
      }
      console.log(this.fileList2)
    },
    handleRemoveP (file, fileList) {
      this.fileList2 = fileList
      console.log(file)
    },
    selfUploadImg () {
      
    },
    testUploadImg () {
      console.log(this.uploadData)
      uploadImg(this.uploadData).then(res => {
        console.log(res)
      })
    } ,  
    issueCoupon () {
      addCoupon(this.couponsForm).then(res => {
        console.log(res)
        this.$notify.success("issue coupon success")
        this.$router.push({path: '/posted/coupons'})
      }).catch(error => {
        console.log(error)
      })
    },
    Submit(callback) {
      //element-ui 的表单验证
      this.$refs['couponsForm'].validate((valid) => {
        if (valid) {
          if (typeof this.couponsForm.valid_date != 'number') {
            this.couponsForm.valid_date = parseInt(this.couponsForm.valid_date.getTime()/1000) 
          }
          this.couponsForm.quantity_per_day = parseInt(this.couponsForm.quantity_per_day)
          this.issueCoupon(this.couponsForm)
          console.log(this.couponsForm)
        } else {
          console.log('error submit!!');
          return false
        }
      });
    },
  }
}
</script>

<style lang="less" >
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
    width: 33%;
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
