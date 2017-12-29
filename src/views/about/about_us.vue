<template>
  <div class="about-center" v-title="titleMsg">
    help center
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      titleMsg: 'About Us'
    }
  },
  mounted () {    //钩子函数，等于vue1.0中的ready
   
  },
  methods: {
  }
}
</script>

<style>

</style>
