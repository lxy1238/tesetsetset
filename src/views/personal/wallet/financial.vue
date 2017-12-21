<template>
  <div class="posted-coupons">
       <div class="pro-header">
        <h3 class="title">My Wallet</h3>
      </div>
      <div class="title-s">
        finacial
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
              <td>{{item.pay_order_number}}</td>
              <td>{{item.trade_type}}</td>
              <td>{{item.amount}}</td>
              <td>{{item.run_status}}</td>
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
      thLists: ['Date', 'Serial Number', 'Type', 'Amount', 'result'],
      // thLists: ['Date', 'Serial Number', 'Issue', 'Issue ID', 'Type', 'Desctiption', 'Amount', 'result'],
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
  }
}
</script>

<style lang="less">
@import url('../../../styles/mixin.less');
.posted-coupons {
  font-size: 12px;
  .pro-header {
    position: relative;
    margin-bottom: 1rem;
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

</style>
