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
         v-if="allpage"
        :allpage="allpage"
        :show-item="showItem"
        @handlecurrent="test">
      </pagination>
  </div>
</template>

<script>
import pagination from '@/components/page_index_coupons/pagination.vue'
export default {
  name: 'posted_trials',
  data () {
    return {
      thLists: [1, 2, 3],
      trLists: [1, 2, 3],
      allpage: undefined,
      showItem: 7,
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
  }
}
</script>

<style lang="less">
@import url('../../../styles/mixin.less');
.posted-coupons {
  .pro-header {
    position: relative;
    margin-bottom: 1rem;
  }
  .title {
    font-size: 1.5rem;
    margin: .7rem 0;
    font-weight: normal;
  }
  .title-s {
    margin-bottom: 1rem;
    font-size: 1rem;
    line-height: 2rem;
    color: #1a1a1a;
    border-bottom: 1px solid #e6e6e6;
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

</style>
