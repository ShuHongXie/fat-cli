<template>
  <i v-if="icon && icon.includes('el-icon')" :class="[icon, 'sub-el-icon']"></i>
  <svg-icon v-else :icon-class="icon" />
  <span v-if="title">{{ title }}</span>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';
  defineProps({
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  });
</script>

<style scoped>
  .sub-el-icon {
    color: currentColor;
    width: 1em;
    height: 1em;
  }
</style>
