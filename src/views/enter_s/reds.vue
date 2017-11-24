<template>
  <div class="enter-reds">
    <div class="enter-reds-content">
      <div class="header-text">
        <h3>Become Influencers</h3>
        <p class="header-text-top">After becoming a Influencers, you can apply for Freebies, 
           but also get more promotion 
          commission, you can also issue their own discount coupons</p>
        <p class="header-text-bottom">The following information will be used as an 
          important criterion for review. Please fill in carefully!</p>
      </div>
      <div class="title-s">
        Applicant information
      </div>

      <el-form 
            :model="redsFrom" 
            :rules="rules" 
            ref="redsFrom" 
            label-width="140px" 
            label-position="top"
            class="coupons-form" >
      <el-form-item label="Full name: " prop="full_name" >
        <el-input class="url-input" v-model="redsFrom.full_name" ></el-input>
      </el-form-item>
      <el-form-item label="E-mail: " prop="email" class="item-inline"  >
        <el-input class="url-input" v-model="redsFrom.email"></el-input>
      </el-form-item>
      <el-form-item label="Country: " prop="country" class="item-inline"  >
        <el-select v-model="redsFrom.country">
           <el-option 
            v-for="item in optionsCountry"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Province/State: "  prop="province_state"  class="item-inline"  >
        <el-input class="url-input input-price-fee" v-model="redsFrom.province_state"></el-input>
      </el-form-item>
      <el-form-item label="City/Town: " prop="city_town" class="item-inline"  >
        <el-input class="url-input input-price-fee" v-model="redsFrom.city_town"></el-input>
      </el-form-item>
      <el-form-item label="Street address: " prop="street_address"  >
        <el-input v-model="redsFrom.street_address"></el-input>
      </el-form-item>
      <el-form-item label="Postcode/Zip Code: "  prop="postcode" >
        <el-input v-model="redsFrom.postcode" type="textarea" class="textarea"></el-input>
      </el-form-item>
       <el-form-item label="Daytime Phone: " prop="daytime_phone" >
        <el-input v-model="redsFrom.daytime_phone" type="textarea" class="textarea"></el-input>
      </el-form-item>
      <el-form-item label="Income situation: " required>
        <div id="summernote"></div>
      </el-form-item>
      <div class="title-s">
        Coupon Information
      </div>
      <el-form-item label="Active date: " class="item-inline" prop="active_date"  >
          <el-date-picker
            v-model="redsFrom.active_date"
            type="daterange"
            placeholder="选择日期范围">
          </el-date-picker>
      </el-form-item>
      <el-form-item label="Quantity per day: " class="item-inline1" prop="quantity_per_day" >
        <el-input v-model="redsFrom.quantity_per_day"></el-input>
      </el-form-item>
      <el-form-item label="Type: " class="item-inline1" >
        <el-radio class="radio" v-model="radio" label="1">Unllimited</el-radio>
        <el-radio class="radio" v-model="radio" label="2">Alone</el-radio>
      </el-form-item>
      <el-form-item label="Total quantity: " class="item-inline" prop="total_quantity">
        <el-input v-model="redsFrom.total_quantity"></el-input>
      </el-form-item>
    
    
    </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'enter_reds',
  data () {
    return {
      optionsCountry: [
        {
          'value': '1',
          'label': 'USA'
        }
      ],
      redsFrom: {
        full_name: '',
        email: '',
        country: '',
        province_state: '',
        city_town: '',
        street_address: '',
        postcode: '',
        daytime_phone: '',
        income_situation: '',
        category: '',
        detailed_introduction: '',


        url: 'http://www.baidu.com',
        website: 'amazon',
        price: '123.11',           //decimal  价格
        country: '',         //string 国家
        category_id: "",     // 所属分类 , 是   int
        store_id: '',        // int
        shipping_fee: '1.2',                       //运费
        img: '',                        //产品图片
        title: 'this is trials title', 
        reason: 'this is reason',
        specifications: 'spaecaefaef',
        detais: '<h1>jerry</h1>',
        active_date: '',
        active_date_start: new Date(),
        active_date_end: new Date(),
        quantity_per_day: '10',                //每天上限数量 int
        total_quantity: 1000 ,                 //发行总量
        total_fee: '1234.54',                  //总费用
        is_full_return: "yes",

        api_token: '',
        user_id: undefined,  // 用户ID ， 是，
        user_name: '',       // 发布用户名称， 是
        country: '美国' ,    // 国家  是
      },
      rules: {
        full_name: [
          {required: true ,message: 'product url is required', trigger: 'blur'}
        ],
        email: [
          {required: true ,message: 'product url is required', trigger: 'blur'}
        ],
        country: [
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
      radio: "1",
    }
  },
  methods: {
    trialsSave () {
      //获取内容
      var markupStr = $('#summernote').summernote('code')
      //插入内容
       $('#summernote').summernote('code', '<div>aefawe</div>')
      console.log(markupStr === '<br>')
      // $('#summernote').summernote('insertText', '<div>aefawe</div>');
    }
  },
  mounted () {
    setTimeout(() => {
      $('#summernote').summernote({
      height: 300,
      // tabsize: 2
      })
      $('#summernote').summernote('code', '<div>初始化设置的内容</div>')
    },10)
  }
}
</script>

<style lang="less">
  .enter-reds {
    .enter-reds-content {
      width: 800px;
      margin: 0 auto;
      min-height: 1000px;
      .header-text {
        text-align: center;
        h3 {
          font-size: 26px;
          color: #333;
        }
        .header-text-top {
          font-size: 16px;
          color: #666;
          margin-bottom: 50px;
          width: 80%;
          margin: 0 auto;
        }
        .header-text-bottom {
          font-size: 16px;
          color: #ff0000;
          font-weight: bold;
        }
        .title-s {
          font-size: 16px;
          color: #333;
        }
      }
    }
  }
</style>
