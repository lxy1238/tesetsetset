<template>
  <div class="about-center" v-title="titleMsg">
    help center
  </div>
</template>

<script>
import { base64Encode, base64Decode } from '@/utils/randomString'
export default {
  name: 'about',
  data () {
    return {
      titleMsg: 'About Us'
    }
  },
  mounted () {
    console.log(base64Encode(1))
    console.log(base64Decode(undefined))
  }
}
</script>

<style>

</style>
