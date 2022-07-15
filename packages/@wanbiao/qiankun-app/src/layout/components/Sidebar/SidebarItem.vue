<template>
  <div class="sidesdf test" v-if="!item?.meta?.hidden">
    {{
      hasOneShowingChild(item.children, item) &&
      (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
      !item.meta?.alwaysShow
    }}
    {{ onlyOneChild }}
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.meta?.alwaysShow
      "
    >
      {{ onlyOneChild.meta }}
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)">
      <template #title>
        <item
          v-if="item.meta"
          :icon="(item.meta.icon as string)"
          :title="(item.meta.title as string)"
        />
      </template>
      1231
      <!-- <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      /> -->
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, onMounted, ref, computed, PropType, reactive } from 'vue';
  import { useStore } from 'vuex';
  import path from 'path';
  import { isExternal } from '@/utils/validate';
  import Item from './Item.vue';
  import AppLink from './Link.vue';
  import { RouteRecordRaw } from 'vue-router';
  import { log } from 'console';
  // type RouteRecord = RouteRecordRaw & {
  //   meta: {};
  // };
  const store = useStore();
  let onlyOneChild = ref();
  const subMenu = ref();
  const device = computed(() => store.state.app.device);
  const props = defineProps({
    item: {
      type: Object as PropType<RouteRecordRaw>,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  });
  const hasOneShowingChild = (children = [] as RouteRecordRaw[], parent: RouteRecordRaw) => {
    console.log(children);
    const showingChildren =
      children.length &&
      children.filter((item: RouteRecordRaw) => {
        if (item.meta?.hidden) {
          return false;
        } else {
          onlyOneChild.value = item;
          console.log('1', onlyOneChild.value);
          return true;
        }
      });
    if (showingChildren) {
      return true;
    }
    if (!showingChildren) {
      onlyOneChild.value = { ...parent, path: '', noShowingChildren: true };
      console.log('2', onlyOneChild.value);
      return true;
    }
    return false;
  };
  const resolvePath = (routePath) => {
    if (isExternal(routePath)) {
      return routePath;
    }
    if (isExternal(props.basePath)) {
      return props.basePath;
    }
    return path.resolve(props.basePath, routePath);
  };

  const fixBugIniOS = () => {
    console.log(subMenu.value);
    if (subMenu.value) {
      const handleMouseleave = subMenu.value.handleMouseleave;
      subMenu.value.handleMouseleave = (e) => {
        if (device.value === 'mobile') {
          return;
        }
        handleMouseleave(e);
      };
    }
  };

  onMounted(() => {
    fixBugIniOS();
  });
</script>
