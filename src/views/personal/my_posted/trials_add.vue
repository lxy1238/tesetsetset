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
      <el-form-item label="Wedsite: " prop="" class="item-inline"  >
        <el-select v-model="trialsForm.website">
          <el-option 
            v-for="item in optionsWebsite"
            :key="item.value"
            :label="item.label"
            :value="item.value">

          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Store: " prop="" class="item-inline"  >
        <el-select v-model="trialsForm.store">
           <el-option 
            v-for="item in optionsStore"
            :key="item.value"
            :label="item.label"
            :value="item.value">

          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Category: " prop="" class="item-inline"  >
        <el-select v-model="trialsForm.category_id">
           <el-option 
            v-for="item in optionsCategory"
            :key="item.value"
            :label="item.label"
            :value="item.value">

          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="List price: "  prop="product_price"  class="item-inline"  >
        <el-input class="url-input input-price-fee" v-model="trialsForm.product_price"></el-input>
      </el-form-item>
      <el-form-item label="Shipping fee: " prop="shipping_fee" class="item-inline"  >
        <el-input class="url-input input-price-fee" v-model="trialsForm.shipping_fee"></el-input>
      </el-form-item>
      <el-form-item label="Image" >
        <el-upload 
              class="upload-demo-img" 
              action="https://jsonplaceholder.typicode.com/posts/" 
              :limit="6"
              :on-remove="handleRemoveP" 
              :on-success="uploadPho" 
              :before-upload="beforeAvatarUploadP" 
              :file-list="fileList2"
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
      <el-form-item label="Coupon code: " >
        <div id="summernote"></div>
      </el-form-item>
      <div class="title-s">
        Coupon Information
      </div>
      <el-form-item label="Active date: " class="item-inline" prop="active_date"  >
          <el-date-picker
            v-model="trialsForm.active_date"
            type="daterange"
            placeholder="选择日期范围">
          </el-date-picker>
      </el-form-item>
      <el-form-item label="Quantity per day: " class="item-inline1" prop="quantity_per_day" >
        <el-input v-model="trialsForm.quantity_per_day"></el-input>
      </el-form-item>
      <el-form-item label="Type: " class="item-inline1" >
        <el-radio class="radio" v-model="radio" label="1">Unllimited</el-radio>
        <el-radio class="radio" v-model="radio" label="2">Alone</el-radio>
      </el-form-item>
      <el-form-item label="Total quantity: " class="item-inline" prop="total_quantity">
        <el-input v-model="trialsForm.total_quantity"></el-input>
      </el-form-item>
    
    <div class="title-s">
        Security Deposit
      </div>
    <div class="trials-money">
      <p class="money"><label>Pefund:</label>   $1960.00</p>
      <p class="money"><label>Platform fee:</label>  $59.00</p>
      <p class="money"><label>Total fee:</label>  <span class="red">$1960.00</span></p>
    </div>
    
    <el-form-item class="footer-btn" >
      <button type="button" class="save" @click="trialsSave">Save</button>
      <button type="button" class="cancel">Cancel</button>
    </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'trials_add',
  data () {
    return {
      optionsWebsite: [
        {
          'value': '1',
          'label': 'amazon'
        }
      ],
      optionsStore: [
        {
          'value': '1',
          'label': 'amazon'
        }
      ],
      optionsCategory: [
        {
          'value': '1',
          'label': 'amazon'
        }
      ],
      trialsForm: {
        product_url: 'http://www.baidu.com',
        wobsite: '',
        store: '',
        category_id: "",     // 所属分类 , 是   int
        product_price: '565',
        shipping_fee: '1.2',                       //运费
        product_img: '',                        //产品图片
        product_title: 'this is trials title', 
        product_reason: 'this is reason',
        specifications: 'spaecaefaef',
        product_details: '<h1>jerry</h1>',
        active_date: '',
        active_date_start: new Date(),
        active_date_end: new Date(),
        quantity_per_day: '10',               //每天上限数量 int
        total_quantity: 1000 ,                 //发行总量
        is_full_return: "yes",

        user_id: undefined,  // 用户ID ， 是，
        user_name: '',       // 发布用户名称， 是
        country: '美国' ,    // 国家  是


      },
      rules: {
        product_url: [
          {required: true ,message: 'product url is required', trigger: 'blur'}
        ],
        product_price: [
          {required: true ,message: 'product url is required', trigger: 'blur'}
        ],
        shipping_fee: [
          {required: true ,message: 'shipping fee is required', trigger: 'blur'}
        ],
        product_img: [
          {required: true ,message: 'product img is required', trigger: 'blur'}
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
          {type: 'date',required: true ,message: 'active date is required', trigger: 'blur'}
        ],
        quantity_per_day: [
          {required: true ,message: 'quantity per day is required', trigger: 'blur'}
        ],
        total_quantity: [
          {required: true ,message: 'total quantity per day is required', trigger: 'blur'}
        ]
      },
      fileList2: [
        { url: 'http://www.ghostxy.top/dealsbank/img/01.png'}, 
        { url: 'http://www.ghostxy.top/dealsbank/img/02.png'}, 
        { url: 'http://www.ghostxy.top/dealsbank/img/03.png'}, 
        { url: 'http://www.ghostxy.top/dealsbank/img/04.png'}, 
        { url: 'http://www.ghostxy.top/dealsbank/img/05.png'}, 
        { url: 'http://www.ghostxy.top/dealsbank/img/01.png'}, 
      ],
      radio: "1",
    }
  },
  mounted () {
    setTimeout(() => {
      console.log($('#summernote').summernote)
      $('#summernote').summernote({
      height: 300,
      // tabsize: 2
      })
      $('#summernote').summernote('code', '<div>初始化设置的内容</div>')
    },10)
   
  },
  methods: {
    getProInfo () {
      console.log("获取产品信息")
    },
    beforeAvatarUploadP () {

    },
    uploadPho () {

    },
    handleRemoveP () {
      
    },
    trialsSave () {
      //获取内容
      var markupStr = $('#summernote').summernote('code')
      //插入内容
       $('#summernote').summernote('code', '<div>aefawe</div>')
      console.log(markupStr)
      // $('#summernote').summernote('insertText', '<div>aefawe</div>');
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
