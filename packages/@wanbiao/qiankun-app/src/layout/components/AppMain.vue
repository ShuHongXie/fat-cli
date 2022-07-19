<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in" appear>
      <div id="container"></div>
    </transition>
    <router-view :key="key" v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in" appear>
        <component :is="Component" :key="key" />
      </transition>
    </router-view>
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
      start();
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
