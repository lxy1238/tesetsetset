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
            :model="redsForm" 
            :rules="rules" 
            ref="redsForm" 
            label-width="140px" 
            label-position="top"
            class="reds-form" >
      <el-form-item label="Full name: " prop="full_name" >
        <el-input class="url-input" v-model="redsForm.full_name" ></el-input>
      </el-form-item>
      <el-form-item label="E-mail: " prop="email" class="item-inline"  >
        <el-input class="url-input" v-model="redsForm.email"></el-input>
      </el-form-item>
      <el-form-item label="Country: " prop="country" class="item-inline"  >
        <el-select v-model="redsForm.country">
           <el-option 
            v-for="item in optionsCountry"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Province/State: "  prop="province_state"  class="item-inline"  >
        <el-input class="url-input input-price-fee" v-model="redsForm.province_state"></el-input>
      </el-form-item>
      <el-form-item label="City/Town: " prop="city_town" class="item-inline"  >
        <el-input class="url-input input-price-fee" v-model="redsForm.city_town"></el-input>
      </el-form-item>
      <el-form-item label="Street address: " prop="street_address"  >
        <el-input v-model="redsForm.street_address"></el-input>
      </el-form-item>
      <el-form-item label="Postcode/Zip Code: "  prop="postcode" >
        <el-input v-model="redsForm.postcode"  class="textarea"></el-input>
      </el-form-item>
       <el-form-item label="Daytime Phone: " prop="daytime_phone" >
        <el-input v-model="redsForm.daytime_phone"  class="textarea" placeholder="+86"></el-input>
      </el-form-item>
       <el-form-item label="Income situation: " prop="income_situation" >
        <el-input v-model="redsForm.income_situation" class="textarea" placeholder="$"></el-input>
      </el-form-item>
      <div class="title-s">
        Media information
      </div>
      <el-form-item label="Areas of expertise" class="item-inline"   >
         <ul class="experitse-items clearfix">
           <li v-for="item in expertiseList" 
               :class="{active: item.isSelected}"
               @click="selectedExpertise(item)">{{item.text}}
           </li>
         </ul>
      </el-form-item>
      <el-form-item label="Category: "  class="item-inline1" >
        <el-radio class="radio" v-model="redsForm.category" label="Team">Team</el-radio>
        <el-radio class="radio" v-model="redsForm.category" label="Personal">Personal</el-radio>
      </el-form-item>
      <el-form-item label="Detailed introduction: " class="item-inline"  prop="detailed_introduction">
        <el-input v-model="redsForm.detailed_introduction" type="textarea" :rows="6"></el-input>
      </el-form-item>
      <el-form-item label="Resources and channels:"  class="resources-channels" >
        <div class="resources-channels-item"  v-for="item in channelsLists">
          <div class="top">
            <div class="channels" v-if="item.imgUrl">
              <img :src="item.imgUrl" alt=""> 
              <span class="channel-name"> {{item.name}}</span>
            </div>
            <div class="channel" v-else >
              <label for="">Channel name</label>
              <el-input type="text"  size="mini" v-model="item.name"></el-input>
            </div>
            <div class="fans-number">
              <label for="">Number of fans</label>
              <el-input type="text"  size="mini" v-model="item.fansNum" placeholder="please enter a number" @blur="filterNum(item)"></el-input>
            </div>
          </div>
          <div class="bottom">
             <label for="">Proof link</label>
            <el-input type="text"  size="mini" v-model="item.proofLink"></el-input>
          </div>
        </div>
        <div class="channels-add-more" @click="addMoreChannel">
          Add more channels <i class=" el-icon-plus"></i>
        </div>
      </el-form-item>
      <el-form-item class="submit-btn">
        <button type="button" @click="submit">Submit</button>
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
      redsForm: {
        full_name: 'ghost',
        email: '123@qq.com',
        country: 'USA',
        province_state: 'amazon',
        city_town: 'awef',
        street_address: 'awef',
        postcode: 'awef',
        daytime_phone: 'awef',
        income_situation: 'awef',
        category: 'Team',
        detailed_introduction: 'aewf',
        expertises: [],
        channels: []
      },
      rules: {
        full_name: [
          {required: true ,message: 'Full Name  is required', trigger: 'blur'}
        ],
        email: [
          {required: true ,message: 'Email  is required', trigger: 'blur'}
        ],
        country: [
          {required: true ,message: 'Country  is required', trigger: 'blur'}
        ],
        province_state: [
          {required: true ,message: 'Province/State  is required', trigger: 'blur'}
        ],
        city_town: [
          {required: true ,message: 'City/Town  is required', trigger: 'blur'}
        ],
        street_address: [
          {required: true ,message: 'Street address is required', trigger: 'blur'}
        ],
        postcode: [
          {required: true ,message: 'Postcode/Zip Code is required', trigger: 'blur'}
        ],
        daytime_phone: [
          {required: true ,message: 'Daytime phone date is required', trigger: 'blur'}
        ],
        income_situation: [
          {required: true ,message: 'Income situation per day is required', trigger: 'blur'}
        ],
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
          name: 'Facebook',
          fansNum: '',
          proofLink: '',
        },
        {
          imgUrl: require('../../assets/reds-tiwwer.png'),
          name: 'Twitter',
          fansNum: '',
          proofLink: '',
        },
        {
          imgUrl: require('../../assets/reds-youtube.png'),
          name: 'Youtube',
          fansNum: '',
          proofLink: '',
        },
        {
          imgUrl: require('../../assets/reds-pinterest.png'),
          name: 'Pinterest',
          fansNum: '',
          proofLink: '',
        },
        {
          imgUrl: require('../../assets/reds-instagram.png'),
          name: 'Instagram',
          fansNum: '',
          proofLink: '',
        },
        {
          imgUrl: require('../../assets/reds-vk.png'),
          name: 'VK',
          fansNum: '',
          proofLink: '',
        },
      ],
      channelsListData: {
        name: '',
        fansNum: '',
        proofLink: '',
      }
    }
  },
  methods: {
    selectedExpertise (item) {
      item.isSelected = !item.isSelected
    },
    addMoreChannel () {
      this.channelsLists.push({
        name: '',
        fansNum: '',
        proofLink: '',
      })
    },
    getSelectedExpertiseArr () {
      this.redsForm.expertises = []
      this.expertiseList.forEach((e) => {
        if (e.isSelected === true) {
          this.redsForm.expertises.push(e.text)
        } 
      })
    },
    getChannelArr () {
      this.redsForm.channels = [],
      this.channelsLists.forEach((e) => {
        if (e.imgUrl) {
          if (e.fansNum && e.proofLink) {
            this.redsForm.channels.push(e)
          }
        } else if (e.name && e.fansNum && e.proofLink) {
          this.redsForm.channels.push(e)
        }
      })
      if (this.redsForm.channels.length === 0){
        this.$notify.error('至少填写一个推广通道')
      }
    },
    submit () {
      this.$refs['redsForm'].validate((valid) => {
        if(valid) {
          this.getSelectedExpertiseArr()
          this.getChannelArr()
          console.log(this.redsForm, this.channelsLists)
        } else {
          console.log('submit error')
        }
      })
    },
    filterNum (item) {
      let reg = /^[0-9]+$/
      if (!reg.test(item.fansNum)) {
        item.fansNum = ''
      }
    }
  },
  mounted () {
  
  }
}
</script>

<style lang="less" scoped>
@import url('../../styles/mixin.less');
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
            background: #31383e;
          }
        }
      }
      .resources-channels {
        .resources-channels-item {
          width: 100%;
          height: 90px;
          background: #f2f2f2;
          color: #666;
          font-size: 16px;
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
                 width: 57%;
               }
            }
          }
          .bottom {
            label {
              float: left;
            }
            .el-input {
              float: right;
              width: 88%;
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
