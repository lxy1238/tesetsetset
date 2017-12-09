<template>
  <div class="posted-coupons">
    <div class="pro-header">
      <h3 class="title">Coupons Posted</h3>
    </div>
    <div class="search-form">
      <label for="title">
        Title: 
      </label>
      <input class=" form-control-bootstrap"  type="text" v-model="requestdata.product_title" />
      <label for="title">
        Category: 
      </label>
      <select name="" class=" form-control-bootstrap" v-model="requestdata.menu_id">
        <option :value="''" >请选择</option>
        <option :value="item.id" v-for="item in classifyList">{{item.name}}</option>
      </select>

      <label for="title" >
        Status: 
      </label>
      <select name="" class=" form-control-bootstrap" v-model="requestdata.run_status">
        <option :value="''" >请选择</option>
        <option :value="all_run_status[0]">Pending</option>
        <option :value="all_run_status[1]">Active</option>
        <option :value="all_run_status[2]">Decline</option>
        <option :value="all_run_status[3]">Stop</option>
        <option :value="all_run_status[4]">Close</option>
        <option :value="all_run_status[5]">Expired</option>
      </select>

      <button class="search" @click="postedCouponsSearch">Search</button>

      <button class="add-coupons" @click="add"><i class="el-icon-plus"></i> Add</button>
    </div>
    <div class="table-box">
      <table class="table table-bordered coupons-table">
        <thead>
          <tr>
            <th v-for="item in thLists">{{item}}</th>
          </tr>
        </thead>
        <tbody >
          <tr v-for="item in trLists" >
            <td>
              <img v-if="item.product_img" class="product-img" :src="item.product_img.split(',')[0]" alt="">
              <img v-else class="product-img" src="../../../assets/01.png" alt="">
            </td>
            <td class="coupons-table-title">
              <div>amazon</div>
              <div class="table-product-title" @click="gotoDetails(item)">{{item.product_title}}</div>
              <a href="javascript:void(0);" @click="gotoDetails(item)">Electronics</a>
            </td>

            <td class="prcie">
              <div>{{currency}}{{item.product_price}}</div>
            </td>
            <td class="discount">
              <div>{{item.discount_rate}}%</div>
            </td>
            <td class="qty">
              <div>
                <a href="javascript:void(0);" @click="gotoReceiptor(item)">{{item.pick_numbers}}</a>/
                <span v-if="item.use_type === 'Alone'">{{item.total_quantity}}</span>
                <span v-else>--</span>
              </div>
            </td>
            <td class="valid-date">
              <div>{{item.valid_date}}</div>
            </td>
            <td class="status">
              <div class="blue" v-if="item.status === 0 ">Pending</div>
              <div class="green" v-if="item.status === 1 && item.run_status ==  all_run_status[1] ">Active </div>
              <div class="red" v-if="item.status === 2 && item.run_status ==  all_run_status[2] ">Decline</div>
              
              <div class="blue" v-if="item.status === 1 && item.run_status ==  all_run_status[3]">Stop</div>
              <div class="red" v-if="item.status === 1 && item.run_status ==  all_run_status[4] ">Close</div>
              <div class="red" v-if="item.status === 1 && item.run_status ==  all_run_status[5] ">Expired</div>
            </td>
            <td class="operation">
              <template v-if="item.status === 0">
                <div> <a href="javascript:void(0)" @click="EditCoupon(item.id)">Edit</a></div>
                <div> <a href="javascript:void(0)" @click="DeleteCoupon(item.id)">Delete</a></div>
              </template>
              <template  v-if="item.status === 1 && item.run_status == all_run_status[3] ">
                <div> <a href="javascript:void(0)" @click="updateRunStatus(item.id, all_run_status[1])">Open</a></div>
                <div> <a href="javascript:void(0)" @click="updateRunStatus(item.id, all_run_status[4])">Close</a></div>
              </template>
              <template  v-if="item.status === 1 && item.run_status ==  all_run_status[4]"> 
                <!-- <div> <a href="javascript:void(0)"  @click="showDetails(item)">Details</a></div> -->
              </template>
              <template  v-if="item.status === 2 && item.run_status ==  all_run_status[2] ">
                <div> <a href="javascript:void(0)" @click="EditCoupon(item.id)">Edit</a></div>
                <div> <a href="javascript:void(0)" @click="DeleteCoupon(item.id)">Delete</a></div>
                <div> <a href="javascript:void(0)" @click="showDetails(item)">Details</a></div>
              </template>
              <template v-if="item.status === 1 && item.run_status ==  all_run_status[1] ">
                <div> <a href="javascript:void(0)" @click="updateRunStatus(item.id,  all_run_status[3])">Stop</a></div>
                <div> <a href="javascript:void(0)"  @click="updateRunStatus(item.id,  all_run_status[4])">Close</a></div>
              </template>
              <template  v-if="item.status === 1 && item.run_status ==  all_run_status[5] ">
                <!-- <div> <a href="javascript:void(0)" @click="DeleteCoupon(item.id)">Delete</a></div> -->
              </template>
            </td>
          </tr>
          <tr v-if="trLists.length === 0">
            <td colspan="10">No Data</td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination class="coupons-pagination" 
      v-if="allpage && allpage != 1"
      :allpage="allpage"
      :show-item="showItem"
      :current="requestdata.page"
      @handlecurrent="gotoPage">
    </pagination>
    <!-- 查看详情弹窗 -->
    <el-dialog  :visible.sync="detailsDialog" title="Decline details" class="details-dialog" size="tiny">
        <div class="details-reason">
          {{nonApproval}}
        </div>
    </el-dialog>
  </div>
</template>

<script>
import pagination from '@/components/page_index_coupons/pagination.vue'
import { mapGetters } from 'vuex'
import { userPickCoupons, couponCensor, couponUpdateRunStatus, getHeadCateList , couponDetele} from '@/api/login'
import { setStore , getStore} from '@/utils/utils'
import { getToken, getUserId } from '@/utils/auth'
import { parseTime } from '@/utils/date'
import { base64Encode } from '@/utils/randomString'
export default {
  name: 'center_coupons',
  data () {
    return {
      thLists: [
        'Image',
        'Title',
        'Price',
        'Discount',
        'Qty',
        'Valid Date',
        'Status',
        'Operation'
      ],
      classifyList: [

      ],
      trListsTest: [
        {
          user_id: undefined, // 用户ID ， 是，
          user_name: '', // 发布用户名称， 是
          category_id: 1, // 所属分类 , 是   int
          country: '美国', // 国家  是
          website: '亚马逊2', // 平台   是

          product_reason: 'This is a product I like very much', //产品描述  是
          use_type: 'Unlimited',
          coupon_code: 'QAKLWEFALWEKFJ', //优惠券码
          reward_type: '1.5', //PerOrder:按每订单奖励,
          product_price: '65', //商品价格
          shipping_fee: '1.11', //运费   否
          discount_rate: '12%', //折扣率    否
          valid_date: new Date(), //到期时间  int

          quantity_per_day: 10, // 每天上限数量 int
          influencer_reward: '1.5', // 推荐费用/每个
          platform_fee: '2.2', //支付平台费用/每个
          influencer_reward_count: '66', //推荐总费用
          platform_reward: '55', //  支付平台总费用， 否
          total_fee: '123', //总费用

          product_title: 'this is project', // 商品标题   是 ，
          product_img: 'http://www.ghostxy.top/dealsbank/img/01.png', // 产品图片， string, 用逗号拼接 , 否
          coupon_id: 1,
          total_quantity: 1000, // 总数量   int
          total_receiptor: 365,
          status: 1
        }
      ],
      detailsDialog: false,
      trLists: [],
      allpage: undefined,
      showItem: 7,
      nonApproval: '',       //审核不通过详情
      all_run_status: ['pending','active', 'decline', 'stop', 'close', 'expired' ],  // 待审核  暂停， 关闭 上线， 审核未通过  过期
      requestdata: {
        user_id: getUserId(),
        api_token: getToken(),
        page: 1,
        page_size: 6,
        product_title: '',
        menu_id: '',
        run_status: '',
      },
      detailsRequestData: {
        api_token: getToken(),
        user_id: getUserId(),
        coupon_id: ''
      },
      updateRunStatusRequestData: {
        api_token: getToken(),
        user_id: getUserId(),
        coupon_id: '',
        run_status: '',
      },
      couponDeteleRequestData: {
        api_token: getToken(),
        user_id: getUserId(),
        coupon_id: ''
      }
    }
  },
  components: {
    pagination
  },
  mounted () {
    this.init()
  },
  computed: {
    ...mapGetters(['user_id', 'token']),
    currency () {
      return getStore('currency') || '$'
    }
  },
  methods: {
    init () {
      this.getUserPickCoupons()
      this.getHeadCateListInfo()
    },
    //分页跳转
    gotoPage (i) {
      this.requestdata.page = i
      this.getUserPickCoupons()
    },

    //获取首页列表数据
    getUserPickCoupons () {
      userPickCoupons(this.requestdata)
        .then(res => {
          console.log(res)
          for (var i in res.data.data) {
            res.data.data[i].valid_date = parseTime(
              res.data.data[i].valid_date,
              '{y}-{m}-{d}'
            )
          }
          this.trLists = res.data.data
          this.allpage = res.data.last_page
        })
        .catch(error => {
          console.log(error)
        })
    },

    //获取头部品类列表
    getHeadCateListInfo () {
      getHeadCateList().then(res => {
        this.classifyList = res.data
      }).catch(error => {
        console.log(error)
      })
    },

    //跳转到添加优惠券页面
    add () {
      this.$router.push({ path: '/posted/coupons/add' })
    },

    //发布的优惠券查询
    postedCouponsSearch () {
      this.gotoPage(1)
    },

    //跳转到优惠券详情页面
    gotoDetails (item) {
      if (item.status == 1 && item.run_status == this.all_run_status[1]) {
        this.$router.push({ path: '/coupons/' + base64Encode(item.id)  })
      }
    },

    //跳转到 领取优惠券的用户页面
    gotoReceiptor (item) {
      if (item.pick_numbers === 0) {
        return false
      }
      this.$router.push({ path: '/posted/coupons/receiptor' })
      setStore('couponDetails', JSON.stringify(item))
    },

    //编辑待审核状态下和审核未通过的优惠券   
    EditCoupon (id) {
      console.log(id)
      //携带id 查询需要修改的数据，然后进行修改
      this.$router.push({ path: '/posted/coupons/add', query: { editor: id } })
    },

    //删除优惠券
    DeleteCoupon (id) {
      this.$confirm('Determine deleting coupons?', 'reminder', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        type: 'warning'
      })
        .then(() => {
          this.couponDeteleRequestData.id = id
          couponDetele(this.couponDeteleRequestData).then(res => {
            console.log(res)
            this.getUserPickCoupons()
          })
          this.$notify({
            type: 'success',
            message: 'delete success!'
          })
        })
        .catch(() => {
          console.log('cancel')
        })
    },

    //显示详情弹窗
    showDetails (id) {
      this.detailsRequestData.coupon_id = id
      this.detailsDialog = true
      couponCensor(this.detailsRequestData).then(res => {
        this.nonApproval = res.data.content
      }).catch(error => {
        console.log(error)
      })
    },

    //更新优惠券
    updateRunStatus (id, run_status) {
      if (run_status == 'close') {
        this.$confirm('Determine close trial?', 'reminder', {
          confirmButtonText: 'confirm',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(() => {
          this.updateRunStatusFun(id, run_status)
        }).catch (error => {
          console.log(error)
        })
      } else {
        this.updateRunStatusFun(id, run_status)
      }
    },

    updateRunStatusFun (id, run_status) {
      this.updateRunStatusRequestData.coupon_id = id
      this.updateRunStatusRequestData.run_status = run_status
      couponUpdateRunStatus (this.updateRunStatusRequestData).then(res => {
        if (res.code === 200) {
          this.getUserPickCoupons()
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="less"  >
@import url("../../../styles/mixin.less");
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
      
      margin-right: 3%;
      width: 16%;
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

.coupons-table {
  font-size: 12px;
  .product-img {
    width: 5rem;
    height: 4rem;
  }
  .coupons-table-title {
    text-align: left;
    width: 250px;
  }
}

.details-dialog {
  text-align: center;
  .details-reason {
    padding-top: 20px;
    min-height: 160px;
    color: red;
    font-size: 20px;
  }
}
</style>
