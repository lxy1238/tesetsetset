<template>
  <div class="posted-coupons">
       <div class="pro-header">
        <h3 class="title">My Wallet</h3>
      </div>
      <div class="title-s" v-title="'Transaction Record'">
        Transaction Record
      </div>

      <div class="table-box">
        <table class="table-self">
          <thead>
            <tr>
              <th v-for="item in thLists">{{item}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in trLists" v-if="trLists.length !== 0">
              <td>{{item.updated_at}}</td>
              <td>{{item.business_number}}</td>
              <td class="capitalize">{{item.business_name}}</td>
              <td>
                <a  v-if="item.detail == 'Trial audit'" href="javascript:void(0);" @click="gotoPostTrials(item)">
                  {{item.business_ID}}
                </a>
                <a  v-else-if="item.detail == 'Trials refunded'" href="javascript:void(0);" @click="gotoCompleteTrials(item)">
                  {{item.business_ID}}
                </a>
                <div v-else>{{item.business_ID}}</div>

              </td>
              <td class="capitalize">{{item.business_type}}</td>
              <td class="capitalize">{{item.detail}}</td>
              <td>
                <div class="green" v-if="item.business_type == 'income'">
                  +{{currency}}{{item.trade_amount}}
                </div>
                <div class="red" v-else>
                  -{{currency}}{{item.trade_amount}}
                </div>
                

              </td>
              <!-- <td>{{item.run_status}}</td> -->
            </tr>
            <tr v-if="trLists.length === 0" >
              <td colspan="10">
                No Data
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <pagination class="coupons-pagination"
        v-if="allpage && allpage != 1"
        :allpage="allpage"
        :show-item="showItem"
        :current="reqData.page"
        @handlecurrent="gotoPage">
      </pagination>
  </div>
</template>

<script>
import pagination from '@/components/page_index_coupons/pagination.vue'
import { getUserId, getToken } from '@/utils/auth'
import { getStore } from '@/utils/utils'
export default {
  name: 'posted_trials',
  data () {
    return {
      // thLists: ['Date', 'Serial Number', 'Type', 'Amount', 'result'],
      thLists: ['Date', 'Serial Number', 'Issue', 'Issue ID', 'Type', 'Description', 'Amount'],
      trLists: [],
      allpage: undefined,
      showItem: 7,
      reqData: {
        country_id: parseInt(getStore('country_id')) || 1,
        api_token: getToken(),
        user_id: getUserId(),
        page: 1,
        page_size: 10,
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
      this.getfinancialInfo()
    },
    //获取列表数据
    getfinancialInfo () {
      this.$api.tradeRecord(this.reqData).then(res => {
        this.trLists = res.data.data
        this.allpage = res.data.last_page
      })
    },
    //翻页
    gotoPage (i) {
      this.reqData.page = i
      this.getfinancialInfo()
    },
    gotoPostTrials (item) {
      let trial_id = item.business_name_id
      this.$router.push({path: '/posted/trials', query: {id: trial_id}})
    },
    gotoCompleteTrials (item) {
      let trial_id = item.business_name_id
      this.$router.push({path: '/personal/my-trials/index', query: {id: trial_id, status: 2}})
    } 
  }
}
</script>

<style lang="less">
.posted-coupons {
  font-size: 12px;
  .pro-header {
    position: relative;
    margin-bottom: 1rem;
  }
}
.table-self {
  td,th {
    padding: 10px;
  }
}

</style>
