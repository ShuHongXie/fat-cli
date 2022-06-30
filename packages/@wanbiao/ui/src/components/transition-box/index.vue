<template>
  <div class="wb-transition-box">
    <div v-for="(item, index) in data" :key="index" @click.stop="$emit('click-child')"></div>
  </div>
</template>

<script lang="ts" setup>
import { useSlots, defineProps, defineEmits } from 'vue';
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
});

const slots = useSlots();
console.log(slots);

defineEmits(['click-child']);
// setup code
</script>

<style lang="scss" scoped></style>
