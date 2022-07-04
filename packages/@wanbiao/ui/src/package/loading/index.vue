<template>
  <div class="wb-loading" :style="loadingStyle">
    <div class="wb-loading__spinner" :style="spinnerStyle">
      <svg class="wb-loading__circular" viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" fill="none" />
      </svg>
    </div>
    <div class="wb-loading__text" :style="textStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import './index.scss';
import { defineComponent, computed } from 'vue';
import { FlexDirectionProperty } from 'csstype';
export default defineComponent({
  name: 'wb-loading',
  props: {
    // type: {
    //   type: String,
    //   default: 'circular'
    // },
    textSize: {
      type: Number,
      default: 12
    },
    textColor: {
      type: String,
      default: '#333'
    },
    color: {
      type: String,
      default: '#333'
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const textStyle = computed(() => ({
      fontSize: `${props.textSize}px`,
      color: props.textColor
    }));
    const spinnerStyle = computed(() => ({
      color: props.color ?? props.textColor
    }));
    const loadingStyle = computed(() => ({
      ['flexDirection' as FlexDirectionProperty]: props.vertical ? 'column' : 'row'
    }));
    return {
      textStyle,
      spinnerStyle,
      loadingStyle
    };
  }
});
</script>
