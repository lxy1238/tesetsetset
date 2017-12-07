<template>
  <div class="page-index ">
    <div class="pages-content clearfix">
      <explain ></explain>
      <coupons-pro  v-for="couponsDetails in arrcouponsDetails"  
                    :key="1" 
                    :couponsDetails="couponsDetails"
                    :addpromo="false" 
                    @gotodetails="gotodetails">
        <template slot="price">
         <p class="trials-price content">
          <span class="old"> <i >{{couponsDetails.product_price}} </i></span>
          <span class="gray-s"> Refund </span>
          <span class="coupon-right"><strong> {{couponsDetails.refund_price}}</strong>  </span>
         </p>
         </template>
         <template slot="btn" >View trials</template>
      </coupons-pro>
    </div>
    <pagination 
      v-if="allpage && allpage != 1"
      :allpage="allpage"
      :show-item="showItem"
      @handlecurrent="test">
    </pagination>
  </div>
</template>

<script>
import couponsPro from '@/components/page_index_coupons/image_product.vue'
import pagination from '@/components/page_index_coupons/pagination.vue'
import explain from '@/components/trials/explain.vue'
import { getAllTrial, getHeadCateList } from '@/api/login'
import { getToken, getUserId } from '@/utils/auth'
import { getStore } from '@/utils/utils'
import { base64Encode } from '@/utils/randomString'
export default {
  name: 'page_index',
  data () {
    return {
      showItem: 7,
      allpage: undefined,
      arrcouponsDetails: [
      ],
    
      requestData: {
        page: 1,
        page_size: '',
        menu_id: 0,
        country_id: parseInt(getStore('country_id')) || 1,
        keyword: '',
      }
    }
  },
  components: {
    couponsPro,
    pagination,
    explain
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getTrialsList()
    },
    initData () {

    },
    getTrialsList () {
      getAllTrial(this.requestData).then(res => {
        this.arrcouponsDetails = res.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    test (index) {
      console.log(`当前跳转到 ${index} 页`)
    },
    gotodetails () {
      this.$router.push({ path: '/trialsDetails/index'})
    }
  }
}
</script>

<style lang="less" scoped>

.icon-tuite1 {
  font-size: 34px;
  color: white;
  cursor: pointer;
}
.trials-price {
  text-align: center;
  font-size: 13px;
  .coupon-right {
    font-size: 16px;
  }
  
}
.trials-explain {
  width: 99.05%;
  height: 5.5rem;
  // padding: 1rem 0;
  border: 1px solid #e1e1e1;
  background: white;
  margin: 1rem 0 1.3rem 0;
  text-align: left;
}
.inline {
  position: relative;
  float: left;
  height: inherit;
  border: 1px solid transparent;
  padding: 1rem 0 1rem 1rem;
  width: 16rem;
  margin: 0;
  .title {
    font-size: 1rem;
    color: #666;
  }
  .content {
    font-size: 0.8rem;
    color: #b2b2b2;
  }
  .icon-icon_huaban {
    position: absolute;
    font-size: 30px;
    right: 0;
    top: 1.6rem;
    color: #b2b2b2;
    display: inline-block;
    transform: rotate(90deg);
  }
}
</style>
