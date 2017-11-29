<template>
  <div class="about-center">
    help center
  </div>
</template>

<script>
import { base64Encode, base64Decode } from '@/utils/randomString'
export default {
  name: 'about',
  data () {
    return {

    }
  },
  mounted () {
    console.log(base64Encode(1))
    console.log(base64Decode(base64Encode(1)))
  }
}
</script>

<style>

</style>
