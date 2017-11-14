<template>
  <div class="posted-coupons">
    <template v-if="!gotoAddPage">
       <div class="pro-header">
        <h3 class="title">Coupons Trials</h3>
      </div>
      <div class="search-form">
        <label for="title">
          Title: 
        </label>
        <input class=" form-control-bootstrap"  type="text" name="title" id="" />
        <label for="title">
          Title: 
        </label>
        <select name="" class=" form-control-bootstrap">
          <option value="">awfeae</option>
          <option value="">awefaef</option>
          <option value="">afae</option>
        </select>

        <label for="title" >
          Title: 
        </label>
        <select name="" class=" form-control-bootstrap">
          <option value="">awfeae</option>
          <option value="">awefaef</option>
          <option value="">afae</option>
        </select>

        <button class="search">Search</button>

        <button class="add-coupons" @click="add"><i class="el-icon-plus"></i> Add</button>
      </div>
      <div class="table-box">
        <table class="table-self">
          <thead>
            <tr>
              <th v-for="item in thLists">awef</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in trLists">
              <td>aewf</td>
              <td>aewf</td>
              <td>aewf</td>
            </tr>
          </tbody>
        </table>
      </div>
      <pagination class="coupons-pagination"
        :allpage="allpage"
        :show-item="showItem"
        @handlecurrent="test">
      </pagination>
     <button @click="test1">test1</button>
     <button @click="test2">test2</button>
    </template>
   <template v-else>
     <div class="title">
       Add Coupons
    </div>
    <div class="title-s">
      Product Information
    </div>
    <el-form :model="couponsForm" :rules="rules" ref="couponsForm" label-width="140px" class="coupons-form" >
      <el-form-item label="Product URL: " prop="name" required="">
        <el-input class="url-input"></el-input>
        <button class="get-pro-info"  type="button" @click="getProInfo">get</button>
      </el-form-item>
      <el-form-item label="Wedsite: " prop="" class="item-inline" required="">
        <el-select></el-select>
      </el-form-item>
      <el-form-item label="Category: " prop="" class="item-inline" required="">
        <el-select></el-select>
      </el-form-item>
      <el-form-item label="List price: " prop="" class="item-inline" required="">
        <el-select></el-select>
      </el-form-item>
      <el-form-item label="Shipping fee: " prop="" class="item-inline" required="">
        <el-select></el-select>
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
      <el-form-item label="Title: " prop="" required="">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="Reason: " prop="" required="">
        <el-input type="textarea" class="textarea"></el-input>
      </el-form-item>
       <el-form-item label="Specifications: " prop="" required="">
        <el-input type="textarea" class="textarea"></el-input>
      </el-form-item>
      <el-form-item label="Coupon code: " required>
        <div id="summernote"></div>
      </el-form-item>
      <div class="title-s">
        Coupon Information
      </div>
      <el-form-item label="Valid date: " class="item-inline" required >
        <el-date-picker size="large" placeholder="Please select the date"></el-date-picker>
      </el-form-item>
      <el-form-item label="Discount rate: " class="item-inline" required>
        <el-select></el-select>
      </el-form-item>
      <el-form-item label="Quantity per day: " class="item-inline1" required>
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="Type: " class="item-inline1" >
        <el-radio class="radio" v-model="radio" label="1">Unllimited</el-radio>
        <el-radio class="radio" v-model="radio" label="2">Alone</el-radio>
      </el-form-item>
      <el-form-item label="Coupon code: " class="item-inline"required>
        <el-input></el-input>
      </el-form-item>
    
    <div class="title-s">
        Security Deposit
      </div>
    <div class="trials-money">
      <p class="money"><label>Pefund:</label>   $1960.00</p>
      <p class="money"><label>Platform fee:</label>  $59.00</p>
      <p class="money"><label>Total fee:</label>  <span class="red">$1960.00</span></p>
    </div>
    
    <el-form-item class="footer-btn" required>
      <button type="button" class="save">Save</button>
      <button type="button" class="cancel">Cancel</button>
    </el-form-item>
    </el-form>

   </template>
  </div>
</template>

<script>
import pagination from '@/components/page_index_coupons/pagination.vue'
import { getTestData } from '@/api/login.js'
export default {
  name: 'posted_trials',
  data () {
    return {
      thLists: [1, 2, 3],
      trLists: [1, 2, 3],
      allpage: 30,
      showItem: 7,
      gotoAddPage: false,
      couponsForm: {

      },
      rules: {

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
      um: undefined
    }
  },
  components: {
    pagination
  },
  mounted () {
  },
  methods: {
    test (i) {
      console.log(i)
    },
    test1 () {
      getTestData({"email": 'qwerq', "username": 'awefawef'}).then(response => {
        console.log(response)
      }).catch(() => {
        console.log("error")
      })
    },
    test2 () {
      getTestData1().then(response => {
        console.log(response)
      }).catch(() => {
        console.log("error")
      })
    },
    add () {
      this.gotoAddPage = !this.gotoAddPage
      setTimeout(() => {
        console.log($('#summernote').summernote)
        $('#summernote').summernote({
        height: 300,
        tabsize: 2
      })
    },10)
    },
    getProInfo () {
      console.log("获取产品信息")
    },
    beforeAvatarUploadP () {

    },
    uploadPho () {

    },
    handleRemoveP () {
      
    }
  }
}
</script>

<style lang="less">
@import url('../../../styles/mixin.less');
.posted-coupons {
  .pro-header {
  position: relative;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 1rem;
  }
  .search-form {
    position: relative;
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    margin-bottom: 1rem;
    .form-control-bootstrap {
      margin-right: 5%;
      min-width: 10%;
    }
    .search {
      .btn-h(60px, 34px,#85ba3b,#85ba3b,#fff);
      font-size: 0.78rem;
      &:active {
        background: darken(#85ba3b, 10%);
        border-color: darken(#85ba3b, 10%);
      }
    }
    .add-coupons {
      position: absolute;
      right: 0;
      top: 50%;
      .btn-h(100px, 40px, #7ab7e0, #7ab7e0, #fff);
      margin-top: -20px;
      &:active {
        background: darken(#7ab7e0, 10%);
        border-color: darken(#7ab7e0, 10%);
      }
    }

  }
 
}
.coupons-pagination {
  .pagination {
    width: 100%;
    text-align: right;
    padding-right: 15rem;
    li {
      &.active {
        .items {
          border: none;
        }
      }
      .items {
        background: #fff;
      }
    }
  }
}
.coupons-form {
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
