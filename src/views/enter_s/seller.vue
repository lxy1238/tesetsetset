<template>
  <div class="enter-reds">
    <div class="enter-reds-content">
      <div class="header-text">
        <h3>Become Merchant</h3>
        <p class="header-text-top">Become a merchant, you can release discount coupons and trial products</p>
        <p class="header-text-bottom">The following information will be used as an 
          important criterion for review. Please fill in carefully!</p>
      </div>
      <div class="title-s">
        Applicant information
      </div>

      <el-form 
            :model="sellerForm" 
            :rules="rules" 
            ref="sellerForm" 
            label-width="140px" 
            label-position="top"
            class="reds-form" >
      <el-form-item label="Full name: " prop="full_name" >
        <el-input class="url-input" v-model="sellerForm.full_name" ></el-input>
      </el-form-item>
      <el-form-item label="E-mail: " prop="email" class="item-inline"  >
        <el-input class="url-input" v-model="sellerForm.email"></el-input>
      </el-form-item>
      <el-form-item label="Country: " prop="country" class="item-inline"  >
        <el-select v-model="sellerForm.country">
           <el-option 
            v-for="item in optionsCountry"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Province/State: "  prop="province_state"  class="item-inline"  >
        <el-input class="url-input input-price-fee" v-model="sellerForm.province_state"></el-input>
      </el-form-item>
      <el-form-item label="City/Town: " prop="city_town" class="item-inline"  >
        <el-input class="url-input input-price-fee" v-model="sellerForm.city_town"></el-input>
      </el-form-item>
      <el-form-item label="Street address: " prop="street_address"  >
        <el-input v-model="sellerForm.street_address"></el-input>
      </el-form-item>
      <el-form-item label="Postcode/Zip Code: "  prop="postcode" >
        <el-input v-model="sellerForm.postcode"  class="textarea"></el-input>
      </el-form-item>
       <el-form-item label="Daytime Phone: " prop="daytime_phone" >
        <el-input v-model="sellerForm.daytime_phone"  class="textarea" placeholder="+86"></el-input>
      </el-form-item>
       <!-- <el-form-item label="Income situation: " prop="income_situation" >
        <el-input v-model="sellerForm.income_situation" class="textarea" placeholder="$"></el-input>
      </el-form-item> -->
      <div class="title-s">
        Media information
      </div>
       <el-form-item label="Country: " prop="owned_platform" class="item-inline"  >
        <el-select v-model="sellerForm.owned_platform">
           <el-option 
            v-for="item in ownedPlatformLists"
            :key="item.value"
            :label="item.label"
            :value="item.value">
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
      ownedPlatformLists: [
        {
          'value': '1',
          'label': 'www.amazon.com'
        }
      ],
      sellerForm: {
        full_name: 'awef',
        email: 'awef',
        country: 'awef',
        province_state: 'awef',
        city_town: 'awef',
        street_address: 'awef',
        postcode: 'awef',
        daytime_phone: 'awef',
        income_situation: 'awef',
        category: 'Team',
        detailed_introduction: 'awef',
        owned_platform: 'aewf',
        store_id: 'awef',
        store_name: 'awef',
        store_url:  'awef'
     
      },
      rules: {
        full_name: [
          {required: true ,message: 'full name required', trigger: 'blur'}
        ],
        email: [
          {required: true ,message: 'email is required', trigger: 'blur'}
        ],
        country: [
          {required: true ,message: 'country  is required', trigger: 'blur'}
        ],
        province_state: [
          {required: true ,message: 'province/stateis required', trigger: 'blur'}
        ],
        city_town: [
          {required: true ,message: 'city/town title is required', trigger: 'blur'}
        ],
        street_address: [
          {required: true ,message: 'street address is required', trigger: 'blur'}
        ],
        postcode: [
          {required: true ,message: 'postcode is required', trigger: 'blur'}
        ],
        daytime_phone: [
          {required: true ,message: 'daytime phone  is required', trigger: 'blur'}
        ],
        income_situation: [
          {required: true ,message: 'income situation is required', trigger: 'blur'}
        ],
        store_id: [
          {required: true ,message: 'Store ID is required', trigger: 'blur'}
        ],
        store_name: [
          {required: true ,message: 'Store name required', trigger: 'blur'}
        ],
        store_url: [
          {required: true ,message: 'Store URL is required', trigger: 'blur'}
        ],
        owned_platform: [
          {required: true ,message: 'owned platform quantity per day is required', trigger: 'blur'}
        ],
      },
    }
  },
  methods: {
    submit () {
      this.$refs['sellerForm'].validate((valid) => {
        if(valid) {
          console.log(this.sellerForm)
        } else {
          console.log('submit error')
        }
      })
    },
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
