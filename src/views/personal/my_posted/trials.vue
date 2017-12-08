<template>
  <div class="posted-coupons">
    <template>
       <div class="pro-header">
        <h3 class="title">Trials Posted</h3>
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
        <option :value="all_run_status[6]">Underbalance</option>
      </select>

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
            <tr v-for="item in trLists">
              <td>
                <img class="trials-table-img" :src="item.product_img.split(',')[0]" alt="">
              </td>
              <!-- title -->
              <td class="trials-title">
                <div class="trials-title-platform">{{item.website}}</div>
                <div class="trials-title-text"  @click="gotoDetails(item)">{{item.product_title}}</div>
                <a href="javascript:void(0);"  @click="gotoDetails(item)">Electronics</a>
              </td>
              <!-- store -->
              <td class="trials-store">
                <div class="trials-store-content" v-if="item.user_store">
                  {{item.user_store.store_name}}
                </div>
              </td>
              <!-- List price -->
              <td>
                <div >
                  {{currency}}{{item.product_price}}
                </div>
              </td>
              <!-- quantity -->
              <td>
                <div>
                  {{item.quantity_per_day}}
                </div>
              </td>
              <!-- applied -->
              <td>
                 <a href="javascript:void(0)" @click="gotoTrailsreceiptor">
                   {{item.apply_numbers}}
                </a>
               
              </td>
              <!-- shipping_fee -->
              <td>
                <div>
                  {{currency}}{{item.shipping_fee}}
                </div>
              </td> 
              <!-- promotion_fee -->
              <td>
                <div>
                  {{currency}}{{item.total_fee}}
                </div>
              </td>
              <!-- refund -->
              <td>
                <div>
                  {{currency}}{{item.refund_price}}
                </div>
              </td>
              <!-- security_deposit -->
              <td>
                <div>
                  {{currency}}{{item.total_fee}}
                </div>
              </td>

                <!-- Cost -->
              <td>
                <div>
                  {{currency}}{{item.real_fee}}
                </div>
              </td>
                <!-- valid_date -->
              <td>
                <div>
                  {{item.start_time}} to {{item.end_time}}
                </div>
              </td>
                <!-- Status -->
               <td class="status">
              <div class="blue" v-if="item.status === 0 ">Pending</div>
              <div class="green" v-if="item.status === 1 && item.run_status ==  all_run_status[1] ">Active </div>
              <div class="red" v-if="item.status === 2 && item.run_status ==  all_run_status[2] ">Decline</div>
              
              <div class="blue" v-if="item.status === 1 && item.run_status ==  all_run_status[3]">Stop</div>
              <div class="red" v-if="item.status === 1 && item.run_status ==  all_run_status[4] ">Close</div>
              <div class="red" v-if="item.status === 1 && item.run_status ==  all_run_status[5] ">Expired</div>
              <div class="red" v-if="item.status === 1 && item.run_status ==  all_run_status[6] ">Underbalance</div>
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
                <!-- <div> <a href="javascript:void(0)" @click="DeleteCoupon(item.id)">Delete</a></div> -->
                <div> <a href="javascript:void(0)"  @click="showDetails(item)">Details</a></div>
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
import { userTrials, getHeadCateList ,trialCensor, trialUpdateRunStatus, trialDetele } from '@/api/login'
import { setStore , getStore} from '@/utils/utils'
import { getToken, getUserId } from '@/utils/auth'
import { parseTime } from '@/utils/date'
import { base64Encode } from '@/utils/randomString'
export default {
  name: 'posted_trials',
  data () {
    return {
      thLists: ['Image', 'Title', 'Store' , 'List Price', 'Quantity', 'Applied', 
        'Shipping fee', 'Promotion Fee', 'Pefund', 'Security Deposit',
        'Cost', 'Valid date', 'Status', 'Operation'
      ],
      trLists: [{
        product_img: 'http://www.ghostxy.top/dealsbank/img/01.png',
        product_title: 'this is title',
        platform: 'Amazon',
        store: 'A11',
        product_prcie: '98.00',
        quantity: '20',
        applied: '15',
        shipping_fee: '68.00',
        promotion_fee: '85.00',
        refund: '1969.00',
        security_deposit: '2060.00',
        cost: '0',            
        valid_date: '2017-09-08 to 2017-10-01',
        status: '1',


      }],
      allpage: undefined,
      showItem: 7,
      nonApproval: '',
      detailsDialog: false,
      all_run_status: ['pending','active', 'decline', 'stop', 'close', 'expired', 'underbalance' ],  // 待审核  暂停， 关闭 上线， 审核未通过  过期
      classifyList: [

      ],
      requestdata: {
        user_id: getUserId(),
        api_token: getToken(),
        page: 1,
        page_size: 3,
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
        trial_id: ''
      }
     
   
    }
  },
  components: {
    pagination
  },
  computed: {
    currency () {
      return getStore('currency') || '$'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getPostTrialsList()
      this.getHeadCateListInfo()
    },
    initData () {

    },

    //页面跳转
    gotoPage (i) {
      this.requestdata.page = i
      this.getPostTrialsList()
    },
    
    //跳转到新增试用品页面
    add () {
      this.$router.push({path: '/posted/trials/add'})
    },

    //查询 trails
    postedCouponsSearch () {
      this.getPostTrialsList()
    },

    //获取商家发布的试用品的列表
    getPostTrialsList () {
      userTrials(this.requestdata).then(res => {
        console.log(res)
        for (let i of res.data.data) {
          i.start_time = parseTime(i.start_time, '{y}-{m}-{d}')
          i.end_time = parseTime(i.end_time, '{y}-{m}-{d}')
        }
        this.trLists = res.data.data
        this.allpage = res.data.last_page
      })
    }, 

    //获取头部品类列表
    getHeadCateListInfo () {
      getHeadCateList().then(res => {
        console.log(res)
        this.classifyList = res.data
      }).catch(error => {
        console.log(error)
      })
    },

    //跳转到优惠券详情页面
    gotoDetails (item) {
      if (item.status == 1 && item.run_status == this.all_run_status[1]) {
        this.$router.push({ path: '/trialsDetails/' + base64Encode(item.id)  })
      }
    },

    //跳转到 领取优惠券的用户页面
    gotoTrailsreceiptor (item) {
      if (item.pick_numbers === 0) {
        return false
      }
      this.$router.push({ path: '/posted/trials/receiptor' })
      setStore('couponDetails', JSON.stringify(item))
    },

    //编辑待审核状态下和审核未通过的优惠券   
    EditCoupon (id) {
      console.log(id)
      //携带id 查询需要修改的数据，然后进行修改
      this.$router.push({ path: '/posted/trials/add', query: { editor: id } })
    },

    //删除优惠券
    DeleteCoupon (id) {
      this.$confirm('Determine deleting trial?', 'reminder', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        type: 'warning'
      })
        .then(() => {
          this.couponDeteleRequestData.id = id
          console.log(this.couponDeteleRequestData)
          trialDetele(this.couponDeteleRequestData).then(res => {
            console.log(res)
            this.getPostTrialsList()
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
      this.detailsRequestData.trial_id = id
      this.detailsDialog = true
      trialCensor(this.detailsRequestData).then(res => {
        this.nonApproval = res.data.content
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
      console.log(this.updateRunStatusRequestData)
      trialUpdateRunStatus (this.updateRunStatusRequestData).then(res => {
        if (res.code === 200) {
          this.getPostTrialsList()
        }
      }).catch(error => {
        console.log(error)
      })
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
.table-trials-posted {
  font-size: 10px !important;
  .trials-table-img {
    width: 5rem;
    height: 4rem;
  }
  
}
.trials-title {
  width: 120px;
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
