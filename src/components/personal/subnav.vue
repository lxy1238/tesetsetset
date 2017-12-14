<template>
  <div class="subnav-center clearfix">
   <div class="pages-content clearfix">
     <div class="subnav-l">
       <div class="nav">
          <div class="nav-items" v-for="(items, index_p) in routers" :class="{last: index_p == routers.length}" v-if="!items.hidden">
            <div class="nav-header" @click="clickHeader(items, index_p)">
              <router-link :to="items.path"  v-if="!items.hasChilds"  :class="{active: items.redirect == currentRouter}">
                {{items.text}}
                <span v-if="items.redirect == currentRouter">></span>
              </router-link>
              <a href="javascript:void(0);" v-else>{{items.text}}</a>
            </div>
            <template  v-if="items.hasChilds && items.isToggle">
              <div class="nav-child" 
                  v-for="(item, index) in items.children"
                  v-if="item.hidden !== true"
                  :class="{last: index == items.children.length - 1}">
                <router-link  :to="item.path"  :class="{active: currentRouter.search(item.path) != -1 }">{{item.text}}
                  <span v-if="currentRouter.search(item.path) != -1">></span>
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
import { mapGetters } from 'vuex'
export default {
  name: 'subnav',
  data () {
    return {
    }
  },
  props: {
    routers: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.init()
    }, 100)
  },
  computed : {
    ...mapGetters([
      'currentRouter'
    ]),
  },
  watch: {
    currentRouter: function (value) {
      this.changeToggle(value)
    }
  },
  methods: {

    //进入初始化
    init () {
      this.changeToggle(this.currentRouter)
    },

    //栏目自动展开
    changeToggle (value) {
      this.routers.forEach((parent) => {
        if (parent.children) {
          parent.children.forEach((e) => {
            if (e.path == value) {
              parent.isToggle = true
            }
          })
        }
      })
    },

    //点击父节点的时候展开收起
    clickHeader (items) {
      if (items.children) {
        items.isToggle = !items.isToggle
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../styles/mixin.less');
.subnav-center {
  .subnav-l {
    float: left;
    width: 21.9%;
    height: 800px;
    margin-right: 4.1%;
    
    .nav {
      font-size: 1rem;
      color: #666;
      border-right: 1px solid #e6e6e6;
      height: 800px;
    
      .nav-items {
        &.last {
          border-bottom: none;
        }
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
          padding: 5px 18px 5px 5px;
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
    width: 74%;
  }

}

</style>
