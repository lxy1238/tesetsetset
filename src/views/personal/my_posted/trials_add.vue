<template>
  <div class="trials-add">
     <div class="title">
       Add Coupons
    </div>
    <div class="title-s">
      Product Information
    </div>
    <el-form :model="trialsForm" :rules="rules" ref="trialsForm" label-width="140px" class="coupons-form" >
      <el-form-item label="Product URL: " prop="product_url" >
        <el-input class="url-input" v-model="trialsForm.product_url"></el-input>
        <button class="get-pro-info"  type="button" @click="getProInfo">get</button>
      </el-form-item>
      <el-form-item label="Wedsite: " prop="website" class="item-inline"  >
        <el-select v-model="trialsForm.website"  @change="websiteChange">
          <el-option 
            v-for="item in optionsWebsite"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Store: " prop="store_id" class="item-inline"  >
        <el-select v-model="trialsForm.store_id">
           <el-option 
            v-for="item in optionsStore"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Category: " prop="category_id" class="item-inline"   >
        <el-select v-model="trialsForm.category_id" @change="categoryChange">
           <el-option 
            v-for="(item, index) in optionsCategory"
            :key="index"
            :label="item.label"
            :value="index">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="List price: "  prop="product_price"  class="item-inline"  >
        <el-input class="url-input input-price-fee" v-model="trialsForm.product_price" @blur="filterMoney('product_price')"></el-input>
      </el-form-item>
      <el-form-item label="Shipping fee: " prop="shipping_fee" class="item-inline"  >
        <el-input class="url-input input-price-fee" v-model="trialsForm.shipping_fee"  @blur="filterMoney('shipping_fee')"></el-input>
      </el-form-item>
      <el-form-item label="Image" prop="product_img_s" >
        <el-upload 
              class="upload-demo-img" 
              action="https://jsonplaceholder.typicode.com/posts/" 
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
        <el-radio class="radio" v-model="trialsForm.is_full_return" label="yes">yes</el-radio>
        <el-radio class="radio" v-model="trialsForm.is_full_return" label="no">no</el-radio>
        
      </el-form-item>
        <el-form-item label=" Each trial returns: " v-if="trialsForm.is_full_return === 'no'"  class="item-inline1" >
             <el-input type="text" v-model="trialsForm.return_fee"></el-input>
      </el-form-item>
    <div class="title-s">
        Security Deposit
      </div>
    <div class="trials-money">
      <p class="money"><label>Pefund:</label> ${{refund}}</p>
      <p class="money"><label>Platform fee:</label>  ${{platform_fee}}</p>
      <p class="money"><label>Total fee:</label>  <span class="red">${{total_fee}}</span></p>
    </div>
    
    <el-form-item class="footer-btn" >
      <button type="button" class="save" @click="trialsSave">Save</button>
      <button type="button" class="cancel" @click="Cancel">Cancel</button>
    </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getPlatformCate, uploadImg } from '@/api/login'
import axios from "axios"
import qs from "qs"
import { getStore } from '@/utils/utils'
import { getToken, getUserId } from '@/utils/auth'
import { NumAdd, NumMul} from '@/utils/calculate'

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
      trialsForm: {
        country_id: parseInt(getStore('country_id')) || 1,
        product_url: 'http://www.baidu.com',
        product_title: 'this is titie of trials',
        product_reason: 'this is reason of trials',
        specifications: 'this is specifications of trials',
        website: '',
        country: '',         //string 国家
        category_id: "",     // 所属分类 , 是   int
        store_id: '',        // int
        product_price: '88.00',      //产品价格
        shipping_fee: '1.2',                       //运费
        product_img: [],                        //产品图片
        product_img_s: [],
        product_details: '<div></div>',
        active_date: '',
        active_date_start: "",
        active_date_end: "",
        quantity_per_day: '10',                //每天上限数量 int
        total_quantity: "1000" ,                 //发行总量
        total_fee: '1234.54',                  //总费用
        is_full_return: "yes",
        
        return_fee: '',
        refund: '',
        platform_fee: '',
        total_fee: '',

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
          {type:'number',required: true, message: 'website is required', trigger: 'change'}
        ],
        store_id: [
          {required: true, message: 'store is required', trigger: 'change'}
        ],
        category_id: [
          {type:'number',required: true, message: 'category is required', trigger: 'change'}
        ],
        product_price: [
          {required: true ,message: 'product price is required, Must be Numbers', trigger: 'blur'}
        ],
        shipping_fee: [
          {required: true ,message: 'shipping fee is required , Must be Numbers', trigger: 'blur'}
        ],
        product_img_s: [
          {
            type: "array",
            required: true,
            message: "Please Upload image",
            trigger: "change"
          }
        ],
         product_title: [
          {required: true ,message: 'product title is required', trigger: 'blur'}
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
          {required: true ,message: 'quantity per day is required , Must be Numbers', trigger: 'blur'}
        ],
        total_quantity: [
          {required: true ,message: 'total quantity per day is required , Must be Numbers', trigger: 'blur'}
        ]
      },
      fileList2: [
      ],
      requestData: {
        country_id: parseInt(getStore('country_id')) || 1
      }
    }
  },
  mounted () {
    this.init()
  },
  computed : {
    ...mapGetters([
      'token',
      'user_id',
      'username'
    ]),
    refund () {
      if(this.trialsForm.return_fee) {
        return NumAdd(this.trialsForm.return_fee, this.trialsForm.shipping_fee)
      } else {
        return NumAdd(this.trialsForm.product_price, this.trialsForm.shipping_fee)
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
          if (this.refund < 10) {
            return 1
          } else if (this.refund <= 20 && this.refund >= 10) {
            return 2
          } else if (this.refund > 20) {
            return 3
          }
          break;
        case 4:
           if (this.refund < 1200) {
            return 120
          } else if (this.refund <= 2400 && this.refund >= 1200) {
            return 240
          } else if (this.refund > 2400) {
            return 360
          }
          break;
      
        default:
          break;
      }
    },
    total_fee () {
      return NumAdd(this.refund, this.platform_fee)
    }
  },  
  methods: {
    getProInfo () {
      console.log("获取产品信息")
    },

    // 初始化操作
    init () {
      this.showEditor()
      this.initData()
      this.getPlatformCateInfo()
    },
    initData () {
      this.trialsForm.api_token = this.token
      this.trialsForm.user_id = this.user_id
      this.trialsForm.user_name = this.username
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
        //获取平台品类信息
    getPlatformCateInfo() {
      getPlatformCate(this.requestData)
        .then(res => {
          console.log(res)
          if(res.data.length <= 0) {return}
          var arrKeysWeb = Object.keys(res.data)
          for (var i of arrKeysWeb) {
            var ObjWebsite = {
              label: "",
              id: ""
            }
            ObjWebsite.label = res.data[i].website
            ObjWebsite.id = parseInt(i)
            this.optionsWebsite.push(ObjWebsite)
          }
          this.trialsForm.website = ""
        })
        .catch(error => {
          console.log(error);
        });
    },

     //平台发生改变
    websiteChange (id) {
      this.optionsCategory = []
      getPlatformCate(this.requestData).then(res => {
        if(res.data.length <= 0) {return}
        this.trialsForm.websiteData = res.data[id]
         var arrKeysWeb1 = Object.keys(res.data[id].category)
            for (var j of arrKeysWeb1) {
              var ObjCate = {
                label: "",
                category_id: "",
                commission_ratio: '',
                menu_id: '',
                platform_id: '',
              }
              ObjCate.label = res.data[id].category[j].website_category
              ObjCate.category_id = res.data[id].category[j].category_id
              ObjCate.commission_ratio = res.data[id].category[j].commission_ratio
              ObjCate.menu_id = res.data[id].category[j].menu_id
              ObjCate.platform_id = res.data[id].category[j].platform_id
              this.optionsCategory.push(ObjCate)
              this.trialsForm.category_id = ""
            }
      }).catch(error => {
        console.log(error + 'getPlatformCate')
      }) 
      console.log(this.trialsForm)
    },

    //品类发生改变
    categoryChange (id) {
      this.trialsForm.categoryData = this.optionsCategory[id]
    },

    //上传图片
    beforeAvatarUploadP(file) {
      var isJPG = file.type === "image/jpeg";
      var isGIF = file.type === "image/gif";
      var isPNG = file.type === "image/png";

      var isLt500K = file.size / 1024 / 500 < 1;

      var limitF = true;
      if (!(isJPG || isGIF || isPNG)) {
        this.$message.error("上传图片只能是 JPG/GIF/PNG格式!");
      }
      if (!isLt500K) {
        this.$message.error("上传图片文件大小 不能超过 500kb!");
      }
      if (this.trialsForm.length >= 6) {
        this.$message.error("最多只能上传6张图片！");
        limitF = false;
      }
      if ((isJPG || isGIF || isPNG) && isLt500K && limitF) {
        var formData = new FormData();
        formData.append("api_token", this.token);
        formData.append("user_id", this.user_id);
        formData.append("file", file);
        uploadImg(formData)
          .then(res => {
            console.log(res);
            this.trialsForm.product_img_s.push({ url: "http://" + res.data });
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        return false;
      }
    },
    handleRemoveP(file, fileList) {
      this.trialsForm.product_img_s = fileList
    },
    issueCoupon(data) {
      addCoupon(data)
        .then(res => {
          console.log(res)
          if (res.code === 200) {
            this.$notify.success("issue coupon success")
            this.$router.push({ path: "/posted/coupons" })
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    Submit() {
      //element-ui 的表单验证
      // this.$refs.upload.submit();
      this.$refs["trialsForm"].validate(valid => {
        if (valid) {
          for (var i in this.trialsForm) {
            this.trialsFormSubmit[i] = this.trialsForm[i]
          }
          this.trialsFormSubmit.active_date_start = parseInt((+this.trialsForm.active_date[0])/1000)
          this.trialsFormSubmit.active_date_end = parseInt((+this.trialsForm.active_date[1])/1000)
          this.trialsFormSubmit.quantity_per_day = parseInt(
            this.trialsForm.quantity_per_day
          )
          this.trialsFormSubmit.website = this.trialsForm.websiteData.website
          this.trialsFormSubmit.category_id = parseInt(this.trialsForm.categoryData.category_id)
          this.trialsFormSubmit.menu_id = this.trialsForm.categoryData.menu_id
          this.trialsFormSubmit.country_id = this.trialsForm.websiteData.country_id
          this.trialsFormSubmit.commission_ratio = this.trialsForm.categoryData.commission_ratio
          this.trialsFormSubmit.platform_id = this.trialsFormSubmit.categoryData.platform_id
          this.trialsFormSubmit.refund = this.refund
          this.trialsFormSubmit.platform_fee = this.platform_fee
          this.trialsFormSubmit.total_fee = this.total_fee
          var imgArr = [];
          for (var i of this.trialsForm.product_img_s) {
            imgArr.push(i.url);
          };
          this.trialsFormSubmit.product_img = imgArr
          var markupStr = $('#summernote').summernote('code')
          this.trialsFormSubmit.product_details = markupStr
          console.log(this.trialsFormSubmit)
          // this.issueCoupon(this.trialsFormSubmit)
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //退出
    Cancel() {
      this.$router.go(-1);
    },
    trialsSave () {
      //获取内容
      this.Submit()
      //插入内容
      //  $('#summernote').summernote('code', '<div>aefawe</div>')
      console.log(this.trialsFormSubmit)
    },
    filterMoney (value) {
      if (isNaN(Number(this.trialsForm[value]))) {
        this.trialsForm[value] = ''
      }
    }
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
    width: 40%;
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
</style>
