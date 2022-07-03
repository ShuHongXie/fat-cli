<template>
  <div class="wb-empty">
    <wb-image
      :style="emptyImageStyle"
      :originType="isStatic ? 'static' : 'aliyuncs'"
      :src="emptyImage"
    />
    <span class="wb-empty__text”">{{ emptyText }}</span>
  </div>
</template>

<script lang="ts">
import './index.scss';
import WbImage from '../image/index.ts';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'wb-empty',
  components: {
    WbImage
  },
  props: {
    emptyImageStyle: {
      type: Object,
      default() {
        return { width: '120px', height: '120px' };
      }
    },
    isStatic: {
      type: Boolean,
      default: true
    },
    emptyImage: {
      type: String,
      default: '/p/share/mp/images/result__empty.png'
    },
    emptyText: {
      type: String,
      default: '没有找到相关内容~'
    }
  }
});
</script>
