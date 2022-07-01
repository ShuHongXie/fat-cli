<template>
  <div class="wb-load">
    <div class="wb-load__loading" v-if="!load">
      <span>{{ loadingText }}</span>
      <!-- <DotLoading color="currentColor" /> -->
    </div>
    <span class="wb-load__loaded">{{ loadedText }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
export default defineComponent({
  name: 'wb-load',
  props: {
    loadingText: {
      type: String,
      default: '加载中'
    },
    loaded: {
      type: Boolean,
      default: false
    },
    loadedText: {
      type: String,
      default: ''
    }
  }
});
</script>
