<template>
  <div class="wb-empty">
    <wb-image
      :width="emptyImageWidth"
      :height="emptyImageHeight"
      :originType="isStatic ? 'static' : 'aliyuncs'"
      :src="emptyImage"
    />
    <text class="wb-empty__text”">{{ emptyText }}</text>
  </div>
</template>

<script lang="ts">
import './index.scss';
import WbImage from '../image';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'wb-empty',
  components: {
    WbImage
  },
  props: {
    emptyImageWidth: {
      type: Number,
      default: 0
    },
    emptyImageHeight: Number,
    isStatic: {
      type: Boolean,
      default: false
    },
    emptyImage: {
      type: String,
      default: ''
    },
    emptyText: {
      type: String,
      default: ''
    }
  }
});
</script>
