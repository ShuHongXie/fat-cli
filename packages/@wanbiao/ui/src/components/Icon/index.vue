<template>
  <i :class="classList" :style="styles" @click.stop="$emit('click')"></i>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
export default defineComponent({
  name: 'wb-icon',
  props: {
    icon: {
      type: String,
      default: ''
    },
    customClass: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 24
    },
    color: {
      type: String,
      default: '#000'
    },
    style: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  emits: ['click'],
  setup(props) {
    const classList = computed(() => ({
      [`wb-icon iconfont`]: true,
      [props.icon]: true,
      [props.customClass]: true
    }));

    const styles = computed(() => {
      return {
        fontSize: props.size + 'px',
        color: props.color
      };
    });

    return {
      styles,
      classList
    };
  }
});
</script>
