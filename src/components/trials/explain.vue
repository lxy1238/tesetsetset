<template>
   <div class="trials-explain">
        <div class="inline" v-for="(item, index) in reminderData" :class="{active: index == isActive, first: index === 0}">
          <span class="title">{{item.title}}</span><br>  
          <span class="content">{{item.content}}</span>  
          <i v-if="index < 4 && index != isActive && index != isActive - 1" class="iconfont icon-icon_huaban"></i>
        </div>
    </div>
</template>

<script>
export default {
  name: 'explain',
  data () {
    return {
      reminderData : [
        {
          title: 'Apply a product',
          content: 'Choose your favorite product',
        },
        {
          title: 'Submit application',
          content: 'Instantly know the results of the application',
        },
        {
          title: 'Purchase instantly',
          content: 'Complete the payment and submit the order number',
        },
        {
          title: 'Submit the review',
          content: 'Take delivery and submit the review',
        },
        {
          title: 'Refund',
          content: 'Confirm the review, system refund',
        },
      ],
    }
  },
  props: {
    isActive:{
      type: Number,
      default: 7
    }
  }
}
</script>

<style lang="less" scoped>
.trials-explain {
  width: 99.05%;
  height: 5rem;
  background: white;
  text-align: left;
  border-radius: 5px;
}
.inline {
  position: relative;
  float: left;
  background: transparent;
  padding: 1rem 0 1rem 1rem;
  width: 16.3rem;
  margin: 0;
  .title {
    font-size: 16px;
    color: #333;
  }
  .content {
    font-size: 11px;
    color: #b2b2b2;
    display: inline-block;
    width: 90%;
  }
  .icon-icon_huaban {
    position: absolute;
    font-size: 30px;
    right: 0;
    top: 1.6rem;
    color: #b2b2b2;
    display: inline-block;
    transform: rotate(90deg);
  }
  &.active {
    height: 100%;
    border-left: 1px solid #e1e1e1;
    border-right: 1px solid #e1e1e1;
    background: #FBFBFB;
    &.first {
      border-left: none;
    }
  }
}
</style>
