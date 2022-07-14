<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    ></div>
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch, onMounted, onBeforeMount } from 'vue';
  import { Navbar, Sidebar, AppMain } from './components';
  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const store = useStore();
  const sidebar = computed(() => store.state.app.sidebar);
  const device = computed(() => store.state.app.device);
  const fixedHeader = computed(() => store.state.settings.fixedHeader);
  const { body } = document;
  const WIDTH = 992; // refer to Bootstrap's responsive design
  const classObj = computed(() => ({
    hideSidebar: !sidebar.value.opened,
    openSidebar: sidebar.value.opened,
    withoutAnimation: sidebar.value.withoutAnimation,
    mobile: device.value === 'mobile'
  }));
  watch(
    () => route,
    (route) => {
      if (device.value === 'mobile' && sidebar.value.opened) {
        store.dispatch('app/closeSideBar', { withoutAnimation: false });
      }
    },
    { immediate: true }
  );
  const handleClickOutside = () => {
    store.dispatch('app/closeSideBar', { withoutAnimation: false });
  };
  const isMobile = () => {
    const rect = body.getBoundingClientRect();
    return rect.width - 1 < WIDTH;
  };
  const resizeHandler = () => {
    if (!document.hidden) {
      const isMobileAgent = isMobile();
      store.dispatch('app/toggleDevice', isMobileAgent ? 'mobile' : 'desktop');

      if (isMobileAgent) {
        store.dispatch('app/closeSideBar', { withoutAnimation: true });
      }
    }
  };
  onBeforeMount(() => {
    window.addEventListener('resize', resizeHandler);
  });
  onBeforeMount(() => {
    window.removeEventListener('resize', resizeHandler);
  });
  onMounted(() => {
    const isMobileAgent = isMobile();
    if (isMobileAgent) {
      store.dispatch('app/toggleDevice', 'mobile');
      store.dispatch('app/closeSideBar', { withoutAnimation: true });
    }
  });
</script>

<style lang="scss" scoped>
  @import '~@/styles/mixin.scss';
  @import '~@/styles/variables.scss';

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px);
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
