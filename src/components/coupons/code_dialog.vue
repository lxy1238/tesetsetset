<template>
  <el-dialog title="test" :visible.sync="show">
    <div>awefawef</div>
    <div>awefawef</div>
    <div>awefawef</div>
     <div slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'getcode',
  data () {
    return {
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
  },
  methods: {
    close () {
      this.$emit('close')
    },
    submit () {
      this.$emit('submti')
    }
  }
}
</script>

<style>

</style>
