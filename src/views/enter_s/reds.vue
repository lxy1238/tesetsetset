<template>
  <div class="enter-reds">
    <div class="enter-reds-content">
      <div class="title-s">
        Applicant Information
      </div>
      <el-form 
            :model="redsForm" 
            :rules="rules" 
            ref="redsForm" 
            label-width="140px" 
            class="reds-form" >
      <el-form-item label="Full name: " prop="fullname" >
        <el-input class="url-input" v-model="redsForm.fullname" ></el-input>
      </el-form-item>
      <el-form-item label="Email: " prop="email" class="item-inline"  required>
        <el-input class="url-input" v-model="redsForm.email"></el-input>
      </el-form-item>
      <el-form-item label="Country: " prop="country" class="item-inline"  >
        <el-select v-model="redsForm.country" filterable>
           <el-option 
            v-for="item in geolocation"
            :key="item[1]"
            :label="item[1]"
            :value="item[1]">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Daytime phone: " prop="mobile" >
        <el-input v-model="redsForm.mobile"  class="textarea"  ></el-input>
      </el-form-item>
       <el-form-item label="Income situation: " prop="income" >
        <el-select v-model="redsForm.income" filterable>
           <el-option 
            v-for="item in optionIncome"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Organization: "  class="item-inline1" required>
        <el-radio class="radio" v-model="redsForm.operation" label="Team">Team</el-radio>
        <el-radio class="radio" v-model="redsForm.operation" label="Personal">Personal</el-radio>
      </el-form-item>
      <el-form-item label="Introduction: " class="item-inline"  prop="introduction" required>
        <el-input v-model="redsForm.introduction" type="textarea" :rows="6"></el-input>
      </el-form-item>
     
     
        <div class="title-s title-xs">
          Areas of Interest
        </div>
         <ul class="experitse-items clearfix">
           <li v-for="item in expertiseList" 
               :class="{active: item.isSelected}"
               @click="selectedExpertise(item)">{{item.text}}
           </li>
         </ul>

      <div class="title-s title-xs">
         Resources and Channels
        </div>
      <el-form-item  class="resources-channels" label-width="0px" >
        <div class="resources-channels-item"  v-for="item in channelsLists">
          <div class="top">
            <div class="channels" v-if="item.imgUrl">
              <img :src="item.imgUrl" alt=""> 
              <span class="channel-name"> {{item.channel_name}}</span>
            </div>
            <div class="channel" v-else >
              <label for="">Channel name:</label>
              <el-input type="text"  size="mini" v-model="item.name"></el-input>
            </div>
            <div class="fans-number">
              <label for="">Number of fans:</label>
              <el-input type="text"  size="mini" v-model="item.fans"  @keyup.native="filterNumber1(item)"></el-input>
            </div>
          </div>
          <div class="bottom">
             <label for="">Proof link: </label>
            <el-input type="text"  size="mini" v-model="item.url"></el-input>
          </div>
        </div>
        <div class="channels-add-more" @click="addMoreChannel">
          Add Channels <i class=" el-icon-plus"></i>
        </div>
      </el-form-item>
      <div class="submit-btn">
        <el-button type="button" @click="submit" :loading="btnLoading">Submit</el-button>
      </div>
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
        return callback(new Error('Please enter Email'))
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
      redsForm: {
        api_token: getToken(),
        user_id: getUserId(),
        email: getEmail(),
        fullname: '',
        country: '',
        mobile: '',
        income: '',
        operation: 'Team',
        introduction: '',
        specialty: [],
        channels: []
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
        postcode: [
          {required: true ,message: 'Please enter post code.', trigger: 'blur'}
        ],
        mobile: [
          {required: true ,message: 'Please enter your phone number.', trigger: 'blur'}
        ],
        income: [
          {required: true ,message: 'Please enter income situation.', trigger: 'blur'}
        ],
        introduction: [
          {required: true, message: 'The introduction is required.', trigger: 'blur'}
        ]
      },
      expertiseList : [
        {
          text: 'Makeup / Personal Care',
          isSelected: true
        },
        {
          text: 'Housewear & Furnishings',
          isSelected: false
        },
        {
          text: 'Outdoor sport',
          isSelected: false
        },
        {
          text: 'DVD / Music / Game',
          isSelected: false
        },
        {
          text: 'Car Accessories / Tools',
          isSelected: false
        },
        {
          text: 'Electronic product',
          isSelected: false
        },
        {
          text: 'Books',
          isSelected: false
        },
        {
          text: 'Footwear / Apparel',
          isSelected: false
        },
        {
          text: 'Toy',
          isSelected: false
        },
      ],
      channelsLists: [
        {
          imgUrl: require('../../assets/reds-facebook.png'),
          channel_name: 'Facebook',
          fans: '',
          url: '',
        },
        {
          imgUrl: require('../../assets/reds-tiwwer.png'),
          channel_name: 'Twitter',
          fans: '',
          url: '',
        },
        {
          imgUrl: require('../../assets/reds-youtube.png'),
          channel_name: 'Youtube',
          fans: '',
          url: '',
        },
        {
          imgUrl: require('../../assets/reds-pinterest.png'),
          channel_name: 'Pinterest',
          fans: '',
          url: '',
        },
        {
          imgUrl: require('../../assets/reds-instagram.png'),
          channel_name: 'Instagram',
          fans: '',
          url: '',
        },
        {
          imgUrl: require('../../assets/reds-vk.png'),
          channel_name: 'VK',
          fans: '',
          url: '',
        },
      ],
      channelsListData: {
        channel_name: '',
        fans: '',
        url: '',
      },
      optionIncome: [
        'Less than $1,000',
        '$1,000 ~ $3,000',
        '$3,000 ~ $5,000',
        '$5,000 ~ $8,000',
        '$8,000 ~ 10,000',
        'More than $10,000'
      ],
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
      btnLoading: false,
    }
  },

  methods: {
    selectedExpertise (item) {
      this.getSelectedExpertiseArr()
      if (this.redsForm.specialty.length === 1 && item.isSelected) {
        return
      }
      item.isSelected = !item.isSelected
    },
    addMoreChannel () {
      this.channelsLists.push({
        channel_name: '',
        fans: '',
        url: '',
      })
    },
    getSelectedExpertiseArr () {
      this.redsForm.specialty = []
      this.expertiseList.forEach((e) => {
        if (e.isSelected === true) {
          this.redsForm.specialty.push(e.text)
        } 
      })
    },
    getChannelArr () {
      this.redsForm.channels = [],
      this.channelsLists.forEach((e) => {
        if (e.imgUrl) {
          if (e.fans && e.url) {
            this.redsForm.channels.push(e)
          }
        } else if (e.name && e.fans && e.url) {
          this.redsForm.channels.push(e)
        }
      })
      if (this.redsForm.channels.length === 0){
        this.$snotify.error('Submit Failed! Fill in at least one promotion channel!')
        return false
      }
      return true
    },
    submit () {
      if (!this.isLogin()) {
        this.$snotify.error('Submit Failed! Please log in first.')
        return
      }
      this.$refs['redsForm'].validate((valid) => {
        if(valid) {
          this.btnLoading = true
          this.getSelectedExpertiseArr()
          this.getChannelArr()
          this.$api.applyCelebritys(this.redsForm).then(res => {
            this.btnLoading = false
            if (res.code === 200) {
              this.$snotify.success('Submit success, please wait for the result of the audit.')
              this.$router.push({path: '/personal/member/index'})
            }
          }).catch(err => {
            if (err.message === 'validation.phone') {
              this.$snotify.error('Submit Failed! Invalid phone.')
            }
            this.btnLoading = false
          })
        } else {
          console.log('submit error')
        }
      })
    },
    //只能输入电话
    filterNumber () {
      this.redsForm.mobile = this.redsForm.mobile.replace(/[^0-9-]+/g, '')
    },
    filterNumber1 (item) {
      item.fans = item.fans.replace(/\D+/g, '')
    },
    //判断是否登录，否则提醒请登录
    isLogin () {
      if (!getToken()) {
        return false
      } else {
        return true
      }
    },
  },
  mounted () {
    if (!this.isLogin()) {
      this.$router.push({path: '/opration-err/index', query:{apply: 'influence'}})
      return
    }
  }
}
</script>

<style lang="less" >
@import url('../../styles/mixin.less');
 .title-s {
    width: 1100px;
  }
  .enter-reds {
    padding-bottom: 40px;
    .enter-reds-content {
      width: 800px;
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
      }
    }
    .reds-form {
      .experitse-items {
        width: 102%;
        li {
          width: 31.29%;
          float: left;
          margin-right: 2.04%;
          margin-bottom: 30px;
          line-height: 30px;
          height: 30px;
          border: 1px solid #a0a0a0;
          text-align: center;
          color: #666;
          font-size: 16px;
          cursor: pointer;
          &.active {
            color: white;
            background: #0072bc;
          }
        }
      }
      .resources-channels {
        .resources-channels-item {
          width: 100%;
          height: 90px;
          background: #f2f2f2;
          color: #666;
          font-size: 13px;
          padding: 6px 10px 0 10px;
          margin-bottom: 18px;
          .top {
            height: 35px;
            margin-bottom: 8px;
            .channels {
              float: left;

              img {
                float: left;
                width: 32px;
                height: 32px;
                margin-right: 10px;
              }
            }
            .channel {
              float: left;
              width: 60%;
              .el-input {
                width: 60%;
              }
            }
            .fans-number {
               display: inline-block;
               float: right;
               .el-input {
                  width: 58%;
                  float: right;
                  margin-right: 3%;
               }
            }
          }
          .bottom {
            label {
              float: left;
            }
            .el-input {
              float: right;
              width: 91%;
              margin-right: 8px;
            }
          }
        }
        .channels-add-more {
          height: 54px;
          line-height: 54px;
          text-align: center;
          background: #f2f2f2;
          font-size: 24px;
          color: #333;
          cursor: pointer;
        }
      }
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
