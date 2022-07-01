<template>
  <div class="wb-list">
    <div class="wb-list-empty">
      <Empty v-if="!customEmpty" emptyText="{emptyText}" />
      <slot name="custom-empty"></slot>
    </div>
    status === "ERROR" && (
    <div class="wb-list-error" v-if="status === 'ERROR'">
      <span class="wb-list-error__retry" @click="retry" v-if="customError"> 重新加载 </span>
      <slot v-else name="custom-empty"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
  props: {
    status: {
      type: String,
      default: 'LOAD',
      valiate: (value: string) => {
        return ['NO_MORE', 'LOAD', 'END', 'ERROR'].includes(value);
      }
    }
  },
  setup(props, ctx) {
    onMounted(() => {});
    return {};
  }
});
</script>

<style lang="scss" scoped></style>
