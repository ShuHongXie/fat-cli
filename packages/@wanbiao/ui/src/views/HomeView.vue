<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <wb-image
      src="/t/m/images/1/head-logo.png"
      origin-type="static"
      width="48px"
      height="24px"
    ></wb-image>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WbImage from '@/components/Image.vue'
export default defineComponent({
  name: 'HomeView',
  components: {
    WbImage
  }
})
</script>
