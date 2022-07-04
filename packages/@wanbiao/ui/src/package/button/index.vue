<template>
  <button type="button" :class="classes" @click="onClick" :style="style">{{ label }}</button>
</template>

<script lang="ts">
import './index.scss';
import { defineComponent, reactive, computed } from 'vue';
export default defineComponent({
  name: 'wb-button',
  props: {
    label: {
      type: String,
      required: true
    },
    primary: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      validator(value: string) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1;
      }
    },
    backgroundColor: {
      type: String
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    props = reactive(props);
    return {
      classes: computed(() => ({
        'wb-button': true,
        'wb-button--primary': props.primary,
        'wb-button--secondary': !props.primary,
        [`wb-button--${props.size || 'medium'}`]: true
      })),
      style: computed(() => ({
        backgroundColor: props.backgroundColor
      })),
      onClick() {
        emit('click');
      }
    };
  }
});
</script>
