<template>
  <section>
    <div>
      <label class="select-label">品类:</label>
      <select-self :list="options"  @child="getSelectValue" v-model="select"></select-self>   
    </div>
  </section>
</template>
<script>
import selectSelf from '@/components/sectionVue/el-select-s.vue'
export default {
  data () {
    return {
      options: [
        {
          name: 'test',
          dealsbank_id: 1,
          childrens: [
            {
              name: '1',
              category_id: 1
            },
            {
              name: '2',
              category_id: 2
            },
            {
              name: '62',
              category_id: 2
            },
            {
              name: '52',
              category_id: 2
            }
          ]
        },
        {
          name: '美国',
          dealsbank_id: 2,
          childrens: [
            {
              name: '3',
              category_id: 3
            },
            {
              name: '4',
              category_id: 4
            }
          ]
        },
        {
          name: '西班牙',
          dealsbank_id: 3
        },
        {
          name: '西班牙',
          dealsbank_id: 3
        },
        {
          name: '西班牙',
          dealsbank_id: 3
        },
        {
          name: '西班牙',
          dealsbank_id: 3
        },
        {
          name: '西班牙',
          dealsbank_id: 3
        },
        {
          name: '西班牙',
          dealsbank_id: 3
        },
        {
          name: '西班牙',
          dealsbank_id: 3
        },
        {
          name: '西班牙',
          dealsbank_id: 3
        },
        {
          name: '西班牙',
          dealsbank_id: 3
        },
        {
          name: '西班牙',
          dealsbank_id: 3
        },
        {
          name: '西班牙',
          dealsbank_id: 3
        },
        {
          name: '西班牙',
          dealsbank_id: 3
        },
        {
          name: '西班牙',
          dealsbank_id: 3
        },
        {
          name: '西班牙',
          dealsbank_id: 3
        },
        {
          name: '西班牙',
          dealsbank_id: 3
        }
      ],
      select: ''
    }
  },
  components: {
    selectSelf
  },
  methods: {
    getSelectValue (item, items) {
      console.log(item, items)
      this.select = item.name
    }
  }
}
</script>
<style lang="less" scoped>
    .select-label {
        float: left;
        line-height: 30px;
        margin-right: 10px;        
    }
</style>
