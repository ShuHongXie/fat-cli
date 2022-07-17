<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-content"
        default-active="2"
        text-color="#fff"
        :collapse="isCollapse"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
    <!-- <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
      :collapse="isCollapse"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One</span></template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title><span>item four</span></template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu> -->
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import Logo from './Logo.vue';
  import SidebarItem from './SidebarItem.vue';
  // @ts-ignore
  import variables from '@/styles/variables.scss';
  import { useStore } from 'vuex';
  import { useRoute, useRouter } from 'vue-router';
  import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue';
  const router = useRouter();
  const route = useRoute();
  const store = useStore();
  const sidebar = computed(() => store.state.app.sidebar);
  const routes = computed(() => {
    return router.options.routes.filter((route) => !route.meta?.hidden);
  });
  console.log('---');
  console.log(router);
  const activeMenu = computed(() => {
    const { meta, path } = route;
    if (meta.activeMenu) {
      return meta.activeMenu as string;
    }
    return path;
  });
  const showLogo = computed(() => store.state.settings.sidebarLogo);
  const scssVariables = computed(() => variables);
  const isCollapse = computed(() => !sidebar.value.opened);
</script>

<style>
  .scrollbar-wrapper {
    background-color: #545c64;
  }
  .el-menu-vertical-content:not(.el-menu--collapse) {
    width: 210px;
  }
</style>
