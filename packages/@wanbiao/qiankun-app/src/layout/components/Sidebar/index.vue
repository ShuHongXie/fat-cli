<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="scssVariables.menuBg"
        :text-color="scssVariables.menuText"
        :unique-opened="false"
        :active-text-color="scssVariables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
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
  const router = useRouter();
  const route = useRoute();
  const store = useStore();
  const sidebar = computed(() => store.state.app.sidebar);
  const routes = computed(() => router.options.routes);
  console.log('---');
  console.log(routes.value);
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
