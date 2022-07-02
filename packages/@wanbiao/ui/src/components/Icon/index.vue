<template>
  <i
    class="wb-icon iconfont"
    :class="[icon, customClass]"
    :style="styles"
    @click.stop="$emit('click')"
  ></i>
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
  setup(props) {
    const styles = computed(() => {
      return {
        fontSize: props.size + 'px',
        color: props.color
      };
    });
    return {
      styles
    };
  }
});
</script>
