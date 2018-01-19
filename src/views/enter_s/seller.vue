<template>
  <div class="enter-reds">
    <div class="enter-reds-content">
      <div class="title-s">
        Contact Information
      </div>
      <el-form 
            :model="sellerForm" 
            :rules="rules" 
            ref="sellerForm" 
            label-width="140px" 
            class="reds-form" >
      <el-form-item label="Full name: " prop="fullname" >
        <el-input class="url-input" v-model="sellerForm.fullname" ></el-input>
      </el-form-item>
      <el-form-item label="Email: " prop="email" class="item-inline"  required>
        <el-input class="url-input" v-model="sellerForm.email"></el-input>
      </el-form-item>
      <el-form-item label="Street address: " prop="addr"  >
        <el-input v-model="sellerForm.addr"></el-input>
      </el-form-item>
      <el-form-item label="City/Town: " prop="city" class="item-inline"  >
        <el-input class="url-input input-price-fee" v-model="sellerForm.city"></el-input>
      </el-form-item>
      <el-form-item label="Province/State: "  prop="province"  class="item-inline"  >
        <el-input class="url-input input-price-fee" v-model="sellerForm.province"></el-input>
      </el-form-item>
      <el-form-item label="Country: " prop="country" class="item-inline"  >
        <el-select v-model="sellerForm.country" filterable>
           <el-option 
            v-for="item in geolocation"
            :key="item[1]"
            :label="item[1]"
            :value="item[1]">
          </el-option>
        </el-select>
      </el-form-item>
   
      <el-form-item label="Post code: "  prop="postal" >
        <el-input v-model="sellerForm.postal"  class="textarea" ></el-input>
      </el-form-item>
       <el-form-item label="Phone: " prop="mobile" >
        <el-input v-model="sellerForm.mobile"  class="textarea"  @keyup.native="filterNumber"></el-input>
      </el-form-item>
   
      <div class="title-s">
        Store Information
      </div>
       <el-form-item label="Website: " prop="platform" class="item-inline"  >
        <el-select v-model="sellerForm.platform" filterable >
           <el-option 
            v-for="item in optionsWebsite"
            :key="item.url"
            :label="item.url"
            :value="item.url">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Store ID: " class="item-inline"  prop="store_id">
        <el-input v-model="sellerForm.store_id" type="text" ></el-input>
      </el-form-item>
        <el-form-item label="Store name: " class="item-inline"  prop="store_name">
        <el-input v-model="sellerForm.store_name" type="text" ></el-input>
      </el-form-item>
        <el-form-item label="Store URL: " class="item-inline"  prop="store_url">
        <el-input v-model="sellerForm.store_url" type="text" ></el-input>
      </el-form-item>
      <el-form-item class="submit-btn">
        <el-button type="button" @click="submit" :loading="btnLoading">Submit</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
import { getToken, getUserId, getEmail } from '@/utils/auth'
import { validateEmail } from '@/utils/validate.js'
export default {
  name: 'enter_reds',
  data () {
    const validateEmailRule =  (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please enter Email.'))
      } else if (!validateEmail(value)) {
        return callback(new Error('Invalid Email format.'))
      } else {
        callback()
      }
    }
    return {
      optionsCountry: [
        {
          'value': '1',
          'label': 'USA'
        }
      ],
      ownedPlatformLists: [
        {
          'value': '1',
          'label': 'www.amazon.com'
        }
      ],
      sellerForm: {
        api_token: getToken(),
        user_id: getUserId(),
        fullname: '',
        email: getEmail(),
        country: '',
        province: '',
        city: '',
        addr: '',
        postal: '',
        mobile: '',
        category: '',
        detailed_introduction: '',
        platform: '',
        store_id: '',
        store_name: '',
        store_url:  ''
     
      },
      rules: {
        fullname: [
          {required: true ,message: 'Please enter full name.', trigger: 'blur'}
        ],
        email: [
          {validator: validateEmailRule, trigger: 'blur'}
        ],
        country: [
          {required: true ,message: 'Please select your country.', trigger: 'blur'}
        ],
        province: [
          {required: true ,message: 'Please enter province name.', trigger: 'blur'}
        ],
        city: [
          {required: true ,message: 'Please enter city name.', trigger: 'blur'}
        ],
        addr: [
          {required: true ,message: 'Please enter street address.', trigger: 'blur'}
        ],
        postal: [
          {required: true ,message: 'Please enter post code.', trigger: 'blur'}
        ],
        mobile: [
          {required: true ,message: 'Please enter your phone number.', trigger: 'blur'}
        ],
        store_id: [
          {required: true ,message: 'Please enter store ID.', trigger: 'blur'}
        ],
        store_name: [
          {required: true ,message: 'Please enter store name.', trigger: 'blur'}
        ],
        store_url: [
          {required: true ,message: 'Please enter store URL.', trigger: 'blur'}
        ],
        platform: [
          {required: true ,message: 'Please select website.', trigger: 'blur'}
        ],
      },
      geolocation: [   
        ['AO', 'Angola'],   
        ['AF', 'Afghanistan'],   
        ['AL', 'Albania'],   
        ['DZ', 'Algeria'],   
        ['AD', 'Andorra'],   
        ['AI', 'Anguilla'],   
        ['AG', 'Barbuda Antigua'],   
        ['AR', 'Argentina'],   
        ['AM', 'Armenia'],   
        ['AU', 'Australia'],   
        ['AT', 'Austria'],   
        ['AZ', 'Azerbaijan'],   
        ['BS', 'Bahamas'],   
        ['BH', 'Bahrain'],   
        ['BD', 'Bangladesh'],   
        ['BB', 'Barbados'],   
        ['BY', 'Belarus'],   
        ['BE', 'Belgium'],   
        ['BZ', 'Belize'],   
        ['BJ', 'Benin'],   
        ['BM', 'Bermuda Is.'],   
        ['BO', 'Bolivia'],   
        ['BW', 'Botswana'],   
        ['BR', 'Brazil'],   
        ['BN', 'Brunei'],   
        ['BG', 'Bulgaria'],   
        ['BF', 'Burkina-faso'],   
        ['MM', 'Burma'],   
        ['BI', 'Burundi'],   
        ['CM', 'Cameroon'],   
        ['CA', 'Canada'],   
        ['CF', 'Central African Republic'],   
        ['TD', 'Chad'],   
        ['CL', 'Chile'],   
        ['CN', 'China'],   
        ['CO', 'Colombia'],   
        ['CG', 'Congo'],   
        ['CK', 'Cook Is.'],   
        ['CR', 'Costa Rica'],   
        ['CU', 'Cuba'],   
        ['CY', 'Cyprus'],   
        ['CZ', 'Czech Republic'],   
        ['DK', 'Denmark'],   
        ['DJ', 'Djibouti'],   
        ['DO', 'Dominica Rep.'],   
        ['EC', 'Ecuador'],   
        ['EG', 'Egypt'],   
        ['SV', 'EI Salvador'],   
        ['EE', 'Estonia'],   
        ['ET', 'Ethiopia'],   
        ['FJ', 'Fiji'],   
        ['FI', 'Finland'],   
        ['FR', 'France'],   
        ['GF', 'French Guiana'],   
        ['GA', 'Gabon'],   
        ['GM', 'Gambia'],   
        ['GE', 'Georgia'],   
        ['DE', 'Germany'],   
        ['GH', 'Ghana'],   
        ['GI', 'Gibraltar'],   
        ['GR', 'Greece'],   
        ['GD', 'Grenada'],   
        ['GU', 'Guam'],   
        ['GT', 'Guatemala'],   
        ['GN', 'Guinea'],   
        ['GY', 'Guyana'],   
        ['HT', 'Haiti'],   
        ['HN', 'Honduras'],   
        ['HK', 'Hongkong'],   
        ['HU', 'Hungary'],   
        ['IS', 'Iceland'],   
        ['IN', 'India'],   
        ['ID', 'Indonesia'],   
        ['IR', 'Iran'],   
        ['IQ', 'Iraq'],   
        ['IE', 'Ireland'],   
        ['IL', 'Israel'],   
        ['IT', 'Italy'],   
        ['JM', 'Jamaica'],   
        ['JP', 'Japan'],   
        ['JO', 'Jordan'],   
        ['KH', 'Kampuchea (Cambodia )'],   
        ['KZ', 'Kazakstan'],   
        ['KE', 'Kenya'],   
        ['KR', 'Korea'],   
        ['KW', 'Kuwait'],   
        ['KG', 'Kyrgyzstan'],   
        ['LA', 'Laos'],   
        ['LV', 'Latvia'],   
        ['LB', 'Lebanon'],   
        ['LS', 'Lesotho'],   
        ['LR', 'Liberia'],   
        ['LY', 'Libya'],   
        ['LI', 'Liechtenstein'],   
        ['LT', 'Lithuania'],   
        ['LU', 'Luxembourg'],   
        ['MO', 'Macao'],   
        ['MG', 'Madagascar'],   
        ['MW', 'Malawi'],   
        ['MY', 'Malaysia'],   
        ['MV', 'Maldives'],   
        ['ML', 'Mali'],   
        ['MT', 'Malta'],   
        ['MU', 'Mauritius'],   
        ['MX', 'Mexico'],   
        ['MD', 'Moldova'],   
        ['MC', 'Monaco'],   
        ['MN', 'Mongolia'],   
        ['MS', 'Montserrat Is.'],   
        ['MA', 'Morocco'],   
        ['MZ', 'Mozambique'],   
        ['NA', 'Namibia'],   
        ['NR', 'Nauru'],   
        ['NP', 'Nepal'],   
        ['NL', 'Netherlands'],   
        ['NZ', 'New Zealand'],   
        ['NI', 'Nicaragua'],   
        ['NE', 'Niger'],   
        ['NG', 'Nigeria'],   
        ['KP', 'North Korea'],   
        ['NO', 'Norway'],   
        ['OM', 'Oman'],   
        ['PK', 'Pakistan'],   
        ['PA', 'Panama'],   
        ['PG', 'Papua New Cuinea'],   
        ['PY', 'Paraguay'],   
        ['PE', 'Peru'],   
        ['PH', 'Philippines'],   
        ['PL', 'Poland'],   
        ['PF', 'French Polynesia'],   
        ['PT', 'Portugal'],   
        ['PR', 'Puerto Rico'],   
        ['QA', 'Qatar'],   
        ['RO', 'Romania'],   
        ['RU', 'Russia'],   
        ['LC', 'Saint Lueia'],   
        ['VC', 'Saint Vincent'],   
        ['SM', 'San Marino'],   
        ['ST', 'Sao Tome and Principe'],   
        ['SA', 'Saudi Arabia'],   
        ['SN', 'Senegal'],   
        ['SC', 'Seychelles'],   
        ['SL', 'Sierra Leone'],   
        ['SG', 'Singapore'],   
        ['SK', 'Slovakia'],   
        ['SI', 'Slovenia'],   
        ['SB', 'Solomon Is.'],   
        ['SO', 'Somali'],   
        ['ZA', 'South Africa'],   
        ['ES', 'Spain'],   
        ['LK', 'Sri Lanka'],   
        ['SD', 'Sudan'],   
        ['SR', 'Suriname'],   
        ['SZ', 'Swaziland'],   
        ['SE', 'Sweden'],   
        ['CH', 'Switzerland'],   
        ['SY', 'Syria'],   
        ['TW', 'Taiwan'],   
        ['TJ', 'Tajikstan'],   
        ['TZ', 'Tanzania'],   
        ['TH', 'Thailand'],   
        ['TG', 'Togo'],   
        ['TO', 'Tonga'],   
        ['TT', 'Trinidad and Tobago'],   
        ['TN', 'Tunisia'],   
        ['TR', 'Turkey'],   
        ['TM', 'Turkmenistan'],   
        ['UG', 'Uganda'],   
        ['UA', 'Ukraine'],   
        ['AE', 'United Arab Emirates'],   
        ['GB', 'United Kiongdom'],   
        ['US', 'United States of America'],   
        ['UY', 'Uruguay'],   
        ['UZ', 'Uzbekistan'],   
        ['VE', 'Venezuela'],   
        ['VN', 'Vietnam'],   
        ['YE', 'Yemen'],   
        ['YU', 'Yugoslavia'],   
        ['ZW', 'Zimbabwe'],   
        ['ZR', 'Zaire'],   
        ['ZM', 'Zambia']   
      ],
      optionsWebsite: [],
      reqPlatformData: {
        api_token: getToken(),
        user_id: getUserId()
      },
      btnLoading: false,
    }
  },
  methods: {
    init () {
      if (!this.isLogin()) {
        this.$router.push({path: '/opration-err/index'})
        return
      }
      this.getPlatformCateInfo()
    },
    submit () {
      this.$refs['sellerForm'].validate((valid) => {
        if(valid) {
          if (!this.isLogin()) {
            this.$snotify.error('Submit Failed! Please log in first.')
            return
          }
          this.btnLoading = true
          this.$api.applyMerchant(this.sellerForm).then(res => {
            this.btnLoading = false
            if (res.code === 200) {
              this.$snotify.success('Submit Successfully! please wait for the result of the audit.')
              this.$refs['sellerForm'].resetFields()
              this.$router.push({path: '/personal/member/index'})
            }
          }).catch(err => {
            if (err.message === 'validation.phone') {
              this.$snotify.error('Submit Failed! Invalid phone.')
            } else {
              this.$snotify.error(err.message)
            }
            this.btnLoading = false
          })
        } else {
          console.log('submit error')
        }
      })
    },

    //平台初始化
    getPlatformCateInfo () {
      this.$api.getPlatformCate(this.reqPlatformData).then(res => {
        this.optionsWebsite = res.data
      })
    },
    websiteChange (id) {
      for (let i of this.optionsWebsite) {
        if (i.id == id) {
          this.addStoreForm.country_id = i.country_id
        }
      } 
    },
    //判断是否登录，否则提醒请登录
    isLogin () {
      if (!getToken()) {
        return false
      } else {
        return true
      }
    },

    //只能输入电话
    filterNumber () {
      this.sellerForm.mobile = this.sellerForm.mobile.replace(/[^0-9-]+/g, '')
      this.sellerForm.postal = this.sellerForm.postal.replace(/[^0-9-]+/g, '')
    }
  },
  mounted () {
    this.init()
  },
}
</script>

<style lang="less" scoped>
@import url('../../styles/mixin.less');
  .title-s {
    width: 1100px;
  }
  .enter-reds {
    .enter-reds-content {
      width: 800px;
      min-height: 1000px;
      margin-top: 130px;
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
    .reds-form {
      .submit-btn {
        text-align: center;
        button {
          .btn-h(150px, 42px, #84bb39, #84bb39, #fff);
          &:active {
            background: darken(#84bb39, 10%);
            border-color: darken(#84bb39, 10%);
          }
        }
      }
    }
  }
</style>
