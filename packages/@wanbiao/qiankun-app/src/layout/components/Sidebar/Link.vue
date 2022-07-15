<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
  import { defineProps, computed } from 'vue';
  import { isExternal } from '@/utils/validate';
  const props = defineProps({
    to: {
      type: String,
      required: true
    }
  });
  const isExternalFlag = computed(() => isExternal(props.to));
  const type = computed(() => (isExternalFlag.value ? 'a' : 'router-link'));
  const linkProps = (to: string) => {
    if (isExternalFlag.value) {
      return {
        href: to,
        target: '_blank',
        rel: 'noopener'
      };
    }
    return {
      to: to
    };
  };
</script>
