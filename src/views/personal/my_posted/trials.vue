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
    </template>
   <template v-else>
     this is trials add pages;
   </template>
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
      allpage: 30,
      showItem: 7,
      gotoAddPage: false
    }
  },
  components: {
    pagination
  },
  methods: {
    test (i) {
      console.log(i)
    },
    add () {
      this.gotoAddPage = !this.gotoAddPage
    }
  }
}
</script>

<style lang="less" >
@import url('../../../styles/mixin.less');
.posted-coupons {
  .pro-header {
  position: relative;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 1rem;
  }
  .title {
    font-size: 1.5rem;
    margin: .7rem 0;
    font-weight: normal;
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
