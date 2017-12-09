<template>
  <div class="pagination-all" >
    <ul class="pagination" >
        <li   class="left">
          <button @click="goto(current - 1)"  class="items btn-s" href="javascript:void(0);" :class="{notallow: current == 1}"> 
            <i class="el-icon-caret-left"></i>
          </button>
        </li>
        <li v-for="index in pages" @click="goto(index)" :class="{active:current == index}" :key="index">
          <a  class="items" href="javascript:void(0);" >{{index}}</a>
        </li>
        <li class="right">
          <button @click="goto(current + 1)" class="items btn-s" href="javascript:void(0); " :class="{notallow: current == allpage}"> 
            <i class="el-icon-caret-right"></i>
          </button>
        </li>
        <li class="goto-page">Go To Page <input type="text" @keyup="limit($event)" v-model="gotoPageValue"> <button  @click="gotoPage(gotoPageValue)">Go</button></li>
    </ul>
  </div>
</template>

<script>
import { Icon } from 'element-ui'
import Vue from 'vue'
Vue.use(Icon)
export default {
  name: 'pagination',
  data () {
    return {
      gotoPageValue: 1,
    }
  },
  props: {
    showItem: Number,
    allpage: Number,
    current: {
      type: Number,
      default: 1
    }
  },
  computed: {
    pages () {
      var pag = []
      if (this.current < this.showItem) {
        //如果当前的激活的项 小于要显示的条数
        //总页数和要显示的条数那个大就显示多少条
        let i = Math.min(this.showItem, this.allpage)
        while (i) {
          pag.unshift(i--)
        }
      } else {
        //当前页数大于显示页数了
        var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
          i = this.showItem
        if (middle > this.allpage - this.showItem) {
          middle = this.allpage - this.showItem + 1
        }
        while (i--) {
          pag.push(middle++)
        }
      }
      return pag
    },
  },
  methods: {
    goto (index) {
      document.body.scrollTop = document.documentElement.scrollTop = 0
      if (index === 1) {
        document.getElementsByClassName('btn-s')[0].disabled = true
        document.getElementsByClassName('btn-s')[1].disabled = false
      } else if (index === this.allpage) {
        document.getElementsByClassName('btn-s')[1].disabled = true
        document.getElementsByClassName('btn-s')[0].disabled = false
      } else {
        document.getElementsByClassName('btn-s')[1].disabled = false
        document.getElementsByClassName('btn-s')[0].disabled = false
      }
      if (index == this.current) return
      // this.current = index
      this.$emit('handlecurrent', index)
    },
    limit (e) {
      if (e.keyCode === 13 && (!isNaN(Number(this.gotoPageValue)))) {
        this.gotoPage(this.gotoPageValue)
      } else {
        this.gotoPageValue = this.gotoPageValue.replace(/\D/g, '')
      }
    },
    gotoPage (data) {
      if (data >= this.allpage) {
        data = this.allpage
        this.goto(data)
      } else if (data <= 1) {
        data = 1
        this.goto(data)
      } else {
        this.goto(data)
      }
    }
  },
  mounted () {
    document.getElementsByClassName('btn-s')[0].disabled = true
    if (this.allpage === 1) {
      document.getElementsByClassName('btn-s')[1].disabled = true
      document.getElementsByClassName('btn-s')[0].disabled = true
    }
  }
}
</script>

<style lang="less">
@import url("../../styles/mixin.less");
.pagination-all {
  .p(r);
  top: -1rem;
  display: block;
  height: 4rem;
  line-height: 4rem;
  margin: 1.5rem 0 0 0;
  // text-align: center;
}

.pagination {
  position: relative;
  width: 50rem;
  margin: 0 auto;
 
  li {
    display: inline-block;
    // margin: 0 5px;
    margin-right: 5px;
    text-align: center;
    .items {
      display: inline-block;
      cursor: pointer;
      outline: none;
      width: 35px;
      height: 35px;
      line-height: 35px;
      border: 1px solid #848484;
      border-radius: 5px;
      background: #e4e4e4;
      color: rgb(137, 137, 137);
      &.notallow {
        cursor: not-allowed;
      }
      &:hover {
        background: #eee;
      }
    }
    &.active {
      a {
        // background: #0e90d2;
        color: rgb(34, 24, 21);
        border-color: #e4e4e4;
      }
    }
  
  }
   .left, .right {
    color: black;
    .items {
      color: inherit;
    }
  }
  

  .goto-page {
    position: absolute;
    right: 0;
    display: inline-block;
    color: rgb(34, 24, 21);
    margin-right: 0;
    input {
      width: 45px;
      height: 45px;
      outline: none;
      border-radius: 5px;
      padding: 0.4rem;
    }
    button {
      display: inline-block;
      background: white;
      border-radius: 5px;
      width: 54px;
      height: 36px;
      cursor: pointer;
      outline: none;
      border: 1px solid #eee;
      &:hover {
        background: darken(white, 30%);
        border-color: darken(white, 30%);
      }
      &:active {
        background: darken(white, 20%);
        border-color: darken(white, 20%);
      }
    }
  }
}
</style>
