<template>
  <div class="posted-coupons">
    <template>
       <div class="pro-header">
        <h3 class="title">My Posted</h3>
        <div class="title-s" v-title="'Trials Posted'">Trials Posted</div>
      </div>
 <div class="search-form">
      <label for="title">
        Title: 
      </label>
      <el-input class=" form-control-bootstrap"  type="text" v-model="requestdata.product_title" ></el-input>
      <label for="title">
        Category: 
      </label>
      <el-select name="" class=" form-control-bootstrap" clearable  v-model="requestdata.menu_id">
        <el-option :value="item.id" :key="item.id" v-for="item in classifyList" :label="item.name">{{item.name}}</el-option>
      </el-select>

      <label for="title" >
        Status: 
      </label>
      <el-select name="" class=" form-control-bootstrap" clearable v-model="requestdata.run_status">
        <el-option :value="all_run_status[0]">Pending</el-option>
        <el-option :value="all_run_status[1]">Active</el-option>
        <el-option :value="all_run_status[2]">Decline</el-option>
        <el-option :value="all_run_status[3]">Stop</el-option>
        <el-option :value="all_run_status[4]">Close</el-option>
        <el-option :value="all_run_status[5]">Expired</el-option>
        <el-option :value="all_run_status[6]">Underbalance</el-option>
      </el-select>

      <button class="search" @click="postedCouponsSearch">Search</button>

      <button class="add-coupons" @click="add"><i class="el-icon-plus"></i> Add</button>
    </div>
      <div class="table-box">
        <table class="table table-bordered table-trials-posted">
          <thead>
            <tr>
              <th v-for="item in thLists">{{item}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in trLists" v-if="trLists.length != 0">
              <td>
                <img class="trials-table-img" :src="item.product_img.split(',')[0]" alt="">
              </td>
              <!-- title -->
              <td class="trials-title">
                <div class="trials-title-platform">{{item.website}}</div>
                <div class="trials-title-text" :title="item.product_title"  @click="gotoDetails(item)">{{item.product_title}}</div>
                <a href="javascript:void(0);"  @click="gotoDetails(item)">{{item.menu.name}}</a>
              </td>
              <!-- store -->
              <!-- <td class="trials-store">
                <div class="trials-store-content" v-if="item.user_store">
                  {{item.user_store.store_name}}
                </div>
              </td> -->
              <!-- List price -->
              <td>
                <div >
                  {{currency}}{{Number(item.product_price)}}
                </div>
              </td>
              <!-- quantity -->
              <td>
                <div>
                    <a href="javascript:void(0)" @click="gotoTrailsreceiptor(item)">
                   {{item.order_numbers}}
                </a> / {{item.total_quantity}}
                </div>
              </td>
              <!-- applied -->
              <!-- <td>
                 
               
              </td> -->
              <!-- shipping_fee -->
              <td>
                <div>
                  {{currency}}{{Number(item.shipping_total_fee)}}
                </div>
              </td> 
              <!-- refund -->
              <td>
                <div>
                  {{currency}}{{Number(NumberSub(item.refund_total_price, item.shipping_total_fee).toFixed(2))}}
                </div>
              </td>
              <!-- promotion_fee -->
              <td>
                <div>
                  {{currency}}{{Number(item.platform_total_fee)}}
                </div>
              </td>
              
              <!-- security_deposit -->
              <td>
                <div>
                  {{currency}}{{Number(item.total_fee)}}
                </div>
              </td>

                <!-- Cost -->
              <td class="cost">
                <div>
                  {{currency}}{{Number(item.real_fee)}}
                </div>
              </td>
                <!-- valid_date -->
              <td>
                <div>
                  {{item.start_time}}<br /> 
                      to <br />
                  {{item.end_time}}
                </div>
              </td>
                <!-- Status -->
               <td class="status">
              <div class="blue" v-if="item.status === 0 && !item.isExpired ">Pending</div>
              <div class="green" v-if="item.status === 1 && item.run_status ==  all_run_status[1] && item.putaway && !item.isExpired">Active </div>
              <div class="red" v-if="item.status === 1 && item.run_status ==  all_run_status[1] && !item.putaway && !item.isExpired">Close </div>
              <div class="red" v-if="item.status === 2  && !item.isExpired ">Decline</div>
              
              <div class="blue" v-if="item.status === 1 && item.run_status ==  all_run_status[3] && !item.isExpired ">Stop</div>
              <div class="red" v-if="item.status === 1 && item.run_status ==  all_run_status[4] && !item.isExpired">Close</div>
              <div class="red" v-if=" item.isExpired ">Expired</div>
              <div class="red" v-if="item.status === 1 && item.run_status ==  all_run_status[6] && !item.isExpired && !item.moneyIsEnough">Underbalance</div>
              <div class="green" v-if="item.status === 1 && item.run_status ==  all_run_status[6] && !item.isExpired && item.moneyIsEnough">钱够了</div>
            </td>
            <td class="operation">
              <template v-if="item.status === 0 && !item.isExpired">
                <div> <a href="javascript:void(0)" @click="EditCoupon(item.id)">Edit</a></div>
                <div> <a href="javascript:void(0)" @click="DeleteCoupon(item.id)">Delete</a></div>
              </template>
              <template  v-if="item.status === 1 && item.run_status == all_run_status[3] && !item.isExpired ">
                <div> <a href="javascript:void(0)" @click="updateRunStatus(item.id, all_run_status[1])">Open</a></div>
                <div> <a href="javascript:void(0)" @click="updateRunStatus(item.id, all_run_status[4])">Close</a></div>
              </template>
              <template  v-if="item.status === 1 && item.run_status ==  all_run_status[4] && !item.isExpired"> 
                <div> <a href="javascript:void(0)"  @click="showCloseDetails(item)">Details</a></div>
              </template>
              <template  v-if="item.status === 2 && !item.isExpired">
                <div> <a href="javascript:void(0)" @click="EditCoupon(item.id)">Edit</a></div>
                <div> <a href="javascript:void(0)" @click="DeleteCoupon(item.id)">Delete</a></div>
                <div> <a href="javascript:void(0)" @click="showDetails(item)">Details</a></div>
              </template>
              <template v-if="item.status === 1 && item.run_status ==  all_run_status[1] && item.putaway && !item.isExpired">
                <div> <a href="javascript:void(0)" @click="updateRunStatus(item.id,  all_run_status[3])">Stop</a></div>
                <div> <a href="javascript:void(0)"  @click="updateRunStatus(item.id,  all_run_status[4])">Close</a></div>
              </template>
               <template v-if="item.status === 1 && item.run_status ==  all_run_status[1] && !item.putaway && !item.isExpired">
                <div> <a href="javascript:void(0)"  @click="showDetails(item)">Details</a></div>
              </template>
               <template v-if="item.status === 1 && item.run_status ==  all_run_status[6] && !item.isExpired && item.moneyIsEnough">
                <div> <a href="javascript:void(0)"  @click="payTrialsActive(item)">online</a></div>
              </template>
              <template v-if="item.status === 1 && item.run_status ==  all_run_status[6] && !item.isExpired && !item.moneyIsEnough">
                <div> <a href="javascript:void(0)"  @click="gotoRecharge">recharge</a></div>
              </template>
            </td>
            </tr>
            <tr v-if="trLists.length === 0">
              <td colspan="14">No Data</td>
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
    </template>
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
import { mapGetters } from 'vuex'
import { NumSub } from '@/utils/calculate.js'
export default {
  name: 'posted_trials',
  data () {
    return {
      thLists: ['Image', 'Title' , 'Price', 'Qty', 
        'Shipping fee', 'Refund', 'Platform fee',  'Security Deposit',
        'Cost', 'Valid date', 'Status', 'Operation'
      ],
      trLists: [],
      country_id: getStore('country_id') || 1,
      allpage: undefined,
      showItem: 7,
      nonApproval: 'self closing',
      detailsDialog: false,
      all_run_status: ['pending','active', 'decline', 'stop', 'close', 'expired', 'underbalance' ],  // 待审核  暂停， 关闭 上线， 审核未通过  过期
      putaway: false,  //是否到达上架时间， 默认未到达
      classifyList: [],
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
        trial_id: ''
      },
      updateRunStatusRequestData: {
        api_token: getToken(),
        user_id: getUserId(),
        trial_id: '',
        run_status: '',
      },
      couponDeteleRequestData: {
        api_token: getToken(),
        user_id: getUserId(),
        country_id: getStore('country_id') || 1,
        trial_id: ''
      },

      //商户手动上线请求接口数据
      payTrialsActiveData: {
        country_id: getStore('country_id') || 1,
        api_token: getToken(),
        user_id: getUserId(),
        trial_id: ''
      }
     
   
    }
  },
  components: {
    pagination
  },
  computed: {
    ...mapGetters([
      'userAccount'
    ]),
    currency () {
      return getStore('currency') || '$'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.initData()
      this.getPostTrialsList()
      this.getHeadCateListInfo()
    },
    initData () {
      if (this.$route.query.id) {
        this.requestdata.trial_id = this.$route.query.id
      }
    },

    //页面跳转
    gotoPage (i) {
      this.requestdata.page = i
      this.$router.push({path: '/posted/trials'})
      this.requestdata.trial_id = ''
      this.getPostTrialsList()
    },
    
    //跳转到新增试用品页面
    add () {
      this.$router.push({path: '/posted/trials/add'})
    },

    //查询 trails
    postedCouponsSearch () {
      this.requestdata.trial_id  = ''
      this.gotoPage(1)
    },

    //获取商家发布的试用品的列表
    getPostTrialsList () {
      this.$api.userTrials(this.requestdata).then(res => {
        let now  = parseInt(Date.now() / 1000)
        for (let i of res.data.data) {
          if (i.start_time > now ) {
            i.putaway = false
          } else {
            i.putaway = true
          }
          if (i.end_time  < now) {
            i.isExpired = true
          }
          if (parseFloat(i.total_fee) <= parseFloat(this.userAccount.amount)) {
            i.moneyIsEnough = true
          } else {
            i.moneyIsEnough = false
          }
          i.start_time = parseTime(i.start_time, '{y}-{m}-{d}')
          i.end_time = parseTime(i.end_time, '{y}-{m}-{d}')
        }

        this.trLists = res.data.data
        this.allpage = res.data.last_page
      })
    }, 

    //获取头部品类列表
    getHeadCateListInfo () {
      this.$api.getHeadCateList().then(res => {
        this.classifyList = res.data
      }).catch(error => {
        console.log(error)
      })
    },

    //跳转到优惠券详情页面
    gotoDetails (item) {
      if (item.status == 1 && item.run_status == this.all_run_status[1]) {
        this.$router.push({ path: '/trialsDetails/' + base64Encode(item.id) + '/' + base64Encode(this.country_id) })
      }
    },

    //跳转到 领取优惠券的用户页面
    gotoTrailsreceiptor (item) {
      if (item.order_numbers === 0) {
        return false
      }
      this.$router.push({ path: '/posted/trials/receiptor' })
      setStore('trialDetails', JSON.stringify(item))
    },

    //跳转到充值界面
    gotoRecharge () {
      this.$router.push({path: '/wallet/recharge'})
    },

    //编辑待审核状态下和审核未通过的优惠券   
    EditCoupon (id) {
      //携带id 查询需要修改的数据，然后进行修改
      this.$router.push({ path: '/posted/trials/add', query: { editor: id } })
    },

    //删除优惠券
    DeleteCoupon (id) {
      this.$confirm('Are you sure to close this trial?', 'Friendly reminder', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      })
        .then(() => {
          this.couponDeteleRequestData.id = id
          this.$api.trialDetele(this.couponDeteleRequestData).then(res => {
            this.getPostTrialsList()
          })
          this.$snotify.success('Delete success')
        })
        .catch(() => {
          console.log('cancel')
        })
    },

    //显示详情弹窗
    showDetails (item) {
      this.detailsRequestData.trial_id = item.id
      this.detailsDialog = true
      if (!item.putaway) {
        this.nonApproval = ' It is not time to hit the shelves '
        return
      }
      this.$api.trialCensor(this.detailsRequestData).then(res => {
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

    //更新优惠券 判断close 的时候给与提示信息
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

    //更新状态执行函数
    updateRunStatusFun (id, run_status) {
      this.updateRunStatusRequestData.trial_id = id
      this.updateRunStatusRequestData.run_status = run_status
      this.$api.trialUpdateRunStatus (this.updateRunStatusRequestData).then(res => {
        if (res.code === 200) {
          this.getPostTrialsList()
        }
      }).catch(error => {
        console.log(error)
      })
    },

    //充值之后商户自己触发按钮手动上线
    payTrialsActive (item) {
      this.$confirm('Determine deleting trial?', 'reminder', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(() => {
        this.payTrialsActiveData.trial_id = item.id
        this.$api.payTrialActive(this.payTrialsActiveData).then(res => {
          if (res.code === 200) {
            this.getPostTrialsList()
          }
        }).catch(err => {
          this.$snotify.error(err)
          console.log(err)
        })
      }).catch(() => {
        console.log('cancel')
      })
    },

    // 减法
    NumberSub (a, b) {
      return NumSub(a, b)
    }

   
   
  
  }
}
</script>

<style lang="less">
@import url('../../../styles/mixin.less');
.table-trials-posted {
  font-size: 10px !important;
  .trials-table-img {
    width: 5rem;
    height: 4rem;
  }
  
}
.trials-title {
  width: 120px;
  text-align: left;
  .trials-title-text {
    height: 28px;
    line-height: 1.21;
    overflow: hidden;
    cursor: pointer;
  }
}
.cost {
  width: 60px;
}
.status {
  width: 100px;
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
