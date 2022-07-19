<template>
  <section class="app-main">
    <router-view :key="key" v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <transition name="fade-transform" mode="out-in">
      <div id="container"></div>
    </transition>
  </section>
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { start } from 'qiankun';
  const route = useRoute();
  const key = computed(() => route.path);
  onMounted(() => {
    if (!window.isQiankunStart) {
      window.isQiankunStart = true;
      start({ strictStyleIsolation: true, experimentalStyleIsolation: true });
    }
  });
</script>

<style scoped>
  .app-main {
    /*50 = navbar  */
    min-height: calc(100vh - 50px);
    position: relative;
    overflow: hidden;
  }
  .fixed-header + .app-main {
    padding-top: 50px;
  }
</style>
