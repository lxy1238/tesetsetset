<template>
  <div class="commissions">
    <div class="commissions-header">
        Amazon Affiliate Bounty Inquiry
    </div>
    <div class="commissions-content">
      <div class="header-button">
        <span class="select-span" :class="{active: active === 0}" @click="Selectsingle" >
          Single</span><span class="select-span" :class="{active: active === 1}" @click="Selectbulk">
            BULK</span>
      </div>  
      <el-form :model="commissionForm" :rules="rules" ref="couponsForm" label-position="top" label-width="140px" class="coupons-form" >
        <el-form-item label="Amazon Locales: " prop="website" class="item-inline" >
          <el-select v-model="commissionForm.website">
            <el-option
              v-for="item in optionsWebsite"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Asin: " prop="product_price" class="" v-if="active === 0" >
          <el-input class="input-price-fee" v-model="commissionForm.product_price"></el-input>
        </el-form-item>
        <el-form-item label="Asin: " prop="product_price" class="" v-if="active === 1">
          <el-input type="textarea"  v-model="commissionForm.product_price"></el-input>
        </el-form-item>
        <el-form-item label="Amazon PID: "  class="" prop="shipping_fee">
          <el-input  v-model="commissionForm.shipping_fee"></el-input>
        </el-form-item>
        <el-form-item >
          <button type="button" class="search">Generate</button> <button type="button" class="clear" >Clear</button>
        </el-form-item>
    </el-form>
    <div class="results-num">
      1 Results from Amazon.com
    </div>
    <div class="results-table">
      <div class="table-tr code">
        B01FXC7JWQ
      </div>
      <div class="table-tr details">
        <div class="details-left">
          <img  class="product-img" src="" alt="">
          <div class="product-title">
            STATE Geo Mesh CoidGeoMesh Cold Shoulder Shift Dress 
          </div>
          <div class="product-price">
            $68.00
          </div>
        </div>
        <div class="details-right">
          <div class="rate">
            <div class="discount-rate">7%</div>
            <div>Bounties Rate</div>
          </div>
          <div class="rate income">
            <div class="income-price">$6.42</div>
            <div>Estimated Income</div>
          </div>
        </div>
      </div>
      <div class="table-tr url" id="productUrl">
        https://amazon.cn/gp/product/B00QGA04RM/ref=as_li_tl?ie=UTF8&tag=slickdeals-23&camp=536&creative=3200&linkCode=as2&
          creativeASIN=B00QGA04RM&linkId=aeb5b2fb1595551f285388d51ccdcbc8
      </div>
      <div class="table-tr last">
        <button data-clipboard-target="#productUrl" @click="copyUrl($event)">copy</button>
      </div>
    </div>
    </div>
    
  </div>
</template>

<script>
import Clip from '@/utils/clipboard.js'
export default {
  name: 'commissions',
  data () {
    return {
      active: 0,   //两种状态   0 表示  选择 single 方式   1 表示选择 bulk 方式
      commissionForm: {
        website: '',
        product_price: '',
        shipping_fee: '',
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
          {type: 'array', required: true, message: 'Please Upload image', trigger: 'change' }
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
    }
  },
  mounted () {

  },
  methods: {
    Selectsingle () {
      this.active = 0
    },
    Selectbulk () {
      this.active = 1
    },
    copyUrl (e) {
      Clip(e)
    }
  }
}
</script>

<style lang="less" > 
@import url('../../styles/mixin.less');
.commissions {
  // height: 1;
  .commissions-header {
    min-width: 1000px;
    height: 180px;
    line-height: 180px;
    background: #f2f2f2;
    color: #595959;
    font-size: 36px;
    text-align: center;
  }
  .commissions-content {
    width: 1000px;
    margin: 0 auto;
    min-height: 1000px;
    .header-button {
      height: 55px;
      line-height: 55px;
      margin: 20px 0 30px 0;
      border: 1px solid #e1e1e1;
      .select-span {
        width: 50%;
        text-align: center;
        display: inline-block;
        height: 55px;
        cursor: pointer;
        &.active {
          background: #a0a0a0;
          color: white;
        }
      }
    }

    .search {
      .btn-h(118px, 34px);
      background: #c9caca;
      border-color: #c9caca;
      color: black;
      &:hover {
        background: darken(#c9caca, 5%);
        border-color: darken(#c9caca, 5%);
      }
      &:active {
        background: lighten(#c9caca, 10%);
        border-color: lighten(#c9caca, 10%);
      }
    }
    .clear {
      .btn-h(118px, 34px);
      background: white;
      border-color: #a1a1a1;
      color: black;
      &:hover {
        background: darken(white, 5%);
        border-color: darken(#a1a1a1, 5%);
      }
      &:active {
        background: lighten(white, 10%);
        border-color: lighten(#a1a1a1, 10%);
      }
    }
    .results-num {
      color: #666;
      font-size: 16px;
      margin-bottom: 20px;
    }
    .results-table {
      .table-tr {
        width: 100%;
        height: 30px;
        border: 1px solid #a0a0a0;
        border-bottom: none;
        &.last {
          border-bottom: 1px solid #a0a0a0;
          text-align: right;
          padding-right: 20px;
          height: 60px;
          line-height: 60px;
          button {
              .btn-h;
              width: 82px;
              height: 30px;
              background: #85bb3a;
              border-color: #85bb3a;
              color: white;
              &:hover {
                background: darken(#85bb3b, 5%);
                border-color: darken(#85bb3b, 5%);
              }
              &:active {
                background: lighten(#85bb3b, 10%);
                border-color: lighten(#85bb3b, 10%);
              }
          }
        }
        &.code {
          line-height: 30px;
          text-align: right;
          padding-right: 20px;
        }
        &.details {
          padding: 20px 20px 20px 20px;
          height: 120px;
          .details-left {
            float: left;
            width: 480px;
            height: 70px;
            .product-img {
              width: 90px;
              height: 70px;
              float: left;
              margin-right: 20px;
            }
            .product-title {
              margin-bottom: 20px;
            }
            .product-price {
              margin-left: 10px;
            }
          }
          .details-right {
            float: left;
            width: 470px;
            height: 70px;
            .rate {
              float: left;
              width: 48%;
              height: 100%;
              text-align: center;
              padding: 10px 0 0 0;
              font-size: 14px;
              color: #8a8a8a;
              .discount-rate {
                color:#0095f8;
                font-size: 22px;
                margin-bottom: 5px;
              }
              .income-price {
                color:#ff0101;
                font-size: 22px;
                margin-bottom: 5px;
              }
            }
          }
        }
        &.url {
          padding: 10px 0 10px 10px;
          height: 110px;
        }
      }
    }
  }
}

</style>
