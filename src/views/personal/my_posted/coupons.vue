<template>
  <div class="posted-coupons">
    <div class="pro-header">
      <h3 class="title">My Posted</h3>
      <div class="title-s" v-title="'Coupons Posted'">Coupons Posted</div>
    </div>
    <div class="search-form">
      <label for="title">
        Title: 
      </label>
      <el-input class=" form-control-bootstrap"  type="text" v-model="requestdata.product_title" ></el-input>
      <label for="title">
        Category: 
      </label>
      <el-select name="" class=" form-control-bootstrap" clearable v-model="requestdata.menu_id">
        <el-option :value="item.id" :key="item.id" v-for="item in classifyList" :label="item.name">{{item.name}}</el-option>
      </el-select>

      <label for="title" >
        Status: 
      </label>
      <el-select name="" class=" form-control-bootstrap" clearable v-model="requestdata.run_status">
        <el-option :value="all_run_status[0]" label='Pending'></el-option>
        <el-option :value="all_run_status[1]" label='Active'></el-option>
        <el-option :value="all_run_status[2]" label='Decline'></el-option>
        <el-option :value="all_run_status[3]" label='Stop'></el-option>
        <el-option :value="all_run_status[4]" label='Close'></el-option>
        <el-option :value="all_run_status[5]" label='Expired'></el-option>
      </el-select>

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
            <td class="img">
              <img v-if="item.product_img" class="product-img" :src="item.product_img.split(',')[0]" alt="">
            </td>
            <td class="coupons-table-title">
              <div>{{item.website}}</div>
              <div class="table-product-title" :title="item.product_title" @click="gotoDetails(item)">{{item.product_title}}</div>
              <a href="javascript:void(0);" @click="gotoDetails(item)">{{item.menu.name}}</a>
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
              <div class="blue" v-if="item.status === 0 && !item.isExpired ">Pending</div>
              <div class="green" v-if="item.status === 1 && item.run_status ==  all_run_status[1] && !item.isExpired">Active </div>
              <div class="red" v-if="item.status === 2  && !item.isExpired ">Decline</div>
              
              <div class="blue" v-if="item.status === 1 && item.run_status ==  all_run_status[3] && !item.isExpired">Stop</div>
              <div class="red" v-if="item.status === 1 && item.run_status ==  all_run_status[4] && !item.isExpired">Close</div>
              <div class="red" v-if=" item.isExpired ">Expired</div>
            </td>
            <td class="operation">
              <template v-if="item.status === 0 && !item.isExpired ">
                <div class="link"> <a href="javascript:void(0)" @click="EditCoupon(item.id)">Edit</a></div>
                <div class="link"> <a href="javascript:void(0)" @click="DeleteCoupon(item.id)">Delete</a></div>
              </template>
              <template  v-if="item.status === 1 && item.run_status == all_run_status[3] && !item.isExpired  ">
                <div class="link"> <a href="javascript:void(0)" @click="updateRunStatus(item.id, all_run_status[1])">Open</a></div>
                <div class="link"> <a href="javascript:void(0)" @click="updateRunStatus(item.id, all_run_status[4])">Close</a></div>
              </template>
              <template  v-if="item.status === 1 && item.run_status ==  all_run_status[4] && !item.isExpired "> 
                <div class="link"> <a href="javascript:void(0)"  @click="showCloseDetails(item.id)">Details</a></div>
              </template>
              <template  v-if="item.status === 2 && !item.isExpired ">
                <div class="link"> <a href="javascript:void(0)" @click="EditCoupon(item.id)">Edit</a></div>
                <div class="link"> <a href="javascript:void(0)" @click="DeleteCoupon(item.id)">Delete</a></div>
                <div class="link"> <a href="javascript:void(0)" @click="showDetails(item)">Details</a></div>
              </template>
              <template v-if="item.status === 1 && item.run_status ==  all_run_status[1]  && !item.isExpired ">
                <div class="link"> <a href="javascript:void(0)" @click="updateRunStatus(item.id,  all_run_status[3])">Stop</a></div>
                <div class="link"> <a href="javascript:void(0)"  @click="updateRunStatus(item.id,  all_run_status[4])">Close</a></div>
              </template>
              <template v-if="item.isExpired">
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
import { setStore , getStore} from '@/utils/utils'
import { getToken, getUserId } from '@/utils/auth'
import { parseTime } from '@/utils/date'
import { base64Encode } from '@/utils/randomString'
export default {
  name: 'center_coupons',
  data () {
    return {
      value: '',
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

          product_title: '', // 商品标题   是 ，
          product_img: '', // 产品图片， string, 用逗号拼接 , 否
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
        country_id: getStore('country_id') || 1,
        page: 1,
        page_size: 5,
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
        country_id: getStore('country_id') || 1,
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
      this.$api.userPickCoupons(this.requestdata)
        .then(res => {
          for (var i of res.data.data) {
            let now = parseInt(new Date().getTime() / 1000)
            if (i.valid_date  < now) {
              i.isExpired = true
            }
            i.valid_date = parseTime(
              i.valid_date,
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
      this.$api.getHeadCateList().then(res => {
        this.classifyList = this.classifyList.concat(res.data)
      }).catch(error => {
        console.log(error)
      })
    },

    //跳转到添加优惠券页面
    add () {
      this.$router.push({ path: '/posted/list-coupons/add' })
    },

    //发布的优惠券查询
    postedCouponsSearch () {
      this.gotoPage(1)
    },

    //跳转到优惠券详情页面
    gotoDetails (item) {
      if (item.status == 1 && item.run_status == this.all_run_status[1]) {
        this.$router.push({ path: '/coupons/' + base64Encode(item.id) + '/' + base64Encode(item.country_id) })
      }
    },

    //跳转到 领取优惠券的用户页面
    gotoReceiptor (item) {
      if (item.pick_numbers === 0) {
        return false
      }
      this.$router.push({ path: '/posted/list-coupons/receiptor' })
      setStore('couponDetails', JSON.stringify(item))
    },

    //编辑待审核状态下和审核未通过的优惠券   
    EditCoupon (id) {
      console.log(id)
      //携带id 查询需要修改的数据，然后进行修改
      this.$router.push({ path: '/posted/list-coupons/add', query: { editor: id } })
    },

    //删除优惠券
    DeleteCoupon (id) {
      this.$confirm('Are you sure to close this promotion?', 'Friendly reminder', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      })
        .then(() => {
          this.couponDeteleRequestData.id = id
          console.log(this.couponDeteleRequestData)
          this.$api.couponDetele(this.couponDeteleRequestData).then(res => {
            console.log(res)
            this.getUserPickCoupons()
            this.$snotify.success('Submit Successfully!')
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
      this.$api.couponCensor(this.detailsRequestData).then(res => {
        this.nonApproval = res.data.content
      }).catch(error => {
        console.log(error)
      })
    },

    //显示 商品下架（close) 详情
    showCloseDetails (id) {
      this.detailsRequestData.product_id = id
      this.detailsDialog = true
      this.$api.couponProblemCensor(this.detailsRequestData).then(res => {
        if (!res.data) {
          this.nonApproval = 'self closing'
          return
        }
        this.nonApproval = res.data.revert
      }).catch(error => {
        console.log(error)
      })
    },

    //更新优惠券
    updateRunStatus (id, run_status) {
      if (run_status == 'close') {
        this.$confirm('Are you sure to close this promotion?', 'Friendly reminder', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
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
      this.$api.couponUpdateRunStatus (this.updateRunStatusRequestData).then(res => {
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

.coupons-table {
  td,th { 
    padding: 10px;
  }
  font-size: 12px;
  .product-img {
    width: 5rem;
    height: 4rem;
  }
  .img {
    width: 100px;
    img {
      width: 70px;
      height: 70px;
    }
  }
  .coupons-table-title {
    text-align: left;
    width: 250px;
    padding-left: 10px;
    .table-product-title {
      color: #333;
      margin: 5px 0 5px 0;
      height: 28px;
      line-height: 1.21;
      overflow: hidden;
      cursor: pointer;
    }
  }
  .operation {
    border-right: 1px solid #e1e1e1;
    .link {
      margin-bottom: 10px;
    }
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
