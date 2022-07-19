<template>
  <component :is="type" v-bind="linkProps(to)" @click="toOther">
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
  const type = computed(() => (isExternalFlag.value ? 'a' : 'span'));
  const linkProps = (to: string) => {
    if (isExternalFlag.value) {
      return {
        href: to,
        target: '_blank',
        rel: 'noopener'
      };
    }
    return {
      // to: to
    };
  };
  // 暂时为了解决vue-router4下 跳转导致切换2次问题
  // 上面的type 原本应该等于(isExternalFlag.value ? 'a' : 'router-link'));
  const toOther = () => {
    if (!isExternalFlag.value) {
      history.pushState(null, '', props.to);
    }
  };
</script>
