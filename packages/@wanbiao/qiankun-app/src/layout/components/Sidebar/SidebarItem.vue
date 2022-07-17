<template>
  {{ item }} ------ {{ onlyOneChild }} 判断{{
    !!(
      hasOneShowingChild(item.children, item) &&
      (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
      !item.meta?.alwaysShow
    )
  }}
  <template
    v-if="
      hasOneShowingChild(item.children, item) &&
      (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
      !item.meta?.alwaysShow
    "
  >
    <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
      <el-menu-item
        :index="resolvePath(onlyOneChild.path)"
        v-if="onlyOneChild && onlyOneChild.meta"
      >
        <el-icon>
          <svg-icon :icon-class="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" />
        </el-icon>
        <template #title>{{ onlyOneChild.meta.title }}</template>
      </el-menu-item>
    </app-link>
  </template>
  <template v-else>
    <el-sub-menu ref="subMenu" :index="resolvePath(item.path)">
      <!-- <template #title
        ><el-icon><location /></el-icon><span>item four</span></template
      >
      <el-menu-item index="1-4-1">item one</el-menu-item> -->
      {{ item }}
      <template #title>
        <el-icon>
          <svg-icon :icon-class="item?.meta?.icon" />
        </el-icon>
        <span>{{ item?.meta?.title }}12312 {{ item.path }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
  import { defineProps, onMounted, ref, computed, PropType } from 'vue';
  import { useStore } from 'vuex';
  import path from 'path';
  import { isExternal } from '@/utils/validate';
  import Item from './Item.vue';
  import AppLink from './Link.vue';
  import { RouteRecordRaw } from 'vue-router';
  import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue';
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
  console.log(props.item);

  const hasOneShowingChild = (children = [] as RouteRecordRaw[], parent: RouteRecordRaw) => {
    const showingChildren = children.filter((item: RouteRecordRaw) => {
      if (item.meta?.hidden) {
        return false;
      } else {
        onlyOneChild.value = item;
        console.log('1', onlyOneChild.value);
        return true;
      }
    });
    console.log(showingChildren, children[0].path);

    if (showingChildren.length === 1) {
      return true;
    }
    if (showingChildren.length === 0) {
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
    //  console.log(subMenu.value);
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
    console.log(props.item);

    fixBugIniOS();
  });
</script>
