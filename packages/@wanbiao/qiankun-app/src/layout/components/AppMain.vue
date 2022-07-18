<template>
  <section id="container">
    <router-view :key="key" v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </section>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const key = computed(() => route.path);
</script>

<style scoped>
  #container {
    /*50 = navbar  */
    min-height: calc(100vh - 50px);
    position: relative;
    overflow: hidden;
  }
  .fixed-header + #container {
    padding-top: 50px;
  }
</style>
