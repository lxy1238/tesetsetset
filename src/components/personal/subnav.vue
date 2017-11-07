<template>
  <div class="subnav-center clearfix">
   <div class="pages-content clearfix">
     <div class="subnav-l">
       <div class="nav">
          <div class="nav-items" v-for="(items, index_p) in routers" v-if="!items.hidden">
            <div class="nav-header" @click="clickHeader(items, index_p)">
              <router-link :to="items.path"  v-if="!items.childs"  :class="{active: index_p == selected}">
                {{items.text}}
                <span v-if="index_p == selected">></span>
              </router-link>
              <a href="javascript:void(0);" v-else>{{items.text}}</a>
            </div>
            <template v-if="items.childs && items.isToggle">
              <div class="nav-child" 
                  v-for="(item, index) in items.childs"  
                  @click="selectLink(items, index , index_p)"
                  :class="{last: index == items.childs.length - 1}">
                <router-link :to="item.path"  :class="{active: index == selected_s && index_p == selected }">{{item.text}}
                  <span v-if="index == selected_s && index_p == selected">></span>
                </router-link>
              </div>
            </template>
          </div>
       </div>
     </div>
      <div class="subnav-r ">
       <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'subnav',
  data () {
    return {
      selected: 0,
      selected_s: undefined,
      routers: [
        {
          isActive: false,
          isToggle: false,
          text: 'Profile Overview',
          path: '/personal',
        },
        {
          isActive: false,
          isToggle: false,
          text: 'My Promotion',
          path: '/personal/promotion'
        },
        {
          isActive: false,
          isToggle: false,
          text: 'My Posted',
          childs: [
            {
              path: '/personal/coupons',
              text: 'Coupons'
            },
            {
              path: '/personal/trials',
              text: 'Trials'
            }
          ]
        },
        {
          isActive: false,
          isToggle: false,
          text: 'Performance report',
          childs: [
            {
              path: '/personal/statistical',
              text: 'Statistical Analysis'
            },
            {
              path: '/personal/transaction',
              text: 'Transaction Details'
            }
          ]
        },
        {
          isActive: false,
          isToggle: false,
          text: 'My Wallet',
          childs: [
            {
              path: '/personal/financial',
              text: 'Financial Record'
            },
            {
              path: '/personal/withdraw',
              text: 'Withdraw'
            }
          ]
        },
        {
          isActive: false,
          isToggle: false,
          text: 'My Coupons',
          path: '/personal/my_coupons'
        },
        {
          isActive: false,
          isToggle: false,
          text: 'My Trials',
          path: '/personal/my_trials'
        },
        {
          isActive: false,
          isToggle: false,
          text: 'Settings',
          childs: [
            {
              path: '/personal/account',
              text: 'Account Basics'
            },
            {
              path: '/personal/shop',
              text: 'Shop Settings'
            },
            {
              path: '/personal/apiManagement',
              text: 'API Management'
            },
            {
              path: '/personal/modify',
              text: 'Modify Password'
            }
          ]
        },
     
      ],
    }
  },
  methods: {
    clickHeader (items, index_p) {
      if (items.childs) {
        items.isToggle = !items.isToggle
      } else {
        this.selected_s = undefined
        this.selected = index_p
      }
    },
    selectLink(items, index, index_p) {
      this.selected = index_p
      this.selected_s = index
    },
  }
}
</script>

<style lang="less" scoped>
@import url('../../styles/mixin.less');
.subnav-center {
 
  .subnav-l {
    float: left;
    width: 18.9%;
    height: 1000px;
    margin-right: 4.1%;
    
    .nav {
      font-size: 1rem;
      color: #666;
      border-right: 1px solid #e6e6e6;
      height: 1000px;
    
      .nav-items {
        border-bottom: 1px solid #e6e6e6;
        width: 80%;
        .nav-header {
          height: 3.33rem;
          line-height: 3.33rem;
          padding-right: 30px;
          transition: all .3s;
          font-size: 1rem;
          span {
            float: right;
          }
          &:hover {
            color: #84E1FF;
          }
        }
        .nav-child {
          padding: 5px 30px 5px 5px;
          color: #a6a6a6;
          animation: 0.5s;
          margin-bottom: 1rem;
          font-size: 14px;
          &:hover {
            color: #84E1FF;
          }
          span {
            float: right;
          }
          &.last {
            margin-bottom: 0.5rem;
          }
        }
      } 
    }
    a {
      display: inline-block;
      width: 100%;
      height: 100%;
      color: inherit;
      &.active {
        color: #0072bc;
      }
    }
  }
  .subnav-r {
    float: left;
    width: 76%;
    // border: 1px solid #0072bc;
    // height: 1000px;
  }

}

</style>
