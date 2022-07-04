<template>
  <div class="wb-load">
    <div class="wb-load__loading" v-if="!loaded">
      <wb-loading>{{ loadingText }}</wb-loading>
    </div>
    <span v-else class="wb-load__loaded">{{ loadedText }}</span>
  </div>
</template>

<script lang="ts">
import './index.scss';
import { defineComponent } from 'vue';
import WbLoading from '@wb-ui/package/loading';
export default defineComponent({
  name: 'wb-load',
  components: {
    WbLoading
  },
  props: {
    loadingText: {
      type: String,
      default: '加载中...'
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
