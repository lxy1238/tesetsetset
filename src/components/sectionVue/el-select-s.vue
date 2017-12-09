<template>
  <div class="el-select-self">
    <span class="caret-s" :class="{is_re:show}" @click="click"></span>
    <input class="select-input el-input__inner" type="text" readonly placeholder="请选择" @click="click" @blur="blur" v-bind:value="value" />
    <transition name="fade">
      <ul v-if="show" class="parent">
        <li v-if="list.length === 0" class="no-data">no data</li>
        <li class="parent-li"  @click="selectValue(items)" v-for="(items, index) in list" @mouseover="liHover(index)" @mouseout="liMove" > 
          {{items.name}}
          <span v-if="items.childrens.length != 0" class="caret-s right"></span>
          <ul class="child" v-if="select === index && items.childrens.length != 0"  >
            <li class="parent-li child-li"  v-for="item in items.childrens" @click.stop="selectValue(items, item)">
              {{item.name}}
            </li>
          </ul>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      select: -1,
    }
  },
  props: {
    list: {
      default: function () {
        return []
      }
    },
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    click () {
      this.show = !this.show
    },
    blur () {
      this.show = false
    },
    selectValue (items, item) {
      this.$emit('child', items, item)
    },
    liHover (index) {
      this.select = index
    },
    liMove () {
      this.select = -1
    }
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less"  >
.el-select-self {
  position: relative;
  display: inline-block;
  width: 220px;
  height: 24px;
   .parent {
    position: absolute;
    top: 40px;
    left: 0;
    min-width: 220px;
    z-index: 999;
    padding: 6px 0;
    background: white;
    box-shadow: 0 0 5px 1px rgba(100, 100, 100, .3);
    transition: all .5s ease .1s;
      .no-data {
        text-align: center;
        padding: 8px 10px;
        color: #48576a;
      }
     .parent-li {
      text-decotation: none;
      font-size: 14px;
      font-weight: normal;
      padding: 8px 10px;
      position: relative;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #48576a;
      height: 36px;
      line-height: 1.5;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        background: #e4e8f1;
      }
      .child {
        position: absolute;
        padding: 6px 0;
        width: 220px;
        left: 220px;
        top: 0;
        background: white;
        box-shadow: 0 0 5px 1px rgba(100, 100, 100, .3);
      }
    }
  }

  & .caret-s {
    position: absolute;
    top: 16px;
    left: 200px;
    display: inline-block;
    width: 0;
    height: 0;
    border: 7px solid #C7DCED;
    border-color: transparent;
    border-top-color: #C7DCED;
    transition: all .3s;
    z-index: 10;
    &.right {
      transform: rotate(-90deg);
      top: 10px;
      border: 7px solid #000;
      border-color: transparent;
      border-top-color: #000;
    }
  }
  & .is_re {
    transform: rotate(180deg);
    transform-origin: 50% 25%;
  }

  & .select-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 220px;
    height: 40px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: inherit;
    font-weight: normal;
    height: 36px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    &:focus {
      border-color: #20a0ff;
    }
  }
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}




input::-webkit-input-placeholder {
  /*WebKit browsers*/
  font-family: "微软雅黑";
  line-height: 18px;
  font-size: 14px;
  color: #97a8be;
}

input::-moz-input-placeholder {
  /*Mozilla Firefox*/
  font-family: "微软雅黑";
  line-height: 18px;
  font-size: 14px;
  color: #97a8be;
}

input::-ms-input-placeholder {
  /*Internet Explorer*/
  font-family: "微软雅黑";
  line-height: 18px;
  font-size: 14px;
  color: #97a8be;
}
</style>
