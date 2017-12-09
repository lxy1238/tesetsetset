<template>
  <div class="about-center">
    help center
    <section-vue></section-vue>
  </div>
</template>

<script>
import { base64Encode, base64Decode } from '@/utils/randomString'
import sectionVue from '@/components/sectionVue/section_vue'
export default {
  name: 'about',
  data () {
    return {

    }
  },
  components: {
    sectionVue
  },
  mounted () {
    console.log(base64Encode(1))
    console.log(base64Decode(undefined))
  }
}
</script>

<style>

</style>
