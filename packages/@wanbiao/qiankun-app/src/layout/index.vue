<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebarStatus.opened"
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
  const sidebarStatus = computed(() => store.state.app.sidebar);
  const device = computed(() => store.state.app.device);
  const fixedHeader = computed(() => store.state.settings.fixedHeader);
  const { body } = document;
  const WIDTH = 992; // refer to Bootstrap's responsive design
  const classObj = computed(() => ({
    hideSidebar: !sidebarStatus.value.opened,
    openSidebar: sidebarStatus.value.opened,
    withoutAnimation: sidebarStatus.value.withoutAnimation,
    mobile: device.value === 'mobile'
  }));
  watch(
    () => route,
    (route) => {
      if (device.value === 'mobile' && sidebarStatus.value.opened) {
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
  const toggleSideBar = () => {
    store.dispatch('app/toggleSideBar');
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
    position: relative;
    height: 100%;
    width: 100vw;
    display: flex;
    .main-container {
      min-height: 100%;
      position: relative;
      transition: width 0.28s;
      flex: 1;
    }

    .sidebar-container {
      max-width: 210px;
      height: 100%;
      z-index: 1001;
      overflow: hidden;
    }

    ::v-deep .el-menu {
      border: none;
      // background-color: #304156;
    }
    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
    &.hideSidebar {
      .main-container {
        width: calc(100vw - 64px);
      }
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

  // .mobile .fixed-header {
  //   width: 100%;
  // }
</style>
