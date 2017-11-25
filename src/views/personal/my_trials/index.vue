<template>
  <div class="my-trials">
    <div class="title-bottom">My Trials</div>
      <div class="tabs">
        <div class="head-s clearfix">
          <div class="tabs-label" 
              v-for="(item, index) in tabsHead"  
              @click="selectTabs(index)"
              :class="{'active': selected == index, 'last': selected == 3 && selected == index, 'first': selected == 0 && selected == index }"
              >
            {{item}}
          </div>
        </div>
        <div class="tabs-body">
          <div v-if="selected == 0" class="content">
            <div class="wait-order">
              <div class="order" v-for="(n, index) in 3" :class="{last: index == 2}">
                <img class="order-img" src="http://www.ghostxy.top/dealsbank/img/01.png" alt="">
                <div class="center-content">
                  <div class="order-title">STATE Geo Mesh CoidGeoMesh Cold Shoulder
                  Shift Dress </div>
                  <div class="info">
                    <span>
                      <label>Price: </label>
                      <i>$196.00</i>
                    </span>
                    <span>
                      <label>Shipping fee: </label>
                      <i>$196.00</i>
                    </span>
                    <span>
                      <label>Refund: </label>
                      <i>$196.00</i>
                    </span>
                  </div>
                  <div class="footer">
                    <span class="footer-span">Order number:</span>
                    <el-input class="footer-input"></el-input>
                    <button type="button">Save</button>
                  </div>
                </div>
                <div class="right-content">
                  <p> <i class="iconfont icon-icon-test"></i> Ends in <strong>3</strong> days <strong>16</strong> hours <strong>52</strong> minutes</p>
                  <p>If the order number is not submitted within
                    the allowed time, your trial qualification will
                    be canceled.</p>
                </div>
              </div>
              <pagination
               v-if="allpage && allpage != 1"
              :allpage="allpage"
              :show-item="showItem"
              @handlecurrent="test">
              </pagination>
            </div>
          </div>
          <div v-if="selected == 1" class="content">
            <div class="wait-order">
             <div class="order" v-for="(n, index) in 3" :class="{last: index == 2}">
               <img class="order-img" src="http://www.ghostxy.top/dealsbank/img/01.png" alt="">
                <div class="center-content">
                  <div class="order-title">STATE Geo Mesh CoidGeoMesh Cold Shoulder
                  Shift Dress </div>
                  <div class="info">
                    <span>
                      <label>Price: </label>
                      <i>$196.00</i>
                    </span>
                    <span>
                      <label>Shipping fee: </label>
                      <i>$196.00</i>
                    </span>
                    <span>
                      <label>Refund: </label>
                      <i>$196.00</i>
                    </span>
                  </div>
                  <div class="footer">
                    <span class="footer-span">Order number:</span>
                    <span class="footer-span" v-if="true">1119-3333-4446-0305</span>
                    <el-input v-else class="footer-input"></el-input>

                    <button v-if="true" type="button">Modity</button>
                    <button v-else type="button">Save</button>
                  </div>
                </div>
                <div class="right-content">
                  <template v-if="false">  
                    <div class="footer">
                      <span class="footer-span">Review URL:</span>
                      <el-input class="footer-input"></el-input>
                      <button type="button">Save</button>
                    </div>
                    <p>Please upload your review within 20 business days after 
                      ordering and submit the link address for the review, 
                      otherwise your money will not the returned.</p>
                  </template>
                  <template v-else-if="false">
                    <div class="pending">
                      <span class="pending-l">Pending</span>
                    </div>
                    <div class="pending">
                      <a  href="#" >View</a>
                    </div>
                    <div class="pending">
                      <button type="button">Modity</button>
                    </div>
                  </template>
                  <template v-else>
                    <div class="not-pass">
                      <div class="not-pass-title">Not pass</div>
                      <div class="not-pass-text">No relevant orders 
                        were found</div>
                    </div> 
                    <div class="pending " style="visibility:hidden">
                      <span class="pending-l">Pending</span>
                    </div>
                    <div class="pending">
                      <a  href="#" >View</a>
                    </div>
                    <div class="pending">
                      <button type="button">Modity</button>
                    </div>
                  </template>
                </div>
              </div>
              <pagination
              v-if="allpage && allpage != 1"
              :allpage="allpage"
              :show-item="showItem"
              @handlecurrent="test">
              </pagination>
            </div>
          </div>
          <div v-if="selected == 2" class="content">
            <div class="wait-order">
              <div class="order" v-for="(n, index) in 3" :class="{last: index == 2}">
                <img class="order-img" src="http://www.ghostxy.top/dealsbank/img/01.png" alt="">
                <div class="center-content">
                  <div class="order-title">STATE Geo Mesh CoidGeoMesh Cold Shoulder
                  Shift Dress </div>
                  <div class="info">
                    <span>
                      <label>Price: </label>
                      <i>$196.00</i>
                    </span>
                    <span>
                      <label>Shipping fee: </label>
                      <i>$196.00</i>
                    </span>
                    <span>
                      <label>Refund: </label>
                      <i>$196.00</i>
                    </span>
                  </div>
                   <div class="footer">
                    <span class="footer-span">Order number:</span>
                    <span class="footer-span" v-if="true">1119-3333-4446-0305</span>
                  </div>
                </div>
                <div class="right-content">
                  <div class="pending complete complete-left">
                      <div class="complete-text">complete</div>
                      <div class="complete-refunded">Refunded to balance</div>
                  </div>
                  <div class="pending complete complete-right">
                    <el-rate  class="rate"
                      v-model="value5"
                      disabled
                      text-color="#ff9900"
                      >
                    </el-rate>
                    <div class="picture-video">
                      <span class="picture">Picture: 3</span>
                      <span class="video">Video: 1</span>
                    </div>
                    <div class="view">
                      <a href="">View</a>
                    </div>
                  </div>
                </div>
              </div>
              <pagination
                v-if="allpage && allpage != 1"
                :allpage="allpage"
                :show-item="showItem"
                @handlecurrent="test">
              </pagination>
            </div>
          </div>
          <div v-if="selected == 3" class="content">
            <div class="wait-order">
              <div class="order" v-for="(n, index) in 3" :class="{last: index == 2}">
                <img class="order-img" src="http://www.ghostxy.top/dealsbank/img/01.png" alt="">
                <div class="center-content">
                  <div class="order-title">STATE Geo Mesh CoidGeoMesh Cold Shoulder
                  Shift Dress </div>
                  <div class="info">
                    <span>
                      <label>Price: </label>
                      <i>$196.00</i>
                    </span>
                    <span>
                      <label>Shipping fee: </label>
                      <i>$196.00</i>
                    </span>
                    <span>
                      <label>Refund: </label>
                      <i>$196.00</i>
                    </span>
                  </div>
                  <div class="footer">
                    <span class="footer-span">Order number:</span>
                    <span class="footer-span" v-if="true">1119-3333-4446-0305</span>
                  </div>
                </div>
                <div class="right-content expired">
                  <p class="expired-top">Expired</p>
                  <p class="expired-text">If fail to upload review in time,<br />
you will exceed the time limit of task.</p>
                </div>
              </div>
              <pagination
               v-if="allpage && allpage != 1"
              :allpage="allpage"
              :show-item="showItem"
              @handlecurrent="test">
              </pagination>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import pagination from '@/components/page_index_coupons/pagination.vue'
export default {
  name: 'my_trials',
  components: {
    pagination
  },
  data () {
    return {
      tabsHead: [
        'Waiting for Order', 'Waiting for Review', 'Completed', 'Expired'
      ],
      selected: 0,
      allpage: undefined,
      showItem: 7,
      value5: 3.6

    }
  },
  methods: {
    selectTabs (index) {
      this.selected = index
    },
    test (i) {
      console.log(i)
    }
  }
}
</script>

<style lang="less">
@import url('../../../styles/mixin.less');
   .tabs {
     height: 730px;
     border: 1px solid #e1e1e1;
      .head-s {
        font-size: 1.33rem;
        height: 72px;
        background: #f9f9f9;
        border-bottom: 1px solid #e1e1e1;
        border-left: 1px solid #e1e1e1;
        margin-left: -1px;
        .tabs-label {
          width: 25%;
          height: 100%;
          float: left;
          text-align: center;
          line-height: 72px;
          cursor: pointer;
          color: #808080;
          &:hover {
            color: #808080;
          }
          &.active {
            height: 72px;
            color: #1a1a1a;
            background: white;
            border-left: 1px solid #e1e1e1;
            border-right: 1px solid #e1e1e1;
            &.last {
              border-right: none;
            }
            &.first {
              border-left: none;
            }
          }
        }
      }
      .tabs-body {
        .wait-order {
          .order {
            position: relative;
            height: 190px;
            border-bottom: 1px solid #e1e1e1;
            padding: 38px 0 38px 160px;
            &.last {
              border-bottom: none;
            }
            .order-img {
              position: absolute;
              top: 38px;
              left: 15px;
              width: 120px;
              height: 108px;
            }
            .center-content {
              display: inline-block;
              margin-left: 25px;
              width: 44%;
              height: 118px;
              .order-title {
                color: #333;
                font-size: 0.89rem;
                margin-bottom: 20px;
                width: 80%;
              }
              .info {
                margin-bottom: 20px;
                span {
                  margin-right: 10px;
                  font-size: 0.78rem;
                  label {
                    color: #808080;
                  }
                }
              }
              .footer {
                .footer-span {
                  color: #333;
                  font-size: 0.89rem;
                }
                .footer-input {
                  width:40%;
                  .el-input__inner {
                    height: 24px;
                  }
                }
                button {
                  .btn-h(4rem, 24px, #82b838, #82b838, #fff);
                  font-size: 0.78rem;
                  line-height: 1.43;
                  &:active {
                    background: darken(#82b838, 10%);
                    border-color: darken(#82b838, 10%);
                  }
                }

              }
            }
            .right-content {
              position: absolute;
              top: 38px;              
              right: 10px;
              width: 36%;
              height: 118px;
              p {
                strong {
                  color: #1a1a1a;
                }
                color: #898989;
                font-size: 0.83rem;
              }
              .footer {
                .footer-span {
                  color: #333;
                  font-size: 0.89rem;
                }
                .footer-input {
                  width:40%;
                  .el-input__inner {
                    height: 24px;
                  }
                }
                button {
                  .btn-h(4rem, 24px, #82b838, #82b838, #fff);
                  font-size: 0.78rem;
                  line-height: 1.43;
                  &:active {
                    background: darken(#82b838, 10%);
                    border-color: darken(#82b838, 10%);
                  }
                }
              }
              .pending {
                display: inline-block;
                position: relative;
                top: 47px;
                color: #88bb3a;
                width: 32%;
                text-align: center;
                button {
                  .btn-h(4rem, 24px, #82b838, #82b838, #fff);
                  font-size: 0.78rem;
                  line-height: 1.43;
                  &:active {
                    background: darken(#82b838, 10%);
                    border-color: darken(#82b838, 10%);
                  }
                }
                &.complete {
                  width: 46%;
                  .complete-text {
                    font-size: 0.88rem;
                    margin-bottom: 5px;
                  }
                  .complete-refunded {
                    color: #8a8a8a;
                    font-size: 0.78rem;
                  }
                  &.complete-left {
                    position: relative;
                    top: -8px;
                  }
                  &.complete-right {
                    position: relative;
                    top: 11px;
                    .rate {
                      margin-bottom: 15px;
                    }
                    .picture-video {
                      margin-bottom: 15px;
                      span {
                        color: #666;
                        font-size: 0.78rem;
                        &.picture {
                          margin-right: 15px;
                        }
                      }
                    }
                  }
                }
              }
              .not-pass {
                position: absolute;
                display: inline-block;
                width: 6rem;
                top: 34px;
                text-align: center;
                left: 0;
                font-size: 0.89rem;
                .not-pass-title {
                  color: #ec5b1c;
                }
                .not-pass-text {
                  color: #8a8a8a;
                }
              }

              &.expired {
                width: 28%;
                text-align: center;
                .expired-top {
                  color: #ec5b1c;
                  font-size: 0.88rem;
                  margin-bottom: 8px;
                }
                .expired-text {
                  color: #8a8a8a;
                  font-size: 0.78rem;
                }
              }
            }
          }
        }
        

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
  }
</style>
