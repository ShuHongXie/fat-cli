<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  const store = useStore();
  const name = computed(() => store.state.user.name);
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
